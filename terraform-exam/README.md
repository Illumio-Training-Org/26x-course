# terraform-exam — automated AWS → Illumio Cloud onboarding (Select Exam)

Terraform that onboards a sandbox's AWS account to Illumio CloudSecure
without the browser wizard. It runs **after** the shared `../terraform/`
build (the `crm` app, VPC and flows S3 bucket) and is cloned at boot by the
tracks that need an already-onboarded account:

- `! 26.x Select Exam` (current) and `! 26.x Superseded: Select Exam` —
  background job in `setup-cloud-client`, so Task 10 has an onboarded
  account.
- `! 26.x Test: Select Exam (ES)` / `(JA)`.
- `! 26.x Test: AWS Automated Onboard Testing` — the prototype this came
  from (its own `README.md` has the full investigation).

## What it creates

- An IAM role for CloudSecure (`SecurityAudit` plus read/protection
  policies) with a random external ID — created here rather than by the
  provider so the role ARN and external ID can be output.
- VPC Flow Logs from the lab VPC to the existing flows S3 bucket, plus
  web/db security-group rules for test traffic.
- The `illumio-cloudsecure_aws_account` registration.

## The extra step the calling script does

The provider resource alone reports `ONBOARDING_COMPLETE` but inventory
never appears. The calling script therefore replays the call the wizard's
CloudFormation Lambda makes —
`POST https://cloud.illum.io/api/v1/integrations/cloud_credentials` with
the role ARN, external ID and account ID from this module's outputs.

## Inputs

| Variable | Set from |
|---|---|
| `illumio_cloudsecure_client_id` | `$AUTOACCOUNT_SAAPIKEY_KEYID` |
| `illumio_cloudsecure_client_secret` | `$AUTOACCOUNT_SAAPIKEY_SECRET` |
| `s3_bucket_name` | read from `../terraform`'s state (`aws_s3_bucket.illumio_flows`) |
| `account_name_prefix` | default, keeps names unique per sandbox |

Known issue: Flow Log Access (traffic from AWS) is unreliable on the
ephemeral trial tenants, so granting it is left as a manual step — see the
platform issues report.
