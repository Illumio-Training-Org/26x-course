# 26.x Terraform build

Trimmed from `Illumio-Training-Org/policycloud` (originally 7 EC2 / 3
subnets / 5 role-based SGs) down to the 26.x base-lab spec: **4 EC2
instances, 1 VPC, 2 subnets, 2 role-based security groups**.

- `app1` — Dev environment, Web + DB pair
- `app2` — Prod environment, Web + DB pair

Same patterns as the source repo: shared SSH keypair generated at apply
time (`my-keypair.pem`), an S3 bucket for flow logs, static private IPs,
Amazon Linux 2023 via SSM parameter, `t3a.nano` instances, SSH-only
security groups (open ingress on 22, matching the source lab's convention
for training environments).

`app1`/`app2` naming is a placeholder — easy to rename once day-specific
scenario naming is finalized (the existing `policycloud` used app names
like `crm`/`finance`; this course's agenda references scenario names like
`Ordering`/`Payment` per day, which get applied at the Illumio label layer
via tag-to-label mapping, not necessarily as the raw AWS tag value).

**Dropped from the source repo**: the `staging` subnet/environment and its
`nagios` monitoring instance (not part of the 4-EC2 spec — see project
memory `26x_architecture_decisions` for the still-open "jumphost" question
this affects), the `compliance` tag field (unused elsewhere), and the
vestigial `variables.tf`/`labels.tf` files (both empty/commented-out in
the source).
