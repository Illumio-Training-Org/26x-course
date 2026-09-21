---
slug: task-3
id: vrymjaryfbzj
type: challenge
title: 03-Create a Core Services Policy
difficulty: ""
timelimit: 0
enhanced_loading: null
---
Role: `nagios` から `portal` アプリケーション(Application: `portal`,
Environment: `Production`, Location: `ca`)への、Nagios NRPEサービス
(TCPポート `5666`)を許可するallow ruleを持つ `Task3-CoreServices` という
名前のPolicyを作成し、アプリケーションがringfenceされた後も監視トラフィック
が拒否されないようにしてください。

Mapを使ってCaliforniaにある正しいNagiosインスタンスを見つけ、ruleを構築する
前にそのlabelを確認してください。ruleの送信元側には、Location、Environment、
Application、Roleを含める必要があります。
