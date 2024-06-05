---
# 这是侧边栏索引
index: true
# 这是页面的图标
icon: page
# 这是文章的标题
title: 10道不得不会的 Netty 面试题
# 设置作者
author: Wang Shiyu
# 设置写作时间
date: 2022-07-06
# 一个页面可以有多个分类
category:
  - 最少必要面试题
# 一个页面可以有多个标签
tag:
  - netty
  - 面试题
# 此页面会出现在首页的文章板块中
star: true
---

Netty

<!-- more -->

10道不得不会的 Netty 面试题

我是 JavaPub，专注于面试、副业，技术人的成长记录。

以下是 Netty 面试题，相信大家都会有种及眼熟又陌生的感觉、看过可能在短暂的面试后又马上忘记了。**JavaPub** 在这里整理这些容易忘记的重点知识及 **解答**，`建议收藏，经常温习查阅`。

评论区见

@[toc]



https://baijiahao.baidu.com/s?id=1669639041722396699&wfr=spider&for=pc

https://blog.csdn.net/pgving/article/details/124781454

# Netty



本系列[《最少必要面试题》](https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzUzNDUyOTY0Nw==&action=getalbum&album_id=2344061143381508097#wechat_redirect)


如果你对 Netty 还不是很了解，可以先运行一个 Demo 试试，地址：<https://gitee.com/rodert/SpringBoot-javapub>

### 1. 什么是Netty ?

Netty 是一个异步的、基于事件驱动的网络应用框架，用于快速开发可维护、高性能的网络服务器和客户端。

用官方的总结就是：**Netty 成功地找到了一种在不妥协可维护性和性能的情况下实现易于开发，性能，稳定性和灵活性的方法。**


`注意：netty 的异步还是基于多路复用的，并没有实现真正意义上的异步 IO`


### 为什么要用 Netty 呢？说一下自己的看法。


因为 Netty 具有下面这些优点，并且相比于直接使用 JDK 自带的 NIO 相关的 API 来说更加易用。

- 统一的 API，支持多种传输类型，阻塞和非阻塞的。
- 简单而强大的线程模型。
- 自带编解码器解决 TCP 粘包/拆包问题。
- 自带各种协议栈。
- 真正的无连接数据包套接字支持。
- 比直接使用 Java 核心 API 有更高的吞吐量、更低的延迟、更低的资源消耗和更少的内存复制。
- 安全性不错，有完整的 SSL/TLS 以及 StartTLS 支持。
- 社区活跃
- 成熟稳定，经历了大型项目的使用和考验，而且很多开源项目都使用到了 Netty， 比如我们经常接触的 Dubbo、RocketMQ 等等。

### Netty 应用场景了解么？

凭借自己的了解，简单说一下吧！理论上来说，NIO 可以做的事情 ，使用 Netty 都可以做并且更好。Netty 主要用来做 **网络通信 ** :

1. **作为 RPC 框架的网络通信工具** ：我们在分布式系统中，不同服务节点之间经常需要相互调用，这个时候就需要 RPC 框架了。不同服务节点之间的通信是如何做的呢？可以使用 Netty 来做。

2. **实现一个自己的 HTTP 服务器** ：通过 Netty 我们可以自己实现一个简单的 HTTP 服务器，这个大家应该不陌生。说到 HTTP 服务器的话，作为 Java 后端开发，我们一般使用 Tomcat 比较多。一个最基本的 HTTP 服务器可要以处理常见的 HTTP Method 的请求，比如 POST 请求、GET 请求等等。

3. **实现一个即时通讯系统** ：使用 Netty 我们可以实现一个可以聊天类似微信的即时通讯系统

4. **实现消息推送系统** ：市面上有很多消息推送系统都是基于 Netty 来做的。

> 在理解核心组件以前，建议先用文末的代码Demo练下手。

### Netty 核心组件有哪些？分别有什么作用？


> - Bootstrap & ServerBootstrap：客户端和服务端的引导类
> - Channel：代表了一个链接，与EventLoop一起用来参与IO处理。
> -  ChannelFuture：Netty 为异步非阻塞，即所有的 I/O 操作都为异步的，因此，我们不能立刻得知消息是否已经被处理了。Netty 提供了 ChannelFuture 接口，通过该接口的 addListener() 方法注册一个 ChannelFutureListener，当操作执行成功或者失败时，监听就会自动触发返回结果。
> -  EventLoop & EventLoopGroup：Channel处理IO操作，一个EventLoop可以为多个Channel服务。而一个EventLoopGroup会包含多个EventLoop。
> -  ChannelHandler：为了支持各种协议和处理数据的方式，便诞生了Handler组件。Handler主要用来处理各种事件，这里的事件很广泛，比如可以是连接、数据接收、异常、数据转换等。
> -  ChannelPipeline：提供了 ChannelHandler 链的容器，并定义了用于在该链上传播入站
和出站事件流的 API。

![image](https://tva1.sinaimg.cn/large/007F3CC8ly1h8njljtjovj308w08t76k.jpg)

### 


### 


### 







低谷蓄力


**《最少必要面试题》**


[10道不得不会的Java基础面试题](https://javapub.blog.csdn.net/article/details/122011870)

[10道不得不会的Java并发基础面试题](https://javapub.blog.csdn.net/article/details/122159231)

[10道不得不会的JVM面试题](https://javapub.blog.csdn.net/article/details/124008535)

[10道不得不会的MySQL基础面试题](https://javapub.blog.csdn.net/article/details/122087243)

[10道不得不会的MyBatis面试题](https://javapub.blog.csdn.net/category_11740063.html)

[10道不得不会的Spring面试题](https://javapub.blog.csdn.net/category_11740063.html)

[10道不得不会的ElasticSearch面试题](https://javapub.blog.csdn.net/article/details/123761794)

[10道不得不会的Redis面试题](https://javapub.blog.csdn.net/category_11740063.html)

[10道不得不会的Kafka面试题](https://javapub.blog.csdn.net/category_11740063.html)

[10道不得不会的Zookeeper面试题](https://javapub.blog.csdn.net/category_11740063.html)

[10道不得不会的Docker面试题](https://javapub.blog.csdn.net/category_11740063.html)

[10道不得不会的JavaEE面试题](https://javapub.blog.csdn.net/category_11740063.html)

[10道不得不会的Netty面试题](https://javapub.blog.csdn.net/category_11740063.html)

