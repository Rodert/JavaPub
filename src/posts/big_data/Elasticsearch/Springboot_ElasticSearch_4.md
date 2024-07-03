---
title: Springboot2.x整合ElasticSearch7.x实战（四）
icon: lightbulb
---


本教程是系列教程，对于初学者可以对 ES 有一个整体认识和实践实战。



还没开始的同学，建议先读一下系列攻略目录：[Springboot2.x整合ElasticSearch7.x实战目录](https://mp.weixin.qq.com/s/nSWEIfbpRf-4txJqRz60gQ)



本篇幅是继上一篇 [Springboot2.x整合ElasticSearch7.x实战（三）](https://mp.weixin.qq.com/s/6qSSWGnxmiLjnaM-m1_wUQ) ，适合初学 Elasticsearch 的小白，可以跟着整个教程做一个练习。



[toc]

# 前言

本篇都是基于前面搭建的环境来讲解，可视化使用的是 Cerebro v0.8.3。

# 第六章 RESTful实操

下文提到了很多 REST 操作，主要对创建索引和搜索做讲解。

## 集群
### 检查集群状态

> curl http://localhost:9200/_cat/health?v

更多查询集群状态的命令：

> curl http://localhost:9200/_cat


### 检查节点状态



### 查询全部索引

## 索引
### 创建索引

### 删除索引

### 查询索引

## 数据操作
### 插入数据

#### 单条插入

#### 批量插入

### 删除

### 更新

### 搜索