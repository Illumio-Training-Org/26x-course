# 26.x Course

Illumio 26.x bootcamp (Foundation/Associate + Select/Specialist content).
Each Instruqt track is independently provisioned and self-contained, built
fresh and torn down after use — no state carries across sessions.

## Structure

- `terraform/` — the shared AWS Terraform build (magic-link-driven PCE org +
  4 EC2 instances: 2 applications, each a Web/DB pair, 1 VPC, per-role
  security groups). Deliberately kept out of the track folders so it
  doesn't interfere with their own Instruqt track sync.
- `Course Lab/` — the shared base lab Instruqt track (magic link, Terraform
  apply, RockyLinux + Windows VMs, k3s/CVEN, synthetic traffic) plus its own
  challenge content.
- `Course Exam/` — the exam track (`! 26.x Exam`), scaffolded with the
  same shared base build plus placeholder Task challenges — content
  for the tasks themselves is still being built out.

Content source of truth: the `Foundation & Select agenda` tab of
`26.x Structure.xlsx` (see `CX-NEW/course-structure/foundation-select-agenda-baseline.md`
in the wider CX-NEW working folder for the maintained baseline).

## How the shared base lab is built

Every day-track boots the same underlying infrastructure before its own
day-specific content begins. All of this happens automatically as soon as
the sandbox starts — learners never trigger any of it manually.

### 1. PCE org creation (magic link)

Instruqt's `magiclinktenantcreatev2` custom resource provisions a fresh,
free-trial Illumio PCE tenant for each sandbox session. A `cloud-client`
container reads the resulting credentials (tenant ID, API key/secret, org
ID, PCE address) from environment variables Instruqt injects at boot, and
uses them to render a tile showing the learner a one-click login link (the
"magic link"). The tile itself is a small `index.html` rendered with
[gomplate](https://gomplate.ca/) from a template in the external
[`jdschmitz15/illumio-instruqt-terraform-template`](https://github.com/jdschmitz15/illumio-instruqt-terraform-template)
repo.

### 2. AWS build (Terraform)

The second challenge triggers this repo's own `terraform/` build applying
against AWS: one VPC, two subnets, two role-based security groups, and 4
EC2 instances forming a single application (`crm`) with a Web/DB pair in
both a `dev` and a `prod` environment. This is what the learner logs into
and explores in the AWS Console.

### 3. RockyLinux + Windows VMs

Two plain VMs — a RockyLinux 9 host and a Windows Server host, neither
pre-paired with an Illumio agent — are provisioned directly as Instruqt
sandbox virtual machines. Both are CLI-only (PowerShell on the Windows
side), used later for hands-on VEN pairing exercises.

### 4. k3s / Cilium node (CVEN)

A single-node k3s cluster with Cilium pre-installed as its CNI, used for a
Container VEN (CVEN) onboarding exercise: creating the Container Cluster
object in the PCE, generating a pairing profile, and deploying Illumio's
Helm chart against the cluster.

### 5. Synthetic traffic generation

So the learner has something realistic to look at in Illumination/Explorer
from the moment they log in — rather than an empty PCE with nothing paired
yet — the sandbox also populates the org with a full synthetic demo
environment and ongoing simulated traffic. This uses two external,
purpose-built tools:

- [`Illumio-Training-Org/manual-instruqt-startup`](https://github.com/Illumio-Training-Org/manual-instruqt-startup) —
  a toolset combining `workloader` (Illumio's PCE bulk-operations CLI) and
  a Virtual Environment Simulator ("vensim") for populating a PCE with demo
  content and posting simulated traffic against it.
- [`Illumio-Training-Org/vensim_files`](https://github.com/Illumio-Training-Org/vensim_files) —
  the demo dataset itself: labels, roughly 180 synthetic workload
  identities, services, IP lists, user groups, rulesets/rules, and traffic
  flow records.

At boot, the `cloud-client` container clones both repos, registers the
newly-created PCE org, imports the label/service/IP-list/policy content,
activates the synthetic workloads as simulated (non-real) VENs, and posts
an initial batch of traffic. A background process then keeps posting
fresh traffic, sending heartbeats, and pulling policy on a recurring
cadence for the rest of the session — so Illumination/Explorer keeps
showing live-looking activity throughout the lab, independent of anything
the learner does. Everything created this way is purely additive: the
handful of objects Illumio's platform pre-seeds on every new trial org
(a few default labels, services, and pairing profiles) are left untouched.

## APIs used for self-checks

The sandbox exposes two genuinely different credential/API pairs, and
which one to use depends on what's being checked:

- **Core PCE API** (`https://$AUTOACCOUNT_PCE_FQDN/api/v2/orgs/$AUTOACCOUNT_ORG_ID/...`)
  — the standard Illumio segmentation API: workloads, pairing profiles,
  labels, label groups, rulesets/rules (including nested `deny_rules`),
  services, IP lists, container clusters, active vs. draft policy, etc.
  Authenticated with the primary API key:
  `api_$AUTOACCOUNT_APIKEY_ID` / `$AUTOACCOUNT_APIKEY_SECRET`. This is
  what every `check-*` script uses except `check-cloud`.
- **CloudSecure API** (`https://cloud.illum.io/api/v1/...`) — a
  completely separate backend for the Cloud/AWS-onboarding module
  (account status, onboarding/security-review state, cloud inventory).
  **Not** reachable with the primary API key — it needs the
  service-account credential pair instead:
  `$AUTOACCOUNT_SAAPIKEY_KEYID` / `$AUTOACCOUNT_SAAPIKEY_SECRET`,
  passed as Basic Auth **plus** an `X-Tenant-Id: $AUTOACCOUNT_TENANT_ID`
  header (both required — omitting either 401s or 404s). Used by
  `check-cloud` to confirm the AWS account is onboarded. Cloud UI
  resources fetched by the browser (Application Discovery, Inventory)
  live on this same backend and are not queryable from the Core PCE
  API at all, regardless of credential — a bare `curl` against
  `poc4.illum.io` will never see AWS-onboarded resources.
