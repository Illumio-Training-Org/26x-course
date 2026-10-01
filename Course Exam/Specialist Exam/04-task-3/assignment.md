---
slug: task-3
id: 2y1zrr6nqbhu
type: challenge
title: 03-Core Services Policy
difficulty: ""
timelimit: 0
enhanced_loading: null
---
📝 Task
==========

Create a separate Policy named `Task3-CoreServices`.

Configure an allow rule permitting the Nagios monitoring application
to communicate with the `portal` application using **Nagios NRPE**,
**TCP** port `5666`, so monitoring traffic isn't denied once the
application is ringfenced.

Use the Map to identify the Nagios instance in California and confirm
its labels before creating the rule.

> [!NOTE]
> Traffic flows may still be loading at this point. If they are,
> please proceed without using the Map.

The source must be defined using its Location, Environment,
Application, and Role labels, including:

- Role: `nagios`

The destination must include:

- Application: `portal`
- Environment: `Production`
- Location: `ca`

The rule must allow **TCP** port `5666` or the **Nagios NRPE**
service.

🔑 Logged out of the Console?
==========

Only needed if the Illumio Console has logged you out (it does after 10-15 minutes of inactivity). If you're still logged in, ignore this and carry on in your open Console tab.

**[Click here to log back in]([[ Instruqt-Var key="MAGICURL" hostname="cloud-client" ]])** - your work is kept.

If the link doesn't open, copy this into a new browser tab:

```
[[ Instruqt-Var key="MAGICURL" hostname="cloud-client" ]]
```
