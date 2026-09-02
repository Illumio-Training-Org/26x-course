---
slug: task-4
id: zfyttc78jrzb
type: challenge
title: 04-Create a Deny Policy
difficulty: ""
timelimit: 0
enhanced_loading: null
---
Create a new Policy called `Task4-DenyPolicy` with a rule denying
**SSH** (not Override Deny) from all workloads, to a destination of
Application: `ordering`, Environment: `Production`, Location: `ca`.
These are the same labels you assigned to the `linux-vm` in Task 2.

> [!NOTE]
> Leave the ruleset in draft — do not provision it for this task.

> [!NOTE]
> If you add port 22 manually instead of using the built-in SSH
> service, you must add it as both TCP and UDP.
