---
# 这是侧边栏索引
index: true
# 这是页面的图标
icon: page
# 这是文章的标题
title: 10道不得不会的 JavaEE 面试题
# 设置作者
author: Wang Shiyu
# 设置写作时间
date: 2022-06-25
# 一个页面可以有多个分类
category:
  - 最少必要面试题
# 一个页面可以有多个标签
tag:
  - javaee
  - 面试题

---

JavaEE

<!-- more -->

10道不得不会的 JavaEE 面试题

我是 JavaPub，专注于面试、副业，技术人的成长记录。

以下是 JavaEE 面试题，相信大家都会有种及眼熟又陌生的感觉、看过可能在短暂的面试后又马上忘记了。**JavaPub**在这里整理这些容易忘记的重点知识及**解答**，`建议收藏，经常温习查阅`。

评论区见

@[toc]



# JavaEE



本系列[《最少必要面试题》](https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzUzNDUyOTY0Nw==&action=getalbum&album_id=2344061143381508097#wechat_redirect)


目前很多新项目很少会用到JavaEE的技术栈，但是对于部分维护老代码的工程师来说，还是尤为重要。

### 1. JSP 有哪些内置对象？作用分别是什么？

JSP有9个内置对象：

- request：封装客户端的请求，其中包含来自GET或POST请求的参数；

- response：封装服务器对客户端的响应；

- pageContext：通过该对象可以获取其他对象；

- session：封装用户会话的对象；

- application：封装服务器运行环境的对象；

- out：输出服务器响应的输出流对象；

- config：web应用的配置对象；

- page：jsp页面本身（相当于Java程序中的this）；

- exception：封装页面抛出异常的对象。


![JSP的9内置对象及其含义](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202405271038434.png)

### 2. 介绍一下 Servlet 生命周期

Servlet是运行在服务器端，以多线程的方式处理客户端请求的小程序。是sun公司提供的一套规范（规范的实现是接口）。

servlet的生命周期就是从servlet出现到消亡(销毁)的全过程。主要分为以下几个阶段：

**加载类—>实例化(为对象分配空间)—>初始化(为对象的属性赋值)—>请求响应(服务阶段)—>销毁**

详细介绍：

1. 加载

  在下列时刻会加载Servlet（只执行一次）：

  - 如果已经配置自动加载选项，则在启动服务器时自动加载 `web.xml` 文件中设置的`<load-on-start>`；
  - 服务器启动之后，客户机首次向Servlet发出请求时会加载；
  - 重新加载Servlet时会进行一次加载；

2. 实例化

  加载Servlet后，服务器创建一个Servlet实例。（只执行一次）

3. 初始化

- 调用 Servlet 的 `init()` 方法。在初始化阶段，Servlet 初始化参数被传递给 Servlet 配置对象 ServletConfig。（只执行一次）；

4. 请求处理

  对于到达服务器的客户机请求，服务器创建针对此次请求的一个"请求对象"和一个"响应对象"。

  服务器调用 Servlet 的 `service()` 方法，该方法用于传递"请求"和"响应"对象。

  `service()` 方法从"请求"对象获得请求信息、处理该请求并用"响应"对象的方法将响应回传给客户端。

  `service()` 方法可以调用其他方法来处理请求，例如 `doGet()、doPost()` 或其他方法。


5. 销毁

  当服务器不需要 Servlet，或重新装入 Servlet 的新实例时，服务器会调用 Servlet 的 `destroy()` 方法。（只执行一次）；


### 3. Servlet和JSP的区别和联系

**区别：**

1. JSP是在HTML代码里面写Java代码；而Servlet是在Java代码中写HTML代码，Servlet本身是个Java类；

2. JSP使人们将显示和逻辑分隔称为可能，这意味着两者的开发可以并行进行；而Servlet并没有将两者分开；

3. Servlet独立地处理静态表示逻辑与动态业务逻辑，任何文件的变动都需要对此服务程序重新编译；JSP允许使用特殊标签直接嵌入到HTML页面，HTML内容与JAVA内容也可放在单独文件中，HTML内容的任何变动会自动编译装入到服务程序；

4. Servlet需要在web.xml中配置；而JSP无需配置；

5. 目前JSP主要用在视图层，负责显示；而Servlet主要用在控制层，负责调度；

**联系：**

1. 都是SUN公司推出的动态网页技术；

2. 先有Servlet，针对Servlet缺点推出JSP。JSP是Servlet的一种特殊形式，每个JSP页面就是一个Servlet实例，JSP页面由系统翻译成Servlet，Servlet再负责响应用户的请求。

### 4. JSP的执行过程

在JSP运行过程中，首先由客户端发出请求，Web服务器接收到请求之后，如果是第一次访问某个JSP页面，Web服务器对它进行一下三个操作：

1. 翻译

  由.jsp变为.java，由JSP引擎完成。

2. 编译

  由.java变为.class，由Java编译器实现。

3. 执行

  由.class变为.html，用Java虚拟机执行编译文件，然后将执行结果返回给Web服务器，并最终返回给客户端。
  
  如果不是第一次访问某个JSP页面，则只执行第三步，**所以第一次访问JSP较慢**。

### 5. Session和Cookie的区别和联系；说明在自己项目中如何使用？

Session 和 Cookie 都是会话(Seesion)跟踪技术。Cookie 通过在客户端记录信息确定用户身份，Session 通过在服务器端记录信息确定用户身份。但是 Session 的实现依赖于 **Cookie，sessionId**(session的唯一标识需要存放在客户端).

1. cookie数据存放在客户的浏览器上，session数据放在服务器上。

2. cookie不是很安全，别人可以分析存放在本地的cookie并进行cookie欺骗，考虑到安全应当使用session。

3. session会在一定时间内保存在服务器上。当访问增多，会比较占用你服务器的性能，考虑到减轻服务器性能方面，应当使用cookie。

4. 单个cookie保存的数据不能超过4K，很多浏览器都限制一个站点最多保存20个cookie。

5. 可以考虑将登录信息等重要信息存放为session，其他信息如果需要保留，可以放在cookie中。

6. 在程序开发过程中，我们可以在客户端每次与服务器交互时检查SessionID（Session中属性值，非HttpServlet环境开发中也可以用其它的Key值代替），用于会话管理。

- 将登陆信息等重要信息存放为SESSION

- 其他信息如果需要保留，可以放在COOKIE中，比如购物车
  
  购物车最好使用cookie，但是cookie是可以在客户端禁用的，这时候我们要使用cookie+数据库的方式实现，当从cookie中不能取出数据时，就从数据库获取。



### 6. 转发和重定向的联系和区别？

- **转发**：服务器端的跳转，路径不会发生改变（针对的是servlet），是服务器内部的处理，一次请求，请求对象不会变

- **重定向**：客户端的跳转，路径会发生改变，将要请求的路径和302重定向的状态码发给客户端浏览器，客户端浏览器将再次向服务器发出请求，不是同个请求，两次请求。

### 7. 拦截器和过滤器的区别

Spring 的拦截器与 Servlet 的 Filter 有相似之处，比如二者都是AOP编程思想的体现，都能实现权限检查、日志记录等。不同的是:

1. 使用范围不同: Filter 是 Servlet 规范规定的，只能用于Web程序中。而拦截器既可以用于Web程序，也可以用于 Application、Swing程序中。

2. 规范不同: Filter 是在 Servlet 规范中定义的，是 Servlet 容器支持的。而拦截器是在 Spring 容器内的，是 Spring 框架支持的。

3. 使用的资源不同:同其他的代码块一样，拦截器也是一个 Spring 的组件，归 Spring 管理，配置在 Spring 文件中，因此能使用 Spring 里的任何资源、对象，例如 Service 对象、数据源、事务管理等，通过 IoC 注入到拦截器即可;而Filter则不能。

4. 深度不同: Filter 在只在 Servlet 前后起作用。而拦截器能够深入到方法前后、异常抛出前后等，因此拦截器的使用具有更大的弹性。所以在 Spring 构架的程序中，要优先使用拦截器。

一张经典的图

![过滤器&拦截器](https://img-blog.csdnimg.cn/20190114155348669.png)

### 8. 三次握手和四次挥手

> 这里是字面描述

**三次握手:**

1. 客户端向服务器发出连接请求等待服务器确认

2. 服务器向客户端返回一个响应告诉客户端收到了请求

3. 客户端向服务器再次发出确认信息,此时连接建立

**四次挥手:**

1. 客户端向服务器发出取消连接请求

2. 服务器向客户端返回一个响应,表示收到客户端取消请求

3. 服务器向客户端发出确认取消信息(向客户端表明可以取消连接了)

4. 客户端再次发送确认消息,此时连接取消

### 9. TCP和UDP的区别

1. TCP ：面向连接，UDP ：面向无连接

2. TCP ：传输效率低，UDP ：传输效率高(有大小限制，一次限定在64kb之内)

3. TCP：可靠，UDP ：不可靠

### 10. 如何解决跨域问题？

跨域指的是浏览器不能执行其它网站的脚本，它是由浏览器的**同源策略**造成的，是浏览器对 JavaScript 施加的安全限制。
    
所谓同源指的是：**协议、域名、端口号**都相同，只要有一个不相同，那么都是非同源。
    
**解决方案：**

1. 使用 ajax 的 jsonp。（这一点有些人是不知道的）

2. nginx 转发：利用 nginx 反向代理，将请求分发到部署相应项目的 tomcat 服务器，当然也不存在跨域问题。

3. 使用 CORS：写一个配置类实现 WebMvcConfigurer 接口或者配置 FilterRegistrationBean。

`CORS（Cross-Origin Resource Sharing）是一个W3C标准，全称“跨域资源共享”`

### 11. 什么是 CSRF 攻击？如何防御CSRF 攻击

CSRF（Cross-site request forgery） 跨站请求伪造。CSRF 攻击是在受害者毫不知情的情况下，以受害者名义伪造请求发送给受攻击站点，从而在受害者并未授权的情况下执行受害者权限下的各种操作。

CSRF 攻击专门针对状态改变请求，而不是数据窃取，因为攻击者无法查看对伪造请求的响应。
    
目前防御 CSRF 攻击主要有三种策略：

1. 验证 HTTP Referer 字段

2. 在请求地址中添加 token 并验证

3. 在 HTTP 头中自定义属性并验证

### 12. HTTP1.0和HTTP1.1和HTTP2.0的区别

1. **HTTP1.0** ：无状态，无连接。

2. **HTTP1.1** ：长连接，请求管道化，增加缓存处理，增加 Host 字段，支持断点传输。

3. **HTTP2.0** ：二进制分帧，多路复用(连接共享)，头部压缩，服务器推送。





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

