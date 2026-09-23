---
slug: task-2
id: ezjaveqonhdm
type: challenge
title: 02-Application Ringfencing
difficulty: ""
timelimit: 0
enhanced_loading: null
---
Add the following labels to both `linux-vm` and `windows-vm`:

- Type: `server`
- DFIR: `IR-CLEANBUBBLE`

The workloads should now be classified using all six label
categories: Role, Application, Environment, Location, Type, and DFIR.

Ringfence the `portal` application by creating a Policy named
`Task2-Ringfence`.

Create an allow rule that permits workloads matching the following
five labels to communicate freely with each other:

- Application: `portal`
- Environment: `Production`
- Location: `ca`
- Type: `server`
- DFIR: `IR-CLEANBUBBLE`
