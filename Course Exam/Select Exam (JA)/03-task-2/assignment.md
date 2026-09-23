---
slug: task-2
id: crk5ip4r2kjh
type: challenge
title: 02-Application Ringfencing
difficulty: ""
timelimit: 0
enhanced_loading: null
---
`linux-vm` と `windows-vm` の両方に以下のlabelを追加してください:

- Type: `server`
- DFIR: `IR-CLEANBUBBLE`

これでworkloadは、Role、Application、Environment、Location、Type、
DFIRの6つすべてのlabelカテゴリで分類されているはずです。

`Task2-Ringfence` という名前のPolicyを作成して、`portal` アプリケー
ションをringfenceしてください。

以下の5つのlabelが一致するworkload同士が自由に通信できるよう、allow
ruleを作成してください:

- Application: `portal`
- Environment: `Production`
- Location: `ca`
- Type: `server`
- DFIR: `IR-CLEANBUBBLE`
