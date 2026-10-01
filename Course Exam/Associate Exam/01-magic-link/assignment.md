---
slug: magic-link
id: fjytzixb6bks
type: challenge
title: 26.x Associate Exam
teaser: Access the Illumio Console
notes:
- type: text
  contents: |-
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet">
    <style>
      .splash-wrap { font-family: 'Montserrat', sans-serif; color: #fff; background: #141720; padding: 3% 4% 4% 4%; }
      .splash-logo { width: 444px; max-width: 70%; height: auto; display: block; margin: 0 0 2.2em; }
      .splash-wrap h1 { font-size: 1.6em; font-weight: 700; line-height: 1.25; margin: 0 0 0.8em; }
      .splash-wrap p { margin: 0 0 0.4em; font-size: 1em; }
      .splash-wrap ul { margin: 0 0 1.2em; padding: 0; list-style: none; }
      .splash-wrap li { margin: 0 0 0.35em; font-size: 1em; }
      .splash-wrap li::before { content: "- "; }
      .splash-contact { margin: 0 0 1.4em; font-size: 1em; line-height: 1.5; }
      .splash-cta { font-size: 1em; font-weight: 700; }
      .splash-time { font-size: 1.1em; font-weight: 700; margin: -0.4em 0 1.2em; }
    </style>
    <div class="splash-wrap">
      <img class="splash-logo" src="../assets/illumio-logo-splash.png" alt="Illumio" />
      <h1>Welcome to your Associate Exam</h1>
      <div class="splash-time">Time allowed: 45 minutes</div>
      <p>This is your opportunity to:</p>
      <ul>
        <li>Demonstrate your Zero Trust Segmentation skills</li>
        <li>Each task provides a challenge to complete</li>
        <li>Complete 5 hands-on tasks, each automatically graded</li>
      </ul>
      <div class="splash-contact">
        Illumio Training<br>
        training@illumio.com
      </div>
      <div class="splash-cta">Click the &rsaquo; on the right hand side of the screen for an intro video on how to use Instruqt</div>
    </div>
- type: video
  url: https://www.youtube.com/embed/_QALLe3DJpk
tabs:
- id: temmkepyalgf
  title: Illumio Platform Link
  type: service
  hostname: cloud-client
  path: /
  port: 80
- id: mirrwlm8zbk4
  title: cloud console
  type: terminal
  hostname: cloud-client
difficulty: ""
timelimit: 0
enhanced_loading: null
---
![Illumio](../assets/illumio-logo-banner.png)

> [!IMPORTANT]
> You have a maximum of **45 minutes** to complete the exam.

**Please note:**
- **The first task (pairing the workloads) must be completed and cannot be skipped.**
- Any other task can be skipped, but skipping counts against your score. To pass, you need a score of at least **80%** (4 out of 5 correct answers).
- There is no requirement to provision any of the rules or objects in this exam.
- All pre-existing default policies in this org are automatically disabled before you start - only policies you create as part of the exam's tasks are active. You don't need to do anything about them.
- Please ensure that the name of any Policies that you create are correct and there are no additional spaces in their names.

**1 )** Open the following link in a new browser tab

```
[[ Instruqt-Var key="MAGICURL" hostname="cloud-client" ]]
```

Or click here: [Open the Illumio Console]([[ Instruqt-Var key="MAGICURL" hostname="cloud-client" ]])

**2 )** Verify the Illumio Console dashboard is visible

**3 )** Once you're logged into the Console, return to this lab window and press **NEXT** to begin. Good luck!
