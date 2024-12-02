---
title: SpringBoot打包Docker运行
icon: line
category:
  - 项目实战
  - 《用户中心》
tag:
  - 项目实战
  - 用户管理系统
  - docker
  - springboot
---


## 《用户中心》

[介绍文档](https://kazjsfecs3y.feishu.cn/wiki/QJDwwM5bbi2nT9k6laycWm4ynad)




> SpringBoot打包Docker运行

当开发完成一个 SpringBoot 项目后，企业开发一般会将它进行打包，然后部署上线。如果是分布式微服务系统，我们是用 docker 部署。


## 首先

确保你本地安装了 Docker，如果你还没有安装，可以从 Docker 官网下载并安装适合你操作系统的Docker版本。`https://www.docker.com/`

推荐一个国内下载网站： `https://docker.github.net.cn`

要想将服务打包成 docker 镜像，需要先写一个 Dockerfile。

> 什么是 Dockerfile？ 
> 
> Dockerfile 是一个文本文件，用于定义 Docker 镜像的构建过程。它包含了一系列的指令和参数，这些指令告诉 Docker 引擎如何构建一个新的镜像。Dockerfile 中的指令被顺序执行，每一步都创建一个新的镜像层，最终生成一个完整的 Docker 镜像。
> 
> 如果你不了解 Dockerfile，可以先找 JavaPub.net.cn 学一些基础知识就可以很快上手。
> 


## 步骤

### 1. 创建Dockerfile

在你的项目根目录下创建一个名为 Dockerfile 的文件，这个文件定义了Docker镜像的构建步骤。以下是一个典型的Dockerfile示例：

```xml
# 使用官方的 Java 21 基础镜像
FROM openjdk:21-jdk-alpine

# 设置工作目录
WORKDIR /app

# 复制JAR文件到工作目录
COPY target/user-center-backend-java-public-0.0.1-SNAPSHOT.jar /app/

# 暴露应用端口
EXPOSE 8080

# 启动命令
ENTRYPOINT ["java", "-jar", "user-center-backend-java-public-0.0.1-SNAPSHOT.jar"]
```

请将 `user-center-backend-java-public-0.0.1-SNAPSHOT.jar` 替换为你的 JAR 包名称。

![image-20241202164145349](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202412021641181.png)

### 2. 构建Docker镜像


在项目根目录下运行以下命令来构建Docker镜像：

```bash
docker build -t user-center-backend-java-public:1.0 .
```

这个命令会读取当前目录下的Dockerfile，并构建一个名为 `user-center-backend-java-public` ，标签为 1.0 的 Docker 镜像。

> 现在国内对 Docker 使用管控严格，如果你遇到问题可以先 javapub.net.cn







原文地址： 

[https://javapub.net.cn/star/project/user-center/](https://javapub.net.cn/star/project/user-center/)


