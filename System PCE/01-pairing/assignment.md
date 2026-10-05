---
slug: pairing
id: r6axx9o88hto
type: challenge
title: Pair a Workload
teaser: Generate a pairing key from a Pairing Profile and pair a workload in an offline
  simulation of the Illumio Console
tabs:
- id: u0xwe0pmmfs6
  title: Illumio Console (simulated)
  type: service
  hostname: cloud-client
  path: /
  port: 80
difficulty: ""
timelimit: 0
enhanced_loading: null
---
📝 Task
==========

The tab on the left is an **offline simulation** of the Illumio Console.
Every key is fake. Nothing is installed, and no real workload is paired.

1. Go to **Servers & Endpoints → Pairing Profiles**.
2. Open **Default (Servers)**, or select **Add** to create your own profile.
3. Select **Generate Key**. The Pairing Key page shows the selected profile's
   initial workload settings and a clearly fake key. Generating the key does
   not pair a workload.
4. Copy the inert **AIX**, **Linux** or **Windows** sample script.
   If copying is blocked, the full sample is selected for you: press
   **Ctrl+C** (Windows) or **⌘C** (Mac).
5. Select **Training workstation** in the strip at the bottom of the page.
6. Paste the complete sample, choose the matching simulated workload, and
   select **Simulate execution**.
7. Open **Workloads** and inspect the result.

> [!NOTE]
> **Reset lab** (bottom strip) restores the four sample profiles and removes
> all simulated workloads. Reloading the tab also resets it.

When you have finished, click **Check** to complete the lab.
