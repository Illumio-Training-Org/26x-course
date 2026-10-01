---
slug: task-4
id: v6hcqhdun5q0
type: challenge
title: 04-Basic Deny Policy
difficulty: ""
timelimit: 0
enhanced_loading: null
---
📝 Task
==========

Create a scopeless Policy named `Task4-DenyPolicy`.

Within this Policy, create a rule that denies **SSH** traffic from all
workloads to workloads matching the following labels:

- Application: `ordering`
- Environment: `Production`
- Location: `ca`

These are the same labels you assigned to `linux-vm` in Task 2. The
rule must be configured as a standard **Deny** and must **not** use
**Override Deny**.

> [!NOTE]
> Leave `Task4-DenyPolicy` in **Draft**. Do not provision the Policy.

> [!NOTE]
> You may use the built-in **SSH** service. If you define port 22
> manually instead, it must be configured for both **TCP** and
> **UDP**.

🔑 Logged out of the Console?
==========

Only needed if the Illumio Console has logged you out (it does after 10-15 minutes of inactivity). If you're still logged in, ignore this and carry on in your open Console tab.

**[Click here to log back in]([[ Instruqt-Var key="MAGICURL" hostname="cloud-client" ]])** - your work is kept.

If the link doesn't open, copy this into a new browser tab:

```
[[ Instruqt-Var key="MAGICURL" hostname="cloud-client" ]]
```
