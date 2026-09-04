terraform {
  required_version = ">=0.12"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    illumio-cloudsecure = {
      source  = "illumio/illumio-cloudsecure"
      version = ">= 1.0.11"
    }
  }
}

provider "illumio-cloudsecure" {
  client_id     = var.illumio_cloudsecure_client_id
  client_secret = var.illumio_cloudsecure_client_secret

  # Live-verified 2026-09-04: the account-creation call can occasionally
  # take longer than 60s on Illumio's backend, causing a hard
  # "DeadlineExceeded" apply failure at exactly the 1m00s mark. Widened
  # for headroom.
  request_timeout = "180s"
}

provider "aws" {
  region = "us-east-1"
}
