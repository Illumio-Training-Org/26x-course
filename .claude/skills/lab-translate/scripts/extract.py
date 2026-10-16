#!/usr/bin/env python3
"""Step 1 of lab-translate: list every English string in an Instruqt track that may need translating.

usage: extract.py <english track dir> <map.json>

Writes {english: ""} in first-seen order. Fill in the values; leave a value ""
to keep that string in English (labels, code, Console names...).

Collected:
  - challenge title / teaser (assignment.md front matter)
  - text inside HTML tags in front-matter notes (the splash screen)
  - every prose line of assignment.md bodies (paragraphs are unwrapped to one line first)
  - the track.yml "Outcome:" paragraph
  - lines in check-* scripts that contain a quoted English message, prefixed "CHK|"
    (the whole line is replaced, so keep the code around the message identical)
If map.json already exists, existing translations are kept and only new strings are added.
"""
import json, os, re, sys

def unwrap(body):
    """Join wrapped paragraph lines so each paragraph is one line (Markdown renders it the same)."""
    out, buf, code = [], [], False
    def flush():
        if buf: out.append(' '.join(buf)); buf.clear()
    for l in body.split('\n'):
        if l.startswith('```'):
            flush(); out.append(l); code = not code; continue
        if code: out.append(l); continue
        plain = l.strip() and not re.match(r'^(\s*[-*>] |\s*\d+\. |#|=+$|\*\*\d+ \)|!\[|<|\|)', l) and not re.fullmatch(r'-{3,}', l.strip())
        if plain and not l.startswith('  '): buf.append(l.strip())
        else: flush(); out.append(l)
    flush()
    return '\n'.join(out)

# learner-facing messages: print(...), x.append(...), x = ['...'], or a *_problems('source', ...) side name,
# on a line that also has a quoted literal containing a word
MSG = re.compile(r"""print\(|\.append\(|^\s*\w+ = \[['"]|\w+_problems\(['"]""")
QUOTED_WORD = re.compile(r"""(['"])[^'"\n]*[A-Za-z]{2,}[^'"\n]*\1""")
SKIP = re.compile(r'curl |https?://|^\s*#|import |os\.environ|json\.load|\$\(|^\s*(def|for|if|elif|while|return)\b.*:$')

def main(track, out):
    strings = json.load(open(out)) if os.path.exists(out) else {}
    def add(s):
        s = s.strip()
        if s and s not in strings: strings[s] = ''
    for ch in sorted(d for d in os.listdir(track) if re.match(r'\d\d-', d)):
        a = os.path.join(track, ch, 'assignment.md')
        if not os.path.exists(a): continue
        fm, body = re.match(r'^---\n(.*?)\n---\n(.*)$', open(a).read(), re.S).groups()
        for k in ('title', 'teaser'):
            m = re.search(rf'^{k}: (.*)$', fm, re.M)
            if m: add(m.group(1).strip("'\""))
        for t in re.findall(r'>([^<>{}]*[A-Za-z][^<>{}]*)<', fm):
            if t.strip() and '@' not in t: add(t)
        code = False
        for l in unwrap(body).split('\n'):
            if l.startswith('```'): code = not code; continue
            if code or not l.strip() or re.fullmatch(r'=+|-{3,}', l.strip()) or l.startswith('!['): continue
            add(l)
        for f in sorted(os.listdir(os.path.join(track, ch))):
            if f.startswith('check-'):
                for l in open(os.path.join(track, ch, f)).read().split('\n'):
                    if MSG.search(l) and QUOTED_WORD.search(l) and not SKIP.search(l):
                        add('CHK|' + l)
    t = open(os.path.join(track, 'track.yml')).read()
    m = re.search(r'  Outcome:\n(.*?)\n(?=\S)', t, re.S)
    if m: add(m.group(1).replace('\n  ', ' ').strip())
    json.dump(strings, open(out, 'w'), ensure_ascii=False, indent=1)
    todo = sum(1 for v in strings.values() if not v)
    print(f'{len(strings)} strings in {out} ({todo} without a translation yet)')

if __name__ == '__main__':
    main(*sys.argv[1:3])
