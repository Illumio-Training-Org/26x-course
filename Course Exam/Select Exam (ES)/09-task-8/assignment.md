---
slug: task-8
id: 1hcfaskfiogq
type: challenge
title: 08-Deny Dev to Prod for Ordering Globally
difficulty: ""
timelimit: 0
enhanced_loading: null
---
Crea una Policy llamada `Task8-DenyGlobal` con una deny rule que
bloquee toda comunicacion **en un solo sentido, de Development a
Production unicamente**, para la aplicacion `ordering`. Esta es una
regla **global** sin restriccion de Location, por lo que se aplica en
todas las ubicaciones, no solo en `ca`.

Luego anade una excepcion: una Allow Rule que permita SSH en un solo
sentido, de Development a Production, para `ordering`.
