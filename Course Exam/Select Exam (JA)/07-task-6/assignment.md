---
slug: task-6
id: abfnbqzllxgw
type: challenge
title: 06-Ringfence the Ordering Application
difficulty: ""
timelimit: 0
enhanced_loading: null
---
Mapを使って `ordering` アプリケーション内のトラフィックをフィルタリングして
確認してください - まずApplication labelでグループ化してください。

`ordering` アプリケーションを `Development`、`ca` でringfenceしてください:
`Task6-RingfenceOrdering` という名前のPolicyを作成し、`ordering`
アプリケーション、Environment: `Development`、Location: `ca` に属する
workload同士が自由に通信できるようallow ruleを設定してください。
