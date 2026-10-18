---
slug: task-4
id: k8tuisylni5y
type: challenge
title: 04-Policy de denegación básica / Basic Deny Policy
difficulty: ""
timelimit: 0
enhanced_loading: null
---
📝 Tarea
==========

Crea una Policy sin scope (scopeless) llamada `Task4-DenyPolicy`.

Dentro de esta Policy, crea una regla que deniegue el tráfico **SSH**
desde todos los workloads hacia los workloads que coincidan con las
siguientes labels:

- Application: `ordering`
- Environment: `Production`
- Location: `ca`

Son las mismas labels que asignaste a `linux-vm` en la Tarea 2. La
regla debe configurarse como un **Deny** estándar y **no** debe usar
**Override Deny**.

> [!NOTE]
> Deja `Task4-DenyPolicy` en **Draft**. No provisiones la Policy.

> [!NOTE]
> Puedes usar el service **SSH** integrado. Si en su lugar defines el
> puerto 22 manualmente, debe configurarse tanto para **TCP** como
> para **UDP**.

📝 Task (English)
==========

Create a scopeless Policy named `Task4-DenyPolicy`.

Within this Policy, create a rule that denies **SSH** traffic from all
workloads to workloads matching the following labels:

- Application: `ordering`
- Environment: `Production`
- Location: `ca`

These are the same labels you assigned to `linux-vm` in Task 2. The
rule must be configured as a standard **Deny** and must **not** use
**Override Deny**.

> [!NOTE]
> Leave `Task4-DenyPolicy` in **Draft**. Do not provision the Policy.

> [!NOTE]
> You may use the built-in **SSH** service. If you define port 22
> manually instead, it must be configured for both **TCP** and
> **UDP**.

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
