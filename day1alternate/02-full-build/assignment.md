---
slug: full-build
id: h6ivxw8w0scl
type: challenge
title: 02 - Full Build (AWS, VMs, k3s)
teaser: Verify AWS, the RockyLinux/Windows VMs, and the k3s/CVEN node together
tabs:
- id: twsrvmd2w0ra
  title: CloudCLI
  type: terminal
  hostname: cloud-client
  cmd: bash
- id: kgsri6vwpzzi
  title: AWS
  type: service
  hostname: cloud-client
  port: 80
- id: 63bszuuchpwt
  title: Linux
  type: terminal
  hostname: linux-vm
  cmd: bash
- id: 1x3wd0u7dtr9
  title: Windows
  type: terminal
  hostname: windows-vm
- id: 8dtpzdz38ggv
  title: k3scilium
  type: terminal
  hostname: host
  cmd: bash
difficulty: ""
timelimit: 0
enhanced_loading: null
---
# 02 - Full Build

Base lab test (alternate layout) — AWS, the RockyLinux/Windows VMs, and
the k3s/CVEN node all built and verified together in one assignment, for
load-time and look-and-feel comparison against the 4-challenge version
(`day1`).

🧩 Task 01 - Verify AWS Resources
==========

**1 )** Login to AWS using the credentials in the **AWS** tab

> [!IMPORTANT]
> Ensure the Region is set to **N. Virginia (us-east-1)**

**2 )** In the AWS Console search for **EC2** and verify **4 running instances**:
`crm-dev-web`, `crm-dev-db`, `finance-prod-web`, `finance-prod-db`

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

**4 )** Exit the shell

```run
exit
```

🧩 Task 03 - Verify Linux VM
==========

**1 )** In the **Linux** tab, run

```run
hostname && whoami
```

🧩 Task 04 - Verify Windows VM
==========

**1 )** In the **Windows** tab, run

```
hostname
whoami
```

🧩 Task 05 - Verify the K3s Node
==========

**1 )** In the **k3scilium** tab, verify the node is operational

```run
kubectl get nodes
```

**2 )** Ensure all PODS have initialised

```run
kubectl get pods -A -o wide
```

🧩 Task 06 - Check Firewall Coexistence
==========

**1 )** Check whether Cilium is already configured to coexist with Illumio's iptables rules

```run
sudo iptables -S FORWARD | head
```

**2 )** If `CILIUM_FORWARD` appears at the top of the list rather than the bottom, coexistence has not been configured — run the following to fix it

```run
cilium upgrade --set='extraArgs={--prepend-iptables-chains=false}'
```

```run
kubectl -n kube-system rollout restart ds/cilium
```

**3 )** Re-check the FORWARD chain

```run
sudo iptables -S FORWARD | head
```

> [!NOTE]
> This can take a few seconds to update — you may need to re-run the command above to see CILIUM_FORWARD at the bottom of the list

🧩 Task 07 - Disable Pre-Existing Policies
==========

> [!IMPORTANT]
> Ephemeral training accounts may come pre-loaded with existing active
> policies. Disable and provision any of these before starting policy work.

**1 )** In the Illumio Console, navigate to **Segmentation → Policies → All Policies**

**2 )** Select any existing active policies, click **Disable**, then **Provision** the change

🧩 Task 08 - Create the Cluster Object
==========

**1 )** In the Illumio Console navigate to **Settings → Infrastructure → Container Clusters**

**2 )** Click **+Add** and configure:

- **Name:** K3S-LAB

**3 )** Click **Save**

**4 )** Copy the **Cluster ID** and **Cluster Token** to a text file

🧩 Task 09 - Create the Pairing Profile
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

🧩 Task 10 - Build the Illumio-values File
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

**3 )** Update `pce_url`, `cluster_id`, `cluster_token`, and `cluster_code` with the values copied in Tasks 08–09

> [!IMPORTANT]
> Ensure there is a single space after each colon `:`

**4 )** Save the file: **CTRL + X → y → ENTER**

🧩 Task 11 - Deploy with Helm
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
