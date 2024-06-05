---
# 这是侧边栏索引
index: true
# 这是页面的图标
icon: page
# 这是文章的标题
title: 10道不得不会的 Zookeeper 面试题
# 设置作者
author: Wang Shiyu
# 设置写作时间
date: 2022-06-25
# 一个页面可以有多个分类
category:
  - 最少必要面试题
# 一个页面可以有多个标签
tag:
  - zookeeper
  - 面试题
# 此页面会出现在首页的文章板块中
star: true
---

Zookeeper

<!-- more -->


10道不得不会的 Zookeeper 面试题

我是JavaPub，专注于面试、副业，技术人的成长记录。

以下是 Zookeeper 面试题，相信大家都会有种及眼熟又陌生的感觉、看过可能在短暂的面试后又马上忘记了。**JavaPub**在这里整理这些容易忘记的重点知识及**解答**，`建议收藏，经常温习查阅`。

评论区见

@[toc]

# Zookeeper



本系列[《最少必要面试题》](https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzUzNDUyOTY0Nw==&action=getalbum&album_id=2344061143381508097#wechat_redirect)

### 1. 什么是 Zookeeper

ZooKeeper 是一个开源的分布式协调服务。它是一个为分布式应用提供一致性服务的软件，分布式应用程序可以基于 Zookeeper 实现诸如数据发布/订阅、负载均衡、命名服务、分布式协调/通知、集群管理、Master 选举、分布式锁和分布式队列等功能。

Zookeeper 从设计模式角度来理解，  是一个基于**观察者模式**设计的分布式服务管理框架，它**负责存储和管理大家都关心的数据**，然后**接受观察者的注册**，一旦这些数据的状态发生变化，Zookeeper就将**负责通知已经在Zookeeper上注册的那些观察者**做出反应。

观察者模式是什么：[设计模式](https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzUzNDUyOTY0Nw==&action=getalbum&album_id=1969202758012436483#wechat_redirect)

可以这样理解：

`ZooKeeper=文件系统+通知机制`


### 2. ZK 的节点类型

> 这道题相信大家都有所了解，zookeeper v3.6.2 版本后，支持7种节点类型。持久；持久顺序；临时；临时顺序；容器；持久 TTL；持久顺序 TTL。

说出这几种类型当然已经回答了问题，但是细节的描述更能体现你的知识底蕴。

**持久 TTL、持久顺序 TTL**

关于持久和顺序这两个关键字，不用我再解释了，这两种类型的节点重点是后面的 TTL，TTL 是 `time to live` 的缩写，指带有存活时间，简单来说就是当该节点下面没有子节点的话，超过了 TTL 指定时间后就会被自动删除，但是 TTL 启用是需要额外的配置(这个之前也有提过)配置是 zookeeper.extendedTypesEnabled 需要配置成 true，否则的话创建 TTL 时会收到 Unimplemented 的报错。


### 3. Zookeeper 下 Server 工作状态有哪些？

服务器具有四种状态，分别是 LOOKING、FOLLOWING、LEADING、OBSERVING。

- **LOOKING**：寻 找 Leader 状态。当服务器处于该状态时，它会认为当前集群中没有Leader，因此需要进入 Leader 选举状态。

- **FOLLOWING**：跟随者状态。表明当前服务器角色是 Follower。

- **LEADING**：领导者状态。表明当前服务器角色是 Leader。

- **OBSERVING**：观察者状态。表明当前服务器角色是 Observer。（Observer角色除了不能投票(以及和投票相关的能力)和过半写成功策略外，其它和follower功能一样。observer角色减轻了投票的压力，在以前通过增、减follower的数量提高伸缩性。投票来说，follower是有状态的，都直接影响投票结果，特别是follower的数量越多，投票过程的性能就越差。）


### 4. zookeeper是cp还是ap?

zk遵循的是CP原则，即保证一致性和网络分区容错性，但不保证可用性。

**什么是cap?**

Consistency（一致性）：分布式系统中多个主机之间是否能够保持数据一致性的特性。即当系统数据发生更新操作之后，各个主机中的数据是否仍然处于一致的状态。

Availability（可用性）：系统提供的服务必须一直处于可用的状态，即对于的每一个请求，系统总是可以在**有限的时间**内对用户做出响应。

Partition tolerance（分区容错性）：分布式系统在遇到任何网络分区故障时候，仍然保证对外提供满足一致性和可用性的服务。

### 5. 说几个 zookeeper 常用的命令。

常用命令：ls get set create delete 等。


### 6. 介绍一下ZAB协议？

ZAB协议是为分布式协调服务Zookeeper专门设计的一种支持崩溃恢复的原子广播协议。

ZAB协议包括两种基本的模式：

1. 崩溃恢复

2. 消息广播

当整个 zookeeper 集群刚刚启动或者Leader服务器宕机、重启或者网络故障导致不存在过半的服务器与 Leader 服务器保持正常通信时，所有进程（服务器）进入崩溃恢复模式，首先选举产生新的 Leader 服务器，然后集群中 Follower 服务器开始与新的 Leader 服务器进行数据同步，当集群中超过半数机器与该 Leader 服务器完成数据同步之后，退出恢复模式进入消息广播模式，Leader 服务器开始接收客户端的事务请求生成事物提案来进行事务请求处理。

### 7. ZAB 和 Paxos 算法的联系与区别？

**相同点：**

1. 两者都存在一个类似于 Leader 进程的角色，由其负责协调多个 Follower 进程的运行

2. Leader 进程都会等待超过半数的 Follower 做出正确的反馈后，才会将一个提案进行提交

3. ZAB 协议中，每个 Proposal 中都包含一个 epoch 值来代表当前的 Leader 周期，Paxos 中名字为 Ballot

**不同点：**

ZAB(ZooKeeper Atomic Broadcast) 用来构建高可用的分布式数据主备系统（Zookeeper），Paxos 是用来构建分布式一致性状态机系统。

而 Paxos 算法与 ZAB 协议不同的是，Paxos 算法的发起者可以是一个或多个。当集群中的 Acceptor 服务器中的大多数可以执行会话请求后，提议者服务器只负责发送提交指令，事务的执行实际发生在 Acceptor 服务器。这与 ZooKeeper 服务器上事务的执行发生在 Leader 服务器上不同。Paxos 算法在数据同步阶段，是多台 Acceptor 服务器作为数据源同步给集群中的多台 Learner 服务器，而 ZooKeeper 则是单台 Leader 服务器作为数据源同步给集群中的其他角色服务器。

注意：

ZAB是在Paxos的基础上改进和演变过来的。

提议者（Proposer）、决策者（Acceptor）、决策学习者（Learner）

### 8. Zookeeper 的典型应用场景

1. 数据发布/订阅
2. 负载均衡
3. 命名服务
4. 分布式协调/通知
5. 集群管理
6. Master 选举
7. 分布式锁
8. 分布式队列

**数据发布/订阅系统**，即所谓的配置中心，目的：动态获取数据（配置信息），实现数据（配置信息）的集中式管理和数据的动态更新

**Zookeeper 分布式锁**

有了 zookeeper 的一致性文件系统，锁的问题变得容易。锁服务可以分为两类，一个是保持独占，另一个是控制时序。

对于第一类，我们将 zookeeper 上的一个 znode 看作是一把锁，通过 createznode的方式来实现。所有客户端都去创建 /task_lock 节点，最终成功创建的那个客户端也即拥有了这把锁。用完删除掉自己创建的 task_lock 节点就释放出锁。

对于第二类， /task_lock 已经预先存在，所有客户端在它下面创建临时顺序编号目录节点，和选 master 一样，编号最小的获得锁，用完删除，依次方便。

**Zookeeper 队列管理**

> 一般很少用到，可简单了解

两种类型的队列：

1. 同步队列，当一个队列的成员都聚齐时，这个队列才可用，否则一直等待所有成员到达。

2. 队列按照 FIFO 方式进行入队和出队操作。

第一类，在约定目录下创建临时目录节点，监听节点数目是否是我们要求的数目。

第二类，和分布式锁服务中的控制时序场景基本原理一致，入列有编号，出列按编号。在特定的目录下创建 PERSISTENT_SEQUENTIAL 节点，创建成功时Watcher 通知等待的队列，队列删除序列号最小的节点用以消费。此场景下Zookeeper 的 znode 用于消息存储，znode 存储的数据就是消息队列中的消息内容，SEQUENTIAL 序列号就是消息的编号，按序取出即可。由于创建的节点是持久化的，所以不必担心队列消息的丢失问题。


### 9. Chroot特性

zookeeper v3.2.0 版本后，添加了 Chroot 特性，该特性允许每个客户端为自己设置一个命名空间。如果一个客户端设置了 Chroot，那么该客户端对服务器的任何操作，都将会被限制在其自己的命名空间下。

通过设置 Chroot，能够将一个客户端应用于 Zookeeper 服务端的一颗子树相对应，在那些多个应用共用一个 Zookeeper 进群的场景下，对实现不同应用间的相互隔离非常有帮助。







### 拓展


ZooKeeper以Fast Paxos算法为基础，Paxos 算法存在活锁的问题，即当有多个 proposer 交错提交时有可能互相排斥导致没有一个proposer能提交成功，而Fast Paxos做了一些优化，通过选举产生一个领导者，只有leader才能提交proposer具体算法可见Fast Paxos。




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





[GItHub](https://github.com/Rodert)|[GitEE](https://gitee.com/rodert)

