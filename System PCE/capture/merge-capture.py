#!/usr/bin/env python3
"""Merge a fresh capture into pce-manifest.json and report what changed.

    pbpaste > /tmp/pages.json                 # pages captured via the extension
    python3 merge-capture.py /tmp/pages.json [--menu /tmp/menu.json] [--dry-run]

pages.json is {route: page} from __capNow (or the "pages" of a Playwright
manifest). menu.json is the capture-menu.js tree. Existing hand-added fields
(staticImage, attributes) are kept unless the new capture provides them.
Refuses to write if any non-anonymised e-mail address is present.
"""
import json, re, sys, os

here = os.path.dirname(os.path.abspath(__file__))
MANIFEST = os.path.join(here, 'pce-manifest.json')
KEEP = ('staticImage', 'attributes')

args = sys.argv[1:]
dry = '--dry-run' in args
menu_path = args[args.index('--menu') + 1] if '--menu' in args else None
pages_path = next(a for a in args if not a.startswith('--') and a != menu_path)

new_pages = json.load(open(pages_path))
new_pages = new_pages.get('pages', new_pages)
new_menu = json.load(open(menu_path)) if menu_path else None

blob = json.dumps(new_pages) + json.dumps(new_menu or [])
leaks = set(re.findall(r'[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}', blob)) - {'admin@illumio-lab.invalid'}
if leaks:
    sys.exit('Refusing: non-anonymised e-mail addresses found: %s' % ', '.join(sorted(leaks)))

m = json.load(open(MANIFEST))
old = m['pages']

def flat(menu, path=()):
    for n in menu:
        yield (path + (n['l'],), n.get('r', ''))
        yield from flat(n.get('c', []), path + (n['l'],))

if new_menu is not None:
    a, b = set(flat(m['menu'])), set(flat(new_menu))
    for p, r in sorted(b - a): print('MENU +', ' > '.join(p), r and '(' + r + ')')
    for p, r in sorted(a - b): print('MENU -', ' > '.join(p), r and '(' + r + ')')
    m['menu'] = new_menu

cols = lambda p: [c.get('label') for c in p.get('columns') or []]
btns = lambda p: [b.get('label') for b in p.get('toolbar') or []]
for r, p in sorted(new_pages.items()):
    p.pop('capturedAt', None)
    o = old.get(r)
    if o is None:
        print('PAGE +', r, '-', p.get('title'))
    else:
        for name, f in (('title', lambda x: x.get('title')), ('columns', cols), ('toolbar', btns), ('tabs', lambda x: [t.get('label') for t in x.get('tabs') or []])):
            if f(o) != f(p): print('PAGE ~', r, name + ':', f(o), '->', f(p))
        for k in KEEP:
            if k in o and k not in p: p[k] = o[k]
    old[r] = p
for r in sorted(set(old) - set(new_pages)):
    print('PAGE (not re-captured, kept):', r)

if dry:
    print('dry run - manifest not written')
else:
    m['capturedAt'] = __import__('datetime').date.today().isoformat()
    json.dump(m, open(MANIFEST, 'w'), indent=1)
    open(MANIFEST, 'a').write('\n')
    print('Wrote', MANIFEST, '-', len(old), 'pages')
