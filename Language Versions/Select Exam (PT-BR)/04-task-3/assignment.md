---
slug: task-3
id: t2xsxkvea6nx
type: challenge
title: 03-Policy de Core Services / Core Services Policy
difficulty: ""
timelimit: 0
enhanced_loading: null
---
📝 Tarefa
==========

Crie uma Policy separada chamada `Task3-CoreServices`.

Configure uma regra allow que permita que a aplicação de monitoramento Nagios se comunique com a aplicação `portal` usando **Nagios NRPE**, **TCP** porta `5666`, para que o tráfego de monitoramento não seja negado depois que a aplicação receber ringfencing.

Use o Map para identificar a instância do Nagios na Califórnia e confirmar as labels dela antes de criar a regra.

> [!NOTE]
> Os fluxos de tráfego ainda podem estar carregando neste momento. Se for o caso,
> continue sem usar o Map.

O Source deve ser definido usando as labels Location, Environment, Application e Role, incluindo:

- Role: `nagios`

O Destination deve incluir:

- Application: `portal`
- Environment: `Production`
- Location: `ca`

A regra deve permitir **TCP** porta `5666` ou o service **Nagios NRPE**.

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
