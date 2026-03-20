export default async function handler(req, res) {
  const url   = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;

  if (!url || !token) {
    return res.status(500).json({
      ok: false,
      error: 'Environment variables missing',
      KV_REST_API_URL: url ? 'set' : 'MISSING',
      KV_REST_API_TOKEN: token ? 'set' : 'MISSING',
    });
  }

  try {
    // Simple PING to Upstash
    const response = await fetch(`${url}/ping`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const text = await response.text();
    return res.status(200).json({
      ok: response.ok,
      status: response.status,
      upstash_response: text,
      KV_REST_API_URL: url.slice(0, 40) + '...',
    });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
}
