---
slug: task-1
id: uitadka2xxhg
type: challenge
title: 01-Pair 2 Workloads
tabs:
- id: vom1yighkcnt
  title: Linux
  type: terminal
  hostname: linux-vm
  cmd: bash
- id: uflzpyvzp0xn
  title: Windows
  type: terminal
  hostname: windows-vm
difficulty: ""
timelimit: 0
enhanced_loading: null
---
Crea un nuevo Pairing Profile con su Enforcement Mode configurado en
**Idle**, luego usalo para emparejar `linux-vm` y `windows-vm` como
VENs, y etiquetalos en una sola aplicacion:

- `linux-vm` — Role: `web`
- `windows-vm` — Role: `db`
- Ambos workloads — Application: `portal`, Environment: `Production`,
  Location: `ca`
