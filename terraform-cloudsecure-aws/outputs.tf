output "role_id" {
  description = "The IAM role id Illumio's account-onboarding module created and linked, for verification."
  value       = module.aws_account_onboarding.role_id
}
