---
slug: task-10
id: d1cjvrwpvp90
type: challenge
title: 10-Cloud Application Onboarding
tabs:
- id: yuxjc6p0kj9k
  title: AWS
  type: service
  hostname: cloud-client
  port: 80
difficulty: ""
timelimit: 0
enhanced_loading: null
---
📝 Task
==========

The AWS account in region `us-east-1` has already been onboarded to
Illumio Cloud.

Create an **Application Discovery Rule** that identifies and onboards
the application running within the AWS account.

Configure the rule to:

- Use **Cloud Tags**
- Match the tag key: `app`
- Enable **Auto Approve**

Verify that the discovered application is successfully onboarded.

🔑 Logged out of the Console?
==========

Only needed if the Illumio Console has logged you out (it does after 10-15 minutes of inactivity). If you're still logged in, ignore this and carry on in your open Console tab.

**[Click here to log back in]([[ Instruqt-Var key="MAGICURL" hostname="cloud-client" ]])** - your work is kept.

If the link doesn't open, copy this into a new browser tab:

```
[[ Instruqt-Var key="MAGICURL" hostname="cloud-client" ]]
```
