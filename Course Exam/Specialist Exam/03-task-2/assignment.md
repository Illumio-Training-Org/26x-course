---
slug: task-2
id: ezjaveqonhdm
type: challenge
title: 02-Ringfence the Application
difficulty: ""
timelimit: 0
enhanced_loading: null
---
Add two more labels to both `linux-vm` and `windows-vm`: Type: `server`,
IR: `IR-CLEANBUBBLE` (6 label categories total across the two
workloads: Role, Application, Environment, Location, Type, IR).

Create a ruleset named `Task2-Ringfence`, scoped to Application:
`portal`, Environment: `Production`, Location: `ca`, Type: `server`,
IR: `IR-CLEANBUBBLE`, with an intra-scope allow rule so workloads
inside the scope can communicate freely with each other.
