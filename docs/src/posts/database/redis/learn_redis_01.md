---
title: rodert单排学习redis入门【黑铁】
icon: lightbulb
category:
  - redis
tag:
  - redis
  - 单排学习redis
---




## rodert单排学习redis入门【黑铁】


<!-- more -->

redis入门

> 欢迎大家前来白嫖PDF。下图回复：666

> 本教程致力于最实用教程，个别图片粘贴有丢失，还有来领取原版。

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200613232629668.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQwMzc0NjA0,size_16,color_FFFFFF,t_70)

@[toc]
## 前言

> 声明：参考来源互联网，有任何争议可以留言。站在前人的肩上，我们才能看的更远。

> 本教程纯手打，致力于最实用教程，不需要什么奖励，只希望多多转发支持。
> 欢迎来我公众号，希望可以结识你，也可以催更，微信搜索：JavaPub

> 有任何问题都可以来谈谈 ！

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200613232439488.jpg)

> 本篇主要是 Redis 的入门，涉及一些基础命令和常见场景。

> redis是目前最热的缓存组件之一，如果你还不懂，那就开始，入门到实战


> 本文主要是 **<span color=#159957 face="黑体">Redis</span>** 入门知识，介绍 Redis 特性、使用场景、安装和数据类型。

> 中文官网：http://www.redis.cn/

## 1.NoSql(not only sql)

指非关系型数据库，不支持sql语句，nosql中存储的数据是KV形式

常见的NoSQL产品有：Mongodb、Redis、Hbase hadoop、Cassandra hadoop。

## 2.Redis入门

> 这是一些redis介绍，做一些简单了解即可。

**<span color=#159957 face="黑体">Redis</span>**（Remote Dictionary Server )，即远程字典服务，是一个开源的使用ANSI C语言编写、支持网络、可基于内存亦可持久化的日志型、Key-Value数据库，并提供多种语言的API。从2010年3月15日起，Redis的开发工作由VMware主持。从2013年5月开始，**<span color=#159957 face="黑体">Redis</span>** 的开发由Pivotal赞助。

redis 是一个 **<span color=#159957 face="黑体">key-value</span>** 存储系统。和 Memcached 类似，它支持存储的 value 类型相对更多，包括string(字符串)、list(链表)、set(集合)、zset(sorted set --有序集合)和hash（哈希类型）。这些数据类型都支持push/pop、add/remove及取交集并集和差集及更丰富的操作，而且这些操作都是原子性的。在此基础上，**<span color=#159957 face="黑体">Redis</span>** 支持各种不同方式的排序。与 **<span color=#159957 face="黑体">memcached</span>** 一样，为了保证效率，数据都是缓存在内存中。区别的是 **<span color=#159957 face="黑体">Redis</span>** 会周期性的把更新的数据写入磁盘或者把修改操作写入追加的记录文件，并且在此基础上实现了 **<span color=#159957 face="黑体">master-slave</span>**(主从)同步。

**<span color=#159957 face="黑体">Redis</span>** 是一个高性能的key-value数据库。 **<span color=#159957 face="黑体">Redis</span>** 的出现，很大程度补偿了**<span color=#159957 face="黑体">memcached</span>**这类key/value存储的不足，在部 分场合可以对关系数据库起到很好的补充作用。它提供了Java，C/C++，C#，PHP，JavaScript，Perl，Object-C，Python，Ruby，Erlang等客户端，使用很方便。
**<span color=#159957 face="黑体">Redis</span>** 支持主从同步。数据可以从主服务器向任意数量的从服务器上同步，从服务器可以是关联其他从服务器的主服务器。这使得 **<span color=#159957 face="黑体">Redis</span>** 可执行单层树复制。存盘可以有意无意的对数据进行写操作。由于完全实现了发布/订阅机制，使得从数据库在任何地方同步树时，可订阅一个频道并接收主服务器完整的消息发布记录。同步对读取操作的可扩展性和数据冗余很有帮助。

**<span color=#159957 face="黑体">Redis</span>** 的官网地址，非常好记，是redis.io。（域名后缀io属于国家域名，是british Indian Ocean territory，即英属印度洋领地），Vmware在资助着 **<span color=#159957 face="黑体">Redis</span>** 项目的开发和维护。



## 3.Redis特性
### 3.1.性能

下面是官方的bench-mark数据：
测试完成了 50 个并发执行 100000 个请求。
设置和获取的值是一个 256 字节字符串。
Linux box 是运行 Linux 2.6 , 这是 X3320 Xeon 2.5 ghz。
文本执行使用 loopback 接口(127.0.0.1)。
结果:读的速度是 **110000次/s** ,写的速度是 **81000次/s** 。

### 3.2.特性



1. **<span color=#159957 face="黑体">Redis </span>**与其他 **<span color=#159957 face="黑体">key-value</span>** 缓存产品有以下三个特点：
2. **<span color=#159957 face="黑体">Redis </span>**支持数据的持久化，可以将内存中的数据保存在磁盘中，重启的时候可以再次加载进行使用。
3. **<span color=#159957 face="黑体">Redis </span>**不仅仅支持简单的 **<span color=#159957 face="黑体">key-value</span>**类型的数据，同时还提供 **<span color=#159957 face="黑体">list，set，zset，hash </span>**等数据结构的存储。
4. **<span color=#159957 face="黑体">Redis </span>**支持数据的备份，即 **<span color=#159957 face="黑体">master-slave</span>** 模式的数据备份。

### 3.3.优势

- 性能极高 – **<span color=#159957 face="黑体">Redis </span>**能读的速度是110000次/s,写的速度是81000次/s 。
- 丰富的数据类型 – **<span color=#159957 face="黑体">Redis </span>**支持二进制案例的 Strings, Lists, Hashes, Sets 及 Ordered Sets 数据类型操作。
- 原子 – **<span color=#159957 face="黑体">Redis </span>**的所有操作都是原子性的，同时**<span color=#159957 face="黑体">Redis </span>**还支持对几个操作全并后的原子性执行。
- 丰富的特性 – **<span color=#159957 face="黑体">Redis </span>**还支持 publish/subscribe, 通知, key 过期等等特性。

## 4.Redis使用场景

> 目前在互联网公司， **<span color=#159957 face="黑体">Redis </span>** 使用非常广泛，我日常工作中，会用它做爬虫采集系统中队列使用，还有在后台管理系统中做分布式，存储 token 使用。

1、**<span color=#159957 face="黑体">缓存</span>**

缓存现在几乎是所有中大型网站都在用的必杀技，合理的利用缓存不仅能够提升网站访问速度，还能大大降低数据库的压力。**<span color=#159957 face="黑体">Redis </span>** 提供了键过期功能，也提供了灵活的键淘汰策略，所以，现在 **<span color=#159957 face="黑体">Redis </span>** 用在缓存的场合非常多。

2、**<span color=#159957 face="黑体">排行榜</span>**

很多网站都有排行榜应用的，如京东的月度销量榜单、商品按时间的上新排行榜等。**<span color=#159957 face="黑体">Redis </span>** 提供的有序集合数据类构能实现各种复杂的排行榜应用。

3、**<span color=#159957 face="黑体">计数器</span>**

什么是计数器，如电商网站商品的浏览量、视频网站视频的播放数等。为了保证数据实时效，每次浏览都得给+1，并发量高时如果每次都请求数据库操作无疑是种挑战和压力。**<span color=#159957 face="黑体">Redis </span>** 提供的 **<span color=#159957 face="黑体">incr</span>** 命令来实现计数器功能，内存操作，性能非常好，非常适用于这些计数场景。

4、**<span color=#159957 face="黑体">分布式会话</span>**

集群模式下，在应用不多的情况下一般使用容器自带的 session 复制功能就能满足，当应用增多相对复杂的系统中，一般都会搭建以 Redis 等内存数据库为中心的 session 服务，session 不再由容器管理，而是由 session 服务及内存数据库管理。

5、**<span color=#159957 face="黑体">分布式锁</span>**

在很多互联网公司中都使用了分布式技术，分布式技术带来的技术挑战是对同一个资源的并发访问，如全局ID、减库存、秒杀等场景，并发量不大的场景可以使用数据库的悲观锁、乐观锁来实现，但在并发量高的场合中，利用数据库锁来控制资源的并发访问是不太理想的，大大影响了数据库的性能。可以利用 Redis 的setnx功能来编写分布式的锁，如果设置返回1说明获取锁成功，否则获取锁失败，实际应用中要考虑的细节要更多。

6、**<span color=#159957 face="黑体">社交网络</span>** 

点赞、踩、关注/被关注、共同好友等是社交网站的基本功能，社交网站的访问量通常来说比较大，而且传统的关系数据库类型不适合存储这种类型的数据，Redis提供的哈希、集合等数据结构能很方便的的实现这些功能。

7、**<span color=#159957 face="黑体">最新列表</span>**

Redis列表结构，LPUSH可以在列表头部插入一个内容ID作为关键字，LTRIM可用来限制列表的数量，这样列表永远为N个ID，无需查询最新的列表，直接根据ID去到对应的内容页即可。

8、**<span color=#159957 face="黑体">消息系统</span>**

消息队列是大型网站必用中间件，如ActiveMQ、RabbitMQ、Kafka 等流行的消息队列中间件，主要用于业务解耦、流量削峰及异步处理实时性低的业务。Redis 提供了发布/订阅及阻塞队列功能，能实现一个简单的消息队列系统。另外，这个不能和专业的消息中间件相比。

## 5.安装
### 5.1.单机安装
#### 5.1.1.windows下
redis 开源在 github 上

- 下载，解压

> 下载地址：https://github.com/tporadowski/redis/releases

Redis 支持 32 位和 64 位。这个需要根据你系统平台的实际情况选择，这里我们下载 **Redis-x64-xxx.zip**压缩包到 C 盘，解压后，将文件夹重新命名为 redis。

- 运行

解压后，打开 cmd 窗口，cd 切换到 redis根目录下。

> redis-server.exe redis.windows.conf

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200613232402250.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQwMzc0NjA0,size_16,color_FFFFFF,t_70)

- 客户端连接

不要关闭原 cmd 窗口，新打开一个 cmd 窗口，切换到 redis 根目录

> redis-cli.exe -h 127.0.0.1 -p 6379

6379 是 redis 默认端口，我们可以在配置中修改

- 测试

设置 key 值

> set myKey abc

取出 key 值

> get myKey

#### 5.1.2.linux下

> linux 和 windows 下类似，启动方式参考上文

```bash
$ wget http://download.redis.io/releases/redis-2.8.17.tar.gz
$ tar xzf redis-2.8.17.tar.gz
$ cd redis-2.8.17
$ make
```

## 6.五类数据结构
### 6.0.说明

> 类型中会涉及到很多的 Redis 操作命令，一定耐心看完，优化的基础是要了解。

### 6.1.介绍

Redis 是一个开源（BSD许可）的，内存中的数据结构存储系统，它可以用作数据库、缓存和消息中间件。 它支持多种类型的数据结构，如 字符串（strings）， 散列（hashes）， 列表（lists）， 集合（sets）， 有序集合（sorted sets） 与范围查询， bitmaps， hyperloglogs 和 地理空间（geospatial） 索引半径查询。 Redis 内置了 复制（replication），LUA脚本（Lua scripting）， LRU驱动事件（LRU eviction），事务（transactions） 和不同级别的 磁盘持久化（persistence）， 并通过 Redis哨兵（Sentinel）和自动 分区（Cluster）提供高可用性（high availability）。



> redis是非常优秀的缓存工具，熟练使用redis，可以让我们的开发进一步。

对于下面操作，可以通过 redis-cli 工具连接使用

### 6.2.Redis keys



> 关于key的几条规则，一定不要以为它们不重要，了解一些对你排查问题至关重要。



Redis **key** 值是二进制安全的，这意味着可以用任何二进制序列作为key值，从形如”foo”的简单字符串到一个 JPEG 文件的内容都可以。空字符串也是有效 key 值。

关于key的几条规则：

- 太长的键值不是个好主意，例如1024字节的键值就不是个好主意，不仅因为消耗内存，而且在数据中查找这类键值的计算成本很高。
- 太短的键值通常也不是好主意，如果你要用”u:1000:pwd”来代替”user:1000:password”，这没有什么问题，但后者更易阅读，并且由此增加的空间消耗相对于**<span color=#159957 face="黑体">key object</span>**和**<span color=#159957 face="黑体">value object</span>**本身来说很小。当然，没人阻止您一定要用更短的键值节省一丁点儿空间。
- 最好坚持一种模式。例如：”object-type:uid:field”就是个不错的注意，像这样”user:1000:password”。我喜欢对多单词的字段名中加上一个点，就像这样：”comment:q1234:reply.to”。


### 6.2.字符串（strings）

> 二进制安全的字符串



字符串方式是redis最简单的数据类型，redis就像一个可以持久化的memcached服务器。



- 基本的操作方式**<span color=#159957 face="黑体">get 和 set </span>**方式

```bash
> set mykey somevalue
OK
> get mykey
"somevalue"
```

例如：当key存在时，set会失败。值的长度不能超过512MB。



- 一个有趣的操作，**原子**递增，

```bash
> set counter 100
OK
> incr counter
(integer) 101
> incr counter
(integer) 102
> incrby counter 50
(integer) 152
```

**<span color=#159957 face="黑体">INCR </span>** 命令将字符串解析成整型，将其加一，再将结果保存成新的字符串，类似的命令还有 **<span color=#159957 face="黑体">INCRBY</span>** , **<span color=#159957 face="黑体">DECR</span>** 和 **<span color=#159957 face="黑体">DECRBY</span>** 。


还有一个有趣的命令， **<span color=#159957 face="黑体">GETSET</span>**  命令：设置新值，返回原值。这个操作有什么用？在我们需要保证原子性操作时

MSET 和 MGET 是批量操作

```bash
> mset a 10 b 20 c 30
OK
> mget a b c
1) "10"
2) "20"
3) "30"
```

**<span color=#159957 face="黑体">MGET</span>** 命令返回由值组成的数组。

- 修改和查询存在操作

> **<span color=#159957 face="黑体">exists</span>**:判断键是否存在，**<span color=#159957 face="黑体">del</span>**：删除指定键

```bash
> set mykey hello
OK
> exists mykey
(integer) 1
> del mykey
(integer) 1
> exists mykey
(integer) 0
```

> **<span color=#159957 face="黑体">TYPE</span>** 命令返回key对应的存储类型

```bash
> set mykey x
OK
> type mykey
string
> del mykey
(integer) 1
> type mykey
none
```

- Redis超时

对 **key** 设置**<span color=#159957 face="黑体">超时</span>**。精度可以使用毫秒或秒。

```bash
> set key some-value
OK
> expire key 5
(integer) 1
> get key (immediately)
"some-value"
> get key (after some time)
(nil)
```

使用了 **<span color=#159957 face="黑体">EXPIRE</span>** 来设置超时时间(也可以再次调用这个命令来改变超时时间，使用 **<span color=#159957 face="黑体">PERSIST</span>** 命令去除超时时间 )。我们也可以在创建值的时候设置超时时间:

```bash
> set key 100 ex 10
OK
> ttl key
(integer) 9
```

**<span color=#159957 face="黑体">TTL</span>** 命令用来查看key对应的值剩余存活时间。

### 6.3.列表（Lists）

> 值得注意的：**<span color=#159957 face="黑体">Redis lists</span>** 基于 **<span color=#159957 face="黑体">Linked Lists</span>** 实现。

**<span color=#159957 face="黑体">Redis 列表</span>**是简单的字符串列表，按照插入顺序排序。你可以添加一个元素到列表的头部（左边）或者尾部（右边）

一个列表最多可以包含 232 - 1 个元素 (4294967295, 每个列表超过40亿个元素)。

- Redis Lists 入门

```bash
> rpush mylist A
(integer) 1
> rpush mylist B
(integer) 2
> lpush mylist first
(integer) 3
> lrange mylist 0 -1
1) "first"
2) "A"
3) "B"
```

从右边(尾部)插入俩个元素，左边(头部)插入一个元素，**<span color=#159957 face="黑体">LRANGE </span>**打印所有(0,-1)元素。


- **<span color=#159957 face="黑体">Redis Lists</span>**常用指令

> BLPOP key1 [key2 ] timeout 
> 移出并获取列表的第一个元素， 如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止。

> BRPOP key1 [key2 ] timeout 
移出并获取列表的最后一个元素， 如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止。

> BRPOPLPUSH source destination timeout 
从列表中弹出一个值，将弹出的元素插入到另外一个列表中并返回它； 如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止。

> LINDEX key index 
通过索引获取列表中的元素

> LINSERT key BEFORE|AFTER pivot value 
在列表的元素前或者后插入元素

说明：**<span color=#159957 face="黑体">Redis Linsert</span>** 命令用于在列表的元素前或者后插入元素。当指定元素不存在于列表中时，不执行任何操作。当列表不存在时，被视为空列表，不执行任何操作。如果 key 不是列表类型，返回一个错误。

**实例：**

```bash
redis> RPUSH mylist "Hello"
(integer) 1
redis> RPUSH mylist "World"
(integer) 2
redis> LINSERT mylist BEFORE "World" "There"
(integer) 3
redis> LRANGE mylist 0 -1
1) "Hello"
2) "There"
3) "World"
redis> 
```

> LLEN key
获取列表长度

> LPOP key
移出并获取列表的第一个元素

> LPUSH key value1 [value2] 
将一个或多个值插入到列表头部

> LPUSHX key value 
将一个值插入到**已存在**的列表头部

> LRANGE key start stop 
获取列表指定范围内的元素

> LREM key count value 
移除列表元素

```
count > 0 : 从表头开始向表尾搜索，移除与 VALUE 相等的元素，数量为 COUNT 。
count < 0 : 从表尾开始向表头搜索，移除与 VALUE 相等的元素，数量为 COUNT 的绝对值。
count = 0 : 移除表中所有与 VALUE 相等的值。
```

> LSET key index value 
通过索引设置列表元素的值

> LTRIM key start stop 
对一个列表进行修剪(trim)，就是说，让列表只保留指定区间内的元素，不在指定区间之内的元素都将被删除。

```
注意：下标从0开始
```

> RPOP key
移除列表的最后一个元素，返回值为移除的元素。

> RPOPLPUSH source destination
移除列表的最后一个元素，并将该元素添加到另一个列表并返回。

> RPUSH key value1 [value2] 
在列表中添加一个或多个值

> RPUSHX key value
为已存在的列表添加值

### 6.4.哈希(Hash)

> **<span color=#159957 face="黑体">Redis hash </span>** 是一个 **<span color=#159957 face="黑体">string </span>**类型的 **<span color=#159957 face="黑体">field </span>** 和 **<span color=#159957 face="黑体">value </span>** 的映射表，**<span color=#159957 face="黑体">hash </span>** 特别适合用于存储对象。

Redis 中每个 hash 可以存储 232 - 1 键值对（40多亿）。

```xml
序号	命令及描述
1	HDEL key field1 [field2] 
删除一个或多个哈希表字段
2	HEXISTS key field 
查看哈希表 key 中，指定的字段是否存在。
3	HGET key field 
获取存储在哈希表中指定字段的值。
4	HGETALL key 
获取在哈希表中指定 key 的所有字段和值
5	HINCRBY key field increment 
为哈希表 key 中的指定字段的整数值加上增量 increment 。
6	HINCRBYFLOAT key field increment 
为哈希表 key 中的指定字段的浮点数值加上增量 increment 。
7	HKEYS key 
获取所有哈希表中的字段
8	HLEN key 
获取哈希表中字段的数量
9	HMGET key field1 [field2] 
获取所有给定字段的值
10	HMSET key field1 value1 [field2 value2 ] 
同时将多个 field-value (域-值)对设置到哈希表 key 中。
11	HSET key field value 
将哈希表 key 中的字段 field 的值设为 value 。
12	HSETNX key field value 
只有在字段 field 不存在时，设置哈希表字段的值。
13	HVALS key 
获取哈希表中所有值。
14	HSCAN key cursor [MATCH pattern] [COUNT count] 
迭代哈希表中的键值对。
```

> 参考:https://www.runoob.com/redis/redis-hashes.html

### 6.5.集合(Set)

Redis 的 **<span color=#159957 face="黑体">Set </span>** 是 **<span color=#159957 face="黑体">String </span>** 类型的无序集合。集合成员是唯一的，这就意味着集合中不能出现重复的数据。

Redis 中**<span color=#159957 face="黑体">集合 </span>**是通过哈希表实现的，所以添加，删除，查找的复杂度都是 O(1)。

```
序号	命令及描述
1	SADD key member1 [member2] 
向集合添加一个或多个成员
2	SCARD key 
获取集合的成员数
3	SDIFF key1 [key2] 
返回给定所有集合的差集
4	SDIFFSTORE destination key1 [key2] 
返回给定所有集合的差集并存储在 destination 中
5	SINTER key1 [key2] 
返回给定所有集合的交集
6	SINTERSTORE destination key1 [key2] 
返回给定所有集合的交集并存储在 destination 中
7	SISMEMBER key member 
判断 member 元素是否是集合 key 的成员
8	SMEMBERS key 
返回集合中的所有成员
9	SMOVE source destination member 
将 member 元素从 source 集合移动到 destination 集合
10	SPOP key 
移除并返回集合中的一个随机元素
11	SRANDMEMBER key [count] 
返回集合中一个或多个随机数
12	SREM key member1 [member2] 
移除集合中一个或多个成员
13	SUNION key1 [key2] 
返回所有给定集合的并集
14	SUNIONSTORE destination key1 [key2] 
所有给定集合的并集存储在 destination 集合中
15	SSCAN key cursor [MATCH pattern] [COUNT count] 
迭代集合中的元素
```

> 参考：https://www.runoob.com/redis/redis-sets.html

### 6.6.有序集合(sorted set)




1. Redis **<span color=#159957>有序集合 </span>**和**<span color=#159957>集合 </span>**一样也是 string 类型元素的集合,且不允许重复的成员。
2. 不同的是每个元素都会关联一个 double 类型的分数。redis 正是通过分数来为集合中的成员进行从小到大的排序。
3. 有序集合的成员是唯一的,但分数(score)却可以重复。
4. 集合是通过哈希表实现的，所以添加，删除，查找的复杂度都是O(1)。 集合中最大的成员数为 232 - 1 (4294967295, 每个集合可存储40多亿个成员)。



<br>

```xml
序号	命令及描述
1	ZADD key score1 member1 [score2 member2] 
向有序集合添加一个或多个成员，或者更新已存在成员的分数
2	ZCARD key 
获取有序集合的成员数
3	ZCOUNT key min max 
计算在有序集合中指定区间分数的成员数
4	ZINCRBY key increment member 
有序集合中对指定成员的分数加上增量 increment
5	ZINTERSTORE destination numkeys key [key ...] 
计算给定的一个或多个有序集的交集并将结果集存储在新的有序集合 key 中
6	ZLEXCOUNT key min max 
在有序集合中计算指定字典区间内成员数量
7	ZRANGE key start stop [WITHSCORES] 
通过索引区间返回有序集合指定区间内的成员
8	ZRANGEBYLEX key min max [LIMIT offset count] 
通过字典区间返回有序集合的成员
9	ZRANGEBYSCORE key min max [WITHSCORES] [LIMIT] 
通过分数返回有序集合指定区间内的成员
10	ZRANK key member 
返回有序集合中指定成员的索引
11	ZREM key member [member ...] 
移除有序集合中的一个或多个成员
12	ZREMRANGEBYLEX key min max 
移除有序集合中给定的字典区间的所有成员
13	ZREMRANGEBYRANK key start stop 
移除有序集合中给定的排名区间的所有成员
14	ZREMRANGEBYSCORE key min max 
移除有序集合中给定的分数区间的所有成员
15	ZREVRANGE key start stop [WITHSCORES] 
返回有序集中指定区间内的成员，通过索引，分数从高到低
16	ZREVRANGEBYSCORE key max min [WITHSCORES] 
返回有序集中指定分数区间内的成员，分数从高到低排序
17	ZREVRANK key member 
返回有序集合中指定成员的排名，有序集成员按分数值递减(从大到小)排序
18	ZSCORE key member 
返回有序集中，成员的分数值
19	ZUNIONSTORE destination numkeys key [key ...] 
计算给定的一个或多个有序集的并集，并存储在新的 key 中
20	ZSCAN key cursor [MATCH pattern] [COUNT count] 
迭代有序集合中的元素（包括元素成员和元素分值）
```

## 7.Redis常用


> 如果你读到在这里，相信你对 Redis 已经有了一定了解，入门就先简单学到这里，下篇一起上**<span color=#159957 face="黑体">青铜</span>**。


> 后面的篇章，还将继续介绍 Redis 的一些高级用法，缓存击穿、缓存雪崩，源码分析等。看后不忘三连，还有需要更多技术博文可以留言催更。

