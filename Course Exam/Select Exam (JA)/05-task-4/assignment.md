---
slug: task-4
id: xq2qchknsq89
type: challenge
title: 04-Compromised Workload Isolation
difficulty: ""
timelimit: 0
enhanced_loading: null
---
WebのworkloadがCompromiseされたと想定してください。

`linux-vm` のDFIR labelを以下のように変更して、侵害されたものとして
マークしてください:

`IR-CLEANBUBBLE` → `IR-DIRTYBUBBLE`

workloadに `IR-CLEANBUBBLE` labelが残っていないことを確認してください。
