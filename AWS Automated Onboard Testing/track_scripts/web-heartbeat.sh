#!/bin/bash
#
# Installs a MariaDB client on a crm-*-web instance (Amazon Linux
# 2023) and a systemd service that queries its own environment's db
# instance every 30s over real MySQL protocol on 3306 - so
# CloudSecure's Map/Traffic explorer has actual web->db application
# traffic to show per environment, not just internet scan noise on
# the opened SG ports. Run via ssh from setup-cloud-client, not part
# of the shared terraform/ build's user_data (that build is also used
# by Course Lab and Select Exam).
#
# Usage: web-heartbeat.sh <db-private-ip>
#
# NOT YET LIVE-TESTED - package name (mariadb105) is AL2023's current
# default as of this writing; verify on first real run.

set -ex

DB_HOST="$1"
DB_PASS='CrmLabPass123!'

if [ -z "$DB_HOST" ]; then
  echo "Usage: web-heartbeat.sh <db-private-ip>" >&2
  exit 1
fi

sudo dnf install -y mariadb105 || sudo dnf install -y mariadb

sudo tee /usr/local/bin/db-heartbeat.sh > /dev/null <<EOF
#!/bin/bash
mysql -h ${DB_HOST} -u crmuser -p'${DB_PASS}' -e 'SELECT NOW();' crmdb
EOF
sudo chmod +x /usr/local/bin/db-heartbeat.sh

sudo tee /etc/systemd/system/db-heartbeat.service > /dev/null <<'EOF'
[Unit]
Description=CRM web-to-db heartbeat traffic generator
After=network.target

[Service]
Type=simple
ExecStart=/bin/bash -c 'while true; do /usr/local/bin/db-heartbeat.sh; sleep 30; done'
Restart=always

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable --now db-heartbeat.service
echo "web-heartbeat.sh complete"
