---
title: SpringBoot打包Jar
icon: line
category:
  - 项目实战
  - 《用户中心》
tag:
  - 项目实战
  - 用户管理系统
  - jar
  - springboot
---


## 《用户中心》

[介绍文档](https://kazjsfecs3y.feishu.cn/wiki/QJDwwM5bbi2nT9k6laycWm4ynad)




> SpringBoot打包Jar

当开发完成一个 SpringBoot 项目后，企业开发一般会将它进行打包，然后部署上线。

## 首先

这里有一个可以暴露 HTTP 服务的 SpringBoot 程序。开发 SpringBoot 服务，我们一般使用 Maven 或 Gradle 来管理项目，这里我以最常用的 Maven 来演示，也是《用户中心》中用到的管理方式方式。

> Maven 和 Gradle 是两个流行的自动化构建工具，它们主要用于Java项目，但也支持其他语言的项目。它们的主要作用是自动化项目的构建过程，包括编译、测试、打包、部署等任务。

![image-20241127145854380](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202411271459402.png)


## 步骤

### 1. Spring Boot Maven 插件

给 SpringBoot 安装 Maven 插件。

Spring Boot 提供了一个 Maven 插件，可以自动配置应用为一个可执行的 JAR 文件。你需要在你的 pom.xml 文件中包含这个插件：

```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
        </plugin>
    </plugins>
</build>
```

如果你是使用 IDEA 一键创建的 SpringBoot 初始化项目，那么它是包含这个插件的，到 `pom.xml` 中查看。


### 2. 打包命令

使用 Maven 打包命令来构建你的应用：

```bash
mvn clean package
```

这个命令会创建一个包含所有依赖项的 JAR 文件，通常位于 `target/` 目录下。

![image-20241202154315050](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202412021543084.png)

![image-20241202154337542](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202412021543879.png)

![image-20241202154524878](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202412021545038.png)



### 3. 可执行 JAR：

生成的 JAR 文件是一个可执行的 JAR，这意味着你可以通过以下命令运行它：

```bash
java -jar target/yourapp.jar
```

其中 `yourapp.jar` 是你的 JAR 文件名。

![测试启动jar](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202412021602911.png)

`user-center-backend-java-public-0.0.1-SNAPSHOT.jar` 是我用《用户中心》项目测试的 Jar。


### 4. 其他配置

如果你需要额外的配置，比如指定 JAR 的名称或者包含额外的资源，你可以在 `pom.xml` 中配置 Maven 插件：

```xml
<plugin>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-maven-plugin</artifactId>
    <configuration>
        <finalName>usercenter-app-javapub</finalName>
        <!-- 其他配置 -->
    </configuration>
</plugin>
```

![image-20241202160812016](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202412021608001.png)


✅通过这些步骤，你可以将 Spring Boot 应用打包为一个 JAR 文件，方便部署和运行。比如放到服务器运行。








原文地址： 

[https://javapub.net.cn/star/project/user-center/](https://javapub.net.cn/star/project/user-center/)


