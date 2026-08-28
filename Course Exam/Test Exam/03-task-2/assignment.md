---
slug: task-2
id: wtmcjvb43h6u
type: challenge
title: Task 2
teaser: Container Onboarding
tabs:
- id: xryiayiyryce
  title: k3s
  type: terminal
  hostname: host
  cmd: bash
difficulty: ""
timelimit: 0
enhanced_loading: null
---
# Task 2

Onboard the k3s node as a Container VEN (CVEN).

---

Hints
===

Set your real values as variables (no YAML syntax to get wrong):

Your PCE URL:

```run
PCE_URL="poc4.illum.io:443"
```

Your Cluster ID from the Container Cluster object:

```
CLUSTER_ID="paste-cluster-id-here"
```

Your Cluster Token from the Container Cluster object:

```
CLUSTER_TOKEN="paste-cluster-token-here"
```

Your Pairing Profile key:

```
CLUSTER_CODE="paste-pairing-key-here"
```

Then generate `illumio-values.yaml`:

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

Deploy with Helm:

```run
helm install illumio -f illumio-values.yaml oci://quay.io/illumio/illumio --namespace illumio-system --create-namespace --version 5.6.1
```
