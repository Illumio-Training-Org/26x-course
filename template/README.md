# 000-Template for CX

A reusable, empty Instruqt track scaffold for Illumio ILT/training content authors.
Copy this entire directory to start a new lab — do not build new labs from
scratch or fork a previously-shipped lab.

## Lab Name

FOLLOW CONVENTION — rename this track before publishing to match the org's
lab-naming convention (see prior labs, e.g. `331-Containers`). Keep the
leading `! ` on the title when you rename it — ASCII `!` sorts before
digits and letters, so it keeps active/new labs at the top of Instruqt's
manage list regardless of other tracks' own numeric prefixes.

## Outcome

In this lab you will successfully [outcome — e.g. pair the Illumio VEN to the Platform]

## Modules

| # | Challenge | Summary |
|---|-----------|---------|
| 01 | [Getting Started](01-getting-started/assignment.md) | Orientation and environment verification |
| 02 | [Core Task](02-core-task/assignment.md) | The lab's main hands-on work |
| 03 | [Wrap-Up & Verification](03-wrap-up-verification/assignment.md) | Final verification and cleanup |

## Track configuration

- **Slug:** `template-for-cx`
- **Icon:** `./assets/logo.png` — the Illumio logo (same file used in 331-Containers)
- **Sandbox preset:** `bookworm-preset` — PLACEHOLDER, change to match this lab's actual infra
- **Idle timeout:** 1800s (30 min)
- **Time limit:** 5400s (90 min)
- **Extend allowance:** 600s (10 min)
- **Skipping enabled:** yes
- **Owner:** `illumio-training`
- **Developer:** nathan.mitchell@illumio.com

See [`track.yml`](track.yml) for the full track definition.

## Repository layout

```
.
├── track.yml                       # Track metadata and config
├── config.yml                      # Instruqt config version
├── assets/                         # logo.png + shared splash screen
└── 01-.../02-.../03-...            # One directory per challenge, each with an assignment.md
```

## Authoring reminders

- Tracks end automatically after the idle timeout, even mid-session — remind
  learners to stay active if the lab has long reading stretches.
- Right-size VM/container memory rather than defaulting to the largest
  available preset — check the component's actual documented needs.
  Reference points from the 26.x base lab:
  - `cloud-client` (container): 2048MB
  - `linux-vm`: 4096MB
  - `windows-vm`: 4096MB (down from an 8192MB default — matches
    Microsoft's own "lightly loaded Server Core" baseline; their bare
    "suggested minimum" of 2GB risks sluggishness, especially if the
    image turns out to be a full Desktop Experience build rather than
    true Server Core; still being verified)
  - k3s/Cilium host: 2048MB (down from an 8192MB default — aggressive,
    close to Cilium's own `cilium-agent` Helm chart limit of ~2Gi memory
    / 2 CPU, so little headroom left for k3s + Hubble on top; still
    being verified)

  When in doubt, test empirically (spin up a second track/variant at a
  lower spec and compare) rather than size from documentation alone.
- Before publishing: confirm the `ilt` tag, `timelimit`, and extend allowance
  in Instruqt's Additional Settings (this template already sets both in
  `track.yml`, but double-check them in the Instruqt UI after first push).
- Internal guide: `Documents\Training\Trainng Class Tools\Using Instruqt for ILT.doc` (OneDrive)
- Markdown syntax reference: https://daringfireball.net/projects/markdown/syntax
- Questions — ask Nathan.
