---
slug: task-7
id: mboyj1iyboiv
type: challenge
title: 07-Ringfencing Using a Label Group
difficulty: ""
timelimit: 0
enhanced_loading: null
---
📝 Task
==========

Create a Label Group named `dev-prod`.

The Label Group must contain the following Environment labels:

- `Development`
- `Production`

Update the existing `Task6-RingfenceOrdering` Policy to use the
`dev-prod` Label Group in place of the individual `Development`
Environment label.

The resulting policy must ringfence both the Development and
Production instances of the `ordering` application using the same
Policy.

🔑 Logged out of the Console?
==========

Only needed if the Illumio Console has logged you out (it does after 10-15 minutes of inactivity). If you're still logged in, ignore this and carry on in your open Console tab.

**[Click here to log back in]([[ Instruqt-Var key="MAGICURL" hostname="cloud-client" ]])** - your work is kept.

If the link doesn't open, copy this into a new browser tab:

```
[[ Instruqt-Var key="MAGICURL" hostname="cloud-client" ]]
```
