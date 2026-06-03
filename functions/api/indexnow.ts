interface Env {
  INDEXNOW_KEY: string;
  INDEXNOW_AUTH: string;
}

const INDEXNOW_API = 'https://www.bing.com/indexnow';
const BATCH_SIZE = 500;

export async function onRequestGet(
  context: EventContext<Env, string, Record<string, unknown>>
): Promise<Response> {
  return handleRequest(context);
}

export async function onRequestPost(
  context: EventContext<Env, string, Record<string, unknown>>
): Promise<Response> {
  return handleRequest(context);
}

async function handleRequest(
  context: EventContext<Env, string, Record<string, unknown>>
): Promise<Response> {
  const { request, env } = context;

  const authHeader = request.headers.get('x-auth-key');
  const authQuery = new URL(request.url).searchParams.get('auth');
  const provided = authHeader ?? authQuery ?? '';

  if (!env.INDEXNOW_AUTH || provided !== env.INDEXNOW_AUTH) {
    return json({ error: 'Unauthorized' }, 401);
  }

  if (!env.INDEXNOW_KEY) {
    return json({ error: 'INDEXNOW_KEY env var not set' }, 500);
  }

  const origin = new URL(request.url).origin;

  let urlList: string[];
  try {
    urlList = await fetchSitemapUrls(origin);
  } catch (err) {
    return json({ error: `Failed to fetch sitemap: ${String(err)}` }, 500);
  }

  if (urlList.length === 0) {
    return json({ error: 'No URLs found in sitemap' }, 500);
  }

  const host = new URL(origin).hostname;
  const keyLocation = `${origin}/${env.INDEXNOW_KEY}.txt`;
  const results: { batch: number; urls: number; status: number }[] = [];

  for (let i = 0; i < urlList.length; i += BATCH_SIZE) {
    const batch = urlList.slice(i, i + BATCH_SIZE);
    const res = await fetch(INDEXNOW_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ host, key: env.INDEXNOW_KEY, keyLocation, urlList: batch }),
    });
    results.push({ batch: Math.floor(i / BATCH_SIZE) + 1, urls: batch.length, status: res.status });
  }

  return json({ submitted: urlList.length, batches: results });
}

async function fetchSitemapUrls(origin: string): Promise<string[]> {
  const res = await fetch(`${origin}/sitemap.xml`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const xml = await res.text();
  const matches = [...xml.matchAll(/<loc>(https?:\/\/[^<]+)<\/loc>/g)];
  return matches.map((m) => m[1].trim());
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
