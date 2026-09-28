---
slug: task-6
id: abfnbqzllxgw
type: challenge
title: 06-Ordering Application Ringfencing
difficulty: ""
timelimit: 0
enhanced_loading: null
---
Mapを使って `ordering` アプリケーション内の通信を確認してください。

`Task6-RingfenceOrdering` という名前のPolicyを作成し、アプリケー
ションのDevelopmentインスタンスをringfenceしてください。

以下のlabelが一致するworkload同士が自由に通信できるよう、allow
ruleを作成してください:

- Application: `ordering`
- Environment: `Development`
- Location: `ca`
