---
slug: task-3
id: yxeyqcflyqu3
type: challenge
title: 03-Core Services Policy
difficulty: ""
timelimit: 0
enhanced_loading: null
---
Create a separate Policy named `Task3-CoreServices`.

Configure an allow rule permitting the Nagios monitoring application
to communicate with the `portal` application using **Nagios NRPE**,
**TCP** port `5666`, so monitoring traffic isn't denied once the
application is ringfenced.

Use the Map to identify the Nagios instance in California and confirm
its labels before creating the rule.

The source must be defined using its Location, Environment,
Application, and Role labels, including:

- Role: `nagios`

The destination must include:

- Application: `portal`
- Environment: `Production`
- Location: `ca`

The rule must allow **TCP** port `5666` or the **Nagios NRPE**
service.
