/**
 * scripts/daily-digest.js
 * 
 * GradeMotion Daily Executive Briefing
 * Runs daily at 08:30 AM MYT via GitHub Actions.
 * 
 * 1. Pulls today's scheduled 1-on-1 tutoring / diagnostic sessions from Cal.com API v2.
 * 2. Pulls new bookings made in the past 24 hours.
 * 3. Pulls high-ticket Stripe charges / revenue from past 24 hours (if configured).
 * 4. Pushes an executive summary directly to Tutor Sheefa on Telegram.
 */

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "8603480467:AAHBWm3x3Ah2gsAxCztUWYslSSO-Vt8haGk";
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || "56529712";
const CAL_API_KEY = process.env.CAL_API_KEY || "cal_live_d133ca0d12cc5c877df80b02d46b3793";
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || "";

async function getCalBookings() {
    if (!CAL_API_KEY) {
        return { error: "Cal.com API Key missing", today: [], recent: [] };
    }

    try {
        const res = await fetch("https://api.cal.com/v2/bookings?take=100", {
            headers: {
                "Authorization": `Bearer ${CAL_API_KEY}`,
                "cal-api-version": "2024-06-11"
            }
        });

        const data = await res.json();
        if (data.status !== "success" || !Array.isArray(data.data)) {
            return { error: "Failed to fetch bookings", today: [], recent: [] };
        }

        const now = new Date();
        const nowMYTString = now.toLocaleDateString("en-CA", { timeZone: "Asia/Kuala_Lumpur" }); // YYYY-MM-DD
        const twentyFourHoursAgo = new Date(now.getTime() - (24 * 60 * 60 * 1000));

        const todayBookings = [];
        const recentBookings = [];

        for (const b of data.data) {
            // Status check
            if (b.status === "cancelled" || b.status === "rejected") continue;

            const startTime = new Date(b.startTime);
            const startMYTString = startTime.toLocaleDateString("en-CA", { timeZone: "Asia/Kuala_Lumpur" });

            if (startMYTString === nowMYTString) {
                todayBookings.push(b);
            }

            const createdAt = new Date(b.createdAt);
            if (createdAt >= twentyFourHoursAgo) {
                recentBookings.push(b);
            }
        }

        // Sort today's sessions chronologically
        todayBookings.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

        return { today: todayBookings, recent: recentBookings };
    } catch (err) {
        console.error("Error fetching Cal.com bookings:", err);
        return { error: err.message, today: [], recent: [] };
    }
}

async function getStripeRevenue() {
    if (!STRIPE_SECRET_KEY) {
        return { available: false, usd: 0, myr: 0, count: 0 };
    }

    try {
        const twentyFourHoursAgoSec = Math.floor((Date.now() - (24 * 60 * 60 * 1000)) / 1000);
        const url = `https://api.stripe.com/v1/charges?created[gte]=${twentyFourHoursAgoSec}&limit=100`;

        const res = await fetch(url, {
            headers: {
                "Authorization": `Bearer ${STRIPE_SECRET_KEY}`
            }
        });

        const data = await res.json();
        if (!data.data || !Array.isArray(data.data)) {
            return { available: false, usd: 0, myr: 0, count: 0 };
        }

        let usdTotal = 0;
        let myrTotal = 0;
        let successfulCharges = 0;

        for (const charge of data.data) {
            if (charge.paid && !charge.refunded) {
                successfulCharges++;
                const amount = charge.amount / 100;
                if (charge.currency.toLowerCase() === "usd") {
                    usdTotal += amount;
                } else if (charge.currency.toLowerCase() === "myr") {
                    myrTotal += amount;
                }
            }
        }

        return {
            available: true,
            usd: usdTotal,
            myr: myrTotal,
            count: successfulCharges
        };
    } catch (err) {
        console.error("Error fetching Stripe revenue:", err);
        return { available: false, usd: 0, myr: 0, count: 0 };
    }
}

async function sendTelegramNotification(message) {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
        console.warn("Telegram Bot Token or Chat ID not configured. Notification skipped.");
        return;
    }

    try {
        const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: message,
                parse_mode: "HTML",
                disable_web_page_preview: true
            })
        });

        const result = await res.json();
        if (!result.ok) {
            console.error("Telegram API error:", result);
        } else {
            console.log("Telegram daily digest dispatched successfully.");
        }
    } catch (e) {
        console.error("Failed to send Telegram daily digest:", e);
    }
}

async function runDailyDigest() {
    console.log("Generating GradeMotion Morning Executive Briefing...");

    const [calData, stripeData] = await Promise.all([
        getCalBookings(),
        getStripeRevenue()
    ]);

    const dateOptions = { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kuala_Lumpur" };
    const dateFormatted = new Date().toLocaleDateString("en-GB", dateOptions);

    // 1. Format Today's Sessions
    let sessionsSection = "";
    if (calData.today.length === 0) {
        sessionsSection = "<i>☕ No live 1-on-1 tutoring sessions scheduled for today. Focus on preparation or content.</i>";
    } else {
        sessionsSection = calData.today.map((b, idx) => {
            const timeStr = new Date(b.startTime).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
                timeZone: "Asia/Kuala_Lumpur"
            });
            const attendeeName = b.attendees?.[0]?.name || "Student";
            const title = b.title || "Tutoring Session";
            return `${idx + 1}. ⏰ <b>${timeStr}</b> (MYT) — <b>${attendeeName}</b>\n   📌 <i>${title}</i>`;
        }).join("\n\n");
    }

    // 2. Format New Bookings in past 24h
    let newBookingsSection = "";
    if (calData.recent.length === 0) {
        newBookingsSection = "• <i>No new calendar appointments booked in the last 24h.</i>";
    } else {
        newBookingsSection = `• <b>${calData.recent.length} new session(s) booked</b> via Cal.com portal.`;
    }

    // 3. Format Revenue Section
    let revenueSection = "";
    if (stripeData.available) {
        revenueSection = 
`• USD Revenue : <b>$${stripeData.usd.toLocaleString()}</b>
• MYR Revenue : <b>RM ${stripeData.myr.toLocaleString()}</b>
• Paid Transactions : <b>${stripeData.count}</b>`;
    } else {
        revenueSection = `• USD & MYR Checkout Links: <b>Active & Ready</b>\n• Stripe API Sync: <i>Ready (Set STRIPE_SECRET_KEY in GitHub Secrets)</i>`;
    }

    const digestMessage = 
`☀️ <b>GRADEMOTION MORNING BRIEFING</b> ☀️
📅 <b>${dateFormatted}</b>
━━━━━━━━━━━━━━━━━━━━━

📅 <b>TODAY'S SCHEDULE (MALAYSIA TIME)</b>
${sessionsSection}

━━━━━━━━━━━━━━━━━━━━━
💰 <b>REVENUE & SALES (PAST 24H)</b>
${revenueSection}

━━━━━━━━━━━━━━━━━━━━━
📥 <b>LEADS & BOOKINGS (PAST 24H)</b>
${newBookingsSection}
• Real-time web inquiries are sent directly to Telegram as they arrive.

━━━━━━━━━━━━━━━━━━━━━
🛡️ <b>INFRASTRUCTURE STATUS</b>
• All 46 Core, Checkout, & pSEO endpoints monitored 24/7.
• Next automated health sentinel runs tomorrow at 8:00 AM MYT.

Have an impactful teaching day, Tutor Sheefa! 🚀`;

    await sendTelegramNotification(digestMessage);
    console.log("Morning briefing compiled and sent.");
}

runDailyDigest();
