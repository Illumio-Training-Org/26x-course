# Course Lab — `! 26.x Lab`

The current 26.x course lab (slug `26x-lab`), used for the instructor-led
course. Each learner gets their own sandbox: a fresh Illumio PCE org (magic
link), an AWS account, two VMs, a k3s node, and their own **Project Crystal**
deployment that fills the org with demo workloads, labels, policies and
traffic. Nothing is shared between learners, and everything is torn down
when the lab ends. (Root `README.md`, section 5, has the full Crystal
detail.)

Became the main lab on 2026-09-30, replacing the earlier 3-challenge layout
(kept as `! 26.x Superseded: Lab 30/09` in `../Legacy/Course Lab 30-09/`).

## What learners see

| Folder | Title | What happens |
|---|---|---|
| `01-lab` | Illumio Lab Environment | One page for the whole lab. Starts at **🔑 Console** - the Illumio logo, then a "Click here to open the Illumio Console" link, with a copy box underneath in case the link doesn't open. Then **Workloads** (pairing profile, pair linux-vm/windows-vm, VEN CLI, enforcement), **Cloud** (AWS onboarding), **Containers** (k3s / C-VEN), **Incident Response** (Part 1 Ransomware Protection, Part 2 Investigation of a live lateral-movement attack), and **🛠️ Advanced** at the bottom - troubleshooting commands *only for use if the instructor asks* (full reference: root README, *Troubleshooting reference*). Some sections end with a `check-*` command learners run in the CloudCLI tab. |
| `02-close-lab` | Close Lab | Warning page. The learner must run `close-lab` in the CloudCLI tab and type **YES**, then click **Check**, to end the session (an accidental click just shows a reminder). Ending deletes the learner's Crystal deployment. |

Tabs: **Illumio & AWS** (one page with the console link and the AWS login
details), **Linux**, **Windows**, **CloudCLI**, **k3s console**.

If a learner gets logged out of the Console, they just scroll back to the
top of the page and use the link again - no need to leave the lab page.

## What happens when a lab starts (instructor view)

Measured on 2026-09-29: page ready **~2 min 50 s** after the sandbox starts.

1. **Sandbox build** (Instruqt, ~1-1.5 min): VMs, k3s node, AWS account.
2. **Track setup** (`track_scripts/setup-cloud-client`, ~20 s):
   - creates the magic link and the learner `check-*` commands;
   - creates a Crystal deployment named **`Lab_<DDMM>_<PCE org ID>_<learner>`**
     (e.g. `Lab_3009_4140393_keith`) - the org ID is what the learner
     sees in their Console, and `<learner>` is their forename, from their email before the @ (or
     their Instruqt name; for team members starting it from the Instruqt UI,
     their name from the team list in `setup-cloud-client`), so you can
     match a learner to their deployment in Crystal;
   - **fires Crystal's Lateral Movement attack automatically** (3 hours) for
     the Incident Response Investigation - no need to press Fire Attack;
   - starts a **background job that disables every policy (ruleset)** once
     Crystal has imported them (~5-10 min after start). Draft only - nothing
     is provisioned. Learners enable `15. IR` themselves in the IR section.
     Log: `/var/log/disable-all-rulesets.log` on the CloudCLI container.
3. **AWS build** (`01-lab/setup-cloud-client`, ~50 s): the Terraform build
   (4 EC2 instances, VPC, flows bucket) for the Cloud section. Runs before the
   lab page first opens.

## Timing to expect

- **Objects** (labels, workloads, policies) appear ~5-10 minutes after start.
- **Traffic** in Explore/Map currently takes **anywhere from ~15 to ~65
  minutes** to become visible (median ~45 min) - a known issue with the
  shared `poc4` PCE, which engineering attributes to platform overload; a move
  to `partner100` is planned. Start the lab well before any map-based
  teaching. Details: `ISSUES.md` and the platform issues report.
- The attack runs for **3 hours** from start, then stops; its traffic stays
  in history.

## Tips for the Incident Response section

- **Part 1 (Ransomware):** the jumpbox-to-jumpbox Deny rule is
  **preventive** - there is never any traffic between the two jump hosts, so
  an empty map there is expected. Learners don't provision it.
- **Part 2 (Investigation):** learners should **disable all other policies**
  and enable only `15. IR`. When filtering **Explore -> Traffic** by service,
  the Service filter opens on "Port and/or Protocol" - to pick `rdp` / `ssh`
  by name, click **Policy Services** at the bottom of that list first.
- The Role label for web servers shows as **`Web`** (a PCE default label);
  the lab checks accept `web` or `Web`.

## Cosmetic quirk

The Linux and CloudCLI terminals can show the prompt two or three times when
first opened (Instruqt redraws it as the tab resizes). Harmless - type at the
last prompt, or press Ctrl+L.

## How the lab ends

The Crystal deployment is **deleted automatically** however the lab ends:
passing the Close Lab check (`02-close-lab/cleanup-cloud-client`), or the lab being
stopped or expiring (`track_scripts/cleanup-cloud-client`). Both are safe
to run twice.

## Files

- `track.yml` - title, slug, 6h `timelimit` / `idle_timeout`, and
  `skipping_enabled: false` so Skip can't bypass the Close Lab check.
- `config.yml` - sandbox machines, AWS account, secrets (incl. the
  team-level `CRYSTAL_API_KEY`, which is kept out of learner terminals and
  out of the Instruqt logs).
- `track_scripts/setup-cloud-client` - track setup described above.
- `track_scripts/setup-host` - Cilium base install on the k3s node.
- `track_scripts/cleanup-cloud-client` - deletes the Crystal deployment on
  stop/expiry.
- `01-lab/setup-cloud-client` - AWS Terraform build.
- `02-close-lab/check-cloud-client` - passes only after `close-lab` (installed
  by track setup) was run and confirmed with YES; otherwise shows a reminder.
- `02-close-lab/solve-cloud-client` - creates the same confirmation (used by
  `instruqt track test`; Skip is switched off).
- `02-close-lab/cleanup-cloud-client` - deletes the Crystal deployment when
  Close Lab is passed.
- `ISSUES.md` - known issues specific to this lab.

**Keep `../Course Lab Check/` in sync.** The setup and cleanup scripts print
`CHECK-OK:` / `CHECK-FAIL:` markers that the pre-class quick check relies on.
If you add, remove or rename a step here, update its marker and the
marker list in `../Course Lab Check/tracks.txt` (and that folder's README),
then re-run the check.
- `assets/` - logo and splash images, plus `illumio-logo-banner.png` (the
  white Illumio logo on the instructions panel colour `#202636`, shown at
  the top of the 🔑 Console section of the lab instructions).
