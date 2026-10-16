#!/usr/bin/env python3
"""Step 2 of lab-translate: build a translated copy of an English Instruqt track.

usage: apply.py <english track dir> <output dir> <map.json> <LANG-CODE> <new slug> "<new track title>"
  e.g. apply.py "Course Exam/Select Exam" "Language Versions/Select Exam (PT-BR)" map.json \
                PT-BR 26x-test-select-exam-pt-br "! 26.x Test: Select Exam (PT-BR)"

- copies the track (not README.md / .DS_Store) and strips every Instruqt id/checksum,
  so the push creates a NEW track instead of overwriting the English one
- replaces titles, teasers, splash text, body lines, the Outcome paragraph and
  CHK| lines in check-* scripts using map.json (empty values = keep English)
- the welcome challenge (first challenge whose title has no "NN-" prefix) gets " (LANG-CODE)"
Run bilingual.py afterwards to add the English after the translation.
"""
import json, os, re, shutil, sys, textwrap
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from extract import unwrap

def q(s): return "'" + s.replace("'", "''") + "'"

def main(EN, OUT, MAP, CODE, SLUG, TITLE):
    M = {k: v for k, v in json.load(open(MAP)).items() if v}
    if os.path.exists(OUT): sys.exit(f'{OUT} already exists - delete it first if you want to rebuild')
    shutil.copytree(EN, OUT, ignore=shutil.ignore_patterns('.DS_Store', 'README.md'))
    kept = set()
    for ch in sorted(d for d in os.listdir(OUT) if re.match(r'\d\d-', d)):
        p = f'{OUT}/{ch}/assignment.md'
        if not os.path.exists(p): continue
        fm, body = re.match(r'^---\n(.*?)\n---\n(.*)$', open(p).read(), re.S).groups()
        fm = re.sub(r'^id: .*\n', '', fm, flags=re.M)           # challenge id
        fm = re.sub(r'^- id: .*\n  ', '- ', fm, flags=re.M)     # tab ids
        for k in ('title', 'teaser'):
            m = re.search(rf'^{k}: (.*)$', fm, re.M)
            if m:
                v = m.group(1).strip("'\"")
                t = M.get(v, v)
                if k == 'title' and not re.match(r'\d+-', v) and ch.startswith('01-'): t = f'{t} ({CODE})'
                fm = fm.replace(m.group(0), f'{k}: {q(t)}')
        for en, tr in M.items():
            if not en.startswith('CHK|'): fm = fm.replace(f'>{en}<', f'>{tr}<')
        lines, code = [], False
        for l in unwrap(body).split('\n'):
            if l.startswith('```'): code = not code; lines.append(l); continue
            if code or not l.strip() or re.fullmatch(r'=+|-{3,}', l.strip()) or l.startswith('!['): lines.append(l); continue
            if l.strip() not in M: kept.add(l.strip())
            lines.append(M.get(l.strip(), l))
        open(p, 'w').write(f'---\n{fm}\n---\n' + '\n'.join(lines))
        for f in os.listdir(f'{OUT}/{ch}'):
            if f.startswith('check-'):
                cp = f'{OUT}/{ch}/{f}'
                src = open(cp).read().split('\n')
                open(cp, 'w').write('\n'.join(M.get('CHK|' + l, l) for l in src))
    tp = f'{OUT}/track.yml'
    t = open(tp).read()
    t = re.sub(r'^(id|checksum): .*\n', '', t, flags=re.M)
    t = re.sub(r'^slug: .*$', f'slug: {SLUG}', t, count=1, flags=re.M)
    t = re.sub(r'^title: .*$', f'title: {q(TITLE)}', t, count=1, flags=re.M)
    t = re.sub(r'^(  Lab Name: .*)$', lambda m: f'{m.group(1)} ({CODE})', t, count=1, flags=re.M)
    m = re.search(r'  Outcome:\n(.*?)\n(?=\S)', t, re.S)
    if m and m.group(1).replace('\n  ', ' ').strip() in M:
        t = t.replace(m.group(1), textwrap.indent(textwrap.fill(M[m.group(1).replace('\n  ', ' ').strip()], 70), '  '))
    open(tp, 'w').write(t)
    print(f'built {OUT}; body lines kept in English: {len(kept)}')
    for s in sorted(kept): print('   ', s[:110])

if __name__ == '__main__':
    main(*sys.argv[1:7])
