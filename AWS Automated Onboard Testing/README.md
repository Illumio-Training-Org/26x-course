# AWS Automated Onboard Testing

`! 26.x AWS Automated Onboard Testing` — an internal prototype track,
not learner-facing. Tests whether AWS onboarding to Illumio Cloud can
be fully automated in the background at track boot, with **zero**
browser/Console wizard interaction, so the propagation delay a real
onboarding needs happens invisibly before an exam task ever requires
the onboarded account.

## Why this exists

The Select Exam's "onboard & ringfence a cloud application" task needs
an AWS account onboarded to Illumio Cloud before a ringfencing policy
can be built against it. The full manual pipeline (AWS onboard → tag
mapping → application discovery → deployment) has a real 20-30 minute
propagation delay, which is too much dead time to burn mid-exam.
Confirmed here: at least the AWS **account-linking** step can be
automated entirely, matching the same pattern the shared base lab
already uses for vensim and the AWS Terraform build (both also run
invisibly in the background from track start).

## Result — CONFIRMED WORKING (2026-09-02)

Live-tested end to end. `terraform apply`: 6 resources created.
`check-cloud` (queries the real Illumio CloudSecure API independently
of Terraform's own report):

```
PASS - AWS account onboarded: aws-onboard-test Account
(status: ONBOARDING_COMPLETE, security review: PENDING)
```

**Not yet proven:** this only automates account *linking*. The
separate Tag-to-Label Mapping + Application Discovery pipeline (the
~20-30 min propagation piece) is still untested — unclear whether the
same Terraform provider family covers that too.

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
   (VPC, EC2, S3). Nothing CloudSecure-related happens yet.

4. **The isolated onboarding config runs second** —
   `cd /root/26x-course/terraform-cloudsecure-aws` (own state, own
   lock file, entirely separate from step 3), then:
   ```
   terraform init -input=false
   terraform plan -out=tfplan -input=false \
     -var "illumio_cloudsecure_client_id=$AUTOACCOUNT_SAAPIKEY_KEYID" \
     -var "illumio_cloudsecure_client_secret=$AUTOACCOUNT_SAAPIKEY_SECRET"
   terraform apply -input=false -auto-approve tfplan
   ```
   The `-var` flags are the whole trick: they take credentials the
   sandbox already has (`$AUTOACCOUNT_SAAPIKEY_*`, normally only used
   for read-only CloudSecure checks) and feed them into Terraform.

5. **`provider.tf` declares two providers, two different jobs:**
   - `provider "aws"` — no explicit credentials, reuses the same
     ambient AWS credentials the shared build in step 3 already used.
   - `provider "illumio-cloudsecure"` — authenticates to Illumio's
     CloudSecure Config API via `client_id`/`client_secret`, a
     documented OAuth2 flow. Completely separate from, and unrelated
     to, the Console's browser-based Add AWS wizard (see "What didn't
     work" below).

6. **`variables.tf`** declares the two OAuth2 credential strings plus
   a cosmetic naming prefix.

7. **`main.tf`** calls the actual module:
   ```hcl
   module "aws_account_onboarding" {
     source           = "illumio/cloudsecure/illumio//modules/aws_account"
     version          = ">=1.7.0"
     name             = "${var.account_name_prefix} Account"
     iam_name_prefix  = var.account_name_prefix
     organization_id  = "standalone"
     tags = { ... }
   }
   ```
   This is a **published, official Illumio module** — not our own
   code. Under the hood it creates: an IAM role in AWS trusting
   Illumio's account, two inline IAM policies (`read` — lets Illumio
   see resources; `protection` — lets it write security groups), a
   `SecurityAudit` policy attachment, a random external ID, and
   finally the `illumio-cloudsecure_aws_account` resource — the actual
   API call that registers the account with CloudSecure. That's the 6
   resources in the apply output.

8. **Verification, two independent ways:** Terraform's own apply
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
- Provider: `registry.terraform.io/providers/illumio/illumio-cloudsecure`
- Module: `registry.terraform.io/modules/illumio/cloudsecure/illumio`

The underlying source code (needed to actually debug the two bugs
below) came from the module's GitHub repo,
`github.com/illumio/terraform-illumio-cloudsecure`.

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

## Two real bugs found and fixed getting this working

1. **`AccessDeniedException` on `organizations:DescribeOrganization`.**
   The module's default behavior auto-detects AWS Organization
   structure via a data source lookup, which fails on a standalone
   (non-Organization) sandbox account — confirmed live in the Console
   wizard this account uses "Account" mode, not "Organization" mode.
   Fixed by setting `organization_id = "standalone"` explicitly (found
   by reading the module's `main.tf` on GitHub) — the module only
   forwards this value to Illumio's API as descriptive metadata; AWS
   itself never sees it.
2. **`Unsupported argument: organization_id`.** The version constraint
   (`~>1.5.3`, copied from the colleague's older working example)
   predates the `organization_id` variable entirely. Confirmed by
   diffing git tags in the module's GitHub repo that it was only added
   in `v1.7.0`. Bumped the constraint to `>=1.7.0`.

## Security note

The pulled colleague-lab reference (`CX-NEW/Illumivers lab example aug
2026/`) contains a live, hardcoded GitHub Personal Access Token
embedded in two `git clone` URLs. It was never used here. Nathan was
told to have the colleague rotate it. That folder is deliberately kept
outside this git repo (and outside `26x-course` entirely) so it's
never at risk of being committed or pushed.

## Open next step

Check whether `illumio/terraform-illumio-cloudsecure` (or a sibling
module) covers Tag-to-Label Mapping / Application Discovery too, or
whether that part still needs the task-reordering fallback (kick off
onboarding early in an exam, put the actual ringfencing check at the
end) instead.
