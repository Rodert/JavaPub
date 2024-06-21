---
title: 慢查询优化方案-SQL篇
icon: file
author: Ms.Wang
date: 2024-06-12
sticky: true
star: false
category:
  - mysql
tag:
  - mysql
  - 慢SQL
---

> 慢sql优化23式

`阅读大约6分钟，2021 0411 22:29 写于家中床边`

由于前期的快速开发、敏捷版本迭代，接口响应速度是每一个系统发展到中后期都会面临的一个问题。本系列从实战出发手把手一起对接口响应慢问题做优化。

```bash
对于慢查询我们一般通过如下思路解决：
1. explain sql 分析慢SQL
2. 利用缓存
3. 读写分离和分库分表
4. 评论区补充，待续...
```



本篇是系列文章（以 MySQL 为例），从多个角度分析、解决慢查询，如意犹未尽：**【JavaPub】**

![](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202406041542434.png)

为了提高查询效率，当数据库表加完索引后还不不能满足性能需求，第二步，SQL 语句优化。

系统前期开发阶段，为了快速开发，SQL 语句都是以实现功能为主，性能上可能没怎么在意。本篇主要讲述几个在`实战中`注意优化的性能点供大家参考。

---

文章结构由简到难，以目录为结论，下文做详细讲解。

**目录：**

[toc]

### 1. 应尽量避免在 where 子句中对字段进行 null 值判断，否则将导致引擎放弃使用索引而进行全表扫描，如：

> select id from t where num is null	

可以在 num 上设置默认值 0，确保表中 num 列没有 null 值，然后这样查询：	

> select id from t where num=0

其实这条说的过于绝对，但是我们还是建议尽量避免使用字段为 NULL。在 MySQL 的个别引擎中是支持的，翻阅官方文档。如果使用的是 `MyISAM`、`InnoDB` 或 `MEMORY` 存储引擎，则可以在具有 NULL 值的列上添加索引。 否则，您必须声明一个索引列 NOT NULL，并且您不能在该列中插入 NULL。

> You can add an index on a column that can have NULL values if you are using the MyISAM, InnoDB, or MEMORY storage engine. Otherwise, you must declare an indexed column NOT NULL, and you cannot insert NULL into the column.

NULL对于SQL的新手来说，值 的概念是一个常见的混淆源，他们经常认为这 NULL与空字符串是同一回事 '。但是第一个语句将插入一个 NULL值，第二个语句将 插入一个空字符串。第一个的含义可以视为 “未知电话号码”，第二个的含义可以视为“已知该人没有电话，因此也没有电话号码”。

参考官网阅读（Mysql null 值问题）：https://dev.mysql.com/doc/refman/5.7/en/problems-with-null.html

---

### 2. 应尽量避免在 where 子句中使用!=或<>操作符，否则将引擎放弃使用索引而进行全表扫描。

这里是否放弃使用索引取决于 MySQL 优化器。

Note：例如 `or 、in | not in 、is null | is not null、!=、<>`，使用时并不是完全不走索引，要考虑到：

1. 全表扫描是否比索引更快，以至于优化器选择全表扫描；
2. mysql  的版本;
3. 可以通过优化语法或者配置优化器。

参考：
https://dev.mysql.com/doc/refman/5.6/en/statement-optimization.html
https://dev.mysql.com/doc/refman/5.6/en/optimization-indexes.html
https://dev.mysql.com/doc/refman/5.6/en/select-optimization.html

---


![](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202406041543268.png)

### 3. 应尽量避免在 where 子句中使用 or 来连接条件，否则将导致引擎放弃使用索引而进行全表扫描，如：

```sql
select id from t where num=10 or num=20
```

可以这样查询：

```sql
select id from t where num=10	
union all	
select id from t where num=20	
```

避免使用不代表一定不使用，很多时候还取决于 MySql 引擎对查询的优化。参考前一篇：JavaPub【慢查询优化方案-索引篇【JavaPub版】】

---


### 4. in 和 not in 也要慎用，否则会导致全表扫描，如：	

```sql
select id from t where num in(1,2,3)
```

对于连续的数值，能用 `between` 就不要用 `in` 了：	

```sql
select id from t where num between 1 and 3	
```

---


### 5. 下面的查询也将导致全表扫描：	

```sql
select id from t where name like '%abc%';
```

例如，`SELECT id FROM t WHERE name LIKE 'abc%';` 这个查询将使用索引。

---


### 6. 应尽量避免在 where 子句中对字段进行表达式操作，这将导致引擎放弃使用索引而进行全表扫描。如：	

```sql
select id from t where num/2=100
```
应改为:
```sql
select id from t where num=100*2
```

---


### 7. 应尽量避免在where子句中对字段进行函数操作，这将导致引擎放弃使用索引而进行全表扫描。如：	


```sql
select id from t where substring(name,1,3)='abc'; //name以abc开头的id
```
应改为:

```sql
select id from t where name like 'abc%';
```

---


### 8. 不要在 where 子句中的“=”左边进行函数、算术运算或其他表达式运算，否则系统将可能无法正确使用索引。

---


### 9. 在使用索引字段作为条件时，如果该索引是复合索引，那么必须使用到该索引中的第一个字段作为条件时才能保证系统使用该索引，否则该索引将不会被使用，并且应尽可能的让字段顺序与索引顺序相一致。

---


### 10. 很多时候用 exists 代替 in 是一个好的选择：	

```sql
select num from a where num in(select num from b)
```

用下面的语句替换：

```sql
select num from a where exists(select 1 from b where num=a.num)
```

`in` 和 `not in` 不会命中索引

---


### 11. 并不是所有索引对查询都有效，SQL 是根据表中数据来进行查询优化的，当索引列有大量数据重复时，SQL 查询可能不会去利用索引。

如一表中有字段 sex，male、female 几乎各一半，那么即使在 sex 上建了索引也对查询效率起不了作用。

这就是我们 Boolean（一般用 tinyint ） 型字段上使用索引会不会用到的问题。

---


### 12. 索引并不是越多越好，索引固然可以提高相应的 select 的效率，但同时也降低了 insert 及 update 的效率，	

因为 insert 或 update 时有可能会重建索引，所以怎样建索引需要慎重考虑，视具体情况而定。	
一个表的索引数最好不要超过6个，若太多则应考虑一些不常使用到的列上建的索引是否有必要。

这些原则都是原则上建议，要视情况而定。

---


### 13. 尽量使用数字型字段，若只含数值信息的字段尽量不要设计为字符型，这会降低查询和连接的性能，并会增加存储开销。

这是因为引擎在处理查询和连接时会逐个比较字符串中每一个字符，而对于数字型而言只需要比较一次就够了。

---


### 14. 尽可能的使用 varchar 代替 char ，因为首先变长字段存储空间小，可以节省存储空间，其次对于查询来说，在一个相对较小的字段内搜索效率显然要高些。

---


### 15. 任何地方都不要使用 select * from t ，用具体的字段列表代替 “*”，不要返回用不到的任何字段。

这个是大多数系统的通病，但是。

---

![](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202406041544650.png)

### 16. 避免频繁创建和删除临时表，以减少系统表资源的消耗。

这条在大多数业务场景不会使用到。

临时表并不是不可使用，适当地使用它们可以使某些例程更有效，例如，当需要重复引用大型表或常用表中的某个数据集时。但是，对于一次性事件，最好使用导出表。	

在使用时要注意 `drop table` 、` truncate table`、`delete table` 区别。

---


### 17. 在新建临时表时，如果一次性插入数据量很大，那么可以使用 select into 代替 create table，避免造成大量 log ，以提高速度；如果数据量不大，为了缓和系统表的资源，应先create table，然后insert。

```sql
#MYSQL不支持: 
Select * Into new_table_name from old_table_name; 这是sql server中的用法
#替代方法: 
Create table new_table_name (Select * from old_table_name);
```

---


### 18. 如果使用到了临时表，在存储过程的最后务必将所有的临时表显式删除，先 truncate table ，然后 drop table ，这样可以避免系统表的较长时间锁定。

---


### 19. 尽量避免使用游标，因为游标的效率较差，如果游标操作的数据超过1万行，那么就应该考虑改写。

---


### 20. 使用基于游标的方法或临时表方法之前，应先寻找基于集的解决方案来解决问题，基于集的方法通常更有效。

---


### 21. 与临时表一样，游标并不是不可使用。对小型数据集使用 FAST_FORWARD 游标通常要优于其他逐行处理方法，尤其是在必须引用几个表才能获得所需的数据时。

在结果集中包括 “合计” 的例程通常要比使用游标执行的速度快。如果开发时间允许，基于游标的方法和基于结果集的方法都可以尝试一下，看哪一种方法的效果更好。

---


### 22. 尽量避免大事务操作，提高系统并发能力。

---


### 23. 尽量避免向客户端返回大数据量，若数据量过大，应该考虑相应需求是否合理。

参考：
https://dev.mysql.com/doc/refman/5.7/en/is-null-optimization.html



![](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202406041544910.png)

