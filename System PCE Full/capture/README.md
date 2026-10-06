# PCE capture

`capture-pce.mjs` makes a read-only copy of the **real** PCE Console's structure. The simulated Console in this lab is generated from that copy.

It saves:
- the menu tree
- for each page: title, breadcrumbs, banner, tabs, toolbar buttons (with their disabled state), filter text, table columns, a few sample rows (with emails anonymised), pagination, and section headings with their field labels

## Run it (on a Mac with Google Chrome installed)
```
cd capture
npm install            # first time only (installs Playwright)
PCE_MAGIC_LINK='<fresh magic link>' node capture-pce.mjs
```
- Optional: `PCE_SHOW=1` shows the browser while it runs, and `PCE_WAIT_MS=6000` slows it down for a slow PCE.
- It writes `pce-manifest.json` and `screenshots/`. Screenshots are git-ignored and used only for visual reference.
- It is read-only. The only click it makes dismisses an expired-trial "Continue in Read-Only Mode" notice.
- The magic link is never written to disk.

## When the PCE changes
1. Re-run the capture.
2. Run `git diff capture/pce-manifest.json` to see what changed: new menu items, renamed columns, new buttons.
3. Rebuild with `./build-setup.sh`, check any hand-built pages the diff touches, then push.

## Files
| File | Purpose |
|---|---|
| `capture-menu.js` | Reads the sidebar tree. Runs inside the Console page. |
| `capture-page.js` | Reads one page's structure. Runs inside the Console page. Uses the Console's own `data-tid` hooks, for example `comp-grid-column-<key>`. |
| `capture-pce.mjs` | Logs in, walks every route (except Insights), and writes the manifest. |
| `menu-raw.json` | The first menu capture (2026-10-06), made through the browser extension. |
