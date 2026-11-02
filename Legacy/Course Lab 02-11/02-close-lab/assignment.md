---
slug: close-lab
id: yvb15dkb3ncw
type: challenge
title: Close Lab
teaser: Read this before ending your session
tabs:
- id: vhn6ehtikomm
  title: Linux
  type: terminal
  hostname: linux-vm
  cmd: bash
- id: hcx5lv3hkhuq
  title: Windows
  type: terminal
  hostname: windows-vm
- id: ls4eghumcb6b
  title: CloudCLI
  type: terminal
  hostname: cloud-client
  cmd: bash
- id: am6yyb9ymxcr
  title: AWS
  type: service
  hostname: cloud-client
  port: 80
- id: tvig8s3gnwzn
  title: k3s
  type: terminal
  hostname: host
  cmd: bash
difficulty: ""
timelimit: 0
enhanced_loading: null
---
> [!WARNING]
> **ONLY CONTINUE IF YOU WANT TO CLOSE THE LAB**

If you got here by mistake, go back — click **Overview** at the top of the screen, then re-open **Illumio Lab Environment** and make sure you've completed all three sections (Workloads, Cloud, Containers).

Closing the lab will permanently end this session — the PCE org, AWS account, VMs, and k3s cluster will all be destroyed. There is no way to resume once this happens.

---

**To close the lab** (only when you are completely finished, and have told your instructor):

1. In the **CloudCLI** tab, run:

```run
close-lab
```

2. Type **YES** to confirm.
3. Click **Check** at the bottom of this page.

If you click **Check** without doing steps 1 and 2, you will just see a reminder message and your lab keeps running.
