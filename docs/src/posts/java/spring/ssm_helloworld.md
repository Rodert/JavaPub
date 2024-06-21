---
title: 手把手整合SSM框架
icon: lightbulb
author: Wang Shiyu
category:
  - SSM
  - Spring
sticky: false
star: false
---





# 前言

> 如果看过前几篇文章，对 `Spring` 和 `MyBatis` 有了一定了解，一定想上手试试。这篇文章从 0 到 1，手把手整合 `SSM` (Spring、Spring MVC、MyBatis)。


> 本篇是代码篇，在 PC 端浏览更佳，源码在文末

[toc]

# 搭建整合 SSM 之 HelloWorld

## 开发环境

- idea
- MySql5.x
- jdk8
- maven

> 对应的技术入门在 公众号 **历史文章** 都可以找到

## 目录


![](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202406211655787.png)


目录包括 main、resources、mapper、webapp，不一一介绍，不熟悉查看前面文章。

## 环境搭建

## 新建项目

这里使用的是 IDEA 编辑器，新建一个 Maven 工程，选择 web 项目。


![](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202406211655084.png)



## 导入依赖

使用 Maven 管理项目 jar ，只需要在 `pom.xml` 加如相关依赖即可。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>javapub.rodert.github</groupId>
    <artifactId>ssm_helloword_web</artifactId>
    <version>1.0-SNAPSHOT</version>
    <packaging>war</packaging>
    <url></url>
<!--    源码：https://github.com/Rodert/JavaPub-->

    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <spring.version>4.3.6.RELEASE</spring.version>
    </properties>

    <dependencies>
        <!-- 单元测试 -->
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.12</version>
        </dependency>

        <!-- 1.日志 -->
        <!-- 实现slf4j接口并整合 -->
        <dependency>
            <groupId>ch.qos.logback</groupId>
            <artifactId>logback-classic</artifactId>
            <version>1.1.1</version>
        </dependency>

        <!-- 2.数据库 -->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>5.1.37</version>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>c3p0</groupId>
            <artifactId>c3p0</artifactId>
            <version>0.9.1.2</version>
        </dependency>

        <!-- DAO: MyBatis -->
        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis</artifactId>
            <version>3.3.0</version>
        </dependency>
        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis-spring</artifactId>
            <version>1.2.3</version>
        </dependency>

        <!-- 3.Servlet web -->
        <dependency>
            <groupId>taglibs</groupId>
            <artifactId>standard</artifactId>
            <version>1.1.2</version>
        </dependency>
        <dependency>
            <groupId>jstl</groupId>
            <artifactId>jstl</artifactId>
            <version>1.2</version>
        </dependency>
        <dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-databind</artifactId>
            <version>2.5.4</version>
        </dependency>
        <dependency>
            <groupId>javax.servlet</groupId>
            <artifactId>javax.servlet-api</artifactId>
            <version>3.1.0</version>
        </dependency>

        <!-- 4.Spring -->
        <!-- 1)Spring核心 -->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-core</artifactId>
            <version>${spring.version}</version>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-beans</artifactId>
            <version>${spring.version}</version>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-context</artifactId>
            <version>${spring.version}</version>
        </dependency>
        <!-- 2)Spring DAO层 -->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-jdbc</artifactId>
            <version>${spring.version}</version>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-tx</artifactId>
            <version>${spring.version}</version>
        </dependency>
        <!-- 3)Spring web -->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-web</artifactId>
            <version>${spring.version}</version>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-webmvc</artifactId>
            <version>${spring.version}</version>
        </dependency>
        <!-- 4)Spring test -->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-test</artifactId>
            <version>${spring.version}</version>
        </dependency>

        <!-- redis客户端:Jedis -->
        <dependency>
            <groupId>redis.clients</groupId>
            <artifactId>jedis</artifactId>
            <version>2.7.3</version>
        </dependency>
        <dependency>
            <groupId>com.dyuproject.protostuff</groupId>
            <artifactId>protostuff-core</artifactId>
            <version>1.0.8</version>
        </dependency>
        <dependency>
            <groupId>com.dyuproject.protostuff</groupId>
            <artifactId>protostuff-runtime</artifactId>
            <version>1.0.8</version>
        </dependency>

        <!-- Map工具类 -->
        <dependency>
            <groupId>commons-collections</groupId>
            <artifactId>commons-collections</artifactId>
            <version>3.2</version>
        </dependency>

        <!--注解-->
        <!-- https://mvnrepository.com/artifact/org.projectlombok/lombok -->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <version>1.18.12</version>
            <scope>provided</scope>
        </dependency>
    </dependencies>


        <build>
            <finalName>ssm_helloword_web</finalName>
            <plugins>
                <plugin>
                    <groupId>org.apache.maven.plugins</groupId>
                    <artifactId>maven-compiler-plugin</artifactId>
                    <configuration>
                        <source>7</source>
                        <target>7</target>
                    </configuration>
                </plugin>
            </plugins>
        </build>

</project>
<!--    源码：https://github.com/Rodert/JavaPub-->
```

## 编码

## 配置文件
### spring-dao.xml

- 先在spring文件夹里新建spring-dao.xml文件，我们这里分三层，分别是dao service web。

1. 加载数据库配置
2. 配置数据库连接池
3. 配置 `SqlSessionFactory` 对象（MyBatis）
4. 配置扫描 dao 层接口，动态代理实现 Dao 实现类，执行 sql 写在 xml

```
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
	http://www.springframework.org/schema/beans/spring-beans.xsd
	http://www.springframework.org/schema/context
	http://www.springframework.org/schema/context/spring-context.xsd">
    <!-- 配置整合mybatis过程 -->
    <!-- 1.配置数据库相关参数properties的属性：${url} -->

    <context:property-placeholder location="classpath:jdbc.properties" />

    <!-- 2.数据库连接池 -->
    <bean id="dataSource" class="com.mchange.v2.c3p0.ComboPooledDataSource">
        <!-- 配置连接池属性 -->
        <property name="driverClass" value="${jdbc.driver}" />
        <property name="jdbcUrl" value="${jdbc.url}" />
        <property name="user" value="${jdbc.username}" />
        <property name="password" value="${jdbc.password}" />

        <!-- c3p0连接池的私有属性 -->
        <property name="maxPoolSize" value="30" />
        <property name="minPoolSize" value="10" />
        <!-- 关闭连接后不自动commit -->
        <property name="autoCommitOnClose" value="false" />
        <!-- 获取连接超时时间 -->
        <property name="checkoutTimeout" value="10000" />
        <!-- 当获取连接失败重试次数 -->
        <property name="acquireRetryAttempts" value="2" />
    </bean>

    <!-- 3.配置SqlSessionFactory对象 -->
    <bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
        <!-- 注入数据库连接池 -->
        <property name="dataSource" ref="dataSource" />
        <!-- 配置MyBaties全局配置文件:mybatis-config.xml -->
        <property name="configLocation" value="classpath:Mybatis-config.xml" />
        <!-- 扫描entity包 使用别名 -->
        <property name="typeAliasesPackage" value="javapub.rodert.github.entity" />
        <!-- 扫描sql配置文件:mapper需要的xml文件 -->
        <property name="mapperLocations" value="classpath:mapper/*.xml" />
    </bean>

    <!-- 4.配置扫描Dao接口包，动态实现Dao接口，注入到spring容器中 -->
    <bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
        <!-- 注入sqlSessionFactory -->
        <property name="sqlSessionFactoryBeanName" value="sqlSessionFactory" />
        <!-- 给出需要扫描Dao接口包 -->
        <property name="basePackage" value="javapub.rodert.github.dao" />
    </bean>
</beans>
```

### jdbc.properties

数据库配置，在 `resources` 文件夹里新建一个 `jdbc.properties` 文件，注意自己的密码。

```properties
jdbc.driver=com.mysql.jdbc.Driver
jdbc.url=jdbc:mysql://localhost:3306/ssm1?useUnicode=true&characterEncoding=utf8
jdbc.username=root
jdbc.password=
```

### mybatis-config.xml

`MyBatis` 核心文件，在recources文件夹里新建mybatis-config.xml文件。

1. 使用自增主键
2. 使用列别名
3. 开启驼峰命名转换 create_time -> createTime

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <!-- 配置全局属性 -->
    <settings>
        <!-- 使用jdbc的getGeneratedKeys获取数据库自增主键值 -->
        <setting name="useGeneratedKeys" value="true" />

        <!-- 使用列别名替换列名 默认:true -->
        <setting name="useColumnLabel" value="true" />

        <!-- 开启驼峰命名转换:Table{create_time} -> Entity{createTime} -->
        <setting name="mapUnderscoreToCamelCase" value="true" />
    </settings>
</configuration>
```

### spring-service.xml

在 spring 文件夹里新建 `spring-service.xml` 文件。

1. 扫描 service 包所有注解 @Service
2. 配置事务管理器，把事务管理交由 spring 来完成
3. 基于注解的 声明式事务，可以直接在方法上 `@Transaction`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:tx="http://www.springframework.org/schema/tx"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
	http://www.springframework.org/schema/beans/spring-beans.xsd
	http://www.springframework.org/schema/context
	http://www.springframework.org/schema/context/spring-context.xsd
	http://www.springframework.org/schema/tx
	http://www.springframework.org/schema/tx/spring-tx.xsd">
    <!-- 扫描service包下所有使用注解的类型 -->
    <context:component-scan base-package="javapub.rodert.github.service" />

    <!-- 配置事务管理器 -->
    <bean id="transactionManager"
          class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
        <!-- 注入数据库连接池 -->
        <property name="dataSource" ref="dataSource" />
    </bean>

    <!-- 配置基于注解的声明式事务 -->
    <tx:annotation-driven transaction-manager="transactionManager" />
</beans>
```

### spring-web.xml

web 层，在 spring 文件夹里新建 `spring-web.xml` 文件。

1. 开启SpringMVC注解模式，可以使用@RequestMapping，@PathVariable，@ResponseBody等
2. 对静态资源处理，如js，css，jpg等
3. 配置jsp 显示ViewResolver，及渲染后的 JSP
4. 扫描web层 @Controller

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:mvc="http://www.springframework.org/schema/mvc"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
	http://www.springframework.org/schema/beans/spring-beans.xsd
	http://www.springframework.org/schema/context
	http://www.springframework.org/schema/context/spring-context.xsd
	http://www.springframework.org/schema/mvc
	http://www.springframework.org/schema/mvc/spring-mvc-3.0.xsd">
    <!-- 配置SpringMVC -->
    <!-- 1.开启SpringMVC注解模式 -->
    <!-- 简化配置：
        (1)自动注册DefaultAnootationHandlerMapping,AnotationMethodHandlerAdapter
        (2)提供一些列：数据绑定，数字和日期的format @NumberFormat, @DateTimeFormat, xml,json默认读写支持
    -->
    <mvc:annotation-driven />

    <!-- 2.静态资源默认servlet配置
        (1)加入对静态资源的处理：js,gif,png
        (2)允许使用"/"做整体映射
     -->
    <mvc:default-servlet-handler/>

    <!-- 3.配置jsp 显示ViewResolver -->
    <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
        <property name="viewClass" value="org.springframework.web.servlet.view.JstlView" />
<!--        <property name="contentType" value="text/html"/>-->
        <property name="prefix" value="/WEB-INF/jsp/" />
        <property name="suffix" value=".jsp" />
    </bean>

    <!-- 4.扫描web相关的bean -->
    <context:component-scan base-package="javapub.rodert.github.web" />
</beans>
```

### web.xml

修改 `web.xml` 文件了，它在 webapp 的 WEB-INF 下。也可以在这里配置过滤器、监听器等。

```xml
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee
                      http://xmlns.jcp.org/xml/ns/javaee/web-app_3_1.xsd"
         version="3.1" metadata-complete="true">
  <!-- 如果是用mvn命令生成的xml，需要修改servlet版本为3.1 -->
  <!-- 配置DispatcherServlet -->
  <servlet>
    <servlet-name>dispatcherServlet</servlet-name>
    <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
    <!-- 配置springMVC需要加载的配置文件
        spring-dao.xml,spring-service.xml,spring-web.xml
        Mybatis - > spring -> springmvc
     -->
    <init-param>
      <param-name>contextConfigLocation</param-name>
      <param-value>classpath:spring/spring-*.xml</param-value>
    </init-param>
    <load-on-startup>1</load-on-startup>
  </servlet>
  <servlet-mapping>
    <servlet-name>dispatcherServlet</servlet-name>
    <!-- 默认匹配所有的请求 -->
    <url-pattern>/</url-pattern>
  </servlet-mapping>

  <welcome-file-list>
    <welcome-file>index.jsp</welcome-file>
  </welcome-file-list>
</web-app>
```

### 日志

配置一些简单的日志，使用 `logback`  ，在 `resources` 文件夹里新建`logback.xml` 文件。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration debug="true">
    <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
        <!-- encoders are by default assigned the type ch.qos.logback.classic.encoder.PatternLayoutEncoder -->
        <encoder>
            <pattern>%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n</pattern>
        </encoder>
    </appender>

    <root level="debug">
        <appender-ref ref="STDOUT" />
    </root>
</configuration>
```

### 配置说明

以上配置是整合 `SSM` 的基础配置，目录结构如图所示：




![](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202406211655969.png)


---

## SSM实例-图书管理系统

### sql

> 以上部分整个 SSM 框架就已经搭建好了，下面是一个 Demo ，供参考。

新建俩张表，图书表 `book` 和 预约图书表 `appointment`，并初始化数据。

```sql
/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50716
Source Host           : localhost:3306
Source Database       : ssm1

Target Server Type    : MYSQL
Target Server Version : 50716
File Encoding         : 65001

Date: 2020-07-12 16:50:43
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for appointment
-- ----------------------------
DROP TABLE IF EXISTS `appointment`;
CREATE TABLE `appointment` (
  `book_id` bigint(20) NOT NULL COMMENT '图书ID',
  `student_id` bigint(20) NOT NULL COMMENT '学号',
  `appoint_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '预约时间',
  PRIMARY KEY (`book_id`,`student_id`),
  KEY `idx_appoint_time` (`appoint_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='预约图书表';

-- ----------------------------
-- Records of appointment
-- ----------------------------

-- ----------------------------
-- Table structure for book
-- ----------------------------
DROP TABLE IF EXISTS `book`;
CREATE TABLE `book` (
  `book_id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '图书ID',
  `name` varchar(100) NOT NULL COMMENT '图书名称',
  `number` int(11) NOT NULL COMMENT '馆藏数量',
  PRIMARY KEY (`book_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1004 DEFAULT CHARSET=utf8 COMMENT='图书表';

-- ----------------------------
-- Records of book
-- ----------------------------
INSERT INTO `book` VALUES ('2000', 'Java程序设计', '20');
INSERT INTO `book` VALUES ('2001', '数据结构', '7');
INSERT INTO `book` VALUES ('2002', '设计模式', '20');
INSERT INTO `book` VALUES ('2003', '编译原理', '20');
```

### 实体

在 `entity` 包下新建实体 `Book` 和 `Appointment`

- Book.java

```java
package javapub.rodert.github.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * @author wangshiyu rodert
 * @date 2020/7/6 20:58
 * @description
 *
 * @Data 注解，简化代码，自动添加get set toSting 方法
 * @Getter
 * @Setter
 * @ToString
 */
@Getter
@Setter
@ToString
public class Book {

    private long bookId;// 图书ID

    private String name;// 图书名称

    private int number;// 馆藏数量

    // 省略构造方法，getter和setter方法，toString方法

}
```

- Appointment.java

```java
package javapub.rodert.github.entity;

/**
 * @author wangshiyu rodert
 * @date 2020/7/6 20:58
 * @description
 */

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

/**
 * 预约图书实体
 * @Data 注解，简化代码，自动添加get set toSting 方法
 */
@Data
public class Appointment {

    private long bookId;// 图书ID

    private long studentId;// 学号

    private Date appointTime;// 预约时间

    // 多对一的复合属性
    private Book book;// 图书实体

    // 省略构造方法，getter和setter方法，toString方法

}
```

### dao接口

在`dao`包新建接口 `BookDao.java` 和 `Appointment.java`

- BookDao.java

```java
package javapub.rodert.github.dao;

/**
 * @author wangshiyu rodert
 * @date 2020/7/6 21:01
 * @description
 */

import javapub.rodert.github.entity.Book;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface BookDao {

    /**
     * 通过ID查询单本图书
     *
     * @param id
     * @return
     */
    Book queryById(long id);

    /**
     * 查询所有图书
     *
     * @param offset 查询起始位置
     * @param limit 查询条数
     * @return
     */
    List<Book> queryAll(@Param("offset") int offset, @Param("limit") int limit);

    /**
     * 减少馆藏数量
     *
     * @param bookId
     * @return 如果影响行数等于>1，表示更新的记录行数
     */
    int reduceNumber(long bookId);
}

```

- AppointmentDao.java

```java
package javapub.rodert.github.dao;

/**
 * @author wangshiyu rodert
 * @date 2020/7/6 21:01
 * @description
 */

import javapub.rodert.github.entity.Appointment;
import org.apache.ibatis.annotations.Param;

public interface AppointmentDao {

    /**
     * 插入预约图书记录
     *
     * @param bookId
     * @param studentId
     * @return 插入的行数
     */
    int insertAppointment(@Param("bookId") long bookId, @Param("studentId") long studentId);

    /**
     * 通过主键查询预约图书记录，并且携带图书实体
     *
     * @param bookId
     * @param studentId
     * @return
     */
    Appointment queryByKeyWithBook(@Param("bookId") long bookId, @Param("studentId") long studentId);

}
```

**提示**：这里为什么要给方法的参数添加 `@Param`注解呢？是因为该方法有两个或以上的参数，一定要加，不然 `mybatis` 识别不了。上面的 `BookDao` 接口的 `queryById` 方法和 `reduceNumber` 方法只有一个参数 `book_id` ，所以可以不用加 `@Param` 注解。

---

### dao接口xml

这里不需要写 `dao接口` 的实现类，mybatis会帮我们动态实现，上面我们已经在 `spring-dao.xml` 配置了动态扫描。现在需要编写相应的 `mapper`。
在 `mapper` 目录里新建两个文件 `BookDao.xml` 和 `AppointmentDao.xml` ，分别对应上面两个dao接口。

- BookDao.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="javapub.rodert.github.dao.BookDao">
    <!-- 目的：为dao接口方法提供sql语句配置 -->
    <select id="queryById" resultType="Book" parameterType="long">
        <!-- 具体的sql -->
        SELECT
        book_id,
        name,
        number
        FROM
        book
        WHERE
        book_id = #{bookId}
    </select>

    <select id="queryAll" resultType="Book">
		SELECT
			book_id,
			name,
			number
		FROM
			book
		ORDER BY
			book_id
		LIMIT #{offset}, #{limit}
	</select>

    <update id="reduceNumber">
		UPDATE book
		SET number = number - 1
		WHERE
			book_id = #{bookId}
		AND number > 0
	</update>
</mapper>
```

- AppointmentDao.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="javapub.rodert.github.dao.AppointmentDao">
    <insert id="insertAppointment">
        <!-- ignore 主键冲突，报错 -->
        INSERT ignore INTO appointment (book_id, student_id)
        VALUES (#{bookId}, #{studentId})
    </insert>

    <select id="queryByKeyWithBook" resultType="Appointment">
        <!-- 如何告诉MyBatis把结果映射到Appointment同时映射book属性 -->
        <!-- 可以自由控制SQL -->
        SELECT
        a.book_id,
        a.student_id,
        a.appoint_time,
        b.book_id "book.book_id",
        b.`name` "book.name",
        b.number "book.number"
        FROM
        appointment a
        INNER JOIN book b ON a.book_id = b.book_id
        WHERE
        a.book_id = #{bookId}
        AND a.student_id = #{studentId}
    </select>
</mapper>
```

**mapper 说明**：`namespace` 是 xml 对应的接口全名，`select` 和 `update` 中的 `id` 对应方法名（唯一），`resultType` 是返回值类型，`parameterType` 是参数类型（这个其实可选），`#{...}` 中填写的是方法的参数

---

### dao接口测试

现在的写法是从数据库层向前（web）写，现在测试一下 `dao` 接口，编写测试类。

因为每次测试都要加载配置文件，所有抽离一个类（`BaseTest`），每次测试方法都继承它。

- BaseTest.java

```java
package javapub.rodert.github;

/**
 * @author wangshiyu rodert
 * @date 2020/7/6 21:07
 * @description
 */

import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * 配置spring和junit整合，junit启动时加载springIOC容器 spring-test,junit
 */
@RunWith(SpringJUnit4ClassRunner.class)
// 告诉junit spring配置文件
@ContextConfiguration({ "classpath:spring/spring-dao.xml", "classpath:spring/spring-service.xml" })
public class BaseTest {

}
```

新建 `BookDaoTest.java` 和 `AppointmentDaoTest.java` 两个 dao 测试文件。

- BookDao.java

```java
package javapub.rodert.github.dao;

/**
 * @author wangshiyu rodert
 * @date 2020/7/6 21:08
 * @description
 */


import javapub.rodert.github.BaseTest;
import javapub.rodert.github.entity.Book;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class BookDaoTest extends BaseTest {

    @Autowired
    private BookDao bookDao;

    @Test
    public void testQueryById() throws Exception {
        long bookId = 1000;
        Book book = bookDao.queryById(bookId);
        System.out.println(book);
    }

    @Test
    public void testQueryAll() throws Exception {
        List<Book> books = bookDao.queryAll(0, 4);
        for (Book book : books) {
            System.out.println(book);
        }
    }

    @Test
    public void testReduceNumber() throws Exception {
        long bookId = 1000;
        int update = bookDao.reduceNumber(bookId);
        System.out.println("update=" + update);
    }

}

```

- AppointmentDaoTest.java

```java
package javapub.rodert.github.dao;

/**
 * @author wangshiyu rodert
 * @date 2020/7/6 21:18
 * @description
 */


import javapub.rodert.github.BaseTest;
import javapub.rodert.github.entity.Appointment;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

public class AppointmentDaoTest extends BaseTest {

    @Autowired
    private AppointmentDao appointmentDao;

    @Test
    public void testInsertAppointment() throws Exception {
        long bookId = 1000;
        long studentId = 12345678910L;
        int insert = appointmentDao.insertAppointment(bookId, studentId);
        System.out.println("insert=" + insert);
    }

    @Test
    public void testQueryByKeyWithBook() throws Exception {
        long bookId = 1000;
        long studentId = 12345678910L;
        Appointment appointment = appointmentDao.queryByKeyWithBook(bookId, studentId);
        System.out.println(appointment);
        System.out.println(appointment.getBook());
    }

}
```

- BookDaoTest.java -- >  testQueryById()


![](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202406211656141.png)




> 测试方法都验证过，没有问题，不一一测试了

---

### 业务层-结果集封装

到这里，我们的 `dao` 层，及数据库接口操作都没有问题，下面开始业务层编写。

如果你有实战项目经验，那一定会发现，对于后端接口，我们都会定义一个统一的返回格式，及定义一个返回标准方便前端解析，如下：

```
{
	"code":200,
	"message":"成功",
	"result":{},
	"isSuccess":true
}
```

开始写我们的代码，新建枚举类，用来定义预约业务的数据字典。如果不太明白，先看代码，后面在 JavaPub 微信公众号文章索引中查找对应文章。

新建一个包叫 `enums`，在里面新建一个枚举类 `AppointStateEnum.java`。

- AppointStateEnum.java

```java
package javapub.rodert.github.enums;

/**
 * @author wangshiyu rodert
 * @date 2020/7/6 21:20
 * @description
 */


/**
 * 使用枚举表述常量数据字典
 */
public enum AppointStateEnum {

    SUCCESS(1, "预约成功"), NO_NUMBER(0, "库存不足"), REPEAT_APPOINT(-1, "重复预约"), INNER_ERROR(-2, "系统异常");

    private int state;

    private String stateInfo;

    private AppointStateEnum(int state, String stateInfo) {
        this.state = state;
        this.stateInfo = stateInfo;
    }

    public int getState() {
        return state;
    }

    public String getStateInfo() {
        return stateInfo;
    }

    public static AppointStateEnum stateOf(int index) {
        for (AppointStateEnum state : values()) {
            if (state.getState() == index) {
                return state;
            }
        }
        return null;
    }

}
```

在 `dto` 包下新建 `AppointExecution.java` 用来存储我们执行预约操作的返回结果。


- AppointExecution.java

```java
package javapub.rodert.github.dto;

/**
 * @author wangshiyu rodert
 * @date 2020/7/7 16:26
 * @description
 */


import javapub.rodert.github.entity.Appointment;
import javapub.rodert.github.enums.AppointStateEnum;
import lombok.Data;

/**
 * 封装预约执行后结果
 */
@Data
public class AppointExecution {

    // 图书ID
    private long bookId;

    // 秒杀预约结果状态
    private int state;

    // 状态标识
    private String stateInfo;

    // 预约成功对象
    private Appointment appointment;

    public AppointExecution() {
    }

    // 预约失败的构造器
    public AppointExecution(long bookId, AppointStateEnum stateEnum) {
        this.bookId = bookId;
        this.state = stateEnum.getState();
        this.stateInfo = stateEnum.getStateInfo();
    }

    // 预约成功的构造器
    public AppointExecution(long bookId, AppointStateEnum stateEnum, Appointment appointment) {
        this.bookId = bookId;
        this.state = stateEnum.getState();
        this.stateInfo = stateEnum.getStateInfo();
        this.appointment = appointment;
    }

    // 省略getter和setter方法，toString方法

}

```

在 `exception` 包下新建三个文件

`NoNumberException.java`
`RepeatAppointException.java`
`AppointException.java`

预约业务异常类（都需要继承 `RuntimeException` ---运行时异常类），分别是无库存异常、重复预约异常、预约未知错误异常，用于业务层非成功情况下的返回（即成功返回结果，失败抛出异常）。为事务做准备。

- AppointException.java

```java
package javapub.rodert.github.exception;

/**
 * @author wangshiyu rodert
 * @date 2020/7/7 16:31
 * @description
 */

/**
 * 预约业务异常
 */
public class AppointException extends RuntimeException {

    public AppointException(String message) {
        super(message);
    }

    public AppointException(String message, Throwable cause) {
        super(message, cause);
    }

}
```

- NoNumberException.java

```java
/**
 * @author wangshiyu rodert
 * @date 2020/7/7 16:30
 * @description
 */
package javapub.rodert.github.exception;

/**
 * 库存不足异常
 */
public class NoNumberException extends RuntimeException {

    public NoNumberException(String message) {
        super(message);
    }

    public NoNumberException(String message, Throwable cause) {
        super(message, cause);
    }

}
```

- RepeatAppointException.java

```java

/**
 * @author wangshiyu rodert
 * @date 2020/7/7 16:31
 * @description
 */
package javapub.rodert.github.exception;

/**
 * 重复预约异常
 */
public class RepeatAppointException extends RuntimeException {

    public RepeatAppointException(String message) {
        super(message);
    }

    public RepeatAppointException(String message, Throwable cause) {
        super(message, cause);
    }

}
```

### Service 业务接口代码

在service包下新建BookService.java图书业务接口。

- BookService.java

```java

/**
 * @author wangshiyu rodert
 * @date 2020/7/7 16:32
 * @description
 */
package javapub.rodert.github.service;


import javapub.rodert.github.dto.AppointExecution;
import javapub.rodert.github.entity.Book;

import java.util.List;

/**
 * 业务接口：站在"使用者"角度设计接口 三个方面：方法定义粒度，参数，返回类型（return 类型/异常）
 */
public interface BookService {

    /**
     * 查询一本图书
     *
     * @param bookId
     * @return
     */
    Book getById(long bookId);

    /**
     * 查询所有图书
     *
     * @return
     */
    List<Book> getList();

    /**
     * 预约图书
     *
     * @param bookId
     * @param studentId
     * @return
     */
    AppointExecution appoint(long bookId, long studentId);

}
```

在 `service.impl` 包下新建 `BookServiceImpl.java` 使用 `BookService` 接口，并实现里面的方法。

- BookServiceImpl.java

```java


/**
 * @author wangshiyu rodert
 * @date 2020/7/7 16:39
 * @description
 */
package javapub.rodert.github.service.impl;


import javapub.rodert.github.dao.AppointmentDao;
import javapub.rodert.github.dao.BookDao;
import javapub.rodert.github.dto.AppointExecution;
import javapub.rodert.github.entity.Appointment;
import javapub.rodert.github.entity.Book;
import javapub.rodert.github.enums.AppointStateEnum;
import javapub.rodert.github.exception.AppointException;
import javapub.rodert.github.exception.NoNumberException;
import javapub.rodert.github.exception.RepeatAppointException;
import javapub.rodert.github.service.BookService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class BookServiceImpl implements BookService {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    // 注入Service依赖
    @Autowired
    private BookDao bookDao;

    @Autowired
    private AppointmentDao appointmentDao;


    @Override
    public Book getById(long bookId) {
        return bookDao.queryById(bookId);
    }

    @Override
    public List<Book> getList() {
        return bookDao.queryAll(0, 1000);
    }

    @Override
    @Transactional
    /**
     * 使用注解控制事务方法的优点：
     * 1.开发团队达成一致约定，明确标注事务方法的编程风格
     * 2.保证事务方法的执行时间尽可能短，不要穿插其他网络操作，RPC/HTTP请求或者剥离到事务方法外部
     * 3.不是所有的方法都需要事务，如只有一条修改操作，只读操作不需要事务控制
     */
    public AppointExecution appoint(long bookId, long studentId) {
        try {
            // 减库存
            int update = bookDao.reduceNumber(bookId);
            if (update <= 0) {// 库存不足
                //return new AppointExecution(bookId, AppointStateEnum.NO_NUMBER);//错误写法
                throw new NoNumberException("no number");// 抛出异常，保证触发事务执行
            } else {
                // 执行预约操作
                int insert = appointmentDao.insertAppointment(bookId, studentId);
                if (insert <= 0) {// 重复预约
                    //return new AppointExecution(bookId, AppointStateEnum.REPEAT_APPOINT);//错误写法
                    throw new RepeatAppointException("repeat appoint");
                } else {// 预约成功
                    Appointment appointment = appointmentDao.queryByKeyWithBook(bookId, studentId);
                    return new AppointExecution(bookId, AppointStateEnum.SUCCESS, appointment);
                }
            }
            // 要先于catch Exception异常前先catch住再抛出，不然自定义的异常也会被转换为AppointException，导致控制层无法具体识别是哪个异常
        } catch (NoNumberException | RepeatAppointException e1) {
            throw e1;
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            // 所有编译期异常转换为运行期异常
            //return new AppointExecution(bookId, AppointStateEnum.INNER_ERROR);//错误写法
            throw new AppointException("appoint inner error:" + e.getMessage());
        }
    }

}
```

实现类使用了我们上边定义的异常方法 `RepeatAppointException` ，用于业务层非成功情况下的返回（即成功返回结果，失败抛出异常）。触发事务。

---

测试一下业务层代码，这里演示预约图书业务。

- BookServiceImplTest.java

```java

/**
 * @author wangshiyu rodert
 * @date 2020/7/7 16:40
 * @description
 */
package javapub.rodert.github.service.impl;


import javapub.rodert.github.BaseTest;
import javapub.rodert.github.dto.AppointExecution;
import javapub.rodert.github.service.BookService;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

public class BookServiceImplTest extends BaseTest {

    @Autowired
    private BookService bookService;

    @Test
    public void testAppoint() throws Exception {
        long bookId = 1001;
        long studentId = 12345678910L;
        AppointExecution execution = bookService.appoint(bookId, studentId);
        System.out.println(execution);
    }

}

```

测试结果：


![](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202406211656632.png)


首次执行是“预约成功”，如果再次执行的话，应该会出现“重复预约”，至此，我们所有的后台代码都通过单元测试啦~~ 是不是很开心~

---

咱们还需要在dto包里新建一个封装json返回结果的类Result.java，设计成泛型。

- Result.java

```java
package javapub.rodert.github.dto;

/**
 * @author wangshiyu rodert
 * @date 2020/7/7 21:00
 * @description
 */

import lombok.Data;

/**
 * 封装json对象，所有返回结果都使用它
 */
@Data
public class Result<T> {

    private boolean success;// 是否成功标志

    private T data;// 成功时返回的数据

    private String error;// 错误信息

    public Result() {
    }

    // 成功时的构造器
    public Result(boolean success, T data) {
        this.success = success;
        this.data = data;
    }

    // 错误时的构造器
    public Result(boolean success, String error) {
        this.success = success;
        this.error = error;
    }

    // 省略getter和setter方法 使用注解代替
}
```

### web层

web 层，也就是 controller 层，我们在web包下新建BookController.java文件。

- BookController.java

```java
package javapub.rodert.github.web;

/**
 * @author wangshiyu rodert
 * @date 2020/7/7 21:05
 * @description
 */


import javapub.rodert.github.dto.AppointExecution;
import javapub.rodert.github.dto.Result;
import javapub.rodert.github.entity.Book;
import javapub.rodert.github.enums.AppointStateEnum;
import javapub.rodert.github.exception.NoNumberException;
import javapub.rodert.github.exception.RepeatAppointException;
import javapub.rodert.github.service.BookService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping("/book") // url:/模块/资源/{id}/细分 /seckill/list
public class BookController {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private BookService bookService;

    @RequestMapping(value = "/test")
    public ModelAndView test(){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("book/test");
        modelAndView.addObject("key","welcome javaPub");
        return modelAndView;
    }

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    private String list(Model model) {
        List<Book> list = bookService.getList();
        model.addAttribute("list", list);
        // list.jsp + model = ModelAndView
        return "list";// WEB-INF/jsp/"list".jsp
    }

    @RequestMapping(value = "/{bookId}/detail", method = RequestMethod.GET)
    private String detail(@PathVariable("bookId") Long bookId, Model model) {
        if (bookId == null) {
            return "redirect:/book/list";
        }
        Book book = bookService.getById(bookId);
        if (book == null) {
            return "forward:/book/list";
        }
        model.addAttribute("book", book);
        return "detail";
    }

    //ajax json
    //method = RequestMethod.POST,
    @RequestMapping(value = "/{bookId}/appoint",  produces = {
            "application/json; charset=utf-8" })
    @ResponseBody
    private Result<AppointExecution> appoint(@PathVariable("bookId") Long bookId, @RequestParam("studentId") Long studentId) {
        if (studentId == null || studentId.equals("")) {
            return new Result<>(false, "学号不能为空");
        }
        //AppointExecution execution = bookService.appoint(bookId, studentId);//错误写法，不能统一返回，要处理异常（失败）情况
        AppointExecution execution = null;
        try {
            execution = bookService.appoint(bookId, studentId);
        } catch (NoNumberException e1) {
            execution = new AppointExecution(bookId, AppointStateEnum.NO_NUMBER);
        } catch (RepeatAppointException e2) {
            execution = new AppointExecution(bookId, AppointStateEnum.REPEAT_APPOINT);
        } catch (Exception e) {
            execution = new AppointExecution(bookId, AppointStateEnum.INNER_ERROR);
        }
        return new Result<AppointExecution>(true, execution);
    }

}
```

目前大多项目都是前后端分离，我们作为服务端，一般和前端通过接口数据交互（json），像接口方法 `appoint` ，应该添加 `@ResponseBody` 注解。
测试 controller --> `appoint` 方法可以通过 `curl` ，如：

> curl -H “Accept: application/json; charset=utf-8” -d “studentId=1234567890” localhost:8080/book/1003/appoint

### 运行项目

现在整个项目全部完成，配置tomcat，通过左上角引入 tomcat ，选择我们的项目 ssm。


![](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202406211656025.png)


启动成功后：


![](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202406211656842.png)


这里对前端代码只写较少部分，具体可参考 `BookController` --> `book/test` 接口，有需要帮助请留言。

- BookController.java --> book/test

```java
    @RequestMapping(value = "/test")
    public ModelAndView test(){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("book/test");
        modelAndView.addObject("key","welcome javaPub");
        return modelAndView;
    }
```


- test.jsp

```jsp
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>

<!DOCTYPE HTML>
<html>
<head>
    <%@ page isELIgnored="false"%>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"/>
    <title>news detail</title>

</head>
<body class="fn-pd24">
<h1>大家好 ${key}</h1>

<a href="https://mp.weixin.qq.com/s/kfyRAPnRDp8LLktjgd658Q">JavaPub知识清单</a>
</body>
</html>
```

通过 `ModelAndView` 将我们需要渲染的数据存储传输到对应视图，由 Sping MVC 定义好的视图解析器对该对象解析，最后将结果数据显示到指定页面。


![](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202406211657185.png)



完整代码地址：https://github.com/Rodert/JavaPub/code/ssm_helloworld_web/



