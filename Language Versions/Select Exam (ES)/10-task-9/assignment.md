---
slug: task-9
id: vwwy2pauscgp
type: challenge
title: 09-Ringfencing de la aplicación payment y su dependencia / Payment Application
  Ringfencing and Dependency
difficulty: ""
timelimit: 0
enhanced_loading: null
---
📝 Tarea
==========

Crea una Policy llamada `Task9-RingfencePayment`.

Aplica ringfencing a la aplicación `payment` en `ldn` creando una regla
allow que permita los workloads que coincidan con:

- Application: `payment`
- Location: `ldn`

Dentro de la misma Policy, crea una segunda regla allow que permita la
comunicación entrante desde la aplicación `ordering` hacia la
aplicación `payment` en `ldn`, para que `ordering` pueda seguir
llegando a `payment` una vez aplicado el ringfencing.

La segunda regla debe permitir:

- Source: la aplicación `ordering`
- Destination: la aplicación `payment`, Location: `ldn`
- Service: **HTTPS**, puerto **TCP** `443`

📝 Task (English)
==========

Create a Policy named `Task9-RingfencePayment`.

Ringfence the `payment` application in `ldn` by creating an allow
rule that permits workloads matching:

- Application: `payment`
- Location: `ldn`

Within the same Policy, create a second allow rule permitting inbound
communication from the `ordering` application to the `payment`
application in `ldn`, so `ordering` can still reach `payment` once it's
ringfenced.

The second rule must allow:

- Source: the `ordering` application
- Destination: the `payment` application, Location: `ldn`
- Service: **HTTPS**, **TCP** port `443`

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
