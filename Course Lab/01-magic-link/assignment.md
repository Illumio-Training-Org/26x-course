---
slug: magic-link
id: n3ollcqorgq3
type: challenge
title: 01 - Magic Link
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

To check everything vensim created (excluding traffic itself) by
querying the PCE API directly, run the below in the **cloud console**
tab:

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

| Object | Endpoint | Example count (clean run) |
|---|---|---|
| Labels | `/labels` | ~103 (17 from vensim's own `labels.csv` + ~80-84 auto-created by `wkld-import` + 2 from the async quarantine bundle — may read a few short if checked very early, see note below) |
| | `curl -s -u "$AUTH" "$BASE/labels"` | |
| Label Dimensions | `/label_dimensions` | 15, plus Illumio's built-in `Quarantine` label type, which is **not** returned by this endpoint (it's a reserved system type, not a regular custom dimension) — so the Label Types page in the console will always show one more row than this count |
| | `curl -s -u "$AUTH" "$BASE/label_dimensions"` | |
| Pairing Profiles | `/pairing_profiles` | 2 (`Vensim-Created-Servers`/`Vensim-Created-Endpoints` — the org's pre-existing `Default (Servers)`/`Default (Endpoints)` are deleted first) |
| | `curl -s -u "$AUTH" "$BASE/pairing_profiles"` | |
| Workloads | `/workloads` | 206 |
| | `curl -s -u "$AUTH" "$BASE/workloads?max_results=1000"` | |
| Services | `/sec_policy/draft/services` | ~95 (92 from vensim's own `svcs.csv` + ~3 from the async quarantine bundle — the org's pre-existing default services are deleted first) |
| | `curl -s -u "$AUTH" "$BASE/sec_policy/draft/services"` | |
| IP Lists | `/sec_policy/draft/ip_lists` | 12 |
| | `curl -s -u "$AUTH" "$BASE/sec_policy/draft/ip_lists"` | |
| User Groups | `/security_principals` | 5 |
| | `curl -s -u "$AUTH" "$BASE/security_principals"` | |
| Rulesets | `/sec_policy/draft/rule_sets` | 16 (15 vensim-created + 1 pre-existing `Quarantine Policy: Strict` — may read 15 if checked very early, see note below) |
| | `curl -s -u "$AUTH" "$BASE/sec_policy/draft/rule_sets"` | |
| Rules | sum of `rules` (allow) + `deny_rules` per ruleset in that same response | 39 (36 from vensim, 3 from the pre-existing ruleset) |
| | *(same call as Rulesets above — summed client-side from that response)* | |

> [!NOTE]
> Some counts above can read slightly low if checked very early:
> Illumio's own trial signup backend seeds a `quarantine.illumio.com`
> label dimension (+ 2 labels + a `Quarantine Policy: Strict` ruleset
> with 3 rules) on every new org, but does so **asynchronously** —
> confirmed by re-running this same check against the same org a few
> minutes later and seeing the count increase (14→15 dimensions,
> 109→111 labels, 15→16 rulesets, 36→39 rules). Re-run the check after
> a few minutes if your numbers look a little short. This is unrelated
> to vensim; vensim's own contribution is always exactly the same
> regardless of timing.

Each call follows the same pattern:

```
https://$AUTOACCOUNT_PCE_FQDN/api/v2/orgs/$AUTOACCOUNT_ORG_ID/<endpoint>
```

- `$AUTOACCOUNT_PCE_FQDN` — the PCE FQDN and port together (e.g.
  `poc4.illum.io:443`)
- `/api/v2` — Illumio's REST API version prefix
- `/orgs/$AUTOACCOUNT_ORG_ID` — this org
- `/<endpoint>` — the object collection being queried (`/labels`,
  `/workloads`, `/sec_policy/draft/rule_sets`, etc.)

Authenticated via HTTP Basic Auth as `api_$AUTOACCOUNT_APIKEY_ID` /
`$AUTOACCOUNT_APIKEY_SECRET` — the same credential pair the org's own
`pce-add`/`workloader`/`vensim` calls use internally.

Fully resolved, this is what the Labels call from the table above looks
like in practice (values below are illustrative, not a real credential —
yours will be different every session):

```
curl -s -u "api_a1b2c3d4e5f6g7h8i:9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e" "https://pce.example.illum.io:443/api/v2/orgs/1234567/labels"
```

- `pce.example.illum.io:443` → `$AUTOACCOUNT_PCE_FQDN`
- `1234567` → `$AUTOACCOUNT_ORG_ID`
- `api_a1b2c3d4e5f6g7h8i` → `api_$AUTOACCOUNT_APIKEY_ID`
- `9f8e7d6c...` → `$AUTOACCOUNT_APIKEY_SECRET`

---

**Lab Complete**
