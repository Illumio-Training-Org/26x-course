---
slug: task-7
id: yxrnox7xslkc
type: challenge
title: 07-Ringfencing com um Label Group / Ringfencing Using a Label Group
difficulty: ""
timelimit: 0
enhanced_loading: null
---
📝 Tarefa
==========

Crie um Label Group chamado `dev-prod`.

O Label Group deve conter as seguintes labels de Environment:

- `Development`
- `Production`

Atualize a Policy existente `Task6-RingfenceOrdering` para usar o Label Group `dev-prod` no lugar da label de Environment `Development` individual.

A policy resultante deve aplicar ringfencing às instâncias Development e Production da aplicação `ordering` usando a mesma Policy.

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
