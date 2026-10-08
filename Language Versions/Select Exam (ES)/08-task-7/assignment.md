---
slug: task-7
id: sz8xn9bc0g4x
type: challenge
title: 07-Ringfencing con un Label Group
difficulty: ""
timelimit: 0
enhanced_loading: null
---
📝 Tarea
==========

Crea un Label Group llamado `dev-prod`.

El Label Group debe contener las siguientes labels de Environment:

- `Development`
- `Production`

Actualiza la Policy existente `Task6-RingfenceOrdering` para que use el
Label Group `dev-prod` en lugar de la label de Environment individual
`Development`.

La policy resultante debe aplicar ringfencing a las instancias de
Development y de Production de la aplicación `ordering` usando la
misma Policy.

🔑 ¿Se ha cerrado tu sesión en la Consola?
==========

Solo es necesario si la Consola de Illumio ha cerrado tu sesión (lo hace tras 10-15 minutos de inactividad). Si sigues conectado, ignora esto y continúa en la pestaña de la Consola que tienes abierta.

**[Haz clic aquí para volver a iniciar sesión]([[ Instruqt-Var key="MAGICURL" hostname="cloud-client" ]])** - tu trabajo se conserva.

Si el enlace no se abre, copia esto en una nueva pestaña del navegador:

```
[[ Instruqt-Var key="MAGICURL" hostname="cloud-client" ]]
```
