// index.js - Cloudflare Worker (Dashboard-ready)
export async function onRequest(context) {
  const { request } = context;

  if (request.method !== 'POST') {
    return new Response('Gunakan POST request saja', { status: 405 });
  }

  try {
    const { content } = await request.json();

    if (!content) {
      return new Response('Tidak ada content yang dikirim', { status: 400 });
    }

    // Kirim ke Telegram
    const telegramToken = '7588681180:AAEhivnK2Jyyj_3phvPBb5et3aM5vEYNB_Y';
    const chatId = '5560906270';
    const telegramUrl = `https://api.telegram.org/bot${telegramToken}/sendMessage`;

    await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: content,
      }),
    });

    return new Response('Berhasil mengirim ke Telegram!', { status: 200 });

  } catch (err) {
    return new Response('Error: ' + err.message, { status: 500 });
  }
}
