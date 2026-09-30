# Legacy — superseded 26.x tracks

Earlier versions of the 26.x lab and exams. Kept unchanged (frozen) as a working backup and a reference
example. They appear in Instruqt as `! 26.x Superseded: ...`, which sorts
straight after the current tracks.

| Folder | Title / slug |
|---|---|
| `Course Lab 30-09/` | `! 26.x Superseded: Lab 30/09` / `26x-superseded-lab-3009` - the 3-challenge **Crystal** lab, used until 2026-09-30 |
| `Course Lab 28-09/` | `! 26.x Superseded: Lab 28/09` / `26x-superseded-lab-2809` - the original **vensim** lab, superseded 2026-09-28 |
| `Course Exam/Foundation Exam/` | `! 26.x Superseded: Foundation Exam` / `26x-superseded-foundation-exam` |
| `Course Exam/Associate Exam/` | `! 26.x Superseded: Associate Exam` / `26x-superseded-associate-exam` |
| `Course Exam/Select Exam/` | `! 26.x Superseded: Select Exam` / `26x-superseded-select-exam` |
| `Course Exam/Specialist Exam/` | `! 26.x Superseded: Specialist Exam` / `26x-superseded-specialist-exam` |

**How the vensim tracks (Lab 28/09 and the four exams) differ from the current tracks:** objects and traffic come from
`workloader` + vensim running inside the sandbox (cloned from
`Illumio-Training-Org/manual-instruqt-startup` and `vensim_files`), not
from a Crystal deployment. No Crystal API key or cleanup is involved. vensim
can report traffic for unmanaged workloads, which Crystal can't.

Only titles/slugs have changed since they were superseded (2026-09-28); fixes
made to the current exams afterwards (e.g. scopeless Task 4, Select/Specialist
sync) were **not** back-ported.
