# 26.x Terraform build

Trimmed from `Illumio-Training-Org/policycloud` (originally 7 EC2 / 3
subnets / 5 role-based SGs) down to the 26.x base-lab spec: **4 EC2
instances, 1 VPC, 2 subnets, 2 role-based security groups**.

- `crm` — a single application, Web + DB pair in **both** Dev and Prod
  (`crm-dev-web`, `crm-dev-db`, `crm-prod-web`, `crm-prod-db`)

Same patterns as the source repo: shared SSH keypair generated at apply
time (`my-keypair.pem`), an S3 bucket for flow logs, static private IPs,
Amazon Linux 2023 via SSM parameter, `t3a.nano` instances, SSH-only
security groups (open ingress on 22, matching the source lab's convention
for training environments).

`crm` reuses an app name from the source `policycloud` repo (which also
had `finance` and `monitoring` apps — dropped, see below). This course's
agenda references day-specific scenario names like `Ordering`/`Payment`
too; those get applied at the Illumio label layer via tag-to-label
mapping on top of these AWS tags, not as a rename of the underlying AWS
resources.

**Dropped from the source repo**: the `finance` app (superseded — `crm`
now covers both Dev and Prod instead of splitting apps by environment),
the `staging` subnet/environment and its `nagios` monitoring instance
(not part of the 4-EC2 spec — see project memory
`26x_architecture_decisions` for the still-open "jumphost" question this
affects), the `compliance` tag field (unused elsewhere), and the
vestigial `variables.tf`/`labels.tf` files (both empty/commented-out in
the source).
