export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { type, data } = req.body || {};
        const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "8603480467:AAHBWm3x3Ah2gsAxCztUWYslSSO-Vt8haGk";
        const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || "56529712";

        let text = "";

        if (type === 'booking') {
            const { name, phone, email, examBoard, examDate } = data || {};
            text = 
`🚨 <b>NEW DIAGNOSTIC BOOKING</b> 🚨

👤 <b>Name:</b> ${name}
📱 <b>WhatsApp/Phone:</b> <code>${phone}</code>
📧 <b>Email:</b> ${email}
📚 <b>Exam Board:</b> ${examBoard}
🎯 <b>Target & Exam Date:</b> ${examDate}

⏰ <i>Time Sent: ${new Date().toLocaleString()}</i>`;
        } else if (type === 'telegram') {
            const { name, phone } = data || {};
            text = 
`💬 <b>NEW FREE TELEGRAM GROUP LEAD</b> 💬

👤 <b>Name:</b> ${name}
📱 <b>WhatsApp/Phone:</b> <code>${phone}</code>

⏰ <i>Time Sent: ${new Date().toLocaleString()}</i>`;
        } else {
            return res.status(400).json({ error: 'Invalid payload type' });
        }

        const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
        const response = await fetch(telegramApiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: text,
                parse_mode: 'HTML'
            })
        });

        const result = await response.json();
        return res.status(200).json({ success: true, result });
    } catch (error) {
        console.error('Error sending Telegram notification:', error);
        return res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
}
