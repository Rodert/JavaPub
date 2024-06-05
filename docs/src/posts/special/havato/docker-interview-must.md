---
# 这是侧边栏索引
index: true
# 这是页面的图标
icon: page
# 这是文章的标题
title: 10道不得不会的 Docker 面试题
# 设置作者
author: Wang Shiyu
# 设置写作时间
date: 2022-06-19
# 一个页面可以有多个分类
category:
  - 最少必要面试题
# 一个页面可以有多个标签
tag:
  - docker
  - 面试题
# 此页面会出现在首页的文章板块中
star: true
---

Docker

<!-- more -->

10道不得不会的 Docker 面试题

我是JavaPub，专注于面试、副业，技术人的成长记录。

以下是 Docker 面试题，相信大家都会有种及眼熟又陌生的感觉、看过可能在短暂的面试后又马上忘记了。**JavaPub**在这里整理这些容易忘记的重点知识及**解答**，`建议收藏，经常温习查阅`。

评论区见

@[toc]

# Docker


以下是一些docker的基础面试题，下一篇docker进阶面试题。本系列《最少必要面试题》

### 1. 什么是 Docker 容器？

Docker 是一种流行的开源软件平台，可简化创建、管理、运行和分发应用程序的过程。它使用容器来打包应用程序及其依赖项。我们也可以将容器视为 Docker 镜像的运行时实例。


### 2. Docker 和虚拟机有什么不同？

Docker 是轻量级的沙盒，在其中运行的只是应用，虚拟机里面还有额外的系统。

### 3. 什么是 DockerFile？

Dockerfile 是一个文本文件，其中包含我们需要运行以构建 Docker 镜像的所有命令，每一条指令构建一层，因此每一条指令的内容，就是描述该层应当如何构建。Docker 使用 Dockerfile 中的指令自动构建镜像。我们可以 `docker build` 用来创建按顺序执行多个命令行指令的自动构建。

**一些最常用的指令如下：**

```bash
FROM ：使用 FROM 为后续的指令建立基础映像。在所有有效的 Dockerfile 中， FROM 是第一条指令。

LABEL： LABEL 指令用于组织项目映像，模块，许可等。在自动化布署方面 LABEL 也有很大用途。在 LABEL 中指定一组键值对，可用于程序化配置或布署 Docker 。

RUN： RUN 指令可在映像当前层执行任何命令并创建一个新层，用于在映像层中添加功能层，也许最来的层会依赖它。

CMD： 使用 CMD 指令为执行的容器提供默认值。在 Dockerfile 文件中，若添加多个 CMD 指令，只有最后的 CMD 指令运行。
```

### 4. 使用Docker Compose时如何保证容器A先于容器B运行？

> Docker Compose 是一个用来定义和运行复杂应用的Docker工具。一个使用Docker容器的应用，通常由多个容器组成。使用Docker Compose不再需要使用shell脚本来启动容器。Compose 通过一个配置文件来管理多个Docker容器。简单理解：Docker Compose 是docker的管理工具。

Docker Compose 在继续下一个容器之前不会等待容器准备就绪。为了控制我们的执行顺序，我们可以使用“**取决于**”条件，`depends_on` 。这是在 docker-compose.yml 文件中使用的示例

```yml
version: "2.4"

services:

 backend:

   build: .    # 构建自定义镜像

   depends_on:

     - db

 db:

   image: mysql
```

用 `docker-compose up` 命令将按照我们指定的依赖顺序启动和运行服务。


### 5. 一个完整的Docker由哪些部分组成?

- DockerClient 客户端
- Docker Daemon 守护进程
- Docker Image 镜像
- DockerContainer 容器 


### 6. docker常用命令

> 命令建议在本地安装做一个实操，记忆会更深刻。
> 也可以克隆基于docker的俩万（springboot+vue）项目练手，提供视频+完善文档。地址：<https://gitee.com/rodert/liawan-vue>


1. 查看本地主机的所用镜像：`docker images``
2. 搜索镜像：`docker search mysql``
3. 下载镜像：`docker pull mysql`，没写 tag 就默认下载最新的 lastest
4. 下载指定版本的镜像：`docker pull mysql:5.7``
5. 删除镜像：`docker rmi -f 镜像id 镜像id 镜像id``

### 7. 描述 Docker 容器的生命周期。

Docker 容器经历以下阶段：

- 创建容器
- 运行容器
- 暂停容器（可选）
- 取消暂停容器（可选）
- 启动容器
- 停止容器
- 重启容器
- 杀死容器
- 销毁容器

### 8. docker容器之间怎么隔离?

> 这是一道涉猎很广泛的题目，理解性阅读。

Linux中的PID、IPC、网络等资源是全局的，而Linux的NameSpace机制是一种资源隔离方案，在该机制下这些资源就不再是全局的了，而是属于某个特定的NameSpace，各个NameSpace下的资源互不干扰。

​​**Namespace实际上修改了应用进程看待整个计算机“视图”，即它的“视线”被操作系统做了限制，只能“看到”某些指定的内容​​。**对于宿主机来说，这些被“隔离”了的进程跟其他进程并没有区别。

虽然有了NameSpace技术可以实现资源隔离，但进程还是可以不受控的访问系统资源，比如CPU、内存、磁盘、网络等，为了控制容器中进程对资源的访问，Docker采用control groups技术(也就是cgroup)，有了cgroup就可以控制容器中进程对系统资源的消耗了，比如你可以限制某个容器使用内存的上限、可以在哪些CPU上运行等等。

有了这两项技术，容器看起来就真的像是独立的操作系统了。


> 强烈建议大家实操，才能更好的理解docker。

低谷蓄力


**《最少必要面试题》**


[10道不得不会的Java基础面试题](https://mp.weixin.qq.com/s/3Nviyml0cvnX_HHkZ5DjWg)

[10道不得不会的Java容器面试题](https://mp.weixin.qq.com/s/ug3LBR4MfM1C5uVFJaPWLQ)

[10道不得不会的Java并发基础面试题](https://mp.weixin.qq.com/s/h2tTwDVqL15rCI6rftgn9A)

[10道不得不会的JavaEE面试题](https://mp.weixin.qq.com/s/59Tif95LGi8BTJXu47zi6g)

[10道不得不会的JVM面试题](https://mp.weixin.qq.com/s/hvsaD1NlzpR0LpP-GmbU_A)

[10道不得不会的MySQL基础面试题](https://mp.weixin.qq.com/s/yVPwCoSQ-8OYvhw8bH0PtA)

[10道不得不会的MyBatis面试题](https://mp.weixin.qq.com/s/lVFwy765hQ2FvIYBHyw0yA)

[10道不得不会的Spring面试题](https://mp.weixin.qq.com/s/lrHsLZANxHxd_FWTCdMNJw)

[10道不得不会的SpringBoot面试题](https://mp.weixin.qq.com/s/-oYKVXBaQwzyzp7ffqH7gw)

[10道不得不会的ElasticSearch面试题](https://mp.weixin.qq.com/s/z3D37HqeTUmwrdheUL_Efw)

[10道不得不会的Redis面试题](https://mp.weixin.qq.com/s/_Pq2VgxRA4yw1j_eCfEiLg)

[10道不得不会的Kafka面试题](https://javapub.blog.csdn.net/category_11740063.html)

[10道不得不会的Zookeeper面试题](https://mp.weixin.qq.com/s/ym0-x6okFi0CgF8RcxeLFA)

[10道不得不会的Docker面试题](https://mp.weixin.qq.com/s/DTC3gZNHm3Rlf_GK7twlkQ)

[10道不得不会的缓存面试题]()



