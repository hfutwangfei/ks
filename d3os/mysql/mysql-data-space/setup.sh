#!/bin/bash
set -e

echo "service mysql status"

echo 'starting mysql....'
service mysql start

sleep 1

echo "service mysql status"

echo 'datathread.sql importing....'
mysql < /mysql/sql/datathread.sql
echo 'datathread.sql imported....'

sleep 1

echo 'privileges.sql importing....'
mysql < /mysql/sql/privileges.sql
echo 'privileges.sql imported....'

sleep 1

echo "service mysql status"
echo "success!"

tail -f /dev/null
