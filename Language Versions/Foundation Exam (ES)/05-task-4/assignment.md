---
slug: task-4
id: cym4sd74t2qo
type: challenge
title: 04-Policy de denegación básica
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

🔑 ¿Se ha cerrado tu sesión en la Consola?
==========

Solo es necesario si la Consola de Illumio ha cerrado tu sesión (lo hace tras 10-15 minutos de inactividad). Si sigues conectado, ignora esto y continúa en la pestaña de la Consola que tienes abierta.

**[Haz clic aquí para volver a iniciar sesión]([[ Instruqt-Var key="MAGICURL" hostname="cloud-client" ]])** - tu trabajo se conserva.

Si el enlace no se abre, copia esto en una nueva pestaña del navegador:

```
[[ Instruqt-Var key="MAGICURL" hostname="cloud-client" ]]
```
