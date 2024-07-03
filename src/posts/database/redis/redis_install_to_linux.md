---
title: Linux下redis安装
icon: lightbulb
category:
  - redis
tag:
  - redis
---






## 基于 centOS7 的 redis 安装



<!-- more -->

基于SpringBoot+VUE的后台管理系统免费开源，欢迎观赏。在线地址：<http://liawan.javapub.net.cn/>。详细参考文档及视频同步更新。

## 前言

安装环境：

centos7、redis5、

<iframe src="//player.bilibili.com/player.html?bvid=BV1qR4y1c78t&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>

## 安装教程

### 1. 下载

国内镜像地址：https://mirrors.huaweicloud.com/redis/

![image](https://tva3.sinaimg.cn/large/007F3CC8ly1h2dguy49obj31hc0q1gzo.jpg)

### 2. 安装

解压：

> tar -zxvf redis-5.0.8.tar.gz 

编译：

```bash
cd redis-5.0.8

make install
```


### 3. 修改配置

`修改redis.conf`

开启外网访问

> bind 0.0.0.0

关闭Redis的服务保护模式

> protected-mode no

修改密码

> requirepass javapub

### 4. 启动


> redis-server redis.conf

后台启动：

> nohup redis-server redis.conf &



### 5. 访问测试

> 注意，如果外网访问，要保证防火墙对应端口开放。


原文：https://blog.csdn.net/qq_40374604/article/details/124857707

