---
slug: task-6
id: mrux8oom2gya
type: challenge
title: 06-Ordering Application Ringfencing
difficulty: ""
timelimit: 0
enhanced_loading: null
---
Usa el Map para inspeccionar las comunicaciones dentro de la
aplicacion `ordering`.

Ringfence la instancia de Development de la aplicacion creando una
Policy llamada `Task6-RingfenceOrdering`.

Crea una allow rule que permita a los workloads que coincidan con los
siguientes labels comunicarse libremente entre si:

- Application: `ordering`
- Environment: `Development`
- Location: `ca`
