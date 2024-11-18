---
title: SpringBoot整合MyBatis-Plus
icon: line
category:
  - 项目实战
  - 《用户中心》
tag:
  - 项目实战
  - 用户管理系统
  - springboot
  - mybatis-plus
---



> SpringBoot如何整合MyBatis-plus
> MyBatis-plus这么好用，不允许还有人不会


## 《用户中心》

[介绍文档](https://kazjsfecs3y.feishu.cn/wiki/QJDwwM5bbi2nT9k6laycWm4ynad)

你好呀，我是 javapub.

做 Java 的同学都会用到的三件套，Spring、SpringMV、MyBatis。但是由于使用起来配置较多，依赖冲突频发。所有，各路大佬又在这上边做了包装，像我们常用的 SpringBoot、MyBatisPlus。

基于当前要开发的是一个用户中心系统，查询逻辑比较简单，这里选用 MyBatis-Plus 就够用。但是很多同学还没用过这个工具，今天带你使用一下。省下时间来摸鱼啊。

### 环境

- JDK17
- SpringBoot3.*


**初始化项目**

初始化一个 SpringBoot 项目，不需要添加 MyBatis 依赖。

![image-](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202407011541392.png)


**添加依赖**

在 `mvnrepository` 获取需要的 MyBatis-Plus 版本。这里以 MySQL 为例。

```xml
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>com.baomidou</groupId>
            <artifactId>mybatis-plus-spring-boot3-starter</artifactId>
            <version>3.5.7</version>
        </dependency>
```


**SpringBoot数据库信息配置**

`application.yml`

```yml
# 应用服务 WEB 访问端口
server:
  port: 8080

# DataSource Config
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://rm-t4njraxo75r1e4jlevo.mysql.singapore.rds.aliyuncs.com:3306/javapub_test?characterEncoding=utf8&serverTimezone=Asia/Shanghai&allowPublicKeyRetrieval=true&useSSL=false
    username: javapub_admin
    password: JavaPub666
  sql:
    init:
      schema-locations:

mybatis-plus:
  mapper-locations: classpath:mapper/*.xml
  type-aliases-package: cn.net.javapub.entity
  configuration:
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl # 这个配置会将执行的sql打印出来
```

> 如果你没有数据库，可以来 javapub，给你提供一个免费的实例。


**SQL语句**

提供一个 SQL，用来做测试。

`user.sql`

```sql
create table user
(
    id    bigint      not null comment '主键ID'
        primary key,
    name  varchar(30) null comment '姓名',
    age   int         null comment '年龄',
    email varchar(50) null comment '邮箱'
);

INSERT INTO javapub_test.user (id, name, age, email) VALUES (1, '张子涵', 18, 'test1@javapub.net.cn');
INSERT INTO javapub_test.user (id, name, age, email) VALUES (2, '张子恒', 20, 'test2@javapub.net.cn');
INSERT INTO javapub_test.user (id, name, age, email) VALUES (3, '李子璇', 28, 'test3@javapub.net.cn');
INSERT INTO javapub_test.user (id, name, age, email) VALUES (4, '王梓旭', 21, 'test4@javapub.net.cn');
INSERT INTO javapub_test.user (id, name, age, email) VALUES (5, '曹欣然', 24, 'test5@javapub.net.cn');
```

**代码逆向生成工具**

推荐一个 IDE 插件，免费、简洁、好用。MyBatis-X

它可以帮我快速的生成 service、mapper、entity、xml 层，减少重复工作。

![image-](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202407011638313.png)


**演示**

至此，就可以使用 MyBatis-Plus 了。在 test 文件下执行测试案例。

![image-](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202407011642204.png)


**其他用例**

从这个方法点进来可以看到 MyBatis-plus 源码，它已经帮我们把大多数的常用工具都做好了，只需要实现这个 service 和 mapper 类即可。

![image-](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202407011645594.png)



源码： https://github.com/Rodert/SpringBoot-javapub/


原文地址： 

[https://javapub.net.cn/star/project/user-center/](https://javapub.net.cn/star/project/user-center/)




