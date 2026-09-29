# Lab 2-Assignment Test — `! 26.x Test: Lab (2 Assignments)`

Trial copy of `Course Lab` (`! 26.x Lab`, slug `26x-lab`) with the
magic-link challenge merged into the main lab page, so the Illumio Console
link is always on the same page as the lab. Slug
`26x-test-lab-2-assignments`. Everything else - track scripts, Crystal
deployment (`Lab_<DDMM>_<org ID>`), auto-fired attack, background policy
disable, auto-delete on close - is identical to `Course Lab`; see
`../Course Lab/README.md` for how the lab works.

## What learners see

| Folder | Title | What happens |
|---|---|---|
| `01-lab` | Illumio Lab Environment | Starts straight at **🔑 Illumio Console** (magic link), then Workloads, Cloud, Containers, Incident Response, and **🛠️ Advanced** (instructor-only troubleshooting commands) at the bottom. One tab set: Illumio Platform Link, Linux, Windows, CloudCLI, AWS, k3s console. |
| `02-close-lab` | Close Lab | Warning page; NEXT ends the session and deletes the Crystal deployment. |

## Differences from `Course Lab`

- 2 challenges instead of 3; no "press NEXT" after logging in.
- The AWS build runs before the page first opens (measured 53 s), so the
  first load is ~1 minute longer (measured ~3 min 24 s from sandbox start
  on 2026-09-29), but there's no second wait later.
- No separate "cloud console" terminal tab (it was the same machine as
  CloudCLI); the Advanced section says "Using the CloudCLI Tab".
