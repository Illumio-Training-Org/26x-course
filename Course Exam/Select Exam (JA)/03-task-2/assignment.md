---
slug: task-2
id: crk5ip4r2kjh
type: challenge
title: 02-Ringfence the Application
difficulty: ""
timelimit: 0
enhanced_loading: null
---
**Variation 1**
nm and je disucssion HERE
`linux-vm` と `windows-vm` の両方にさらに2つのlabelを追加してください: Type: `server`,
IR: `IR-CLEANBUBBLE`(両方のworkloadで合計6つのlabelカテゴリ: Role, Application,
Environment, Location, Type, IR)。

`portal` アプリケーションをringfenceしてください(Environment: `Production`,
Location: `ca`, Type: `server`, IR: `IR-CLEANBUBBLE`): `Task2-Ringfence`
という名前のPolicyを作成し、5つすべてのlabelが一致するworkload同士が自由に
通信できるようallow ruleを設定してください。


**Variation 2**

`portal` アプリケーションをringfenceしてください。`Task2-Ringfence` という
名前のPolicyを作成し、5つすべてのlabelが一致するworkload同士が自由に通信
できるようallow ruleを設定してください。

- Environment: `Production`
- Location: `ca`
- Type: `server`
- IR: `IR-CLEANBUBBLE`


**Variation 3**

`portal` アプリケーションを、5つのlabelを使ってringfenceしてください。
`Task2-Ringfence` という名前のPolicyを作成し、5つすべてのlabelが一致する
workload同士が自由に通信できるようallow ruleを設定してください。
