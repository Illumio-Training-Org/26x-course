---
slug: task-1
id: zrxxg4ucawoe
type: challenge
title: 01-Workload Pairing and Application Classification
tabs:
- id: cipyibdc2ahu
  title: Linux
  type: terminal
  hostname: linux-vm
  cmd: bash
- id: ecn8abjtqjwv
  title: Windows
  type: terminal
  hostname: windows-vm
difficulty: ""
timelimit: 0
enhanced_loading: null
---
Enforcement Modeを **Idle** に設定した新しいPairing Profileを作成してください。

Pairing Profileを使って `linux-vm` と `windows-vm` の両方をVENとして
ペアリングし、以下のlabelを使って同じアプリケーションの一部として
分類してください:

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

両方のworkloadが正常にペアリングされたことを確認し、Mapを使って
`portal` アプリケーション内に表示されることを確認してください。
