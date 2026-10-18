---
slug: task-6
id: ldmm71voiqvq
type: challenge
title: 06-Ringfencing da aplicação ordering / Ordering Application Ringfencing
difficulty: ""
timelimit: 0
enhanced_loading: null
---
📝 Tarefa
==========

Use o Map para inspecionar as comunicações dentro da aplicação `ordering`.

> [!NOTE]
> Os fluxos de tráfego ainda podem estar carregando neste momento. Se for o caso,
> continue sem usar o Map.

Aplique ringfencing à instância Development da aplicação criando uma Policy chamada `Task6-RingfenceOrdering`.

Crie uma regra allow que permita que os workloads que correspondem às labels a seguir se comuniquem livremente entre si:

- Application: `ordering`
- Environment: `Development`
- Location: `ca`

📝 Task (English)
==========

Use the Map to inspect communications within the `ordering`
application.

> [!NOTE]
> Traffic flows may still be loading at this point. If they are,
> please proceed without using the Map.

Ringfence the Development instance of the application by creating a
Policy named `Task6-RingfenceOrdering`.

Create an allow rule permitting workloads matching the following
labels to communicate freely with each other:

- Application: `ordering`
- Environment: `Development`
- Location: `ca`

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
