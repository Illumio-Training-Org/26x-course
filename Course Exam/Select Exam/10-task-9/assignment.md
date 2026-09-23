---
slug: task-9
id: ygq47xpbgjse
type: challenge
title: 09-Payment Application Ringfencing and Dependency
difficulty: ""
timelimit: 0
enhanced_loading: null
---
Create a Policy named `Task9-RingfencePayment`.

Ringfence the `Payment` application in `LDN` by creating an allow
rule that permits workloads matching:

- Application: `Payment`
- Location: `LDN`

Within the same Policy, create a second allow rule permitting inbound
communication from the `Ordering` application to the `Payment`
application in `LDN`, so Ordering can still reach Payment once it's
ringfenced.

The second rule must allow:

- Source: the `Ordering` application
- Destination: the `Payment` application, Location: `LDN`
- Service: **HTTPS**, **TCP** port `443`
