variable "crystal_api_key" {
  description = "API Key for use in the x-api-key header for authentication"
  type        = string
  sensitive   = true
}

variable "crystal_base_url" {
  description = "Base URL to API endpoint"
  type = string
  sensitive = false
}

variable "deployment_id" {
  description = "UUID of the deployment to stop"
  type = string
  sensitive = false
}