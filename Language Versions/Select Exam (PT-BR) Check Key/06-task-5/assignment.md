---
slug: task-5
id: iqeqmjvlro90
type: challenge
title: 05-Segmentação de ambientes / Environment Segmentation
difficulty: ""
timelimit: 0
enhanced_loading: null
---
📝 Tarefa
==========

Use o Map para inspecionar as comunicações entre os ambientes Development e Production da aplicação `ordering` na localização `ca`.

> [!NOTE]
> Os fluxos de tráfego ainda podem estar carregando neste momento. Se for o caso,
> continue sem usar o Map.

Crie uma Policy chamada `Task5-DenyDevProd`.

Configure uma regra deny para **All Services** com:

Source:

- Application: `ordering`
- Environment: `Development`
- Location: `ca`

Destination:

- Application: `ordering`
- Environment: `Production`
- Location: `ca`

Use o Map para verificar o efeito da policy.


> [!NOTE]
> Os fluxos de tráfego ainda podem estar carregando neste momento. Se for o caso,
> continue sem usar o Map.

📝 Task (English)
==========

Use the Map to inspect communications between the Development and
Production environments for the `ordering` application in the `ca`
location.

> [!NOTE]
> Traffic flows may still be loading at this point. If they are,
> please proceed without using the Map.

Create a Policy named `Task5-DenyDevProd`.

Configure a deny rule for **All Services** with:

Source:

- Application: `ordering`
- Environment: `Development`
- Location: `ca`

Destination:

- Application: `ordering`
- Environment: `Production`
- Location: `ca`

Use the Map to verify the effect of the policy.


> [!NOTE]
> Traffic flows may still be loading at this point. If they are,
> please proceed without using the Map.

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
