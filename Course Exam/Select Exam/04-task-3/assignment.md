---
slug: task-3
id: twy5hbesqbmh
type: challenge
title: 03-Create a Core Services Policy
difficulty: ""
timelimit: 0
enhanced_loading: null
---
Create a ruleset named `Task3-CoreServices` with an allow rule from
Role: `nagios` to the `portal` application (Application: `portal`,
Environment: `Production`, Location: `ca`) for the Nagios NRPE service,
TCP port `5666`, so monitoring traffic isn't denied once the
application is ringfenced.
