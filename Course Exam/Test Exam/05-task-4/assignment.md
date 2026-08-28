---
slug: task-4
id: ytg8yjkbw95u
type: challenge
title: Task 4
teaser: Policy Creation and Provisioning
tabs:
- id: onrdcgevudrx
  title: Linux
  type: terminal
  hostname: linux-vm
  cmd: bash
- id: klqnjtfe4r7i
  title: Windows
  type: terminal
  hostname: windows-vm
- id: xw5o0nkcsdyx
  title: CloudCLI
  type: terminal
  hostname: cloud-client
  cmd: bash
- id: evrnuahwrfwb
  title: AWS
  type: service
  hostname: cloud-client
  port: 80
- id: yfqf3quxu1w5
  title: k3s
  type: terminal
  hostname: host
  cmd: bash
difficulty: ""
timelimit: 0
enhanced_loading: null
---
# Task 4

Create a ruleset named `Task4-Ruleset` containing a deny rule:
Production/ca to Production/lax on tcp/1234. Then provision the
ruleset.
