---
slug: task-5
id: adbi7jtukofy
type: challenge
title: 05-Environment Segmentation
difficulty: ""
timelimit: 0
enhanced_loading: null
---
📝 Task
==========

Use the Map to inspect communications between the Development and
Production environments for the `ordering` application in the `ca`
location.

> [!NOTE]
> Traffic flows may still be loading at this point. If they are,
> please proceed without using the Map.

Create a Policy named `Task5-DenyDevProd`.

Configure a deny rule for **All Services** with:

Source:

- Application: `ordering`
- Environment: `Development`
- Location: `ca`

Destination:

- Application: `ordering`
- Environment: `Production`
- Location: `ca`

Use the Map to verify the effect of the policy.


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
