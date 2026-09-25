---
slug: full-build
id: ybvfe7dolmyb
type: challenge
title: Onboarding Workloads-Cloud-Containers
teaser: Pair workloads, onboard AWS, and connect a container cluster to Illumio
tabs:
- id: dvuzavixfloo
  title: Linux
  type: terminal
  hostname: linux-vm
  cmd: bash
- id: u2uta2hedfqq
  title: Windows
  type: terminal
  hostname: windows-vm
- id: cgnqs7wh9bah
  title: CloudCLI
  type: terminal
  hostname: cloud-client
  cmd: bash
- id: nkbcixapyjkf
  title: AWS
  type: service
  hostname: cloud-client
  port: 80
- id: lrgeuupmf7mc
  title: k3s console
  type: terminal
  hostname: host
  cmd: bash
difficulty: ""
timelimit: 0
enhanced_loading: null
---
# Onboarding Workloads-Cloud-Containers

🧩 Workloads
==========

Onboard the Linux and Windows VM.

**1) Create a Pairing Profile**

**Servers and Endpoints → Pairing Profiles → Add**:

- Name: `VEN-Pairing`
- Enforcement: Idle
- Node Type: Server VEN
- Initial VEN Version: Current Default
- Labels: `web`, `pos`, `Production`, `lax`
- Uses Per Key: Unlimited Uses
- Key Lifespan: 6 Hours

**Save → Generate Key**

---

**2) Pair the Windows Workload**

Copy the Windows Pairing Script from the profile. Run it in the **Windows** tab. Verify the VEN pairs in Idle mode with the profile labels applied.

---

**3) Pair the Linux Workload**

Copy the Linux Pairing Script from the profile. Run it in the **Linux** tab. Verify the VEN pairs in Idle mode with the profile labels applied.

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

```
check-workloads
```

---

**Lab Complete**

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

**Check the PCE API is responding** (run in the **CloudCLI** tab):

```
check-pce-api
```

**Check your work** (run in the **CloudCLI** tab):

```
check-cloud
```

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

---

**Lab Complete**

🧩 Containers
==========

Onboard the Kubernetes Node.

**1) In the k3s console tab, check the node is ready for onboarding**

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

**7) Label the Kubernetes Workload**

**Settings → Infrastructure → Container Clusters**, open the **Workloads** tab at the top. Select **host** → **Edit Labels**. Add a **Role** label of `controller` (create the label if it doesn't already exist) → **OK**.

---

**Check your work** (run in the **CloudCLI** tab):

```
check-containers
```

---

**Lab Complete**

🧩 Incident Response
==========

Containment workflows, emergency policy, validation, rollback, and operational decision-making.

**Part 1 — Ransomware Protection**

Practical ransomware use cases & high-risk services.

**Scenario**

Ransomware relies on a small set of well-known services to move laterally once it lands on a machine. Your jumphosts (`inf-jh01-prd`, `inf-jh02-prd`) are high-value targets — if one is compromised, an attacker will try to pivot to the other, and from there, further into the environment. Before writing a policy, you need to know exactly which services are considered highest risk.

---

**1) Identify the critical-severity ransomware-risky services**

**Dashboard → Ransomware Protection**. Review the **Top 5 Risky Applications and Services** panel, then locate the full risky-services table.

Identify the **critical-severity** services:

- RDP — `3389`
- SMB — `445`
- MSFT RPC — `135` *(optional)*
- WinRM — `5985` / `5986`

---

**2) Create a policy protecting jumphosts from lateral movement**

**Rulesets and Rules → Segmentation Rulesets → Add**:

- Name: `Jumphost-Ransomware-Protection`
- Scope — Application: `jump-infra`, Environment: `Production`, Location: `ca`

Inside the ruleset, add a **Deny Rule**:

- Consumers (Source): Role `jumpbox`
- Providers (Destination): Role `jumpbox`
- Services: `RDP` (3389), `SMB` (445), `MSFT RPC` (135), `WinRM` (5985, 5986)

**Provision** the ruleset. This blocks jumphost-to-jumphost traffic on every ransomware-critical service — `inf-jh01-prd` and `inf-jh02-prd` can no longer reach each other over RDP, SMB, RPC, or WinRM, containing lateral movement between them if one is compromised.

---

**3) Recognize the dashboard's scope**

The Ransomware Protection Dashboard reports on **managed server workloads only** — workloads running a VEN. Endpoints and containers are not included in its coverage or exposure scoring, even though they can still carry ransomware-risky traffic of their own.

---

**Part 2 — Investigation**

Live traffic investigation and containment.

**Scenario**

An attacker has harvested credentials from one or more endpoints and is using them to move through this environment. The pattern follows a typical chain: **credential harvesting** on endpoints, **RDP** into shared jump infrastructure using those credentials, an **SSH pivot** from the jump host into the application tier, and from there, **unusual traffic** spreading outward — application workloads that have no normal reason to do so suddenly authenticating against domain controllers.

Your job is to find each stage of this chain using **Explore → Traffic**, work out how far it's spread, and contain it using a pre-built Incident Response policy, **15. IR** — currently **disabled** in this environment. It's designed to contain any workload labeled `IR-DIRTYBUBBLE`: an **Override Deny** rule blocks `IR-CLEANBUBBLE` ↔ `IR-DIRTYBUBBLE` traffic in both directions ahead of everything else in the policy; a small set of **Allow** rules keep EDR, forensics, and your recovery team's access open on a contained box; and a broad **Deny** rule blocks everything else — including two contained machines from reaching each other.

There are 4 domain controllers (`acd-dc01-prd` through `acd-dc04-prd`) and 2 jump hosts (`inf-jh01-prd`, `inf-jh02-prd`) in this environment — all 6 are potential targets in this exercise.

---

**1) Enable the containment policy**

**Policies → All Policies**, select the checkbox for **15. IR** → **Enable**.

---

**2) RDP — find the credential harvesting landing on the jump hosts**

**Explore → Traffic**. Set Destination to Role `jumpbox`, Service `RDP` (`3389`). Note the sources — you should see a wide spread of `win-endpoint-*` and `mac-endpoint-*` workloads all RDPing into `inf-jh01-prd`/`inf-jh02-prd` that don't normally do so. This is the harvested-credential access landing on shared infrastructure.

---

**3) SSH — find the pivot**

Clear Destination, set **Source** to Role `jumpbox`, Service `SSH` (`22`). This shows the jump hosts reaching *out* into the application tier — the pivot point, not just an entry point. You should find outbound SSH from a jump host to at least one process-tier workload (e.g. an `*-proc*-prd`) it doesn't normally reach.

> [!NOTE]
> Check the **First Detected** timestamp on an inbound RDP session vs. the jump host's outbound SSH connections. An outbound SSH connection first detected only shortly after — minutes, not hours — an inbound RDP session the jump host doesn't normally receive is the pivot in action, not routine admin activity.

---

**4) Unusual traffic — find where it spread**

Set Destination filters to Role `dc`, Application `ad`. Leave Source blank so every source shows. Group the results by **Applications** and **Roles** (top toolbar). Look for:

- **Kerberos** (`88`) and **LDAP** (`389`) hits from web/processing-tier workloads in applications that have no business reason to authenticate directly against a domain controller — e.g. `pos`, `ord`, `pay`, `cat`, `ecm` workloads, not just `ad`/IT-owned ones
- **DNS** (`53`) queries from database-tier workloads (`*-db*-prd`) straight to a DC — a DB server doing its own DNS lookups against a domain controller is unusual
- Any **SMB** (`445`) hits — SMB to a DC is the highest-priority one to flag, it's the classic ransomware-propagation port

A handful of sources talking to a DC is routine; many *different, otherwise-unrelated* applications suddenly doing so, across all 4 DCs, is the sign this has already spread beyond the initial pivot.

---

**5) Identify a workload to contain**

The jump host itself is the clearest containment target — it's the actual pivot point from steps 2-3, not just a symptom. **Contain `inf-jh01-prd`** (or `inf-jh02-prd`, whichever showed the outbound SSH pivot in step 3).

**Servers and Endpoints → Workloads**, filter for `inf-jh01-prd`, **Edit Labels** → add `IR-DIRTYBUBBLE` → **OK**.

---

**6) Confirm containment**

**Explore → Map**, locate `inf-jh01-prd`. Confirm:

- The inbound RDP sessions from `win-endpoint-*`/`mac-endpoint-*` now show as **blocked**
- The outbound SSH pivot to the application tier now shows as **blocked**
- The jump host's own normal management/monitoring traffic (if any) is unaffected

---

**7) Revert**

**Labels**, remove the `IR-DIRTYBUBBLE` label from `inf-jh01-prd` → **OK**. Confirm on the Map that normal traffic resumes.

---

**Lab Complete**
