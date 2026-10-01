output "deployment_id" {
    value = jsondecode(terracurl_request.post_request.response).id
    description = "Deployment UUID"
}

output "api_debug_response" {
    value = terracurl_request.post_request.response
}