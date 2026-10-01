---
slug: task-1
id: 1sbu2rylzg8g
type: challenge
title: 01-Workload Pairing and Application Classification
tabs:
- id: qfotee2n5maj
  title: Linux
  type: terminal
  hostname: linux-vm
  cmd: bash
- id: 12vx8zpzycrm
  title: Windows
  type: terminal
  hostname: windows-vm
difficulty: ""
timelimit: 0
enhanced_loading: null
---
📝 Task
==========

Create a new Pairing Profile with its Enforcement Mode set to **Idle**.

Use the Pairing Profile to pair both `linux-vm` and `windows-vm` as
VENs and classify them as part of the same application using the
following labels:

`linux-vm`

- Role: `Web`
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


> [!NOTE]
> Traffic flows may still be loading at this point. If they are,
> please proceed without using the Map.

🔑 Logged out of the Console?
==========

Only needed if the Illumio Console has logged you out (it does after 10-15 minutes of inactivity). If you're still logged in, ignore this and carry on in your open Console tab.

**[Click here to log back in]([[ Instruqt-Var key="MAGICURL" hostname="cloud-client" ]])** - your work is kept.

If the link doesn't open, copy this into a new browser tab:

```
[[ Instruqt-Var key="MAGICURL" hostname="cloud-client" ]]
```
