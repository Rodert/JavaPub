---
title: SpringBoot的pom.xml
icon: lightbulb
category:
  - springboot
  - java
tag:
  - springboot
  - java
---







## 你了解pomxml吗



springboot 是 java 利器，几乎每个写 java 的同学都会用，但是你了解 `pom.xml` 吗？

这篇干货查漏补缺。

首先我们创建个 springboot 项目

![image-20240515141415120](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202405151414624.png)

都选了默认设置：

![image-20240515141503878](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202405151415315.png)



我把这篇完整粘贴出来

`pom.xml` 

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.example</groupId>
    <artifactId>demo</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>demo</name>
    <description>demo</description>
    <properties>
        <java.version>1.8</java.version>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
        <spring-boot.version>2.6.13</spring-boot.version>
    </properties>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>
    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-dependencies</artifactId>
                <version>${spring-boot.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>

    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.8.1</version>
                <configuration>
                    <source>1.8</source>
                    <target>1.8</target>
                    <encoding>UTF-8</encoding>
                </configuration>
            </plugin>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <version>${spring-boot.version}</version>
                <configuration>
                    <mainClass>com.example.demo.DemoApplication</mainClass>
                    <skip>true</skip>
                </configuration>
                <executions>
                    <execution>
                        <id>repackage</id>
                        <goals>
                            <goal>repackage</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
        </plugins>
    </build>

</project>
```



![image-20240515141832844](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202405151418469.png)

前面这几个大家一定很熟悉：

- `<project>` 是 XML 文档的根元素。
- `<modelVersion>`：POM 模型的版本，当前版本是 4.0.0。我们一般不用动
- `<groupId>`：定义当前 Maven 项目所属的实际项目组。
- `<artifactId>`：定义实际项目模块的名称。

比如导入 fastjson 时，我们会指定 `<groupId>` `<artifactId>` 

![image-20240515142322426](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202405151423409.png)

- `<version>`：定义项目版本。

- `<name>` 和 `<description>`：项目的名称和描述。

这个是开发时自定义的，一般 `name` 就是项目名称。

![image-20240515142447148](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202405151424775.png)

- `<properties>`：这部分定义了一些用于 POM 文件其他位置的属性值。

故名思思， `properties` 是项目中用到的一些属性，在这里定义好后，可以在下面引用。

![image-20240515142652362](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202405151426712.png)

- `<dependencies>`：这部分定义了项目所依赖的其他项目。

`dependencies` 是项目开发中最常修改的地方，因为我们要引入各种各样的依赖。比如 `mysql`、 `fastjson` 等等外部工具，节省开发时间。

![image-20240515142850887](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202405151428285.png)

- `<dependencyManagement>`：当一个 POM 有多个模块时，我们可以在父 POM 中通过 dependencyManagement 元素来管理子模块中的版本。

- `<build>`：这部分包含了项目构建相关的信息，如源码路径、插件配置等。

- `<plugins>`：定义了用于项目构建的插件列表。其中，maven-compiler-plugin 是用来编译源代码的，spring-boot-maven-plugin 是 Spring Boot 提供的用来简化 Spring Boot 应用构建和打包的 Maven 插件。这里的 configuration 元素用来配置插件的参数。

![image-20240515145153527](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202405151451493.png)

这里比较重要的一点是，打包构建后的 jar，入口路径 `<mainClass>` 。maven 对应的配置。

之前整理过一些 springboot 案例。 `https://github.com/Rodert/SpringBoot-javapub` . 



