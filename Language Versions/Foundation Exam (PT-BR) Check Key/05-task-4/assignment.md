---
slug: task-4
id: 4phsftkutvhx
type: challenge
title: 04-Policy de negação básica / Basic Deny Policy
difficulty: ""
timelimit: 0
enhanced_loading: null
---
📝 Tarefa
==========

Crie uma Policy sem scope chamada `Task4-DenyPolicy`.

Nesta Policy, crie uma regra que negue o tráfego **SSH** de todos os workloads para os workloads que correspondem às seguintes labels:

- Application: `ordering`
- Environment: `Production`
- Location: `ca`

São as mesmas labels que você atribuiu a `linux-vm` na Tarefa 2. A regra deve ser configurada como um **Deny** padrão e **não** deve usar **Override Deny**.

> [!NOTE]
> Deixe `Task4-DenyPolicy` em **Draft**. Não provisione a Policy.

> [!NOTE]
> Você pode usar o service **SSH** integrado. Se, em vez disso, você definir a porta 22
> manualmente, ela deve ser configurada tanto para **TCP** quanto para
> **UDP**.

📝 Task (English)
==========

Create a scopeless Policy named `Task4-DenyPolicy`.

Within this Policy, create a rule that denies **SSH** traffic from all
workloads to workloads matching the following labels:

- Application: `ordering`
- Environment: `Production`
- Location: `ca`

These are the same labels you assigned to `linux-vm` in Task 2. The
rule must be configured as a standard **Deny** and must **not** use
**Override Deny**.

> [!NOTE]
> Leave `Task4-DenyPolicy` in **Draft**. Do not provision the Policy.

> [!NOTE]
> You may use the built-in **SSH** service. If you define port 22
> manually instead, it must be configured for both **TCP** and
> **UDP**.

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
