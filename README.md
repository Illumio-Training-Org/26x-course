# 26.x Course

Illumio 26.x 5-day bootcamp (Foundation/Associate Days 1–2, Select/Specialist
Days 3–5). Each day is an independently provisioned, self-contained Instruqt
track, built fresh and torn down after use — no state carries across days.

## Structure

- `terraform/` — the shared AWS Terraform build (magic-link-driven PCE org +
  4 EC2 instances: 2 applications, each a Web/DB pair, 1 VPC, per-role
  security groups). Deliberately kept out of the `dayN/` folders so it
  doesn't interfere with each day's own Instruqt track sync.
- `day1/` … `day5/` — one Instruqt track per day, each pulling in the shared
  base lab (magic link, Terraform apply, RockyLinux + Windows VMs, k3s/CVEN)
  plus that day's own challenge content.

Content source of truth: the `Foundation & Select agenda` tab of
`26.x Structure.xlsx` (see `CX-NEW/course-structure/foundation-select-agenda-baseline.md`
in the wider CX-NEW working folder for the maintained baseline).
