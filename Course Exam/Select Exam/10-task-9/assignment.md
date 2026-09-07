---
slug: task-9
id: ygq47xpbgjse
type: challenge
title: 09-Ringfence Payment in LDN and Allow Inbound Access
difficulty: ""
timelimit: 0
enhanced_loading: null
---
Ringfence the `Payment` application in `LDN`: create a ruleset named
`Task9-RingfencePayment` with an allow rule so workloads in the
`Payment` application (Location: `LDN`) can communicate freely with
each other.

Then add a second allow rule to the same ruleset permitting inbound
traffic from the `Ordering` application to `Payment` (Location: `LDN`)
for HTTPS, TCP port `443`, so Ordering can still reach Payment once
it's ringfenced.
