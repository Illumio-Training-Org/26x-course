---
slug: task-9
id: k3cyxqwtl0te
type: challenge
title: 09-Ringfence the Payment Application
difficulty: ""
timelimit: 0
enhanced_loading: null
---
`Payment` アプリケーションを `LDN` でringfenceしてください: `Task9-RingfencePayment`
という名前のPolicyを作成し、`Payment` アプリケーション(Location: `LDN`)内の
workload同士が自由に通信できるようallow ruleを設定してください。

次に、同じPolicyに2つ目のallow ruleを追加し、`Ordering` アプリケーションから
`Payment`(Location: `LDN`)への、HTTPS(TCPポート `443`)によるinboundトラフィック
を許可してください。これにより、`Payment` がringfenceされた後もOrderingが
Paymentにアクセスできるようになります。
