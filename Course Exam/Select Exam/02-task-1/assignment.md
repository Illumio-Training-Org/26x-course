---
slug: task-1
id: byky76fyi0rk
type: challenge
title: 01-Workload Pairing and Application Classification
tabs:
- id: jqc2anyb09wd
  title: Linux
  type: terminal
  hostname: linux-vm
  cmd: bash
- id: x5etapyzde8q
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
