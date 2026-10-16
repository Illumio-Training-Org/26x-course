# Language Versions - translated exams

Spanish copies of the current Select and Foundation exams, plus an older
Japanese test copy.

| Folder | Title / slug | Built from |
|---|---|---|
| `Select Exam (ES)/` | `! 26.x Test: Select Exam (ES/EN)` / `26x-test-select-exam-es` | current `! 26.x Select Exam` (2026-10-08) |
| `Foundation Exam (ES)/` | `! 26.x Test: Foundation Exam (ES/EN)` / `26x-test-foundation-exam-es` | current `! 26.x Foundation Exam` (2026-10-08) |
| `Select Exam (JA)/` | `! 26.x Test: Select Exam (JA)` / `26x-test-select-exam-ja` | old vensim Select Exam - out of date |

## How the Spanish versions were made

I rebuilt both Spanish tracks on 2026-10-08 by copying the current English
exam folders and translating:

- the task text, splash screen, magic-link and Close Lab pages, and the track description
- the learner-facing feedback messages in each `check-cloud-client`

These stay in English on purpose, because the Illumio Console is in
English and learners have to type them exactly: label values, Policy /
Service / Label Group / IP List names, Console menu and object names
(Pairing Profile, Enforcement Mode, Map, Ruleset Manager, Source,
Destination...), and the Instruqt **NEXT** / **Check** buttons.

On 2026-10-16 both tracks became bilingual and were renamed `(ES/EN)`.
Every section shows the Spanish text followed by the English text from the
current English exam: the task, the re-login box, the welcome page, Advanced
and Close Lab. Challenge titles and teasers read "Spanish / English".
The check-script feedback messages are still Spanish only. Slugs and IDs
were not changed. When the English exam changes, update both halves.

The scripts (setup, check logic, solve, cleanup) are the same as the
English exams. When the English Select or Foundation exam changes, copy
the change across by hand and translate any new learner-facing text.

The Select (ES) track kept the earlier Spanish test track's Instruqt ID,
so it replaced that older vensim-based version in place.
