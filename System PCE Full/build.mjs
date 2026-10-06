// Builds html/index.html from src/: page.html shell + styles.css + js/*.js
// (concatenated in file-name order, sharing one scope) + assets/ (inlined as
// data: URIs). No dependencies - run with `node build.mjs`.
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const src = join(root, 'src');
const read = p => readFileSync(join(src, p), 'utf8');

const js = readdirSync(join(src, 'js')).filter(f => f.endsWith('.js')).sort()
  .map(f => read(join('js', f))).join('');

let html = read('page.html')
  .replace('@@STYLES@@', () => read('styles.css'))
  .replace('@@SCRIPT@@', () => js)
  .replace(/@@ASSET:([\w.-]+)@@/g, (_, f) => readFileSync(join(src, 'assets', f)).toString('base64'));

const left = html.match(/@@[A-Z]+[:@]/);
if (left) throw new Error('Unreplaced placeholder: ' + left[0]);
writeFileSync(join(root, 'html', 'index.html'), html);
console.log(`Built html/index.html (${html.length} chars)`);
