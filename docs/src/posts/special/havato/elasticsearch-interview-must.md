---
# 这是侧边栏索引
index: true
# 这是页面的图标
icon: page
# 这是文章的标题
title: 10道不得不会的ElasticSearch面试题
# 设置作者
author: Wang Shiyu
# 设置写作时间
date: 2022-04-21
# 一个页面可以有多个分类
category:
  - 最少必要面试题
# 一个页面可以有多个标签
tag:
  - elasticsearch
  - 面试题
# 此页面会出现在首页的文章板块中
star: true
---

Elastic Search

<!-- more -->

10道不得不会的ElasticSearch面试题

以下是 ElasticSearch 面试题，相信大家都会有种及眼熟又陌生的感觉、看过可能在短暂的面试后又马上忘记了。**JavaPub**在这里整理这些容易忘记的重点知识及**解答**，`建议收藏，经常温习查阅`。

评论区见

`关于es的面试，建议使用名词用官方语言描述会更准确。`

@[toc]

### 1. 说说你们公司 es 的集群架构，索引数据大小，分片有多少，以及一些调优手段 。

节点数、分片数、副本数，尽量根据自己公司使用情况回答，当然适当放大也可行。

调优手段是现在很常见的面试题，下面这几种调优手段一定要了解懂。当然，下面的每一条都可以当做调优的一部分。

**设计调优**

参考：
https://www.cnblogs.com/sanduzxcvbnm/p/12084012.html

a. 根据业务增量需求，采取基于日期模板创建索引，通过 `rollover API` 滚动索引；(rollover API我会单独写一个代码案例做讲解，公众号：JavaPub)
b. 使用别名进行索引管理；（es的索引名不能改变，提供的别名机制使用非常广泛。）
c. 每天凌晨定时对索引做force_merge操作，以释放空间；
d. 采取冷热分离机制，热数据存储到SSD，提高检索效率；冷数据定期进行shrink操作，以缩减存储；
e. 采取curator进行索引的生命周期管理；
f. 仅针对需要分词的字段，合理的设置分词器；
g. Mapping阶段充分结合各个字段的属性，是否需要检索、是否需要存储等。

进100+原创文章：https://gitee.com/rodert/JavaPub

**写入调优**

1. 写入前副本数设置为0；
2. 写入前关闭refresh_interval设置为-1，禁用刷新机制；
3. 写入过程中：采取bulk批量写入；
4. 写入后恢复副本数和刷新间隔；
5. 尽量使用自动生成的id。

**查询调优**

1. 禁用wildcard；（通配符模式，类似于%like%）
2. 禁用批量terms（成百上千的场景）；
3. 充分利用倒排索引机制，能keyword类型尽量keyword；
4. 数据量大时候，可以先基于时间敲定索引再检索；
5. 设置合理的路由机制。

### 2. elasticsearch 的倒排索引是什么
倒排索引也就是单词到文档的映射，当然不只是存里文档id这么简单。还包括：词频（TF，Term Frequency）、偏移量（offset）、位置（Posting）。


### 3. elasticsearch 是如何实现 master 选举的
> ElasticSearch 的选主是 ZenDiscovery 模块负责，源码分析将首发在。 https://gitee.com/rodert/JavaPub 

1. 对所有可以成为 Master 的节点（node.master: true）根据 nodeId 排序，每次选举每个节点都把自己所知道节点排一次序，然后选出第一个（第0位）节点，暂且认为它是 Master 节点。
2. 如果对某个节点的投票数达到一定的值（可以成为master节点数n/2+1）并且该节点自己也选举自己，那这个节点就是master。否则重新选举。
(当然也可以自己设定一个值，最小值设定为超过能成为Master节点的n/2+1，否则会出现脑裂问题。discovery.zen.minimum_master_nodes)


### 4. 描述一下 Elasticsearch 索引文档的过程


![](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202405271034088.png)

1. 客户端向 Node 1 发送新建、索引或者删除请求。
2. 节点使用文档的 _id 确定文档属于分片 0 。请求会被转发到 Node 3，因为分片 0 的主分片目前被分配在 Node 3 上。
3. Node 3 在主分片上面执行请求。如果成功了，它将请求并行转发到 Node 1 和 Node 2 的副本分片上。一旦所有的副本分片都报告成功, Node 3 将向协调节点报告成功，协调节点向客户端报告成功。

**一图胜千文，记住这幅图，上面是文档在节点间分发的过程，接着说一下文档从接收到写入磁盘过程。**
协调节点默认使用文档 ID 参与计算（也支持通过 routing），以便为路由提供合适的分片。
> shard = hash(document_id) % (num_of_primary_shards)


1. 当分片所在的节点接收到来自协调节点的请求后，会将请求写入到 MemoryBuffer，然后定时（默认是每隔 1 秒）写入到 Filesystem Cache，这个从 MomeryBuffer 到 Filesystem Cache 的过程就叫做 refresh；
2. 当然在某些情况下，存在 Momery Buffer 和 Filesystem Cache 的数据可能会丢失，ES 是通过 translog 的机制来保证数据的可靠性的。其实现机制是接收到请求后，同时也会写入到 translog 中，当 Filesystem cache 中的数据写入到磁盘中时，才会清除掉，这个过程叫做 flush；
3. 在 flush 过程中，内存中的缓冲将被清除，内容被写入一个新段，段的 fsync将创建一个新的提交点，并将内容刷新到磁盘，旧的 translog 将被删除并开始一个新的 translog。
4. flush 触发的时机是定时触发（默认 30 分钟）或者 translog 变得太大（默认为 512M）时；

```bash
1. translog 可以理解为就是一个文件，一直追加。
2. MemoryBuffer 应用缓存。
3. Filesystem Cache 系统缓冲区。
```
延伸阅读：Lucene 的 `Segement`:

> 1. Lucene 索引是由多个段组成，段本身是一个功能齐全的倒排索引。
> 2. 段是不可变的，允许 Lucene 将新的文档增量地添加到索引中，而不用从头重建索引。
> 3. 对于每一个搜索请求而言，索引中的所有段都会被搜索，并且每个段会消耗CPU 的时钟周、文件句柄和内存。这意味着段的数量越多，搜索性能会越低。
> 4. 为了解决这个问题，Elasticsearch 会合并小段到一个较大的段，提交新的合并段到磁盘，并删除那些旧的小段。

### 5. 详细描述一下 Elasticsearch 搜索的过程？
> es作为一个分布式的存储和检索系统，每个文档根据 _id 字段做路由分发被转发到对应的shard上。

搜索执行阶段过程分俩个部分，我们称之为 Query Then Fetch。

**5.1 query-查询阶段**

当一个search请求发出的时候，这个query会被广播到索引里面的每一个shard（主shard或副本shard），每个shard会在本地执行查询请求后会生成一个命中文档的优先级队列。

这个队列是一个排序好的top N数据的列表，它的size等于from+size的和，也就是说如果你的from是10，size是10，那么这个队列的size就是20，所以这也是为什么深度分页不能用from+size这种方式，因为from越大，性能就越低。

es里面分布式search的查询流程如下：


![es里面分布式search的查询流程](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202405271035703.png)

查询阶段包含以下三个步骤:

1. 客户端发送一个 search 请求到 Node 3 ， Node 3 会创建一个大小为 from + size 的空优先队列。
2. Node 3 将查询请求转发到索引的每个主分片或副本分片中。每个分片在本地执行查询并添加结果到大小为 from + size 的本地有序优先队列中。
3. 每个分片返回各自优先队列中所有文档的 ID 和排序值给协调节点，也就是 Node 3 ，它合并这些值到自己的优先队列中来产生一个全局排序后的结果列表。



**5.2 fetch - 读取阶段 / 取回阶段**


![](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202405271036279.png)

分布式阶段由以下步骤构成：

1. 协调节点辨别出哪些文档需要被取回并向相关的分片提交多个 GET 请求。
2. 每个分片加载并 丰富 文档，如果有需要的话，接着返回文档给协调节点。
3. 一旦所有的文档都被取回了，协调节点返回结果给客户端。

协调节点首先决定哪些文档 确实 需要被取回。例如，如果我们的查询指定了 { "from": 90, "size": 10 } ，最初的90个结果会被丢弃，只有从第91个开始的10个结果需要被取回。这些文档可能来自和最初搜索请求有关的一个、多个甚至全部分片。

协调节点给持有相关文档的每个分片创建一个 multi-get request ，并发送请求给同样处理查询阶段的分片副本。

分片加载文档体-- _source 字段—​如果有需要，用元数据和 search snippet highlighting 丰富结果文档。 一旦协调节点接收到所有的结果文档，它就组装这些结果为单个响应返回给客户端。

```bash
拓展阅读：
深翻页（Deep Pagination）
---
先查后取的过程支持用 from 和 size 参数分页，但是这是 有限制的 。 要记住需要传递信息给协调节点的每个分片必须先创建一个 from + size 长度的队列，协调节点需要根据 number_of_shards * (from + size) 排序文档，来找到被包含在 size 里的文档。

取决于你的文档的大小，分片的数量和你使用的硬件，给 10,000 到 50,000 的结果文档深分页（ 1,000 到 5,000 页）是完全可行的。但是使用足够大的 from 值，排序过程可能会变得非常沉重，使用大量的CPU、内存和带宽。因为这个原因，我们强烈建议你不要使用深分页。

实际上， “深分页” 很少符合人的行为。当2到3页过去以后，人会停止翻页，并且改变搜索标准。会不知疲倦地一页一页的获取网页直到你的服务崩溃的罪魁祸首一般是机器人或者web spider。

如果你 确实 需要从你的集群取回大量的文档，你可以通过用 scroll 查询禁用排序使这个取回行为更有效率，我们会在 later in this chapter 进行讨论。
注：https://www.elastic.co/guide/cn/elasticsearch/guide/current/scroll.html
```

### 6. Elasticsearch 在部署时，对 Linux 的设置有哪些优化方法
1. 关闭缓存swap;

> 原因：大多数操作系统会将内存使用到文件系统缓存，会将应用程序未用到的内存交换出去。会导致jvm的堆内存交换到磁盘上。交换会导致性能问题。会导致内存垃圾回收延长。会导致集群节点响应时间变慢，或者从集群中断开。

2. 堆内存设置为：Min（节点内存/2, 32GB）;

3. 设置最大文件句柄数；

**后俩点不懂可以先说有一定了解，关注JavaPub会做详细讲解。**

4. 调整线程池和队列大小

5. 磁盘存储 raid 方式——存储有条件使用 RAID6，增加单节点性能以及避免单节点存储故障。

> https://www.elastic.co/cn/blog/how-to-design-your-elasticsearch-data-storage-architecture-for-scale#raid56

### 7. Elasticsearch 中的节点（比如共 20 个），其中的 10 个选了一个 master，另外 10 个选了另一个 master，怎么办？
1. 当集群 master 候选数量不小于 3 个时，可以通过设置最少投票通过数量（discovery.zen.minimum_master_nodes）超过所有候选节点一半以上来解决脑裂问题；

2. 当候选数量为两个时，只能修改为唯一的一个 master 候选，其他作为 data节点，避免脑裂问题。

### 8. 客户端在和集群连接时，如何选择特定的节点执行请求的？
client 远程连接连接一个 elasticsearch 集群。它并不加入到集群中，只是获得一个或者多个初始化的地址，并以轮询的方式与这些地址进行通信。

### 9. 详细描述一下 Elasticsearch 更新和删除文档的过程。
 

1. 删除和更新也都是写操作，但是 Elasticsearch 中的文档是不可变的，因此不能被删除或者改动以展示其变更；(根本原因是底层lucene的segment段文件不可更新删除)
2. 磁盘上的每个段都有一个相应的 .del 文件。当删除请求发送后，文档并没有真 的被删除，而是在 `.del` 文件中被标记为删除。该文档依然能匹配查询，但是会在 结果中被过滤掉。当段合并时，在.del 文件中被标记为删除的文档将不会被写入 新段。
3. 在新的文档被创建时，Elasticsearch 会为该文档指定一个版本号，当执行更新 时，旧版本的文档在.del 文件中被标记为删除，新版本的文档被索引到一个新段。

旧版本的文档依然能匹配查询，但是会在结果中被过滤掉。

### 10. Elasticsearch 对于大数据量（上亿量级）的聚合如何实现？
> 这道题目较难，相信大家看到很多类似这种回答

Elasticsearch 提供的首个近似聚合是cardinality 度量。它提供一个字段的基数，即该字段的distinct或者unique值的数目。它是基于HLL算法的。HLL 会先对我们的输入作哈希运算，然后根据哈希运算的结果中的 bits 做概率估算从而得到基数。其特点是：可配置的精度，用来控制内存的使用（更精确 ＝ 更多内存）；小的数据集精度是非常高的；我们可以通过配置参数，来设置去重需要的固定内存使用量。无论数千还是数十亿的唯一值，内存使用量只与你配置的精确度相关。

**科普&拓展**：

```bash
HyperLogLog：
下面简称为HLL，它是 LogLog 算法的升级版，作用是能够提供不精确的去重计数。存在以下的特点：
1. 能够使用极少的内存来统计巨量的数据，在 Redis 中实现的 HyperLogLog，只需要12K内存就能统计2^64个数据。
2. 计数存在一定的误差，误差率整体较低。标准误差为 0.81% 。
3. 误差可以被设置辅助计算因子进行降低。
---
应用场景：
1. 基数不大，数据量不大就用不上，会有点大材小用浪费空间
2. 有局限性，就是只能统计基数数量，而没办法去知道具体的内容是什么
3. 和bitmap相比，属于两种特定统计情况，简单来说，HyperLogLog 去重比 bitmap 方便很多
4. 一般可以bitmap和hyperloglog配合使用，bitmap标识哪些用户活跃，hyperloglog计数
---
应用场景：
1. 基数不大，数据量不大就用不上，会有点大材小用浪费空间
2. 有局限性，就是只能统计基数数量，而没办法去知道具体的内容是什么
3. 和bitmap相比，属于两种特定统计情况，简单来说，HyperLogLog 去重比 bitmap 方便很多
4. 一般可以bitmap和hyperloglog配合使用，bitmap标识哪些用户活跃，hyperloglog计数
来源：刷刷面试
```

### 11. 在并发情况下，Elasticsearch 如果保证读写一致？
> 首先要了解什么是一致性，在分布式系统中，我们一般通过CPA理论分析。

分布式系统不可能同时满足一致性（C：Consistency）、可用性（A：Availability）和分区容忍性（P：Partition Tolerance），最多只能同时满足其中两项。

![分布式系统不可能同时满足一致性（C：Consistency）、可用性（A：Availability）和分区容忍性（P：Partition Tolerance），最多只能同时满足其中两项。](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202405271037838.png)

1. 可以通过版本号使用乐观并发控制，以确保新版本不会被旧版本覆盖，由应用层来处理具体的冲突；
2. 另外对于写操作，一致性级别支持 quorum/one/all，默认为 quorum，即只有当大多数分片可用时才允许写操作。但即使大多数可用，也可能存在因为网络等原因导致写入副本失败，这样该副本被认为故障，分片将会在一个不同的节点上重建。
3. 对于读操作，可以设置 replication 为 sync(默认)，这使得操作在主分片和副本分片都完成后才会返回；如果设置 replication 为 async 时，也可以通过设置搜索请求参数_preference 为 primary 来查询主分片，确保文档是最新版本。

### 11. 介绍一下你们的个性化搜索方案？
> 如果你没有很多实战经验，可以基于 word2vec 做一些练习，我的博客提供了 word2vec Java版的一些Demo。

基于 word2vec 和 Elasticsearch 实现个性化搜索，它有以下优点：

1. 基于word2vec的商品向量还有一个可用之处，就是可以用来实现相似商品的推荐；






### 推荐阅读：








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

