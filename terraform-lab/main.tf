provider "aws" {
  region = "us-east-1"
}

###############################
# 1. Shared Key Pair
###############################
resource "tls_private_key" "example" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "aws_key_pair" "shared_key" {
  key_name   = "my-keypair"
  public_key = tls_private_key.example.public_key_openssh
}

resource "local_file" "private_key_pem" {
  content         = tls_private_key.example.private_key_pem
  filename        = "${path.module}/my-keypair.pem"
  file_permission = "0600"
}

###############################
# 1a. S3 Bucket for flows
###############################
resource "random_integer" "suffix" {
  min = 100000
  max = 999999
}

resource "aws_s3_bucket" "illumio_flows" {
  bucket        = "illumios3bucket${random_integer.suffix.result}"
  force_destroy = true

  tags = {
    Name    = "illumios3bucket"
    company = "illumio"
  }
}

###############################
# 2. Locals
###############################
locals {
  ec2_instances = {
    "crm-dev-web" = {
      app  = "crm"
      env  = "dev"
      role = "web"
    },
    "crm-dev-db" = {
      app  = "crm"
      env  = "dev"
      role = "db"
    },
    "crm-prod-web" = {
      app  = "crm"
      env  = "prod"
      role = "web"
    },
    "crm-prod-db" = {
      app  = "crm"
      env  = "prod"
      role = "db"
    }
  }

  subnet_map = {
    dev  = aws_subnet.dev_subnet.id
    prod = aws_subnet.prod_subnet.id
  }

  security_group_map = {
    web = aws_security_group.web_sg.id
    db  = aws_security_group.db_sg.id
  }

  private_ip_map = {
    "crm-dev-web"  = "10.0.1.10"
    "crm-dev-db"   = "10.0.1.20"
    "crm-prod-web" = "10.0.2.10"
    "crm-prod-db"  = "10.0.2.20"
  }
}

###############################
# 3. Networking
###############################
resource "aws_vpc" "illumio_lab" {
  cidr_block = "10.0.0.0/16"

  tags = {
    Name    = "illumio_lab"
    company = "illumio"
  }
}

resource "aws_subnet" "dev_subnet" {
  vpc_id                  = aws_vpc.illumio_lab.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "us-east-1a"
  map_public_ip_on_launch = true

  tags = {
    Name    = "dev_subnet"
    env     = "dev"
    company = "illumio"
  }
}

resource "aws_subnet" "prod_subnet" {
  vpc_id                  = aws_vpc.illumio_lab.id
  cidr_block              = "10.0.2.0/24"
  availability_zone       = "us-east-1a"
  map_public_ip_on_launch = true

  tags = {
    Name    = "prod_subnet"
    env     = "prod"
    company = "illumio"
  }
}

resource "aws_internet_gateway" "lab_ig" {
  vpc_id = aws_vpc.illumio_lab.id

  tags = {
    Name    = "lab_ig"
    company = "illumio"
  }
}

resource "aws_route_table" "dev_rt" {
  vpc_id = aws_vpc.illumio_lab.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.lab_ig.id
  }

  tags = {
    Name    = "rt_dev"
    env     = "dev"
    company = "illumio"
  }
}

resource "aws_route_table" "prod_rt" {
  vpc_id = aws_vpc.illumio_lab.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.lab_ig.id
  }

  tags = {
    Name    = "rt_prod"
    env     = "prod"
    company = "illumio"
  }
}

resource "aws_route_table_association" "dev_assoc" {
  subnet_id      = aws_subnet.dev_subnet.id
  route_table_id = aws_route_table.dev_rt.id
}

resource "aws_route_table_association" "prod_assoc" {
  subnet_id      = aws_subnet.prod_subnet.id
  route_table_id = aws_route_table.prod_rt.id
}

###############################
# 4. Security Groups (per role, SSH only)
###############################
resource "aws_security_group" "web_sg" {
  name   = "web_sg"
  vpc_id = aws_vpc.illumio_lab.id

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name    = "web_sg"
    role    = "web"
    company = "illumio"
  }
}

resource "aws_security_group" "db_sg" {
  name   = "db_sg"
  vpc_id = aws_vpc.illumio_lab.id

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name    = "db_sg"
    role    = "db"
    company = "illumio"
  }
}

###############################
# 5. AMI (Amazon Linux 2023, t3a.nano)
###############################
data "aws_ssm_parameter" "ami" {
  name = "/aws/service/ami-amazon-linux-latest/al2023-ami-kernel-default-x86_64"
}

###############################
# 6. EC2 Instances (static IPs)
###############################
resource "aws_instance" "ec2" {
  for_each = local.ec2_instances

  ami           = data.aws_ssm_parameter.ami.value
  instance_type = "t3a.nano"
  subnet_id     = local.subnet_map[each.value.env]

  private_ip = lookup(local.private_ip_map, each.key)

  vpc_security_group_ids = [
    local.security_group_map[each.value.role]
  ]

  key_name = aws_key_pair.shared_key.key_name

  tags = {
    Name     = each.key
    app      = each.value.app
    env      = each.value.env
    role     = each.value.role
    company  = "illumio"
    location = "AWS"
  }
}
