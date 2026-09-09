#!/bin/bash
#
# Installs and starts a real MariaDB server on a crm-*-db instance
# (Amazon Linux 2023), listening on 0.0.0.0:3306, with a lab
# database/user for the matching web instance to connect to. Run via
# ssh from setup-cloud-client, not part of the shared terraform/
# build's user_data (that build is also used by Course Lab and Select
# Exam, so this stays isolated to this track's own provisioning step).
#
# NOT YET LIVE-TESTED - package name (mariadb105-server) and config
# path (/etc/my.cnf.d/mariadb-server.cnf) are AL2023's current
# defaults as of this writing; verify on first real run.

set -ex

DB_PASS='CrmLabPass123!'

sudo dnf install -y mariadb105-server || sudo dnf install -y mariadb-server
sudo systemctl enable --now mariadb

sudo mysql -e "CREATE DATABASE IF NOT EXISTS crmdb;"
sudo mysql -e "CREATE USER IF NOT EXISTS 'crmuser'@'%' IDENTIFIED BY '${DB_PASS}';"
sudo mysql -e "GRANT ALL PRIVILEGES ON crmdb.* TO 'crmuser'@'%';"
sudo mysql -e "FLUSH PRIVILEGES;"

CNF=/etc/my.cnf.d/mariadb-server.cnf
if [ -f "$CNF" ] && grep -q '^bind-address' "$CNF"; then
  sudo sed -i 's/^bind-address.*/bind-address=0.0.0.0/' "$CNF"
else
  printf '[mysqld]\nbind-address=0.0.0.0\n' | sudo tee -a "$CNF" > /dev/null
fi

sudo systemctl restart mariadb
echo "db-setup.sh complete"
