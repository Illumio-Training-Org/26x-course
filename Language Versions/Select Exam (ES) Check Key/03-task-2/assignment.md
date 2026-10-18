---
slug: task-2
id: 6yv7jmbomerq
type: challenge
title: 02-Ringfencing de la aplicación / Application Ringfencing
difficulty: ""
timelimit: 0
enhanced_loading: null
---
📝 Tarea
==========

Añade las siguientes labels a `linux-vm` y a `windows-vm`:

- Type: `server`
- DFIR: `IR-CLEANBUBBLE`

Ahora los workloads deben quedar clasificados con las seis categorías
de labels: Role, Application, Environment, Location, Type y DFIR.

Aplica ringfencing a la aplicación `portal` creando una Policy llamada
`Task2-Ringfence`.

Crea una regla allow que permita a los workloads que coincidan con las
siguientes cinco labels comunicarse libremente entre sí:

- Application: `portal`
- Environment: `Production`
- Location: `ca`
- Type: `server`
- DFIR: `IR-CLEANBUBBLE`

📝 Task (English)
==========

Add the following labels to both `linux-vm` and `windows-vm`:

- Type: `server`
- DFIR: `IR-CLEANBUBBLE`

The workloads should now be classified using all six label
categories: Role, Application, Environment, Location, Type, and DFIR.

Ringfence the `portal` application by creating a Policy named
`Task2-Ringfence`.

Create an allow rule that permits workloads matching the following
five labels to communicate freely with each other:

- Application: `portal`
- Environment: `Production`
- Location: `ca`
- Type: `server`
- DFIR: `IR-CLEANBUBBLE`

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
