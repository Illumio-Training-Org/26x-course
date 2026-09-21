---
slug: task-2
id: 7smxonkgxco4
type: challenge
title: 02-Ringfence the Application
difficulty: ""
timelimit: 0
enhanced_loading: null
---
**Variation 1**

Add two more labels to both `linux-vm` and `windows-vm`: Type: `server`,
IR: `IR-CLEANBUBBLE` (6 label categories total across the two
workloads: Role, Application, Environment, Location, Type, IR).

Ringfence the `portal` application (Environment: `Production`,
Location: `ca`, Type: `server`, IR: `IR-CLEANBUBBLE`): create a
Policy named `Task2-Ringfence` with an allow rule so workloads
matching all five labels can communicate freely with each other.


**Variation 2**

Ringfence the `portal` application. Create a Policy named
`Task2-Ringfence` with an allow rule so workloads matching all five
labels can communicate freely with each other.

- Environment: `Production`
- Location: `ca`
- Type: `server`
- IR: `IR-CLEANBUBBLE`


**Variation 3**

Ringfence the `portal` application, using 5 labels. Create a Policy
named `Task2-Ringfence` with an allow rule so workloads matching all
five labels can communicate freely with each other.
