---
slug: task-2
id: 5ukxz3uovkzc
type: challenge
title: 02-Application Ringfencing
difficulty: ""
timelimit: 0
enhanced_loading: null
---
Anade los siguientes labels tanto a `linux-vm` como a `windows-vm`:

- Type: `server`
- DFIR: `IR-CLEANBUBBLE`

Los workloads ahora deberian estar clasificados usando las seis
categorias de label: Role, Application, Environment, Location, Type
y DFIR.

Ringfence la aplicacion `portal` creando una Policy llamada
`Task2-Ringfence`.

Crea una allow rule que permita a los workloads que coincidan con los
siguientes cinco labels comunicarse libremente entre si:

- Application: `portal`
- Environment: `Production`
- Location: `ca`
- Type: `server`
- DFIR: `IR-CLEANBUBBLE`
