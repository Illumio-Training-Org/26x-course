---
slug: task-2
id: wtrwtf6lf6uj
type: challenge
title: 02-Ringfencing de la aplicación
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

🔑 ¿Se ha cerrado tu sesión en la Consola?
==========

Solo es necesario si la Consola de Illumio ha cerrado tu sesión (lo hace tras 10-15 minutos de inactividad). Si sigues conectado, ignora esto y continúa en la pestaña de la Consola que tienes abierta.

**[Haz clic aquí para volver a iniciar sesión]([[ Instruqt-Var key="MAGICURL" hostname="cloud-client" ]])** - tu trabajo se conserva.

Si el enlace no se abre, copia esto en una nueva pestaña del navegador:

```
[[ Instruqt-Var key="MAGICURL" hostname="cloud-client" ]]
```
