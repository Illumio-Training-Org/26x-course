---
slug: magic-link
id: tbatszq1ole6
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
        <h1>26.x AWS Automated Onboard Testing</h1>
        <p>Internal prototype lab, not learner-facing:</p>
        <ul>
          <li>No vensim, no VMs - just magic link + AWS Terraform build</li>
          <li>Testing whether AWS onboarding can run automatically at boot</li>
          <li>Goal: hide the 20-30min propagation delay before an exam needs it</li>
        </ul>
        <div class="splash-contact">
          Illumio Training<br>
          training@illumio.com
        </div>
      </div>
    </div>
tabs:
- id: wxd2rqhslxy5
  title: Illumio Platform Link
  type: service
  hostname: cloud-client
  path: /
  port: 80
- id: 7yqrzbly4nfi
  title: cloud console
  type: terminal
  hostname: cloud-client
difficulty: ""
timelimit: 0
enhanced_loading: null
---
Open the following link in a new browser tab

```
[[ Instruqt-Var key="MAGICURL" hostname="cloud-client" ]]
```

Or click here: [Open the Illumio Console]([[ Instruqt-Var key="MAGICURL" hostname="cloud-client" ]])

Verify the Illumio Console dashboard is visible, then press **NEXT**.

The AWS Terraform build is running in the background (`tail -f
/var/log/aws-onboard-startup.log` in the cloud console tab to watch
it) - no vensim, no VMs, just the AWS account build and (once built)
an automated onboarding attempt.

To grab the sandbox's credentials, run this in the cloud console tab:

```
echo $AUTOACCOUNT_PCE_FQDN
echo $AUTOACCOUNT_ORG_ID
echo $AUTOACCOUNT_APIKEY_ID
echo $AUTOACCOUNT_APIKEY_SECRET
echo $AUTOACCOUNT_TENANT_ID
echo $AUTOACCOUNT_SAAPIKEY_KEYID
echo $AUTOACCOUNT_SAAPIKEY_SECRET
```

To watch the background build/onboarding progress live:

```
tail -f /var/log/aws-onboard-startup.log
```
