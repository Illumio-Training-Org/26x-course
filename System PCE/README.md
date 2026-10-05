# ! 26.x System PCE

A single-challenge Instruqt track (`26x-system-pce`) with four tabs:
**Illumio Console | Linux | Windows | AIX**. The Console is an offline
recreation of the Pairing Profiles workflow; each OS tab is a terminal where
the learner pastes the pairing script copied from the Console. All four tabs
are the same page (`index.html`, `linux.html`, `windows.html`, `aix.html`),
which picks Console or terminal mode from its file name, and they share state
in the browser (localStorage + BroadcastChannel), so a paired workload shows
up in the Console's Workloads list. Learner-facing text never mentions a
simulation. Reset lab is on the Console's Settings page; Unpair works on a
workload's page.

- No magic link, Terraform, secrets or real PCE. One small `cloud-client`
  container serves the page on port 80 through a website (service) tab.
- The page source is `html/Illumio-PCE-Pairing-Lab-Offline.html`. It is
  embedded in `track_scripts/setup-cloud-client`, so the lab has no
  download at start-up.

## Updating the page

1. Replace `html/Illumio-PCE-Pairing-Lab-Offline.html`.
2. Run `./build-setup.sh` to regenerate the setup script.
3. Run `instruqt track push`, then commit and push to GitHub.

## Check

The pages report the paired workloads to the lab web server
(`server/server.py`, embedded in the setup script and run on
`cloud-client:8080`), which writes `/root/pce-lab-state.json`.
`01-pairing/check-cloud-client` passes only when Linux, Windows and AIX are
all paired, and otherwise says which are still to pair. `02-lab-complete` is
an empty end page telling learners who arrive there by mistake to go back via
Overview.
