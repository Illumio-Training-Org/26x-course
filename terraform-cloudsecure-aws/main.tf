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
  version         = "~>1.5.3"
  name            = "${var.account_name_prefix} Account"
  iam_name_prefix = var.account_name_prefix
  tags = {
    Name  = "CloudSecure Account Policy"
    Owner = "26.x AWS Automated Onboard Testing prototype"
  }
}
