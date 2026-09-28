---
slug: task-4
id: zfyttc78jrzb
type: challenge
title: 04-Basic Deny Policy
difficulty: ""
timelimit: 0
enhanced_loading: null
---
Create a new Policy named `Task4-DenyPolicy`.

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
