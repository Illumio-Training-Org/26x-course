# ! 26.x System PCE

An offline Illumio PCE Console generated from a capture of the real Console (`capture/`), with
working Pairing, Workloads, Policies, Labels, Label Groups, Services and IP Lists. The plan is in
`docs/26x System PCE Full - Plan.docx`.

It's becoming a **mock Foundation exam**: practice questions to take before the real Foundation Exam, checked against the offline Console instead of a real PCE. The questions so far:

| # | Challenge | What the check needs |
|---|---|---|
| 1 | Workload Pairing | Linux, Windows and AIX all paired |
| 2 | Label Creation | Labels `inventory` (Application), `QA` (Environment), `de` (Location) |
| 3 | Label Group Creation | Environment group `non-production` with exactly Development, Staging and QA |
| 4 | Service Definition | Service `Elasticsearch` with exactly 9200 TCP and 9300 TCP |
| 5 | Writing Policy | Policy `Block Development to Production` with a Deny Rule from Development to Production on All Services |
| 6 | Lab Complete | none |

The Console reports its workloads, policies, labels, label groups and services to the lab web server, which saves them to `/root/pce-lab-state.json` for the check scripts.

An Instruqt track (`26x-system-pce`) with four tabs:
**Illumio Console | Linux | Windows | AIX**. The Console is an offline
recreation of the Pairing Profiles workflow; each OS tab is a terminal where
the learner pastes the pairing script copied from the Console. All four tabs
are the same page (`index.html`, `linux.html`, `windows.html`, `aix.html`),
which picks Console or terminal mode from its file name, and they share state
in the browser (localStorage + BroadcastChannel), so a paired workload shows
up in the Console's Workloads list. Learner-facing text never mentions a
simulation. Reset lab is on the account avatar (top right of the Console);
Unpair works on a workload's page.

- No magic link, Terraform, secrets or real PCE. One small `cloud-client`
  container serves the page on port 8080 through a website (service) tab.
- The page source is `src/ (built into html/index.html)`. It is
  embedded in `track_scripts/setup-cloud-client`, so the lab has no
  download at start-up.

## Keeping it in step with the real PCE

Use the `/pce-capture` Claude Code skill. See [its README](../.claude/skills/pce-capture/README.md).

## How the lab works

No real PCE is involved. Everything runs in the one small `cloud-client` container that Instruqt starts for each learner.

**1. When the lab starts**, Instruqt runs `track_scripts/setup-cloud-client`. That one script:
- unpacks the Console page (one HTML file) into `/var/www/pce-lab/`, and copies it as `linux.html`, `windows.html` and `aix.html`
- writes out the small lab web server, `/opt/pce-lab/server.py`
- creates an empty state file, `/root/pce-lab-state.json`
- starts the web server on port 8080

This takes about 30 seconds. Nothing is downloaded from the internet.

**2. The learner's tabs.** Each of the four tabs (Illumio Console, Linux, Windows, AIX) opens a page from that web server. They're all the same page; it looks at its own file name to decide whether to show the Console or a terminal.

**3. Everything the learner does happens in their browser.** Adding a label, creating a policy or pasting the pairing script into a terminal runs inside the page itself. The page keeps its data in the browser's local storage, so:
- the four tabs stay in sync with each other (a workload paired in the Linux tab appears in the Console's Workloads list straight away)
- the work survives a page refresh
- **Reset lab** (the account avatar, top right of the Console) clears it

**4. The page tells the lab server what the learner has done.** After every change, the page sends a short summary to the lab web server: which workloads are paired, the policies and their rules, the labels, label groups and services. The server saves it to `/root/pce-lab-state.json`.

**5. Check reads that file.** When the learner clicks **Check**, Instruqt runs that challenge's `check-cloud-client` script in the container. The script reads `/root/pce-lab-state.json` and either passes, or fails with a message saying exactly what's missing (shown to the learner through Instruqt's `fail-message`).

So the path for any task is:

```
learner clicks in the Console  ->  page saves it in the browser  ->  page reports it to server.py
  ->  /root/pce-lab-state.json  ->  learner clicks Check  ->  check script reads the file  ->  pass / fail message
```

Each challenge also has a `solve-cloud-client` script. It writes the correct answer straight into the state file, so `instruqt track test` can run the whole track automatically without a browser.

## Why the setup script contains base64

If you open `track_scripts/setup-cloud-client`, most of it is one huge block of random-looking characters. That block is the whole Console page (about 2.6 MB of HTML, CSS, JavaScript and images) encoded as **base64**: a standard way of writing any file using only plain letters, digits, `+` and `/`.

**Why do it this way?**
- **No download at start-up.** The page travels inside the setup script that Instruqt already runs, so the lab doesn't depend on GitHub, OneDrive or any other website being reachable. If the lab starts, the page is there.
- **It survives being pasted into a script.** The page contains quotes, dollar signs, backslashes and long lines. Pasted into a bash script as-is, bash would try to interpret them. Base64 has none of those characters, so it can't break the script.
- **One file to manage.** Instruqt stores and versions track scripts for us. There's no separate hosting to keep in step with the track.

**How it works in the script:**

```bash
base64 -d > /var/www/pce-lab/index.html <<'PCE_HTML_B64'
PCFkb2N0eXBlIGh0bWw+CjxodG1sIGxhbmc9ImVuLVVTIiBkaX...   (thousands of lines)
PCE_HTML_B64
```

`base64 -d` decodes everything between the two `PCE_HTML_B64` markers back into the original `index.html`, byte for byte. The small web server (`server.py`) is short and plain, so it's embedded as normal readable text rather than base64.

**What it is not:** base64 is **not** encryption or hiding. Anyone can decode it, and it contains nothing secret: no passwords, keys or magic links.

**To see the page yourself:** it's in `html/index.html` in this repo, and its source is in `src/`. To decode it from the setup script:

```bash
sed -n '/<<.PCE_HTML_B64./,/^PCE_HTML_B64$/p' track_scripts/setup-cloud-client | sed '1d;$d' | base64 -d > page.html
```

**Never edit the base64 by hand.** The setup script is generated by `./build-setup.sh` (see below). Change the files in `src/`, rebuild, and the base64 block is regenerated.

## Updating the page

The page is built from `src/` by `build.mjs`, and `build-setup.sh` runs that build first.

1. Edit the files in `src/` (never `html/index.html`, which is generated).
2. Run `./build-setup.sh`. It builds `html/index.html`, then regenerates `track_scripts/setup-cloud-client` with the new base64 block.
3. Run `instruqt track validate` and `instruqt track push`, then commit and push to GitHub.
4. Start a **new** lab session to see the change. Pages are installed when a session starts, so an open session keeps the old version.

## Checks

| Challenge | `check-cloud-client` passes when… |
|---|---|
| `01-pairing` | Linux, Windows and AIX are all paired (otherwise it says which are still to pair) |
| `02-labels` | Labels `inventory` (Application), `QA` (Environment) and `de` (Location) exist |
| `03-label-group` | Environment Label Group `non-production` contains exactly Development, Staging and QA |
| `04-service` | Service `Elasticsearch` has exactly 9200 TCP and 9300 TCP |
| `05-writing-policy` | Policy "Block Development to Production" has a saved Deny Rule from Development to Production on All Services (rule type set by `RULE_TYPE` in the script) |
| `06-lab-complete` | no check; an end page telling learners who arrive by mistake to go back via Overview |
