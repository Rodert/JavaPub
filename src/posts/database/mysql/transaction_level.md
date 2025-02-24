---
title: MySQL事务隔离级别老生常谈
icon: file
author: Ms.Wang
date: 2025-02-24
sticky: true
star: false
category:
  - mysql
  - 面试题
  - 事务
tag:
  - mysql
  - 事务
  - 面试题
  - 隔离级别
---


> MySQL事务隔离级别老生常谈


今天朋友参加了一个面试，回来问咋样。八股文不能丢！八股文不能丢！八股文不能丢！


![image-20250224155603150](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202502241556896.png)


一个老生常谈的题：

**MySQL 有哪些事务隔离级别？？**


> 这道题的高频程度相当于：“HashMap 的底层结构是啥？”

这个问题问啥？

字面意思，有哪些隔离级别？

每种隔离级别分别有什么含义？

会出现什么并发问题？


## 回答

MySQL 支持以下四种事务隔离级别。

标准回答

#### READ UNCOMMITTED（读未提交）

- 特点：允许一个事务读取到其他事务尚未提交的数据。
- 问题：可能出现脏读（读取到未提交的事务数据）。
- 场景：性能最高，但安全性最低，通常不推荐使用。

#### READ COMMITTED（读已提交）

- 特点：一个事务只能读取到其他事务已经提交的数据。
- 问题：避免了脏读，但可能出现不可重复读（同一个事务中多次读取同一数据，结果可能不同）。
- 场景：适用于对数据一致性要求不高，但需要避免脏读的场景。


#### REPEATABLE READ（可重复读）

- 特点：保证在同一个事务中，多次读取同一数据的结果是一致的。
- 问题：避免了脏读和不可重复读，但可能出现幻读（插入或删除操作导致的结果不一致）。
- 场景：这是 MySQL 的默认事务隔离级别，适用于大多数场景。

#### SERIALIZABLE（可串行化）

- 特点：最高级别的隔离，事务串行执行，完全避免了脏读、不可重复读和幻读。
- 问题：性能最低，因为事务之间完全隔离，可能会导致大量的锁竞争。
- 场景：适用于对数据一致性要求极高，且并发量不大的场景。


### 如何设置合理级别

在 MySQL 中，可以通过以下命令设置事务隔离级别：

```sql
SET SESSION TRANSACTION ISOLATION LEVEL [隔离级别];
```

例如：

```sql
SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ;
```

也可以设置全局的默认隔离级别：

```sql
SET GLOBAL TRANSACTION ISOLATION LEVEL [隔离级别];
```

默认情况下，MySQL 使用的是 REPEATABLE READ 级别。



