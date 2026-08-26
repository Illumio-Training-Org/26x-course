---
slug: full-build
id: 8qlowwiyze9w
type: challenge
title: Workloads, Cloud, Containers
teaser: Pair workloads, onboard AWS, and connect a container cluster to Illumio
tabs:
- id: yx05d9vozqcg
  title: Linux
  type: terminal
  hostname: linux-vm
  cmd: bash
- id: b2rkcee3crkf
  title: Windows
  type: terminal
  hostname: windows-vm
- id: fe2jxyzgosy2
  title: CloudCLI
  type: terminal
  hostname: cloud-client
  cmd: bash
- id: d9ej759n7914
  title: AWS
  type: service
  hostname: cloud-client
  port: 80
- id: evarmjetmnns
  title: k3s
  type: terminal
  hostname: host
  cmd: bash
difficulty: ""
timelimit: 0
enhanced_loading: null
---
# Workloads, Cloud, Containers

🧩 Workloads
==========

Onboard the Linux and Windows VM.

**1) Create a Pairing Profile**

**Servers and Endpoints → Pairing Profiles → Add**:

- Name: `PP-VEN-LAX`
- Enforcement: Idle
- Node Type: Server VEN
- Initial VEN Version: Current Default
- Labels: `pos`, `Production`, `lax` (leave **Role** blank — set via CLI override in step 3)
- Uses Per Key: Unlimited Uses
- Key Lifespan: 6 Hours
- Command Line Overrides: Enforcement **Unlocked**, **Role Label can be set**

**Save → Generate Key**

---

**2) Pair the Windows Workload**

Copy the Windows Pairing Script from the profile. Run it in the **Windows** tab. Verify the VEN pairs in Idle mode with the profile labels applied.

---

**3) Pair the Linux Workload with a Custom Label**

Copy the Linux Pairing Script. Paste it into the **Linux** tab — don't press Enter yet. Append:

```
--role web --mode selective
```

Then run it. Verify the VEN pairs with the **web** role in **Selective** mode.

---

**4) Verify Connectivity**

**Servers and Endpoints → Workloads**. Filter Name contains `vm`. Click each workload and review its Summary, Processes, Rules, Denied Traffic, and Ransomware Protection tabs.

---

**5) Explore VEN Command Line**

In the **Linux** tab:

```run
cd /opt/illumio_ven/
```
```run
./illumio-ven-ctl -help
```

Try a few of the commands shown, e.g. `version`, `status`, `check-env`, `connectivity-test -test-all-ips -v`, or `stop`/`start`.

---

**6) Change Enforcement**

**Servers and Endpoints → Workloads**, select **linux-vm**, click **Enforcement → Enforced**. Return to the **Linux** tab and try interacting with it — access is blocked (no matching rule, expected). Change enforcement back to **Selective**, wait a few minutes, then confirm access is restored.

---

**Check your work** (run in the **CloudCLI** tab):

```run
BASE="https://$AUTOACCOUNT_PCE_FQDN/api/v2/orgs/$AUTOACCOUNT_ORG_ID"
AUTH="api_${AUTOACCOUNT_APIKEY_ID}:${AUTOACCOUNT_APIKEY_SECRET}"
curl -s -u "$AUTH" "$BASE/workloads?max_results=1000" | python3 -c "
import json, sys
workloads = {w.get('hostname'): w for w in json.load(sys.stdin)}
base = {'app': 'pos', 'env': 'Production', 'loc': 'lax'}
fails = []
for host in ('linux-vm', 'windows-vm'):
    w = workloads.get(host)
    if not w:
        fails.append(host + ' not paired')
        continue
    labels = {l['key']: l['value'] for l in w.get('labels', [])}
    for k, v in base.items():
        if labels.get(k) != v:
            fails.append(host + ' label ' + k + ' should be ' + v + ', found ' + str(labels.get(k)))
    if host == 'linux-vm':
        if labels.get('role') != 'web':
            fails.append('linux-vm role label should be web, found ' + str(labels.get('role')))
        if w.get('enforcement_mode') != 'selective':
            fails.append('linux-vm enforcement_mode should be selective, found ' + str(w.get('enforcement_mode')))
if fails:
    print('FAIL')
    for f in fails:
        print(' - ' + f)
else:
    print('PASS - both VMs paired, labels correct, linux-vm role=web in Selective mode')
"
```

🧩 Cloud
==========

Onboard the AWS account to Illumio and map cloud tags to labels.

**1) Login to AWS**

Login using the credentials in the **AWS** tab.

> [!IMPORTANT]
> You **must** switch the region to **N. Virginia (us-east-1)** before continuing — you will not see the right resources in any other region.

Search **EC2** and verify running instances are present.

---

**2) Onboard AWS**

In the Illumio Console: **Cloud → Onboarding → Add AWS → Select Account**. Configure:

- Name: `AWSOnboarding`
- Account ID: from the top right of the AWS Console (12 characters)

Ensure **Read Write Access** is **YES → Continue**. Under Service Account, **Add a New Service Account** named `OnboardingAccount` → **Create**. Download the credentials, **Close**.

> [!IMPORTANT]
> Do NOT press Continue until the next step is completed.

Type of Integration: **Create IAM Roles on AWS**.

- The AWS Console opens at Create Stack (region **us-east-1**)
- Scroll to **IllumioServiceAccountSecret**, paste the `ServiceAccountToken` from the downloaded credentials
- Agree to the terms → **Create Stack**
- Wait for **Illumio Integration – CREATE COMPLETE** (refresh if needed)
- Back in the Illumio Console: **Continue → Confirm and Finish**
- Verify the account appears

---

> [!IMPORTANT]
> Onboarding may take **10–15 minutes** to complete before continuing with the rest of the instructions.

---

**3) Security Review**

**Cloud → Security Review → Review**. Select the account → **Approve Security Review → Approve**. Back at **Cloud → Onboarding**, enforcement now shows **Yes** (refresh if needed).

---

**4) Tag to Label Mapping**

**Label Management → Labelling Method → Tag to Label Mapping → Add Mapping**. Ensure **AWS** is selected, filter by the AWS account.

- Cloud Tag Key **Role** → Add to selection → Maps to Illumio Label Type **Role** → **Confirm & Add**
- Cloud Tag Key **location** → Add to selection → Maps to Illumio Label Type **Location** → **Confirm & Add**

---

**5) Application Mapping**

**Cloud → Application Discovery → Application Definitions → Discovery Rules → Add**:

- Rule Name: `AppDiscovery`
- Rule Type: Cloud Tags
- Cloud Tag Keys: `app`

Auto-Approve **ON → Save → Confirm and Save**.

---

**6) Deployment Definitions**

**Cloud → Application Discovery → Deployments → Add First Deployment**.

In the AWS Console, search **Subnets** and note the Subnet IDs for the Production and Development subnets.

Production:
- Environment: `Production`
- **Add → Add Regions** → `us-east-1` → Add
- **Add → Add Virtual Networks** → select the VPC → Add
- **Add → Add Subnets** → select the Production subnet → Add
- **Save**

Development:
- Environment: `Development`
- **Add → Add Regions** → `us-east-1` → Add
- **Add → Add Virtual Networks** → select the VPC → Add
- **Add → Add Subnets** → select the Development subnet → Add
- **Save**

> [!IMPORTANT]
> Ensure both deployments — Production and Development — are added before continuing.

🧩 Containers
==========

Onboard the Kubernetes Node.

**1) Select the k3s node, check it is ready for onboarding**

```run
kubectl get nodes
kubectl get pods -A -o wide
```

The node should show **Ready**, and all pods should show **1/1** and **Running**.

---

**2) Set Firewall Coexistence**

Cilium needs to be configured to coexist with Illumio's iptables rules.

```run
cilium upgrade --version 1.18.6 --set='extraArgs={--prepend-iptables-chains=false}'
```
```run
kubectl -n kube-system rollout restart ds/cilium
```

Re-check the FORWARD chain:

```run
sudo iptables -S FORWARD | head
```

> [!NOTE]
> May take a few seconds — re-run if `CILIUM_FORWARD` isn't at the bottom yet.

---

**3) Create the Cluster Object**

**Settings → Infrastructure → Container Clusters → +Add**. Name: `K3S-LAB`. **Save**. Copy the Cluster ID and Cluster Token.

---

**4) Create the Pairing Profile**

**Servers & Endpoints → Pairing Profiles → +Add**:

- Name: `kubernetes`
- Enforcement: Visibility Only
- Visibility: Denied + Allowed
- Enforcement Node Type: Server VEN
- Initial VEN Version: Current Default
- Labels — Location: `ca`, Environment: `Production`, Application: `kubernetes`

**Save → Generate Key**, save the value.

---

**5) Create the Illumio-values File**

Set your real values as variables (no YAML syntax to get wrong):

Your PCE URL:

```run
PCE_URL="poc4.illum.io:443"
```

Your Cluster ID from step 3:

```
CLUSTER_ID="paste-cluster-id-here"
```

Your Cluster Token from step 3:

```
CLUSTER_TOKEN="paste-cluster-token-here"
```

Your Pairing Profile key from step 4:

```
CLUSTER_CODE="paste-pairing-key-here"
```

Then generate the file:

```run
cat > illumio-values.yaml <<EOF
pce_url: $PCE_URL
cluster_id: $CLUSTER_ID
cluster_token: $CLUSTER_TOKEN
cluster_code: $CLUSTER_CODE
containerRuntime: k3s_containerd
containerManager: kubernetes
clusterMode: clas
EOF
```

**Verify:**

```run
cat illumio-values.yaml
```

---

**6) Deploy with Helm**

```run
helm install illumio -f illumio-values.yaml oci://quay.io/illumio/illumio --namespace illumio-system --create-namespace --version 5.6.1
```
```run
kubectl get pods -A -o wide
```

Verify in the Illumio Console at **Infrastructure → Container Clusters** — cluster shows **"in sync"**.

---

🧩 Close Lab
==========

> [!WARNING]
> **DO NOT CLICK NEXT UNLESS YOU WANT TO CLOSE THE LAB**

Clicking **NEXT** below will permanently end this session — the PCE org, AWS account, VMs, and k3s cluster will all be destroyed. There is no way to resume once this happens.

Only click **NEXT** if you are completely finished with the lab.

---

**Lab Complete – This is the end of the lab and pressing NEXT will end the session**
