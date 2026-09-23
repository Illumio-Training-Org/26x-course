---
slug: task-5
id: m5ha6l7ymyja
type: challenge
title: 05-Environment Segmentation
difficulty: ""
timelimit: 0
enhanced_loading: null
---
`ca` ロケーションにある `ordering` アプリケーションについて、
DevelopmentとProduction環境間の通信をMapで確認してください。

`Task5-DenyDevProd` という名前のPolicyを作成してください。

以下の設定で **All Services** を対象とするdeny ruleを構成してください:

送信元:

- Application: `ordering`
- Environment: `Development`
- Location: `ca`

宛先:

- Application: `ordering`
- Environment: `Production`
- Location: `ca`

Mapを使って、policyの効果を確認してください。
