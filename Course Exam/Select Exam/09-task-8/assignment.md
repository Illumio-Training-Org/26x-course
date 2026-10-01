---
slug: task-8
id: xxo2es2d96nv
type: challenge
title: 08-Global Development and Production Segmentation
difficulty: ""
timelimit: 0
enhanced_loading: null
---
📝 Task
==========

Create a Policy named `Task8-DenyGlobal`.

Configure a **global**, **one-way** deny rule preventing
communication from Development to Production for the `ordering`
application.

Source:

- Application: `ordering`
- Environment: `Development`

Destination:

- Application: `ordering`
- Environment: `Production`

The rule must:

- Deny **All Services**
- Apply **globally**

Within the same Policy, create an exception that permits **SSH**
traffic from Development to Production for the `ordering` application.

The **SSH** exception must also be **one-way** from Development to
Production and have no Location restriction.

🔑 Logged out of the Console?
==========

Only needed if the Illumio Console has logged you out (it does after 10-15 minutes of inactivity). If you're still logged in, ignore this and carry on in your open Console tab.

**[Click here to log back in]([[ Instruqt-Var key="MAGICURL" hostname="cloud-client" ]])** - your work is kept.

If the link doesn't open, copy this into a new browser tab:

```
[[ Instruqt-Var key="MAGICURL" hostname="cloud-client" ]]
```
