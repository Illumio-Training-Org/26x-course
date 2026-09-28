---
slug: magic-link
id: 7dxz3jmga0fi
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
        <h1>Welcome to your Instructor Led Training from Illumio</h1>
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
        <div class="splash-cta">Click the &rsaquo; on the right hand side of the screen for an intro video on how to use Instruqt</div>
      </div>
    </div>
- type: video
  url: https://www.youtube.com/embed/_QALLe3DJpk
tabs:
- id: xxfcxobyengn
  title: Illumio Platform Link
  type: service
  hostname: cloud-client
  path: /
  port: 80
- id: tysvperit89p
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

**2 )** Verify the Illumio Console dashboard is visible

**3 )** Return to this lab window and press **NEXT**

---

Advanced
===

> [!WARNING]
> These commands are only for use in troubleshooting, if required by the instructor.

To show the Account Identities:

```run
echo $AUTOACCOUNT_APIKEY_ID
echo $AUTOACCOUNT_APIKEY_SECRET
echo $AUTOACCOUNT_ORG_ID
echo $AUTOACCOUNT_PCE_FQDN
```

To test the Console API:

```run
BASE="https://$AUTOACCOUNT_PCE_FQDN/api/v2/orgs/$AUTOACCOUNT_ORG_ID"
AUTH="api_${AUTOACCOUNT_APIKEY_ID}:${AUTOACCOUNT_APIKEY_SECRET}"
curl -s -o /dev/null -w "%{http_code}\n" -u "$AUTH" "$BASE/workloads?max_results=1"
```

To test the deployment process:

```run
BASE="https://$AUTOACCOUNT_PCE_FQDN/api/v2/orgs/$AUTOACCOUNT_ORG_ID"
AUTH="api_${AUTOACCOUNT_APIKEY_ID}:${AUTOACCOUNT_APIKEY_SECRET}"

count() { curl -s -u "$AUTH" "$BASE$1" | python3 -c "import json,sys; print(len(json.load(sys.stdin)))"; }

echo "Labels:            $(count /labels)"
echo "Label Dimensions:  $(count /label_dimensions)"
echo "Pairing Profiles:  $(count /pairing_profiles)"
echo "Workloads:         $(count /workloads?max_results=1000)"
echo "Services:          $(count /sec_policy/draft/services)"
echo "IP Lists:          $(count /sec_policy/draft/ip_lists)"
echo "User Groups:       $(count /security_principals)"

curl -s -u "$AUTH" "$BASE/sec_policy/draft/rule_sets" | python3 -c "
import json, sys
d = json.load(sys.stdin)
rules = sum(len(r.get('rules', [])) + len(r.get('deny_rules', [])) for r in d)
print(f'Rulesets:          {len(d)}')
print(f'Rules:             {rules}')
"
```

---

**Lab Complete**
