---
slug: task-8
id: mlzml82visxo
type: challenge
title: 08-Segmentación global entre Development y Production
difficulty: ""
timelimit: 0
enhanced_loading: null
---
📝 Tarea
==========

Crea una Policy llamada `Task8-DenyGlobal`.

Configura una regla deny **global** y **unidireccional** que impida la
comunicación de Development a Production para la aplicación `ordering`.

Source:

- Application: `ordering`
- Environment: `Development`

Destination:

- Application: `ordering`
- Environment: `Production`

La regla debe:

- Denegar **All Services**
- Aplicarse **globalmente**

Dentro de la misma Policy, crea una excepción que permita el tráfico
**SSH** de Development a Production para la aplicación `ordering`.

La excepción de **SSH** también debe ser **unidireccional** de
Development a Production y no tener ninguna restricción de Location.

🔑 ¿Se ha cerrado tu sesión en la Consola?
==========

Solo es necesario si la Consola de Illumio ha cerrado tu sesión (lo hace tras 10-15 minutos de inactividad). Si sigues conectado, ignora esto y continúa en la pestaña de la Consola que tienes abierta.

**[Haz clic aquí para volver a iniciar sesión]([[ Instruqt-Var key="MAGICURL" hostname="cloud-client" ]])** - tu trabajo se conserva.

Si el enlace no se abre, copia esto en una nueva pestaña del navegador:

```
[[ Instruqt-Var key="MAGICURL" hostname="cloud-client" ]]
```
