#!/bin/bash
set -e

echo "service mysql status"

echo 'starting mysql....'
service mysql start

sleep 1

echo "service mysql status"

echo 'dt_commercialzation_test.sql importing....'
mysql < /mysql/sql/dt_commercialzation_test.sql
echo 'dt_commercialzation_test.sql imported....'

sleep 1

echo 'privileges.sql importing....'
mysql < /mysql/sql/privileges.sql
echo 'privileges.sql imported....'

sleep 1

echo "service mysql status"
echo "success!"

tail -f /dev/null
