# Foundation Exam

`! 26.x Foundation Exam` — the partner-facing certification exam covering
the first 2 days of the 26.x course (Foundation/Associate content:
PLAN Sprint 1, Mapping Labels, Policy Objects, Administration, Enforcement
Modes, Cloud Onboarding). Runs against the shared base lab build (magic
link PCE org, AWS Terraform build, RockyLinux/Windows VMs, k3s/CVEN node —
see the repo root `README.md`).

**Pass mark: 8 out of 10 tasks correct (80%).**

## Tasks

| # | Task | Teaser |
|---|---|---|
| 1 | `02-task-1` | Pair a Workload |
| 2 | `03-task-2` | Label the Workload |
| 3 | `04-task-3` | Find It on the Map (quiz) |
| 4 | `05-task-4` | Create a Deny Policy |
| 5 | `06-task-5` | Enforce Selective Mode |
| 6 | `07-task-6` | Find & Remove a Rogue Label |
| 7 | `08-task-7` | Create a Scoped User |
| 8 | `09-task-8` | Create Policy Objects (IP List, Label Group, Service) |
| 9 | `10-task-9` | Onboard a Cloud Instance |
| 10 | `11-task-10` | Find the AWS Account ID (quiz) |

Each non-quiz task has a `check-cloud-client` (graded automatically) and
a `solve-cloud-client` (runs when the learner clicks Skip, if
`skipping_enabled: true`). Quiz tasks (3, 10) are graded natively by
Instruqt from the `answers`/`solution` fields — no check script needed.

## Known limitation: 3 tasks can't be solved by Skip

`skipping_enabled: true` is set so every task can be skipped, but Skip
only *actually completes the task* where it's technically possible to
script. Three tasks are real exceptions — their `solve-cloud-client` is a
stub that lets Skip proceed without erroring, but does **not** perform
the task:

- **Task 1 (pair a workload)** — VEN pairing requires a real agent
  installed and checking in from `linux-vm`; there's no API call that
  can fake this.
- **Task 7 (create a scoped user)** — live-tested 2026-09-01: Illumio
  restricts user/identity management (`POST /users`) to the **Global
  Organization Owner** role specifically (confirmed via Illumio's own
  RBAC docs — even Global Administrator is excluded). The automation
  API key every check/solve script runs as comes from Instruqt's
  `magiclinktenantcreatev2` custom resource, which does not provision
  an Owner-level key. This isn't a payload bug — it was live-verified
  against a real sandbox with the exact correct request shape and still
  returns `403`. Fixing it would require Instruqt/Illumio to issue that
  automation credential with Owner privileges, which is a platform-side
  change outside this repo.
- **Task 9 (onboard AWS)** — onboarding requires a real CloudFormation
  stack run inside the learner's own AWS Console session; there's no way
  to complete this from a script running in `cloud-client`.

Practical effect: a learner who skips any of these three will not have
that task's real-world state, and (for Task 1 specifically) skipping it
also breaks Tasks 2, 3, 5, and 8's own Skip solves, since they all
depend on `linux-vm` actually being a paired workload. See
`solve-cloud-client` in each task's folder for the exact comment/reasoning.
