---
slug: task-10
id: 8llhpepumew3
type: challenge
title: 10-Onboard a Cloud Application
tabs:
- id: z2l9lzhogvnt
  title: AWS
  type: service
  hostname: cloud-client
  port: 80
difficulty: ""
timelimit: 0
enhanced_loading: null
---
AWSアカウントは、バックグラウンドで既に自動的にIllumio Cloudにオンボード
されています(region **us-east-1**)。

Cloud Tagsを使用し、`app` タグキーに一致し、Auto Approveを有効にした
Application Discovery Ruleを作成して、そのアカウントで実行されている
アプリケーションをオンボードしてください。
