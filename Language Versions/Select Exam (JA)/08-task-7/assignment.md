---
slug: task-7
id: dk0zkdryqwvl
type: challenge
title: 07-Ringfencing Using a Label Group
difficulty: ""
timelimit: 0
enhanced_loading: null
---
`dev-prod` という名前のLabel Groupを作成してください。

このLabel Groupには、以下のEnvironment labelを含める必要があります:

- `Development`
- `Production`

既存の `Task6-RingfenceOrdering` Policyを更新し、個別のEnvironment
label `Development` の代わりに `dev-prod` Label Groupを使用するように
してください。

結果として得られるpolicyは、同じPolicyを使って `ordering`
アプリケーションのDevelopmentとProduction両方のインスタンスを
ringfenceする必要があります。
