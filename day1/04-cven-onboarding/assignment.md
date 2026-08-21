---
slug: cven-onboarding
id: rnte3heuh1tt
type: challenge
title: 04 - CVEN Onboarding
teaser: Onboard the k3s node with CVEN
tabs:
- id: m51z4d9tlfbp
  title: k3scilium
  type: terminal
  hostname: host
  cmd: bash
difficulty: ""
timelimit: 0
enhanced_loading: null
---
# 04 - CVEN Onboarding

Adapted from `331-Containers V2`'s Assignment 3 (CVEN-only — Agentless
skipped). This is real onboarding, not just a connectivity check: Cilium
itself is already installed on this VM at boot, so this deploys straight
into **CLAS mode** with no separate legacy-to-CLAS migration step — but
firewall coexistence with Illumio still needs to be checked and
configured as part of this lab.

🧩 Task 01 - Verify the K3s Node
==========

**1 )** Verify the node is operational

```run
kubectl get nodes
```

**2 )** Ensure all PODS have initialised

```run
kubectl get pods -A -o wide
```

🧩 Task 02 - Check Firewall Coexistence
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

🧩 Task 03 - Disable Pre-Existing Policies
==========

> [!IMPORTANT]
> Ephemeral training accounts may come pre-loaded with existing active
> policies. Disable and provision any of these before starting policy work.

**1 )** In the Illumio Console, navigate to **Segmentation → Policies → All Policies**

**2 )** Select any existing active policies, click **Disable**, then **Provision** the change

🧩 Task 04 - Create the Cluster Object
==========

**1 )** In the Illumio Console navigate to **Settings → Infrastructure → Container Clusters**

**2 )** Click **+Add** and configure:

- **Name:** K3S-LAB

**3 )** Click **Save**

**4 )** Copy the **Cluster ID** and **Cluster Token** to a text file

🧩 Task 05 - Create the Pairing Profile
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

🧩 Task 06 - Build the Illumio-values File
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

**3 )** Update `pce_url`, `cluster_id`, `cluster_token`, and `cluster_code` with the values copied in Tasks 04–05

> [!IMPORTANT]
> Ensure there is a single space after each colon `:`

**4 )** Save the file: **CTRL + X → y → ENTER**

🧩 Task 07 - Deploy with Helm
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
