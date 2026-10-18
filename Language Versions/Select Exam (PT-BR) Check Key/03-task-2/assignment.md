---
slug: task-2
id: 0f0pgfld9aoa
type: challenge
title: 02-Ringfencing da aplicação / Application Ringfencing
difficulty: ""
timelimit: 0
enhanced_loading: null
---
📝 Tarefa
==========

Adicione as seguintes labels a `linux-vm` e a `windows-vm`:

- Type: `server`
- DFIR: `IR-CLEANBUBBLE`

Agora os workloads devem estar classificados com as seis categorias de labels: Role, Application, Environment, Location, Type e DFIR.

Aplique ringfencing à aplicação `portal` criando uma Policy chamada `Task2-Ringfence`.

Crie uma regra allow que permita que os workloads que correspondem às cinco labels a seguir se comuniquem livremente entre si:

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

🔑 Sua sessão no Console foi encerrada?
==========

Só é necessário se o Console da Illumio tiver encerrado a sua sessão (isso acontece após 10-15 minutos de inatividade). Se você ainda estiver conectado, ignore isto e continue na aba do Console que já está aberta.

**[Clique aqui para entrar novamente]([[ Instruqt-Var key="MAGICURL" hostname="cloud-client" ]])** - seu trabalho é mantido.

Se o link não abrir, copie isto em uma nova aba do navegador:

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
