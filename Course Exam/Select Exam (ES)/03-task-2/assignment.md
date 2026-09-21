---
slug: task-2
id: 5ukxz3uovkzc
type: challenge
title: 02-Ringfence the Application
difficulty: ""
timelimit: 0
enhanced_loading: null
---
**Variacion 1**

Anade dos labels mas tanto a `linux-vm` como a `windows-vm`: Type:
`server`, IR: `IR-CLEANBUBBLE` (6 categorias de label en total entre
los dos workloads: Role, Application, Environment, Location, Type,
IR).

Ringfence la aplicacion `portal` (Environment: `Production`, Location:
`ca`, Type: `server`, IR: `IR-CLEANBUBBLE`): crea una Policy llamada
`Task2-Ringfence` con una allow rule para que los workloads que
coincidan con los cinco labels puedan comunicarse libremente entre si.


**Variacion 2**

Ringfence la aplicacion `portal`. Crea una Policy llamada
`Task2-Ringfence` con una allow rule para que los workloads que
coincidan con los cinco labels puedan comunicarse libremente entre si.

- Environment: `Production`
- Location: `ca`
- Type: `server`
- IR: `IR-CLEANBUBBLE`


**Variacion 3**

Ringfence la aplicacion `portal`, usando 5 labels. Crea una Policy
llamada `Task2-Ringfence` con una allow rule para que los workloads
que coincidan con los cinco labels puedan comunicarse libremente entre
si.
