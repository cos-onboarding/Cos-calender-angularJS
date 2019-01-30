/*
Navicat MySQL Data Transfer

Source Server         : 测试本地库
Source Server Version : 50527
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50527
File Encoding         : 65001

Date: 2019-01-29 11:41:24
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for branch_information
-- ----------------------------
DROP TABLE IF EXISTS `branch_information`;
CREATE TABLE `branch_information` (
  `branch_id` int(32) NOT NULL AUTO_INCREMENT COMMENT '分行id',
  `branch_address` varchar(128) DEFAULT NULL COMMENT '分行地址',
  `branch_location` varchar(64) DEFAULT NULL COMMENT '分行所在区域',
  `branch_level` int(11) DEFAULT NULL COMMENT '分行级别',
  `branch_name` varchar(64) DEFAULT NULL COMMENT '分行名',
  `branch_manager` varchar(64) DEFAULT NULL COMMENT '分行负责人',
  `phone` varchar(64) DEFAULT NULL COMMENT '联系人电话',
  `creat_time` datetime DEFAULT NULL COMMENT '信息创建时间',
  PRIMARY KEY (`branch_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of branch_information
-- ----------------------------
INSERT INTO `branch_information` VALUES ('1', '香港中環德輔道中151號', '香港區', '1', '總行', 'gaoyue', '\n2622 2633', '2019-01-25 12:05:51');
INSERT INTO `branch_information` VALUES ('2', '香港中環德己立街1-13號世紀廣場2樓', '香港區', '2', '中區分行', 'peiqi1', '3982 9909', '2019-01-25 12:14:07');
INSERT INTO `branch_information` VALUES ('3', '\n九龍旺角彌敦道570號 ', '九龍區', '3', '彌敦道分行', 'peiqi2', '3982 9982', '2019-01-25 12:14:40');

-- ----------------------------
-- Table structure for calender_info
-- ----------------------------
DROP TABLE IF EXISTS `calender_info`;
CREATE TABLE `calender_info` (
  `info_id` int(30) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `create_time` varchar(50) DEFAULT NULL COMMENT '时间戳',
  PRIMARY KEY (`info_id`),
  KEY `info_id` (`info_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8 COMMENT='日历标题';

-- ----------------------------
-- Records of calender_info
-- ----------------------------
INSERT INTO `calender_info` VALUES ('1', '1548201600000');
INSERT INTO `calender_info` VALUES ('2', '1546732800000');
INSERT INTO `calender_info` VALUES ('3', '1546992000000');
INSERT INTO `calender_info` VALUES ('4', '1547683200000');
INSERT INTO `calender_info` VALUES ('5', '1547596800000');
INSERT INTO `calender_info` VALUES ('6', '1548028800000');
INSERT INTO `calender_info` VALUES ('7', '1548892800000');
INSERT INTO `calender_info` VALUES ('22', '1546473600000');

-- ----------------------------
-- Table structure for calender_schedule
-- ----------------------------
DROP TABLE IF EXISTS `calender_schedule`;
CREATE TABLE `calender_schedule` (
  `item_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `info_id` varchar(255) DEFAULT NULL COMMENT '对应日历标题总表create_time',
  `item_title` varchar(50) DEFAULT NULL COMMENT '标题',
  `item_body` text COMMENT '内容',
  `item_start_time` datetime DEFAULT NULL COMMENT '日程开始时间',
  `item_end_time` datetime DEFAULT NULL COMMENT '结束时间',
  `update_time` datetime DEFAULT NULL,
  `type` int(11) DEFAULT NULL COMMENT '0完成 1未完成 2失败 ',
  `user_name` varchar(50) DEFAULT NULL COMMENT '用户名称',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `user_id` int(11) DEFAULT NULL COMMENT '员工ID',
  `branch_id` int(11) DEFAULT NULL COMMENT '分行ID',
  PRIMARY KEY (`item_id`)
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of calender_schedule
-- ----------------------------
INSERT INTO `calender_schedule` VALUES ('3', '1546732800000', 'Financial management', 'Financial management', '2019-01-06 14:15:27', '2019-01-06 14:30:27', '2019-01-06 14:15:27', '0', 'gaoyue', '2019-01-03 11:19:59', '2', '2');
INSERT INTO `calender_schedule` VALUES ('4', '1546992000000', 'Transfer business123', '1 million transfers', '2019-01-09 02:15:27', '2019-01-09 02:30:27', '2019-01-28 15:10:06', '0', 'gaoyue', '2019-01-03 11:19:59', '1', '2');
INSERT INTO `calender_schedule` VALUES ('5', '1547683200000', 'Business consulting', 'Personal Information Consultation', '2019-01-17 03:15:27', '2019-01-17 03:30:27', '2019-01-25 16:45:35', '0', 'tongjiyuan', '2019-01-04 11:19:59', '3', '3');
INSERT INTO `calender_schedule` VALUES ('6', '1547596800000', 'Business management', 'Modifying personal information', '2019-01-16 15:15:27', '2019-01-16 15:30:27', '2019-01-16 15:15:27', '0', 'tongjiyuan', '2019-01-04 11:19:59', '3', '3');
INSERT INTO `calender_schedule` VALUES ('7', '1548028800000', 'Business management', 'Modifying personal information', '2019-01-21 15:15:27', '2019-01-21 15:30:27', '2019-01-21 15:15:27', '0', 'liuchao', '2019-01-09 11:19:59', '4', '2');
INSERT INTO `calender_schedule` VALUES ('8', '1548892800000', 'Financial management', 'Financial management', '2019-01-31 15:15:27', '2019-01-31 15:30:27', '2019-01-31 15:15:27', '0', 'liuchao', '2019-01-23 11:19:59', '4', '2');
INSERT INTO `calender_schedule` VALUES ('78', '1548201600000', 'Financial management', 'Financial management', '2019-01-23 02:10:03', '2019-01-23 01:05:02', '2019-01-28 18:30:18', '0', 'liuwen', '2019-01-24 12:27:45', '1', '2');
INSERT INTO `calender_schedule` VALUES ('91', '1547164800000', 'sad', 'asd', '2019-01-11 05:05:02', '2019-01-11 06:05:02', '2019-01-28 15:10:58', '2', null, '2019-01-25 17:08:09', '2', '2');
INSERT INTO `calender_schedule` VALUES ('92', '1547164800000', 'sad', 'asd', '2019-01-11 05:05:02', '2019-01-11 06:05:02', '2019-01-28 15:11:21', '0', '', '2019-01-25 17:08:09', '1', '2');
INSERT INTO `calender_schedule` VALUES ('93', '1547078400000', 'sssss', 'sssss', '2019-01-10 02:30:09', '2019-01-10 03:30:15', '2019-01-28 14:55:29', '1', null, '2019-01-28 14:55:29', '1', '2');
INSERT INTO `calender_schedule` VALUES ('94', '1546992000000', 'sdddd', 'ddddd', '2019-01-09 02:35:04', '2019-01-09 03:30:11', '2019-01-28 15:10:06', '0', null, '2019-01-28 15:09:50', '1', '2');
INSERT INTO `calender_schedule` VALUES ('95', '1547164800000', 'sss', 'sss', '2019-01-11 02:30:22', '2019-01-11 03:50:15', '2019-01-28 15:11:21', '0', null, '2019-01-28 15:10:58', '1', '2');
INSERT INTO `calender_schedule` VALUES ('96', '1548201600000', 'xzcxzc', 'xzcxzc', '2019-01-23 02:45:16', '2019-01-23 02:50:14', '2019-01-28 18:30:18', '1', null, '2019-01-28 18:30:18', '1', '2');

-- ----------------------------
-- Table structure for report_tasks_info
-- ----------------------------
DROP TABLE IF EXISTS `report_tasks_info`;
CREATE TABLE `report_tasks_info` (
  `info_id` int(11) NOT NULL COMMENT '上报id',
  `creat_time` datetime DEFAULT NULL COMMENT '创建时间',
  `scheduled_receipts` int(20) DEFAULT NULL COMMENT '计划接收量',
  `maximum_absorption` int(20) DEFAULT NULL COMMENT '最大接收量',
  `remak` varchar(255) DEFAULT NULL COMMENT '备注',
  `reporting_manager` varchar(64) DEFAULT NULL COMMENT '上报经理',
  `type` int(11) DEFAULT NULL COMMENT '类型（1.人员   2.分行）',
  PRIMARY KEY (`info_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of report_tasks_info
-- ----------------------------

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '角色ID',
  `role_name` varchar(255) DEFAULT NULL COMMENT '角色名称',
  `grade` int(11) DEFAULT NULL COMMENT '等级',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='角色表';

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES ('1', 'staff', '1');
INSERT INTO `role` VALUES ('2', 'manager', '2');
INSERT INTO `role` VALUES ('3', 'admin', '3');

-- ----------------------------
-- Table structure for staff
-- ----------------------------
DROP TABLE IF EXISTS `staff`;
CREATE TABLE `staff` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` varchar(255) DEFAULT NULL COMMENT '账号',
  `password` varchar(255) DEFAULT NULL COMMENT '密码',
  `user_name` varchar(255) DEFAULT NULL COMMENT '用户姓名',
  `role_id` int(11) DEFAULT NULL COMMENT '角色Id',
  `branch_id` int(11) DEFAULT NULL COMMENT '分行ID',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COMMENT='员工表';

-- ----------------------------
-- Records of staff
-- ----------------------------
INSERT INTO `staff` VALUES ('1', 'liuwen', '123', 'liuwen', '1', '2');
INSERT INTO `staff` VALUES ('2', 'gaoyue', '123', 'gaoyue', '1', '2');
INSERT INTO `staff` VALUES ('3', 'tongjiyuan', '123', 'tongjiyuan', '1', '3');
INSERT INTO `staff` VALUES ('4', 'liuchao', '123', 'liuchao', '1', '2');
INSERT INTO `staff` VALUES ('5', 'peiqi', '123', 'peiqi', '3', '1');
INSERT INTO `staff` VALUES ('6', 'peiqi1', '123', 'peiqi1', '2', '2');
INSERT INTO `staff` VALUES ('8', 'peiqi2', '123', 'peiqi2', '2', '3');
