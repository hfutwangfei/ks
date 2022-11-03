-- 创建数据库
create database `docker_mysql` default character set utf8 collate utf8_general_ci;

use docker_mysql;

-- 建表
drop table if exists `user`;

create table `user` (
                        `id` bigint(20) not null,
                        `created_at` bigint(40) default null,
                        `last_modified` bigint(40) default null,
                        `email` varchar(255) default null,
                        `first_name` varchar(255) default null,
                        `last_name` varchar(255) default null,
                        `username` varchar(255) default null,
                        primary key (`id`)
) engine=innodb default charset=latin1;

-- 插入数据
insert into `user` (`id`, `created_at`, `last_modified`, `email`, `first_name`, `last_name`, `username`)
values
    (0,1490257904,1490257904,'john.doe@example.com','john','doe','user');