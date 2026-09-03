# Prototype: automate AWS -> Illumio Cloud onboarding via Terraform
# instead of the browser-based Cloud -> Onboarding -> Add AWS wizard.
#
# IMPORTANT (found 2026-09-03, live-tested): the wizard's own flow does NOT
# rely solely on the illumio-cloudsecure Terraform provider's account
# resource to activate inventory collection. It downloads/auto-runs a real
# CloudFormation stack (confirmed against a template pulled directly from
# the Console: 'Add AWS Cloud Organization' -> Download CloudFormation
# Stack) whose Lambda-backed custom resource makes a SEPARATE REST call -
# POST https://cloud.illum.io/api/v1/integrations/cloud_credentials with
# {account_id, role_arn, external_id, type: "AWSRole"} - after the IAM role
# exists. That call is what actually registers the role/external_id pair
# CloudSecure uses to assume into the account and start collecting
# inventory. Without it, illumio-cloudsecure_aws_account still reports
# status ONBOARDING_COMPLETE, but roleArn stays empty and inventory never
# populates, no matter how long you wait - not a propagation delay, a
# missing registration step.
#
# So this config creates the IAM role itself (rather than letting the
# module generate one internally with a random external ID we could never
# retrieve), matching the CFT's own role/policy content for parity, and
# exposes role_arn/role_external_id as outputs so track_scripts/
# setup-cloud-client can replay that same cloud_credentials REST call
# after apply - replicating exactly what the CFT's Lambda does, using the
# same SAAPIKEY Basic auth already proven to work against every other
# CloudSecure REST endpoint in this project.
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

data "aws_caller_identity" "current" {}

data "aws_partition" "current" {}

# The account CloudSecure uses to assume into a customer's AWS account -
# same value the module defaults illumio_cloudsecure_account_id to, and
# confirmed to match the CFT's own trust principal
# (arn:${AWS::Partition}:iam::712001342241:root).
locals {
  illumio_cloudsecure_account_id = "712001342241"
}

resource "random_password" "role_external_id" {
  length      = 36
  special     = false
  upper       = false
  min_numeric = 6
}

resource "aws_iam_role" "cloudsecure_role" {
  name = "${var.account_name_prefix}Role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          AWS = "arn:${data.aws_partition.current.partition}:iam::${local.illumio_cloudsecure_account_id}:root"
        }
        Action = "sts:AssumeRole"
        Condition = {
          StringEquals = {
            "sts:ExternalId" = random_password.role_external_id.result
          }
        }
      }
    ]
  })
  tags = {
    Name  = "CloudSecure Account Policy"
    Owner = "26.x AWS Automated Onboard Testing prototype"
  }
}

resource "aws_iam_role_policy_attachment" "security_audit" {
  role       = aws_iam_role.cloudsecure_role.name
  policy_arn = "arn:aws:iam::aws:policy/SecurityAudit"
}

# Matches the CFT's IllumioCloudAWSIntegrationPolicy exactly (including
# memorydb:ListTagsForResource, missing from the Terraform module's own
# built-in read policy - confirmed by diffing against the real CFT
# downloaded from the Console's 'Add AWS Cloud Organization' wizard).
resource "aws_iam_role_policy" "read" {
  name = "${var.account_name_prefix}Policy"
  role = aws_iam_role.cloudsecure_role.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Resource = "*"
        Action = [
          "apigateway:GET",
          "autoscaling:Describe*",
          "cloudtrail:DescribeTrails",
          "cloudtrail:GetTrailStatus",
          "cloudtrail:LookupEvents",
          "cloudwatch:Describe*",
          "cloudwatch:Get*",
          "cloudwatch:List*",
          "codedeploy:List*",
          "codedeploy:BatchGet*",
          "directconnect:Describe*",
          "docdb-elastic:GetCluster",
          "docdb-elastic:ListTagsForResource",
          "dynamodb:List*",
          "dynamodb:Describe*",
          "ec2:Describe*",
          "ec2:SearchTransitGatewayMulticastGroups",
          "ecs:Describe*",
          "ecs:List*",
          "eks:DescribeAddon",
          "eks:ListAddons",
          "elasticache:Describe*",
          "elasticache:List*",
          "elasticfilesystem:DescribeAccessPoints",
          "elasticfilesystem:DescribeFileSystems",
          "elasticfilesystem:DescribeTags",
          "elasticloadbalancing:Describe*",
          "elasticmapreduce:List*",
          "elasticmapreduce:Describe*",
          "es:ListTags",
          "es:ListDomainNames",
          "es:DescribeElasticsearchDomains",
          "fsx:DescribeFileSystems",
          "fsx:ListTagsForResource",
          "health:DescribeEvents",
          "health:DescribeEventDetails",
          "health:DescribeAffectedEntities",
          "kinesis:List*",
          "kinesis:Describe*",
          "lambda:GetPolicy",
          "lambda:List*",
          "logs:TestMetricFilter",
          "logs:DescribeSubscriptionFilters",
          "organizations:Describe*",
          "organizations:List*",
          "rds:Describe*",
          "rds:List*",
          "redshift:DescribeClusters",
          "redshift:DescribeLoggingStatus",
          "route53:List*",
          "s3:GetBucketLogging",
          "s3:GetBucketLocation",
          "s3:GetBucketNotification",
          "s3:GetBucketTagging",
          "s3:ListAllMyBuckets",
          "sns:List*",
          "sqs:ListQueues",
          "states:ListStateMachines",
          "states:DescribeStateMachine",
          "support:DescribeTrustedAdvisor*",
          "support:RefreshTrustedAdvisorCheck",
          "tag:GetResources",
          "tag:GetTagKeys",
          "tag:GetTagValues",
          "xray:BatchGetTraces",
          "xray:GetTraceSummaries",
          "networkmanager:ListCoreNetworks",
          "networkmanager:GetCoreNetwork",
          "networkmanager:ListAttachments",
          "networkmanager:GetVpcAttachment",
          "networkmanager:GetSiteToSiteVpnAttachment",
          "networkmanager:GetConnectAttachment",
          "networkmanager:GetTransitGatewayRouteTableAttachment",
          "networkmanager:ListPeerings",
          "networkmanager:GetTransitGatewayPeering",
          "networkmanager:GetTransitGatewayRegistrations",
          "memorydb:ListTagsForResource"
        ]
      }
    ]
  })
}

# Matches the CFT's IllumioCloudAWSProtectionPolicy exactly (including
# ec2:CreateSecurityGroup/DeleteSecurityGroup/DescribeSecurityGroups,
# missing from the Terraform module's own built-in protection policy).
resource "aws_iam_role_policy" "protection" {
  name = "${var.account_name_prefix}ProtectionPolicy"
  role = aws_iam_role.cloudsecure_role.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Sid    = "IllumioEC2Access"
        Resource = [
          "arn:aws:ec2:*:*:security-group-rule/*",
          "arn:aws:ec2:*:*:security-group/*",
          "arn:aws:ec2:*:*:network-acl/*",
          "arn:aws:ec2:*:*:vpc/*",
          "arn:aws:ec2:*:*:network-interface/*"
        ]
        Action = [
          "ec2:AuthorizeSecurityGroupIngress",
          "ec2:RevokeSecurityGroupIngress",
          "ec2:UpdateSecurityGroupRuleDescriptionsIngress",
          "ec2:AuthorizeSecurityGroupEgress",
          "ec2:RevokeSecurityGroupEgress",
          "ec2:UpdateSecurityGroupRuleDescriptionsEgress",
          "ec2:ModifySecurityGroupRules",
          "ec2:DescribeTags",
          "ec2:CreateTags",
          "ec2:DeleteTags",
          "ec2:DescribeNetworkAcls",
          "ec2:CreateNetworkAclEntry",
          "ec2:ReplaceNetworkAclEntry",
          "ec2:DeleteNetworkAclEntry",
          "ec2:ModifyNetworkInterfaceAttribute",
          "ec2:CreateSecurityGroup",
          "ec2:DeleteSecurityGroup",
          "ec2:DescribeSecurityGroups"
        ]
      }
    ]
  })
}

module "aws_account_onboarding" {
  source  = "illumio/cloudsecure/illumio//modules/aws_account"
  version = ">=1.7.0"
  name    = "${var.account_name_prefix} Account"

  # This is a standalone Instruqt sandbox AWS account, not part of a real
  # AWS Organization - the calling identity gets AccessDeniedException on
  # organizations:DescribeOrganization (live-verified 2026-09-02). Setting
  # organization_id explicitly skips that data lookup entirely.
  organization_id = "standalone"

  # Use the role we created above (matching the CFT's exact policy
  # content) instead of letting the module generate its own internal role
  # + random external ID that we'd have no way to retrieve afterwards.
  role_arn         = aws_iam_role.cloudsecure_role.arn
  role_external_id = random_password.role_external_id.result

  tags = {
    Name  = "CloudSecure Account Policy"
    Owner = "26.x AWS Automated Onboard Testing prototype"
  }
}
