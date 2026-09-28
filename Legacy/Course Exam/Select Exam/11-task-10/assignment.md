---
slug: task-10
id: q2rvsxsbptdh
type: challenge
title: 10-Cloud Application Onboarding
tabs:
- id: igddls8f04nu
  title: AWS
  type: service
  hostname: cloud-client
  port: 80
difficulty: ""
timelimit: 0
enhanced_loading: null
---
The AWS account in region `us-east-1` has already been onboarded to
Illumio Cloud.

Create an **Application Discovery Rule** that identifies and onboards
the application running within the AWS account.

Configure the rule to:

- Use **Cloud Tags**
- Match the tag key: `app`
- Enable **Auto Approve**

Verify that the discovered application is successfully onboarded.
