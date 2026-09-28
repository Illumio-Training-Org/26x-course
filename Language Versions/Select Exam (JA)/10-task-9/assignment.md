---
slug: task-9
id: k3cyxqwtl0te
type: challenge
title: 09-Payment Application Ringfencing and Dependency
difficulty: ""
timelimit: 0
enhanced_loading: null
---
`Task9-RingfencePayment` という名前のPolicyを作成してください。

以下に一致するworkloadが自由に通信できるよう、allow ruleを作成して
`Payment` アプリケーションを `LDN` でringfenceしてください:

- Application: `Payment`
- Location: `LDN`

同じPolicy内に、`Ordering` アプリケーションから `LDN` の `Payment`
アプリケーションへのinbound通信を許可する2つ目のallow ruleを作成
してください。これにより、`Payment` がringfenceされた後もOrderingが
Paymentにアクセスできるようになります。

2つ目のruleは以下を許可する必要があります:

- 送信元: `Ordering` アプリケーション
- 宛先: `Payment` アプリケーション、Location: `LDN`
- Service: **HTTPS**、**TCP** ポート `443`
