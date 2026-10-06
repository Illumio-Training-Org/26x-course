---
name: pce-capture
description: Re-capture the real Illumio PCE Console (menus, page layouts, columns, settings, reference screenshots) into the ! 26.x System PCE lab's manifest, then rebuild and push the lab. Use when the PCE UI has changed, when asked to "re-capture the PCE", refresh the System PCE lab from a live Console, or update its screenshots. READ-ONLY against the PCE.
---

# PCE capture: refresh the offline Console from a live PCE

The `! 26.x System PCE` lab (`26x-course/System PCE/`) is an offline Illumio Console. Its sidebar and pages are generated from `capture/pce-manifest.json`, which is a read-only capture of a real PCE. Re-running the capture when the PCE changes is how the lab stays current:

1. capture
2. merge (which prints a change report)
3. rebuild
4. test
5. push

Paths below are relative to `26x-course/System PCE/`. Read that folder's `CLAUDE.md` first. If `26x-course` isn't cloned or is out of date, follow the First-time setup in this skill's `README.md` (clone `Illumio-Training-Org/26x-course` and `git pull`).

## Ground rules (non-negotiable)
- **Read-only.** Navigate and read only. Never click Save, Add, Remove, Provision, Edit or Confirm, and never submit a dialog. The only allowed clicks are:
  - dismissing "Continue in Read-Only Mode" trial notices
  - the temporary clipboard overlay described below
- **Never sign in with a magic link or token yourself.** The user opens a fresh magic link in their own Chrome, or sets `PCE_MAGIC_LINK` for the Playwright script. If a link is pasted into chat, don't use it; tell them it's now exposed and should expire or be revoked.
- **Anonymise.** No real email addresses may leave the browser. The helpers replace them with `admin@illumio-lab.invalid`, and `merge-capture.py` refuses to write if any slip through.
- **Insights pages are out of scope.** Explore › Traffic and Mesh are placeholders.

## Route A: Playwright (one command; the user runs it)
```
cd capture && npm install                      # first time only
PCE_MAGIC_LINK='<fresh link>' node capture-pce.mjs   # PCE_SHOW=1 to watch, PCE_WAIT_MS=6000 if slow
```
It writes `pce-manifest.json` and `screenshots/`, which is git-ignored.

As of 2026-10-06 this route had **not yet been run live**. If it misbehaves, use Route B, then fix the script.

## Route B: Claude in Chrome (proven 2026-10-06)
1. **Ask the user** to open a fresh magic link in Chrome and say when they're in. Load the Chrome tools in one ToolSearch call. Use the Console tab in your tab group.
2. **Inject the helpers** with javascript_tool:
   - first, `window.__capFn = () => <contents of capture/capture-page.js>`
   - then `capture/extension-helpers.js`, which defines `__prep`, `__hideModals`, `__capNow`, `__copyOverlay` and `__cleanup`

   Re-inject after any full page reload.
3. **Menu:** run `capture/capture-menu.js` and copy the result out (step 6). This is the sidebar tree, read from textContent, so collapsed groups are included.
4. **Pages:** for every route in the menu except `insights/*`, run a browser_batch of:
   - `navigate` to `https://<pce>/#/<route>`
   - `computer wait 4–5s` (allow more for dashboards and large lists)
   - `javascript_exec window.__capNow('<route>')`

   Do 3–5 routes per batch. Each call returns a summary like `route -> actualRoute | Title [n cols/n rows]`. A different actual route means the page redirected in that org (for example AI Labeling or Essential Service Rules); treat those as placeholders.
5. **Static screenshots** (Dashboards, Cloud pages, and bespoke settings pages; see `staticImage` in the manifest). For each page:
   - hover the mouse over the sidebar, out of the page body
   - navigate and wait
   - run `__prep()` then `__hideModals()`
   - take a `computer screenshot` with `save_to_disk: true` and **scale: 1**, which gives a sharp 1519 px frame
   - record `<route> <saved path>` in a text file

   Then run `python3 capture/crop-shots.py shots.txt` (crops at quality 92 and sets `staticImage`).
6. **Getting data out:** small values can be returned directly, but output is cut at about 1,000 characters, so for the full capture:
   1. Run `__copyOverlay(localStorage.getItem('__pcecap'))`.
   2. Click the viewport centre with the computer tool. Clipboard writes need a real click.
   3. Locally, run `pbpaste > /tmp/pages.json`.
   4. Finish with `__cleanup()`.

### Gotchas learned the hard way
- **Never run browser batches in parallel** against one tab. They navigate over each other and the captures get mixed up.
- **Don't loop with in-page timers.** Chrome throttles background tabs, so a `setTimeout` loop crawls. Drive the waits from outside the page with navigate + wait + exec.
- **javascript_exec times out at about 45 s**, so keep each call short.
- **Classic tables:** read rows per `[data-tid~="comp-grid-row"]`, not by cell index. Empty cells otherwise shift values into the wrong row. `capture-page.js` already does this.
- **Newer pages use AG Grid** (Labels, Label Types, Users and others). Merge `.ag-row` by `row-index`, and skip the side-bar pseudo-tabs "Columns" and "Filters".
- **Settings pages** use `comp-sectiontitle-*` and `comp-attributerow` label/value pairs, which become `attributes` in the manifest.
- **Stable hooks** are the Console's `data-tid` attributes: `comp-navbar-label`, `comp-breadcrumbs`, `comp-toolbar`, `comp-button`, `comp-selector`, `comp-grid-column-<key>` and `comp-pagination`.
- **Sessions expire** (you'll land on `#/login`). Ask the user for a fresh login; don't try to sign in.

## After capturing (both routes)
1. **Merge and review:**
   ```
   python3 capture/merge-capture.py /tmp/pages.json --menu /tmp/menu.json --dry-run
   ```
   - It lists added or removed menu items, new pages, and changed titles, columns, toolbars and tabs.
   - Run it without `--dry-run` to write.
   - Hand-added `staticImage` and `attributes` are kept.
2. **Check hand-built overrides** the change report touches:
   - Pairing, Workloads and Policies (`src/js/00`–`40`)
   - Labels, Services and IP Lists (`src/js/60-objects.js`)
   - routing in `src/js/50-manifest-pages.js`
3. **Rebuild:** `./build-setup.sh` runs `node build.mjs` and re-embeds the page.
4. **Test** with the headless-Chrome harness (see `CLAUDE.md`):
   - Run the smoke test that clicks every sidebar item; it must report `problems: none` and `errors: none`.
   - Run the pairing and policy flows.
   - Run `bash -n` and table tests on the check scripts.
5. **Ship:**
   1. **Sync check first:** `git pull`, then in `System PCE/` run `instruqt track pull --force`, then `git diff`. If the Instruqt copy has edits that aren't in git, stop and ask the user before continuing, because pushing would overwrite them.
   2. `instruqt track validate`
   3. `instruqt track push`
   4. commit and push `26x-course` to GitHub
   5. tell the user to start a **new** session, because pages install at session start

## Files
| File | Purpose |
|---|---|
| `capture/capture-menu.js` | In-page: sidebar tree |
| `capture/capture-page.js` | In-page: one page's structure |
| `capture/extension-helpers.js` | In-page helpers for Route B |
| `capture/capture-pce.mjs` | Route A Playwright runner |
| `capture/merge-capture.py` | Merge into the manifest and print the change report |
| `capture/crop-shots.py` | Crop screenshots into `src/assets/static` |
| `capture/pce-manifest.json` | The captured PCE (commit it, diff it) |
