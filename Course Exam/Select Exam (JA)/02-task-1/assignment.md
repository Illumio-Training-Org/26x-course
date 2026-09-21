---
slug: task-1
id: zrxxg4ucawoe
type: challenge
title: 01-Pair 2 Workloads
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
Enforcement Modeを **Idle** に設定した新しいPairing Profileを作成し、それを使って
`linux-vm` と `windows-vm` の両方をVENとしてペアリングした上で、1つのアプリケーション
にまとめてlabelを付けてください:

- `linux-vm` — Role: `web`
- `windows-vm` — Role: `db`
- 両方のworkload — Application: `portal`, Environment: `Production`,
  Location: `ca`
