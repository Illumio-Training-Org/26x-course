---
slug: task-8
id: h7fxwfypcb4a
type: challenge
title: 08-Global Development and Production Segmentation
difficulty: ""
timelimit: 0
enhanced_loading: null
---
`Task8-DenyGlobal` という名前のPolicyを作成してください。

`ordering` アプリケーションについて、DevelopmentからProductionへの
通信を防ぐ **global** かつ **一方向** のdeny ruleを構成してください。

送信元:

- Application: `ordering`
- Environment: `Development`

宛先:

- Application: `ordering`
- Environment: `Production`

このruleは以下を満たす必要があります:

- **All Services** を拒否する
- **globally**(すべてのlocationに)適用される

同じPolicy内に、`ordering` アプリケーションについてDevelopmentから
Productionへの **SSH** トラフィックを許可する例外を作成してください。

この **SSH** の例外もDevelopmentからProductionへの **一方向** である
必要があり、Locationの制限を持たない必要があります。
