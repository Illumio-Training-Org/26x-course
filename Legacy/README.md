# Legacy — superseded 26.x tracks (vensim)

The previous build of the 26.x lab and exams, from before the move to
Project Crystal. Kept unchanged (frozen) as a working backup and a reference
example. They appear in Instruqt as `! 26.x Superseded: ...`, which sorts
straight after the current tracks.

| Folder | Title / slug |
|---|---|
| `Course Lab/` | `! 26.x Superseded: Lab` / `26x-superseded-lab` |
| `Course Exam/Foundation Exam/` | `! 26.x Superseded: Foundation Exam` / `26x-superseded-foundation-exam` |
| `Course Exam/Associate Exam/` | `! 26.x Superseded: Associate Exam` / `26x-superseded-associate-exam` |
| `Course Exam/Select Exam/` | `! 26.x Superseded: Select Exam` / `26x-superseded-select-exam` |
| `Course Exam/Specialist Exam/` | `! 26.x Superseded: Specialist Exam` / `26x-superseded-specialist-exam` |

**How they differ from the current tracks:** objects and traffic come from
`workloader` + vensim running inside the sandbox (cloned from
`Illumio-Training-Org/manual-instruqt-startup` and `vensim_files`), not
from a Crystal deployment. No Crystal API key or cleanup is involved. vensim
can report traffic for unmanaged workloads, which Crystal can't.

Only titles/slugs have changed since they were superseded (2026-09-28); fixes
made to the current exams afterwards (e.g. scopeless Task 4, Select/Specialist
sync) were **not** back-ported.
