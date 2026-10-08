---
slug: task-6
id: qhhktymy5qxn
type: challenge
title: 06-Ringfencing de la aplicación ordering
difficulty: ""
timelimit: 0
enhanced_loading: null
---
📝 Tarea
==========

Usa el Map para inspeccionar las comunicaciones dentro de la aplicación
`ordering`.

> [!NOTE]
> Es posible que los flujos de tráfico todavía se estén cargando en
> este momento. Si es así, continúa sin usar el Map.

Aplica ringfencing a la instancia de Development de la aplicación
creando una Policy llamada `Task6-RingfenceOrdering`.

Crea una regla allow que permita a los workloads que coincidan con las
siguientes labels comunicarse libremente entre sí:

- Application: `ordering`
- Environment: `Development`
- Location: `ca`

🔑 ¿Se ha cerrado tu sesión en la Consola?
==========

Solo es necesario si la Consola de Illumio ha cerrado tu sesión (lo hace tras 10-15 minutos de inactividad). Si sigues conectado, ignora esto y continúa en la pestaña de la Consola que tienes abierta.

**[Haz clic aquí para volver a iniciar sesión]([[ Instruqt-Var key="MAGICURL" hostname="cloud-client" ]])** - tu trabajo se conserva.

Si el enlace no se abre, copia esto en una nueva pestaña del navegador:

```
[[ Instruqt-Var key="MAGICURL" hostname="cloud-client" ]]
```
