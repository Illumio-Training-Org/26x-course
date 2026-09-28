---
slug: task-10
id: cqgkw9g07puw
type: challenge
title: 10-Cloud Application Onboarding
tabs:
- id: xfxtktkye0eu
  title: AWS
  type: service
  hostname: cloud-client
  port: 80
difficulty: ""
timelimit: 0
enhanced_loading: null
---
region `us-east-1` のAWSアカウントは、既にIllumio Cloudにオンボード
されています。

AWSアカウント内で実行されているアプリケーションを特定してオンボード
する **Application Discovery Rule** を作成してください。

以下のようにruleを設定してください:

- **Cloud Tags** を使用する
- タグキー `app` に一致させる
- **Auto Approve** を有効にする

検出されたアプリケーションが正常にオンボードされたことを確認して
ください。
