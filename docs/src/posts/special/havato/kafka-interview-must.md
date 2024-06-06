---
# 这是侧边栏索引
index: true
# 这是页面的图标
icon: page
# 这是文章的标题
title: 10道不得不会的 Kafka 面试题
# 设置作者
author: Wang Shiyu
# 设置写作时间
date: 2022-06-19
# 一个页面可以有多个分类
category:
  - 最少必要面试题
# 一个页面可以有多个标签
tag:
  - kafka
  - 面试题

---

kafka

<!-- more -->

10道不得不会的 Kafka 面试题

我是JavaPub，专注于面试、副业，技术人的成长记录。

以下是 Kafka 面试题，相信大家都会有种及眼熟又陌生的感觉、看过可能在短暂的面试后又马上忘记了。**JavaPub**在这里整理这些容易忘记的重点知识及**解答**，`建议收藏，经常温习查阅`。

评论区见

@[toc]


# Kafka

在面试kafka中，一定要了解为什么要用kafka、及kafka的架构等基本概念，才能对面试中的问题得心应手。

## 术语0. Kafka中的ISR、AR又代表什么？ISR的伸缩又指什么

**ISR**:In-Sync Replicas 副本同步队列

**AR**:Assigned Replicas 所有副本

ISR是由leader维护，follower从leader同步数据有一些延迟（包括延迟时间replica.lag.time.max.ms和延迟条数replica.lag.max.messages两个维度, 当前最新的版本0.10.x中只支持replica.lag.time.max.ms这个维度），任意一个超过阈值都会把follower剔除出ISR, 存入OSR（Outof-Sync Replicas）列表，新加入的follower也会先存放在OSR中。AR=ISR+OSR。

## 术语0. Kafka中的HW、LEO、LSO、LW等分别代表什么？

**HW**:High Watermark 高水位，取一个partition对应的ISR中最小的LEO作为HW，consumer最多只能消费到HW所在的位置上一条信息。

**LEO**:LogEndOffset 当前日志文件中下一条待写信息的offset
HW/LEO这两个都是指最后一条的下一条的位置而不是指最后一条的位置。

**LSO**:Last Stable Offset 对未完成的事务而言，LSO 的值等于事务中第一条消息的位置(firstUnstableOffset)，对已完成的事务而言，它的值同 HW 相同

**LW**:Low Watermark 低水位, 代表 AR 集合中最小的 logStartOffset 值

---

### 1. kafka 是什么？有什么作用？

Kafka 是一个分布式的流式处理平台，它以高吞吐、可持久化、可水平扩展、支持流数据处理等多种特性而被广泛使用

![](https://img-blog.csdnimg.cn/img_convert/16668d6a19eb5cb6faddd7706e9e989b.png)

主要功能体现于三点：

- **消息系统**：kafka与传统的消息中间件都具备**系统解耦、冗余存储、流量削峰、缓冲、异步通信、扩展性、可恢复性**等功能。与此同时，kafka还提供了大多数消息系统难以实现的消息顺序性保障及回溯性消费的功能。

- **存储系统**：kafka把**消息持久化到磁盘**，相比于其他基于内存存储的系统而言，有效的降低了消息丢失的风险。这得益于其消息持久化和多副本机制。也可以将kafka作为长期的存储系统来使用，只需要把对应的数据保留策略设置为“永久”或启用主题日志压缩功能。

- **流式处理平台**：kafka为流行的流式处理框架提供了可靠的数据来源，还提供了一个完整的流式处理框架，比如窗口、连接、变换和聚合等各类操作。

### 2. kafka 的架构是怎么样的？

> 这是一个基本概念的题目，一定要掌握。

![](https://img-blog.csdnimg.cn/img_convert/77d41d1963c2606740b3188195eac97f.png)

一个典型的 kafka 体系架构包括若干 Producer、若干 Consumer、以及一个 Zookeeper 集群（在2.8.0版本中移，除了 Zookeeper,通过 KRaft 进行自己的集群管理）

Producer 将消息发送到 Broker，Broker 负责将受到的消息存储到磁盘中，而 Consumer 负责从 Broker 订阅并消费消息。

Kafka 基本概念：

- **Producer** ：生产者，负责将消息发送到 Broker

- **Consumer** ：消费者，从 Broker 接收消息

- **Consumer Group** ：消费者组，由多个 Consumer 组成。消费者组内每个消费者负责消费不同分区的数据，**一个分区只能由一个组内消费者消费**，消费者组之间互不影响。所有的消费者都属于某个消费者组，即消费者组是逻辑上的一个订阅者。

- **Broker** ：可以看做一个独立的 **Kafka 服务节点或 Kafka 服务实例**。如果一台服务器上只部署了一个 Kafka 实例，那么我们也可以将 Broker 看做一台 Kafka 服务器。
- **Topic** ：一个逻辑上的概念，包含很多 Partition，**同一个 Topic 下的 Partiton 的消息内容是不相同的**。

- **Partition** ：为了实现扩展性，一个非常大的 topic **可以分布到多个 broker 上，一个 topic 可以分为多个 partition**，每个 partition 是一个有序的队列。

- **Replica** ：副本，**同一分区的不同副本保存的是相同的消息**，为保证集群中的某个节点发生故障时，该节点上的 partition 数据不丢失，且 kafka 仍然能够继续工作，- kafka 提供了副本机制，一个 topic 的每个分区都有若干个副本，一个 leader 和若干个 follower。

- **Leader** ：每个分区的多个副本中的"主副本"，**生产者以及消费者只与 Leader 交互**。

- **Follower** ：每个分区的多个副本中的"从副本"，**负责实时从 Leader 中同步数据，保持和 Leader 数据的同步**。Leader 发生故障时，从 Follower 副本中重新选举新的 Leader 副本对外提供服务。

### 3. Kafka Replicas是怎么管理的？

![](https://img-blog.csdnimg.cn/img_convert/dfb283e65f030d4c660d60f3c8ca9b9c.png)

- AR:分区中的**所有 Replica 统称为 AR**
- ISR:所有与 Leader 副本**保持一定程度同步**的Replica(包括 Leader 副本在内)组成 ISR
- OSR:与 Leader 副本**同步滞后过多的** Replica 组成了 OSR

Leader 负责维护和跟踪 ISR 集合中所有 Follower 副本的滞后状态，当 Follower 副本落后过多时，就会将其放入 OSR 集合，当 Follower 副本追上了 Leader 的进度时，就会将其放入 ISR 集合。

默认情况下，只有 **ISR 中的副本才有资格晋升为 Leader**。



### 4. 如何确定当前能读到哪一条消息？

> 这个问题要先了解上一个问题的概念

分区相当于一个日志文件，我们先简单介绍几个概念

![](https://img-blog.csdnimg.cn/img_convert/9b038ce0fc7308c1e815ce46ac397b86.png)

如上图是一个分区日志文件

- 标识**共有7条消息**，offset (消息偏移量)分别是0~6
- 0 代表这个日志文件的**开始**
- HW(High Watermark) 为4，0~3 代表这个日志文件**可以消费的区间**，消费者只能消费到这四条消息
- LEO 代表即将要写入消息的偏移量 offset

**分区 ISR 集合中的每个副本都会维护自己的 LEO，而 ISR 集合中最小的LEO 即为分区的 HW**

![](https://img-blog.csdnimg.cn/img_convert/733241b1f3d812dc229022ddcddaadba.png)

如上图: 三个分区副本都是 ISR集合当中的，最小的 LEO 为 3，就代表分区的 HW 为3，所以当前分区只能消费到 0~2 之间的三条数据，如下图

![](https://img-blog.csdnimg.cn/img_convert/5e09d8a79178af747ccbf0cc2b142063.png)



### 5. 发送消息的分区策略有哪些？

![](https://img-blog.csdnimg.cn/img_convert/fc5038a2800475066fb2fc7cebdbea30.png)


- 1.轮询：**依次**将消息发送该topic下的所有分区，如果在创建消息的时候 key 为 null，Kafka 默认采用这种策略。

- 2.key 指定分区：在创建消息是 key 不为空，并且使用默认分区器，Kafka 会将 key 进行 hash，然后**根据hash值映射到指定的分区上**。这样的好处是 key 相同的消息会在一个分区下，Kafka 并不能保证全局有序，但是在每个分区下的消息是有序的，按照顺序存储，按照顺序消费。在保证同一个 key 的消息是有序的，这样基本能满足消息的顺序性的需求。但是**如果 partation 数量发生变化，那就很难保证 key 与分区之间的映射关系了**。

- 3.自定义策略：实现 Partitioner 接口就能自定义分区策略。

- 4.指定 Partiton 发送

### 6. Kafka 的可靠性是怎么保证的？

**1.acks**

这个参数用来指定分区中有多少个副本收到这条消息，生产者才认为这条消息是写入成功的，这个参数有三个值：

- 1.acks = 1，默认为1。生产者发送消息，**只要 leader 副本成功写入消息，就代表成功**。这种方案的问题在于，当返回成功后，如果 leader 副本和 follower 副本**还没有来得及同步**，leader 就崩溃了，那么在选举后新的 leader 就没有这条**消息，也就丢失了**。
- 2.acks = 0。生产者发送消息后直接算写入成功，不需要等待响应。这个方案的问题很明显，**只要服务端写消息时出现任何问题，都会导致消息丢失**。
- 3.acks = -1 或 acks = all。生产者发送消息后，需要等待 ISR 中的所有副本都成功写入消息后才能收到服务端的响应。毫无疑问这种方案的**可靠性是最高的**，但是如果 ISR 中只有leader 副本，那么就和 acks = 1 毫无差别了。

**2.消息发送的方式**

第6问中我们提到了生产者发送消息有三种方式，发完即忘，同步和异步。我们可以通过同步或者异步获取响应结果，**失败做重试**来保证消息的可靠性。

**3.手动提交位移**

默认情况下，当消费者消费到消息后，就会自动提交位移。但是如果消费者消费出错，没有进入真正的业务处理，那么就可能会导致这条消息消费失败，从而丢失。我们可以开启手动提交位移，等待业务正常处理完成后，再提交offset。

**4.通过副本 LEO 来确定分区 HW**

可参考第四问


### 7. 分区再分配是做什么的？解决了什么问题？

分区再分配主要是用来维护 kafka 集群的负载均衡

既然是分区再分配，那么 kafka 分区有什么问题呢？

![](https://img-blog.csdnimg.cn/img_convert/e57b54803d2cf0f8f11b0acecc978e31.png)

**问题1**：当集群中的一个节点下线了

- 如果该节点的分区是单副本的,那么分区将会变得不可用
- 如果是多副本的，就会进行 leader 选举，在其他机器上选举出新的 leader

**kafka 并不会将这些失效的分区迁移到其他可用的 broker 上**，这样就会影响集群的负载均衡，甚至也会影响服务的可靠性和可用性

![](https://img-blog.csdnimg.cn/img_convert/e2912a908a8b2672ae947e71287791db.png)

**问题2**：集群新增 broker 时，只有新的主题分区会分配在该 broker 上，而老的主题分区不会分配在该 broker 上，就造成了**老节点和新节点之间的负载不均衡**。

为了解决该问题就出现了分区再分配，它可以在集群扩容，broker 失效的场景下进行分区迁移。

**分区再分配的原理就是通化控制器给分区新增新的副本，然后通过网络把旧的副本数据复制到新的副本上，在复制完成后，将旧副本清除**。 当然，为了不影响集群正常的性能，在此复制期间还会有一系列保证性能的操作，比如**复制限流**。


### 8. Kafka Partition 副本 leader 是怎么选举的？

> 这个问题设计的点比较多，拓展的也更多一点，建议耐心阅读。

**常用选主机制的缺点：**

```xml
split-brain (脑裂):
​这是由ZooKeeper的特性引起的，虽然ZooKeeper能保证所有Watch按顺序触发，但是网络延迟，并不能保证同一时刻所有Replica“看”到的状态是一样的，这就可能造成不同Replica的响应不一致，可能选出多个领导“大脑”，导致“脑裂”。

herd effect (羊群效应):
​如果宕机的那个Broker上的Partition比较多， 会造成多个Watch被触发，造成集群内大量的调整，导致大量网络阻塞。

ZooKeeper负载过重:
​每个Replica都要为此在ZooKeeper上注册一个Watch，当集群规模增加到几千个Partition时ZooKeeper负载会过重。
```

**优势：**

​Kafka的Leader Election方案解决了上述问题，它在所有broker中选出一个controller，所有Partition的Leader选举都由controller决定。 controller会将Leader的改变直接通过RPC的方式(比ZooKeeper Queue的方式更高效)通知需为此作为响应的Broker。

​没有使用 zk，所以无 2.3 问题；也没有注册 watch无 2.2 问题 leader 失败了，就通过 controller 继续重新选举即可，所以克服所有问题。

**Kafka partition leader的选举：**

由 controller 执行：

- 从Zookeeper中读取当前分区的所有ISR(in-sync replicas)集合
- 调用配置的分区选择算法选择分区的leader

![分区选择算法](https://tvax1.sinaimg.cn/large/007F3CC8ly1h3dl7rqe24j313c0nm7ik.jpg)

上面五种分区算法都是选择PreferredReplica(优先副本选举)作为当前Partition的leader。区别仅仅是选择leader之后的操作有所不同。



### 9. 分区数越多越好吗？吞吐量就会越高吗？

般类似于这种问题的答案，都是持否定态度的。

但是可以说，**在一定条件下，分区数的数量是和吞吐量成正比的，分区数和性能也是成正比的**。

那么为什么说超过了一定限度，就会对性能造成影响呢？原因如下:

![](https://img-blog.csdnimg.cn/img_convert/54db2b5495c53fde42368a5f60ac1b0f.png)

**1.客户端/服务器端需要使用的内存就越多**

服务端在很多组件中都维护了分区级别的缓存，分区数越大，缓存成本也就越大。
消费端的消费线程数是和分区数挂钩的，分区数越大消费线程数也就越多，线程的开销成本也就越大
生产者发送消息有缓存的概念，会为每个分区缓存消息，当积累到一定程度或者时间时会将消息发送到分区，分区越多，这部分的缓存也就越大

**2.文件句柄的开销**

每个 partition 都会对应磁盘文件系统的一个目录。在 Kafka 的数据日志文件目录中，每个日志数据段都会分配两个文件，一个索引文件和一个数据文件。每个 broker 会为每个日志段文件打开一个 index 文件句柄和一个数据文件句柄。因此，随着 partition 的增多，所需要保持打开状态的文件句柄数也就越多，最终可能超过底层操作系统配置的文件句柄数量限制。

**3.越多的分区可能增加端对端的延迟**

Kafka 会将分区 HW 之前的消息暴露给消费者。分区越多则副本之间的同步数量就越多，在默认情况下，每个 broker 从其他 broker 节点进行数据副本复制时，该 broker 节点只会为此工作分配一个线程，该线程需要完成该 broker 所有 partition 数据的复制。


**4.降低高可用性**

在第 7 问我们提到了分区再分配，会将数据复制到另一份副本当中，**分区数量越多，那么恢复时间也就越长**，而如果发生宕机的 broker 恰好是 controller 节点时：在这种情况下，新 leader 节点的选举过程在 controller 节点恢复到新的 broker 之前不会启动。controller 节点的错误恢复将会自动地进行，但是新的 controller 节点需要从 zookeeper 中读取每一个 partition 的元数据信息用于初始化数据。例如，假设一个Kafka 集群存在 10000个partition，从 zookeeper 中恢复元数据时每个 partition 大约花费 2 ms，则 controller 的恢复将会增加约 20 秒的不可用时间窗口。


### 10. kafka 为什么这么快？

![](https://img-blog.csdnimg.cn/img_convert/660921f85642692c5f819c27474ebc68.png)

- 1.**顺序读写**磁盘分为顺序读写与随机读写，基于磁盘的随机读写确实很慢，但磁盘的顺序读写性能却很高，kafka 这里采用的就是顺序读写。

- 2.**Page Cache**为了优化读写性能，Kafka 利用了**操作系统本身的 Page Cache**，就是利用操作系统自身的内存而不是JVM空间内存。

- 3.**零拷贝**Kafka使用了零拷贝技术，也就是**直接将数据从内核空间的读缓冲区直接拷贝到内核空间的 socket 缓冲区**，然后再写入到 NIC 缓冲区，避免了在内核空间和用户空间之间穿梭。

- 4.**分区分段+索引**Kafka 的 message 是按 topic分 类存储的，topic 中的数据又是按照一个一个的 partition 即分区存储到不同 broker 节点。每个 partition 对应了操作系统上的一个文件夹，partition 实际上又是按照segment分段存储的。通过这种分区分段的设计，Kafka 的 message 消息实际上是分布式存储在一个一个小的 segment 中的，每次文件操作也是直接操作的 segment。为了进一步的查询优化，Kafka 又默认为分段后的数据文件建立了索引文件，就是文件系统上的.index文件。这种分区分段+索引的设计，不仅提升了数据读取的效率，同时也提高了数据操作的并行度。

- 5.**批量读写Kafka 数据读写也是批量的而不是单条的**,这样可以避免在网络上频繁传输单个消息带来的延迟和带宽开销。假设网络带宽为10MB/S，一次性传输10MB的消息比传输1KB的消息10000万次显然要快得多。

- 6.**批量压缩**Kafka 把所有的消息都变成一个**批量的文件**，并且进行合理的**批量压缩**，减少网络 IO 损耗，通过 mmap 提高 I/O 速度，写入数据的时候由于单个Partion是末尾添加所以速度最优；读取数据的时候配合 sendfile 进行直接读取。


低谷蓄力


## 《最少必要面试题》





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




