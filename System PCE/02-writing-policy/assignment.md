---
slug: writing-policy
id: wupnr1l0ut9s
type: challenge
title: Writing Policy
teaser: Create a policy that blocks Development to Production on All Services
tabs:
- id: yjzx84tjkigi
  title: Illumio Console
  type: service
  hostname: cloud-client
  path: /
  port: 8080
difficulty: ""
timelimit: 0
enhanced_loading: null
---
📝 Writing Policy
==========

Create a policy that blocks all traffic from the **Development**
environment to the **Production** environment.

1. In the **Illumio Console** tab, go to **Segmentation → All Policies**.
2. Select **Add → Add from Scratch**.
3. In **Name**, enter `Block Development to Production`. Leave
   **Description** and **Scope** empty, then select **Save**.
4. Select **Add Rule**, choose **Deny Rule**, then select **Add Rule**.
5. In **Sources**, type `Development` and select the **Development**
   (Environment) label.
6. In **Destinations**, type `Production` and select the **Production**
   (Environment) label.
7. In **Destination Services**, select **All Services**.
8. Select the **save** icon at the end of the rule row.
9. Go back to **Segmentation → All Policies**. The policy is listed as
   **Pending** and **Enabled**.

When you have finished, click **Check**.
