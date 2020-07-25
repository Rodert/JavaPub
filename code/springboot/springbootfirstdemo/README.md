## 前言

`源码在文末`

如果你学习使用过 `Spring` ，那你一定知道它的配置有多么繁杂，原本只是想写个查询小接口，结果环境搭建了很长时间。如果你对 `PHP` 有了解，那你就知道在以前建站为王的年代，`PHP` 才是最好的语言。


现在为了系统协同开发和高可用性，微服务是非常好的解决方案，微服务相关的生态、组件也越来越多，开始动手吧



[toc]

## 一个 SpringBoot 示例项目

开发环境：`IDEA` 、`JDK8`、联网状态、`Maven`

本次使用 `idea` 进行演示，如果你还在使用 `eclipse` ，不妨用 idea 试试。在开始以前，配置好本地的 Maven 环境。

https://start.spring.io/ 网站提供了开发模板，直接帮我们构建构建初始化 springboot 项目，如果你不想用，也可以新建 Maven 项目，再构建一遍。



- 新建项目



启动 `idea` ，新建 `File --> New --> Project --> Spring Initializr --> Next`

![](https://imgkr.cn-bj.ufileos.com/bfc82ba4-bb4a-48f2-b887-123dc933e134.png)




设置好项目名（字母全部小写）和 JDK 版本

![](https://imgkr.cn-bj.ufileos.com/8f243fa3-4c97-4084-899f-5f0f24fe0118.png)




后面直接 `Next` 默认构建 `Finish` 就 OK，到现在，一个 springboot 项目已经构建好。


![](https://imgkr.cn-bj.ufileos.com/aa67b879-14de-43ae-ac13-e03d65999e53.png)



启动：执行 `SpringbootfirstdemoApplication.java` 下 `main` 方法，看到下图 spring 图案，我们的第一个 springboot 项目启动成功了


![](https://imgkr.cn-bj.ufileos.com/4dfe0d1c-940b-4049-9b4a-0ee701cc00f1.png)




## 工程结构解析




![](https://imgkr.cn-bj.ufileos.com/6efacf5c-8d78-4904-96c2-2ffd01a701af.png)



- `src/main/java` 程序开发以及主程序入口

- `src/main/resources` 配置文件

- `src/test/java` 测试程序


另外， Spring Boot 建议的目录结果如下： 
root package 结构：`com.example.myproject`

```
com
  +- example
    +- myproject
      +- Application.java
      |
      +- model
      |  +- Customer.java
      |  +- CustomerRepository.java
      |
      +- service
      |  +- CustomerService.java
      |
      +- controller
      |  +- CustomerController.java
      |
```

1. Application.java(也是程序入口) 建议放到根目录下面,主要用于做一些框架配置
2. model 目录主要用于实体与数据访问层（Repository）
3. service 层主要是业务类代码
4. controller 负责页面访问控制



## 项目配置解析

`约定优先配置`（convention over configuration）

SpringBoot 出现的一大原因就是为了简化 Spring 框架中繁复纷杂的配置（Java Config）


Spring Boot正是在这样的一个背景下被抽象出来的开发框架，它本身并不提供Spring框架的核心特性以及扩展功能，只是用于快速、敏捷地开发新一代基于Spring框架的应用程序。也就是说，它并不是用来替代Spring的解决方案，而是和Spring框架紧密结合用于提升Spring开发者体验的工具。同时它集成了大量常用的第三方库配置（例如Jackson, JDBC, Mongo, Redis, Mail等等），Spring Boot应用中这些第三方库几乎可以零配置的开箱即用（out-of-the-box），大部分的Spring Boot应用都只需要非常少量的配置代码，开发者能够更加专注于业务逻辑。



## SpringBoot MVC 模式

学习一门新技能，搭建一个 web 是最直观的获得感。

1. 在 `pom.xml` 文件 `dependencies` 标签中添加配置

```
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```

- `spring-boot-starter` ：核心模块，包括自动配置支持、日志和 YAML，如果引入了 `spring-boot-starter-web` web 模块可以去掉此配置，因为 `spring-boot-starter-web` 自动依赖了 `spring-boot-starter`。

- `spring-boot-starter-test` ：测试模块，包括 `JUnit`、`Hamcrest`、`Mockito`。

2. 编写控制器（Controller）

```java
@RestController
public class HelloWorldController {
    @RequestMapping("/hello")
    public String index() {
        return "Hello World";
    }
}
```

`@RestController` 的意思就是 `Controller` 里面的方法都以 `json` 格式输出，不用再写 Json 配置。

3、启动主程序，打开浏览器访问 [ http://localhost:8080/hello]( http://localhost:8080/hello)，就可以看到效果了，有木有很简单！



在开发调试时，我们可以需要实时调试，使用热加载，在 `pom.xml` 加入以下配置



```xml

 <dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-devtools</artifactId>
        <optional>true</optional>
    </dependency>
</dependencies>
<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
            <configuration>
                <fork>true</fork>
            </configuration>
        </plugin>
</plugins>
</build>
```



即**生产环境**禁用，该模块在完整的打包环境下运行的时候会被禁用。如果你使用 `java -jar`启动应用或者用一个特定的 classloader 启动，它会认为这是一个“生产环境”。







>  使用 Spring Boot 可以非常方便、快速搭建项目，使我们不用关心框架之间的兼容性，适用版本等各种问题，我们想使用任何东西，仅仅添加一个配置就可以，所以使用 Spring Boot 非常适合构建微服务。



完整代码仓库：https://github.com/Rodert/JavaPub/

## 最后：知识点总结

> 文章底部都有对应**原创PDF**，持续更新中，
> 教程纯手打，致力于最实用教程，微信搜：`JavaPub` ，无套路领取免费原创 PDF 、学习路线图，后台回复【666】。


- [51页MyBatis](https://mp.weixin.qq.com/s/op9ADw_6U5MhbcUlkFtOUQ)
- [19页Maven](https://mp.weixin.qq.com/s/xqfSB43U8PfJOGzMBz5GFg)
- [14页zookeeper](https://mp.weixin.qq.com/s/HfZ3nmTqCYHRhUkoSMEZAg)
- [10页Git](https://mp.weixin.qq.com/s/keQpwkwXbiUxsjQNxse2mw)
- [18页spring](https://mp.weixin.qq.com/s/5nj-AAekF8j5KL6J67UZKA)
- [8页布隆过滤器](https://mp.weixin.qq.com/s/6b5y8l9qIoD6VXdDZuIgBQ)
- [50页排序算法](https://mp.weixin.qq.com/s/10GFjOZ2VgA06hWe_wkmwQ)
- [redis系列文章](https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzUzNDUyOTY0Nw==&action=getalbum&album_id=1389304118178840577&subscene=38&scenenote=https%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzUzNDUyOTY0Nw%3D%3D%26mid%3D2247484050%26idx%3D1%26sn%3D5b76110a20c22959fdbbe1f8f367a709%26chksm%3Dfa921192cde59884bd8c810eba099e3d371f7f77f9481d167e76753739fce4ed0111ca343a35%26scene%3D38%26key%3D070a779d36af0f7cd3fd27fb2d27f26966e513c47424a8d2d3809a99fec3c4f0ebb01310a95488799f6607e48fe2bbe19522140d096f40716551e606108de54829aa403332796a037a4a33dfd67d1e86%26ascene%3D7%26uin%3DMTk1NDc4MzM2Mg%253D%253D%26devicetype%3DWindows%2B10%2Bx64%26version%3D62090529%26lang%3Dzh_CN%26exportkey%3DARcAFhCjF04JtUcLtTxc89g%253D%26pass_ticket%3Dyp2C4BB%252FTDbYFqEshvhu%252BRQ50tpqJSenOgClIcdb07AUSSe8haDDl06Y%252BOJ1u0Sq%26winzoom%3D1#wechat_redirect)
- dubbo
- nginx
- ffmpeg
- Jenkins
- http
- ...



觉得文章内容不错，记得点赞或在看都行，这是对我最大的鼓励！
