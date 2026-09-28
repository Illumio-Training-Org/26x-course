---
slug: task-1
id: uitadka2xxhg
type: challenge
title: 01-Workload Pairing and Application Classification
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
**Idle**.

Usa el Pairing Profile para emparejar tanto `linux-vm` como
`windows-vm` como VENs y clasificalos como parte de la misma
aplicacion usando los siguientes labels:

`linux-vm`

- Role: `web`
- Application: `portal`
- Environment: `Production`
- Location: `ca`

`windows-vm`

- Role: `db`
- Application: `portal`
- Environment: `Production`
- Location: `ca`

Verifica que ambos workloads se hayan emparejado correctamente y usa
el Map para confirmar que aparecen dentro de la aplicacion `portal`.
