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
- `Course Exam/` — empty, reserved for the course exam track (not yet
  built).

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
