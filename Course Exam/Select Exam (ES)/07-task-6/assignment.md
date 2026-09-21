---
slug: task-6
id: mrux8oom2gya
type: challenge
title: 06-Ringfence Ordering in Dev, CA
difficulty: ""
timelimit: 0
enhanced_loading: null
---
Usa el Map para filtrar e inspeccionar el trafico dentro de la
aplicacion `ordering` - agrupa primero por labels de Application.

Ringfence la aplicacion `ordering` en `Development`, `ca`: crea una
Policy llamada `Task6-RingfenceOrdering` con una allow rule para que
los workloads de la aplicacion `ordering`, Environment: `Development`,
Location: `ca`, puedan comunicarse libremente entre si.
