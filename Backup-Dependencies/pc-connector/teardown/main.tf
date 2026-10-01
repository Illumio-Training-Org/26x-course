terraform {
  required_providers {
    terracurl = {
        source = "devops-rob/terracurl"
        version = "2.0.0"
    }
  }
}

resource "terracurl_request" "post_request" {
    name = "post_request"
    url = "${var.crystal_base_url}/api/deployment/${var.deployment_id}/stop"
    method = "POST"

    headers = {
        x-api-key = var.crystal_api_key
    }

    request_body = jsonencode({})
    response_codes = [200]
    skip_read = true
}