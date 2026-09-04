---
slug: task-1
id: kegpjdkuh2cy
type: challenge
title: 01-Pair 2 Workloads
tabs:
- id: w3deabn4j332
  title: Linux
  type: terminal
  hostname: linux-vm
  cmd: bash
- id: 3wca0hpzwadh
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
