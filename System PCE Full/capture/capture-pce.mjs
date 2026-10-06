// Re-captures the real PCE Console structure into capture/pce-manifest.json.
//
//   cd capture && npm install          (first time only: installs Playwright)
//   PCE_MAGIC_LINK='https://console.illum.io/accesslink/login?token=...' node capture-pce.mjs
//
// - READ-ONLY: it only opens pages and reads them. The one click it makes is
//   to dismiss an expired-trial "Continue in Read-Only Mode" notice.
// - The magic link is read from the environment and never written anywhere.
// - Uses the installed Google Chrome (no browser download needed).
// - Output: pce-manifest.json (menu tree + one entry per page), and
//   screenshots/<route>.png for reference. Commit the manifest; review
//   changes with `git diff pce-manifest.json`, then rebuild the lab.
import { chromium } from 'playwright';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const link = process.env.PCE_MAGIC_LINK;
if (!link) { console.error('Set PCE_MAGIC_LINK to a fresh magic link first.'); process.exit(1); }
const origin = new URL(link).origin;
const SKIP = r => r.startsWith('insights/');          // Insights pages are out of scope
const WAIT_MS = +(process.env.PCE_WAIT_MS || 4500);
const capturePage = readFileSync(join(here, 'capture-page.js'), 'utf8');
const menuJs = readFileSync(join(here, 'capture-menu.js'), 'utf8');

const browser = await chromium.launch({ channel: 'chrome', headless: !process.env.PCE_SHOW });
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });
await page.goto(link);
await page.waitForSelector('[data-tid~="comp-sidenav-item"]', { timeout: 60000 });
await page.waitForTimeout(WAIT_MS);

const dismiss = async () => {
  const b = page.getByRole('button', { name: /Continue in Read-Only Mode/i });
  if (await b.count()) { await b.first().click(); await page.waitForTimeout(500); }
};
await dismiss();

const menu = await page.evaluate(menuJs);
const routes = [];
(function walk(ns) { ns.forEach(n => { if (n.r && !SKIP(n.r) && !routes.includes(n.r)) routes.push(n.r); if (n.c) walk(n.c); }); })(menu);

mkdirSync(join(here, 'screenshots'), { recursive: true });
const pages = {};
for (const r of routes) {
  process.stdout.write(`  ${r} ... `);
  await page.goto(`${origin}/#/${r}`);
  await page.waitForTimeout(WAIT_MS);
  await dismiss();
  try {
    const p = await page.evaluate(capturePage);
    delete p.capturedAt;
    pages[r] = p;
    await page.screenshot({ path: join(here, 'screenshots', r.replace(/\//g, '__') + '.png') });
    console.log(p.title || '(no title)');
  } catch (e) { pages[r] = { route: r, error: String(e) }; console.log('ERROR', e.message); }
}
await browser.close();

const manifest = { source: origin, capturedAt: new Date().toISOString().slice(0, 10), menu, pages };
writeFileSync(join(here, 'pce-manifest.json'), JSON.stringify(manifest, null, 1) + '\n');
console.log(`Wrote pce-manifest.json: ${routes.length} pages.`);
