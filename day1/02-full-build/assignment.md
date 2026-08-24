---
slug: full-build
id: 8qlowwiyze9w
type: challenge
title: 02 - Full Build (AWS, VMs, k3s)
teaser: Verify AWS, the RockyLinux/Windows VMs, and the k3s/CVEN node together
tabs:
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
- id: yx05d9vozqcg
  title: Linux
  type: terminal
  hostname: linux-vm
  cmd: bash
- id: b2rkcee3crkf
  title: Windows
  type: terminal
  hostname: windows-vm
- id: evarmjetmnns
  title: k3s
  type: terminal
  hostname: host
  cmd: bash
difficulty: ""
timelimit: 0
enhanced_loading: null
---
# 02 - Full Build

Base lab test — AWS, the RockyLinux/Windows VMs, and the k3s/CVEN node
all built and verified together in one assignment.

🧩 Task 01 - Verify AWS Resources
==========

**1 )** Login to AWS using the credentials in the **AWS** tab

> [!IMPORTANT]
> Ensure the Region is set to **N. Virginia (us-east-1)**

**2 )** In the AWS Console search for **EC2** and verify **4 running instances**:
`crm-dev-web`, `crm-dev-db`, `crm-prod-web`, `crm-prod-db`

🧩 Task 02 - Verify AWS Connectivity
==========

**1 )** Return to the **CloudCLI** tab and check the Terraform outputs

```run
cd /root/26x-course/terraform
terraform output
```

**2 )** SSH into the **crm-dev-web** instance

```run
ssh -o StrictHostKeyChecking=accept-new \
-i /root/.ssh/my-keypair.pem \
ec2-user@$(terraform output -json ec2_instances_info | jq -r '."crm-dev-web".public_ip')
```

**3 )** Verify Internet connectivity

```run
ping www.illumio.com -c 5
```

Your environment is now configured and has both **inbound SSH** and **outbound Internet access**

**4 )** To keep the SSH session alive during the labs you can generate traffic in the background

```run
while true; do
  curl -s -o /dev/null -w "%{http_code}\n" https://www.illumio.com
  sleep 60
done
```

**5 )** End the traffic loop and exit the shell

Press **CTRL+C**

```run
exit
```

🧩 Task 03 – Onboard AWS
==========

**1 )** Open the **Illumio Console**

Navigate to:

**Cloud → Onboarding → Add AWS → Select Account**

**2 )** Configure the following:

- **Name:** AWSOnboarding
- **Account ID:** Copy this value from your AWS Console at the top right of the AWS Web Console

Enter this value into the **Account ID** field

> [!NOTE]
> This is the **12 character value** located in the top right corner of your AWS Console

**3 )** Ensure **Read Write Access** is set to **YES**

Click **Continue**

**4 )** On the subsequent screen select the **Service Account** field

Click **Add a New Service Account** and enter:

**OnboardingAccount**

Select **Create**

**5 )** On the next screen **Download** the credentials

Select **Close** to return to the Service Account screen

> [!IMPORTANT]
> **Do NOT press Continue until the next step is completed**

**6 )** In the **Type of Integration** field select:

**Create IAM Roles on AWS**

Your **AWS Web Console** will open at the **Create Stack** page

> [!IMPORTANT]
> Ensure the region is set to **N. Virginia (us-east-1)**

**7 )** Scroll down to the **IllumioServiceAccountSecret** field

Enter the value from the **ServiceAccountToken** in the downloaded credentials

**8 )** Agree to the conditions at the bottom of the page and select **Create Stack**

**9 )** On the **CloudFormation Stack** page monitor the creation of the stack

Wait until you see:

**Illumio Integration – CREATE COMPLETE**

(You may need to refresh the console)

**10 )** Return to the **Illumio Console**

Click **Continue → Confirm and Finish**

**11 )** Verify your newly onboarded account appears

Initial onboarding is now complete

🧩 Task 04 - Verify Linux VM
==========

**1 )** In the **Linux** tab, run

```run
hostname && whoami
```

🧩 Task 05 - Verify Windows VM
==========

**1 )** In the **Windows** tab, run

```
hostname
whoami
```

🧩 Task 06 - Verify the K3s Node
==========

**1 )** In the **k3s** tab, verify the node is operational

```run
kubectl get nodes
```

**2 )** Ensure all PODS have initialised

```run
kubectl get pods -A -o wide
```

🧩 Task 07 - Check Firewall Coexistence
==========

Cilium needs to be configured to coexist with Illumio's iptables rules.

**1 )** Run the following to configure it

```run
cilium upgrade --version 1.18.6 --set='extraArgs={--prepend-iptables-chains=false}'
```

```run
kubectl -n kube-system rollout restart ds/cilium
```

**2 )** Re-check the FORWARD chain

```run
sudo iptables -S FORWARD | head
```

> [!NOTE]
> This can take a few seconds to update — you may need to re-run the command above to see CILIUM_FORWARD at the bottom of the list

🧩 Task 08 - Disable Pre-Existing Policies
==========

> [!IMPORTANT]
> Ephemeral training accounts may come pre-loaded with existing active
> policies. Disable and provision any of these before starting policy work.

**1 )** In the Illumio Console, navigate to **Segmentation → Policies → All Policies**

**2 )** Select any existing active policies, click **Disable**, then **Provision** the change

🧩 Task 09 - Create the Cluster Object
==========

**1 )** In the Illumio Console navigate to **Settings → Infrastructure → Container Clusters**

**2 )** Click **+Add** and configure:

- **Name:** K3S-LAB

**3 )** Click **Save**

**4 )** Copy the **Cluster ID** and **Cluster Token** to a text file

🧩 Task 10 - Create the Pairing Profile
==========

**1 )** Navigate to **Servers & Endpoints → Pairing Profiles**

**2 )** Click **+Add** and configure:

- **Name:** kubernetes
- **Enforcement:** Visibility Only
- **Visibility:** Denied + Allowed
- **Enforcement Node Type:** Server VEN
- **Initial VEN Version:** Current Default

**3 )** Add labels:

- **Location type label:** ca
- **Environment type label:** Production
- **Application type label:** kubernetes

**4 )** Click **Save**, then **Generate Key** and save the value

🧩 Task 11 - Build the Illumio-values File
==========

**1 )** Create the values file

```run
nano illumio-values.yaml
```

**2 )** Paste the following text

```run
pce_url: URL_PORT # PCE URL with port, e.g. mypce.example.com:8443
cluster_id: ILO_CLUSTER_UUID # Cluster ID from PCE
cluster_token: ILO_CLUSTER_TOKEN # Cluster Token from PCE
cluster_code: ILO_CODE # Pairing Profile key from PCE
containerRuntime: k3s_containerd
containerManager: kubernetes
clusterMode: clas
```

**3 )** Update `pce_url`, `cluster_id`, `cluster_token`, and `cluster_code` with the values copied in Tasks 09–10

> [!IMPORTANT]
> Ensure there is a single space after each colon `:`

**4 )** Save the file: **CTRL + X → y → ENTER**

🧩 Task 12 - Deploy with Helm
==========

**1 )** Deploy Illumio for Kubernetes using Helm

```run
helm install illumio -f illumio-values.yaml oci://quay.io/illumio/illumio --namespace illumio-system --create-namespace --version 5.6.1
```

**2 )** Monitor the deployment

```run
kubectl get pods -A -o wide
```

**3 )** Verify in the Illumio Console at **Infrastructure → Container Clusters** — the cluster should show **"in sync"**

---

**Lab Complete**
