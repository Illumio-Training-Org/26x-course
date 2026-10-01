variable "crystal_api_key" {
  description = "API Key for use in the x-api-key header for authentication"
  type        = string
  sensitive   = true
}

variable "name" {
  description = "What to name the Deployment"
  type = string
  sensitive = false
}

variable "crystal_base_url" {
  description = "Base URL to API endpoint"
  type = string
  sensitive = false
}

variable "pce_api_user" {
  description = "API key User ID (eg, api_*)"
  type = string
  sensitive = false
   
}

variable "pce_api_secret" {
  description = "Secret for API key"
  type = string
  sensitive = true
}

variable "org_id" {
  description = "Org ID of PCE tenant"
  type = number
  sensitive = false
}

variable "template_name" {
  description = "Name of Vensim template to use"
  type = string
  sensitive = false
}

variable "pce_fqdn" {
  description = "FQDN of the PCE instance"
  type = string
  sensitive = false
}