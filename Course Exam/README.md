# Course Exam — current 26.x exams

The four current certification exams, all Crystal-based. Each subfolder is
its own Instruqt track. The previous vensim-based versions are in
`../Legacy/Course Exam/` (`! 26.x Superseded: ...`).

| Audience | Folder | Title / slug | Tasks | Time limit |
|---|---|---|---|---|
| Partner | `Foundation Exam/` | `! 26.x Foundation Exam` / `26x-foundation-exam` | 10 | 75 min |
| Customer | `Associate Exam/` | `! 26.x Associate Exam` / `26x-associate-exam` | 5 (= Foundation 1-5) | 45 min |
| Partner | `Select Exam/` | `! 26.x Select Exam` / `26x-select-exam` | 10 | 150 min |
| Customer | `Specialist Exam/` | `! 26.x Specialist Exam` / `26x-specialist-exam` | 5 (= Select 1-5) | 120 min |

**Which exams each audience takes:** Customers take the Associate Exam
(5 questions) then the Specialist Exam (5 questions). Partners take the
Foundation Exam (10 questions) then the Specialist Exam (5 questions).

**Sync rule:** Associate's tasks must stay identical to Foundation's first
5, and Specialist's to Select's first 5 — any wording or check change in one
goes into the other.

## How each exam is built

- `01-magic-link` — access to the learner's PCE org.
- `NN-task-N` — one challenge per task, each with a `check-cloud-client`
  (runs on **Check**; failures shown via `fail-message`) and a
  `solve-cloud-client`. Tasks 1 (pairing), 8 (scoped user) and 10 (cloud
  onboarding) have stub solves, so `instruqt track test` can't run an exam
  end to end — test by hand.
- `NN-close-lab` — pressing NEXT ends the session and deletes the Crystal
  deployment.
- `track_scripts/setup-cloud-client` — Crystal deployment
  (`<Exam>Exam_<DDMM>_<org ID>_<learner>`, e.g.
  `SelectExam_3009_4140391_james-eifler`, no attack), `/root/.autoaccount_env` for the check
  scripts, and a background `/root/exam-start-state.py` that waits for
  Crystal's import, then disables the demo (non-"Task") rulesets
  (Foundation also plants the Task 9 rogue label). Log:
  `/var/log/exam-start-state.log`. **Select** additionally builds the AWS
  infra and onboards the account to Illumio Cloud in the background for
  Task 10 (log: `/var/log/aws-onboard-startup.log`).
- `track_scripts/cleanup-cloud-client` — deletes the Crystal deployment on
  stop/expiry.

Pass mark for every exam: 80%.
