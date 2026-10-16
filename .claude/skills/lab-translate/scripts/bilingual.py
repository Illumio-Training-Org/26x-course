"""Step 3 of lab-translate: put the English text after the translation in every section, rename (CODE) -> (CODE/EN).
usage: bilingual.py <english track dir> <translated track dir> <LANG-CODE>"""
import os, re, sys
EN, ES, CODE = sys.argv[1], sys.argv[2], sys.argv[3]

def split_fm(text):
    m = re.match(r'^---\n(.*?)\n---\n(.*)$', text, re.S)
    return m.group(1), m.group(2)

def fm_get(fm, key):
    m = re.search(rf'^{key}: (.*)$', fm, re.M)
    return m.group(1) if m else None

def fm_set(fm, key, val):
    return re.sub(rf'^{key}: .*$', f'{key}: {val}', fm, count=1, flags=re.M)

def q(s):  # YAML-safe single-quoted scalar
    s = s.strip()
    if s[:1] in "'\"": s = s[1:-1]
    return "'" + s.replace("'", "''") + "'"

def sections(body):
    """Split on setext H1 headings ('Title' then '=========='). Returns (preamble, [section,...])."""
    lines = body.split('\n')
    starts = [i - 1 for i, l in enumerate(lines) if re.fullmatch(r'=+', l) and i > 0 and lines[i - 1].strip()]
    if not starts:
        return body, []
    pre = '\n'.join(lines[:starts[0]])
    secs = ['\n'.join(lines[a:b]).rstrip('\n') for a, b in zip(starts, starts[1:] + [len(lines)])]
    return pre, secs

EN_MARK = '🇬🇧 **English**'

for ch in sorted(d for d in os.listdir(ES) if re.match(r'\d\d-', d)):
    esp, enp = os.path.join(ES, ch, 'assignment.md'), os.path.join(EN, ch, 'assignment.md')
    if not os.path.exists(esp): continue
    es_fm, es_body = split_fm(open(esp).read())
    en_fm, en_body = split_fm(open(enp).read())
    if EN_MARK in es_body or 'English)' in es_body:
        sys.exit(f'{ch}: already bilingual, refusing to run twice')

    # titles / teasers: "Spanish / English"
    es_t, en_t = fm_get(es_fm, 'title'), fm_get(en_fm, 'title')
    if f'({CODE})' in es_t:
        new_t = q(es_t.strip("'\"").replace(f'({CODE})', f'({CODE}/EN)'))
    else:
        en_short = re.sub(r'^\d+-', '', en_t.strip("'\""))
        new_t = q(f"{es_t.strip(chr(39)+chr(34))} / {en_short}") if en_short != re.sub(r'^\d+-', '', es_t.strip("'\"")) else es_t
    es_fm = fm_set(es_fm, 'title', new_t)
    if fm_get(es_fm, 'teaser') and fm_get(en_fm, 'teaser'):
        es_fm = fm_set(es_fm, 'teaser', q(f"{fm_get(es_fm, 'teaser').strip(chr(39)+chr(34))} / {fm_get(en_fm, 'teaser').strip(chr(39)+chr(34))}"))

    es_pre, es_secs = sections(es_body)
    en_pre, en_secs = sections(en_body)
    if es_secs:
        assert len(es_secs) == len(en_secs), ch
        out = [es_pre.rstrip('\n')] if es_pre.strip() else []
        en_pre_b = re.sub(r'^\s*!\[Illumio\]\([^)]*\)\n+', '', en_pre).strip('\n')
        if en_pre_b.strip():
            out += [f'{EN_MARK}\n\n' + re.sub(r'\n+---\s*$', '', en_pre_b).rstrip('\n') + '\n\n---']
        for s_es, s_en in zip(es_secs, en_secs):
            h, bar, rest = s_en.split('\n', 2)
            out += [s_es, f'{h} (English)\n{bar}\n{rest}']
        body = '\n\n'.join(out) + '\n'
    else:
        en_b = re.sub(r'^!\[Illumio\]\([^)]*\)\n+', '', en_body.lstrip('\n'))  # don't repeat the banner
        body = es_body.rstrip('\n') + f'\n\n---\n\n{EN_MARK}\n\n' + en_b.rstrip('\n') + '\n'
    open(esp, 'w').write(f'---\n{es_fm}\n---\n{body}')
    print(ch, '->', fm_get(es_fm, 'title'))

# track.yml: title + bilingual description
tp = os.path.join(ES, 'track.yml')
t = open(tp).read()
t = t.replace(f"({CODE})'", f"({CODE}/EN)'", 1).replace(f'({CODE})\n', f'({CODE}/EN)\n', 1)
en_t = open(os.path.join(EN, 'track.yml')).read()
en_out = re.search(r'  Outcome:\n(.*?)\n(?=\S)', en_t, re.S).group(1)
t = re.sub(r'(  Outcome:\n.*?)\n(?=\S)', lambda m: m.group(1) + '\n\n' + en_out + '\n', t, count=1, flags=re.S)
open(tp, 'w').write(t)
print(re.search(r"^title: .*$", t, re.M).group(0))
