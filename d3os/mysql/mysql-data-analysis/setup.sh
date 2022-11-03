#!/bin/bash
set -e

echo "service mysql status"

echo 'starting mysql....'
service mysql start

sleep 1

echo "service mysql status"

echo 'dataease.sql importing....'
mysql < /mysql/sql/dataease.sql
echo 'dataease.sql imported....'

sleep 1

echo 'privileges.sql importing....'
mysql < /mysql/sql/privileges.sql
echo 'privileges.sql imported....'

sleep 1

echo "service mysql status"
echo "success!"

tail -f /dev/null
