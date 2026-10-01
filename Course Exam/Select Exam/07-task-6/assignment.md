---
slug: task-6
id: ujysxq03xve5
type: challenge
title: 06-Ordering Application Ringfencing
difficulty: ""
timelimit: 0
enhanced_loading: null
---
📝 Task
==========

Use the Map to inspect communications within the `ordering`
application.

> [!NOTE]
> Traffic flows may still be loading at this point. If they are,
> please proceed without using the Map.

Ringfence the Development instance of the application by creating a
Policy named `Task6-RingfenceOrdering`.

Create an allow rule permitting workloads matching the following
labels to communicate freely with each other:

- Application: `ordering`
- Environment: `Development`
- Location: `ca`

🔑 Logged out of the Console?
==========

Only needed if the Illumio Console has logged you out (it does after 10-15 minutes of inactivity). If you're still logged in, ignore this and carry on in your open Console tab.

**[Click here to log back in]([[ Instruqt-Var key="MAGICURL" hostname="cloud-client" ]])** - your work is kept.

If the link doesn't open, copy this into a new browser tab:

```
[[ Instruqt-Var key="MAGICURL" hostname="cloud-client" ]]
```
