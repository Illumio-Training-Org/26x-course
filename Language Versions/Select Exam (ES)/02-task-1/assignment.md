---
slug: task-1
id: 5mtxah81arth
type: challenge
title: 01-Emparejamiento de workloads y clasificación de la aplicación
tabs:
- id: fpwijbtxtfxr
  title: Linux
  type: terminal
  hostname: linux-vm
  cmd: bash
- id: ixnct2hbofty
  title: Windows
  type: terminal
  hostname: windows-vm
difficulty: ""
timelimit: 0
enhanced_loading: null
---
📝 Tarea
==========

Crea un nuevo Pairing Profile con su Enforcement Mode configurado en **Idle**.

Usa el Pairing Profile para emparejar `linux-vm` y `windows-vm` como
VENs y clasifícalos como parte de la misma aplicación usando las
siguientes labels:

`linux-vm`

- Role: `web`
- Application: `portal`
- Environment: `Production`
- Location: `ca`

`windows-vm`

- Role: `db`
- Application: `portal`
- Environment: `Production`
- Location: `ca`

Comprueba que ambos workloads se han emparejado correctamente y usa el
Map para confirmar que aparecen dentro de la aplicación `portal`.

> [!NOTE]
> Es posible que los flujos de tráfico todavía se estén cargando en
> este momento. Si es así, continúa sin usar el Map.

🔑 ¿Se ha cerrado tu sesión en la Consola?
==========

Solo es necesario si la Consola de Illumio ha cerrado tu sesión (lo hace tras 10-15 minutos de inactividad). Si sigues conectado, ignora esto y continúa en la pestaña de la Consola que tienes abierta.

**[Haz clic aquí para volver a iniciar sesión]([[ Instruqt-Var key="MAGICURL" hostname="cloud-client" ]])** - tu trabajo se conserva.

Si el enlace no se abre, copia esto en una nueva pestaña del navegador:

```
[[ Instruqt-Var key="MAGICURL" hostname="cloud-client" ]]
```
