-- MySQL dump 10.13  Distrib 5.7.38, for Win64 (x86_64)
--
-- Host: 10.206.97.170    Database: login-center-test
-- ------------------------------------------------------
-- Server version	5.7.33-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- 创建数据库
create database `login-center` default character set utf8 collate utf8_general_ci;

use login-center;

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

--
-- Table structure for table `base_system`
--

DROP TABLE IF EXISTS `base_system`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

INSERT INTO base_system
(id, code, system_name, state, jump_type, registration_message, document_address, video_address, domain_name)
VALUES(1, '8725cbd4-2a88-4d55-b2e5-50552d2c4d3', 'IoT-Plat', 0, 0, NULL, 'http://minio-storage-url.hdt.cosmoplat.com/model-file-bucket/卡奥斯物联网平台2022725377761765349-2620.docx', 'http://minio-storage-url.hdt.cosmoplat.com/model-file-bucket/iot-2022725404314148122-2621.mp4', 'http://10.206.73.136:31950');

INSERT INTO base_system
(id, code, system_name, state, jump_type, registration_message, document_address, video_address, domain_name)
VALUES(2, 'dc6be68a-fda6-4f89-9fcf-9e3abaed22fc', 'DT-Studio', 0, 1, 'DTStudioSoft://', NULL, NULL, 'http://10.206.73.136:32164');

--
-- Table structure for table `sys_apply`
--

DROP TABLE IF EXISTS `sys_apply`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sys_company`
--

DROP TABLE IF EXISTS `sys_company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;


INSERT INTO sys_company
(id, code, iot_code, company_name, company_address, state, create_by, create_time, update_by, update_time)
VALUES(1, '5696175f-c7cd-4adf-b90c-421f1f01f63e', NULL, '平台', '123456', 0, 'de1d3d755136', '2022-06-06 16:58:50', NULL, '2022-06-17 11:28:11');

--
-- Table structure for table `sys_user`
--

DROP TABLE IF EXISTS `sys_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

INSERT INTO sys_user
(id, code, login_name, realname, password, company_id, user_type, mobile, email, sex, state, deleted, create_by, create_time, update_by, update_time)
VALUES(1, '057c1d58-41a0-4c8a-850a-de1d3d755136', 'admin', 'admin平台管理员用户', '17d18b38cd1b5c8dc41bd10bebfdc7bd', 1, 0, '18312341234', '18312341234@163.com', 0, 0, 0, '057c1d58-41a0-4c8a-850a-de1d3d755136', '2022-06-06 16:58:50', '057c1d58-41a0-4c8a-850a-de1d3d755136', '2022-09-05 13:38:41');

--
-- Table structure for table `sys_user_system`
--

DROP TABLE IF EXISTS `sys_user_system`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping events for database 'login-center-test'
--

--
-- Dumping routines for database 'login-center-test'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-09-14 10:04:36
