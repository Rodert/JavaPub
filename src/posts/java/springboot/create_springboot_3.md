---
title: 三种快速创建SpringBoot项目的方式
icon: lightbulb
category:
  - springboot
tag:
  - springboot
---







## 三种快速创建SpringBoot项目的方式


SpringBoot 是一个快速开发框架，通过maven依赖的继承方式，帮助我们快速整合第三方常用框架。现在是 Java 领域的绝对霸主。

今天介绍三种快速创建 SpringBoot 项目的方式。


## 在线创建

1、打开 `https://start.spring.io/` 网站，填写必要信息来生成 Spring Boot 项目。

> https://start.aliyun.com

2、填写必要信息

- Project：表示使用什么构建工具，Maven or Gradle；
- Language：表示使用什么编程语言， Java 、Kotlin or Groovy；
- - Spring Boot：Spring Boot 的版本；
- Project Metadata：项目元数据，即 Maven 项目基本属性，根据自己的实际情况填写；
- Dependencies：要加入的 Spring Boot 组件；

3、然后点击生成或 Ctrl + Enter 即可；

4、将压缩包下载后，解压缩后用自己喜欢的 IDE 开发即可；



## IntelliJ IDEA 创建


1、新建项目时选择 Spring Initializr ；

这里建议使用阿里云的镜像，加快初始化

> https://start.aliyun.com

2、点击下一步，填写相关配置；

- Group：组织 ID，一般分为多个段，一般第一段为域，而第二段则是 公司名称；比如： `cn.net.javapub`
- Artifact：唯一标识符，一般是项目名；比如： `my-javaub-user`

3、选择包，添加相关依赖；

4、配置项目名，点击完成即可；



## Maven 创建

1、新建 Maven 项目；

2、填写项目名和相关配置；

- Group：组织 ID，一般分为多个段，一般第一段为域，而第二段则是 公司名称；比如： `cn.net.javapub`
- Artifact：唯一标识符，一般是项目名；比如： `my-javaub-user`

3、点击完成即可；

4、配置 pom.xml 添加依赖；

5、在 main/java 目录下创建一个包，然后新建一个类，比如我的如下；

6、运行上一步中的 main 方法即可；


## 基本项目结构

项目目录结构参考：

![](https://userblink.csdnimg.cn/7cf24a3fc31240d6a09d9c6c027a456a.png)


