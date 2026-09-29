---
slug: task-6
id: ujysxq03xve5
type: challenge
title: 06-Ordering Application Ringfencing
difficulty: ""
timelimit: 0
enhanced_loading: null
---
Use the Map to inspect communications within the `ordering`
application.

> [!NOTE]
> Traffic flows may still be loading at this point. If they are,
> please proceed without using the Map.

Ringfence the Development instance of the application by creating a
Policy named `Task6-RingfenceOrdering`.

Create an allow rule permitting workloads matching the following
labels to communicate freely with each other:

- Application: `ordering`
- Environment: `Development`
- Location: `ca`
