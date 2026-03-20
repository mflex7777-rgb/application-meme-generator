export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { html } = req.body;
  if (!html || typeof html !== 'string') {
    return res.status(400).json({ error: 'Invalid payload' });
  }

  const url   = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) {
    return res.status(500).json({ error: 'Storage not configured' });
  }

  const id = Math.random().toString(36).slice(2, 8);
  const expiry = 60 * 60 * 24 * 365;

  const response = await fetch(`${url}/pipeline`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify([
      ['SET', `meme:${id}`, html, 'EX', expiry]
    ]),
  });

  const responseText = await response.text();
  if (!response.ok) {
    return res.status(500).json({ error: `Upstash error (${response.status}): ${responseText}` });
  }

  return res.status(200).json({ id });
}
