---
slug: task-2
id: aiengfsfnsyx
type: challenge
title: 02-Application Ringfencing
difficulty: ""
timelimit: 0
enhanced_loading: null
---
📝 Task
==========

Add the following labels to both `linux-vm` and `windows-vm`:

- Type: `server`
- DFIR: `IR-CLEANBUBBLE`

The workloads should now be classified using all six label
categories: Role, Application, Environment, Location, Type, and DFIR.

Ringfence the `portal` application by creating a Policy named
`Task2-Ringfence`.

Create an allow rule that permits workloads matching the following
five labels to communicate freely with each other:

- Application: `portal`
- Environment: `Production`
- Location: `ca`
- Type: `server`
- DFIR: `IR-CLEANBUBBLE`

🔑 Logged out of the Console?
==========

Only needed if the Illumio Console has logged you out (it does after 10-15 minutes of inactivity). If you're still logged in, ignore this and carry on in your open Console tab.

**[Click here to log back in]([[ Instruqt-Var key="MAGICURL" hostname="cloud-client" ]])** - your work is kept.

If the link doesn't open, copy this into a new browser tab:

```
[[ Instruqt-Var key="MAGICURL" hostname="cloud-client" ]]
```
