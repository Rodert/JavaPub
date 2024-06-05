---
# 这是侧边栏索引
index: true
# 这是页面的图标
icon: page
# 这是文章的标题
title: 10道不得不会的 SpringBoot 面试题
# 设置作者
author: Wang Shiyu
# 设置写作时间
date: 2022-11-07
# 一个页面可以有多个分类
category:
  - 最少必要面试题
# 一个页面可以有多个标签
tag:
  - springboot
  - 面试题
# 此页面会出现在首页的文章板块中
star: true
---

SpringBoot

<!-- more -->

10道不得不会的 SpringBoot 面试题

我是JavaPub，专注于面试、副业，技术人的成长记录。

以下是 SpringBoot 面试题，相信大家都会有种及眼熟又陌生的感觉、看过可能在短暂的面试后又马上忘记了。**JavaPub**在这里整理这些容易忘记的重点知识及**解答**，`建议收藏，经常温习查阅`。

评论区见

[toc]


本系列[《最少必要面试题》](https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzUzNDUyOTY0Nw==&action=getalbum&album_id=2344061143381508097#wechat_redirect)



# SpringBoot

### 1. 为什么要用 spring boot？

通过自动配置方式简化 Spring 应用的开发，弱化配置，遵循 **约定大于配置的原则** ，使开发者专注于业务开发而无需过多考虑配置相关操作，通过启动类的 main 方法一键启动应用。

### 2. spring boot 有哪些优点？

1. 独立运行。
	内嵌了 servlet，tomat 等，不需要打成 war 包部署到容器中，只需要将 SpringBoot 项目打成jar包就能独立运行。

2. 简化配置。
	启动器自动依赖其他组件，简少了 maven 的配置。各种常用组件及配置已经默认配置完成，无需过多干预。

3. 避免大量的 Maven 导入和各种版本冲突。

4. 应用监控。
	Spring Boot 提供一系列端点可以监控服务及应用。

### 3. spring boot 核心配置文件是什么？

springboot 核心的两个配置文件：

- bootstrap (. yml 或者 . properties)：boostrap 由父 ApplicationContext 加载的，
比 applicaton 优先加载，配置在应用程序上下文的引导阶段生效，且 bootstrap 里面的属性不能被覆盖；一般来说我们在 SpringCloud Config 或者 Nacos 中会用到它。

- application (. yml 或者 . properties)：用于 springboot 项目的自动化配置


### 4. spring boot的核心注解是什么？由那些注解组成？

核心注解为：**@SpringBootApplication**

该注解主要由三个注解组成：

​	`@SpringBootConfiguration()`:代表当前是一个配置类
​	`@EnableAutoConfiguration()`: 启动自动配置
​	`@ComponentScan()`：指定扫描哪些 Spring 注解

### 5. 说一下springboot的自动装配原理

1. SpringBoot启动的时候加载主配置类，开启了自动配置功能@EnableAutoConfiguration。

2. 查看@EnableAutoConfiguration，其作用是利用AutoConfigurationImportSelector给容器中导入一些组件。

3. 查看AutoConfigurationImportSelector，其中public String[] selectImports(AnnotationMetadata annotationMetadata)方法内 最终调用getCandidateConfigurations()方法

4. 查看 getCandidateConfigurations(AnnotationMetadata metadata,     AnnotationAttributes attributes)，获取候选的配置，这个是扫描所有jar包类路径下"META-INF/spring.factories"

5. 然后把扫描到的这些文件包装成Properties对象。

6. 从properties中获取到EnableAutoConfiguration.class类名对应的值，然后把他们添加在容器中。

**简而言之，整个过程就是将类路径下 "META-INF/spring.factories" 里面配置的所有 EnableAutoConfiguration 的值加入到容器中。**

### 6. SpringBoot、Spring MVC和Spring有什么区别？

**Spring**：主要用来创建IOC容器，依赖注入，实现程序间的松耦合

**SpringMVC**: 主要是用来做WEB开发，通过各种组件的协调配合，简化Web应用的开发

**SpringBoot**: SpringBoot更像是一个管家，当使用到对应功能时，只需要导入指定应用启动器，SpringBoot就能够在底层默认其配置，大大简化了开发所需的繁杂配置

### 7. SpringBoot启动时都做了什么?

Springboot 的启动，主要创建了配置环境 (environment)、事件监听 (listeners)、应用上下文(applicationContext)，并基于以上条件，在容器中开始实例化我们需要的 Bean，至此，通过 SpringBoot 启动的程序已经构造完成。

### 8. SpringBoot 中的监视器是什么？

SpringBoot Actuator 是 SpringBoot 一项重要功能，其可以帮助我们查看应用的运行状态，对运行时指标进行检查和监控，监视器提供了一组可以直接作为 httpurl 访问的 rest 端点来访问查看指定功能状态。


### 9. SpringBoot 中的starter到底是什么 ?

首先，这个 Starter 并非什么新的技术点，基本上还是基于 Spring 已有功能来实现的。首先它提供了一个自动化配置类，一般命名为 XXXAutoConfiguration ，在这个配置类中通过条件注解来决定一个配置是否生效（条件注解就是 Spring 中原本就有的），然后它还会提供一系列的默认配置，也允许开发者根据实际情况自定义相关配置，然后通过类型安全的属性注入将这些配置属性注入进来，新注入的属性会代替掉默认属性。

正因为如此，很多第三方框架，我们只需要引入依赖就可以直接使用了。当然，开发者也可以自定义 Starter

**拓展：如何自定义starter?**

1. 创建项目，创建两个模块分别为 `spring-boot-starter-*`，`spring-boot-starter-*-autoconfiguration`

2. `spring-boot-starter-*` pom 引入 `spring-boot-starter-*-autoconfiguration`

3. `spring-boot-starter-*-autoconfiguration` 创建功能方法，创建 *properties类，创建一个配置类将功能方法类添加到 spring 容器，在 resouces 下创建 `META-INF/spring.factories` 配置
　　　　`org.springframework.boot.autoconfigure.EnableAutoConfiguration=\`
　　　　`org.springframework.boot.autoconfigure.admin.SpringApplicationAdminJmxAutoConfiguration`

4. 打包安装这两个模块到本地 maven 仓库，即可在其他项目引入 `spring-boot-starter-*` 注入功能类进行方法调用

### 10. 微服务中如何实现 session 共享?

在微服务中，一个完整的项目被拆分成多个不相同的独立的服务，各个服务独立部署在不同的服务器上，各自的 session 被从物理空间上隔离开了，但是经常，我们需要在不同微服务之间共享 session ，常见的方案就是 Spring Session + Redis 来实现 session 共享。将所有微服务的 session 统一保存在 Redis 上，当各个微服务对 session 有相关的读写操作时，都去操作 Redis 上的 session 。
这样就实现了 session 共享，Spring Session 基于 Spring 中的代理过滤器实现，使得 session 的同步操作对开发人员而言是透明的，非常简便。





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

