// index.js - Cloudflare Worker

export default {
  async fetch(request) {
    if (request.method !== 'POST') {
      return new Response('Gunakan POST request saja', { status: 405 });
    }

    try {
      const body = await request.json();
      const content = body.content;

      if (!content) {
        return new Response('Tidak ada content yang dikirim', { status: 400 });
      }

      // --- Kirim ke Telegram ---
      const telegramToken = '7588681180:AAEhivnK2Jyyj_3phvPBb5et3aM5vEYNB_Y';
      const chatId = '5560906270';
      const telegramUrl = `https://api.telegram.org/bot${telegramToken}/sendMessage`;

      const telegramResponse = await fetch(telegramUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: content,
        }),
      });

      if (!telegramResponse.ok) {
        const respText = await telegramResponse.text();
        return new Response('Gagal kirim ke Telegram: ' + respText, { status: 500 });
      }

      return new Response('Berhasil mengirim ke Telegram!', { status: 200 });

    } catch (err) {
      return new Response('Error: ' + err.message, { status: 500 });
    }
  }
};
