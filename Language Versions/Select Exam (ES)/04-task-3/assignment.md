---
slug: task-3
id: zry8aq2mhb0y
type: challenge
title: 03-Policy de Core Services
difficulty: ""
timelimit: 0
enhanced_loading: null
---
📝 Tarea
==========

Crea una Policy independiente llamada `Task3-CoreServices`.

Configura una regla allow que permita a la aplicación de monitorización
Nagios comunicarse con la aplicación `portal` mediante **Nagios NRPE**,
puerto **TCP** `5666`, para que el tráfico de monitorización no se
deniegue una vez aplicado el ringfencing a la aplicación.

Usa el Map para identificar la instancia de Nagios en California y
confirmar sus labels antes de crear la regla.

> [!NOTE]
> Es posible que los flujos de tráfico todavía se estén cargando en
> este momento. Si es así, continúa sin usar el Map.

El Source debe definirse usando sus labels de Location, Environment,
Application y Role, incluida:

- Role: `nagios`

El Destination debe incluir:

- Application: `portal`
- Environment: `Production`
- Location: `ca`

La regla debe permitir el puerto **TCP** `5666` o el service
**Nagios NRPE**.

🔑 ¿Se ha cerrado tu sesión en la Consola?
==========

Solo es necesario si la Consola de Illumio ha cerrado tu sesión (lo hace tras 10-15 minutos de inactividad). Si sigues conectado, ignora esto y continúa en la pestaña de la Consola que tienes abierta.

**[Haz clic aquí para volver a iniciar sesión]([[ Instruqt-Var key="MAGICURL" hostname="cloud-client" ]])** - tu trabajo se conserva.

Si el enlace no se abre, copia esto en una nueva pestaña del navegador:

```
[[ Instruqt-Var key="MAGICURL" hostname="cloud-client" ]]
```
