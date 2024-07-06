---
title: MyBatisSQL批量更新（代码➕案例）
icon: lightbulb
author: Wang Shiyu
category:
  - MyBatis
  - java
sticky: false
star: false
---





一条记录update一次，性能比较差，容易造成阻塞。基于 mybatis 批量更新，特此记录。



[toc]

## 1.场景

当我们在做更新或者是插入操作时，数据为多对多、一一对应的情况

例如：

```bash
编号。  名字。  状态
1  tom    0
2  jerry   0
3  jeck   1
```

代码中循环写入、更新这是大多数人做法，但是肯定不是最优解

## 2.MyBatis XML
- 先直接上个终极版

> 这里数据库中存储了下划线式，代码中用驼峰式。

这里是通过userId修改userStatus。当user_id为1时、user_status为0，当user_id为3时、user_status为1。

```xml
    <update id="updateBatch">
    
        update
        <include refid="tableName"/>
        <trim prefix="set" suffixOverrides=",">
            <trim prefix="user_status =case" suffix="end,">
                <foreach collection="list" item="i" index="index">
                    <if test="i.userId!=null">
                        when user_id=#{i.userId} then #{i.userStatus}
                    </if>
                </foreach>
            </trim>
        </trim>
        where user_id in
        <foreach collection="list" item="i" index="index" open="(" separator="," close=")">
            #{i.userId}
        </foreach>

    </update>
```

**<trim** 属性说明 
1. prefix,suffix  表示在 trim 标签包裹的部分的前面或者后面添加内容 
2. 如果同时有 prefixOverrides,suffixOverrides  表示会用 prefix,suffix 覆盖 Overrides 中的内容。 
3. 如果只有 prefixOverrides,suffixOverrides  表示删除开头的或结尾的 xxxOverides 指定的内容。



### 2.1.打印sql

```bash
==>  Preparing: update `table_test_01` set user_status =case when user_id=? then ? when user_id=? then ? end where user_id in ( ? , ? )
==> Parameters: 1(Long), 10(Integer), 2(Long), 20(Integer), 1(Long), 2(Long)
<==    Updates: 2
```

### 2.2.数据库结构

**SQL**结构体：

```sql
CREATE TABLE `table_test_01`
(
    `id`          int(11) NOT NULL AUTO_INCREMENT,
    `name`        varchar(20) NOT NULL,
    `status`      tinyint(4) NOT NULL DEFAULT '0',
    `test_column` varchar(32) NOT NULL DEFAULT '' COMMENT '测试字段',
    `user_id`     bigint(20) NOT NULL DEFAULT '0' COMMENT '测试字段id',
    `user_status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '测试字段status',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
```

```sql
INSERT INTO `table_test_01`
VALUES (1, 'tom', 0, '', 1, 10),
       (2, 'jetty', 0, '', 2, 20),
       (3, 'dog', 0, '', 3, 1),
       (4, 'cat', 0, '', 4, 1);
```

## 3.实例二
- 多个字段更新，那就增加 `<item` 。

使用 case when 语法。

```sql
UPDATE course
    SET name = CASE id 
        WHEN 1 THEN 'name1'
        WHEN 2 THEN 'name2'
        WHEN 3 THEN 'name3'
    END, 
    title = CASE id 
        WHEN 1 THEN 'New Title 1'
        WHEN 2 THEN 'New Title 2'
        WHEN 3 THEN 'New Title 3'
    END
WHERE id IN (1,2,3)
```

这条sql的意思是，如果id为1，则name的值为name1，title的值为New Title1；依此类推。

```xml
    <update id="updateBatch1" parameterType="list">

        update course
        <trim prefix="set" suffixOverrides=",">
            <trim prefix="name=case" suffix="end,">
                <foreach collection="list" item="item" index="index">
                    <if test="item.name!=null">
                        when id=#{item.id} then #{item.name}
                    </if>
                </foreach>
            </trim>
            <trim prefix="title =case" suffix="end,">
                <foreach collection="list" item="item" index="index">
                    <if test="item.title!=null">
                        when id=#{item.id} then #{item.title}
                    </if>
                </foreach>
            </trim>
        </trim>
        where
        <foreach collection="list" separator="or" item="item" index="index">
            id=#{item.id}
        </foreach>
    </update>
```





## 4.重点

但是大家要注意一点，这种情况如果出错，我们并不知道是哪条错误，如果使用事务，就会全部回滚，好的办法就是一次批量一部分，分担出错概率。



源码案例下载：https://download.csdn.net/download/qq_40374604/19765415



