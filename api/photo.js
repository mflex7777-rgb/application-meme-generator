export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  const { id } = req.query;
  if (!id || !/^[a-z0-9]{10}$/.test(id)) {
    return res.status(400).end('Invalid photo ID');
  }

  const url   = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;

  const response = await fetch(`${url}/get/photo:${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json();
  const dataUrl = data.result;

  if (!dataUrl) return res.status(404).end('Not found');

  // Parse the data URL: data:<mime>;base64,<data>
  const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/);
  if (!match) return res.status(500).end('Invalid photo data');

  const [, mime, b64] = match;
  const buf = Buffer.from(b64, 'base64');

  res.setHeader('Content-Type', mime);
  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  return res.status(200).send(buf);
}
