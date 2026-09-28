# Course Lab — `! 26.x Lab`

The current 26.x course lab (slug `26x-lab`), used for the instructor-led
course. Synthetic objects and traffic come from **Project Crystal** (see the
repo root `README.md`, section 5, for how Crystal is deployed and cleaned up).

## Challenges

| Folder | Title | What happens |
|---|---|---|
| `01-magic-link` | Illumio-Console | Learner opens their PCE org via the magic link. Short **Advanced** section with instructor-only troubleshooting commands (full reference in the root README's *Troubleshooting reference*). |
| `02-full-build` | Onboarding Workloads-Cloud-Containers | The main lab: Workloads (pair and label linux-vm/windows-vm), Cloud (AWS onboarding), Containers (k3s/CVEN), then the Incident Response section (Ransomware Protection + the Lateral Movement investigation). |
| `03-close-lab` | Close Lab | Warning page; pressing NEXT ends the session. Its `cleanup-cloud-client` deletes the Crystal deployment. |

## Other files

- `track.yml` — title, slug, 6h `timelimit`/`idle_timeout`.
- `config.yml` — sandbox: `cloud-client` container, `linux-vm`,
  `windows-vm`, `host` (k3s/Cilium), an AWS account, and the secrets
  (incl. `CRYSTAL_API_KEY`).
- `track_scripts/setup-cloud-client` — magic link, the learner
  `check-*` commands (written to `/usr/local/bin/`), Crystal deployment
  (`Lab_<DDMM>_<org ID>`), the auto-fired Lateral Movement attack, and
  disabling all rulesets at start.
- `track_scripts/setup-host` — Cilium base install on the k3s node.
- `track_scripts/cleanup-cloud-client` — deletes the Crystal deployment
  if the lab is stopped or expires before Close Lab.
- `ISSUES.md` — known issues specific to this track (traffic timing,
  testing collisions).
- `assets/` — logo and splash images.
