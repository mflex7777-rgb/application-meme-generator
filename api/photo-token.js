// Returns the Upstash credentials needed for direct browser-to-Upstash uploads
// Only exposes the read/write token, never the admin token
export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();
  const url   = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return res.status(500).json({ error: 'Not configured' });
  // Safe to expose — this is a scoped REST token, not account credentials
  res.status(200).json({ url, token });
}
