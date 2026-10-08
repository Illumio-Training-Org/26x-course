---
slug: task-5
id: 8vfwki2xrvo7
type: challenge
title: 05-Segmentación de entornos
difficulty: ""
timelimit: 0
enhanced_loading: null
---
📝 Tarea
==========

Usa el Map para inspeccionar las comunicaciones entre los entornos
Development y Production de la aplicación `ordering` en la ubicación
`ca`.

> [!NOTE]
> Es posible que los flujos de tráfico todavía se estén cargando en
> este momento. Si es así, continúa sin usar el Map.

Crea una Policy llamada `Task5-DenyDevProd`.

Configura una regla deny para **All Services** con:

Source:

- Application: `ordering`
- Environment: `Development`
- Location: `ca`

Destination:

- Application: `ordering`
- Environment: `Production`
- Location: `ca`

Usa el Map para verificar el efecto de la policy.

> [!NOTE]
> Es posible que los flujos de tráfico todavía se estén cargando en
> este momento. Si es así, continúa sin usar el Map.

🔑 ¿Se ha cerrado tu sesión en la Consola?
==========

Solo es necesario si la Consola de Illumio ha cerrado tu sesión (lo hace tras 10-15 minutos de inactividad). Si sigues conectado, ignora esto y continúa en la pestaña de la Consola que tienes abierta.

**[Haz clic aquí para volver a iniciar sesión]([[ Instruqt-Var key="MAGICURL" hostname="cloud-client" ]])** - tu trabajo se conserva.

Si el enlace no se abre, copia esto en una nueva pestaña del navegador:

```
[[ Instruqt-Var key="MAGICURL" hostname="cloud-client" ]]
```
