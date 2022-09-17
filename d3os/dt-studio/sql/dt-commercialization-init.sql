-- MySQL dump 10.13  Distrib 5.5.62, for Win64 (AMD64)
--
-- Host: 10.206.97.170    Database: dt-commercialization
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

--
-- Table structure for table `app_expand`
--

DROP TABLE IF EXISTS `app_expand`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app_expand` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `application_name` varchar(255) DEFAULT NULL COMMENT '应用名称',
  `application_icon` varchar(255) DEFAULT NULL COMMENT '应用ICON',
  `application_desc` varchar(255) DEFAULT NULL COMMENT '说明备注',
  `build_version` varchar(255) DEFAULT NULL COMMENT '版本号',
  `target_url` varchar(255) DEFAULT NULL COMMENT '应用地址',
  `application_icon_arr` varchar(255) DEFAULT NULL COMMENT 'ICON数组',
  `application_type` int(11) DEFAULT NULL COMMENT '类别0服务 1接口',
  `current_status` int(11) DEFAULT NULL COMMENT '状态 0初始状态 1已安装 2删除禁用',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `sys_type` varchar(255) DEFAULT NULL COMMENT '系统类型',
  `target_data_url` varchar(255) DEFAULT NULL COMMENT '数据接口域名',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `INDEX` (`id`,`application_name`,`target_url`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='扩展应用（结果表仅作展示使用）';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_expand`
--

LOCK TABLES `app_expand` WRITE;
/*!40000 ALTER TABLE `app_expand` DISABLE KEYS */;
/*!40000 ALTER TABLE `app_expand` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_thread`
--

DROP TABLE IF EXISTS `app_thread`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app_thread` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `is_start` int(11) DEFAULT NULL COMMENT '是否开始2已消费1开始0未开始',
  `entity_id` varchar(255) DEFAULT NULL COMMENT '实例ID',
  `session_id` int(11) DEFAULT NULL COMMENT 'session id',
  `data_json` text COMMENT '结果集',
  `time_str` varchar(255) DEFAULT NULL COMMENT '时间设置yyyyMMddHHmmss',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间戳',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_thread`
--

LOCK TABLES `app_thread` WRITE;
/*!40000 ALTER TABLE `app_thread` DISABLE KEYS */;
/*!40000 ALTER TABLE `app_thread` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `attributes`
--

DROP TABLE IF EXISTS `attributes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `attributes` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `attributes_name` varchar(36) NOT NULL COMMENT '属性名称',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='领域属性';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attributes`
--

LOCK TABLES `attributes` WRITE;
/*!40000 ALTER TABLE `attributes` DISABLE KEYS */;
/*!40000 ALTER TABLE `attributes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `attributes_subattribute_relation`
--

DROP TABLE IF EXISTS `attributes_subattribute_relation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `attributes_subattribute_relation` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `attributes_id` int(11) DEFAULT NULL COMMENT '属性id',
  `subattribute_id` int(11) DEFAULT NULL COMMENT '子属性id',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='属性子属性关系';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attributes_subattribute_relation`
--

LOCK TABLES `attributes_subattribute_relation` WRITE;
/*!40000 ALTER TABLE `attributes_subattribute_relation` DISABLE KEYS */;
/*!40000 ALTER TABLE `attributes_subattribute_relation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bind_case_info`
--

DROP TABLE IF EXISTS `bind_case_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bind_case_info` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `case_id` varchar(255) DEFAULT NULL COMMENT 'case id',
  `case_name` varchar(255) DEFAULT NULL COMMENT '案例名称',
  `case_status` varchar(255) DEFAULT NULL COMMENT '案例状态说明',
  `case_status_type` int(11) DEFAULT NULL COMMENT '案例状态类别',
  `case_start` int(11) DEFAULT NULL COMMENT '是否开启0未开启 1开启',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bind_case_info`
--

LOCK TABLES `bind_case_info` WRITE;
/*!40000 ALTER TABLE `bind_case_info` DISABLE KEYS */;
/*!40000 ALTER TABLE `bind_case_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bind_entity_info`
--

DROP TABLE IF EXISTS `bind_entity_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bind_entity_info` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `super_id` bigint(20) DEFAULT NULL COMMENT '超级ID',
  `device_id` varchar(255) DEFAULT NULL COMMENT '设备ID',
  `device_name` varchar(255) DEFAULT NULL COMMENT '设备名称',
  `device_is_start` int(11) DEFAULT NULL COMMENT '是否启动0未启动 1启动',
  `entity_id` varchar(255) DEFAULT NULL COMMENT '设备实例Id',
  `case_name` varchar(255) DEFAULT NULL COMMENT '案例名称',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bind_entity_info`
--

LOCK TABLES `bind_entity_info` WRITE;
/*!40000 ALTER TABLE `bind_entity_info` DISABLE KEYS */;
/*!40000 ALTER TABLE `bind_entity_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bind_history`
--

DROP TABLE IF EXISTS `bind_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bind_history` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `left_client_num` varchar(255) DEFAULT NULL COMMENT 'CODE',
  `left_iot_id` varchar(255) DEFAULT NULL COMMENT '对应的IOT ID',
  `left_iot_name` varchar(255) DEFAULT NULL COMMENT 'IOT设备名称',
  `right_device_id` varchar(255) DEFAULT NULL COMMENT '对应设备ID',
  `right_device_name` varchar(255) DEFAULT NULL COMMENT '对应设备名称',
  `json_context` text COMMENT '传输的内容',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bind_history`
--

LOCK TABLES `bind_history` WRITE;
/*!40000 ALTER TABLE `bind_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `bind_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bind_process`
--

DROP TABLE IF EXISTS `bind_process`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bind_process` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `line_bind_device_id` varchar(255) DEFAULT NULL COMMENT '物模板设备ID',
  `line_bind_iot_id` varchar(255) DEFAULT NULL COMMENT 'IOT设备ID',
  `line_num` varchar(255) DEFAULT NULL COMMENT '管道通道ID',
  `is_online` varchar(255) DEFAULT NULL COMMENT '是否在线0不在线1在线',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bind_process`
--

LOCK TABLES `bind_process` WRITE;
/*!40000 ALTER TABLE `bind_process` DISABLE KEYS */;
/*!40000 ALTER TABLE `bind_process` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `brand`
--

DROP TABLE IF EXISTS `brand`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `brand` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `brand_name` varchar(255) DEFAULT NULL COMMENT '品牌名称',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='品牌详情';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brand`
--

LOCK TABLES `brand` WRITE;
/*!40000 ALTER TABLE `brand` DISABLE KEYS */;
/*!40000 ALTER TABLE `brand` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `case_basic_attribute`
--

DROP TABLE IF EXISTS `case_basic_attribute`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `case_basic_attribute` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `case_code` varchar(255) DEFAULT NULL COMMENT '案例唯一标识',
  `tenant_id` int(11) DEFAULT NULL COMMENT '租户ID',
  `case_name` varchar(50) NOT NULL COMMENT '案例名称',
  `case_desc` varchar(150) NOT NULL COMMENT '案例描述',
  `datasource_id` int(11) DEFAULT NULL COMMENT '数据源配置',
  `case_render` int(2) DEFAULT '0' COMMENT '渲染方式 0-本地渲染，1-云渲染',
  `render_address` varchar(128) DEFAULT NULL COMMENT '云渲染地址',
  `render_password` varchar(128) NOT NULL COMMENT '云渲染密码',
  `publish_state` int(2) DEFAULT '0' COMMENT '发布状态，0-未发布，1-已发布',
  `image_url` varchar(255) DEFAULT NULL COMMENT '图片链接',
  `create_by` varchar(50) DEFAULT NULL COMMENT '创建者',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_by` varchar(50) DEFAULT NULL COMMENT '修改者',
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `is_socket` int(11) DEFAULT '0' COMMENT '是否启动websocket 1启动 0未启动',
  PRIMARY KEY (`id`,`render_password`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='案例基础属性';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `case_basic_attribute`
--

LOCK TABLES `case_basic_attribute` WRITE;
/*!40000 ALTER TABLE `case_basic_attribute` DISABLE KEYS */;
/*!40000 ALTER TABLE `case_basic_attribute` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `case_basic_label`
--

DROP TABLE IF EXISTS `case_basic_label`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `case_basic_label` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `case_id` int(11) NOT NULL COMMENT '案例ID',
  `label_name` varchar(50) NOT NULL COMMENT '标签名称',
  `label_desc` varchar(150) DEFAULT NULL COMMENT '标签描述',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='案例标签';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `case_basic_label`
--

LOCK TABLES `case_basic_label` WRITE;
/*!40000 ALTER TABLE `case_basic_label` DISABLE KEYS */;
/*!40000 ALTER TABLE `case_basic_label` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `case_datasource_configuration`
--

DROP TABLE IF EXISTS `case_datasource_configuration`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `case_datasource_configuration` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `server_uri` varchar(50) NOT NULL COMMENT '服务地址',
  `server_name` varchar(50) DEFAULT NULL COMMENT '服务中文名',
  `method_route` varchar(50) NOT NULL COMMENT '接口路由',
  `method_name` varchar(50) NOT NULL COMMENT '接口中文名',
  `method_en_name` varchar(255) DEFAULT NULL COMMENT '接口英文名',
  `auth_field` varchar(255) DEFAULT NULL COMMENT 'token字段名',
  `request_type` varchar(50) DEFAULT NULL COMMENT '接口类型',
  `request_params` varchar(255) DEFAULT NULL COMMENT '请求数据格式',
  `response_params` varchar(255) DEFAULT NULL COMMENT '响应数据格式',
  `protocol_type` varchar(255) DEFAULT NULL COMMENT '协议类型',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='案例数据源配置';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `case_datasource_configuration`
--

LOCK TABLES `case_datasource_configuration` WRITE;
/*!40000 ALTER TABLE `case_datasource_configuration` DISABLE KEYS */;
/*!40000 ALTER TABLE `case_datasource_configuration` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `case_lighting_effect`
--

DROP TABLE IF EXISTS `case_lighting_effect`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `case_lighting_effect` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `case_id` int(11) NOT NULL COMMENT '案例ID',
  `lighting_name` varchar(255) DEFAULT NULL COMMENT '灯光名称',
  `lighting_type` int(2) DEFAULT '1' COMMENT '灯光类型 1-天光',
  `light_intensity` float(9,6) DEFAULT NULL COMMENT '光源强度',
  `light_color` varchar(255) DEFAULT NULL COMMENT '光源颜色',
  `light_dir` varchar(255) DEFAULT NULL COMMENT '光源角度',
  `source_anle` float(7,6) DEFAULT NULL COMMENT '阴影柔化',
  `indirect_light_intensity` float(7,6) DEFAULT NULL COMMENT '间接光照强度',
  `light_shaft_occlusion` tinyint(1) DEFAULT NULL COMMENT '光束遮挡   1-开启  0-关闭',
  `occlusion_mask_darkness` float(7,6) NOT NULL COMMENT '光束遮挡暗度',
  `light_shaft_bloom` tinyint(1) DEFAULT NULL COMMENT '光束泛光   1-开启  0-关闭',
  `bloom_scale` float(8,6) DEFAULT NULL COMMENT '光束泛光强度',
  `cloud_speed` float(11,6) unsigned zerofill DEFAULT NULL COMMENT '云速度',
  `cloud_opacity` float(11,6) DEFAULT NULL COMMENT '云透明度',
  `exposure_compensation` varchar(255) DEFAULT NULL COMMENT '曝光补偿',
  `bloom_method` varchar(255) DEFAULT NULL COMMENT '光晕计算方式',
  `bloom_intensity` float(11,6) DEFAULT NULL COMMENT '光晕强度',
  `global_saturation` tinyint(1) DEFAULT NULL COMMENT '全局饱和度 1-开启  0-关闭',
  `global_saturation_intensity` varchar(255) DEFAULT NULL COMMENT '全局饱和度强度',
  `global_contrast` tinyint(1) DEFAULT NULL COMMENT '全局对比度 1-开启  0-关闭',
  `global_contrast_intensity` varchar(255) DEFAULT NULL COMMENT '全局对比度强度',
  `global_gamma` tinyint(1) DEFAULT NULL COMMENT '全局Gamma 1-开启 0-关闭',
  `global_gamma_value` varchar(255) DEFAULT NULL COMMENT '全局Gamma值',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='案例灯光效果表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `case_lighting_effect`
--

LOCK TABLES `case_lighting_effect` WRITE;
/*!40000 ALTER TABLE `case_lighting_effect` DISABLE KEYS */;
/*!40000 ALTER TABLE `case_lighting_effect` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `case_model_animations`
--

DROP TABLE IF EXISTS `case_model_animations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `case_model_animations` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `case_id` int(11) NOT NULL COMMENT '案例ID',
  `model_id` varchar(255) NOT NULL COMMENT '模型唯一值',
  `index_code` varchar(255) NOT NULL COMMENT '案例实例唯一值',
  `animation_name` varchar(255) NOT NULL COMMENT '动画名称',
  `animation_code` varchar(255) NOT NULL COMMENT '动画唯一值',
  `dynamic_play` tinyint(1) DEFAULT '0' COMMENT '是否播放 1-是 0-否',
  `play_speed` decimal(8,3) DEFAULT '1.000' COMMENT '播放倍速',
  `initial` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否为初始动画 1-是 0-否',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `create_by` int(11) DEFAULT NULL COMMENT '创建人',
  `update_by` int(11) DEFAULT NULL COMMENT '更新人',
  `point_code_key` varchar(255) DEFAULT NULL COMMENT '关联点位枚举',
  `point_code` varchar(100) DEFAULT NULL COMMENT '关联点位',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='案例动画数据表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `case_model_animations`
--

LOCK TABLES `case_model_animations` WRITE;
/*!40000 ALTER TABLE `case_model_animations` DISABLE KEYS */;
/*!40000 ALTER TABLE `case_model_animations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `case_model_animations_state`
--

DROP TABLE IF EXISTS `case_model_animations_state`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `case_model_animations_state` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `case_id` int(11) NOT NULL COMMENT '案例ID',
  `index_code` varchar(255) NOT NULL COMMENT '实例唯一值',
  `animation_code` varchar(255) NOT NULL COMMENT '动画唯一值',
  `serial_no` int(11) DEFAULT NULL COMMENT '序列号',
  `state_name` varchar(255) DEFAULT NULL COMMENT '状态名称',
  `state_code` varchar(255) NOT NULL COMMENT '状态唯一值',
  `state_type` varchar(255) NOT NULL COMMENT '状态类型 animationType-动画类型 positionType-位置移动类型 relationType-关联类型 displayType-显隐类型 instructionType-指令发射类型',
  `execute_time` decimal(8,3) DEFAULT '0.000' COMMENT '执行时间',
  `point_parameter` decimal(16,6) DEFAULT NULL COMMENT '点位参数',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='案例动画状态表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `case_model_animations_state`
--

LOCK TABLES `case_model_animations_state` WRITE;
/*!40000 ALTER TABLE `case_model_animations_state` DISABLE KEYS */;
/*!40000 ALTER TABLE `case_model_animations_state` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `case_model_animations_state_display`
--

DROP TABLE IF EXISTS `case_model_animations_state_display`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `case_model_animations_state_display` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `case_id` int(11) NOT NULL COMMENT '案例ID',
  `animation_code` varchar(255) NOT NULL COMMENT '动画唯一值',
  `state_code` varchar(255) NOT NULL COMMENT '状态唯一值',
  `display_name` varchar(255) NOT NULL COMMENT '显隐名称',
  `is_display` tinyint(1) NOT NULL DEFAULT '0' COMMENT '显隐 1-显 0-隐',
  `index_code` varchar(255) NOT NULL COMMENT '模型实例唯一值',
  `display_index_code` varchar(255) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='案例动画显隐状态表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `case_model_animations_state_display`
--

LOCK TABLES `case_model_animations_state_display` WRITE;
/*!40000 ALTER TABLE `case_model_animations_state_display` DISABLE KEYS */;
/*!40000 ALTER TABLE `case_model_animations_state_display` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `case_model_animations_state_instruction`
--

DROP TABLE IF EXISTS `case_model_animations_state_instruction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `case_model_animations_state_instruction` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `case_id` int(11) NOT NULL COMMENT '案例ID',
  `instruction_name` varchar(255) NOT NULL COMMENT '指令名称',
  `index_code` varchar(255) NOT NULL COMMENT '模型实例唯一值',
  `animation_code` varchar(255) NOT NULL COMMENT '动画唯一值',
  `state_code` varchar(255) NOT NULL COMMENT '状态唯一值',
  `instruction_index_code` varchar(255) NOT NULL COMMENT '接收指令方模型实例唯一值',
  `instruction_animation_code` varchar(255) NOT NULL COMMENT '接收指令方动画唯一值',
  `instruction_state_code` varchar(255) DEFAULT NULL COMMENT '接收指令方动画状态唯一值',
  `instruction_point_parameter` decimal(12,6) NOT NULL COMMENT '接收指令方点位参数',
  `instruction_device_code` varchar(255) DEFAULT NULL COMMENT '接收指令方物理设备ID',
  `serial_no` int(11) DEFAULT NULL COMMENT '序列号',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='案例动画指令发射状态表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `case_model_animations_state_instruction`
--

LOCK TABLES `case_model_animations_state_instruction` WRITE;
/*!40000 ALTER TABLE `case_model_animations_state_instruction` DISABLE KEYS */;
/*!40000 ALTER TABLE `case_model_animations_state_instruction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `case_model_animations_state_parameter`
--

DROP TABLE IF EXISTS `case_model_animations_state_parameter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `case_model_animations_state_parameter` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `case_id` int(11) NOT NULL COMMENT '案例ID',
  `index_code` varchar(255) NOT NULL COMMENT '实例唯一值',
  `model_id` varchar(255) NOT NULL COMMENT '模型ID',
  `parameter_code` varchar(255) NOT NULL COMMENT '参数唯一值',
  `animation_code` varchar(255) NOT NULL COMMENT '动画唯一值',
  `state_code` varchar(255) NOT NULL COMMENT '状态唯一值',
  `slider_value` decimal(12,6) NOT NULL COMMENT '参数当前值',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='案例动画状态参数数据表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `case_model_animations_state_parameter`
--

LOCK TABLES `case_model_animations_state_parameter` WRITE;
/*!40000 ALTER TABLE `case_model_animations_state_parameter` DISABLE KEYS */;
/*!40000 ALTER TABLE `case_model_animations_state_parameter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `case_model_animations_state_relate`
--

DROP TABLE IF EXISTS `case_model_animations_state_relate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `case_model_animations_state_relate` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `case_id` int(11) NOT NULL COMMENT '案例ID',
  `animation_code` varchar(255) NOT NULL COMMENT '动画唯一值',
  `state_code` varchar(255) NOT NULL COMMENT '状态唯一值',
  `relation_name` varchar(255) NOT NULL COMMENT '关联名称',
  `is_relation` tinyint(1) DEFAULT '0' COMMENT '是否关联 1-是 0-否',
  `node_id` varchar(255) NOT NULL COMMENT '模型节点',
  `index_code` varchar(255) NOT NULL COMMENT '关联实例唯一值',
  `relate_index_code` varchar(255) DEFAULT NULL COMMENT '被关联的实例唯一值',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='案例动画关联状态表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `case_model_animations_state_relate`
--

LOCK TABLES `case_model_animations_state_relate` WRITE;
/*!40000 ALTER TABLE `case_model_animations_state_relate` DISABLE KEYS */;
/*!40000 ALTER TABLE `case_model_animations_state_relate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `case_model_animations_state_shifts`
--

DROP TABLE IF EXISTS `case_model_animations_state_shifts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `case_model_animations_state_shifts` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `case_id` int(11) NOT NULL COMMENT '案例ID',
  `animation_code` varchar(255) NOT NULL COMMENT '动画唯一值',
  `state_code` varchar(255) NOT NULL COMMENT '状态/位置唯一值',
  `index_code` varchar(255) NOT NULL COMMENT '实例唯一值',
  `entity_locate` varchar(255) DEFAULT NULL COMMENT '实例当前位置',
  `entity_rotate` varchar(255) DEFAULT NULL COMMENT '实例当前旋转度',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='案例动画状态位移数据表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `case_model_animations_state_shifts`
--

LOCK TABLES `case_model_animations_state_shifts` WRITE;
/*!40000 ALTER TABLE `case_model_animations_state_shifts` DISABLE KEYS */;
/*!40000 ALTER TABLE `case_model_animations_state_shifts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `case_model_attribute`
--

DROP TABLE IF EXISTS `case_model_attribute`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `case_model_attribute` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `case_id` int(11) NOT NULL COMMENT '案例ID',
  `model_id` varchar(255) NOT NULL COMMENT '模型ID',
  `model_type` int(2) NOT NULL COMMENT '模型类型 1-场景 2-场景面板 3-模型',
  `bind_model_status_id` bigint(20) DEFAULT NULL COMMENT '预制模型状态',
  `parent_id` bigint(20) DEFAULT NULL COMMENT '父级ID',
  `index_code` varchar(255) DEFAULT NULL COMMENT '实例唯一值',
  `parent_code` varchar(255) DEFAULT NULL COMMENT '实例父级编号',
  `entity_code` varchar(255) DEFAULT NULL COMMENT '实例编号',
  `entity_name` varchar(255) DEFAULT NULL COMMENT '实例名称',
  `device_code` varchar(255) DEFAULT NULL COMMENT '物理设备ID',
  `entity_hide` tinyint(1) DEFAULT NULL COMMENT '实例隐藏 1-隐藏 0-显示',
  `entity_lock` tinyint(1) DEFAULT NULL COMMENT '实例锁定 1-锁定 0-未锁定',
  `entity_size` varchar(50) DEFAULT NULL COMMENT '实例大小',
  `entity_locate` varchar(50) DEFAULT NULL COMMENT '实例坐标',
  `entity_rotate` varchar(50) DEFAULT NULL COMMENT '实例旋转度',
  `entity_dashboard_code` varchar(255) DEFAULT NULL COMMENT '物理设备面板ID',
  `dashboard_show_state` tinyint(2) DEFAULT '0' COMMENT '物理设备面板显示 1-显示 0-隐藏',
  `is_socket` int(11) DEFAULT '0' COMMENT '是否启动websocket 1启动 0未启动',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `index_case_model_attribute` (`case_id`,`index_code`,`model_id`,`model_type`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='案例模型属性';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `case_model_attribute`
--

LOCK TABLES `case_model_attribute` WRITE;
/*!40000 ALTER TABLE `case_model_attribute` DISABLE KEYS */;
/*!40000 ALTER TABLE `case_model_attribute` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `case_model_sub_level`
--

DROP TABLE IF EXISTS `case_model_sub_level`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `case_model_sub_level` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `case_id` int(11) NOT NULL COMMENT '案例ID',
  `index_code` varchar(255) NOT NULL COMMENT '实例唯一值',
  `model_id` varchar(255) NOT NULL COMMENT '模型ID',
  `node_id` varchar(255) NOT NULL COMMENT '模型节点',
  `sub_level_index_code` varchar(255) NOT NULL COMMENT '子模型实例唯一值',
  `relate_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '关联时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='动画关联子模型数据表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `case_model_sub_level`
--

LOCK TABLES `case_model_sub_level` WRITE;
/*!40000 ALTER TABLE `case_model_sub_level` DISABLE KEYS */;
/*!40000 ALTER TABLE `case_model_sub_level` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `case_navigations`
--

DROP TABLE IF EXISTS `case_navigations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `case_navigations` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `case_id` int(11) NOT NULL COMMENT '案例ID',
  `related_case_id` int(11) DEFAULT NULL COMMENT '跳转案例',
  `navigation_code` varchar(255) DEFAULT NULL COMMENT '导航编号',
  `navigation_name` varchar(255) DEFAULT NULL COMMENT '导航名称',
  `text_color` varchar(255) DEFAULT NULL COMMENT '文字颜色',
  `font_size` varchar(255) DEFAULT NULL COMMENT '文字大小',
  `navigation_height` varchar(255) DEFAULT NULL COMMENT '导航高度',
  `navigation_width` varchar(255) DEFAULT NULL COMMENT '导航宽度',
  `navigation_to_top` varchar(255) DEFAULT '0' COMMENT '距离上边高度',
  `navigation_to_left` varchar(255) DEFAULT '0' COMMENT '距离左边长度',
  `picture_name` varchar(255) DEFAULT NULL COMMENT '图片名称',
  `picture_url` varchar(255) DEFAULT NULL COMMENT '导航图标地址',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='案例导航视图表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `case_navigations`
--

LOCK TABLES `case_navigations` WRITE;
/*!40000 ALTER TABLE `case_navigations` DISABLE KEYS */;
/*!40000 ALTER TABLE `case_navigations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `case_outline_view`
--

DROP TABLE IF EXISTS `case_outline_view`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `case_outline_view` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `case_id` int(11) NOT NULL COMMENT '案例ID',
  `model_id` varchar(255) DEFAULT NULL COMMENT '模型ID',
  `parent_id` bigint(20) DEFAULT NULL COMMENT '目录父级ID',
  `index_code` varchar(255) DEFAULT NULL COMMENT '视图码',
  `parent_code` varchar(255) DEFAULT NULL COMMENT '父级视图码',
  `view_name` varchar(50) DEFAULT NULL COMMENT '目录名称',
  `view_desc` varchar(50) DEFAULT NULL COMMENT '目录描述',
  `is_node` tinyint(1) DEFAULT '0' COMMENT '节点标识 1-是 0-非',
  `is_model` tinyint(1) DEFAULT '1' COMMENT '模型标识 1-是 0-否',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='案例大纲视图表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `case_outline_view`
--

LOCK TABLES `case_outline_view` WRITE;
/*!40000 ALTER TABLE `case_outline_view` DISABLE KEYS */;
/*!40000 ALTER TABLE `case_outline_view` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `case_roaming_route`
--

DROP TABLE IF EXISTS `case_roaming_route`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `case_roaming_route` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `case_id` int(11) NOT NULL COMMENT '案例ID',
  `path_name` varchar(255) DEFAULT NULL COMMENT '漫游路线名称',
  `path_desc` varchar(255) DEFAULT NULL COMMENT '路线描述',
  `path_height` decimal(8,3) DEFAULT NULL COMMENT '漫游高度',
  `path_time` decimal(8,3) DEFAULT NULL COMMENT '漫游时间',
  `path_direction` tinyint(1) DEFAULT '0' COMMENT '路线方向 0-正向 1-反向',
  `path_angle` decimal(8,3) DEFAULT NULL COMMENT '漫游角度',
  `path_loop` tinyint(1) DEFAULT '0' COMMENT '是否循环 1-是 0-否',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='案例漫游路线表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `case_roaming_route`
--

LOCK TABLES `case_roaming_route` WRITE;
/*!40000 ALTER TABLE `case_roaming_route` DISABLE KEYS */;
/*!40000 ALTER TABLE `case_roaming_route` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `case_roaming_route_points`
--

DROP TABLE IF EXISTS `case_roaming_route_points`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `case_roaming_route_points` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `route_id` bigint(20) NOT NULL COMMENT '漫游路线ID',
  `location` varchar(255) DEFAULT NULL COMMENT '点位',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='案例漫游路线点位表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `case_roaming_route_points`
--

LOCK TABLES `case_roaming_route_points` WRITE;
/*!40000 ALTER TABLE `case_roaming_route_points` DISABLE KEYS */;
/*!40000 ALTER TABLE `case_roaming_route_points` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `case_screen_snapshot`
--

DROP TABLE IF EXISTS `case_screen_snapshot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `case_screen_snapshot` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `case_id` int(11) DEFAULT NULL COMMENT '案例ID',
  `snapshot_url` varchar(255) DEFAULT NULL COMMENT '快照截图地址',
  `snapshot_name` varchar(255) DEFAULT NULL COMMENT '快照名称',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='案例快照截图表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `case_screen_snapshot`
--

LOCK TABLES `case_screen_snapshot` WRITE;
/*!40000 ALTER TABLE `case_screen_snapshot` DISABLE KEYS */;
/*!40000 ALTER TABLE `case_screen_snapshot` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `case_sequence_info`
--

DROP TABLE IF EXISTS `case_sequence_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `case_sequence_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `case_id` int(11) NOT NULL COMMENT '案例ID',
  `sequence_name` varchar(255) NOT NULL COMMENT '时序名称',
  `sequence_code` varchar(255) NOT NULL COMMENT '时序唯一值',
  `create_by` int(11) DEFAULT NULL COMMENT '创建者',
  `update_by` int(11) DEFAULT NULL COMMENT '更新者',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='案例时序数据表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `case_sequence_info`
--

LOCK TABLES `case_sequence_info` WRITE;
/*!40000 ALTER TABLE `case_sequence_info` DISABLE KEYS */;
/*!40000 ALTER TABLE `case_sequence_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `case_sequence_node_connections`
--

DROP TABLE IF EXISTS `case_sequence_node_connections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `case_sequence_node_connections` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `case_id` int(11) NOT NULL COMMENT '案例ID',
  `sequence_code` varchar(255) NOT NULL COMMENT '时序唯一值',
  `uuids` varchar(255) NOT NULL COMMENT '节点连接',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='案例时序节点连接数据表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `case_sequence_node_connections`
--

LOCK TABLES `case_sequence_node_connections` WRITE;
/*!40000 ALTER TABLE `case_sequence_node_connections` DISABLE KEYS */;
/*!40000 ALTER TABLE `case_sequence_node_connections` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `case_sequence_node_info`
--

DROP TABLE IF EXISTS `case_sequence_node_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `case_sequence_node_info` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `case_id` int(11) NOT NULL COMMENT '案例ID',
  `sequence_code` varchar(255) NOT NULL COMMENT '时序唯一值',
  `block_id` varchar(255) DEFAULT NULL COMMENT '逻辑节点',
  `index_code` varchar(255) NOT NULL COMMENT '模型实例唯一值',
  `animation_code` varchar(255) NOT NULL COMMENT '动画唯一值',
  `node_type` varchar(255) NOT NULL COMMENT '节点类型 start - 开始节点 end - 结束节点 process - 逻辑节点',
  `position_x` decimal(8,3) DEFAULT '0.000' COMMENT 'x位置',
  `position_y` decimal(8,3) DEFAULT '0.000' COMMENT 'y位置',
  `node_name` varchar(255) DEFAULT NULL COMMENT '节点名称',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='案例时序数据表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `case_sequence_node_info`
--

LOCK TABLES `case_sequence_node_info` WRITE;
/*!40000 ALTER TABLE `case_sequence_node_info` DISABLE KEYS */;
/*!40000 ALTER TABLE `case_sequence_node_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `data_bind_basic`
--

DROP TABLE IF EXISTS `data_bind_basic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `data_bind_basic` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `case_id` varchar(255) DEFAULT NULL COMMENT 'case id',
  `case_name` varchar(255) DEFAULT NULL COMMENT 'case 名称',
  `connec_url` varchar(255) DEFAULT NULL COMMENT '链接地址',
  `case_status` varchar(255) DEFAULT NULL COMMENT '状态',
  `case_status_num` int(11) DEFAULT NULL COMMENT '状态号',
  `data_start` int(2) DEFAULT NULL COMMENT '数据是否启动 0未启动 1启动',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `data_bind_basic`
--

LOCK TABLES `data_bind_basic` WRITE;
/*!40000 ALTER TABLE `data_bind_basic` DISABLE KEYS */;
/*!40000 ALTER TABLE `data_bind_basic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `data_bind_entity`
--

DROP TABLE IF EXISTS `data_bind_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `data_bind_entity` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `device_id` varchar(255) DEFAULT NULL COMMENT '设备ID',
  `device_name` varchar(255) DEFAULT NULL COMMENT '设备名称',
  `data_start` int(2) DEFAULT NULL COMMENT '数据是否启动0未启动 1启动',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `data_bind_entity`
--

LOCK TABLES `data_bind_entity` WRITE;
/*!40000 ALTER TABLE `data_bind_entity` DISABLE KEYS */;
/*!40000 ALTER TABLE `data_bind_entity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `field`
--

DROP TABLE IF EXISTS `field`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `field` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `code` varchar(36) NOT NULL COMMENT '标识主键',
  `field_name` varchar(36) NOT NULL COMMENT '领域名称',
  `create_by` varchar(50) DEFAULT NULL COMMENT '创建者',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_by` varchar(50) DEFAULT NULL COMMENT '修改者',
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `code_index` (`code`) USING BTREE COMMENT '简单索引'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='领域';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `field`
--

LOCK TABLES `field` WRITE;
/*!40000 ALTER TABLE `field` DISABLE KEYS */;
/*!40000 ALTER TABLE `field` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `field_attributes_relation`
--

DROP TABLE IF EXISTS `field_attributes_relation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `field_attributes_relation` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `field_id` int(11) DEFAULT NULL COMMENT '领域id',
  `attributes_id` int(11) DEFAULT NULL COMMENT '属性id',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='领域属性关系';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `field_attributes_relation`
--

LOCK TABLES `field_attributes_relation` WRITE;
/*!40000 ALTER TABLE `field_attributes_relation` DISABLE KEYS */;
/*!40000 ALTER TABLE `field_attributes_relation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `label`
--

DROP TABLE IF EXISTS `label`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `label` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `code` varchar(36) NOT NULL COMMENT '标识主键',
  `label_name` varchar(36) NOT NULL COMMENT '标签名称',
  `type` int(2) DEFAULT '0' COMMENT '标签归属，0模型，1场景，2样例模板',
  `company_id` int(11) DEFAULT NULL COMMENT '组织公司Id',
  `create_by` varchar(50) DEFAULT NULL COMMENT '创建者',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_by` varchar(50) DEFAULT NULL COMMENT '修改者',
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `code_index` (`code`) USING BTREE COMMENT '简单索引'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='标签';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `label`
--

LOCK TABLES `label` WRITE;
/*!40000 ALTER TABLE `label` DISABLE KEYS */;
/*!40000 ALTER TABLE `label` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `model_definition_equipment`
--

DROP TABLE IF EXISTS `model_definition_equipment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `model_definition_equipment` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `code` varchar(36) NOT NULL COMMENT '标识主键',
  `object_template_id` int(11) DEFAULT NULL COMMENT '模型物模板id',
  `object_point_id` int(11) DEFAULT NULL COMMENT '模型物模板点位id',
  `equipment_id` varchar(36) DEFAULT NULL COMMENT '设备实际标志',
  `equipment_name` varchar(255) NOT NULL COMMENT '设备类别名称',
  `equipment_key` varchar(255) NOT NULL COMMENT '设备类别字段',
  `equipment_data_type` varchar(255) NOT NULL COMMENT '设备数据类型',
  `script` varchar(255) NOT NULL COMMENT '脚本',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `code_index` (`code`) USING BTREE COMMENT '简单索引'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='模型物模板点位设备绑定';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `model_definition_equipment`
--

LOCK TABLES `model_definition_equipment` WRITE;
/*!40000 ALTER TABLE `model_definition_equipment` DISABLE KEYS */;
/*!40000 ALTER TABLE `model_definition_equipment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `model_drive_state`
--

DROP TABLE IF EXISTS `model_drive_state`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `model_drive_state` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `code` varchar(36) NOT NULL COMMENT '标识主键',
  `model_id` int(11) NOT NULL COMMENT '模型id',
  `model_code` varchar(36) NOT NULL COMMENT '模型code',
  `model_state_name` varchar(25) NOT NULL COMMENT '模型状态名称',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `code_index` (`code`) USING BTREE COMMENT '简单索引'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='模型构件状态';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `model_drive_state`
--

LOCK TABLES `model_drive_state` WRITE;
/*!40000 ALTER TABLE `model_drive_state` DISABLE KEYS */;
/*!40000 ALTER TABLE `model_drive_state` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `model_field_relation`
--

DROP TABLE IF EXISTS `model_field_relation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `model_field_relation` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `model_id` int(11) DEFAULT NULL COMMENT '模型id',
  `field_id` int(11) DEFAULT NULL COMMENT '领域id',
  `attributes_id` int(11) DEFAULT NULL COMMENT '属性id',
  `subattribute_id` int(11) DEFAULT NULL COMMENT '子属性id',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='模型领域关系';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `model_field_relation`
--

LOCK TABLES `model_field_relation` WRITE;
/*!40000 ALTER TABLE `model_field_relation` DISABLE KEYS */;
/*!40000 ALTER TABLE `model_field_relation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `model_info`
--

DROP TABLE IF EXISTS `model_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `model_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `code` varchar(36) NOT NULL COMMENT '标识主键',
  `source` int(2) DEFAULT '0' COMMENT '模型来源，0平台端，1租户端',
  `name` varchar(64) NOT NULL COMMENT '模型名称',
  `brand_id` int(11) DEFAULT NULL COMMENT '品牌id',
  `company_id` int(11) DEFAULT NULL COMMENT '最上级组织公司Id',
  `specifications` varchar(255) DEFAULT NULL COMMENT '规格型号',
  `thumbnail` varchar(1000) DEFAULT NULL COMMENT '缩略图标记',
  `model_file` varchar(1000) DEFAULT NULL COMMENT '模型文件标记',
  `model_file_process_url` varchar(1000) DEFAULT NULL COMMENT '处理后文件标记',
  `model_source_file` varchar(255) DEFAULT NULL COMMENT '模型文件名称',
  `model_pending_file` varchar(255) DEFAULT NULL COMMENT '待处理源文件名称',
  `model_processed_file` varchar(255) DEFAULT NULL COMMENT '处理后文件名称',
  `description` varchar(255) DEFAULT NULL COMMENT '说明',
  `object_model` varchar(255) DEFAULT NULL COMMENT '物模型',
  `owner_id` varchar(36) DEFAULT '0' COMMENT '拥有者id',
  `chunk_id` int(11) DEFAULT NULL COMMENT '块id',
  `type` int(2) DEFAULT '0' COMMENT '模型类型，0模型，1场景',
  `state` int(2) DEFAULT '0' COMMENT '模型状态，0待处理，1已处理',
  `upload_state` int(2) DEFAULT '1' COMMENT '上传状态，0上传中，1上传完成',
  `deleted` int(2) DEFAULT '0' COMMENT '是否已删除，0未删除，1已删除',
  `create_by` varchar(50) DEFAULT NULL COMMENT '创建者',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_by` varchar(50) DEFAULT NULL COMMENT '修改者',
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `code_index` (`code`) USING BTREE COMMENT '简单索引'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='模型详情';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `model_info`
--

LOCK TABLES `model_info` WRITE;
/*!40000 ALTER TABLE `model_info` DISABLE KEYS */;
/*!40000 ALTER TABLE `model_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `model_label_relation`
--

DROP TABLE IF EXISTS `model_label_relation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `model_label_relation` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `model_id` int(11) DEFAULT NULL COMMENT '模型id',
  `label_id` int(11) DEFAULT NULL COMMENT '标签id',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='租户端模型标签关系';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `model_label_relation`
--

LOCK TABLES `model_label_relation` WRITE;
/*!40000 ALTER TABLE `model_label_relation` DISABLE KEYS */;
/*!40000 ALTER TABLE `model_label_relation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `model_member_info`
--

DROP TABLE IF EXISTS `model_member_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `model_member_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `code` varchar(36) NOT NULL COMMENT '标识主键',
  `model_id` int(11) NOT NULL COMMENT '模型id',
  `model_code` varchar(255) NOT NULL COMMENT '模型code',
  `node_id` varchar(255) NOT NULL COMMENT '构件节点',
  `node_code` varchar(255) DEFAULT NULL COMMENT '被关联构件唯一值',
  `model_state_id` int(11) NOT NULL COMMENT '模型状态id',
  `motion_type` varchar(15) NOT NULL COMMENT '动作类型',
  `axis` varchar(10) NOT NULL COMMENT '参考轴系',
  `mechanism_driven_name` varchar(25) NOT NULL COMMENT '机构驱动动作名称',
  `lower_limit` varchar(25) NOT NULL COMMENT '下限',
  `up_limit` varchar(25) NOT NULL COMMENT '上限',
  `real_time_value` varchar(25) NOT NULL COMMENT '实时值',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `code_index` (`code`) USING BTREE COMMENT '简单索引'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='模型构件详情';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `model_member_info`
--

LOCK TABLES `model_member_info` WRITE;
/*!40000 ALTER TABLE `model_member_info` DISABLE KEYS */;
/*!40000 ALTER TABLE `model_member_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `model_object_template`
--

DROP TABLE IF EXISTS `model_object_template`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `model_object_template` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `code` varchar(36) NOT NULL COMMENT '标识主键',
  `name` varchar(64) NOT NULL COMMENT '物模板名称',
  `model_name` varchar(64) NOT NULL COMMENT '模型名称',
  `model_code` varchar(36) NOT NULL COMMENT '模型code',
  `tsl` varchar(1000) DEFAULT NULL COMMENT '文件结构',
  `create_by` varchar(50) DEFAULT NULL COMMENT '创建者',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_by` varchar(50) DEFAULT NULL COMMENT '修改者',
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `code_index` (`code`) USING BTREE COMMENT '简单索引'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='模型物模板';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `model_object_template`
--

LOCK TABLES `model_object_template` WRITE;
/*!40000 ALTER TABLE `model_object_template` DISABLE KEYS */;
/*!40000 ALTER TABLE `model_object_template` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `model_object_template_definition`
--

DROP TABLE IF EXISTS `model_object_template_definition`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `model_object_template_definition` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `code` varchar(36) NOT NULL COMMENT '标识主键',
  `model_code` varchar(36) NOT NULL COMMENT '模型code',
  `point_name` varchar(255) NOT NULL COMMENT '物模板点位名称',
  `point_english` varchar(255) NOT NULL COMMENT '点位英文名称',
  `data_type` varchar(20) NOT NULL COMMENT '数据类型',
  `enum_key` varchar(64) DEFAULT NULL COMMENT '枚举字段键',
  `enum_value` varchar(64) DEFAULT NULL COMMENT '枚举字段值',
  `point_desc` varchar(255) DEFAULT NULL COMMENT '描述',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `code_index` (`code`) USING BTREE COMMENT '简单索引'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='模型物模板点位定义';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `model_object_template_definition`
--

LOCK TABLES `model_object_template_definition` WRITE;
/*!40000 ALTER TABLE `model_object_template_definition` DISABLE KEYS */;
/*!40000 ALTER TABLE `model_object_template_definition` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `model_record`
--

DROP TABLE IF EXISTS `model_record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `model_record` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `code` varchar(36) NOT NULL COMMENT '标识主键',
  `model_code` varchar(36) NOT NULL COMMENT '模型标识主键',
  `pak_name` varchar(255) DEFAULT NULL COMMENT 'Pak文件名 ',
  `file_size` int(11) DEFAULT NULL COMMENT '文件大小',
  `version` varchar(255) DEFAULT NULL COMMENT '版本号',
  `chunk_id` int(11) DEFAULT NULL COMMENT '块Id',
  `model_file_url` varchar(1000) DEFAULT NULL COMMENT '模型文件标记',
  `load_path` varchar(1000) DEFAULT NULL COMMENT '模型引用地址',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `code_index` (`code`) USING BTREE COMMENT '简单索引'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='模型处理信息记录表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `model_record`
--

LOCK TABLES `model_record` WRITE;
/*!40000 ALTER TABLE `model_record` DISABLE KEYS */;
/*!40000 ALTER TABLE `model_record` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `other_sys_info`
--

DROP TABLE IF EXISTS `other_sys_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `other_sys_info` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `is_start` int(11) DEFAULT NULL COMMENT '是否开启',
  `create_time` timestamp NULL DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='其他系统信息';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `other_sys_info`
--

LOCK TABLES `other_sys_info` WRITE;
/*!40000 ALTER TABLE `other_sys_info` DISABLE KEYS */;
/*!40000 ALTER TABLE `other_sys_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `scenes`
--

DROP TABLE IF EXISTS `scenes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `scenes` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `code` varchar(36) NOT NULL COMMENT '标识主键',
  `source` int(2) DEFAULT '0' COMMENT '模型来源，0平台端，1租户端',
  `scenes_name` varchar(64) NOT NULL COMMENT '场景名称',
  `thumbnail` varchar(1000) DEFAULT NULL COMMENT '缩略图标记',
  `model_file` varchar(1000) DEFAULT NULL COMMENT '场景文件标记',
  `model_file_process_url` varchar(1000) DEFAULT NULL COMMENT '处理后文件标记',
  `model_source_file` varchar(255) DEFAULT NULL COMMENT '场景文件名称',
  `model_pending_file` varchar(255) DEFAULT NULL COMMENT '待处理源文件名称',
  `model_processed_file` varchar(255) DEFAULT NULL COMMENT '处理后文件名称',
  `owner_id` varchar(36) DEFAULT '0' COMMENT '拥有者id',
  `chunk_id` int(11) DEFAULT NULL COMMENT '块id',
  `company_id` int(11) DEFAULT NULL COMMENT '最上级组织公司Id',
  `type` int(2) DEFAULT '1' COMMENT '模型类型，0模型，1场景',
  `state` int(2) DEFAULT '0' COMMENT '模型状态，0待处理，1已处理',
  `upload_state` int(2) DEFAULT '1' COMMENT '上传状态，0上传中，1上传完成',
  `deleted` int(2) DEFAULT '0' COMMENT '是否已删除，0未删除，1已删除',
  `create_by` varchar(50) DEFAULT NULL COMMENT '创建者',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_by` varchar(50) DEFAULT NULL COMMENT '修改者',
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `code_index` (`code`) USING BTREE COMMENT '简单索引'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='应用场景详情';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scenes`
--

LOCK TABLES `scenes` WRITE;
/*!40000 ALTER TABLE `scenes` DISABLE KEYS */;
/*!40000 ALTER TABLE `scenes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `scenes_label_relation`
--

DROP TABLE IF EXISTS `scenes_label_relation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `scenes_label_relation` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `scenes_id` int(11) DEFAULT NULL COMMENT '应用场景id',
  `label_id` int(11) DEFAULT NULL COMMENT '标签id',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='场景标签关系';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scenes_label_relation`
--

LOCK TABLES `scenes_label_relation` WRITE;
/*!40000 ALTER TABLE `scenes_label_relation` DISABLE KEYS */;
/*!40000 ALTER TABLE `scenes_label_relation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subattribute`
--

DROP TABLE IF EXISTS `subattribute`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subattribute` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `subattribute_name` varchar(36) NOT NULL COMMENT '子属性名称',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='领域子属性';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subattribute`
--

LOCK TABLES `subattribute` WRITE;
/*!40000 ALTER TABLE `subattribute` DISABLE KEYS */;
/*!40000 ALTER TABLE `subattribute` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_company`
--

DROP TABLE IF EXISTS `sys_company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sys_company` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `code` varchar(36) NOT NULL COMMENT '标识主键',
  `company_name` varchar(255) NOT NULL COMMENT '组织名称',
  `pid` int(10) DEFAULT NULL COMMENT '上级组织id',
  `pname` varchar(255) DEFAULT NULL COMMENT '上级组织名称',
  `sort` int(4) DEFAULT '0' COMMENT '排序',
  `state` int(2) DEFAULT '0' COMMENT '是否可用，0可用，1禁用',
  `create_by` varchar(50) DEFAULT NULL COMMENT '创建者',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_by` varchar(50) DEFAULT NULL COMMENT '修改者',
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `code_index` (`code`) USING BTREE COMMENT '简单索引'
) ENGINE=InnoDB AUTO_INCREMENT=121 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='组织详情';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_company`
--

LOCK TABLES `sys_company` WRITE;
/*!40000 ALTER TABLE `sys_company` DISABLE KEYS */;
INSERT INTO `sys_company` VALUES (1,'5696175f-c7cd-4adf-b90c-421f1f01f63e','平台',NULL,'',0,0,'057c1d58-41a0-4c8a-850a-de1d3d755136','2022-02-07 07:42:43','057c1d58-41a0-4c8a-850a-de1d3d755136','2022-03-15 06:10:48'),(2,'3c4a92c9-94a3-41f0-ae0f-e4ce2e2b7a30','haier租户',NULL,'',8,0,'057c1d58-41a0-4c8a-850a-de1d3d755136','2022-02-15 09:11:41','057c1d58-41a0-4c8a-850a-de1d3d755136','2022-03-14 08:43:00');
/*!40000 ALTER TABLE `sys_company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_permission`
--

DROP TABLE IF EXISTS `sys_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sys_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `code` varchar(36) NOT NULL COMMENT '标识主键',
  `type` int(2) DEFAULT '0' COMMENT '菜单所属系统，0平台端，1租户端',
  `name` varchar(64) DEFAULT NULL COMMENT '菜单名称',
  `description` varchar(255) DEFAULT NULL COMMENT '功能说明',
  `pid` int(10) DEFAULT NULL COMMENT '父id',
  `url` varchar(128) DEFAULT NULL COMMENT 'url路径',
  `menu_type` int(2) DEFAULT NULL COMMENT '菜单类型;0菜单，1按钮',
  `state` int(2) DEFAULT '0' COMMENT '是否可用，0可用，1禁用',
  `keystr` varchar(64) DEFAULT NULL COMMENT '权限标识',
  `routing` varchar(255) DEFAULT NULL COMMENT '前端路由',
  `create_by` varchar(50) DEFAULT NULL COMMENT '创建者',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_by` varchar(50) DEFAULT NULL COMMENT '修改者',
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `code_index` (`code`) USING BTREE COMMENT '简单索引'
) ENGINE=InnoDB AUTO_INCREMENT=130 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='权限详情';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_permission`
--

LOCK TABLES `sys_permission` WRITE;
/*!40000 ALTER TABLE `sys_permission` DISABLE KEYS */;
INSERT INTO `sys_permission` VALUES (1,'1d163417-4ed2-4b7e-b8cc-cd78a1fb842d',0,'我的案例','平台我的案例菜单',0,'/api',0,0,'platform_case_list','/myCase',NULL,'2022-02-09 03:22:44',NULL,'2022-03-01 09:07:18'),(2,'e54d063f-2132-43d3-aaf7-cdb0508a737c',0,'草稿箱','平台草稿箱菜单',0,'/api',0,0,'platform_case_list','/drafts',NULL,'2022-02-09 05:13:06',NULL,'2022-03-01 09:07:18'),(3,'88678315-ff28-44b9-b42b-f92442f972ab',0,'样例模板','平台样例模板菜单',0,'/api',0,0,'platform_template_list','/example',NULL,'2022-02-09 05:18:24',NULL,'2022-03-17 09:35:27'),(4,'81952cd4-bcd8-40c0-8976-1c56edb77b8d',0,'应用场景','平台应用场景菜单',0,'/api',0,0,'platform_scenes_list','/applicationScenario',NULL,'2022-02-09 05:19:53',NULL,'2022-03-01 09:07:18'),(5,'c61c5b87-8fe2-4641-ba76-42bb18ca28e9',0,'数据面板','平台数据面板菜单',0,'/api',0,0,'platform_panel_list','/dashboardData',NULL,'2022-02-09 05:20:37',NULL,'2022-03-11 09:32:20'),(6,'38c70c9c-60e0-4d40-91b2-88e7db0d10ad',0,'模型管理','平台模型管理菜单',0,'/api',0,0,'platform_model_manager','/model/modelIndex',NULL,'2022-02-09 05:21:17',NULL,'2022-04-27 02:29:51'),(7,'04fe033b-38ee-4fb1-ba4a-9d74bc9d501a',0,'分类管理','平台分类管理菜单',0,'/api',0,0,'platform_classification_list','/field/fieldList',NULL,'2022-02-09 05:22:16',NULL,'2022-03-11 09:28:44'),(8,'1dc7bbc3-4d05-4047-8ba6-aa14fc7918e5',0,'系统设置','平台系统设置菜单',0,'/api',0,0,'platform_system_manager','/system',NULL,'2022-02-09 05:22:55',NULL,'2022-03-11 01:54:27'),(9,'c480d2f1-ec8d-4fee-b485-26f618e16fce',0,'模型列表','平台模型列表菜单',6,'/api',0,0,'platform_model_list','/model/modelList',NULL,'2022-02-09 05:41:19',NULL,'2022-04-26 09:54:05'),(10,'c872efa8-41c6-43ad-a970-f86d6a2ac053',0,'待处理模型','平台待处理模型菜单',6,'/api',0,0,'platform_model_pending','/model/modelManage',NULL,'2022-02-09 05:43:05',NULL,'2022-04-26 09:33:42'),(11,'0ea8d069-af06-4476-b332-2ece75259ca0',0,'用户管理','平台用户管理菜单',8,'/api',0,0,'platform_system_user_list','/system/userDetail',NULL,'2022-02-09 05:48:26',NULL,'2022-03-11 09:30:58'),(12,'20e86ef7-3e03-421d-bc3e-17b48acd6f67',0,'组织管理','平台组织管理菜单',8,'/api',0,0,'platform_system_company_list','/system/orgDetail',NULL,'2022-02-09 05:48:55',NULL,'2022-03-11 09:31:06'),(13,'76b22c66-300f-49bb-a9b8-ff680d25737c',0,'角色管理','平台角色管理菜单',8,'/api',0,0,'platform_system_role_list','/system/roleDetail',NULL,'2022-02-09 05:49:21',NULL,'2022-03-11 09:31:08'),(14,'731e4f96-79fc-48b4-ba36-b570fffcd79a',1,'我的案例','租户我的案例菜单',0,'/api',0,0,'platform_case_list','/myCase',NULL,'2022-02-09 06:27:00',NULL,'2022-03-01 09:07:18'),(15,'237021fc-a329-421c-8911-089f1401e48e',1,'草稿箱','租户草稿箱菜单',0,'/api',0,0,'tenant_draftbox_list','/drafts',NULL,'2022-02-09 05:13:06',NULL,'2022-02-23 09:11:51'),(16,'85003c95-fa73-4ca3-8445-26448b308ba1',1,'样例模板','租户样例模板菜单竖版',0,'/api',0,0,'tenant_template_manager','/example',NULL,'2022-02-09 06:27:55',NULL,'2022-03-17 09:40:53'),(17,'4c38438d-4627-4c12-b420-8431755d7cba',1,'应用场景','租户应用场景菜单竖版',0,'/api',0,0,'tenant_scenes_manager','/tenant',NULL,'2022-02-09 06:28:35',NULL,'2022-03-01 09:07:18'),(18,'81829670-527e-4d66-b054-bea221bd0881',1,'数据面板','租户数据面板菜单竖版',0,'/api',0,0,'tenant_panel_manager','/dashboardData',NULL,'2022-02-09 06:29:17',NULL,'2022-03-11 09:32:13'),(19,'cdc0285f-b4c7-4681-a8c5-4ac5b917726e',1,'模型管理','租户模型菜单竖版',0,'/api',0,0,'tenant_model_manager','/tenant/model',NULL,'2022-02-09 06:29:32',NULL,'2022-03-02 07:13:09'),(20,'0bf74707-8df3-4d21-9791-f554be89512f',1,'系统设置','租户系统设置菜单',0,'/api',0,0,'tenant_system_manager','/system',NULL,'2022-02-09 06:29:53',NULL,'2022-03-11 01:54:36'),(21,'e6e2119c-b30f-444a-99a3-92b9fc15482f',1,'模型列表','租户模型列表菜单竖版',19,'/api',0,0,'tenant_model_list','/tenant/model/list',NULL,'2022-02-09 06:41:05',NULL,'2022-03-01 09:07:18'),(22,'a1e86e41-408d-4cff-a6fd-29ac101d978c',1,'用户管理','租户用户管理菜单',20,'/api',0,0,'tenant_system_user_list','/system/userDetail',NULL,'2022-02-09 06:44:34',NULL,'2022-03-11 09:31:32'),(23,'e8198564-3bb0-4130-9c50-079178c12886',1,'组织管理','租户组织管理菜单',20,'/api',0,0,'tenant_system_company_list','/system/orgDetail',NULL,'2022-02-09 06:45:05',NULL,'2022-03-11 09:31:31'),(24,'f68257b2-202a-469c-bec6-ce7759b95313',1,'角色管理','租户角色管理菜单',20,'/api',0,0,'tenant_system_role_list','/system/roleDetail',NULL,'2022-02-09 06:45:36',NULL,'2022-03-11 09:31:24'),(25,'5780823b-db86-4903-8906-6d73aa02d129',0,'查看','平台案例详情按钮',1,'/api',1,0,'platform_case_details',NULL,NULL,'2022-02-09 05:26:25',NULL,'2022-03-01 09:07:18'),(26,'034c9e85-37cc-43b5-8742-c19b0400cdd5',0,'编辑','平台案例编辑按钮',1,'/api',1,0,'platform_case_update',NULL,NULL,'2022-02-09 05:26:25',NULL,'2022-03-01 09:07:18'),(27,'0c627654-ebd7-4b2b-9fc6-3422375c5bca',0,'删除','平台案例删除按钮',1,'/api',1,0,'platform_case_delete',NULL,NULL,'2022-02-09 05:26:25',NULL,'2022-03-01 09:07:18'),(28,'97ebbdb6-9640-419a-91ea-e87e9208443b',0,'查看','平台草稿箱详情按钮',2,'/api',1,0,'platform_case_details','/drafts/detail',NULL,'2022-02-09 05:27:31',NULL,'2022-03-01 09:07:18'),(29,'8f9c6496-a4da-4312-a247-0cd3f45f45dc',0,'新增','平台草稿箱创建按钮',2,'/api',1,0,'platform_case_update',NULL,NULL,'2022-02-09 05:28:14',NULL,'2022-03-01 09:07:18'),(30,'901afad3-2464-4ad6-b2af-84e9c3e6ed04',0,'修改','平台草稿箱编辑按钮',2,'/api',1,0,'platform_case_update','/drafts/edit',NULL,'2022-02-09 05:28:37',NULL,'2022-03-01 09:07:18'),(31,'db704d1b-14d3-42cb-a53d-e4894a6b63ad',0,'删除','平台草稿箱删除按钮',2,'/api',1,0,'platform_case_delete',NULL,NULL,'2022-02-09 05:29:00',NULL,'2022-03-01 09:07:18'),(32,'2a0da5ae-a98d-469b-8ee8-c7bf3d05ef1a',0,'新增','平台样例模板创建按钮',3,'/api',1,0,'platform_template_create',NULL,NULL,'2022-02-09 05:30:35',NULL,NULL),(33,'2b1f28df-260e-44ac-9a98-f195cc8115e7',0,'编辑','平台样例模板编辑按钮',3,'/api',1,0,'platform_template_update','/example/edit',NULL,'2022-02-09 05:30:53',NULL,'2022-03-17 09:35:47'),(34,'48b2ac64-a931-4152-8b4c-1b4105a5b121',0,'删除','平台样例模板删除按钮',3,'/api',1,0,'platform_template_delete',NULL,NULL,'2022-02-09 05:31:15',NULL,NULL),(35,'0e165689-a3db-476f-8691-54ecfd06bd57',0,'查看','平台样例模板查看按钮',3,'/api',1,0,'platform_template_details',NULL,NULL,'2022-02-09 05:31:15',NULL,NULL),(36,'98d36130-981f-4dc9-b785-aca2105af74a',0,'新增','平台应用场景添加按钮',4,'/api',1,0,'platform_scenes_create',NULL,NULL,'2022-02-09 05:32:08',NULL,'2022-03-01 09:07:18'),(37,'aeaa95ae-9024-42f9-bfce-f568030c0726',0,'查看','平台应用场景查看按钮',4,'/api',1,0,'platform_scenes_select','/applicationScenario/sceneCheck',NULL,'2022-02-09 05:32:41',NULL,'2022-03-01 09:07:18'),(38,'3a4bc86e-c1cf-431f-974c-ab0bdf7f26d1',0,'编辑','平台应用场景编辑按钮',4,'/api',1,0,'platform_scenes_update','/applicationScenario/editScene',NULL,'2022-02-09 05:33:08',NULL,'2022-03-01 09:07:18'),(39,'3ef87f51-caec-47b8-83fc-2e4f70507bbe',0,'删除','平台应用场景删除按钮',4,'/api',1,0,'platform_scenes_delete',NULL,NULL,'2022-02-09 05:33:24',NULL,'2022-03-01 09:07:18'),(40,'351b5113-4fd4-43e2-85bf-c16e43c13247',0,'批量导入','平台应用场景批量导入按钮',4,'/api',1,0,'platform_scenes_batchimport','/applicationScenario/batchExport',NULL,'2022-02-09 05:34:23',NULL,'2022-02-23 08:28:29'),(41,'ca22ca16-19e3-4066-be6f-8ba57215f9a0',0,'新增','平台数据面板创建按钮',5,'/api',1,0,'platform_panel_create',NULL,NULL,'2022-02-09 05:35:28',NULL,NULL),(42,'678172da-d70f-4c6a-a25e-72d75bdbfe8a',0,'查看','平台数据面板查看按钮',5,'/api',1,0,'platform_panel_select',NULL,NULL,'2022-02-09 05:35:56',NULL,NULL),(43,'d5ba9632-1761-4f08-9576-a406838ac262',0,'编辑','平台数据面板编辑按钮',5,'/api',1,0,'platform_panel_update',NULL,NULL,'2022-02-09 05:36:12',NULL,NULL),(44,'cb759406-97b6-416c-9c6a-3e8bf1119a8f',0,'删除','平台数据面板删除按钮',5,'/api',1,0,'platform_panel_delete',NULL,NULL,'2022-02-09 05:36:28',NULL,NULL),(45,'17c38c3e-dc1d-4f95-896b-9589e2e0dcb9',0,'新增','平台模型添加按钮',9,'/api',1,0,'platform_model_create',NULL,NULL,'2022-02-09 05:37:36',NULL,'2022-03-01 09:07:18'),(46,'c0daca8a-2bfa-454e-b2ca-c818933d716c',0,'查看','平台模型查看按钮',9,'/api',1,0,'platform_model_select','/model/checkModel',NULL,'2022-02-09 05:38:02',NULL,'2022-03-01 09:07:18'),(47,'398566e6-6b40-40c7-8a1e-59622404e550',0,'编辑','平台模型编辑按钮',9,'/api',1,0,'platform_model_update','/model/editModel',NULL,'2022-02-09 05:38:20',NULL,'2022-03-01 09:07:18'),(48,'69abab6a-c080-42bb-b7d1-b2510003e68c',0,'删除','平台模型删除按钮',9,'/api',1,0,'platform_model_delete',NULL,NULL,'2022-02-09 05:39:08',NULL,'2022-03-01 09:07:18'),(49,'5380bb40-2b2f-4099-9719-1276dfa275f2',0,'批量导入','平台模型批量导入按钮',9,'/api',1,0,'platform_model_batchimport','/model/modelExport',NULL,'2022-02-09 05:39:37',NULL,'2022-03-01 09:07:18'),(50,'f7d9ebdf-23a5-4e89-baab-5effed3e26c8',0,'批量处理','平台模型批量处理按钮',10,'/api',1,0,'platform_model_batchdeal',NULL,NULL,'2022-02-09 05:44:24',NULL,NULL),(51,'4f4d3293-6ae2-4ee9-8178-17b7f554699a',0,'新增','平台分类管理添加领域按钮',7,'/api',1,0,'platform_classification_create',NULL,NULL,'2022-02-09 05:45:33',NULL,'2022-03-01 09:07:18'),(52,'9334b140-0bfe-45f2-90bb-1ae19031c201',0,'编辑','平台分类管理编辑领域按钮',7,'/api',1,0,'platform_classification_update',NULL,NULL,'2022-02-09 05:45:56',NULL,'2022-03-01 09:07:18'),(53,'f875d74f-2544-460a-8a23-10ab31405699',0,'查看','平台分类管理查看领域按钮',7,'/api',1,0,'platform_classification_details',NULL,NULL,'2022-02-09 05:46:42',NULL,NULL),(54,'106c5932-7399-4f73-805d-7228f338040d',0,'删除','平台分类管理删除领域按钮',7,'/api',1,0,'platform_classification_delete',NULL,NULL,'2022-02-09 05:46:42',NULL,NULL),(55,'5241a0ae-f383-4777-8f41-62be9910861c',0,'新增','平台用户管理新增按钮',11,'/api',1,0,'platform_system_user_create',NULL,NULL,'2022-02-09 05:49:44',NULL,NULL),(56,'1e750fd0-8fc0-4ef2-bef6-5717cf71a225',0,'查看','平台用户管理查看按钮',11,'/api',1,0,'platform_system_user_details',NULL,NULL,'2022-02-09 05:49:44',NULL,NULL),(57,'89a26922-01a8-478b-8c88-edf6f86b676f',0,'删除','平台用户管理删除按钮',11,'/api',1,0,'platform_system_user_delete',NULL,NULL,'2022-02-09 05:52:06',NULL,NULL),(58,'8b9b0207-d700-4180-b0c2-087851b33e72',0,'编辑','平台用户管理编辑按钮',11,'/api',1,0,'platform_system_user_update',NULL,NULL,'2022-02-09 05:51:41',NULL,NULL),(59,'5b0b743b-ce3f-4977-a375-e90659ea81d9',0,'新增','平台组织管理新增按钮',12,'/api',1,0,'platform_system_company_create',NULL,NULL,'2022-02-09 05:53:20',NULL,'2022-03-01 09:07:18'),(60,'1f9296fb-3a00-4f2c-af86-ab32f2b79fef',0,'查看','平台组织管理查看按钮',12,'/api',1,0,'platform_system_company_details',NULL,NULL,'2022-02-09 05:53:20',NULL,'2022-03-01 09:07:18'),(61,'5fa744cb-b7cd-4f81-85b0-bbb262d4ab4d',0,'编辑','平台组织管理编辑按钮',12,'/api',1,0,'platform_system_company_update',NULL,NULL,'2022-02-09 05:53:39',NULL,'2022-03-01 09:07:18'),(62,'ac28c72e-2e47-4088-9ee8-6578eb345f2d',0,'删除','平台组织管理删除按钮',12,'/api',1,0,'platform_system_company_delete',NULL,NULL,'2022-02-09 05:53:55',NULL,'2022-03-01 09:07:18'),(63,'dd2c4ef4-4886-4a24-a789-c5164db015be',0,'新增','平台角色管理新增按钮',13,'/api',1,0,'platform_system_role_create',NULL,NULL,'2022-02-09 05:54:36',NULL,'2022-03-01 09:07:18'),(64,'d7832543-4afd-4f11-b8a0-4b7a333c2fb6',0,'编辑','平台角色管理编辑按钮',13,'/api',1,0,'platform_system_role_update',NULL,NULL,'2022-02-09 05:54:54',NULL,'2022-03-01 09:07:18'),(65,'70735131-576f-4b30-98a6-b5e51d4da3ee',0,'删除','平台角色管理删除按钮',13,'/api',1,0,'platform_system_role_delete',NULL,NULL,'2022-02-09 05:55:11',NULL,'2022-03-01 09:07:18'),(66,'216e3d70-a643-4a70-9a36-f4a78998b1cd',0,'查看','平台角色管理查看按钮',13,'/api',1,0,'platform_system_role_details',NULL,NULL,'2022-02-09 05:54:36',NULL,'2022-03-01 09:07:18'),(67,'5780823b-db86-4903-8906-6d73aa02d129',1,'查看','租户案例详情按钮',14,'/api',1,0,'tenant_case_details',NULL,NULL,'2022-02-09 05:26:25',NULL,NULL),(68,'26b27795-c4e4-4696-a04b-b76451930ab6',1,'编辑','租户案例编辑按钮',14,'/api',1,0,'tenant_case_update',NULL,NULL,'2022-02-09 05:26:25',NULL,NULL),(69,'297e52fa-5229-45d8-8abc-4559b84ff035',1,'删除','租户案例删除按钮',14,'/api',1,0,'tenant_case_delete',NULL,NULL,'2022-02-09 05:26:25',NULL,NULL),(70,'2ad2a8f2-8986-4e36-985f-8c9c3b25a0df',1,'查看','租户草稿箱详情按钮',15,'/api',1,0,'tenant_draftbox_details',NULL,NULL,'2022-02-09 05:27:31',NULL,NULL),(71,'3350e26d-f448-4a00-9b64-8096597cd68b',1,'新增','租户草稿箱创建按钮',15,'/api',1,0,'tenant_draftbox_create',NULL,NULL,'2022-02-09 05:28:14',NULL,NULL),(72,'33e26c66-cf90-4e3c-a220-adf1f1a84ede',1,'修改','租户草稿箱编辑按钮',15,'/api',1,0,'tenant_draftbox_update',NULL,NULL,'2022-02-09 05:28:37',NULL,NULL),(73,'34603f8a-80a8-4072-b38f-21d04e865590',1,'删除','租户草稿箱删除按钮',15,'/api',1,0,'tenant_draftbox_delete',NULL,NULL,'2022-02-09 05:29:00',NULL,NULL),(74,'0b11d9e1-d69b-4040-98c3-3140c5d48c68',1,'查看','租户样例模板查看按钮',16,'/api',1,0,'tenant_template_select',NULL,NULL,'2022-02-09 06:31:32',NULL,NULL),(75,'d1502645-e777-4820-b78e-2e239ddb2dbb',1,'新增','租户样例模板新增按钮',16,'/api',1,0,'tenant_template_create',NULL,NULL,'2022-02-09 06:32:04',NULL,NULL),(76,'360f88bf-defa-475c-900d-b2b3eef5639d',1,'删除','租户样例模板删除按钮',16,'/api',1,0,'tenant_template_delete',NULL,NULL,'2022-02-09 06:32:04',NULL,NULL),(77,'be3ae93f-4eeb-4221-b6e6-35ab0ce2a67c',1,'新增','租户应用场景添加按钮',17,'/api',1,0,'tenant_scenes_create','/tenant/add',NULL,'2022-02-09 06:34:54',NULL,'2022-03-01 09:07:18'),(78,'2b375e09-668b-446b-84f6-8f66f7389987',1,'编辑','租户应用场景编辑按钮',17,'/api',1,0,'tenant_scenes_update','/tenant/edit/:code',NULL,'2022-02-09 06:34:54',NULL,'2022-03-01 09:07:18'),(79,'bf53fad0-6346-4636-a494-7488ad51ec47',1,'删除','租户应用场景删除按钮',17,'/api',1,0,'tenant_scenes_delete',NULL,NULL,'2022-02-09 06:34:58',NULL,'2022-03-01 09:07:18'),(80,'579f9dcb-6a5c-437d-8a7d-aa987f30d2f4',1,'批量导入','租户应用场景批量导入按钮',17,'/api',1,0,'tenant_scenes_batchimport',NULL,NULL,'2022-02-09 06:34:59',NULL,'2022-03-01 09:07:18'),(81,'017cc608-8591-4b7a-83ed-0db85faf80e4',1,'查看','租户数据面板查看按钮',18,'/api',1,0,'tenant_panel_select',NULL,NULL,'2022-02-09 06:38:43',NULL,NULL),(82,'b147e988-89e7-41a5-86be-db55d402ca48',1,'删除','租户数据面板删除按钮',18,'/api',1,0,'tenant_panel_delete',NULL,NULL,'2022-02-09 06:38:46',NULL,NULL),(83,'27b69d69-9838-46dd-b01a-4beed2bbe90a',1,'新增','租户数据面板新增按钮',18,'/api',1,0,'tenant_panel_create',NULL,NULL,'2022-02-09 06:39:28',NULL,NULL),(84,'707f3e42-3878-48fd-9a8f-65013a7bedfd',1,'编辑','租户数据面板编辑按钮',18,'/api',1,0,'tenant_panel_update',NULL,NULL,'2022-02-09 06:39:29',NULL,NULL),(85,'00b42265-0cdc-4780-8ae5-c24e72b5849d',1,'查看','租户模型查看按钮',21,'/api',1,0,'tenant_model_select',NULL,NULL,'2022-02-09 06:41:24',NULL,'2022-03-01 09:07:18'),(86,'b472a128-2a34-4913-9b58-b28dfcd9c1c2',1,'新增','租户模型添加按钮',21,'/api',1,0,'tenant_model_create','/tenant/model/add',NULL,'2022-02-09 06:41:27',NULL,'2022-03-01 09:07:18'),(87,'7f542a66-9779-4442-a257-ba59fa53670e',1,'编辑','租户模型编辑按钮',21,'/api',1,0,'tenant_model_update','/tenant/model/edit/:code',NULL,'2022-02-09 06:41:28',NULL,'2022-03-01 09:07:18'),(88,'ef5a665c-15f0-46d0-ba89-de88ce24240d',1,'删除','租户模型删除按钮',21,'/api',1,0,'tenant_model_delete',NULL,NULL,'2022-02-09 06:41:29',NULL,'2022-03-01 09:07:18'),(89,'d670b245-76c0-41cc-a475-4d83b0f6e117',1,'批量导入','租户模型批量导入按钮',21,'/api',1,0,'tenant_model_batchimport',NULL,NULL,'2022-02-09 06:41:30',NULL,'2022-03-01 09:07:18'),(90,'96ce3501-9a96-4432-bf2c-97b443b15f02',1,'新增','租户用户管理新增按钮',22,'/api',1,0,'tenant_system_user_create',NULL,NULL,'2022-02-09 06:44:35',NULL,NULL),(91,'3713fcbb-2362-4552-b2f6-9b2045f843a3',1,'查看','租户用户管理查看按钮',22,'/api',1,0,'tenant_system_user_select',NULL,NULL,'2022-02-09 06:44:35',NULL,NULL),(92,'30daeb2f-27f2-46b4-ae96-0b17664fc3ed',1,'编辑','租户用户管理编辑按钮',22,'/api',1,0,'tenant_system_user_update',NULL,NULL,'2022-02-09 06:44:36',NULL,NULL),(93,'51199f77-280f-4f02-bfa0-e121b9f755f1',1,'删除','租户用户管理删除按钮',22,'/api',1,0,'tenant_system_user_delete',NULL,NULL,'2022-02-09 06:44:37',NULL,NULL),(94,'3ae1803d-aa08-4c2e-b0b2-3092e1e9b4bd',1,'新增','租户组织管理新增按钮',23,'/api',1,0,'tenant_system_company_create',NULL,NULL,'2022-02-09 06:45:06',NULL,NULL),(95,'3c41c3aa-7f64-49f1-9805-6a7f6f731125',1,'查看','租户组织管理查看按钮',23,'/api',1,0,'tenant_system_company_select',NULL,NULL,'2022-02-09 06:45:06',NULL,NULL),(96,'79a1fb48-2f9d-45f2-b63e-760794d38310',1,'编辑','租户组织管理编辑按钮',23,'/api',1,0,'tenant_system_company_update',NULL,NULL,'2022-02-09 06:45:07',NULL,NULL),(97,'23b47469-a129-448e-8a9f-b1e469cd10fa',1,'删除','租户组织管理删除按钮',23,'/api',1,0,'tenant_system_company_delete',NULL,NULL,'2022-02-09 06:45:08',NULL,NULL),(98,'949b0470-9f75-4a0c-b2a2-8268c0cea6f8',1,'新增','租户角色管理新增按钮',24,'/api',1,0,'tenant_system_role_create',NULL,NULL,'2022-02-09 06:45:37',NULL,NULL),(99,'3cf7498f-d8b2-44d5-980d-b8f2a012e726',1,'查看','租户角色管理查看按钮',24,'/api',1,0,'tenant_system_role_select',NULL,NULL,'2022-02-09 06:45:37',NULL,NULL),(100,'8c14f741-c6c6-4076-a181-36edd3a8d15a',1,'编辑','租户角色管理编辑按钮',24,'/api',1,0,'tenant_system_role_update',NULL,NULL,'2022-02-09 06:45:38',NULL,NULL),(101,'1452ae28-261a-4d7e-8b40-05c1510673f0',1,'删除','租户角色管理删除按钮',24,'/api',1,0,'tenant_system_role_delete',NULL,NULL,'2022-02-09 06:45:39',NULL,NULL),(102,'c5f903f3-0b3f-4a70-a797-21f4245c3d11',1,'样例模板','租户样例模板菜单横板',0,'/api',0,0,'tenant_template_manager','/example',NULL,'2022-02-09 06:27:55',NULL,'2022-03-17 09:39:00'),(103,'ce3872c0-191f-4421-9db5-98307690255e',1,'应用场景','租户应用场景菜单横板',0,'/api',0,0,'tenant_scenes_manager','/applicationScenario',NULL,'2022-02-09 06:28:35',NULL,'2022-03-01 09:31:04'),(104,'cec10995-4903-4e53-b0ed-5bfb3cb6458f',1,'数据面板','租户数据面板菜单横板',0,'/api',0,0,'tenant_panel_manager','/dashboardData',NULL,'2022-02-09 06:29:17',NULL,'2022-03-11 09:32:38'),(105,'d03b4125-e1ce-45af-9c4b-375b1904a02a',1,'模型列表','租户模型列表菜单横板',122,'/api',0,0,'tenant_model_list','/model/modelList',NULL,'2022-02-09 06:41:05',NULL,'2022-03-02 07:14:35'),(106,'1bdf4235-6434-41d1-8ceb-d7ea83770223',1,'新增','租户应用场景添加按钮',103,'/api',1,0,'tenant_scenes_create','/tenant/add',NULL,'2022-02-09 06:34:54',NULL,'2022-03-01 09:07:18'),(107,'1be03901-7a0c-4b20-a9b4-118e1e804cb6',1,'编辑','租户应用场景编辑按钮',103,'/api',1,0,'tenant_scenes_update','/tenant/edit/:code',NULL,'2022-02-09 06:34:54',NULL,'2022-03-01 09:07:18'),(108,'1da3b1bf-4442-46e7-9429-5de4a542f587',1,'删除','租户应用场景删除按钮',103,'/api',1,0,'tenant_scenes_delete',NULL,NULL,'2022-02-09 06:34:58',NULL,'2022-03-01 09:07:18'),(109,'1e35f84f-be82-488e-8866-9848dfcd7bbf',1,'批量导入','租户应用场景批量导入按钮',103,'/api',1,0,'tenant_scenes_batchimport',NULL,NULL,'2022-02-09 06:34:59',NULL,'2022-03-01 09:07:18'),(110,'1e468ea3-e684-4484-b29c-320e5c0462ee',1,'查看','租户模型查看按钮',105,'/api',1,0,'tenant_model_select',NULL,NULL,'2022-02-09 06:41:24',NULL,'2022-03-01 09:07:18'),(111,'1e73c137-910c-4b72-8d44-9201946bf72f',1,'新增','租户模型添加按钮',105,'/api',1,0,'tenant_model_create','/tenant/model/add',NULL,'2022-02-09 06:41:27',NULL,'2022-03-01 09:07:18'),(112,'1e7947cb-847d-4129-b777-a646a66aa97a',1,'编辑','租户模型编辑按钮',105,'/api',1,0,'tenant_model_update','/tenant/model/edit/:code',NULL,'2022-02-09 06:41:28',NULL,'2022-03-01 09:07:18'),(113,'1f3ee39f-23fd-42df-a8db-b59a515e8e7d',1,'删除','租户模型删除按钮',105,'/api',1,0,'tenant_model_delete',NULL,NULL,'2022-02-09 06:41:29',NULL,'2022-03-01 09:07:18'),(114,'1f69b310-9504-4604-8a46-c0bb44434e7a',1,'批量导入','租户模型批量导入按钮',105,'/api',1,0,'tenant_model_batchimport',NULL,NULL,'2022-02-09 06:41:30',NULL,'2022-03-01 09:07:18'),(115,'1da49ec3-9346-46f2-8945-d192138448b5',1,'查看','租户样例模板查看按钮',102,'/api',1,0,'tenant_template_select',NULL,NULL,'2022-02-09 06:31:32',NULL,'2022-03-01 09:10:19'),(116,'1da847ee-c117-405e-9940-c11c8d1c9db2',1,'新增','租户样例模板新增按钮',102,'/api',1,0,'tenant_template_create',NULL,NULL,'2022-02-09 06:32:04',NULL,'2022-03-01 09:10:19'),(117,'1db797e9-a721-42c1-80e2-16687e3be9d7',1,'删除','租户样例模板删除按钮',102,'/api',1,0,'tenant_template_delete',NULL,NULL,'2022-02-09 06:32:04',NULL,'2022-03-01 09:10:19'),(118,'1dc1bb92-f20d-42b2-b8fe-85e237d33b04',1,'查看','租户数据面板查看按钮',104,'/api',1,0,'tenant_panel_select',NULL,NULL,'2022-02-09 06:38:43',NULL,'2022-03-01 09:14:18'),(119,'1dc9aca3-0179-484d-b2bb-a2dbb650204c',1,'删除','租户数据面板删除按钮',104,'/api',1,0,'tenant_panel_delete',NULL,NULL,'2022-02-09 06:38:46',NULL,'2022-03-01 09:14:18'),(120,'1ddc10f8-7219-41d1-aecf-5faed08c0e46',1,'新增','租户数据面板新增按钮',104,'/api',1,0,'tenant_panel_create',NULL,NULL,'2022-02-09 06:39:28',NULL,'2022-03-01 09:14:18'),(121,'1df122f8-9de8-4ea6-b549-947ae26a70f3',1,'编辑','租户数据面板编辑按钮',104,'/api',1,0,'tenant_panel_update',NULL,NULL,'2022-02-09 06:39:29',NULL,'2022-03-01 09:14:18'),(122,'12cc489b-da38-4f51-9764-e79351ee4436',1,'模型管理','租户模型菜单横板',0,'/api',0,0,'tenant_model_manager','/model',NULL,'2022-02-09 06:29:32',NULL,'2022-02-23 09:13:15'),(123,'79ba10e7-a8cc-4296-83a6-f1f4636290db',1,'编辑','租户样例模板编辑按钮',16,'/example/edit',1,0,'tenant_template_update',NULL,NULL,'2022-02-09 06:31:32',NULL,NULL),(124,'bf8dd3db-8bde-4f5c-86e2-975e836a382e',1,'编辑','租户样例模板编辑按钮',102,'/example/edit',1,0,'tenant_template_update',NULL,NULL,'2022-02-09 06:31:32',NULL,'2022-03-01 09:10:19'),(125,'bbadfce0-f25b-48ba-a755-b5c3c9940fec',1,'查看','租户应用场景查看按钮',17,'/api',1,0,'tenant_scenes_select',NULL,NULL,'2022-02-09 06:34:54',NULL,'2022-04-21 07:41:44'),(126,'bbadfce0-f25b-48ba-a755-b5c3c9940fec',1,'查看','租户应用场景查看按钮',103,'/api',1,0,'tenant_scenes_select',NULL,NULL,'2022-02-09 06:34:54',NULL,'2022-04-21 07:43:36'),(127,'16816f44-eaec-4d78-a94a-49537c4be1f0',1,'数据绑定','租户数据绑定菜单',0,'/api',0,0,'tenant_data_binding',NULL,NULL,'2022-02-09 06:29:32',NULL,'2022-06-27 02:58:08'),(128,'3b070143-4208-4ad1-8e68-3befb4815f8b',1,'模型映射','租户模型映射菜单',127,'/api',0,0,'tenant_model_mapping',NULL,NULL,'2022-02-09 06:41:05',NULL,'2022-06-27 02:58:08'),(129,'c52e2311-217f-4872-a585-56b5f86c2409',1,'绑定接口','租户绑定接口菜单',127,'/api',0,0,'tenant_bind_interface',NULL,NULL,'2022-02-09 06:41:05',NULL,'2022-06-27 02:58:08');
/*!40000 ALTER TABLE `sys_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_role`
--

DROP TABLE IF EXISTS `sys_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sys_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `code` varchar(36) NOT NULL COMMENT '标识主键',
  `role_type` int(2) DEFAULT '0' COMMENT '角色类型，0管理员角色，1租户角色',
  `type` int(2) DEFAULT NULL COMMENT '分类，0平台管理员，1租户',
  `role_name` varchar(64) DEFAULT NULL COMMENT '角色名',
  `company_id` int(11) DEFAULT NULL COMMENT '所属组织',
  `description` varchar(255) DEFAULT NULL COMMENT '备注',
  `state` int(2) DEFAULT '0' COMMENT '是否可用，0可用，1禁用',
  `create_by` varchar(50) DEFAULT NULL COMMENT '创建者',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_by` varchar(50) DEFAULT NULL COMMENT '修改者',
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `code_index` (`code`) USING BTREE COMMENT '简单索引'
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='角色详情';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_role`
--

LOCK TABLES `sys_role` WRITE;
/*!40000 ALTER TABLE `sys_role` DISABLE KEYS */;
INSERT INTO `sys_role` VALUES (1,'8609d837-3f47-4689-8ef4-ff5d2353cae4',0,0,'默认平台管理员',1,'默认平台管理员',0,NULL,'2022-02-10 09:32:56',NULL,'2022-03-10 09:06:25'),(2,'012c9683-5efb-48c7-ac2b-8e6d2fffe03e',0,1,'默认租户管理员',2,'默认租户管理员',0,NULL,'2022-02-10 09:35:39','057c1d58-41a0-4c8a-850a-de1d3d755136','2022-06-07 08:09:50');
/*!40000 ALTER TABLE `sys_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_role_permission`
--

DROP TABLE IF EXISTS `sys_role_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sys_role_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `permission_id` int(11) DEFAULT NULL COMMENT '权限id',
  `role_id` int(11) DEFAULT NULL COMMENT '角色id',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4931 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='角色权限关系';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_role_permission`
--

LOCK TABLES `sys_role_permission` WRITE;
/*!40000 ALTER TABLE `sys_role_permission` DISABLE KEYS */;
INSERT INTO `sys_role_permission` VALUES (1,1,1),(2,2,1),(3,3,1),(4,4,1),(5,5,1),(6,6,1),(7,7,1),(8,8,1),(9,9,1),(10,10,1),(11,11,1),(12,12,1),(13,13,1),(25,25,1),(26,26,1),(27,27,1),(28,28,1),(29,29,1),(30,30,1),(31,31,1),(32,32,1),(33,33,1),(34,34,1),(35,35,1),(36,36,1),(37,37,1),(38,38,1),(39,39,1),(40,40,1),(41,41,1),(42,42,1),(43,43,1),(44,44,1),(45,45,1),(46,46,1),(47,47,1),(48,48,1),(49,49,1),(50,50,1),(51,51,1),(52,52,1),(53,53,1),(54,54,1),(55,55,1),(56,56,1),(57,57,1),(58,58,1),(59,59,1),(60,60,1),(61,61,1),(62,62,1),(63,63,1),(64,64,1),(65,65,1),(66,66,1),(2481,14,2),(2483,67,2),(2485,68,2),(2487,69,2),(2489,15,2),(2491,70,2),(2493,71,2),(2495,72,2),(2497,73,2),(2499,122,2),(2501,105,2),(2503,110,2),(2505,111,2),(2507,112,2),(2509,113,2),(2511,114,2),(2513,20,2),(2515,22,2),(2517,90,2),(2519,91,2),(2521,92,2),(2523,93,2),(2525,23,2),(2527,94,2),(2529,95,2),(2531,96,2),(2533,97,2),(2535,24,2),(2537,98,2),(2539,99,2),(2541,100,2),(2543,101,2),(2545,102,2),(2547,115,2),(2549,116,2),(2551,117,2),(2553,124,2),(2555,103,2),(2557,106,2),(2559,107,2),(2561,108,2),(2563,109,2),(2565,126,2),(2567,104,2),(2569,118,2),(2571,119,2),(2573,120,2),(2575,121,2);
/*!40000 ALTER TABLE `sys_role_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_role_user`
--

DROP TABLE IF EXISTS `sys_role_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sys_role_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `user_id` int(11) DEFAULT NULL COMMENT '用户id',
  `role_id` int(11) DEFAULT NULL COMMENT '角色id',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=251 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='角色用户关系';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_role_user`
--

LOCK TABLES `sys_role_user` WRITE;
/*!40000 ALTER TABLE `sys_role_user` DISABLE KEYS */;
INSERT INTO `sys_role_user` VALUES (1,1,1),(2,2,2);
/*!40000 ALTER TABLE `sys_role_user` ENABLE KEYS */;
UNLOCK TABLES;

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
  `sex` int(2) DEFAULT '0' COMMENT '性别，0男，1女',
  `state` int(2) DEFAULT '0' COMMENT '是否可用，0可用，1禁用',
  `deleted` int(2) DEFAULT '0' COMMENT '是否已删除，0未删除，1已删除',
  `create_by` varchar(50) DEFAULT NULL COMMENT '创建者',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_by` varchar(50) DEFAULT NULL COMMENT '修改者',
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `code_index` (`code`) USING BTREE COMMENT '简单索引'
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='用户详情';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_user`
--

LOCK TABLES `sys_user` WRITE;
/*!40000 ALTER TABLE `sys_user` DISABLE KEYS */;
INSERT INTO `sys_user` VALUES (1,'057c1d58-41a0-4c8a-850a-de1d3d755136','admin','admin平台管理员用户','17d18b38cd1b5c8dc41bd10bebfdc7bd',1,0,'18312341234','18312341234@163.com',0,0,0,'057c1d58-41a0-4c8a-850a-de1d3d755136','2022-02-11 02:28:15','057c1d58-41a0-4c8a-850a-de1d3d755136','2022-07-06 07:22:46'),(2,'068d05f1-c82d-4b14-8339-56e09afbdb79','tenant','tenant租户管理员用户','17d18b38cd1b5c8dc41bd10bebfdc7bd',2,1,'18312341235','18312341234@163.com',0,0,0,'057c1d58-41a0-4c8a-850a-de1d3d755136','2022-02-11 02:31:33','057c1d58-41a0-4c8a-850a-de1d3d755136','2022-07-06 07:21:38');
/*!40000 ALTER TABLE `sys_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `template_basic_attribute`
--

DROP TABLE IF EXISTS `template_basic_attribute`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `template_basic_attribute` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `template_name` varchar(50) NOT NULL COMMENT '模板名称',
  `render` int(2) DEFAULT '0' COMMENT '渲染方式 0-本地渲染，1-云渲染',
  `render_address` varchar(128) DEFAULT '' COMMENT '云渲染地址',
  `render_password` varchar(128) DEFAULT '' COMMENT '云渲染密码',
  `image_url` varchar(255) NOT NULL COMMENT '图片链接',
  `create_by` varchar(50) DEFAULT '' COMMENT '创建者',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_by` varchar(50) DEFAULT '' COMMENT '修改者',
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `tenant_id` int(11) NOT NULL COMMENT '租户id',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `idx_name_tenant` (`template_name`,`tenant_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='样例模板基础属性';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `template_basic_attribute`
--

LOCK TABLES `template_basic_attribute` WRITE;
/*!40000 ALTER TABLE `template_basic_attribute` DISABLE KEYS */;
/*!40000 ALTER TABLE `template_basic_attribute` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `template_field_relation`
--

DROP TABLE IF EXISTS `template_field_relation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `template_field_relation` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `template_id` int(11) NOT NULL COMMENT '样例模板id',
  `field_id` int(11) NOT NULL COMMENT '领域id',
  `attributes_id` int(11) NOT NULL COMMENT '属性id',
  `subattribute_id` int(11) NOT NULL COMMENT '子属性id',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `idx_template_id` (`template_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='样例模板领域关系';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `template_field_relation`
--

LOCK TABLES `template_field_relation` WRITE;
/*!40000 ALTER TABLE `template_field_relation` DISABLE KEYS */;
/*!40000 ALTER TABLE `template_field_relation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `template_label_relation`
--

DROP TABLE IF EXISTS `template_label_relation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `template_label_relation` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `template_id` int(11) NOT NULL COMMENT '样例模板id',
  `label_id` int(11) NOT NULL COMMENT '标签id',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `idx_template_id` (`template_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='租户端样例模板标签关系';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `template_label_relation`
--

LOCK TABLES `template_label_relation` WRITE;
/*!40000 ALTER TABLE `template_label_relation` DISABLE KEYS */;
/*!40000 ALTER TABLE `template_label_relation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `template_model_attribute`
--

DROP TABLE IF EXISTS `template_model_attribute`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `template_model_attribute` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `index_code` varchar(255) NOT NULL COMMENT '模型唯一值',
  `parent_id` int(11) DEFAULT NULL COMMENT '父级id',
  `parent_code` varchar(255) DEFAULT '' COMMENT '父级编号',
  `template_id` int(11) NOT NULL COMMENT '样例模板id',
  `model_id` int(11) NOT NULL COMMENT '模型id',
  `model_type` int(2) NOT NULL COMMENT '模型类型 1-场景 2-数据面板 3-模型',
  `entity_code` varchar(255) DEFAULT '' COMMENT '模型编号',
  `entity_name` varchar(255) DEFAULT '' COMMENT '实例名称',
  `entity_size` varchar(50) NOT NULL COMMENT '实例大小',
  `entity_locate` varchar(50) NOT NULL COMMENT '实例坐标',
  `entity_rotate` varchar(50) NOT NULL COMMENT '实例旋转度',
  `tsl_path` varchar(255) DEFAULT '' COMMENT '物模型的TSL路径',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `idx_template_id` (`template_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='样例模板模型属性';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `template_model_attribute`
--

LOCK TABLES `template_model_attribute` WRITE;
/*!40000 ALTER TABLE `template_model_attribute` DISABLE KEYS */;
/*!40000 ALTER TABLE `template_model_attribute` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `template_panel_relation`
--

DROP TABLE IF EXISTS `template_panel_relation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `template_panel_relation` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `template_id` int(11) NOT NULL COMMENT '样例模板id',
  `panel_id` int(11) NOT NULL COMMENT '数据面板id',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `idx_template_id` (`template_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='样例模板数据面板关系';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `template_panel_relation`
--

LOCK TABLES `template_panel_relation` WRITE;
/*!40000 ALTER TABLE `template_panel_relation` DISABLE KEYS */;
/*!40000 ALTER TABLE `template_panel_relation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'dt-commercialization'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-09-02 18:07:23
