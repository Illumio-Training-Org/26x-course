---
slug: task-1
id: 0qvmiasssmpf
type: challenge
title: 01-Pareamento de workloads e classificação da aplicação / Workload Pairing
  and Application Classification
tabs:
- id: mxhhnfa3letm
  title: Linux
  type: terminal
  hostname: linux-vm
  cmd: bash
- id: qmm0m2od58jy
  title: Windows
  type: terminal
  hostname: windows-vm
difficulty: ""
timelimit: 0
enhanced_loading: null
---
📝 Tarefa
==========

Crie um novo Pairing Profile com o Enforcement Mode definido como **Idle**.

Use o Pairing Profile para parear `linux-vm` e `windows-vm` como VENs e classifique-os como parte da mesma aplicação usando as seguintes labels:

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

Verifique se os dois workloads foram pareados com sucesso e use o Map para confirmar que eles aparecem dentro da aplicação `portal`.


> [!NOTE]
> Os fluxos de tráfego ainda podem estar carregando neste momento. Se for o caso,
> continue sem usar o Map.

📝 Task (English)
==========

Create a new Pairing Profile with its Enforcement Mode set to **Idle**.

Use the Pairing Profile to pair both `linux-vm` and `windows-vm` as
VENs and classify them as part of the same application using the
following labels:

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

Verify that both workloads have successfully paired and use the Map
to confirm that they appear within the `portal` application.


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
