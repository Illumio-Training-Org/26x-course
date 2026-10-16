---
slug: task-7
id: sz8xn9bc0g4x
type: challenge
title: 07-Ringfencing con un Label Group / Ringfencing Using a Label Group
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

📝 Task (English)
==========

Create a Label Group named `dev-prod`.

The Label Group must contain the following Environment labels:

- `Development`
- `Production`

Update the existing `Task6-RingfenceOrdering` Policy to use the
`dev-prod` Label Group in place of the individual `Development`
Environment label.

The resulting policy must ringfence both the Development and
Production instances of the `ordering` application using the same
Policy.

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
