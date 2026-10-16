# lab-translate

A Claude Code skill that makes a translated copy of a 26.x Instruqt exam or lab in any language. Every section shows the translation and then the original English, and the track is named `(XX/EN)`. For example, `! 26.x Test: Select Exam (PT-BR/EN)`.

## How to use it

1. Open Claude Code in a clone of this repo (`Illumio-Training-Org/26x-course`), so it picks up `.claude/skills/`.
2. Ask in plain words, for example:
   - "Make a German version of the Foundation exam with English after it"
   - "Translate the Select and Foundation exams into French"
   - "The English Select exam changed, rebuild the PT-BR version"

   You can also type `/lab-translate` and then say what you want.
3. Claude will:
   - confirm the language code and names (see below)
   - extract the English text and translate it
   - build the new track and add the English after each section
   - validate the track and push it to Instruqt as a **new** track
   - commit the result here
4. Play the new track once yourself before giving it to learners. Press **Check** on a wrong answer to see a translated feedback message.

## What gets translated

- **Translated:** task text, the welcome/splash page, the Close Lab page, challenge titles and teasers, the track description, and the feedback messages learners see after **Check**.
- **Kept in English on purpose:** label names and values, object names (Policies, Services, Label Groups, IP Lists), Console menus and terms (Pairing Profile, Enforcement Mode, Map, Source, Destination…), and the **NEXT** / **Check** buttons. Learners must type these exactly as the English Console shows them, so the welcome page says so in their language.
- **Unchanged:** all scripts and checks except their message text. A translated track behaves exactly like the English one.

## Naming convention

| | Pattern | Example |
|---|---|---|
| Track title | `! 26.x Test: <name> (<CODE>/EN)` | `! 26.x Test: Foundation Exam (PT-BR/EN)` |
| Slug | `26x-test-<name>-<code>` | `26x-test-foundation-exam-pt-br` |
| Folder | `Language Versions/<name> (<CODE>)` | `Language Versions/Foundation Exam (PT-BR)` |

Use standard language codes: `ES`, `PT-BR`, `DE`, `FR`, `IT`, `JA`, `ZH-CN`. Brazilian Portuguese is `PT-BR`; plain `PT` means European Portuguese.

## Files

- `SKILL.md`: the instructions Claude follows.
- `scripts/extract.py`: lists the English strings into a JSON file to be translated.
- `scripts/apply.py`: builds the translated track (a copy of the English one with new IDs).
- `scripts/bilingual.py`: adds the English after the translation and renames the track to `(XX/EN)`.

You can also run the scripts by hand. The commands are in `SKILL.md`, steps 2–4. They need only Python 3.

## History

- **2026-10-16:** built from the process used for the Spanish `(ES/EN)` exams. It was first used for `! 26.x Test: Select Exam (PT-BR/EN)` and `! 26.x Test: Foundation Exam (PT-BR/EN)`, and reproduces those tracks exactly.
