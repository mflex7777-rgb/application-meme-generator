export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.query;
  if (!id || !/^[a-z0-9]{6}$/.test(id)) {
    return res.status(400).send('Invalid meme ID');
  }

  const url   = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) {
    return res.status(500).send('Storage not configured');
  }

  const response = await fetch(`${url}/get/meme:${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    return res.status(500).send('Storage error');
  }

  const data = await response.json();
  const html = data.result;

  if (!html) {
    return res.status(404).send(`
      <!DOCTYPE html>
      <html>
        <head><title>Meme not found</title></head>
        <body style="font-family:sans-serif;text-align:center;padding:60px;">
          <h2>😕 Meme not found</h2>
          <p>This link may have expired or doesn't exist.</p>
          <a href="/">← Create your own</a>
        </body>
      </html>
    `);
  }

  res.setHeader('Content-Type', 'text/html');
  return res.status(200).send(html);
}
