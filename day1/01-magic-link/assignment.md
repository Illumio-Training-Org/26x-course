---
slug: magic-link
id: n3ollcqorgq3
type: challenge
title: 01 - Magic Link
teaser: Access the Illumio Console
tabs:
- id: sunufnq2bb1t
  title: Illumio Platform Link
  type: service
  hostname: cloud-client
  path: /
  port: 80
- id: xvc6foissvoi
  title: cloud console
  type: terminal
  hostname: cloud-client
difficulty: ""
timelimit: 0
enhanced_loading: null
---
# 01 - Magic Link

Base lab test — verifying the magic link and PCE org creation work before
real Day 1 content is added.

🧩 Task 01 - Accessing the Illumio Platform
==========

**1 )** Open the following link in a new browser tab

```
[[ Instruqt-Var key="MAGICURL" hostname="cloud-client" ]]
```

Or click here: [Open the Illumio Console]([[ Instruqt-Var key="MAGICURL" hostname="cloud-client" ]])

**2 )** Once logged in, **exit Demo Mode**

**3 )** Verify the Illumio Console dashboard is visible

**4 )** Return to this lab window and press **NEXT**

---

Advanced
===

> [!WARNING]
> Advanced options below. Typically used in troubleshooting:

To show the Account Identities, run the following command:

```run
echo $AUTOACCOUNT_APIKEY_ID
echo $AUTOACCOUNT_APIKEY_SECRET
echo $AUTOACCOUNT_ORG_ID
echo $AUTOACCOUNT_PCE_FQDN
```

Simulated traffic is generated in the background for this org. To check
its progress, run the below in the **cloud console** tab:

```run
tail -f /var/log/vensim-startup.log
```

> [!NOTE]
> This shows the org setup and initial traffic post completing. Once it
> hands off into the recurring scheduler, that loop runs silently (same
> as upstream) — no further output here doesn't mean it's stopped.

---

**Lab Complete**
