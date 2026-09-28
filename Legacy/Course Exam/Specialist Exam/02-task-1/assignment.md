---
slug: task-1
id: qzbd8oblw0bj
type: challenge
title: 01-Workload Pairing and Application Classification
tabs:
- id: w4mlybl8nebt
  title: Linux
  type: terminal
  hostname: linux-vm
  cmd: bash
- id: rpqqsfbiv4ac
  title: Windows
  type: terminal
  hostname: windows-vm
difficulty: ""
timelimit: 0
enhanced_loading: null
---
Create a new Pairing Profile with its Enforcement Mode set to **Idle**.

Use the Pairing Profile to pair both `linux-vm` and `windows-vm` as
VENs and classify them as part of the same application using the
following labels:

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

Verify that both workloads have successfully paired and use the Map
to confirm that they appear within the `portal` application.
