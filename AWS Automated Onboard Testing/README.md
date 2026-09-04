# AWS Automated Onboard Testing

`! 26.x AWS Automated Onboard Testing` — an internal prototype track,
not learner-facing. Tests whether AWS onboarding to Illumio Cloud can
be fully automated in the background at track boot, with **zero**
browser/Console wizard interaction, so the propagation delay a real
onboarding needs happens invisibly before an exam task ever requires
the onboarded account.

## Why this exists

The Select Exam's cloud-onboarding task (now Task 10 — "create a
discovery rule to onboard the application") needs an AWS account
onboarded to Illumio Cloud, with inventory synced, before a learner can
even select a Cloud Tag Key to build a discovery rule against. The full
manual pipeline (AWS onboard → inventory sync → tag-key availability)
has a real ~15-30 minute propagation delay, which is too much dead time
to burn mid-exam if the learner has to sit through it. Confirmed here:
the entire onboarding pipeline can run invisibly in the background from
track boot, matching the same pattern the shared base lab already uses
for vensim and the AWS Terraform build.

## Summary (2026-09-04)

The background pipeline in `track_scripts/setup-cloud-client` now
automates every step of onboarding an AWS account to Illumio Cloud and
getting it fully visible in the Console, with **zero** browser/wizard
interaction:

1. **AWS account onboarding** — Terraform creates a dedicated IAM role
   (matching the real Console wizard's own CloudFormation template)
   and registers the account with CloudSecure.
2. **Credential registration** — replays the CFT's own
   `cloud_credentials` REST call, which is what actually activates the
   role for CloudSecure to assume (the Terraform account resource
   alone isn't enough).
3. **Tag-to-Label Mapping** — `role → Role` and `location → Location`,
   using the real Console API. (`app`/`env` are deliberately rejected
   by this endpoint — those two are meant to come from Application
   Discovery instead, confirmed by design, not a bug.)
4. **Application Discovery** — a rule keyed on `aws:app`, which
   resolves into a real Application Definition (`crm`).
5. **Deployments** — Production and Development, each tied to the
   correct AWS subnet *and* an `env` Cloud Tags stack (the second part
   turned out to be required — see Timings below).

**What this gets you on the Map / Inventory, automatically**: the full
topology — `AWS → Production/Development → crm → web/db` — with real
Role, Location, and Environment labels resolved onto the workloads, no
learner or instructor action required at all.

**What's deliberately NOT automated: Security Review.** This is the
one remaining manual step (Cloud → Security Review → Approve). It
governs whether Illumio is allowed to *write* policy back to AWS
(security group changes) — a real security boundary, not an oversight:
confirmed the official `illumio-cloudsecure` Terraform provider has no
`security_review` resource at all (checked its full generated resource
list directly), and a full DevTools capture of the real browser action
showed nothing hidden to replicate — just a display-only GET followed
by the approve POST. The most likely explanation is that action's
backend logic requires a real logged-in user session, not a service
account, which is a sensible restriction for something that grants
write access to a customer's cloud environment. It's also **not
required for anything above** — inventory, tag mapping, discovery, and
deployments all resolve independent of it (proven by a run where
everything else completed with Security Review still `PENDING`).

**Rough timings** (see the full data table further down for every
individual run):
- Onboarding → inventory synced: **~21 min average** (range 14-28 min)
- Inventory → Tag-to-Label Mapping / Discovery Rule / Application
  Definition all resolving: **near-instant** (seconds)
- Tag/Discovery Rule creation → actual label values + associated
  labels showing in the UI: **~11-12 min** on top of the above
- Deployment creation → Environment resolving on the Map: **~9 min**,
  but only *after* adding the Cloud Tags stack — the VPC/Subnet stack
  alone never resolved even after 34+ minutes of waiting

So realistically: **~30-35 minutes** from track boot to a fully
labeled, fully mapped environment with zero manual steps (Security
Review aside).

## Result — CONFIRMED WORKING END TO END (2026-09-03)

Live-tested repeatedly across multiple fresh sandboxes. From a clean
track restart, with **zero** manual intervention, the background
pipeline now:

1. Builds the shared AWS infrastructure (the tagged `crm` app — 4 EC2
   instances, `crm-dev-web/db` and `crm-prod-web/db`) via the existing
   shared `terraform/` folder.
2. Creates a dedicated IAM role in AWS for CloudSecure, matching the
   real Console wizard's own CloudFormation template's policy content.
3. Registers the AWS account with CloudSecure via Terraform
   (`illumio-cloudsecure_aws_account` resource) — reaches
   `status: ONBOARDING_COMPLETE`.
4. Replays the CloudFormation template's own credential-registration
   REST call (`POST /api/v1/integrations/cloud_credentials`) — without
   this, the account *shows* onboarded but `roleArn` stays empty and
   nothing ever syncs.
5. Inventory (EC2 instances, security groups, VPCs, etc. — 33 resources
   in testing) appears on its own roughly 15-25 minutes after
   onboarding completes.
6. Once inventory exists, the Cloud Tag Keys dropdown (`aws:app`)
   becomes selectable, and creating a Discovery Rule resolves to a
   matching Application Definition (e.g. `"crm"`) in **~2 seconds** —
   trivial exam-task latency, nothing like the original worst case.

So the actual exam-relevant timing is: **~15-25 min of invisible
background wait, then near-instant** once the learner acts. Running
onboarding at track boot (rather than exposing it as an exam task)
comfortably hides that window behind however long a learner takes to
reach the last task.

**Full end-to-end confirmation (2026-09-03, later run):** with
Tag-to-Label Mapping and Application Discovery also wired into
`setup-cloud-client` (see below), a completely fresh track restart
went from account onboarding to a fully resolved Application
Definition with **zero manual steps of any kind** — not even Security
Review needed touching:

```
21:17:48  Account onboarded (Terraform)
21:41:53  Inventory synced + Tag-to-Label Mapping (role -> Role) +
          Discovery Rule (aws-auto-discovery, aws:app) all auto-created
21:42:29  Application Definition "crm" auto-resolved (~1.5s later)
```

~24 minutes of invisible background wait (the real inventory-sync
delay this track exists to hide), then everything downstream resolved
in under 2 seconds, automatically, with `created_by` on every object
showing the automation's own service-account identity, not a human.

## How it works, step by step

Two files matter here: `track_scripts/setup-cloud-client` (this
track) and `../terraform-cloudsecure-aws/*.tf` (a separate Terraform
config, deliberately not part of the shared `terraform/` folder used
by Course Lab and all 5 exam tracks — adding a new required provider
there would break every other track's `terraform apply`, since they
don't pass the new CloudSecure variables).

1. **Track boots → `setup-cloud-client` runs automatically.** It's a
   track-level script (lives in `track_scripts/`, not inside a
   challenge folder), so Instruqt runs it the instant the sandbox is
   provisioned, before any challenge is even visible. Does the usual
   housekeeping: cleans up Instruqt's `AUTOACCOUNT_*` env vars (they
   arrive JSON-array-wrapped, e.g. `["value"]`), sets up the magic
   link, and defines a `check-cloud` command that queries Illumio's
   CloudSecure API directly (`cloud.illum.io/api/v1/integrations`) —
   independent of whatever Terraform itself reports.

2. **A background subshell kicks off** (`nohup bash -c "..." > /var/log/aws-onboard-startup.log &`).
   Everything after this runs detached, so the setup script can finish
   immediately and the learner isn't blocked waiting on it.

3. **The shared AWS build runs first** — clones the whole `26x-course`
   repo, `cd`s into the shared `terraform/` folder, and does a normal
   `terraform init/plan/apply`. Builds the actual AWS infrastructure
   (the tagged `crm` app, VPC, EC2, S3).

4. **A defensive re-clean of `AUTOACCOUNT_SAAPIKEY_*`/`TENANT_ID`
   happens first** inside the subshell (see bug #3 below) — don't
   trust that values exported earlier in the parent script survive
   into this `nohup bash -c` child untouched.

5. **A preflight wait-loop polls the real OAuth token endpoint**
   (`POST /api/v1/authenticate`) until it returns `200`, up to 30
   attempts / 5 minutes, before ever handing credentials to Terraform
   (see bug #4 below).

6. **The isolated onboarding config runs** —
   `cd /root/26x-course/terraform-cloudsecure-aws` (own state, own
   lock file, entirely separate from step 3):
   ```
   terraform init -input=false
   terraform plan -out=tfplan -input=false \
     -var "illumio_cloudsecure_client_id=$AUTOACCOUNT_SAAPIKEY_KEYID" \
     -var "illumio_cloudsecure_client_secret=$AUTOACCOUNT_SAAPIKEY_SECRET"
   terraform apply -input=false -auto-approve tfplan
   ```
   Creates: an IAM role (`aws-onboard-testRole`), its inline read +
   protection policies (matching the real CFT's policy content — see
   below), a `SecurityAudit` attachment, a random external ID, and the
   `illumio-cloudsecure_aws_account` resource itself.

7. **The `cloud_credentials` registration call replays** (see "The
   missing piece" below) — this is what actually activates the role
   for CloudSecure to assume and start collecting.

8. **A Security Review auto-approve retry loop runs** (up to 40
   attempts / 10 minutes) — see "Security Review" below for why this
   turned out not to matter for what the exam actually needs, but is
   still wired up since it's harmless and may matter for a future
   enforcement-related task.

9. **Verification, two independent ways:** Terraform's own apply
   output, and `check-cloud` (built in step 1) hitting the CloudSecure
   API directly — confirming Illumio's own backend agrees the account
   is onboarded, not just that Terraform *says* it ran successfully.

## Where this came from

Not something researched cold. Nathan recalled a colleague's lab that
auto-onboards cloud accounts and had it pulled (`instruqt track pull
grsxrhaf37xt`, saved to `CX-NEW/Illumivers lab example aug 2026/` —
**not** committed to this repo, see security note below). Its
`setup-cloud-client` referenced Terraform variables named
`illumio_cloudsecure_client_id`/`client_secret` and `cd`'d into a
Terraform folder from `jdschmitz15/illumio-instruqt-terraform-template`
(a repo already used elsewhere in this course for the magic-link
tile). Cloning that repo and reading its `aws/provider.tf` and
`aws/aws_account_onboarding.tf` revealed:

```hcl
illumio-cloudsecure = {
  source  = "illumio/illumio-cloudsecure"
  ...
}
module "aws_account_onboarding" {
  source = "illumio/cloudsecure/illumio//modules/aws_account"
  ...
}
```

That `source = "<namespace>/<name>"` syntax **is itself the Terraform
Registry address** — providers/modules resolve from
`registry.terraform.io` by default. So reading those two lines
confirmed directly this is a real, published, first-party Illumio
integration:
- Provider: https://registry.terraform.io/providers/illumio/illumio-cloudsecure/latest
- Module: https://registry.terraform.io/modules/illumio/cloudsecure/illumio/latest

The underlying source code (needed to actually debug the bugs below)
came from the module's GitHub repo,
`github.com/illumio/terraform-illumio-cloudsecure`, and the
provider's own repo,
`github.com/illumio/terraform-provider-illumio-cloudsecure`.

## What didn't work first (and why it's a dead end, not a bug to fix)

Before finding the Terraform path, we tried reverse-engineering the
Console's browser-based **Cloud → Onboarding → Add AWS** wizard by
capturing its network calls in Chrome DevTools. Found the real
account-creation call (`POST cloud.illum.io/add`), but its request
payload is **encrypted client-side** before it ever leaves the
browser — not just session-cookie protected. That's almost certainly a
deliberate security control on service-account credential creation
(the token that gets embedded in an AWS IAM trust policy), not an
undocumented API waiting to be found. Correctly abandoned — same
category as local user creation being restricted to session auth,
found earlier in this course's build.

## The missing piece: `cloud_credentials` registration (found 2026-09-03)

Getting `terraform apply` to succeed (account shows
`status: ONBOARDING_COMPLETE`) turned out **not** to be enough —
`roleArn` stayed empty and inventory never populated, no matter how
long we waited. The fix came from downloading the *real*
CloudFormation template the Console's own "Add AWS Cloud Organization"
wizard generates (**Cloud → Onboarding → Add AWS → Download
CloudFormation Stack**) and reading it directly.

That CFT deploys a Lambda-backed Custom Resource whose entire job,
after the IAM role exists, is one REST call:
`POST /api/v1/integrations/cloud_credentials` with
`{account_id, role_arn, external_id, type: "AWSRole"}`. That's what
actually activates the role for CloudSecure to assume and start
collecting — a completely separate step from the Terraform provider's
own `illumio-cloudsecure_aws_account` resource, which apparently
creates the account record but doesn't perform this activation itself.

`terraform-cloudsecure-aws/main.tf` now creates the IAM role directly
(rather than letting the module generate an internal role with a
random external ID we could never retrieve), exposes `role_arn` /
`role_external_id` / `aws_account_id` as outputs, and
`setup-cloud-client` replays that exact registration call after apply,
using the same SAAPIKEY Basic auth already proven to work against
every other CloudSecure REST endpoint in this project. Confirmed
`200 {}` response, matching what the CFT's own Lambda code checks for
(`if r.getcode() == 200`).

The extra CFT resources (Lambda, its execution role, the
`Initialize`-state Custom Resource) are pure CloudFormation delivery
mechanism — plumbing needed only because CloudFormation itself can't
make an arbitrary HTTPS call without a Lambda. They don't represent
extra state or permissions Illumio's backend needs; replicating the
one real API call was sufficient.

## Security Review — investigated, turned out NOT to be the blocker

Initially looked like Security Review approval (**Cloud → Security
Review**) was gating inventory collection: on one run, approving it
manually via the UI was followed by inventory appearing 49 seconds
later — looked causal. A second full run disproved that: inventory
appeared after ~15 minutes with Security Review still sitting at
`PENDING`, never approved. Confirmed directly in the Console too — Tag
to Label Mapping and Application Discovery were both fully usable with
Security Review still unapproved. **Security Review is unrelated to
inventory, tag mapping, or discovery** — it looks like it only governs
whether Illumio is allowed to *write* security group changes back to
AWS (the `protection` IAM policy), not read-side visibility. The
original 49-second correlation was coincidence — the approval click
happened to land in the same natural ~15-25 min window inventory was
already about to appear in regardless.

Practical effect: since Task 10 (create a discovery rule) is a
read/labeling-side action, **it doesn't need Security Review automated
at all**. The auto-approve step is still wired into `setup-cloud-client`
(harmless, and may matter for a future task needing actual cloud-side
enforcement), but isn't load-bearing for what this prototype set out to
solve.

The real Console call for approval was captured and confirmed
callable via the same SAAPIKEY Basic auth as everything else
(`POST /api/v1/security_review/approve` with
`{account_id, cloud, enable_account_rw, security_review_status}`) — a
request against an *already-approved* account correctly returned `406
"security review already completed"` rather than an auth error,
proving the auth path itself works. However, live automated testing
kept hitting `500 "failed to set ruleset summaries"` on a fresh,
not-yet-approved account. Root cause traced to AWS sandbox account
**reuse**: Instruqt appears to draw the underlying AWS account from a
small recycled pool (confirmed — two different Illumio orgs/tenants on
two different track launches both got handed AWS account
`869935077306`), and approving Security Review again for an AWS
account number that already has completed-review history under a
*different* tenant appears to hit a genuine backend conflict. Not
something fixable from our side; worth flagging to the platform team
separately, but not blocking since it's not load-bearing for the exam.

## Tag-to-Label Mapping / Application Discovery — confirmed, no extra automation needed

Directly tested end to end: once inventory exists, the Discovery Rule
flow works exactly as designed and resolves fast.

- **Console path**: Cloud → Application Discovery → Discovery Rules →
  Add. Fields: Rule Name, optional Application Prefix, Rule Type
  (`Cloud Tags`), Cloud Tag Keys (populated from tags Illumio has
  already indexed off the account — this is why it stays empty until
  inventory has synced), Auto Approve toggle.
- **Real request captured**:
  `POST /api/v1/discovery_rules` with
  ```json
  {
    "auto_approve_applications": true,
    "name": "x",
    "prefix": "",
    "rule_type": "TAG",
    "tag_keys": [{"cloud": "aws", "key": "app"}]
  }
  ```
- **Result timing**: the discovery rule and the resulting Application
  Definition (`name: "crm"`, matched from the tag value) both showed
  up via `GET /discovery_rules` and `POST /application_definitions`
  within **2 seconds** of saving the rule. `discovery_state: "QUEUED"`
  and `approved: false` initially — full `deployment` status takes
  longer (untested how much longer) — but for a check-cloud-client's
  purposes, confirming the rule + a matching Application Definition
  exist is enough to prove the learner did it correctly, well within
  normal exam-task latency.

This directly answers the question this prototype was investigating
via the colleague's pulled reference lab (which didn't cover any of
this): none of the CloudSecure Terraform module family, nor the
colleague's lab, automate tag-mapping/discovery/deployment — but they
also don't need to be automated, since they resolve in seconds once
inventory exists, and inventory itself is what actually needed the
background head-start.

## Bugs found and fixed getting this working

1. **`AccessDeniedException` on `organizations:DescribeOrganization`.**
   The module's default behavior auto-detects AWS Organization
   structure via a data source lookup, which fails on a standalone
   (non-Organization) sandbox account — confirmed live in the Console
   wizard this account uses "Account" mode, not "Organization" mode.
   Fixed by setting `organization_id = "standalone"` explicitly.
2. **`Unsupported argument: organization_id`.** The version constraint
   (`~>1.5.3`, copied from the colleague's older working example)
   predates the `organization_id` variable entirely — only added in
   `v1.7.0`. Bumped the constraint.
3. **`oauth2: invalid_client` from a corrupted credential, not a real
   auth failure (2026-09-03).** Terraform's own OAuth request was
   failing, but the *same* credentials worked fine via a direct manual
   `curl`. `set -x` tracing eventually revealed why: `client_id`/
   `client_secret` were still JSON-array-wrapped (literal
   `["value"]`) inside the `nohup bash -c "..."` subshell, despite
   being cleaned earlier in the parent script — something reintroduces
   the raw value across that subshell boundary. Fixed by re-cleaning
   `AUTOACCOUNT_SAAPIKEY_KEYID`/`SECRET`/`TENANT_ID` locally, right at
   the top of the subshell, rather than trusting inheritance across
   it. This was very likely the real cause of the original
   "worked yesterday, failed today" failures too, not credential
   propagation delay as first suspected.
4. **Freshly-minted SAAPIKEY rejected for a short window.** Even after
   fix #3, a brand-new SAAPIKEY could still get `invalid_client` for a
   short time before Illumio's backend fully activates it. Added a
   preflight wait-loop polling `/api/v1/authenticate` before handing
   credentials to Terraform at all.
5. **`Invalid count argument` on the module's internal
   `aws_partition`/`random_password` resources.** The module uses
   `count = local.use_existing_role ? 0 : 1` internally; feeding it a
   `role_arn` that depends on a resource in the *same* apply
   (`aws_iam_role.cloudsecure_role.arn`, not known until after apply)
   makes that count unresolvable at plan time. Fixed by calling the
   underlying `illumio-cloudsecure_aws_account` resource directly
   instead of going through the module at all — we already create and
   tag our own role, so the module's role-creation path was never
   used anyway.

## Security note

The pulled colleague-lab reference (`CX-NEW/Illumivers lab example aug
2026/`) contains a live, hardcoded GitHub Personal Access Token
embedded in two `git clone` URLs — noted while reading through it for
this prototype's own research, not something this lab did anything
with. It was never used here. That folder is deliberately kept outside
this git repo (and outside `26x-course` entirely) so it's never at risk
of being committed or pushed.

Separately: this repo (`26x-course`) is currently public. Worth
considering later whether it should be made private, with fixed/scoped
keys for whatever needs repo access — not an issue specific to this
prototype, just a general point worth revisiting at some stage.

## Open next steps

- Apply this same background-automation pattern to the actual Select
  Exam's `track_scripts/setup-cloud-client`, once ready to wire it in
  for real (currently only proven in this standalone prototype).
- Decide whether to keep this track around longer-term as a dedicated
  AWS build/test lab for exploring further automation (tag-to-label
  mapping rules, deployments, application discovery configuration) —
  floated as an idea, not yet decided.
- Flag the Security Review `500 "failed to set ruleset summaries"`
  AWS-account-reuse collision to the platform team, separate from this
  prototype's own scope.
