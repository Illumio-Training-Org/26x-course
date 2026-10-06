# `/pce-capture`: refresh the offline PCE lab from a live Console

## What it does

`! 26.x System PCE` (`System PCE/` in this repo) is an offline copy of the Illumio PCE Console that runs entirely inside an Instruqt tab. It needs no magic link, no PCE back end and no Terraform.

I don't hand-build its menus and pages. They're generated from a **capture** of a real PCE: a read-only snapshot of the real Console's structure, saved as `System PCE/capture/pce-manifest.json`. The snapshot records:
- the full sidebar menu
- each page's title, breadcrumbs and banner text
- tabs and toolbar buttons (including which are disabled)
- filter text
- table columns, a few sample rows and pagination
- settings sections with their label/value pairs
- cropped reference screenshots for the static pages (dashboards, Cloud, a few bespoke settings pages)

When the PCE UI changes, I re-run the capture, see exactly what changed, rebuild the lab and push it. That's what this Claude Code skill walks through, step by step, so anyone can do it, not just me.

It does **not** copy Illumio's HTML, CSS or code. It reads a description of each page, and the lab's own templates rebuild the pages from it.

## When to use it
- After a PCE release changes the Console's menus, page layouts, columns or buttons.
- When the lab's reference screenshots look out of date.
- When you want to check whether anything has changed. The merge step has a dry-run mode that reports differences without writing anything.

## First-time setup

`System PCE` isn't a separate repo. It's a folder inside the **`26x-course`** repo, alongside the skill, so you clone the whole repo once:

1. **Get access** to the GitHub repo `Illumio-Training-Org/26x-course`. Ask me if you can't see it.
2. **Clone it** (Git, GitHub Desktop or the `gh` CLI all work):
   ```
   git clone https://github.com/Illumio-Training-Org/26x-course.git
   cd 26x-course
   ```
   Already cloned? Run `git pull` in the `26x-course` folder to get the latest.
3. **Install Claude Code** and sign in: https://claude.com/claude-code
4. **Choose a capture route:**
   - **Chrome route (recommended):** install the **Claude in Chrome** extension in Google Chrome and sign in with the same Claude account. https://claude.ai/chrome
   - **Playwright route:** install **Node.js** 18 or later. Google Chrome must also be installed.
5. **Only if you'll push the updated lab:**
   - Install the **Instruqt CLI**: https://docs.instruqt.com/reference/cli/commands
   - Run `instruqt auth login`.
   - You must be a member of the `illumio-training` Instruqt team.
6. **Open Claude Code inside the repo folder**, so the `/pce-capture` skill is picked up:
   ```
   cd 26x-course
   claude
   ```

The clone *is* the track's source: `System PCE/track.yml` and the challenge folders are what `instruqt track push` uploads. You don't need to download the track from Instruqt separately.

## How to run it

**You'll need:**
- Access to a PCE org and a fresh **magic link** for it. A read-only or expired-trial org is fine.
- **Either** Google Chrome with the **Claude in Chrome** extension (the route that's been proven), **or** Node.js (for the Playwright route).
- The **Instruqt CLI**, logged in, only if you're going to push the updated lab.
- This repo cloned, with **Claude Code** opened in the `26x-course` folder.

**Then:**
1. In Claude Code, started inside the `26x-course` folder (see First-time setup), type `/pce-capture`, or just ask it to "re-capture the PCE".
2. When asked, open your fresh magic link **yourself** in Chrome and say when you're signed in. Claude never signs in with a link or token, so don't paste links into the chat. If you do, treat that link as exposed and let it expire.
3. Claude walks the Console read-only, page by page, and saves the capture. It takes a few minutes.
4. Claude shows you a **change report**: added or removed menu items, new pages, and changed titles, columns, buttons and tabs. You decide whether to apply it.
5. Claude rebuilds the lab and tests it. A headless browser clicks every menu item and runs the pairing and policy flows. Then it pushes to Instruqt and GitHub.

**Before anything is pushed,** Claude checks that your copy matches what's live. If someone edited the track directly in Instruqt's web editor, those edits wouldn't be in GitHub, and a push would overwrite them. The check is:
```
git pull
cd "System PCE" && instruqt track pull --force
git diff
```
If `git diff` shows anything unexpected, Claude stops and asks you before pushing.
6. Start a **new** session of `! 26.x System PCE` to see the result. The page only installs when a session starts.

**Playwright route (no browser extension needed):**
```
cd "System PCE/capture"
npm install                                        # first time only
PCE_MAGIC_LINK='<fresh magic link>' node capture-pce.mjs
python3 merge-capture.py ...                       # or ask Claude to do the rest
```
The magic link is read from the environment and is never written to disk. This route hadn't been run against a live PCE as of 2026-10-06. If it misbehaves, use the Chrome route.

## Safety
- **Read-only.** It only navigates and reads. The only clicks it makes are:
  - dismissing "Continue in Read-Only Mode" trial notices
  - a temporary on-page button used to copy the captured data to the clipboard
- **Email addresses are anonymised** to `admin@illumio-lab.invalid` before anything leaves the browser. The merge script refuses to write if a real address slips through.
- **Screenshots** hide the trial banners and pop-up messages, and anonymise emails on screen.
- **Insights** pages aren't captured. They're out of scope for the lab.

## What's where
| File | What it is |
|---|---|
| `.claude/skills/pce-capture/SKILL.md` | The skill itself: the instructions Claude follows, including the gotchas learned during the first capture |
| `System PCE/capture/capture-menu.js` | Reads the sidebar menu tree (runs inside the Console page) |
| `System PCE/capture/capture-page.js` | Reads one page's structure (runs inside the Console page) |
| `System PCE/capture/extension-helpers.js` | Browser-side helpers for the Chrome route: anonymise, hide pop-ups, capture, copy out |
| `System PCE/capture/capture-pce.mjs` | Playwright runner for the one-command route |
| `System PCE/capture/merge-capture.py` | Merges a capture into the manifest and prints the change report (`--dry-run` to preview) |
| `System PCE/capture/crop-shots.py` | Crops screenshots into the lab's static page images |
| `System PCE/capture/pce-manifest.json` | The captured PCE: committed, so changes show up in `git diff` |

More detail on the lab itself is in `System PCE/README.md` and `System PCE/CLAUDE.md`.
