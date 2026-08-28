---
slug: magic-link
id: uod15nfxodo0
type: challenge
title: Illumio-Console
teaser: Access the Illumio Console
notes:
- type: text
  contents: |-
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet">
    <style>
      .splash-wrap { position: relative; font-family: 'Montserrat', sans-serif; }
      .splash-img { width: 100%; display: block; }
      .splash-overlay { position: absolute; top: 0; left: 0; width: 66%; height: 100%; box-sizing: border-box; padding: 18% 4% 4% 7.2%; color: #fff; display: flex; flex-direction: column; justify-content: flex-start; }
      .splash-overlay h1 { font-size: 1.25em; font-weight: 700; line-height: 1.25; margin: 0 0 0.5em; white-space: nowrap; }
      .splash-overlay p { margin: 0 0 0.3em; font-size: 0.78em; }
      .splash-overlay ul { margin: 0 0 0.6em; padding: 0; list-style: none; }
      .splash-overlay li { margin: 0 0 0.25em; font-size: 0.78em; white-space: nowrap; }
      .splash-overlay li::before { content: "- "; }
      .splash-contact { margin-top: 0.5em; font-size: 0.78em; }
      .splash-cta { margin-top: 1em; font-size: 0.78em; font-weight: 700; text-shadow: 0 2px 8px rgba(0,0,0,.5); }
    </style>
    <div class="splash-wrap">
      <img class="splash-img" src="../assets/splashscreenblank.png" alt="Illumio training splash background" />
      <div class="splash-overlay">
        <h1>Welcome to your 26.x Specialist Exam</h1>
        <p>This is your opportunity to:</p>
        <ul>
          <li>Demonstrate your Zero Trust Segmentation skills</li>
          <li>Complete 5 hands-on tasks, each automatically graded</li>
          <li>Work independently — no step-by-step instructions</li>
        </ul>
        <div class="splash-contact">
          Illumio Training<br>
          training@illumio.com
        </div>
        <div class="splash-cta">Click the &rsaquo; on the right hand side of the screen for an intro video on how to use Instruqt</div>
      </div>
    </div>
- type: video
  url: https://www.youtube.com/embed/_QALLe3DJpk
tabs:
- id: laqn8xnq4fe8
  title: Illumio Platform Link
  type: service
  hostname: cloud-client
  path: /
  port: 80
- id: nyuyudma8ljq
  title: cloud console
  type: terminal
  hostname: cloud-client
difficulty: ""
timelimit: 0
enhanced_loading: null
---
# Illumio-Console

**1 )** Open the following link in a new browser tab

```
[[ Instruqt-Var key="MAGICURL" hostname="cloud-client" ]]
```

Or click here: [Open the Illumio Console]([[ Instruqt-Var key="MAGICURL" hostname="cloud-client" ]])

**2 )** Once logged in, **exit Demo Mode**

**3 )** Verify the Illumio Console dashboard is visible

**4 )** Return to this lab window and press **NEXT**
