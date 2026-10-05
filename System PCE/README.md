# ! 26.x System PCE

A single-challenge Instruqt track (`26x-system-pce`) that shows an offline,
self-contained simulation of the Illumio Console's Pairing Profiles
workflow, with the instructions in the right-hand panel.

- No magic link, Terraform, secrets or real PCE. One small `cloud-client`
  container serves the page on port 80 through a website (service) tab.
- The page source is `html/Illumio-PCE-Pairing-Lab-Offline.html`. It is
  embedded in `track_scripts/setup-cloud-client`, so the lab has no
  download at start-up.

## Updating the page

1. Replace `html/Illumio-PCE-Pairing-Lab-Offline.html`.
2. Run `./build-setup.sh` to regenerate the setup script.
3. Run `instruqt track push`, then commit and push to GitHub.
