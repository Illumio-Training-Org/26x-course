variable "illumio_cloudsecure_client_id" {
  type        = string
  description = "The OAuth 2 client identifier used to authenticate against the CloudSecure Config API. Set to $AUTOACCOUNT_SAAPIKEY_KEYID at apply time."
  validation {
    condition     = length(var.illumio_cloudsecure_client_id) > 0
    error_message = "The illumio_cloudsecure_client_id value must not be empty."
  }
}

variable "illumio_cloudsecure_client_secret" {
  type        = string
  sensitive   = true
  description = "The OAuth 2 client secret used to authenticate against the CloudSecure Config API. Set to $AUTOACCOUNT_SAAPIKEY_SECRET at apply time."
  validation {
    condition     = length(var.illumio_cloudsecure_client_secret) > 0
    error_message = "The illumio_cloudsecure_client_secret value must not be empty."
  }
}

variable "account_name_prefix" {
  type        = string
  description = "Unique-ish prefix for naming the onboarded account/IAM role, so re-runs against different sandboxes don't collide."
  default     = "aws-onboard-test"
}

variable "s3_bucket_name" {
  type        = string
  description = "Name of the pre-existing S3 bucket (created by the shared terraform/ build, aws_s3_bucket.illumio_flows) that VPC Flow Logs are delivered to. Resolved at apply time via 'aws s3api list-buckets' in setup-cloud-client, since the bucket name has a random suffix and lives in a separate Terraform state."
}
