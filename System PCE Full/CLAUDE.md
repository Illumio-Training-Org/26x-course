# ! 26.x System PCE Full: project memory

Instruqt track `! 26.x System PCE Full`, slug `26x-system-pce-full`, track id `ufyzucbciijx`.

It is an offline, simulated Illumio PCE Console with Linux, Windows and AIX terminal tabs. It needs no magic link, no PCE back end and no Terraform. The full plan is in `docs/26x System PCE Full - Plan.docx`, approved 2026-10-06.

## Relationship to the frozen lab
- `../System PCE/` (`! 26.x System PCE`, `26x-system-pce`, commit 3885d96) is **frozen**. Nathan wants it left exactly as it is, so never edit it.
- This folder started as a copy of that lab (commit 03f90e1) and is where all new work goes.

## Goal: a working console whose menus are cheap to update
The lab is built in three stages:
1. **Capture.** `capture/capture-pce.mjs` (Playwright, **read-only**) logs into a real PCE and walks the sidebar. It records each page's title, breadcrumb, banner, tabs, toolbar, filter, table columns, and detail and form fields. Outputs: `pce-manifest.json`, `seed.json` (sanitised) and `screenshots/`.
2. **Generate.** Generic templates build the pages from the manifest: list, detail, form, static, blank-with-search and placeholder. The shared store keeps the data.
3. **Override.** Hand-built behaviour for the pages labs teach lives in `overrides/`, attached to a menu path.

**When the PCE menus change:** re-run the capture, `git diff pce-manifest.json`, rebuild, check the affected overrides, then push.

## Scope
| Area | Level |
|---|---|
| Segmentation (including Policy Objects), Label Management, Servers & Endpoints, Quarantine, Access, Settings, Support | Clickable and realistic, generated from the manifest |
| Pairing Profiles, Workloads, Policies, Labels, Label Groups, Services, IP Lists | Fully working: add, edit and remove are saved, and feed the rule pickers |
| Dashboard, Cloud | Static default view, nothing clickable |
| Explore › Map | Blank area with only the search and filter boxes |
| All Insights pages, Explore › Traffic, Mesh | Placeholder |

## Build order and progress
1. ✅ Scaffold the new track (2026-10-06, commit 03f90e1).
2. ⬜ Split `html/Illumio-PCE-Pairing-Lab-Offline.html` into `src/` parts plus `build.mjs`, with output identical in behaviour. Prove it with the headless tests.
3. ⬜ Write `capture/capture-pce.mjs`. Nathan runs it once, then we review the manifest together.
4. ⬜ Generic templates and the manifest-driven sidebar, so every menu item is clickable.
5. ⬜ Labels, Label Groups, Services and IP Lists fully working and wired into the policy pickers.
6. ⬜ Static views (Dashboard, Cloud) and the blank Map.
7. ⬜ **Stop: working console complete.**

**Later phase, not to be built yet:** tasks and check scripts on the parts of the console that match the **Foundation** and **Select** exam tasks.

## How the lab works today (inherited from the frozen lab)
- **Container:** one `cloud-client` container (512MB). `server/server.py` serves the pages on **port 8080** and accepts `POST /api/state`, which writes `/root/pce-lab-state.json` for the check scripts.
- **One HTML page, four tabs:** the same page is served as `index.html`, `linux.html`, `windows.html` and `aix.html`, and picks Console or terminal mode from its file name. The tabs share state through localStorage and BroadcastChannel (key `illumio-pce-lab-v1`).
- **Setup script:** `build-setup.sh` base64-embeds the page and the server into `track_scripts/setup-cloud-client`. Never edit the generated script by hand.
- **Challenges:**
  - 01 Pair a Workload. Its check needs linux, windows and aix all paired.
  - 02 Writing Policy. Its check is `RULE_TYPE=allow`. Open question: should it be Deny?
  - 03 Lab Complete.
- **No "simulation" wording** in anything learners see: tabs, task text, description or teaser.
- **Linux pairing output** replays a real VEN 24.2.20 log. The Windows and AIX output, the error messages and `illumio-ven-ctl status` are approximations.

## Working rules
- **After any change:** `bash -n` and table-test the check scripts. The macOS bash 3.2 breaks on an apostrophe inside a `<<'PY'` heredoc in `$( )`.
- **Before pushing:** `instruqt track validate`, then `instruqt track push`.
- **After pushing:** commit and push to GitHub `26x-course` (skip `.DS_Store`).
- **Testing:** use the headless-Chrome harness. Serve with `PCE_LAB_ROOT`, `PCE_LAB_STATE` and `PCE_LAB_PORT` set for `server/server.py`, inject driver scripts, and use `--dump-dom` and `--screenshot`.
- **Pages update only at session start.** Nathan must start a new session to see changes.
- **Magic links are credentials.** Never log in with them. The capture script reads `PCE_MAGIC_LINK` from an environment variable that Nathan sets, and nothing token-related is ever written to disk or git.
- **Terminology:** always "Source" and "Destination", never "consumers" or "providers".
