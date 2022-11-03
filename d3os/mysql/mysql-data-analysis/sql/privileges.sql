use mysql;

select host, user from user;

create user d3os identified by 'd3os@cosmoplat';

grant all on dataease.* to d3os@'%' identified by 'd3os@cosmoplat' with grant option;

flush privileges;
