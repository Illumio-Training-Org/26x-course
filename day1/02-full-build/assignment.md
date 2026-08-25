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

Pair the Linux and Windows VMs as VENs using a custom label override.

**1) Create a Pairing Profile**

**Servers and Endpoints → Pairing Profiles → Add**:

- Name: `pos | production | lax`
- Enforcement: Idle
- Node Type: Server VEN
- Initial VEN Version: Current Default
- Labels: `pos`, `Production`, `lax` (leave **Role** blank — set via CLI override in step 3)
- Uses Per Key: Unlimited Uses
- Key Lifespan: 6 Hours
- Command Line Overrides: Enforcement **Unlocked**, **Role Label can be set**

**Save → Generate Key**

**2) Pair the Windows Workload**

Copy the Windows Pairing Script from the profile. Run it in the **Windows** tab. Verify the VEN pairs in Idle mode with the profile labels applied.

**3) Pair the Linux Workload with a Custom Label**

Copy the Linux Pairing Script. Paste it into the **Linux** tab — don't press Enter yet. Append:

```
--role web --mode selective
```

Then run it. Verify the VEN pairs with the **web** role in **Selective** mode.

**4) Verify Connectivity**

**Servers and Endpoints → Workloads**. Filter Name contains `vm`. Click each workload and review its Summary, Processes, Rules, Denied Traffic, and Ransomware Protection tabs.

**5) Explore VEN Command Line**

In the **Linux** tab:

```run
cd /opt/illumio_ven/
```
```run
./illumio-ven-ctl -help
```
```run
./illumio-ven-ctl version
```
```run
./illumio-ven-ctl connectivity-test -test-all-ips -v
```
```run
./illumio-ven-ctl check-env
```
```run
./illumio-ven-ctl status
```
```run
./illumio-ven-ctl stop
```
```run
./illumio-ven-ctl start
```

**6) Change Enforcement**

**Servers and Endpoints → Workloads**, select **linux-vm**, click **Enforcement → Enforced**. Return to the **Linux** tab and try interacting with it — access is blocked (no matching rule, expected). Change enforcement back to **Selective**, wait a few minutes, then confirm access is restored.

🧩 Cloud
==========

Onboard the AWS account to Illumio and map cloud tags to labels.

**1) Login to AWS**

Login using the credentials in the **AWS** tab.

> [!IMPORTANT]
> Region: **N. Virginia (us-east-1)**

Search **EC2** and verify running instances are present.

**2) Connect to EC2**

Return to **CloudCLI** and verify the instances:

```run
cd /root/26x-course/terraform
terraform output
```

SSH into **crm-prod-web**:

```run
ssh -o StrictHostKeyChecking=accept-new \
-i /root/.ssh/my-keypair.pem \
ec2-user@$(terraform output -json ec2_instances_info | jq -r '."crm-prod-web".public_ip')
```

Verify internet connectivity:

```run
ping www.illumio.com -c 5
```

Keep the SSH session alive with background traffic:

```run
while true; do
  curl -s -o /dev/null -w "%{http_code}\n" https://www.illumio.com
  sleep 60
done
```

**CTRL+C** to end the loop, then:

```run
exit
```

**3) Onboard AWS**

In the Illumio Console: **Cloud → Onboarding → Add AWS → Select Account**. Configure:

- Name: `AWSOnboarding`
- Account ID: from the top right of the AWS Console (12 characters)

Ensure **Read Write Access** is **YES → Continue**. Under Service Account, **Add a New Service Account** named `OnboardingAccount` → **Create**. Download the credentials, **Close**.

> [!IMPORTANT]
> Do NOT press Continue until the next step is completed.

Type of Integration: **Create IAM Roles on AWS**. The AWS Console opens at Create Stack (region N. Virginia). Scroll to **IllumioServiceAccountSecret**, paste the `ServiceAccountToken` from the downloaded credentials. Agree to the terms, **Create Stack**. Wait for **Illumio Integration – CREATE COMPLETE** (refresh if needed). Back in the Illumio Console: **Continue → Confirm and Finish**. Verify the account appears.

**4) Security Review**

**Cloud → Security Review → Review** (may take a few minutes to appear). Select the account → **Approve Security Review → Approve**. Back at **Cloud → Onboarding**, enforcement now shows **Yes** (refresh if needed).

**5) Resource Discovery**

**Cloud → Inventory** (may take a few minutes to populate). Filter **Account → AWSOnboarding → GO**.

- Filter **Resource Type → AWS::EC2::Instance** — note the count and Cloud Tags.
- Filter **Resource Type → AWS::EC2::Subnet** — note the Cloud Tags.
- Filter **Resource Type → AWS::EC2::SecurityGroup** — note instance roles share Security Groups (e.g. web roles → `web_sg`).

**Cloud → Explore → Map**, search icon, filter **aws → Account → AWSOnboarding**. Expand each subnet to see the EC2 instances. Click **crm-prod-web** to view its Summary, Attached Resources, and Traffic.

> [!NOTE]
> Flow logs aren't enabled in this lab, so no traffic appears yet.

**6) Tag to Label Mapping**

**Label Management → Labelling Method → Tag to Label Mapping → Add Mapping**. Ensure **AWS** is selected, filter by the AWS account.

- Cloud Tag Key **Role** → Add to selection → Maps to Illumio Label Type **Role** → **Confirm & Add**
- Cloud Tag Key **location** → Add to selection → Maps to Illumio Label Type **Location** → **Confirm & Add**

View the generated labels: **Cloud → Labelling Method → System Generated Labels**.

**7) Application Mapping**

**Cloud → Application Discovery → Application Definitions → Discovery Rules → Add**:

- Rule Name: `AppDiscovery`
- Rule Type: Cloud Tags
- Cloud Tag Keys: `app`

Auto-Approve **ON → Save → Confirm and Save**.

**8) Deployment Definitions**

**Cloud → Application Discovery → Deployments → Add First Deployment**. Environment: **Production**. Deployment Stack → **Add → Add Regions** → `us-east-1` → Add. **Add → Add Virtual Networks** → select the VPC → Add. **Add → Add Subnets** → select the Production subnet → Add. **Save**.

Repeat for **Development** (its own Region/VPC/Subnet).

> [!IMPORTANT]
> Ensure both deployments — Production and Development — are added before continuing.

🧩 Containers
==========

Onboard the k3s node as a CVEN.

**1) Verify the K3s Node**

```run
kubectl get nodes
```

Wait for **READY**.

```run
kubectl get pods -A -o wide
```

Wait for all PODS **RUNNING**.

**2) Check Firewall Coexistence**

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

**3) Disable Pre-Existing Policies**

> [!IMPORTANT]
> Ephemeral training accounts may come pre-loaded with active policies. Disable and provision any before starting policy work.

**Segmentation → Policies → All Policies**. Select any active policies → **Disable → Provision**.

**4) Create the Cluster Object**

**Settings → Infrastructure → Container Clusters → +Add**. Name: `K3S-LAB`. **Save**. Copy the Cluster ID and Cluster Token.

**5) Create the Pairing Profile**

**Servers & Endpoints → Pairing Profiles → +Add**:

- Name: `kubernetes`
- Enforcement: Visibility Only
- Visibility: Denied + Allowed
- Enforcement Node Type: Server VEN
- Initial VEN Version: Current Default
- Labels — Location: `ca`, Environment: `Production`, Application: `kubernetes`

**Save → Generate Key**, save the value.

**6) Create the Illumio-values File**

```run
nano illumio-values.yaml
```

Paste:

```run
pce_url: URL_PORT # PCE URL with port, e.g. mypce.example.com:8443
cluster_id: ILO_CLUSTER_UUID # Cluster ID from PCE
cluster_token: ILO_CLUSTER_TOKEN # Cluster Token from PCE
cluster_code: ILO_CODE # Pairing Profile key from PCE
containerRuntime: k3s_containerd
containerManager: kubernetes
clusterMode: clas
```

Update `pce_url`, `cluster_id`, `cluster_token`, `cluster_code` with the values from steps 4–5.

> [!IMPORTANT]
> Ensure a single space after each colon `:`

Save: **CTRL + X → y → ENTER**.

**7) Deploy with Helm**

```run
helm install illumio -f illumio-values.yaml oci://quay.io/illumio/illumio --namespace illumio-system --create-namespace --version 5.6.1
```
```run
kubectl get pods -A -o wide
```

Verify in the Illumio Console at **Infrastructure → Container Clusters** — cluster shows **"in sync"**.

---

**Lab Complete**
