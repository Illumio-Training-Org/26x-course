---
slug: task-7
id: gi44pdldjtql
type: challenge
title: Task 7
teaser: Create a Scoped User
tabs:
- id: ri821z4t9rff
  title: Linux
  type: terminal
  hostname: linux-vm
  cmd: bash
- id: xyh6afyhd0fa
  title: Windows
  type: terminal
  hostname: windows-vm
- id: bqb5vuwqpfvy
  title: CloudCLI
  type: terminal
  hostname: cloud-client
  cmd: bash
- id: wzfsffp248qy
  title: AWS
  type: service
  hostname: cloud-client
  port: 80
- id: ey4ocdwwepkj
  title: k3s
  type: terminal
  hostname: host
  cmd: bash
difficulty: ""
timelimit: 0
enhanced_loading: null
---
# Task 7

Create a user and assign them the **Ruleset Manager** role, scoped to
Environment: `Production`, Location: `ca` — not the whole organization.
