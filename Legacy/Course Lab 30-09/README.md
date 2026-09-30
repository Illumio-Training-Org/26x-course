# Course Lab — `! 26.x Lab`

The current 26.x course lab (slug `26x-lab`), used for the instructor-led
course. Each learner gets their own sandbox: a fresh Illumio PCE org (magic
link), an AWS account, two VMs, a k3s node, and their own **Project Crystal**
deployment that fills the org with demo workloads, labels, policies and
traffic. Nothing is shared between learners, and everything is torn down
when the lab ends. (Root `README.md`, section 5, has the full Crystal
detail.)

## What learners see

| Folder | Title | What happens |
|---|---|---|
| `01-magic-link` | Illumio-Console | Learner opens their Illumio Console via the magic link. Ends with a short **Advanced** section of troubleshooting commands - *only for use if the instructor asks* (full reference: root README, *Troubleshooting reference*). |
| `02-full-build` | Onboarding Workloads-Cloud-Containers | The main lab. A **"Logged out of the Illumio Console?"** link sits at the top so learners can reopen the console without going back. Sections: **Workloads** (pairing profile, pair linux-vm/windows-vm, VEN CLI, enforcement), **Cloud** (AWS onboarding), **Containers** (k3s / C-VEN), **Incident Response** (Part 1 Ransomware Protection, Part 2 Investigation of a live lateral-movement attack). Some sections end with a `check-*` command learners run in the CloudCLI tab. |
| `03-close-lab` | Close Lab | Warning page. Pressing **NEXT** ends the session and deletes the learner's Crystal deployment. |

## What happens when a lab starts (instructor view)

1. **Sandbox build** (Instruqt, ~1 min): VMs, k3s node, AWS account.
2. **Track setup** (`track_scripts/setup-cloud-client`, ~1-2 min):
   - creates the magic link and the learner `check-*` commands;
   - creates a Crystal deployment named **`Lab_<DDMM>_<PCE org ID>`**
     (e.g. `Lab_2909_4140378`) - the org ID is what the learner sees in their
     Console, so you can match a learner to their deployment in Crystal;
   - **fires Crystal's Lateral Movement attack automatically** (3 hours) for
     the Incident Response Investigation - no need to press Fire Attack;
   - starts a **background job that disables every policy (ruleset)** once
     Crystal has imported them (~5-10 min after start). Draft only - nothing
     is provisioned. Learners enable `15. IR` themselves in the IR section.
     Log: `/var/log/disable-all-rulesets.log` on the CloudCLI container.
3. **Moving to `02-full-build`** runs its own setup (~1 min): the AWS
   Terraform build (4 EC2 instances, VPC, flows bucket) for the Cloud section.

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

## How the lab ends

The Crystal deployment is **deleted automatically** however the lab ends:
NEXT on Close Lab (`03-close-lab/cleanup-cloud-client`), or the lab being
stopped or expiring (`track_scripts/cleanup-cloud-client`). Both are safe
to run twice.

## Files

- `track.yml` - title, slug, 6h `timelimit` / `idle_timeout`.
- `config.yml` - sandbox machines, AWS account, secrets (incl. the
  team-level `CRYSTAL_API_KEY`, which is kept out of learner terminals and
  out of the Instruqt logs).
- `track_scripts/setup-cloud-client` - track setup described above.
- `track_scripts/setup-host` - Cilium base install on the k3s node.
- `track_scripts/cleanup-cloud-client` - deletes the Crystal deployment on
  stop/expiry.
- `02-full-build/setup-cloud-client` - AWS Terraform build.
- `03-close-lab/cleanup-cloud-client` - deletes the Crystal deployment on
  Close Lab NEXT.
- `ISSUES.md` - known issues specific to this track.
- `assets/` - logo and splash images.

A trial version with the console link and the lab merged into one page (2
challenges instead of 3) is in `../Lab 2-Assignment Test/`
(`! 26.x Test: Lab (2 Assignments)`).
