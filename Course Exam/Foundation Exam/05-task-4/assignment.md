---
slug: task-4
id: zfyttc78jrzb
type: challenge
title: Task 4
teaser: Create a Deny Policy
tabs:
- id: kwsc75rywazj
  title: Linux
  type: terminal
  hostname: linux-vm
  cmd: bash
- id: 5nr4v6n9er9b
  title: Windows
  type: terminal
  hostname: windows-vm
- id: zstbxih4dsot
  title: CloudCLI
  type: terminal
  hostname: cloud-client
  cmd: bash
- id: yrys9vxyrclj
  title: AWS
  type: service
  hostname: cloud-client
  port: 80
- id: dthgvn4pfucm
  title: k3s
  type: terminal
  hostname: host
  cmd: bash
difficulty: ""
timelimit: 0
enhanced_loading: null
---
# Task 4

Create a ruleset named `Task4-DenyPolicy` with a basic deny policy
denying traffic to the `linux-vm` workload, targeting it using at
least its Application, Environment, and Location labels.

> [!NOTE]
> Leave the ruleset in draft — do not provision it for this task.

---

**Lab Complete**
