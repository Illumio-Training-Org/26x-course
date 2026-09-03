output "role_arn" {
  description = "ARN of the IAM role granted to CloudSecure. Needed to replay the cloud_credentials registration call (see main.tf) - the module's own role_id output isn't enough since it's the short role ID, not an ARN, when the module manages the role itself."
  value       = aws_iam_role.cloudsecure_role.arn
}

output "role_external_id" {
  description = "The sts:ExternalId on the role's trust policy. Needed to replay the cloud_credentials registration call (see main.tf)."
  value       = random_password.role_external_id.result
  sensitive   = true
}

output "aws_account_id" {
  description = "The AWS account ID the role was created in. Needed to replay the cloud_credentials registration call (see main.tf)."
  value       = data.aws_caller_identity.current.account_id
}
