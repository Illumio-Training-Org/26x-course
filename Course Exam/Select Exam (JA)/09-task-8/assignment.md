---
slug: task-8
id: h7fxwfypcb4a
type: challenge
title: 08-Deny the Ordering Application Globally
difficulty: ""
timelimit: 0
enhanced_loading: null
---
`ordering` アプリケーションについて、**Development から Production への
一方向のみ** の全通信をブロックするdeny ruleを持つ `Task8-DenyGlobal`
という名前のPolicyを作成してください。これはLocationの制限がない
**global** ruleであり、`ca` だけでなくすべてのlocationに適用されます。

次に例外を追加してください: `ordering` について、Development から
Productionへの一方向のSSHを許可するAllow Ruleです。
