---
slug: task-3
id: vrymjaryfbzj
type: challenge
title: 03-Core Services Policy
difficulty: ""
timelimit: 0
enhanced_loading: null
---
`Task3-CoreServices` という名前の独立したPolicyを作成してください。

Nagios監視アプリケーションが `portal` アプリケーションと **Nagios
NRPE**、**TCP** ポート `5666` で通信できるよう、allow ruleを設定して
ください。アプリケーションがringfenceされた後も監視トラフィックが
拒否されないようにするためです。

ruleを作成する前に、Mapを使ってCaliforniaにあるNagiosインスタンスを
特定し、そのlabelを確認してください。

送信元は、Location、Environment、Application、Roleのlabelを使って
定義する必要があります。以下を含めてください:

- Role: `nagios`

宛先には以下を含める必要があります:

- Application: `portal`
- Environment: `Production`
- Location: `ca`

ruleは **TCP** ポート `5666` または **Nagios NRPE** サービスの
いずれかを許可する必要があります。
