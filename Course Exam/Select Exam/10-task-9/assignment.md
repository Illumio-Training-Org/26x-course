---
slug: task-9
id: dqki4h6l0qsm
type: challenge
title: 09-Payment Application Ringfencing and Dependency
difficulty: ""
timelimit: 0
enhanced_loading: null
---
📝 Task
==========

Create a Policy named `Task9-RingfencePayment`.

Ringfence the `payment` application in `ldn` by creating an allow
rule that permits workloads matching:

- Application: `payment`
- Location: `ldn`

Within the same Policy, create a second allow rule permitting inbound
communication from the `ordering` application to the `payment`
application in `ldn`, so `ordering` can still reach `payment` once it's
ringfenced.

The second rule must allow:

- Source: the `ordering` application
- Destination: the `payment` application, Location: `ldn`
- Service: **HTTPS**, **TCP** port `443`

🔑 Logged out of the Console?
==========

Only needed if the Illumio Console has logged you out (it does after 10-15 minutes of inactivity). If you're still logged in, ignore this and carry on in your open Console tab.

**[Click here to log back in]([[ Instruqt-Var key="MAGICURL" hostname="cloud-client" ]])** - your work is kept.

If the link doesn't open, copy this into a new browser tab:

```
[[ Instruqt-Var key="MAGICURL" hostname="cloud-client" ]]
```
