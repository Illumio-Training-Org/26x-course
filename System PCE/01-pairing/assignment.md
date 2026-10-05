---
slug: pairing
id: r6axx9o88hto
type: challenge
title: Pair a Workload
teaser: Generate a pairing key from a Pairing Profile and pair a workload in an offline
  simulation of the Illumio Console
notes:
- type: text
  contents: |-
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet">
    <style>
      .splash-wrap { font-family: 'Montserrat', sans-serif; color: #d4d4d4; background: #141720; padding: 3% 4% 4% 4%; box-sizing: border-box; width: min(90vw, 1300px); position: relative; left: 50%; transform: translateX(-50%); }
      .splash-logo { width: 444px; max-width: 70%; height: auto; display: block; margin: 0 0 2.2em; }
      .splash-wrap h1 { font-family: 'Montserrat', sans-serif; font-size: 1.6em; font-weight: 700; line-height: 1.25; margin: 0 0 0.8em; white-space: nowrap; }
      .splash-wrap p { margin: 0 0 0.4em; font-size: 1em; }
      .splash-wrap ul { margin: 0 0 1.2em; padding: 0; list-style: none; }
      .splash-wrap li { margin: 0 0 0.35em; font-size: 0.8em; white-space: nowrap; }
      .splash-wrap li::before { content: "- "; }
      .splash-contact { margin: 0 0 1.4em; font-size: 1em; line-height: 1.5; }
      .splash-cta { font-size: 1em; font-weight: 700; }
    </style>
    <div class="splash-wrap">
      <img class="splash-logo" src="../assets/illumio-logo-splash.png" alt="Illumio" />
      <h1>Welcome to your Illumio Training Lab</h1>
      <p>This is your opportunity to:</p>
      <ul>
        <li>Learn how Zero Trust Segmentation protects against breaches</li>
        <li>Discover how Illumio seamlessly integrates with Cloud Providers</li>
        <li>Gain actionable strategies to enhance your security posture</li>
        <li>Connect with industry experts and peers in your field</li>
      </ul>
      <div class="splash-contact">
        Illumio Training<br>
        training@illumio.com
      </div>
      <div class="splash-cta">Click &rsaquo; for a short video on using Instruqt</div>
    </div>
- type: video
  url: https://www.youtube.com/embed/_QALLe3DJpk
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

The tab on the left is an **offline simulation** of the Illumio Console with
a simulated Linux workload. Keys are fake, nothing is installed, and the page
never connects to a real PCE.

1. Go to **Servers & Endpoints → Pairing Profiles**.
2. Open **Default (Servers)**, or select **Add** to create your own profile.
3. Select **Generate Key**.
4. Under **Linux OS Pairing Script**, select the **Copy** icon.
   If copying is blocked, the script is selected for you: press
   **Ctrl+C** (Windows) or **⌘C** (Mac).
5. Select **Workload terminal** in the strip at the bottom of the page and
   make sure **linux-ven-01** is selected.
6. Click in the terminal, paste the script (**Ctrl+V** or **⌘V**) and press
   **Enter**. Watch the VEN install and pair. Installing the packages takes
   a little while, just as it does on a real workload.
7. When you see `VEN has been SUCCESSFULLY paired with Illumio`, run:
   ```
   /opt/illumio_ven/illumio-ven-ctl status
   ```
8. Go to **Servers & Endpoints → Workloads** and open **linux-ven-01**.
   Check that it has the settings from the pairing profile you used.

> [!NOTE]
> **Reset lab** (bottom strip) restores the sample profiles, removes the
> simulated workloads and clears the terminal. Reloading the tab also resets it.

When you have finished, click **Check** to complete the lab.
