---
title: rodert单排学习redis进阶【青铜】
icon: lightbulb
category:
  - redis
tag:
  - redis
  - 单排学习redis
---





## rodert单排学习redis进阶【青铜】

<!-- more -->

redis之青铜

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200616155217399.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQwMzc0NjA0,size_16,color_FFFFFF,t_70)
@[toc]
## 前言

> 声明：参考来源互联网，有任何争议可以留言。站在前人的肩上，我们才能看的更远。

> 本教程纯手打，致力于最实用教程，不需要什么奖励，只希望多多转发支持。
> 欢迎来我公众号，希望可以结识你，也可以催更，微信搜索：JavaPub

> 有任何问题都可以来谈谈 ！

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200616161009430.jpg)


本篇继续学习 Redis ,上一篇 [rodert单排学习redis入门【黑铁】](https://mp.weixin.qq.com/s?__biz=MzUzNDUyOTY0Nw==&mid=2247484011&idx=1&sn=1ffdb758a552db1934f41b1c4496bb36&chksm=fa92116bcde5987da7db79b41b86add44bddc574cdbd33bd622b7f6a21662c652331ed9e4173&scene=126&sessionid=1592125292&key=2e8f81eda3e54fad9074a8b209275cc64f9c5dd28066961b7be2f518b92c55507968ed1b6278d887e87fd9f464f4b4899c8cf651adda04616c16f3c11e97de5ebdc827c9144e99e8b08451af86234894&ascene=1&uin=MTk1NDc4MzM2Mg%3D%3D&devicetype=Windows+10+x64&version=62090070&lang=zh_CN&exportkey=AWHTYrB4gjJmGEbHtri6R6w%3D&pass_ticket=leo%2BHfJ0BW2bC82%2BQSYAPob7M1DzxC09JpT%2BAvOxTmnKdJp6Basn7bAq9v%2Fv3xN%2B) 对 Redis **<span color=#159957>安装</span>**和**<span color=#159957>常用数据</span>**结构做了梳理，如果没看可以先回去看完再继续本篇~



上一篇都是对一些 redis 基本数据类型 api 的讲解，本篇是数据类型底层实现，主要内容有：

- 为什么使用Redis
- Redis数据结构解析
- SDS简单动态字符串
- 哈希表
- 跳跃表
- 整数集合
- 压缩列表
- Redis中数据结构的对象
- ...



## 1.再谈Redis

Redis 是什么？官话来说就是：

> Redis is an open source (BSD licensed), in-memory data structure store, used as a database, cache and message broker.

Redis 是一个开源的、**基于内存**的**数据结构存储器**，可以用作**数据库**、**缓存**和**消息中间件**。

如果想尝试 Redis 命令又懒得安装，可以使用这个 [http://try.redis.io/](http://try.redis.io/) 网站。

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200616155248408.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQwMzc0NjA0,size_16,color_FFFFFF,t_70)

## 2.为什么要用Redis

上一篇咱们有一定了解

Redis 是**<span color=#159957>基于内存</span>**，常用作缓存的一种技术，并且 Redis 存储的方式是以 **<span color=#c00>key-value</span>** 形式。

那我们为什么不用 Java Map？

- Java Map是**<span color=#c00>本地缓存</span>**的，最主要的特点是轻量以及快速，生命周期随着jvm的销毁而结束，并且在多实例的情况下，每个实例都需要各自保存一份缓存，缓存不具有一致性。
- JVM内存太大容易挂掉，还有各种**<span color=#c00>过期机制、存储结构</span>**需要自己手动来写
- Redis 会定期把缓存保存到硬盘，重启恢复数据，丰富的数据结构，缓存机制等实用功能。

## 3.为什么要使用缓存？

高并发，高可用这是现在互联网经常提到的一个词。在程序出现大量请求是就会出现**<span color=#c00>性能问题</span>**，一般性能问题第一道就是**<span color=#c00>数据库扛不住了</span>**，数据库的读写会有磁盘操作，而磁盘的速度相对内存来说慢很多。

所有我们在中间加一道缓存：


![在这里插入图片描述](https://img-blog.csdnimg.cn/20200616161041153.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQwMzc0NjA0,size_16,color_FFFFFF,t_70)

## 4.Redis数据结构
### 4.1.SDS简单动态字符串
#### 4.1.1.SDS简单动态字符串

Redis 是由C语言编写的。

我们现在知道 Redis 所有键都是字符串，值有字符串（string）、散列（hash）、列表（list）、集合（set）和有序集合（sorted set）这五种类型的键的底层实现数据结构。

> Redis 没有直接使用 C 语言传统的字符串表示（以空字符结尾的字符数组，以下简称 C 字符串）， 而是自己构建了一种名为简单动态字符串（simple dynamic string，SDS）的抽象类型， 并将 SDS 用作 Redis 的默认字符串表示。

Redis 使用 `sds.h/sdshdr` 结构表示一个 SDS 值：

```java
struct sdshdr {

    // 记录 buf 数组中已使用字节的数量
    // 等于 SDS 所保存字符串的长度
    int len;

    // 记录 buf 数组中未使用字节的数量
    int free;

    // 字节数组，用于保存字符串
    char buf[];

};
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200616155325700.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQwMzc0NjA0,size_16,color_FFFFFF,t_70)

上图是 SDS 示例，以空字符结尾 `'\0'`。遵循空字符结尾这一惯例的好处是， SDS 可以直接重用一部分 C 字符串函数库里面的函数。

举个例子， 如果我们有一个指向图 2-1 所示 SDS 的指针 s ， 那么我们可以直接使用 stdio.h/printf 函数， 通过执行以下语句：

```c
printf("%s", s->buf);
```

来打印出 SDS 保存的字符串值 "Redis" ， 而无须为 SDS 编写专门的打印函数。

#### 4.1.2.SDS简单动态字符串好处

1. sdshdr数据结构中用len属性记录了字符串的长度。那么获取字符串的长度时，**<span color=#c00>时间复杂度</span>**只需要 `O(1)`。**<span color=#159957>常数复杂度获取字符串长度</span>**。

2. SDS不会发生溢出的问题，如果修改SDS时，空间不足。先会扩展空间，再进行修改！(**<span color=#c00>内部实现了动态扩展机制</span>**)。**<span color=#159957>杜绝缓冲区溢出</span>**。

3. SDS可以**<span color=#c00>减少内存分配的次数</span>**(空间预分配机制)。在扩展空间时，除了分配修改时所必要的空间，还会分配额外的空闲空间(free 属性)。**<span color=#159957>减少修改字符串长度时所需的内存重分配次数</span>**。

4. SDS是**<span color=#c00>二进制安全</span>**的，SDS 以二进制的方式来处理SDS存放在buf数组里的数据。

5. 可以使用一部分 `<string.h>` 库中的函数。**<span color=#159957>兼容部分 C 字符串函数</span>**。


### 4.2.Redis 链表和链表节点

> Java 学习者对链表应该都很熟悉，链表是 Java 中一种典型且常用的数据构。

每个**<span color=#c00>链表节点</span>**使用一个 `adlist.h/listNode` 结构来表示：

```java
typedef struct listNode {

    // 前置节点
    struct listNode *prev;

    // 后置节点
    struct listNode *next;

    // 节点的值
    void *value;

} listNode;
```

使用listNode是可以组成链表了，Redis中**<span color=#159957>使用list结构来持有链表</span>**：

```java
typedef struct list {

    // 表头节点
    listNode *head;

    // 表尾节点
    listNode *tail;

    // 链表所包含的节点数量
    unsigned long len;

    // 节点值复制函数
    void *(*dup)(void *ptr);

    // 节点值释放函数
    void (*free)(void *ptr);

    // 节点值对比函数
    int (*match)(void *ptr, void *key);

} list;
```



由一个 `list` 结构和三个 `listNode` 结构组成的链表：


![在这里插入图片描述](https://img-blog.csdnimg.cn/20200616155348716.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQwMzc0NjA0,size_16,color_FFFFFF,t_70)

#### 4.2.2.Redis 链表重点

- 链表被广泛用于实现 Redis 的各种功能， 比如**列表键， 发布与订阅， 慢查询， 监视器**， 等等。
- 每个链表节点由一个 `listNode` 结构来表示， 每个节点都有一个指向**前置节点**和**后置节点**的指针， 所以 Redis 的链表实现是**双端链表**。
- 每个链表使用一个 `list` 结构来表示，这个结构带有**表头节点指针**、**表尾节点指针**、以及**链表长度**等信息。
- 因为链表表头节点的**前置节点**和**表尾节点**的后置节点都指向 NULL ， 所以 Redis 的链表实现是**无环链表**。
- 通过为链表设置不同的类型特定函数， Redis 的链表可以用于保存各种不同类型的值。

### 4.3.Redis 字典
#### 4.3.1.哈希表

> 字典是 Redis 中的一个概念，Redis 的字典使用哈希表作为底层实现。 一个哈希表里面可以有多个哈希表节点， 而每个哈希表节点就保存了字典中的一个键值对。

**空哈希表**
Redis 字典所使用的哈希表由 `dict.h/dictht` 结构定义：

```c
typedef struct dictht {

    // 哈希表数组
    dictEntry **table;

    // 哈希表大小
    unsigned long size;

    // 哈希表大小掩码，用于计算索引值
    // 总是等于 size - 1
    unsigned long sizemask;

    // 该哈希表已有节点的数量
    unsigned long used;

} dictht;
```


![在这里插入图片描述](https://img-blog.csdnimg.cn/20200616155404943.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQwMzc0NjA0,size_16,color_FFFFFF,t_70)

**哈希表节点**
哈希表节点使用 dictEntry 结构表示， 每个 dictEntry 结构都保存着一个键值对：

```c
typedef struct dictEntry {

    // 键
    void *key;

    // 值
    union {
        void *val; 
        uint64_t u64; //uint64_t整数
        int64_t s64; //int64_t整数
    } v;

    // 指向下个哈希表节点，形成链表
    struct dictEntry *next;

} dictEntry;
```



![在这里插入图片描述](https://img-blog.csdnimg.cn/20200616155419279.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQwMzc0NjA0,size_16,color_FFFFFF,t_70)

> 有没有注意到，上图有个冲突，俩个键在同一个节点，这就是 Redis **解决键冲突** ，Redis 的哈希表使用链地址法（separate chaining）来解决键冲突： 每个哈希表节点都有一个 next 指针， 多个哈希表节点可以用 next 指针构成一个单向链表， 被分配到同一个索引上的多个节点可以用这个单向链表连接起来， 这就解决了键冲突的问题。

**字典**
Redis 中的字典由 dict.h/dict 结构表示：

```c
typedef struct dict {

    // 类型特定函数
    dictType *type;

    // 私有数据
    void *privdata;

    // 哈希表
    dictht ht[2];

    // rehash 索引
    // 当 rehash 不在进行时，值为 -1
    int rehashidx; /* rehashing not in progress if rehashidx == -1 */

} dict;

------------------分割线---------------------------

typedef struct dictType {

    // 计算哈希值的函数
    unsigned int (*hashFunction)(const void *key);

    // 复制键的函数
    void *(*keyDup)(void *privdata, const void *key);

    // 复制值的函数
    void *(*valDup)(void *privdata, const void *obj);

    // 对比键的函数
    int (*keyCompare)(void *privdata, const void *key1, const void *key2);

    // 销毁键的函数
    void (*keyDestructor)(void *privdata, void *key);

    // 销毁值的函数
    void (*valDestructor)(void *privdata, void *obj);

} dictType;
```



​	ht 属性是一个包含两个项的数组， 数组中的每个项都是一个 **dictht** 哈希表， 一般情况下， 字典只使用 **ht[0]** 哈希表， **ht[1]** 哈希表只会在对 **ht[0]** 哈希表进行 **rehash** 时使用。

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200616155431351.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQwMzc0NjA0,size_16,color_FFFFFF,t_70)

#### 4.3.2.Redis rehash(重新散列)

随着操作的不断执行， 哈希表保存的键值对会逐渐地增多或者减少， 为了让哈希表的**<span color=#159957>负载因子</span>**（load factor）维持在一个合理的范围之内， 当哈希表保存的键值对数量太多或者太少时， 程序需要对哈希表的大小进行相应的扩展或者收缩。

> 在对哈希表进行扩展或者收缩操作时，reash 过程并不是一次性地完成的，而是**<span color=#159957>渐进式</span>**地完成的。

```
以下是哈希表渐进式 rehash 的详细步骤：

为 ht[1] 分配空间， 让字典同时持有 ht[0] 和 ht[1] 两个哈希表。
在字典中维持一个索引计数器变量 rehashidx ， 并将它的值设置为 0 ， 表示 rehash 工作正式开始。
在 rehash 进行期间， 每次对字典执行添加、删除、查找或者更新操作时， 程序除了执行指定的操作以外， 还会顺带将 ht[0] 哈希表在 rehashidx 索引上的所有键值对 rehash 到 ht[1] ， 当 rehash 工作完成之后， 程序将 rehashidx 属性的值增一。
随着字典操作的不断执行， 最终在某个时间点上， ht[0] 的所有键值对都会被 rehash 至 ht[1] ， 这时程序将 rehashidx 属性的值设为 -1 ， 表示 rehash 操作已完成。
```

#### 4.3.3.重点

- 字典被广泛用于实现 Redis 的各种功能， 其中包括数据库和哈希键。
- Redis 中的字典使用哈希表作为底层实现， 每个字典带有两个哈希表， 一个用于平时使用， 另一个仅在进行 `rehash` 时使用。
- 当字典被用作数据库的底层实现， 或者哈希键的底层实现时， Redis 使用 MurmurHash2 算法来计算键的哈希值。
- 哈希表使用链地址法来解决键冲突， 被分配到同一个索引上的多个键值对会连接成一个单向链表。
- 在对哈希表进行扩展或者收缩操作时， 程序需要将现有哈希表包含的所有键值对 `rehash` 到新哈希表里面， 并且这个 rehash 过程并不是一次性地完成的， 而是渐进式地完成的。

### 4.4.跳跃表
#### 4.4.1.跳跃表

Redis 的跳跃表由 `redis.h/zskiplistNode` 和 `redis.h/zskiplist` 两个结构定义， 其中 `zskiplistNode` 结构用于表示跳跃表节点， 而 `zskiplist` 结构则用于保存跳跃表节点的相关信息， 比如节点的数量， 以及指向**<span color=#159957>表头节点和表尾节点</span>**的指针， 等等。

**跳跃表节点**

```c
typedef struct zskiplistNode {

    // 后退指针
    struct zskiplistNode *backward;

    // 分值
    double score;

    // 成员对象
    robj *obj;

    // 层
    struct zskiplistLevel {

        // 前进指针
        struct zskiplistNode *forward;

        // 跨度
        unsigned int span;

    } level[];

} zskiplistNode;
```



- zskiplistNode 不同层高节点


![在这里插入图片描述](https://img-blog.csdnimg.cn/20200616155501710.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQwMzc0NjA0,size_16,color_FFFFFF,t_70)



> 跳跃表节点的 level 数组可以包含多个元素， 每个元素都包含一个指向其他节点的指针， 程序可以通过这些层来加快访问其他节点的速度， 一般来说， **<span color=#159957>层的数量越多</span>**， 访问其他节点的**<span color=#159957>速度就越快</span>**。

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200616155511703.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQwMzc0NjA0,size_16,color_FFFFFF,t_70)

> 看到这里，如果还有疑惑，不理解什么是跳跃表，传送一篇不错的跳跃表介绍文章：https://www.cnblogs.com/hunternet/p/11248192.html

#### 4.4.2.重点

1. 跳跃表是有序集合的底层实现之一， 除此之外它在 Redis 中没有其他应用。
2. Redis 的跳跃表实现由 zskiplist 和 zskiplistNode 两个结构组成， 其中 zskiplist 用于保存**<span color=#159957>跳跃表信息</span>**（比如表头节点、表尾节点、长度）， 而 zskiplistNode 则用于表示**<span color=#159957>跳跃表节点</span>**。
3. 每个跳跃表节点的层高都是 **<span color=#159957>1 至 32</span>** 之间的**<span color=#159957>随机数</span>**。
4. 在同一个跳跃表中， 多个节点可以包含**<span color=#159957>相同的分值</span>**， 但每个节点的**<span color=#159957>成员对象必须是唯一</span>**的。
5. 跳跃表中的节点按照分值大小进行排序， 当分值相同时， 节点按照成员对象的大小进行排序。

### 4.5.整数集合

- **整数集合**是**<span color=#159957>集合键(set)</span>**的底层实现之一。
- 整数集合的底层实现为**<span color=#159957>数组</span>**， 这个数组以**<span color=#159957>有序、无重复</span>**的方式保存集合元素，在有需要时， 程序会根据**<span color=#159957>新添加元素</span>**的类型， **<span color=#159957>改变这个数组的类型</span>**。
- 升级操作为整数集合带来了操作上的灵活性， 并且尽可能地**节约了内存**。
- 整数集合**<span color=#159957>只支持升级</span>**操作， 不支持降级操作。

整数集合（intset）是 Redis 用于保存整数值的集合抽象数据结构， 它可以保存类型为 `int16_t` 、 `int32_t` 或者 `int64_t` 的整数值， 并且保证集合中不会出现**<span color=#159957>重复元素</span>**。

数据结构：

```c
typedef struct intset {

    // 编码方式
    uint32_t encoding;

    // 集合包含的元素数量
    uint32_t length;

    // 保存元素的数组
    int8_t contents[];

} intset;
```



![在这里插入图片描述](https://img-blog.csdnimg.cn/20200616155827825.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQwMzc0NjA0,size_16,color_FFFFFF,t_70)

### 4.6.压缩列表
#### 4.6.1.前言

> 同整数集合一样压缩列表也不是基础数据结构，而是 **Redis** 自己设计的一种数据存储结构。它有点儿类似数组，通过一片**<span color=#159957>连续的内存空间</span>**，来存储数据。不过，它跟数组不同的一点是，它允许存储的数据大小不同。

我们知道，数组要求每个元素大大小相同，如果要存储长度不同的字符串，那就需要用**<span color=#159957>最大长度</span>**的字符串大小作为元素的大小。以最大长度为标准，就会浪费一部分存储空间。

数组的优势占用一片**<span color=#159957>连续的空间</span>**可以很好的利用CPU缓存访问数据。如果我们想要保留这种优势，又想节省存储空间我们可以对数组进行压缩。

那就需要给每个节点增加一个 `lenght` 的属性。

#### 4.6.2.Redis 压缩列表

*压缩列表(zip1ist)是 Redis 列表和 Redis 哈希的底层实现之一。*
    

- 当一个列表只包含少量列表项,并且每个列表项要么就是小整数值,要么就是长度比较短的字符串,那么Redis就会使用压缩列表来做列表的底层实现。

- 当一个哈希只包含少量键值对,比且每个键值对的键和值要么就是小整数值,要么就是长度比较短的字符串,那么Redis就会使用压缩列表来做哈希的底层实现。

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200616155926449.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQwMzc0NjA0,size_16,color_FFFFFF,t_70)




> 参考：https://www.cnblogs.com/hunternet/p/11306690.html

1. 表是Redis为节约内存自己设计的一种顺序型数据结构。
2. 表被用作列表键和哈希键的底层实现之一。
3. 压缩列表可以包含多个节点,每个节点可以保存一个字节数组或者整数值。
4. 添加新节点到压缩列表,或者从压缩列表中删除节点,可能会引发连锁更新操作,但这种操作出现的几率并不高。

### 4.7.Redis的对象
#### 4.7.1.Redis的对象

Redis 中当我们创建一个键值对时，我们至少会创建俩个对象，一个用作键(键对象)，一个用作值(值对象)。

- Redis 对象结构

```c
typedef struct redisObject {

    // 类型
    unsigned type:4;

    // 编码
    unsigned encoding:4;

    // 指向底层实现数据结构的指针
    void *ptr;

    // ...

} robj;
```

- **Redis 内存回收**

> 值得一提的是 redis 内存回收，因为 C 语言并不具备自动的内存回收功能， 所以 Redis 在自己的对象系统中构建了一个**<span color=#159957>引用计数</span>**（reference counting）技术实现的内存回收机制， 通过这一机制， 程序可以通过跟踪对象的引用计数信息， 在适当的时候自动释放对象并进行**<span color=#159957>内存回收</span>**。每个对象的引用计数信息由 `redisObject` 结构的 `refcount` 属性记录：

```c
typedef struct redisObject {

    // ...

    // 引用计数
    int refcount;

    // ...

} robj;
```

- **Redis 对象共享**

> 举个例子， 假设键 A 创建了一个包含整数值 100 的字符串对象作为值对象，如果这时键 B 也要创建一个同样保存了整数值 100 的字符串对象作为值对象。

在 Redis 中， 让多个键共享同一个值对象需要执行以下两个步骤：

1. 将数据库键的值指针指向一个现有的值对象；
2. 将被共享的值对象的引用计数增一。

`目前来说， Redis 会在初始化服务器时， 创建一万个字符串对象， 这些对象包含了从 0 到 9999 的所有整数值， 当服务器需要用到值为 0到 9999 的字符串对象时， 服务器就会使用这些共享对象， 而不是新创建对象。`

- **Redis 对象的空转时长**

> 除了前面介绍过的 **<span color=#159957>type 、 encoding 、 ptr 和 refcount</span>** 四个属性之外， redisObject 结构包含的最后一个属性为 **<span color=#159957>lru</span>** 属性， 该属性记录了对象最后一次被命令程序访问的时间：

```c
typedef struct redisObject {

    // ...

    unsigned lru:22;

    // ...

} robj;
```

#### 4.7.2.重点

> 内存回收和对象的空转时长涉及到 Redis 配置文件(内存的算法 volatile-lru、allkeys-lru等其他知识点)，后面单独一篇详细讲解。

- Redis 数据库中的每个键值对的键和值都是一个对象。
- Redis 共有字**<span color=#159957>符串、列表、哈希、集合、有序集合</span>**五种类型的对象， 每种类型的对象至少都有两种或以上的编码方式， 不同的编码可以在不同的使用场景上优化对象的使用效率。
- 服务器在执行某些命令之前， 会先检查给定键的类型能否执行指定的命令， 而检查一个键的类型就是检查键的值对象的类型。
- Redis 的对象系统带有引用计数实现的**<span color=#159957>内存回收机制</span>**， 当一个对象不再被使用时， 该对象所占用的内存就会被自动释放。
- Redis 会共享值为 0 到 9999 的字符串对象。
- 对象会记录自己的最后一次被访问的时间， 这个时间可以用于计算对象的**<span color=#159957>空转时间</span>**。

