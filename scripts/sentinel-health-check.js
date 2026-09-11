/**
 * scripts/sentinel-health-check.js
 * 
 * GradeMotion 24/7 Site & Link Health Sentinel
 * Probes all critical revenue & traffic endpoints:
 * 1. Core pages (Home, /schedule, /book, /desk, /thank-you)
 * 2. Branded checkout landing pages (/pay/usd/*, /pay/my/*)
 * 3. Live Stripe payment links (USD & MYR tiers)
 * 4. Programmatic SEO (pSEO) and GEO landing pages
 * 
 * Sends instant Telegram alerts on failure and daily heartbeat summaries.
 */

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "8603480467:AAHBWm3x3Ah2gsAxCztUWYslSSO-Vt8haGk";
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || "56529712";
const BASE_URL = process.env.SITE_URL || "https://www.grademotion.com";

const TARGET_URLS = [
    // 1. Core Pages
    { category: "Core", url: BASE_URL + "/" },
    { category: "Core", url: BASE_URL + "/schedule" },
    { category: "Core", url: BASE_URL + "/book" },
    { category: "Core", url: BASE_URL + "/desk" },
    { category: "Core", url: BASE_URL + "/thank-you" },

    // 2. Branded Checkout Landing Pages (USD)
    { category: "Checkout (USD)", url: BASE_URL + "/pay/usd/trial" },
    { category: "Checkout (USD)", url: BASE_URL + "/pay/usd/topic-surgery" },
    { category: "Checkout (USD)", url: BASE_URL + "/pay/usd/exam-readiness" },
    { category: "Checkout (USD)", url: BASE_URL + "/pay/usd/bootcamp" },

    // 2b. Branded Checkout Landing Pages (MYR)
    { category: "Checkout (MYR)", url: BASE_URL + "/pay/my/trial" },
    { category: "Checkout (MYR)", url: BASE_URL + "/pay/my/topic-surgery" },
    { category: "Checkout (MYR)", url: BASE_URL + "/pay/my/exam-readiness" },
    { category: "Checkout (MYR)", url: BASE_URL + "/pay/my/bootcamp" },

    // 3. Live Stripe Payment Links (Direct)
    { category: "Stripe Buy Links (USD)", url: "https://buy.stripe.com/28E6oz1Vk5fog4Ccm74ZG0v", name: "Evaluation ($210)" },
    { category: "Stripe Buy Links (USD)", url: "https://buy.stripe.com/aFa9ALbvUazIaKieuf4ZG0p", name: "Topic Surgery ($760)" },
    { category: "Stripe Buy Links (USD)", url: "https://buy.stripe.com/4gMeV59nM23cg4CadZ4ZG0r", name: "Exam Readiness ($1,360)" },
    { category: "Stripe Buy Links (USD)", url: "https://buy.stripe.com/4gMcMXczY0Z83hQcm74ZG0t", name: "Intensive Bootcamp ($2,980)" },

    { category: "Stripe Buy Links (MYR)", url: "https://buy.stripe.com/7sYbIT6bA8rAf0y0Dp4ZG0w", name: "Evaluation (RM 380)" },
    { category: "Stripe Buy Links (MYR)", url: "https://buy.stripe.com/fZu7sD6bAazI19I0Dp4ZG0q", name: "Topic Surgery (RM 1,440)" },
    { category: "Stripe Buy Links (MYR)", url: "https://buy.stripe.com/8x2bIT6bA4bk3hQeuf4ZG0s", name: "Exam Readiness (RM 2,560)" },
    { category: "Stripe Buy Links (MYR)", url: "https://buy.stripe.com/00w28j8jI9vEbOm0Dp4ZG0u", name: "Intensive Bootcamp (RM 5,600)" },

    // 4. Programmatic SEO Master Hubs
    { category: "pSEO Master Hubs", url: BASE_URL + "/solutions" },
    { category: "pSEO Master Hubs", url: BASE_URL + "/topics" },
    { category: "pSEO Master Hubs", url: BASE_URL + "/tutor" },

    // 5. GEO Hubs (Canonical slugs from sitemap)
    { category: "GEO Hubs", url: BASE_URL + "/tutor/dubai-a-level-further-maths" },
    { category: "GEO Hubs", url: BASE_URL + "/tutor/abu-dhabi-a-level-further-maths" },
    { category: "GEO Hubs", url: BASE_URL + "/tutor/riyadh-a-level-further-maths" },
    { category: "GEO Hubs", url: BASE_URL + "/tutor/jeddah-a-level-further-maths" },
    { category: "GEO Hubs", url: BASE_URL + "/tutor/singapore-a-level-further-maths" },
    { category: "GEO Hubs", url: BASE_URL + "/tutor/hong-kong-a-level-further-maths" },
    { category: "GEO Hubs", url: BASE_URL + "/tutor/london-a-level-further-maths" },
    { category: "GEO Hubs", url: BASE_URL + "/tutor/malaysia-a-level-further-maths" },

    // 6. Topic Hubs (Canonical slugs from sitemap)
    { category: "Topic Hubs", url: BASE_URL + "/topics/matrices-and-linear-transformations" },
    { category: "Topic Hubs", url: BASE_URL + "/topics/complex-numbers-loci-and-roots" },
    { category: "Topic Hubs", url: BASE_URL + "/topics/differential-equations" },
    { category: "Topic Hubs", url: BASE_URL + "/topics/hyperbolic-functions-and-calculus" },
    { category: "Topic Hubs", url: BASE_URL + "/topics/polar-coordinates-and-area" },
    { category: "Topic Hubs", url: BASE_URL + "/topics/series-proof-and-integration" },

    // 7. Solution Walkthroughs (Representative canonical set from sitemap)
    { category: "Solution Walkthroughs", url: BASE_URL + "/solutions/edexcel-cp1-may-2025-q1-matrices-singular-inverse" },
    { category: "Solution Walkthroughs", url: BASE_URL + "/solutions/edexcel-cp1-may-2025-q2-hyperbolic-functions-exact-values" },
    { category: "Solution Walkthroughs", url: BASE_URL + "/solutions/edexcel-cp1-may-2025-q4-second-order-differential-equations" },
    { category: "Solution Walkthroughs", url: BASE_URL + "/solutions/edexcel-cp1-may-2025-q10-volumes-of-revolution-trig" },
    { category: "Solution Walkthroughs", url: BASE_URL + "/solutions/edexcel-cp2-may-2025-q1-complex-numbers-modulus-argument" },
    { category: "Solution Walkthroughs", url: BASE_URL + "/solutions/edexcel-cp2-may-2025-q2-vectors-lines-planes" },
    { category: "Solution Walkthroughs", url: BASE_URL + "/solutions/edexcel-cp2-may-2025-q7a-polar-coordinates-vertical-tangents" },
    { category: "Solution Walkthroughs", url: BASE_URL + "/solutions/edexcel-cp2-may-2025-q8-maclaurin-series-hyperbolic-differentiation" }
];

async function checkUrl(target) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    const startTime = Date.now();

    try {
        const response = await fetch(target.url, {
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (GradeMotion-Sentinel/1.0; HealthBot)'
            },
            signal: controller.signal,
            redirect: 'follow'
        });

        clearTimeout(timeout);
        const duration = Date.now() - startTime;
        const isOk = response.status >= 200 && response.status < 400;

        return {
            ...target,
            status: response.status,
            ok: isOk,
            duration,
            error: isOk ? null : `HTTP Status ${response.status}`
        };
    } catch (err) {
        clearTimeout(timeout);
        const duration = Date.now() - startTime;
        return {
            ...target,
            status: 0,
            ok: false,
            duration,
            error: err.name === 'AbortError' ? 'Request Timeout (>10s)' : err.message
        };
    }
}

async function sendTelegramNotification(message) {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
        console.warn('Telegram Bot Token or Chat ID not configured. Notification skipped.');
        return;
    }

    try {
        const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: message,
                parse_mode: 'HTML',
                disable_web_page_preview: true
            })
        });

        const result = await res.json();
        if (!result.ok) {
            console.error('Telegram API error:', result);
        } else {
            console.log('Telegram alert dispatched successfully.');
        }
    } catch (e) {
        console.error('Failed to send Telegram alert:', e);
    }
}

async function runSentinel() {
    console.log(`GradeMotion Health Sentinel starting... Probing ${TARGET_URLS.length} endpoints.`);
    const results = [];

    const batchSize = 6;
    for (let i = 0; i < TARGET_URLS.length; i += batchSize) {
        const batch = TARGET_URLS.slice(i, i + batchSize);
        const batchResults = await Promise.all(batch.map(checkUrl));
        results.push(...batchResults);
    }

    const failures = results.filter(r => !r.ok);
    const totalDuration = results.reduce((acc, r) => acc + r.duration, 0);
    const avgLatency = Math.round(totalDuration / results.length);

    console.log('\n========================================');
    console.log('Sentinel Probe Complete:');
    console.log(`Total Checked : ${results.length}`);
    console.log(`Passed        : ${results.length - failures.length}`);
    console.log(`Failed        : ${failures.length}`);
    console.log(`Avg Latency   : ${avgLatency}ms`);
    console.log('========================================\n');

    const timestamp = new Date().toLocaleString('en-GB', { timeZone: 'Asia/Kuala_Lumpur' });

    if (failures.length > 0) {
        let failList = failures.map(f => {
            const label = f.name ? `<b>${f.name}</b> (${f.category})` : `<b>${f.category}</b>`;
            return `❌ ${label}\n   🔗 <code>${f.url}</code>\n   ⚠️ <i>Error: ${f.error}</i>`;
        }).join('\n\n');

        const alertMessage = 
`🚨 <b>GRADEMOTION SENTINEL ALERT: BROKEN LINKS DETECTED!</b> 🚨

⚠️ <b>${failures.length} out of ${results.length} endpoints failed health check!</b>

${failList}

⏰ <i>Checked at: ${timestamp} (MYT)</i>
🛡️ <i>Action required: Inspect Vercel routes or Stripe dashboard.</i>`;

        await sendTelegramNotification(alertMessage);
        process.exit(1);
    } else {
        const heartbeatMessage = 
`🛡️ <b>GRADEMOTION SENTINEL: ALL SYSTEMS OPERATIONAL</b> 🛡️

✅ <b>100% Health Status Confirmed:</b>
• Total Endpoints: <b>${results.length} checked</b>
• Core Pages: <b>5/5 OK</b> (Home, /schedule, /book, /desk, /thank-you)
• Branded Checkout: <b>8/8 OK</b> (USD & MYR)
• Live Stripe Links: <b>8/8 OK</b> (Active & Healthy)
• pSEO Master Hubs: <b>3/3 OK</b> (/solutions, /topics, /tutor)
• GEO Hubs: <b>8/8 OK</b> (Dubai, Singapore, London, etc.)
• Topic Hubs: <b>6/6 OK</b> (Matrices, Complex Numbers, etc.)
• Solution Walkthroughs: <b>8/8 OK</b> (Edexcel CP1 & CP2)
• Avg Server Latency: <b>${avgLatency}ms</b>

⏰ <i>Timestamp: ${timestamp} (MYT)</i>
🚀 <i>GradeMotion infrastructure is 100% operational.</i>`;

        await sendTelegramNotification(heartbeatMessage);
        console.log('All endpoints healthy. Heartbeat sent.');
        process.exit(0);
    }
}

runSentinel();
