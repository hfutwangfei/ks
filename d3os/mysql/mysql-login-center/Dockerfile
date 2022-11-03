FROM mysql:5.7

ENV mysql_allow_empty_password yes

COPY setup.sh /mysql/setup.sh
COPY sql/* /mysql/sql/
COPY my.cnf /etc/mysql/conf.d/docker.cnf

CMD ["sh", "/mysql/setup.sh"]
