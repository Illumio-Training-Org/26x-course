---
slug: task-6
id: juaj2gtfmdaq
type: challenge
title: 06-Ringfence Ordering in Dev, CA
difficulty: ""
timelimit: 0
enhanced_loading: null
---
Use the Map to filter and inspect the traffic inside the `ordering`
application - group by Application labels first.

Ringfence the `ordering` application in `Development`, `ca`: create a
Policy named `Task6-RingfenceOrdering` with an allow rule so
workloads in the `ordering` application (Environment: `Development`,
Location: `ca`) can communicate freely with each other.
