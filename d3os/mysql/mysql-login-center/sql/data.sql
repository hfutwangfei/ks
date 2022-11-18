--
-- create database`login-center`
--

create database `login-center` default character set utf8 collate utf8_general_ci;

use login-center;

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

--
-- Table structure for table `base_system`
--

DROP TABLE IF EXISTS `base_system`;

CREATE TABLE `base_system` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `code` varchar(36) NOT NULL COMMENT '标识主键',
  `system_name` varchar(255) NOT NULL COMMENT '系统名称',
  `state` int(2) DEFAULT '0' COMMENT '是否可用，0可用，1禁用',
  `jump_type` int(11) DEFAULT NULL COMMENT '跳转类型，0 web，2 exe',
  `registration_message` varchar(255) DEFAULT NULL COMMENT '注册信息',
  `document_address` varchar(255) DEFAULT NULL COMMENT '文档地址',
  `video_address` varchar(255) DEFAULT NULL COMMENT '视频地址',
  `domain_name` varchar(255) DEFAULT NULL COMMENT '域名',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `code_index` (`code`) USING BTREE COMMENT '简单索引'
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='基础系统';

-- todo！！！
-- todo: 下面是初始化表 base_system 的注意事项
-- todo: 默认各个 system_name 服务下的 state=1, domain_name='http://localhost:8080'
-- todo: 完成部署对应 system_name 服务后，需将 state=0, domain_name 设置成对应地址(ip+端口 或 域名)
-- todo:
--  update  base_system set state=0, domain_name='地址' where  id = 对应服务的id;
-- todo！！！
INSERT INTO base_system
(id, code, system_name, state, jump_type, registration_message, document_address, video_address, domain_name)
VALUES(1, '8725cbd4-2a88-4d55-b2e5-50552d2c4d3', 'IoT-Plat', 1, 0, NULL, 'http://minio-storage-url.hdt.cosmoplat.com/model-file-bucket/卡奥斯物联网平台2022725377761765349-2620.docx', 'http://minio-storage-url.hdt.cosmoplat.com/model-file-bucket/iot-2022725404314148122-2621.mp4', 'http://localhost:8080');

INSERT INTO base_system
(id, code, system_name, state, jump_type, registration_message, document_address, video_address, domain_name)
VALUES(2, 'dc6be68a-fda6-4f89-9fcf-9e3abaed22fc', 'DT-Studio', 1, 1, 'DTStudioSoft://', NULL, NULL, 'http://localhost:8080');

INSERT INTO base_system
(id, code, system_name, state, jump_type, registration_message, document_address, video_address, domain_name)
VALUES(3, '67b73bb4-8da9-4e47-be9a-2c9d4666bc0f', 'DI-Engine', 1, 0, NULL, NULL, NULL, 'http://localhost:8080');
INSERT INTO base_system
(id, code, system_name, state, jump_type, registration_message, document_address, video_address, domain_name)
VALUES(4, '26099b6f-1284-4c72-9c18-8ad88af3ff10', 'Data-Thread', 0, 0, NULL, 'http://minio-storage-url.hdt.cosmoplat.com/model-file-bucket/DataThread教程-2022725351529078224-2619.docx', 'http://minio-storage-url.hdt.cosmoplat.com/model-file-bucket/D³OS Data Thread视频演示-2022725281808395690-2617.mp4', 'http://localhost:8080');
INSERT INTO base_system
(id, code, system_name, state, jump_type, registration_message, document_address, video_address, domain_name)
VALUES(5, '3809f9f4-dfad-4914-b93d-12d2184cb0cb', 'Data-Analysis', 1, 0, NULL, NULL, NULL, 'http://localhost:8080');

--
-- Table structure for table `sys_apply`
--

DROP TABLE IF EXISTS `sys_apply`;

CREATE TABLE `sys_apply` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `code` varchar(36) NOT NULL COMMENT '标识主键',
  `company_name` varchar(255) NOT NULL COMMENT '组织名称',
  `user_id` int(11) DEFAULT NULL COMMENT '用户Id',
  `company_id` int(11) DEFAULT NULL COMMENT '组织Id',
  `user_type` int(2) DEFAULT '1' COMMENT '用户类型，0平台管理员，1租户管理员，2租户用户',
  `login_name` varchar(64) DEFAULT NULL COMMENT '用户名',
  `realname` varchar(64) DEFAULT NULL COMMENT '真实名称',
  `mobile` varchar(50) DEFAULT NULL COMMENT '电话号码',
  `system_name` varchar(255) NOT NULL COMMENT '访问系统',
  `apply_state` int(2) DEFAULT '0' COMMENT '审批状态，0待审批，1通过，2拒绝',
  `apply_by` varchar(50) DEFAULT NULL COMMENT '申请者',
  `apply_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '申请时间',
  `deadline_time` timestamp NULL DEFAULT NULL COMMENT '终止时间',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `code_index` (`code`) USING BTREE COMMENT '简单索引'
) ENGINE=InnoDB AUTO_INCREMENT=353 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='申请表';

--
-- Table structure for table `sys_company`
--

DROP TABLE IF EXISTS `sys_company`;

CREATE TABLE `sys_company` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `code` varchar(36) NOT NULL COMMENT '标识主键',
  `iot_code` varchar(36) DEFAULT NULL COMMENT 'iot标识主键',
  `company_name` varchar(255) NOT NULL COMMENT '组织名称',
  `company_address` varchar(255) DEFAULT NULL COMMENT '企业组织地址',
  `state` int(2) DEFAULT '0' COMMENT '是否可用，0可用，1禁用',
  `create_by` varchar(50) DEFAULT NULL COMMENT '创建者',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_by` varchar(50) DEFAULT NULL COMMENT '修改者',
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `code_index` (`code`) USING BTREE COMMENT '简单索引'
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='组织详情';

INSERT INTO sys_company
(id, code, iot_code, company_name, company_address, state, create_by, create_time, update_by, update_time)
VALUES(1, '5696175f-c7cd-4adf-b90c-421f1f01f63e', NULL, '平台', '123456', 0, 'de1d3d755136', '2022-06-06 16:58:50', NULL, '2022-06-17 11:28:11');

--
-- Table structure for table `sys_user`
--

DROP TABLE IF EXISTS `sys_user`;

CREATE TABLE `sys_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `code` varchar(36) NOT NULL COMMENT '标识主键',
  `login_name` varchar(64) DEFAULT NULL COMMENT '用户名',
  `realname` varchar(64) DEFAULT NULL COMMENT '真实名称',
  `password` varchar(255) DEFAULT NULL COMMENT '密码',
  `company_id` int(11) DEFAULT NULL COMMENT '所属组织',
  `user_type` int(2) DEFAULT '0' COMMENT '用户类型，0平台管理员，1租户管理员，2租户用户',
  `mobile` varchar(50) DEFAULT NULL COMMENT '电话号码',
  `email` varchar(255) DEFAULT NULL COMMENT '邮件地址',
  `sex` int(2) DEFAULT '2' COMMENT '性别，0男，1女，2保密',
  `state` int(2) DEFAULT '0' COMMENT '是否可用，0可用，1禁用',
  `deleted` int(2) DEFAULT '0' COMMENT '是否已删除，0未删除，1已删除',
  `create_by` varchar(50) DEFAULT NULL COMMENT '创建者',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_by` varchar(50) DEFAULT NULL COMMENT '修改者',
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `code_index` (`code`) USING BTREE COMMENT '简单索引'
) ENGINE=InnoDB AUTO_INCREMENT=191 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='用户详情';

-- todo！！！

-- todo: login_name 登录帐号: admin
-- todo: password 登录密码: Cosmo_1!
-- todo: 用户中心服务部署后，用此账号密码即可登录！！！

-- todo！！！
INSERT INTO sys_user
(id, code, login_name, realname, password, company_id, user_type, mobile, email, sex, state, deleted, create_by, create_time, update_by, update_time)
VALUES(1, '057c1d58-41a0-4c8a-850a-de1d3d755136', 'admin', 'admin平台管理员用户', '8d6b1d673f0068dc6f70d222a4d3cf33', 1, 0, '18312341234', '18312341234@163.com', 0, 0, 0, '057c1d58-41a0-4c8a-850a-de1d3d755136', '2022-06-06 16:58:50', '057c1d58-41a0-4c8a-850a-de1d3d755136', '2022-09-05 13:38:41');

--
-- Table structure for table `sys_user_system`
--

DROP TABLE IF EXISTS `sys_user_system`;

CREATE TABLE `sys_user_system` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `code` varchar(36) NOT NULL COMMENT '标识主键',
  `user_id` int(11) DEFAULT NULL COMMENT '用户id',
  `system_id` int(11) DEFAULT NULL COMMENT '系统id',
  `deleted` int(2) DEFAULT '0' COMMENT '是否已删除，0未删除，1已删除',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `deadline_time` timestamp NOT NULL DEFAULT '1970-01-01 16:00:00' COMMENT '终止时间',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `code_index` (`code`) USING BTREE COMMENT '简单索引'
) ENGINE=InnoDB AUTO_INCREMENT=711 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='用户系统关系表';
