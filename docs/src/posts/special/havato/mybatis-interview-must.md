---
# 这是侧边栏索引
index: true
# 这是页面的图标
icon: page
# 这是文章的标题
title: 10道不得不会的 MyBatis 面试题
# 设置作者
author: Wang Shiyu
# 设置写作时间
date: 2022-06-23
# 一个页面可以有多个分类
category:
  - 最少必要面试题
# 一个页面可以有多个标签
tag:
  - mybatis
  - 面试题

---

MyBatis

<!-- more -->

10道不得不会的 MyBatis 面试题

我是JavaPub，专注于面试、副业，技术人的成长记录。

以下是 MyBatis 面试题，相信大家都会有种及眼熟又陌生的感觉、看过可能在短暂的面试后又马上忘记了。**JavaPub**在这里整理这些容易忘记的重点知识及**解答**，`建议收藏，经常温习查阅`。

评论区见

@[toc]

# MyBatis

本系列[《最少必要面试题》](https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzUzNDUyOTY0Nw==&action=getalbum&album_id=2344061143381508097#wechat_redirect)

### 1. 什么是MyBatis

> 这个问题主要是对比JDBC来看

1. MyBatis是一个ORM（对象关系映射）框架，它内部封装了JDBC,开发时只需要关注SQL语句本身，不需要花费精力去处理加载驱动，创建连接，创建statement等复杂的过程。开发人员不需要编写原生态sql，可以严格控制sql执行性能，灵活度高。

2. MyBatis可以使用xml或者注解来配置映射原生信息，将POJO映射成数据库中的记录，避免了几乎所有的JDBC代码和手动设置的参数以及获取结果集。


### 2. MyBatis的优点

1. 基于SQL语句编程，相对灵活（相对于hibernate），支持写动态sql语句并可重复使用。

2. 减少代码量，消除了冗余代码。（类似于JDBC的封装）

3. 与Spring完美集成。

4. 提供映射标签支持字段关系映射。


### 3. #{}和${}的区别是什么？

1. `#{}`预编译处理、是占位符，`${}`是字符串替换、是拼接符。

2. 使用`#{}`可以有效的防止sql注入，提高系统的安全性。

Mybatis在处理 `#{}` 的时候会将sql中的 `#{}` 替换成？号，调用PreparedStatement来赋值

```SQL
/* SQL */
如：select * from user where name = #{userName}；设userName=javapub

看日志我们可以看到解析时将#{userName}替换成了 ？

select * from user where name = ?;

然后再把 javapub 放进去，外面加上单引号
```

Mybatis在处理 `${}` 的时候就是把 `${}` 替换成变量的值，调用Statement来赋值

```SQL
/* SQL */
如：select * from user where name = #{userName}；设userName=javapub

看日志可以发现就是直接把值拼接上去了

select * from user where name = javapub;

这极有可能发生sql注入，下面举了一个简单的sql注入案例
```

### 4. 一个 Xml 映射文件，都会写一个 Dao 接口与之对应，这个 Dao 接口的工作原理是什么?

Dao 接口就是人们常说的 Mapper 接口，接口的全限名，就是映射文件中的 namespace 的值，接口的方法名就是映射文件中 **MappedStatement** 的 id 值，接口方法内的参数就是传递给 sql 的参数。

接口里的方法是**不能重载**的，因为是**全限名+方法名**的保存和寻找策略。

Dao接口的工作原理是JDK动态代理，Mybatis运行时会**使用JDK动态代理为Dao接口生成代理proxy对象，代理对象proxy会拦截接口方法，转而执行接口方法所对应的MappedStatement所代表的sql**，然后将sql执行结果返回。

MappedStatement：MappedStatement维护了一条 <select|update|delete|insert>节点的封装,包括了传入参数映射配置、执行的SQL语句、结果映射配置等信息。

```xml
<select id="selectAuthorLinkedHashMap" resultType="java.util.LinkedHashMap">
        select id, username from author where id = #{value}
</select>
```

### 5. 如何获取自动生成的(主)键值?

**用法：**

在 `<insert />` 标签中添加 `useGeneratedKeys="true"` 等属性

```xml
<insert id="insert" useGeneratedKeys="true" keyProperty="id" keyColumn="id"
        parameterType="person" >
    INSERT INTO person(name, pswd)
    VALUE (#{name}, #{pswd})
</insert>
```

当 Mybatis 解析 xml节点时，读到 `insert` 有配置时，会判断是否 有配置 `useGeneratedKeys`，如果有则会使用 `Jdbc3KeyGenerator` 作为sql回显，否则会以 `NoKeyGenerator` 作为主键回显。

底层封装了JDBC获取自增主键，即当使用 prepareStatement 或者 Statement时候，可以通过 `getGeneratedKeys` 获取这条插入语句的自增而成的主键。例子

```java
    Connection conn = DriverManager.getConnection(url, "root", "123456");
    String[] columnNames = {"id", "name"};
    PreparedStatement stmt = conn.prepareStatement(sql, columnNames);
    stmt.setString(1, "jack wang");
    stmt.executeUpdate();
    ResultSet rs = stmt.getGeneratedKeys();
    int id = 0;
    if (rs.next()) {
        id = rs.getInt(1);
        System.out.println("----------" + id);
    }
```

### 6. Mybatis 动态 sql 有什么用？有哪些动态 sql？执行原理？

Mybatis 动态 sql 可以让我们在 Xml 映射文件内，以标签的形式编写动态 sql，完成逻辑判断和动态拼接 sql 的功能。

Mybatis 提供了9种动态sql标签： **trim | where | set | foreach | if | choose | when | otherwise | bind**。

其执行原理为，使用 OGNL 从 sql 参数对象中计算表达式的值，根据表达式的值动态拼接 sql，以此来完成动态 sql 的功能。

是不是有点懵，继续阅读：

**科普：**

OGNL 是 Object-Graph Navigation Language 的缩写，对象图导航语言。例如 `#{}` 语法。

OGNL 作用是在对象和视图之间做数据的交互，可以存取对象的属性和调用对象的方法，通过表达式可以迭代出整个对象的结构图。

参考一个很形象的例子。

有一个学生对象 student，属性分别有 id = 10，name = '小明' 和 课程对象 course，其中 course 对象中属性有：分数 score = 88，排名 rank = 5。

对象关系图如下：

```xml
student

    id：10

    name：小明

    course：

        score：88

        rank：5
```

当上下文（环境）中的对象为 student 的时候，也就是在 Mybatis 中查询时传入的参数对象为 student 的时候：

通过 OGNL 表达式直接获取上下文中对象的属性值，比如：

#{id} —> 10，相对于当前上下文对象.getId()，即 student.getId() 。

#{name} —> 小明。

#{course.score} —> 88，相当于 student.getCourse().getScore()。

所以，通过 OGNL 表达式，可以迭代出整个对象的结构图。

发布 [《最少必要面试题》](https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzUzNDUyOTY0Nw==&action=getalbum&album_id=2344061143381508097#wechat_redirect)

### 7. 什么是Mybatis的一级、二级缓存?


**一级缓存**: 基于 PerpetualCache 的 HashMap 本地缓存，其存储作用域为 Session，当 Session flush 或 close 之后，该 Session 中的所有 Cache 就将清空，默认一级缓存是开启的。

当Mybaits与Spring整合的时候，不带Spring事务的方法内，每次请求数据库，都会新建一个SqlSession，这时候是使用不到一级缓存的。除了事务问题，还有调用了Sqlsession的修改、添加、删除、commit()、close()等方法时，一级缓存也会被清空。

**二级缓存**与一级缓存其机制相同，默认也是采用 PerpetualCache，HashMap 存储，不同在于其存储作用域为 Mapper(Namespace)。即使开启了二级缓存，不同的sqlsession之间的缓存数据也不是想互访就能互访的，必须等到sqlsession关闭了以后，才会把其一级缓存中的数据写入二级缓存。默认不打开二级缓存。

现在大多数应用都是支持分布式的，一般情况都是用中间件作为缓存层，比如redis。开启 MyBatis 的二级缓存也会多一步序列化和反序列化，影响服务性能。

### 8. MyBatis的工作原理

一图胜千文


![来源网络](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202405271040265.png)

1. 读取 MyBatis 配置文件：mybatis-config.xml 为 MyBatis 的全局配置文件，配置了 MyBatis 的运行环境等信息，例如数据库连接信息。

2. 加载映射文件。映射文件即 SQL 映射文件，该文件中配置了操作数据库的 SQL 语句，需要在 MyBatis 配置文件 mybatis-config.xml 中加载。mybatis-config.xml 文件可以加载多个映射文件，每个文件对应数据库中的一张表。

3. 构造会话工厂：通过 MyBatis 的环境等配置信息构建会话工厂 SqlSessionFactory。

4. 创建会话对象：由会话工厂创建 SqlSession 对象，该对象中包含了执行 SQL 语句的所有方法。

5. Executor 执行器：MyBatis 底层定义了一个 Executor 接口来操作数据库，它将根据 SqlSession 传递的参数动态地生成需要执行的 SQL 语句，同时负责查询缓存的维护。

6. MappedStatement 对象：在 Executor 接口的执行方法中有一个 MappedStatement 类型的参数，该参数是对映射信息的封装，用于存储要映射的 SQL 语句的 id、参数等信息。

7. 输入参数映射：输入参数类型可以是 Map、List 等集合类型，也可以是基本数据类型和 POJO 类型。输入参数映射过程类似于 JDBC 对 preparedStatement 对象设置参数的过程。

8. 输出结果映射：输出结果类型可以是 Map、 List 等集合类型，也可以是基本数据类型和 POJO 类型。输出结果映射过程类似于 JDBC 对结果集的解析过程。

### 9. 什么是MyBatis的接口绑定？有哪些实现方式？

接口绑定，就是在 MyBatis 中任意定义接口，然后把接口里面的方法和SQL语句绑定，我们直接调用接口方法就可以，这样比起原来的SqlSession提供的方法我们可以有更加灵活的选择和设置。

接口绑定有两种实现方式：

- 通过**注解绑定**，就是在接口的方法上面加上 @Select、@Update 等注解，里面包含Sql语句来绑定；

- 通过**xml**里面写SQL来绑定， 在这种情况下，要指定xml映射文件里面的 namespace 必须为接口的全路径名。当Sql语句比较简单时候，用注解绑定， 当SQL语句比较复杂时候，用xml绑定，一般用xml绑定的比较多。

### 10. Mybatis的分页原理

Mybatis 使用 RowBounds 对象进行分页，它是针对ResultSet结果集执行的内存分页，而非物理分页，所以一般不会使用。可以在sql内直接书写带有物理分页的参数来完成物理分页功能，也可以使用分页插件来完成物理分页。

分页插件的原理就是使用 MyBatis 提供的插件接口，实现自定义插件，在插件的拦截方法内，拦截待执行的SQL，然后根据设置的 dialect（方言），和设置的分页参数，重写SQL ，生成带有分页语句的SQL，执行重写后的SQL，从而实现分页。

举例：`select * from student`，拦截sql后重写为：`select t.* from （select * from student）t limit 0，10`。




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




