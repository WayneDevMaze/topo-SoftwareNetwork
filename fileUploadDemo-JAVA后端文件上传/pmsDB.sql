/*
 Navicat Premium Data Transfer

 Source Server         : 192.168.177.136
 Source Server Type    : MySQL
 Source Server Version : 50723
 Source Host           : 192.168.177.136:3306
 Source Schema         : pmsDB

 Target Server Type    : MySQL
 Target Server Version : 50723
 File Encoding         : 65001

 Date: 07/04/2020 09:12:02
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for map
-- ----------------------------
DROP TABLE IF EXISTS `map`;
CREATE TABLE `map`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '图id',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '图名称',
  `original_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'excel源文件名称',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for work
-- ----------------------------
DROP TABLE IF EXISTS `work`;
CREATE TABLE `work`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '工作id',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '名称',
  `optimistic_time` int(10) NULL DEFAULT NULL COMMENT '乐观时间',
  `possible_time` int(10) NULL DEFAULT NULL COMMENT '可能时间',
  `pessimistic_time` int(10) NULL DEFAULT NULL COMMENT '悲观时间',
  `depend` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '依赖',
  `map_id` int(10) UNSIGNED NOT NULL COMMENT '所属图id',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 81 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
