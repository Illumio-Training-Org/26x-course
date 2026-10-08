---
slug: task-9
id: vwwy2pauscgp
type: challenge
title: 09-Ringfencing de la aplicación payment y su dependencia
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

🔑 ¿Se ha cerrado tu sesión en la Consola?
==========

Solo es necesario si la Consola de Illumio ha cerrado tu sesión (lo hace tras 10-15 minutos de inactividad). Si sigues conectado, ignora esto y continúa en la pestaña de la Consola que tienes abierta.

**[Haz clic aquí para volver a iniciar sesión]([[ Instruqt-Var key="MAGICURL" hostname="cloud-client" ]])** - tu trabajo se conserva.

Si el enlace no se abre, copia esto en una nueva pestaña del navegador:

```
[[ Instruqt-Var key="MAGICURL" hostname="cloud-client" ]]
```
