// Builds html/index.html from src/ and the captured real-PCE manifest.
//
//   src/page.html            page shell with @@STYLES@@, @@SIDENAV@@, @@SCRIPT@@
//   src/styles.css           all CSS
//   src/js/NN-*.js           page code, concatenated in file-name order into ONE
//                            shared scope (00-page-core.js opens the IIFE,
//                            90-tabs-store-init.js closes it)
//   src/assets/*             inlined as base64 via @@ASSET:<file>@@
//   src/nav-icons.json       sidebar icons by menu label
//   capture/pce-manifest.json  real PCE menu + page structure (capture-pce.mjs)
//
// The sidebar is generated from the manifest menu; page data is injected as
// PCE_MANIFEST (@@MANIFEST@@ in src/js). No dependencies: `node build.mjs`.
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const src = join(root, 'src');
const read = p => readFileSync(join(src, p), 'utf8');
const manifest = JSON.parse(readFileSync(join(root, 'capture', 'pce-manifest.json'), 'utf8'));
const icons = JSON.parse(read('nav-icons.json'));

// ---- sidebar from the manifest menu -------------------------------------
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
const GENERIC_ICON = '<svg class="icon" viewBox="0 0 16 16" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" d="M4 2.5h5.5L12 5v8.5H4zM6 8h4M6 10.5h4"/></svg>';
// leaves that already have hand-built pages keep their element ids
const BUILT = { workloads: 'navWorkloads', pairingprofiles: 'navProfiles', rulesets: 'navAllPolicies' };
// groups whose ids the hand-built code already uses
const LEGACY_GROUP = { 'Segmentation': ['segMenu', 'segChildren', 'segChevron', false], 'Servers & Endpoints': ['serversMenu', 'serversChildren', 'serversChevron', true] };
let gid = 0;
function navItem(n, depth, top, path) {
  const icon = icons[n.l] || GENERIC_ICON;
  if (n.c) {
    const legacy = depth === 0 && LEGACY_GROUP[n.l];
    const [bid, cid, chid, open] = legacy || [null, 'navg-' + (++gid), null, false];
    const head = `<button${bid ? ` id="${bid}"` : ' class="nav-group" data-group'} aria-expanded="${open}" aria-controls="${cid}">${icon}${esc(n.l)}<span${chid ? ` id="${chid}"` : ''} class="chevron">${open ? '⌄' : '›'}</span></button>`;
    const kids = n.c.map(c => navItem(c, depth + 1, top || n.l, [...path, n.l])).join('');
    return `${head}<div id="${cid}" class="nav-children"${open ? '' : ' hidden'}>${kids}</div>`;
  }
  const id = BUILT[n.r];
  const attrs = id ? ` id="${id}"` + (id === 'navProfiles' ? ' class="active" aria-current="page"' : '')
    : ` data-route="${esc(n.r)}" data-label="${esc(n.l)}" data-top="${esc(top || n.l)}" data-path="${esc(path.join(' > '))}"`;
  return `<button${attrs}>${icon}${esc(n.l)}</button>`;
}
const sidenav = manifest.menu.map(n => navItem(n, 0, null, [])).join('\n  ');

// ---- assemble -------------------------------------------------------------
// static default views: cropped real-Console screenshots (src/assets/static/<route>.jpg)
const staticDir = join(src, 'assets', 'static');
const staticShots = Object.fromEntries(readdirSync(staticDir).filter(f => f.endsWith('.jpg'))
  .map(f => [f, 'data:image/jpeg;base64,' + readFileSync(join(staticDir, f)).toString('base64')]));
const pageData = JSON.stringify({ menu: manifest.menu, pages: manifest.pages, capturedAt: manifest.capturedAt, shots: staticShots })
  .replace(/<\//g, '<\\/');
const js = readdirSync(join(src, 'js')).filter(f => f.endsWith('.js')).sort()
  .map(f => read(join('js', f))).join('')
  .replace('@@MANIFEST@@', () => pageData);

let html = read('page.html')
  .replace('@@STYLES@@', () => read('styles.css'))
  .replace('@@SIDENAV@@', () => '  ' + sidenav)
  .replace('@@SCRIPT@@', () => js)
  .replace(/@@ASSET:([\w.-]+)@@/g, (_, f) => readFileSync(join(src, 'assets', f)).toString('base64'));

const left = html.match(/@@[A-Z]+[:@]/);
if (left) throw new Error('Unreplaced placeholder: ' + left[0]);
writeFileSync(join(root, 'html', 'index.html'), html);
console.log(`Built html/index.html (${html.length} chars, ${Object.keys(manifest.pages).length} captured pages)`);
