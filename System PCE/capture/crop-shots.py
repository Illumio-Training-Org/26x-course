#!/usr/bin/env python3
"""Crop real-Console screenshots into the lab's static views.

    python3 crop-shots.py shots.txt

shots.txt has one "<route> <screenshot path>" per line (screenshots saved by
the Chrome extension with save_to_disk). Each is cropped to the page body
(no sidebar/header), saved as src/assets/static/<route with / -> __>.jpg at
JPEG quality 92, and the manifest page gets "staticImage". macOS `sips` only.

Crop offsets match the extension's capture frame for a 1728x892 CSS viewport:
  1519 px wide (scale 1)    -> left 182, top 71   (preferred: sharpest)
  1139 px wide (scale 0.75) -> left 136, top 54
"""
import json, os, subprocess, sys

here = os.path.dirname(os.path.abspath(__file__))
static = os.path.join(here, '..', 'src', 'assets', 'static')
manifest = os.path.join(here, 'pce-manifest.json')
OFFSETS = {1519: (182, 71), 1139: (136, 54)}

def px(f, k):
    return int(subprocess.check_output(['sips', '-g', k, f]).split()[-1])

m = json.load(open(manifest))
os.makedirs(static, exist_ok=True)
for line in open(sys.argv[1]):
    if not line.strip(): continue
    route, f = line.strip().split(' ', 1)
    w, h = px(f, 'pixelWidth'), px(f, 'pixelHeight')
    if w not in OFFSETS: sys.exit(f'{route}: unexpected width {w}; adjust OFFSETS')
    left, top = OFFSETS[w]
    name = route.replace('/', '__') + '.jpg'
    subprocess.check_call(['sips', '-s', 'format', 'jpeg', '-s', 'formatOptions', '92',
                           '-c', str(h - top), str(w - left), '--cropOffset', str(top), str(left),
                           f, '--out', os.path.join(static, name)], stdout=subprocess.DEVNULL)
    m['pages'].setdefault(route, {})['staticImage'] = name
    print('cropped', route)
json.dump(m, open(manifest, 'w'), indent=1)
open(manifest, 'a').write('\n')
