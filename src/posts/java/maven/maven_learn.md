---
title: rodert教你学Maven-实战这一篇就够了
icon: lightbulb
author: Wang Shiyu
date: 2022-04-21
category:
  - java
  - maven
tag:
  - java
  - maven
---



## rodert教你学Maven-实战这一篇就够了



[toc]

# 前言

> 声明：参考来源互联网，有任何争议可以留言。站在前人的肩上，我们才能看的更远。

> 本教程纯手打，致力于最实用教程，不需要什么奖励，只希望多多转发支持。
> 欢迎来我公众号，希望可以结识你，也可以催更，微信搜索：JavaPub

> 有任何问题都可以来谈谈，等你哦！

![微信公众号](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/2024%2F06%2F15%2F20240615-091808.jpeg)


我搞Java也有段时间了，对maven的理解停留在能管理依赖、作为仓库使用，那它还能干什么？

我前面发过一些实战项目，很多初学者和爱好者都有用到，但是对其中maven不了解，不知道如何部署。应一位fans同学要求，redert肝一篇maven，各位看官。

> 这是一篇文档型文章，能对maven有一个完整的了解。

# 1.什么是Maven？

搞Java都能说出，maven是什么，他都能回答出`maven是一个项目管理工具`，这篇文章学习再来一起学习。

Maven是基于项目对象模型(POM Project Object Model)，可以通过一小段描述信息（配置文件）来管理项目的构建、报告和文档的软件项目管理工具。

其官网地址为：http://maven.apache.org

- 这段官方文档已经说的很明白

Maven翻译为“专家”、“内行”；是一个采用纯Java编写的开源项目管理工具，Maven采用了一种被称之为Project Object Model (POM)概念来管理项目，所有的项目配置信息都被定义在一个叫做POM.xml的文件中, 通过该文件Maven可以管理项目的整个声明周期，包括清除、编译、测试、报告、打包、部署等。目前Apache下绝大多数项目都已经采用Maven进行管理. 而Maven本身还支持多种插件，可以方便更灵活的控制项目, 开发人员的主要任务应该是关注业务逻辑并去实现它，而不是把时间浪费在学习如何在不同的环境中去依赖jar包、项目部署等。Maven正是为了将开发人员从这些任务中解脱出来而诞生的一个项目管理工具。

# 2.maven的作用
## 2.1.Maven的功能

Maven是跨平台的项目管理工具。主要服务于基于Java平台的项目构建，依赖管理和项目信息管理。

- 什么是项目构建？

![](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/2024%2F06%2F15%2F20240615-091805.jpeg)

- 什么是理想的项目构建？

高度自动化，跨平台，可重用的组件，标准化的

- 什么是依赖？为什么要进行依赖管理？

自动下载，统一依赖管理

- 有哪些项目信息？

项目名称描述，开发人员信息等

## 2.2.为什么使用maven



> 下面这几个痛点，相信是每个Java攻城狮都遇到过的。



**传统方式管理jar依赖的问题：**

jar冲突
jar依赖
jar体积过大
jar在不同阶段无法个性化配置

**使用maven方式管理jar依赖的好处：**

解决jar冲突
解决jar依赖问题
jar文件不用在每个项目保存，只需要放在仓库即可
maven可以指定jar的依赖范围

# 3.maven安装和配置
## 3.1.安装

> 现在为止应该没有使用jdk1.7以下的吧，如果有，这篇文章可以跳过。

**1. 下载Maven**

下载地址：http://maven.apache.org/download.cgi

![下载地址](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/2024%2F06%2F15%2F20240615-091801.png)

**2.  解压文件**

解压maven压缩包“apache-maven-3.5.2.bin.zip”到一个路径（尽量编码路径中不要包含中文）

![image-20200610223114895](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/2024%2F06%2F15%2F20240615-091754.png)

- bin：含有mvn运行的脚本
- boot：含有plexus-classworlds类加载器框架
- lib：含有Maven运行时所需要的java类库
- conf：含有settings.xml配置文件
- settings.xml 中默认的用户库: ${user.home}/.m2/repository[通过- maven下载的jar包都会存储到此仓库中]

## 3.2.配置

**1. 添加环境变量MAVEN_HOME**

MAVEN_HOME : E:\maven\apache-maven-3.5.2-bin（注意：配置为你自己的maven路径）

![](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/2024%2F06%2F15%2F20240615-091747.png)

MAVEN_OPTS : -Xms256m -Xmx512m（``注意：可以不配置``）

![](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/2024%2F06%2F15%2F20240615-091740.jpeg)

**2. 设置系统环境变量path**

在Path中追加: %MAVEN_HOME%\bin

![image-20200610223813357](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/2024%2F06%2F15%2F20240615-091732.png)

**3. 验证成功**

打开 cmd 输入：mvn -version

![maven_version](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/2024%2F06%2F15%2F20240615-091725.png)

**4. 配置本地仓库**

Maven的默认本地仓库在：${user.home}/.m2/repository；这地址可以在settings.xml中修改指定自定义的仓库路径。

【自定义仓库路径】
找到${maven_home}/conf/settings.xml文件，修改如下：

![maven_setting_repository](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/2024%2F06%2F15%2F20240615-091717.png)

需要注意的是上图中的自定义路径必须存在。repository是本地仓库，也即本地下载的jar存放路径。

> 到这里为止，你的项目已经可以打包、部署，做一些简单操作了。

# 4.maven项目规约

> 这是一套科学的约定，使用它

什么是Maven项目规约？其实就是maven项目的目录结构。


**maven项目的目录结构遵守以下规范：**

![maven项目目录](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/2024%2F06%2F15%2F20240615-091709.png)

# 5.命令行构建maven项目
## 5.1.命令行构建Java项目

> 下面通过maven命令，快速构建一个java项目结构。

在命令行中可以通过Maven中的命令（插件）可以自动创建文件结构和自动生成pom.xml文件。


打开cmd，执行以下cmd命令：
```bash
mvn archetype:generate  -DarchetypeCatalog=internal  -DgroupId=com.yiidian -DartifactId=hellojava -DarchetypeArtifactId=maven-archetype-quickstart -Dversion=0.0.1-snapshot
```

执行后结果：

![image-20200610225900548](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/2024%2F06%2F15%2F20240615-091702.png)

```bash
参数说明：
 #核心命令 mvn 框架:生成 即生成Maven项目最基本的目录结构
 mvn archetype:generate
 #读取archetype-catalog.xml文件的位置；内置的
 -DarchetypeCatalog=internal
 #公司域名倒写
 -DgroupId=com.yiidian
 #项目名称
 -DartifactId=hellojava
 #Maven项目的模板；最简单的Maven项目模板
 -DarchetypeArtifactId=maven-archetype-quickstart
 #项目版本号，snapshot 内测版，release 正式发行版
 -Dversion=0.0.1-snapshot
```

## 5.2.使用命令行创建web项目
创建web项目时，不但创建目录结构和pom.xml，并创建webapp目录放置web资源文件。

执行以下cmd命令：

```bash
mvn archetype:generate  -DarchetypeCatalog=internal  -DgroupId=com.yiidian -DartifactId=helloweb -DarchetypeArtifactId=maven-archetype-webapp -Dversion=0.0.1-snapshot
```

执行后结果：

![image-20200610230144920](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/2024%2F06%2F15%2F20240615-091653.png)

```bash
参数说明：
 #核心命令 mvn 框架:生成 即生成Maven项目最基本的目录结构
 mvn archetype:generate
 #读取archetype-catalog.xml文件的位置；内置的
 -DarchetypeCatalog=internal
 #公司域名倒写
 -DgroupId=com.yiidian
 #项目名称
 -DartifactId=helloweb
 #Maven项目的模板；Maven web项目模板
 -DarchetypeArtifactId=maven-archetype-webapp
 #项目版本号
 -Dversion=0.0.1-snapshot
```

## 5.3.构建Maven项目命令的使用

注意：进入项目后再操作

> mvn clean

	清除原来的编译结果

> mvn compile

	编译

> mvn test

	运行测试代码；mvn test -Dtest=类名//单独运行测试类

> mvn package

	打包项目；mvn package -Dmanven.test.skip=true//打包时不执行测试

> mvn install

	将项目打包并安装到本地仓库

> mvn deploy

	发布到本地仓库或者服务器

我常用的打包命令：

```bash
mvn clean install -DskipTests
```

# 6.什么是仓库？

> 了解内容，可跳过

Maven在某个统一的位置存储所有项目的共享的构件，这个统一的位置，就称之为仓库。（仓库就是存放依赖和插件的地方）Maven的仓库有两大类：

本地仓库
远程仓库，在远程仓库中又分成了3种：中央仓库、私服、其它公共库。

**本地仓库**：就是Maven在本机存储构件的地方。maven的本地仓库，在安装maven后并不会创建，它是在第一次执行maven命令的时候才被创建。maven本地仓库的默认位置：在用户的目录下都只有一个.m2/repository/的仓库目录；可以修改。


**中央仓库**：包含了绝大多数流行的开源Java构件，以及源码、作者信息、SCM、信息、许可证信息等。开源的Java项目依赖的构件都可以在这里下载到。
中央仓库的地址：http://repo1.maven.org/maven2/


**私服**：是一种特殊的远程仓库，它是架设在局域网内的仓库。

 

**没有使用私服的仓库构件下载**

![](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/2024%2F06%2F15%2F20240615-091630.jpeg)

**使用私服的仓库构件下载**

![](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/2024%2F06%2F15%2F20240615-093402.jpeg)

# 7.什么是maven坐标？

> 在平面几何中坐标（x,y）可以标识平面中唯一的一点。


- Maven坐标主要组成
groupId：定义当前Maven项目隶属项目、组织
artifactId：定义实际项目中的一个模块
version：定义当前项目的当前版本
packaging：定义该项目的打包方式（pom/jar/war，默认为jar）
groupId、artifactId、version简称为GAV。

**Maven为什么使用坐标？**

Maven世界拥有大量构件，需要找一个用来唯一标识一个构建的统一规范
拥有了统一规范，就可以把查找工作交给机器

**如何获取Maven坐标**

推荐一个Maven坐标查询网站：http://mvnrepository.com/

网站上可以搜索具体的组织或项目关键字，之后复制对应的坐标到pom.xml中。如：

![image-20200610231456317](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/2024%2F06%2F15%2F20240615-091618.png)

# 8.maven依赖管理
## 8.1.依赖范围

> 参考：http://www.yiidian.com/maven/maven-dependence.html

依赖范围scope 用来控制依赖和编译，测试，运行的classpath的关系。具体的依赖范围有如下6种：

1. compile： 默认编译依赖范围。对于编译，测试，运行三种classpath都有效
2. test：测试依赖范围。只对于测试classpath有效
3. provided：已提供依赖范围。对于编译，测试的classpath都有效，但对于运行无效。因为由容器已经提供，例如servlet-api
4. runtime：运行时提供。例如:jdbc驱动
5. system：系统范围,自定义构件，指定systemPath；跟provided 相似，但是在系统中要以外部JAR包的形式提供，maven不会在repository查找它。
6. import：只使用在 `<dependencyManagement>` 中，表示从其它的pom中导入dependency的配置。

![依赖范围]()

> 下面是为了解决冲突依赖内容，如果你在写一个Demo，可作为了解部份。

## 8.2.传递性依赖

假设 C 依赖 B ， B 依赖 A ，那么称 C 对 B 是第一直接依赖， B 对 A 是第二直接依赖， C 对 A 是传递依赖。

对于传递性依赖，依赖的范围如下表：

![](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/2024%2F06%2F15%2F20240615-091608.jpeg)

## 8.3.可选依赖

在依赖节点dependency中的`<optional>`可以控制当前的依赖是否向下传递；默认值为false，表示向下传递。

【示例】A项目依赖于log4j，然后B项目依赖于A项目；那么如果在A中对log4j依赖的optional配置成false时，B项目中自动传递依赖于log4j。否则反之。

1）项目A配置slf4j的依赖并设置optional为true

```xml
 <dependency>
	<groupId>org.slf4j</groupId>
	<artifactId>slf4j-log4j12</artifactId>
	<version>1.6.4</version>
	<!-- 配置为true时不向下传递此依赖，默认为false -->
	<optional>true</optional>
 </dependency>
```

2）配置项目B依赖于项目A，检查项目B的依赖包

```xml
<!-- 依赖于A -->
<dependency>
	<groupId>com.JavaPub</groupId>
	<artifactId>A</artifactId>
	<version>0.0.1-SNAPSHOT</version>
</dependency>
```

这时发现B项目没有依赖slf4j-log4j12

## 8.4.依赖冲突

> 依赖冲突是很常见的问题

- 如果直接与间接依赖中包含有同一个坐标不同版本的资源依赖，以直接依赖的版本为准（就近原则）

![](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/2024%2F06%2F15%2F20240615-091556.jpeg)

**最终A依赖的X的版本为2.0**

【比如】：项目A中，依赖了slf4j1.6.4版本的包，通过slf4j1.6.4间接依赖log4j1.2.16版本；如果项目A中直接配置了log4j 1.2.17版本，那么最终的版本为1.2.17。

```xml
<dependency>
	<groupId>org.slf4j</groupId>
	<artifactId>slf4j-log4j12</artifactId>
	<version>1.6.4</version>
	<!-- 配置为true时不向下传递此依赖，默认为false -->
	<optional>true</optional>
</dependency>
<dependency>
	<groupId>log4j</groupId>
	<artifactId>log4j</artifactId>
	<version>1.2.17</version>
</dependency>
```

- 如果直接依赖中包含有同一个坐标不同版本的资源依赖，以配置顺序下方的版本为准

![](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/2024%2F06%2F15%2F20240615-091954.jpeg)


- 如果间接依赖中包含有同一个坐标不同版本的资源依赖，以配置顺序上方的版本为准

	如下对应spring-core的间接依赖的版本号，以struts2-spring-plugin为准

```xml
<dependency>
	<groupId>org.apache.struts</groupId>
	<artifactId>struts2-spring-plugin</artifactId>
	<version>2.3.24.1</version>
</dependency>
<dependency>
	<groupId>org.springframework</groupId>
	<artifactId>spring-beans</artifactId>
	<version>4.1.0.RELEASE</version>
</dependency>
```

## 8.4.排除依赖

> 这个在项目中使用频率较高

在pom中的依赖节点中，如果引入的依赖包含了很多其它的传递依赖，而且项目需要的这些依赖的版本和传递依赖的不相符；那么可以在依赖节点中设置排除依赖节点：`<exclusions>` 然后再添加 `<exclusion>`，其里面的内容包括：
①所包含坐标
②排除依赖包中所包含的依赖关系
【注意】不需要添加版本，直接按照类别排除

```xml
<dependency>
	<groupId>org.apache.struts</groupId>
	<artifactId>struts2-spring-plugin</artifactId>
	<version>2.3.24.1</version>
	<exclusions>
		<!-- 排除spring-core的传递依赖 -->
		<exclusion>
			<groupId>org.springframework</groupId>
			<artifactId>spring-core</artifactId>
		<eclusion>
	<exclusions>
</dependency>

<dependency>
	<groupId>org.springframework</groupId>
	<artifactId>spring-beans</artifactId>
	<version>4.1.0.RELEASE</version>
</dependency>
```

# 9.maven生命周期

## 9.1.Maven生命周期

Maven生命周期就是为了对所有的构建过程进行抽象和统一；包括**项目清理，初始化，编译，打包，测试，部署**等几乎所有构建步骤。
Maven有三套相互独立的生命周期，请注意这里说的是“三套”，而且“相互独立”，这三套生命周期分别是： 

- Clean Lifecycle 在进行真正的构建之前进行一些清理工作。 
- Default Lifecycle 构建的核心部分，编译，测试，打包，部署等等。 
- Site Lifecycle 生成项目报告，站点，发布站点。 

再次强调它们是相互独立的，可以仅仅调用clean来清理工作目录，仅仅调用site来生成站点。不过也可以直接运行 mvn clean install site 运行所有这三套生命周期。

## 9.2.clean生命周期

clean生命周期每套生命周期都由一组阶段(Phase)组成，我们平时在命令行输入的命令总会对应于一个特定的阶段。比如，运行mvn clean ，这个的clean是clean生命周期的一个阶段。有clean生命周期，也有clean阶段。clean生命周期一共包含了三个阶段： 

- pre-clean 执行一些需要在clean之前完成的工作 
- clean 移除所有上一次构建生成的文件 
- post-clean 执行一些需要在clean之后立刻完成的工作 

mvn clean 中的clean就是上面的clean，在一个生命周期中，运行某个阶段的时候，它之前的所有阶段都会被运行，也就是说，mvn clean 等同于 mvn pre-clean clean ，如果我们运行 mvn post-clean ，那么 pre-clean，clean 都会被运行。这是Maven很重要的一个规则，可以大大简化命令行的输入。

## 9.3.default生命周期

default生命周期default生命周期是Maven生命周期中最重要的一个，绝大部分工作都发生在这个生命周期中。比较重要和常用的阶段如下： 

validate 
generate-sources 
process-sources 
generate-resources 
process-resources 复制并处理资源文件，至目标目录，准备打包。 
compile 编译项目的源代码。 
process-classes 
generate-test-sources 
process-test-sources 
generate-test-resources 
process-test-resources 复制并处理资源文件，至目标测试目录。 
test-compile 编译测试源代码。 
process-test-classes 
test 使用合适的单元测试框架运行测试。这些测试代码不会被打包或部署。 
prepare-package 
package 接受编译好的代码，打包成可发布的格式，如 JAR 。 
pre-integration-test 
integration-test 
post-integration-test 
verify 运行任何检查，验证包是否有效且达到质量标准。
install 将包安装至本地仓库，以让其它项目依赖。 
deploy 将最终的包复制到远程的仓库，以让其它开发人员与项目共享。 
运行任何一个阶段的时候，它前面的所有阶段都会被运行，这也就是为什么运行mvn install 的时候，代码会被编译，测试，打包。此外，Maven的插件机制是完全依赖Maven的生命周期的。 

## 9.4.site生命周期

site生命周期包含如下4个阶段：

- pre-site 执行一些需要在生成站点文档之前完成的工作 
- site 生成项目的站点文档 
- post-site 执行一些需要在生成站点文档之后完成的工作，并且为部署做准备 
- site-deploy 将生成的站点文档部署到特定的服务器上 

这里经常用到的是site阶段和site-deploy阶段，用以生成和发布Maven站点，这是Maven相当强大的功能，Manager比较喜欢，文档及统计数据自动生成，很好看。


# 10.maven插件使用

参考：http://www.yiidian.com/maven/maven-plugins.html

# 11.maven继承与聚合
## 11.1.maven继承

继承为了消除重复，可以把pom中很多相同的配置提取出来；如：grouptId，version等。在使用的时候子工程直接继承父工程的依赖版本号，子工程中不再需要指定具体版本号，方便统一管控项目的依赖版本问题。

- 父工程设置依赖

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>
	<groupId>cn.sm1234</groupId>
	<artifactId>parent</artifactId>
	<version>0.0.1-SNAPSHOT</version>
	<packaging>pom</packaging>

	<!-- 集中定义依赖版本号 -->
	<properties>
		<junit.version>4.10</junit.version>
		<spring.version>4.1.0.RELEASE</spring.version>
		<slf4j.version>1.6.4</slf4j.version>
	</properties>

	<!-- 版本锁定，当子工程中有需要并且自行添加了具体依赖后才有效 -->
	<dependencyManagement>
		<dependencies>
			<!-- 单元测试 -->
			<dependency>
				<groupId>junit</groupId>
				<artifactId>junit</artifactId>
				<version>${junit.version}</version>
				<scope>test</scope>
			</dependency>

			<!-- Spring -->
			<dependency>
				<groupId>org.springframework</groupId>
				<artifactId>spring-context</artifactId>
				<version>${spring.version}</version>
			</dependency>
			<dependency>
				<groupId>org.springframework</groupId>
				<artifactId>spring-beans</artifactId>
				<version>${spring.version}</version>
			</dependency>

			<dependency>
				<groupId>org.springframework</groupId>
				<artifactId>spring-aspects</artifactId>
				<version>${spring.version}</version>
			</dependency>

			<dependency>
				<groupId>org.slf4j</groupId>
				<artifactId>slf4j-log4j12</artifactId>
				<version>${slf4j.version}</version>
			</dependency>

		</dependencies>
	</dependencyManagement>
</project>
```

- 子工程设置依赖

在子工程中的pom.xml需要设置父工程：

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>
	<!-- 父工程 -->
	<parent>
		<groupId>cn.sm1234</groupId>
		<artifactId>parent</artifactId>
		<version>0.0.1-SNAPSHOT</version>
		<!-- 父项目的pom.xml文件的相对路径；一般可不指定 -->
		<relativePath>../parent</relativePath>
	</parent>

	<groupId>cn.sm1234</groupId>
	<artifactId>sm1234-C</artifactId>
	<version>0.0.1-SNAPSHOT</version>

	<!-- 依赖 -->
	<dependencies>

		<dependency>
			<groupId>junit</groupId>
			<artifactId>junit</artifactId>
			<!-- 版本号由父工程里面统一指定不再需要特别指定 -->
			<!-- <version>${junit.version}</version> -->
			<scope>test</scope>
		</dependency>
	</dependencies>
</project>
```

> relativePath：父项目的pom.xml文件的相对路径。默认值为../pom.xml。maven首先从当前构建项目开始查找父项目的pom文件，然后从本地仓库，最后从远程仓库。RelativePath允许你选择一个不同的位置；一般Eclipse找不到parent项目时可以先update project，还不行则可配置此项。

## 11.2.聚合

> 多模块项目是现在开发中比较常用的方式。

如果想一次构建多个项目模块，那则需要对多个项目模块进行聚合。

```xml
<modules>
	<module>../子项目名称1</module>
	<module>../子项目名称2</module>
	<module>../子项目名称3</module>
</modules>
```

# 12.maven搭建SSH项目实战

> 很实用，推荐阅读

参考：http://www.yiidian.com/maven/maven-ssh-project.html











