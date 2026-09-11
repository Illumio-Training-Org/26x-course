---
slug: magic-link
id: debzljxkixd0
type: challenge
title: 26.x Select Exam
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
        <h1>Welcome to your 26.x Select Exam</h1>
        <p>This is your opportunity to:</p>
        <ul>
          <li>Demonstrate your Zero Trust Segmentation skills</li>
          <li>Complete 10 hands-on tasks, each automatically graded</li>
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
- id: g5ngsz1ewbwi
  title: Illumio Platform Link
  type: service
  hostname: cloud-client
  path: /
  port: 80
- id: 7yboxtr7pqda
  title: cloud console
  type: terminal
  hostname: cloud-client
difficulty: ""
timelimit: 0
enhanced_loading: null
---
Welcome to your **26.x Select Exam**.

> [!IMPORTANT]
> This exam is **150 minutes (2 hours 30)**.

**Please note: There is no requirement to provision any of the rules or objects in this exam.**

**All pre-existing default policies in this org are automatically disabled before you start** - only policies you create as part of the exam's tasks are active. You don't need to do anything about them.

**1 )** Open the following link in a new browser tab

```
[[ Instruqt-Var key="MAGICURL" hostname="cloud-client" ]]
```

Or click here: [Open the Illumio Console]([[ Instruqt-Var key="MAGICURL" hostname="cloud-client" ]])

**2 )** Verify the Illumio Console dashboard is visible

**3 )** Once you're logged into the Console, return to this lab window and press **NEXT** to begin. Good luck!

---

Advanced
===

> [!WARNING]
> Advanced options below. Typically used in troubleshooting:

To show the PCE and Cloud API credentials for this account, run the
following in the **cloud console** tab:

```run
echo "PCE_FQDN=$AUTOACCOUNT_PCE_FQDN"
echo "ORG_ID=$AUTOACCOUNT_ORG_ID"
echo "APIKEY_ID=$AUTOACCOUNT_APIKEY_ID"
echo "APIKEY_SECRET=$AUTOACCOUNT_APIKEY_SECRET"
echo "SAKEYID=$AUTOACCOUNT_SAAPIKEY_KEYID"
echo "SASECRET=$AUTOACCOUNT_SAAPIKEY_SECRET"
echo "TENANT=$AUTOACCOUNT_TENANT_ID"
```

To check the PCE REST API is up (HTTP 200 = healthy):

```run
curl -s -o /dev/null -w "PCE API: HTTP %{http_code}\n" -u "api_${AUTOACCOUNT_APIKEY_ID}:${AUTOACCOUNT_APIKEY_SECRET}" "https://${AUTOACCOUNT_PCE_FQDN}/api/v2/orgs/${AUTOACCOUNT_ORG_ID}/workloads?max_results=1"
```

To check the CloudSecure API is up (HTTP 200 = healthy):

```run
curl -s -o /dev/null -w "Cloud API: HTTP %{http_code}\n" -u "${AUTOACCOUNT_SAAPIKEY_KEYID}:${AUTOACCOUNT_SAAPIKEY_SECRET}" -H "X-Tenant-Id: ${AUTOACCOUNT_TENANT_ID}" "https://cloud.illum.io/api/v1/integrations"
```
