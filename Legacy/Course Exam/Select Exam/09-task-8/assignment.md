---
slug: task-8
id: xcsdwb5xkzcv
type: challenge
title: 08-Global Development and Production Segmentation
difficulty: ""
timelimit: 0
enhanced_loading: null
---
Create a Policy named `Task8-DenyGlobal`.

Configure a **global**, **one-way** deny rule preventing
communication from Development to Production for the `ordering`
application.

Source:

- Application: `ordering`
- Environment: `Development`

Destination:

- Application: `ordering`
- Environment: `Production`

The rule must:

- Deny **All Services**
- Apply **globally**

Within the same Policy, create an exception that permits **SSH**
traffic from Development to Production for the `ordering` application.

The **SSH** exception must also be **one-way** from Development to
Production and have no Location restriction.
