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
| Labels | `/labels` | 111 |
| Label Dimensions | `/label_dimensions` | 15 |
| Pairing Profiles | `/pairing_profiles` | 4 (2 pre-existing `Default (Servers)`/`Default (Endpoints)` + 2 `Vensim-Created-*`) |
| Workloads | `/workloads` | 206 |
| Services | `/sec_policy/draft/services` | 182 |
| IP Lists | `/sec_policy/draft/ip_lists` | 12 |
| User Groups | `/security_principals` | 5 |
| Rulesets | `/sec_policy/draft/rule_sets` | 16 (15 vensim-created + 1 pre-existing `Quarantine Policy: Strict`) |
| Rules | sum of `rules` (allow) + `deny_rules` per ruleset in that same response | 39 (36 from vensim, 3 from the pre-existing ruleset) |

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

---

**Lab Complete**
