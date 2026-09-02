---
slug: task-1
id: 8jvgsnhdfp7u
type: challenge
title: 01-Pair 2 Workloads
tabs:
- id: cndlq2y6u8q2
  title: Linux
  type: terminal
  hostname: linux-vm
  cmd: bash
- id: hreyviqxuq7d
  title: Windows
  type: terminal
  hostname: windows-vm
difficulty: ""
timelimit: 0
enhanced_loading: null
---
Pair both `linux-vm` and `windows-vm` as VENs, and label them into a
single application:

- `linux-vm` — Role: `web`
- `windows-vm` — Role: `db`
- Both workloads — Application: `portal`, Environment: `Production`,
  Location: `ca`
