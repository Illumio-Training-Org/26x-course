---
slug: task-5
id: hhhoqv8f9xiw
type: challenge
title: 05-Environment Segmentation
difficulty: ""
timelimit: 0
enhanced_loading: null
---
Use the Map to inspect communications between the Development and
Production environments for the `ordering` application in the `ca`
location.

Create a Policy named `Task5-DenyDevProd`.

Configure a deny rule for **All Services** with:

Source:

- Application: `ordering`
- Environment: `Development`
- Location: `ca`

Destination:

- Application: `ordering`
- Environment: `Production`
- Location: `ca`

Use the Map to verify the effect of the policy.
