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

# Calls the underlying provider resource directly instead of going through
# the illumio/cloudsecure/illumio//modules/aws_account module - the module
# uses `count = local.use_existing_role ? 0 : 1` internally to decide
# whether to create its own role, and that expression can't be resolved at
# plan time when role_arn is fed a value that depends on a resource in the
# SAME apply (aws_iam_role.cloudsecure_role.arn isn't known until after
# apply), producing a hard "Invalid count argument" error - live-observed
# 2026-09-03. Since we already create and tag our own role above (matching
# the CFT's exact policy content) and never use any of the module's own
# role-creation logic, calling the resource directly avoids the module's
# count entirely and is simpler besides.
# -----------------------------------------------------------------
# TRAFFIC GENERATION + FLOW LOG DELIVERY - live-verified 2026-09-07
# against org 4138914/4138915. The base terraform/ build's crm app
# only allows SSH (22) between instances, so no real traffic exists
# for Flow Logs to ever capture. Opens the two ports needed for
# realistic contrived traffic (internet->web HTTPS, web->db MySQL)
# and creates the VPC Flow Log delivering to S3 (already has a bucket
# for this, aws_s3_bucket.illumio_flows in the shared terraform/
# build - originally named "...forflows" before trimming). Data
# sources reference the shared terraform/ build's VPC/SGs by name/tag
# rather than a cross-state reference, keeping this config's
# isolation from the shared build intact (see the file-level comment
# above for why that isolation matters).
#
# DELIBERATELY STOPS SHORT of CloudSecure's "Flow Log Access" grant
# (Cloud -> Onboarding -> Flow Log Access) - the actual track record
# across every attempt so far (2026-09-07 through 2026-09-09) is:
#   - Terraform-automated grant: org 4138915 (4h), org 4138968 (3h+) -
#     ZERO traffic both times, no exception, ever.
#   - Manual Console wizard/CFT: org 4138919 (1h24m, zero), org
#     4138964 (~1hr, SUCCESS - 204 real flow rows in Map/Traffic
#     explorer).
# This was briefly re-automated 2026-09-09 (commit d09784a) on the
# theory that both methods showed equal timing variance - that theory
# doesn't survive the org 4138968 result. The automated grant is 0/2
# forever; the manual wizard is 1/2. Best working theory: the wizard's
# CloudFormation stack includes a Lambda "eventual consistency check"
# that may actually notify CloudSecure's backend to start polling S3 -
# something the Terraform resource's plain API call may not trigger.
# Not confirmed, but manual is the only method with any track record
# of success, so it stays manual until proven otherwise. Re-add the
# flow_logs_list/flow_logs_read policies and the
# illumio-cloudsecure_aws_flow_logs_s3_bucket resource (removed here,
# see commit d09784a) only if new evidence changes this again.
# -----------------------------------------------------------------
data "aws_vpc" "lab" {
  tags = {
    Name = "illumio_lab"
  }
}

data "aws_security_group" "web_sg" {
  name = "web_sg"
}

data "aws_security_group" "db_sg" {
  name = "db_sg"
}

resource "aws_security_group_rule" "web_https_ingress" {
  type              = "ingress"
  from_port         = 443
  to_port           = 443
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = data.aws_security_group.web_sg.id
  description       = "Inbound HTTPS from the internet - real traffic for CloudSecure flow log ingestion testing"
}

resource "aws_security_group_rule" "db_mysql_ingress" {
  type                     = "ingress"
  from_port                = 3306
  to_port                  = 3306
  protocol                 = "tcp"
  source_security_group_id = data.aws_security_group.web_sg.id
  security_group_id        = data.aws_security_group.db_sg.id
  description              = "Inbound MySQL from the web tier only - real traffic for CloudSecure flow log ingestion testing"
}

# Live-verified 2026-09-07: this exact field list (V2+V3+V4+V5
# attributes, AWS's standard order) matches Illumio's documented
# custom-format requirement for CloudSecure ingestion. Terraform
# requires doubling '$' to escape its own interpolation syntax and
# emit a literal '${...}' in the log format string.
resource "aws_flow_log" "vpc_flow_logs" {
  vpc_id                   = data.aws_vpc.lab.id
  traffic_type             = "ALL"
  log_destination_type     = "s3"
  log_destination          = "arn:aws:s3:::${var.s3_bucket_name}/flow-logs/"
  max_aggregation_interval = 60
  log_format               = "$${version} $${account-id} $${interface-id} $${srcaddr} $${dstaddr} $${srcport} $${dstport} $${protocol} $${packets} $${bytes} $${start} $${end} $${action} $${log-status} $${vpc-id} $${subnet-id} $${instance-id} $${tcp-flags} $${type} $${pkt-srcaddr} $${pkt-dstaddr} $${region} $${az-id} $${sublocation-type} $${sublocation-id} $${pkt-src-aws-service} $${pkt-dst-aws-service} $${flow-direction} $${traffic-path}"

  destination_options {
    file_format = "plain-text"
  }
}

resource "illumio-cloudsecure_aws_account" "account" {
  account_id = data.aws_caller_identity.current.account_id
  mode       = "ReadWrite"
  name       = "${var.account_name_prefix} Account"

  # This is a standalone Instruqt sandbox AWS account, not part of a real
  # AWS Organization - the calling identity gets AccessDeniedException on
  # organizations:DescribeOrganization (live-verified 2026-09-02). Setting
  # organization_id explicitly skips that data lookup entirely.
  organization_id = "standalone"

  role_arn         = aws_iam_role.cloudsecure_role.arn
  role_external_id = random_password.role_external_id.result
}
