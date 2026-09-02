# Prototype: automate AWS -> Illumio Cloud onboarding via Terraform
# instead of the browser-based Cloud -> Onboarding -> Add AWS wizard.
#
# Modeled directly on a colleague's working example (pulled from
# Instruqt track grsxrhaf37xt into
# `CX-NEW/Illumivers lab example aug 2026/`), which uses the same
# official illumio/illumio-cloudsecure Terraform provider and
# illumio/cloudsecure/illumio Terraform module family. Kept deliberately
# separate from the shared `terraform/` folder (used by Course Lab and
# all 5 exam tracks) so this experiment can't break anything already
# working - this folder is only referenced by the "AWS Automated
# Onboard Testing" prototype track.
#
# AWS credentials come from the ambient environment (same mechanism the
# shared terraform/ build already relies on - Instruqt injects these
# into the cloud-client container via config.yml's aws_accounts block).

module "aws_account_onboarding" {
  source          = "illumio/cloudsecure/illumio//modules/aws_account"
  # v1.5.3 (the colleague example's pin) predates the organization_id
  # variable entirely - confirmed by diffing module tags in the official
  # illumio/terraform-illumio-cloudsecure repo, it was only added in
  # v1.7.0. Bumped to match.
  version         = ">=1.7.0"
  name            = "${var.account_name_prefix} Account"
  iam_name_prefix = var.account_name_prefix

  # This is a standalone Instruqt sandbox AWS account, not part of a real
  # AWS Organization - the calling identity gets AccessDeniedException on
  # organizations:DescribeOrganization (live-verified 2026-09-02). Setting
  # organization_id explicitly skips that data lookup entirely; the module
  # only forwards this value to Illumio's CloudSecure API as descriptive
  # metadata (confirmed by reading modules/aws_account/main.tf in the
  # official illumio/terraform-illumio-cloudsecure repo) - AWS itself never
  # sees it, so a placeholder is fine here. Matches the Console wizard's
  # "Account" (not "Organization") onboarding type, confirmed live.
  organization_id = "standalone"

  tags = {
    Name  = "CloudSecure Account Policy"
    Owner = "26.x AWS Automated Onboard Testing prototype"
  }
}
