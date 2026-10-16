---
slug: task-9
id: 5ucw6zyti7tx
type: challenge
title: 09-Ringfencing da aplicação payment e sua dependência / Payment Application
  Ringfencing and Dependency
difficulty: ""
timelimit: 0
enhanced_loading: null
---
📝 Tarefa
==========

Crie uma Policy chamada `Task9-RingfencePayment`.

Aplique ringfencing à aplicação `payment` em `ldn` criando uma regra allow que permita os workloads que correspondem a:

- Application: `payment`
- Location: `ldn`

Na mesma Policy, crie uma segunda regra allow que permita a comunicação de entrada da aplicação `ordering` para a aplicação `payment` em `ldn`, para que `ordering` continue alcançando `payment` depois do ringfencing.

A segunda regra deve permitir:

- Source: a aplicação `ordering`
- Destination: a aplicação `payment`, Location: `ldn`
- Service: **HTTPS**, **TCP** porta `443`

📝 Task (English)
==========

Create a Policy named `Task9-RingfencePayment`.

Ringfence the `payment` application in `ldn` by creating an allow
rule that permits workloads matching:

- Application: `payment`
- Location: `ldn`

Within the same Policy, create a second allow rule permitting inbound
communication from the `ordering` application to the `payment`
application in `ldn`, so `ordering` can still reach `payment` once it's
ringfenced.

The second rule must allow:

- Source: the `ordering` application
- Destination: the `payment` application, Location: `ldn`
- Service: **HTTPS**, **TCP** port `443`

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
