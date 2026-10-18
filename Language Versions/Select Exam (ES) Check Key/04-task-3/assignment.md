---
slug: task-3
id: g3z1wtoaly0b
type: challenge
title: 03-Policy de Core Services / Core Services Policy
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

📝 Task (English)
==========

Create a separate Policy named `Task3-CoreServices`.

Configure an allow rule permitting the Nagios monitoring application
to communicate with the `portal` application using **Nagios NRPE**,
**TCP** port `5666`, so monitoring traffic isn't denied once the
application is ringfenced.

Use the Map to identify the Nagios instance in California and confirm
its labels before creating the rule.

> [!NOTE]
> Traffic flows may still be loading at this point. If they are,
> please proceed without using the Map.

The source must be defined using its Location, Environment,
Application, and Role labels, including:

- Role: `nagios`

The destination must include:

- Application: `portal`
- Environment: `Production`
- Location: `ca`

The rule must allow **TCP** port `5666` or the **Nagios NRPE**
service.

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
