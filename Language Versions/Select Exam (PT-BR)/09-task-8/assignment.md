---
slug: task-8
id: xkqsmqlztmmf
type: challenge
title: 08-Segmentação global entre Development e Production / Global Development and
  Production Segmentation
difficulty: ""
timelimit: 0
enhanced_loading: null
---
📝 Tarefa
==========

Crie uma Policy chamada `Task8-DenyGlobal`.

Configure uma regra deny **global** e **unidirecional** que impeça a comunicação de Development para Production na aplicação `ordering`.

Source:

- Application: `ordering`
- Environment: `Development`

Destination:

- Application: `ordering`
- Environment: `Production`

A regra deve:

- Negar **All Services**
- Ser aplicada **globalmente**

Na mesma Policy, crie uma exceção que permita o tráfego **SSH** de Development para Production na aplicação `ordering`.

A exceção de **SSH** também deve ser **unidirecional** de Development para Production e não ter restrição de Location.

📝 Task (English)
==========

Create a Policy named `Task8-DenyGlobal`.

Configure a **global**, **one-way** deny rule preventing
communication from Development to Production for the `ordering`
application.

Source:

- Application: `ordering`
- Environment: `Development`

Destination:

- Application: `ordering`
- Environment: `Production`

The rule must:

- Deny **All Services**
- Apply **globally**

Within the same Policy, create an exception that permits **SSH**
traffic from Development to Production for the `ordering` application.

The **SSH** exception must also be **one-way** from Development to
Production and have no Location restriction.

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
