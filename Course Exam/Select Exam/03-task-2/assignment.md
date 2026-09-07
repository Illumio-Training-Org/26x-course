---
slug: task-2
id: 7smxonkgxco4
type: challenge
title: 02-Ringfence the Application
difficulty: ""
timelimit: 0
enhanced_loading: null
---
Add two more labels to both `linux-vm` and `windows-vm`: Type: `server`,
IR: `IR-CLEANBUBBLE` (6 label categories total across the two
workloads: Role, Application, Environment, Location, Type, IR).

Ringfence the `portal` application (Environment: `Production`,
Location: `ca`, Type: `server`, IR: `IR-CLEANBUBBLE`): create a
ruleset named `Task2-Ringfence` with an allow rule so workloads
matching all five labels can communicate freely with each other.
