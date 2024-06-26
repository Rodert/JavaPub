---
# 这是侧边栏索引
index: true
# 这是页面的图标
icon: page
# 这是文章的标题
title: 10道不得不会的Java容器面试题
# 设置作者
author: Wang Shiyu
# 设置写作时间
date: 2022-04-23
# 一个页面可以有多个分类
category:
  - 最少必要面试题
# 一个页面可以有多个标签
tag:
  - java
  - 面试题

---

Java 容器

<!-- more -->

10道不得不会的Java容器面试题

以下都是 **Java容器常见面试题**，相信大家都会有种及眼熟又陌生的感觉、看过可能在短暂的面试后又马上忘记了。**JavaPub**在这里整理这些容易忘记的重点知识及**解答**，`建议收藏，经常温习查阅`。

评论区见

[toc]


### 1. 请说一下Java容器集合的分类，各自的继承结构

Java 容器分为 Collection 和 Map 两大类，其下又有很多子类，如下所示：

Collection包括：List、ArrayList、LinkedList、Vector、Stack、Set、HashSet、LinkedHashSet、TreeSet

Map包括：HashMap、LinkedHashMap、TreeMap、ConcurrentHashMap、Hashtable

### 2. Collection 和 Collections 有什么区别？

Collection 是一个集合接口，它提供了对集合对象进行基本操作的通用接口方法，所有集合都是它的子类，比如 List、Set 等。

Collections 是一个包装类，包含了很多静态方法，不能被实例化，就像一个工具类，比如提供的排序方法：Collections. sort(list)。

### 3. List、Set、Map 之间的区别是什么？

List、Set、Map 的区别主要体现在两个方面：元素是否有序、是否允许元素重复。

### 4. HashMap 和 Hashtable 有什么区别？

- HashMap 是非线程安全的，HashTable 是线程安全的。
- HashMap 的键和值都允许有 null 值存在，而 HashTable 则不行。
- 因为线程安全的问题，HashMap 效率比 HashTable 的要高。
- Hashtable 是同步的，而 HashMap 不是。因此，HashMap 更适合于单线程环境，而 Hashtable 适合于多线程环境。
- 一般现在 **不建议用 HashTable **，
	- 一方面是因为 HashTable 是遗留类，内部实现很多没优化和冗余。
	- 另外，即使在 **多线程** 环境下，现在也有同步的 **ConcurrentHashMap** 替代，没有必要因为是多线程而用 HashTable。

### 5. 说一下 HashMap 的实现原理？

HashMap 基于 Hash 算法实现的，我们通过 put(key,value)存储，get(key)来获取。当传入 key 时，HashMap 会根据
key. hashCode() 计算出 hash 值，根据 hash 值将 value 保存在 bucket 里。

当计算出的 hash 值相同时，我们称之为 hash 冲突，HashMap 的做法是用链表和红黑树存储相同 hash 值的 value。当 hash
冲突的个数比较少时，使用链表否则使用红黑树。

### 6. 谈谈 ArrayList 和 LinkedList 的区别

本质的区别来源于两者的底层实现：ArrayList的底层是数组，LinkedList的底层是双向链表。

数组拥有O(1)的查询效率，可以通过下标直接定位元素；链表在查询元素的时候只能通过遍历的方式查询，效率比数组低。

数组增删元素的效率比较低，通常要伴随拷贝数组的操作；链表增删元素的效率很高，只需要调整对应位置的指针即可。

以上是数组和链表的通俗对比，在日常的使用中，两者都能很好地在自己的适用场景发挥作用。

比如说我们常常用ArrayList代替数组，因为封装了许多易用的api，而且它内部实现了自动扩容机制，由于它内部维护了一个当前容量的指针size，直接往ArrayList中添加元素的时间复杂度是O(1)的，使用非常方便。

而LinkedList常常被用作Queue队列的实现类，由于底层是双向链表，能够轻松地提供先入先出的操作。

> 我觉得可以分两部分答，一个是数组与链表底层实现的不同，另一个是答ArrayList和LinkedList的实现细节。


### 7. 谈谈ArrayList和Vector的区别

两者的底层实现相似，关键的不同在于Vector的对外提供操作的方法都是用synchronized修饰的，也就是说Vector在并发环境下是线程安全的，而ArrayList在并发环境下可能会出现线程安全问题。

由于Vector的方法都是同步方法，执行起来会在同步上消耗一定的性能，所以在单线程环境下，Vector的性能是不如ArrayList的

除了线程安全这点本质区别外，还有一个实现上的小细节区别：ArrayList每次扩容的大小为原来的1.5倍；Vector可以指定扩容的大小，默认是原来大小的两倍。

> 可以顺带谈谈多线程环境下ArrayList的替代品，比如CopyOnWriteArrayList，但是要谈谈优缺点。


### 8. 请谈一谈 Java 集合中的 fail-fast 和 fail-safe 机制

fail-fast 是一种错误检测机制，Java 在适合单线程使用的集合容器中很好地实现了 fail-fast 机制，举一个简单的例子：在多线程并发环境下，A线程在通过迭代器遍历一个 ArrayList 集合，B线程同时对该集合进行增删元素操作，这个时候线程A就会抛出并发修改异常，中断正常执行的逻辑。

而fail-safe机制更像是一种对 fail-fast 机制的补充，它被广泛地实现在各种并发容器集合中。回头看上面的例子，如果线程A遍历的不是一个 ArrayList，而是一个 CopyOnWriteArrayList，则符合 fail-safe 机制，线程B可以同时对该集合的元素进行增删操作，线程A不会抛出任何异常。

要理解这两种机制的表象，我们得了解这两种机制背后的实现原理：

我们同样用 ArrayList 解释 fail-fast 背后的原理：首先 ArrayList 自身会维护一个 modCount 变量，每当进行增删元素等操作时，modCount 变量都会进行自增。当使用迭代器遍历 ArrayList 时，迭代器会新维护一个初始值等于 modCount 的 expectedModCount 变量，每次获取下一个元素的时候都会去检查 expectModCount 和 modCount 是否相等。在上面举的例子中，由于B线程增删元素会导致 modCount 自增，当A线程遍历元素时就会发现两个变量不等，从而抛出异常。

CopyOnWriteArrayList 所实现的 fail-safe 在上述情况下没有抛出异常，它的原理是：当使用迭代器遍历集合时，会基于原数组拷贝出一个新的数组（ArrayList的底层是数组），后续的遍历行为在新数组上进行。所以线程B同时进行增删操作不会影响到线程A的遍历行为。


### 9. HashMap是怎样确定key存放在数组的哪个位置的？JDK1.8

首先计算key的hash值，计算过程是：先得到key的hashCode（int类型，4字节），然后把hashCode的高16位与低16位进行异或，得到key的hash值。

接下来用key的hash值与数组长度减一的值进行按位与操作，得到key在数组中对应的下标。

##### 9.1. 追问：为什么计算key的hash时要把hashCode的高16位与低16位进行异或？（变式：为什么不直接用key的hashCode）?

计算key在数组中的下标时，是通过hash值与数组长度减一的值进行按位与操作的。由于数组的长度通常不会超过2^16，所以hash值的高16位通常参与不了这个按位与操作。

为了让hashCode的高16位能够参与到按位与操作中，所以把hashCode的高16位与低16位进行异或操作，使得高16位的影响能够均匀稀释到低16位中，使得计算key位置的操作能够充分散列均匀。



### 10. 为什么要把链表转为红黑树，阈值为什么是8？

在极端情况下，比如说key的hashCode()返回的值不合理，或者多个密钥共享一个hashCode，很有可能会在同一个数组位置产生严重的哈希冲突。

这种情况下，如果我们仍然使用使用链表把多个冲突的元素串起来，这些元素的查询效率就会从O(1)下降为O(N)。为了能够在这种极端情况下仍保证较为高效的查询效率，HashMap选择把链表转换为红黑树，红黑树是一种常用的平衡二叉搜索树，添加，删除，查找元素等操作的时间复杂度均为O(logN)

至于阈值为什么是8，这是HashMap的作者根据概率论的知识得到的。当key的哈希码分布均匀时，数组同一个位置上的元素数量是成泊松分布的，同一个位置上出现8个元素的概率已经接近千分之一了，这侧面说明如果链表的长度达到了8，key的hashCode()肯定是出了大问题，这个时候需要红黑树来保证性能，所以选择8作为阈值。

**追问：为什么红黑树转换回链表的阈值不是7而是6呢？**

如果是7的话，那么链表和红黑树之间的切换范围值就太小了。如果我的链表长度不停地在7和8之间切换，那岂不是得来回变换形态？所以选择6是一种折中的考虑。

### 拓展题. 为什么 HashMap 数组的长度是2的幂次方？

因为这样能够提高根据 key 计算数组位置的效率。

HashMap 根据 key 计算数组位置的算法是：用 key 的 hash 值与数组长度减1的值进行按位与操作。

在我们正常人的思维中，获取数组的某个位置最直接的方法是对数组的长度取余数。但是如果被除数是2的幂次方，那么这个对数组长度取余的方法就等价于对数组长度减一的值进行按位与操作。

在计算机中，位运算的效率远高于取模运算，所以为了提高效率，把数组的长度设为2的幂次方。


> 所以一定要看一遍源码，相比于框架的源码，集合的源码简直太友好了。在笔试的时候可能还会考一些集合的使用，比如遍历，排序，比较等等，这些算是Java基础，用得多也就熟了。








低谷蓄力

**[《最少必要面试题》](https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzUzNDUyOTY0Nw==&action=getalbum&album_id=2344061143381508097#wechat_redirect)**




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

