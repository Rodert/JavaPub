---
### 这是侧边栏索引
index: true
### 这是页面的图标
icon: page
### 这是文章的标题
title: 10道不得不会的MySQL基础面试题
### 设置作者
author: Wang Shiyu
### 设置写作时间
date: 2022-04-21
### 一个页面可以有多个分类
category:
  - 最少必要面试题
### 一个页面可以有多个标签
tag:
  - mysql
  - 面试题
### 此页面会出现在首页的文章板块中
star: true
---

MySql

<!-- more -->

10道不得不会的MySQL基础面试题

以下都是 **MySQL常见面试题**，相信大家都会有种及眼熟又陌生的感觉、看过可能在短暂的面试后又马上忘记了。**JavaPub**在这里整理这些容易忘记的重点知识及**解答**，`建议收藏，经常温习查阅`。

评论区见


@[toc]

---

推荐一篇非常不错的文章，阅读后更有利于了解MySQL【B树和B+树的区别】：
[https://mp.weixin.qq.com/s/RWkc2lNarKnn8Dc0HrP58g](https://mp.weixin.qq.com/s/RWkc2lNarKnn8Dc0HrP58g)

---


### 1. mysql有哪几种log

重做日志(redo log)、回滚日志(undo log)、二进制日志(binlog)、错误日志(errorlog)、慢查询日志(slow query log)、一般查询日志(general log)，中继日志(relay log)

错误日志：记录出错信息，也记录一些警告信息或者正确的信息。

查询日志：记录所有对数据库请求的信息，不论这些请求是否得到了正确的执行。

慢查询日志：设置一个阈值，将运行时间超过该值的所有SQL语句都记录到慢查询的日志文件中。

二进制日志：记录对数据库执行更改的所有操作。

中继日志：中继日志也是二进制日志，用来给slave 库恢复

事务日志：重做日志redo和回滚日志undo

---

### 2. MySQL的复制原理以及流程

1. 主：binlog线程——记录下所有改变了数据库数据的语句，放进master上的binlog中。
2. 从：io线程——在使用start slave 之后，负责从master上拉取 binlog 内容，放进 自己的relay log中。
3. 从：sql执行线程——执行relay log中的语句。

---

### 3. 事物的4种隔离级别

隔离强度逐渐增强，性能逐渐变差。

- 读未提交(RU) READ UNCOMMITTED
- 读已提交(RC) READ COMMITT
- 可重复读(RR) REPEATABLE READ
- 串行化 SERIALIZABLE 

事务具有原子性（Atomicity）、一致性（Consistency）、隔离性（Isolation）、持久性（Durability）四个特性，简称 ACID，缺一不可。

---

### 4. 相关概念

**脏读**

脏读指的是读到了其他事务未提交的数据，未提交意味着这些数据可能会回滚，也就是可能最终不会存到数据库中，也就是不存在的数据。读到了并一定最终存在的数据，这就是脏读。

**可重复读**

可重复读指的是在一个事务内，最开始读到的数据和事务结束前的任意时刻读到的同一批数据都是一致的。通常针对数据更新（UPDATE）操作。

**不可重复读**

对比可重复读，不可重复读指的是在同一事务内，不同的时刻读到的同一批数据可能是不一样的，可能会受到其他事务的影响，比如其他事务改了这批数据并提交了。通常针对数据更新（UPDATE）操作。

**幻读**

幻读是针对数据插入（INSERT）操作来说的。假设事务 A 对某些行的内容作了更改，但是还未提交，此时事务 B 插入了与事务 A 更改前的记录相同的记录行，并且在事务 A 提交之前先提交了，而这时，在事务 A 中查询，会发现好像刚刚的更改对于某些数据未起作用，但其实是事务 B 刚插入进来的，让用户感觉很魔幻，感觉出现了幻觉，这就叫幻读。

---

### 5. MySQL数据库几个基本的索引类型

普通索引、唯一索引、主键索引、全文索引

---

### 6. drop、delete与truncate的区
SQL中的drop、delete、truncate都表示删除，但是三者有一些差别

1、delete和truncate只删除表的数据不删除表的结构
2、速度,一般来说: drop> truncate >delete
3、delete语句是dml,这个操作会放到rollback segement中,事务提交之后才生效;
4、如果有相应的trigger,执行的时候将被触发. truncate,drop是ddl, 操作立即生效,原数据不放到rollback segment中,不能回滚. 操作不触发trigger.

---

### 7. 数据库的乐观锁和悲观锁是什么？

**悲观锁**的特点是先获取锁，再进行业务操作，即 “悲观” 的认为获取锁是非常有可能失败的，因此要先确保获取锁成功再进行业务操作。通常所说的 “一锁二查三更新” 即指的是使用悲观锁。

通常来讲在数据库上的悲观锁需要数据库本身提供支持，即通过常用的 select … for update 操作来实现悲观锁。　当数据库执行 select for update 时会获取被 select 中的数据行的行锁，因此其他并发执行的 select for update 如果试图选中同一行则会发生排斥（需要等待行锁被释放），因此达到锁的效果。select for update 获取的行锁会在当前事务结束时自动释放，因此必须在事务中使用。

mysql 还有个问题是 select… for update 语句执行中，如果数据表没有添加索引或主键，所有扫描过的行都会被锁上，这一点很容易造成问题。因此如果在 mysql 中用悲观锁务必要确定走了索引，而不是全表扫描。

**乐观锁**的特点先进行业务操作，不到万不得已不去拿锁。即“乐观”的认为拿锁多半是会成功的，因此在进行完业务操作需要实际更新数据的最后一步再去拿一下锁就好。

乐观锁在数据库上的实现完全是逻辑的，不需要数据库提供特殊的支持。一般的做法是在需要锁的数据上增加一个版本号，或者时间戳。

**乐观锁的两种实现方式：**

1. 使用数据版本（Version）记录机制实现，这是乐观锁最常用的一种实现方式。何谓数据版本？即为数据增加一个版本标识，一般是通过为数据库表增加一个数字类型的 “version” 字段来实现。当读取数据时，将 version 字段的值一同读出，数据每更新一次，对此 version 值加一。当我们提交更新的时候，判断数据库表对应记录的当前版本信息与第一次取出来的 version 值进行比对，如果数据库表当前版本号与第一次取出来的 version 值相等，则予以更新，否则认为是过期数据。

3. 乐观锁定的第二种实现方式和第一种差不多，同样是在需要乐观锁控制的table中增加一个字段，名称无所谓，字段类型使用时间戳（timestamp）,和上面的 version 类似，也是在更新提交的时候检查当前数据库中数据的时间戳和自己更新前取到的时间戳进行对比，如果一致则 OK，否则就是版本冲突。

---

### 8. SQL优化方式
1. 对查询进行优化，应尽量避免全表扫描，首先应考虑在 where 及 order by 涉及的列上建立索引。
2. 应尽量避免在 where 子句中对字段进行 null 值判断，否则将导致引擎放弃使用索引而进行全表扫描，如果索引是整形，那么可以在索引上设置默认值 0，确保表中列没有 null 值。
3. 应尽量避免在 where 子句中使用 != 或 <> 操作符，否则将引擎放弃使用索引而进行全表扫描。
4. 应尽量避免在 where 子句中使用 or 来连接条件，否则将导致引擎放弃使用索引而进行全表扫描。
5. in 和 not in 也要慎用，否则会导致全表扫描。
6. like ‘%abc%’ 也会导致全表扫描。
7. 应尽量避免在 where 子句中对字段进行表达式操作，这将导致引擎放弃使用索引而进行全表扫描。
8. 应尽量避免在 where 子句中对字段进行函数操作，这将导致引擎放弃使用索引而进行全表扫描。
9. 在使用索引字段作为条件时，如果该索引是复合索引，那么必须使用到该索引中的第一个字段作为条件时才能保证系统使用该索引，否则该索引将不会被使用，并且应尽可能的让字段顺序与索引顺序相一致。
10. 很多时候用 exists 代替 in 是一个好的选择。

---

### 9. 从锁的类别上分MySQL都有哪些锁呢？
从锁的类别上来讲，有共享锁和排他锁。

**共享锁**: 又叫做读锁。 当用户要进行数据的读取时，对数据加上共享锁。共享锁可以同时加上多个。

**排他锁**: 又叫做写锁。 当用户要进行数据的写入时，对数据加上排他锁。排他锁只可以加一个，他和其他的排他锁，共享锁都相斥。


 ---

参考：

```
1. https://haicoder.net/note/mysql-interview/mysql-interview-optimistic-pessimism-lock.html
```

---

### 推荐阅读：

系列面试题




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






