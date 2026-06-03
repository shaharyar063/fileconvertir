/**
 * Submit all sitemap URLs to IndexNow via the Cloudflare Pages Function.
 *
 * Usage (after deploying to Cloudflare Pages):
 *   INDEXNOW_AUTH=<your-auth-token> node scripts/submit-indexnow.mjs
 *
 * Or pass the auth token as an argument:
 *   node scripts/submit-indexnow.mjs <your-auth-token>
 */

const SITE = 'https://fileconvertir.com';
const ENDPOINT = `${SITE}/api/indexnow`;

const auth = process.argv[2] ?? process.env.INDEXNOW_AUTH;

if (!auth) {
  console.error('Error: provide auth token via INDEXNOW_AUTH env var or as first argument.');
  process.exit(1);
}

console.log(`Submitting all URLs from ${SITE}/sitemap.xml to IndexNow…`);

const res = await fetch(ENDPOINT, {
  method: 'POST',
  headers: { 'x-auth-key': auth },
});

if (!res.ok) {
  const body = await res.text();
  console.error(`Failed: HTTP ${res.status} — ${body}`);
  process.exit(1);
}

const result = await res.json();
console.log('Done!');
console.log(`  Total URLs submitted: ${result.submitted}`);
console.log(`  Batches: ${JSON.stringify(result.batches)}`);
