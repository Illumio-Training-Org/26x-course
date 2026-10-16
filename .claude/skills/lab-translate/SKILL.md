---
name: lab-translate
description: Make a translated copy of a 26.x Instruqt track (exam or lab) in any language, with the English text after the translation in every section, named "(XX/EN)". Use when asked to translate an exam or lab, make a Spanish/Portuguese/German/French/Japanese/... version, add a language version, or rebuild a language version after the English track changed.
---

# lab-translate: build a "(XX/EN)" language version of a track

The result is a **new** Instruqt track. Every learner-facing section shows the translation first and then the original English. Object, label and Console names stay in English. Scripts and logic are unchanged; only text changes. The existing examples are `Language Versions/Select Exam (ES)` and `Language Versions/Select Exam (PT-BR)`.

Paths are relative to the `26x-course` repo root. The scripts are in this skill's `scripts/` folder and need only Python 3.

## 1. Agree the names (ask if not given)
- **Language code:** use the standard tag, upper-case: `ES`, `PT-BR` (Brazilian; plain `PT` means European Portuguese), `DE`, `FR`, `IT`, `JA`, `ZH-CN`…
- **Folder:** `Language Versions/<English folder name> (<CODE>)`, e.g. `Language Versions/Select Exam (PT-BR)`.
- **Slug:** `26x-test-<english-slug-words>-<code-lowercase>`, e.g. `26x-test-select-exam-pt-br`. It names only the translated language, so it never has to change.
- **Title:** `! 26.x Test: <English name> (<CODE>)`. The script turns it into `(<CODE>/EN)`. Keep `Test:` until the person promotes the track.

## 2. Extract the English strings
```
python3 .claude/skills/lab-translate/scripts/extract.py "Course Exam/Select Exam" /tmp/lt/map.json
```
This writes a JSON object of `{"english": ""}`. To translate both Foundation and Select, run it twice into the **same** file. Shared strings then appear once and get one translation.

## 3. Translate: fill in the values in map.json
Write the translations into the JSON values yourself. For large files, a Python dict keyed by position is easiest. **Rules:**
- Leave a value `""` to keep that string in English. Do this for label lines (`- Role: \`web\``), bare code lines and admonition markers (`> [!NOTE]`).
- **Never translate:** label keys and values, and Policy / Service / Label Group / IP List / user names. Also keep these Console terms and buttons in English: Pairing Profile, Enforcement Mode, Idle, Selective, Visibility Only, Map, Policy, Scope, Source, Destination, All Services, All Workloads, Deny, Override Deny, Draft, Ruleset Manager, Viewer, Application Discovery Rule, Cloud Tags, Auto Approve, **NEXT**, **Check**. Translate the words around them.
- Keep Markdown exactly: `**bold**`, backticks, links, `[[ Instruqt-Var … ]]`, `> ` prefixes, list markers and numbering such as `**1 )**`.
- **`CHK|` lines** are whole lines of a check script. Return the **complete line**, with the same indentation and code, changing only the human-readable text inside the quotes. Keep `\"` and `\'` escapes exactly as they are. In `*_problems('source', …)` calls, write the side name as `'Source'` / `'Destination'`. Some `CHK|` lines are only code or joins, such as `print('; '.join(reasons))`; leave those `""`.
- **Welcome page:** add one bullet after the "no additional spaces" bullet, saying that object names and Console menus stay in English and must be typed exactly as shown. This is what the ES and PT-BR versions do.
- Use the natural, polite register for an exam: `tú` (ES), `você` (PT-BR), `Sie` (DE), `vous` (FR).

## 4. Build the translated track, then add the English
```
S=.claude/skills/lab-translate/scripts
python3 $S/apply.py "Course Exam/Select Exam" "Language Versions/Select Exam (PT-BR)" /tmp/lt/map.json PT-BR 26x-test-select-exam-pt-br "! 26.x Test: Select Exam (PT-BR)"
python3 $S/bilingual.py "Course Exam/Select Exam" "Language Versions/Select Exam (PT-BR)" PT-BR
```
- **`apply.py`:**
  - copies the English track and strips every Instruqt `id`/`checksum`, so the push creates a new track
  - applies the translations
  - lists the body lines it kept in English; read that list and check that only labels and markers are on it
- **`bilingual.py`:**
  - puts the English after the translation in each section, with English headings suffixed "(English)" or a "🇬🇧 **English**" block
  - makes challenge titles and teasers "Translation / English"
  - adds the English Outcome to the description and renames `(CODE)` to `(CODE/EN)`
  - refuses to run twice; if something went wrong, delete the folder and rebuild from step 4

## 5. Verify, push, record
1. `for f in "Language Versions/<folder>"/*/check-*; do bash -n "$f" || echo BAD $f; done`
2. Read one task page, the welcome page and the Close Lab page in full: wording, nothing dropped, English present.
3. In the new folder, run `instruqt track validate` and then `instruqt track push`. Pushing writes the new IDs back into the files. Run `instruqt update` first if the CLI asks for it.
4. Add a row for the track to the table in `Language Versions/README.md`.
5. Commit everything, including the files rewritten by the push, to `Illumio-Training-Org/26x-course` and push. Skip `.DS_Store`.
6. Tell the person that the track has not been run live yet. Suggest playing it once and pressing **Check** on a deliberately wrong answer to see a translated feedback message.

## Keeping a language version in sync
When the English track changes, either:
- **rebuild:** delete the folder (after noting its track `id:`, then put that `id:` back into `track.yml` before pushing, so the same Instruqt track is updated) and rerun steps 2–5, reusing the old `map.json` so only new strings need translating; or
- **edit by hand:** change both halves of each affected section.
