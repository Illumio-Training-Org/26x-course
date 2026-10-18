---
slug: task-8
id: rpxuei9payjf
type: challenge
title: 08-Segmentación global entre Development y Production / Global Development
  and Production Segmentation
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

📝 Task (English)
==========

Create a Policy named `Task8-DenyGlobal`.

Configure a **global**, **one-way** deny rule preventing
communication from Development to Production for the `ordering`
application.

Source:

- Application: `ordering`
- Environment: `Development`

Destination:

- Application: `ordering`
- Environment: `Production`

The rule must:

- Deny **All Services**
- Apply **globally**

Within the same Policy, create an exception that permits **SSH**
traffic from Development to Production for the `ordering` application.

The **SSH** exception must also be **one-way** from Development to
Production and have no Location restriction.

🔑 ¿Se ha cerrado tu sesión en la Consola?
==========

Solo es necesario si la Consola de Illumio ha cerrado tu sesión (lo hace tras 10-15 minutos de inactividad). Si sigues conectado, ignora esto y continúa en la pestaña de la Consola que tienes abierta.

**[Haz clic aquí para volver a iniciar sesión]([[ Instruqt-Var key="MAGICURL" hostname="cloud-client" ]])** - tu trabajo se conserva.

Si el enlace no se abre, copia esto en una nueva pestaña del navegador:

```
[[ Instruqt-Var key="MAGICURL" hostname="cloud-client" ]]
```

🔑 Logged out of the Console? (English)
==========

Only needed if the Illumio Console has logged you out (it does after 10-15 minutes of inactivity). If you're still logged in, ignore this and carry on in your open Console tab.

**[Click here to log back in]([[ Instruqt-Var key="MAGICURL" hostname="cloud-client" ]])** - your work is kept.

If the link doesn't open, copy this into a new browser tab:

```
[[ Instruqt-Var key="MAGICURL" hostname="cloud-client" ]]
```
