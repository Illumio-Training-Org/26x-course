terraform {
  required_providers {
    terracurl = {
        source = "devops-rob/terracurl"
        version = "2.0.0"
    }
  }
}

locals {
  create_payload = jsonencode({
    name                          = var.name,
    cloud_enabled                 = false,
    vensim_enabled                = true,
    ai_factory_enabled            = false,
    ransomware_enterprise_enabled = false
  })
  config_payload = jsonencode({
    vensim = {
      pce                   = var.pce_fqdn,
      pce_port              = 443,
      api_user              = var.pce_api_user,
      api_secret            = var.pce_api_secret,
      org_id                = var.org_id,
      disable_tls           = false,
      api_version           = 26,
      enhanced_mode         = true,
      delete_before_create  = false,
      vuln_enabled          = false,
      workloader_batch_size = 0,
      runner_id             = null
    }
  })
  template_payload = jsonencode({
    template = "${var.template_name}"
  })
  start_payload = jsonencode({
    interval = "5m",
    auto_attacks = false
  })

}

resource "terracurl_request" "post_request" {
    name = "post_request"
    url = "${var.crystal_base_url}/api/deployments"
    method = "POST"

    headers = {
        "x-api-key" = var.crystal_api_key
        "Content-Type" = "application/json"
        "Accept" = "application/json"
    }

    request_body = local.create_payload
    response_codes = [201]
    skip_read = true
}

resource "terracurl_request" "put_request" {
    name = "put_request"
    url = "${var.crystal_base_url}/api/deployments/${jsondecode(terracurl_request.post_request.response).id}/config"
    method = "PUT"
    headers = {
        "x-api-key" = var.crystal_api_key
        "Content-Type" = "application/json"
        "Accept" = "application/json"
    }
    request_body = local.config_payload
    response_codes = [200]
    skip_read = true
}

resource "terracurl_request" "template_request" {
    name = "template_request"
    url = "${var.crystal_base_url}/api/deployments/${jsondecode(terracurl_request.post_request.response).id}/vensim-template"
    method = "POST"
    headers = {
        "x-api-key" = var.crystal_api_key
        "Content-Type" = "application/json"
        "Accept" = "application/json"
    }
    request_body = local.template_payload
    response_codes = [200]
    skip_read = true

    depends_on = [ terracurl_request.put_request ]
}

resource "terracurl_request" "start_request" {
    name = "start_request"
    url = "${var.crystal_base_url}/api/deployments/${jsondecode(terracurl_request.post_request.response).id}/start"
    method = "POST"
    headers = {
        "x-api-key" = var.crystal_api_key
        "Content-Type" = "application/json"
        "Accept" = "application/json"
    }
    request_body = local.start_payload
    response_codes = [200]
    skip_read = true
    depends_on = [ terracurl_request.template_request ]
}
