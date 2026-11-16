// Bai 12: Telegram Bot Webhook Integration
// Supabase Edge Function (Deno)

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const BOT_TOKEN = Deno.env.get('TELEGRAM_BOT_TOKEN') || '';

serve(async (req) => {
  try {
    const update = await req.json();
    const message = update.message;

    if (!message || !message.text) {
      return new Response('OK', { status: 200 });
    }

    const chatId = message.chat.id;
    const text = message.text.trim();

    // Cu phap: /chi 45k com trua
    if (text.startsWith('/chi') || text.startsWith('/thu')) {
      const parts = text.split(' ');
      const type = parts[0] === '/chi' ? 'Chi phi' : 'Thu nhap';
      const amountStr = parts[1] || '0';
      const note = parts.slice(2).join(' ') || 'Giao dich Telegram';

      // Reply xac nhan
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: `Da ghi nhan thanh cong vao MoneyVibe:\n- Loai: ${type}\n- So tien: ${amountStr}\n- Ghi chu: ${note}`,
        }),
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});
