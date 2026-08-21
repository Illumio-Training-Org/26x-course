---
slug: aws-build
id: rcz0dlbkfvnr
type: challenge
title: 02 - AWS Build
teaser: Verify the shared AWS Terraform build
tabs:
- id: vdgaib4micse
  title: CloudCLI
  type: terminal
  hostname: cloud-client
  cmd: bash
- id: edtxmri1lfyy
  title: AWS
  type: service
  hostname: cloud-client
  port: 80
difficulty: ""
timelimit: 0
enhanced_loading: null
---
# 02 - AWS Build

Base lab test — verifying the shared Terraform build (`crm` Dev + `finance`
Prod, 4 EC2 total) applies cleanly and every instance is reachable.

🧩 Task 01 - Verify AWS Resources
==========

**1 )** Login to AWS using the credentials in the **AWS** tab

> [!IMPORTANT]
> Ensure the Region is set to **N. Virginia (us-east-1)**

**2 )** In the AWS Console search for **EC2** and verify **4 running instances**:
`crm-dev-web`, `crm-dev-db`, `finance-prod-web`, `finance-prod-db`

🧩 Task 02 - Verify Connectivity
==========

**1 )** Return to the **CloudCLI** tab and check the Terraform outputs

```run
cd 26x-course/terraform
terraform output
```

**2 )** SSH into the **crm-dev-web** instance

```run
ssh -o StrictHostKeyChecking=accept-new \
-i /root/.ssh/my-keypair.pem \
ec2-user@$(terraform output -json ec2_instances_info | jq -r '."crm-dev-web".public_ip')
```

**3 )** Verify Internet connectivity

```run
ping www.illumio.com -c 5
```

**4 )** Exit the shell

```run
exit
```

---

**Lab Complete**
