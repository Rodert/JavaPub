---
title: 接口设计这11点要注意
icon: lightbulb
author: Wang Shiyu
date: 2022-07-04
category:
  - 编程规范
  - 接口
tag:
  - 编程规范
  - 接口
---




> 标题： 接口设计这11点要注意 ｜ 接口设计军规 | 干了3年程序员，老板让我这样写接口 | 11条军规，让你的接口设计无可挑剔


![cover](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202405211115020.jpg)



作为后端工程师，多数情况都是给别人提供接口，写的好不好使你得重视起来。

![74076262d8f14d5390e1ba557e0296a0](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202405171707202.jpeg)

最近我手头一些活，需要和外部公司对接，我们需要提供一个接口文档，这样可以节省双方时间、也可以防止后续扯皮。这是就要考验我的接口是否规范化。



![接口设计规范JavaPub](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202405211059259.png)


### 1. 接口名称清晰、明确

顾名思义，接口是做什么的，是否准确、清晰？让使用这一眼就能知道这个接口在做什么，力求言简意赅。比如：**查询用户信息**，简单明了。

![img](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202405211017176.jpeg)

### 2. 接口路径规整

接口地址，也就是接口的 `URL` 路径。当别人调用你的接口，就是通过 `URL` 配合请求时参数来调用。比如： `/api/user/queryById` 。一般来说，接口地址的命名也要可以大概看出接口的作用，比如前面这个接口，它是作用使用：**通过用户id查询用户信息**。

除了接口路径，还需要指明接口的域名或IP。以 http 协议为例、端口是 8080，当我请求 javapub 的用户中心信息时：  

> https://javapub.net.cn:8080/api/user/queryById

![4677eb13-b696-43be-b530-60766742a4e3](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202405211023485.jpeg)


### 3. 请求方式规范

请求方式常用的有如下几种：

- GET（SELECT）：从服务器取出资源，通常用于查询数据（一项或多项）。
- POST（CREATE）：在服务器新建一个资源，通常用在新增、修改、删除操作。
- PUT（UPDATE）：在服务器更新资源，通常用于更新数据（客户端提供改变后的完整资源）。
- PATCH（UPDATE）：在服务器更新资源，通常用于修改部分数据（客户端提供改变的属性）。
- DELETE（DELETE）：从服务器删除资源，通常用于删除数据。

这么多请求方式，多数中小公司只用 `GET 和 POST`，可能还有些公司只用 `POST`。但是选择合适的请求方式可以提升开发效率、并且让我们的接口更容易复用。

不管用哪种，一定要写清楚。

![eb21c081-f26c-4c8c-9197-4a35573e8b04](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202405211025708.jpeg)


### 4. 接口详细说明

如果是非常简单的接口，通过接口名就可以了解个大概。如果是一些非常复杂的接口，就一定要添加详细说明文档，包括功能描述、请求参数、请求相应参数等信息。

力求言简意赅，通过入参、做了什么动作、返回哪些值。

![006r3PQBjw1fb5h84baewj306404lmx9](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202405211026412.jpg)

### 5. 编写接口请求示例

接口文档需要提供接口示例，接口实例是为了帮助调用者理解接口的使用方法和调用流程，快速开始调试程序。一般是 `CURL` 格式的示例。

```BASH
curl javapub.net.cn
```

![img](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202405211028827.jpeg)


### 6. 引入接口版本管理

随着功能开发的日趋完善，可能对接口做出修改更新，例如添加、删除时变更参数，或者修改返回值的格式。这些新变更可能影响用户的 API 使用体验，造成现有客户端无法使用。

```BASH
https://javapub.net.cn:8080/api/user/v1/queryById

https://javapub.net.cn:8080/api/user/v2/queryById
```

![56d7cbc6-0b2c-4a90-ac37-a8e65c040d47](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202405211037091.jpeg)




### 7. 维护接口文档版本更新

如果接口发生了变更，接口文档也要做出相应调整，维护文档。比如**错误码更新、参数类型变更**等，要明确记录。

| 日期 | 变更内容 | 责任人 |
|-------|-------|-------|
| 2028-03-01 | 创建接口文档，定义基本数据结构。 | JavaPub |
| 2028-05-10 | V2.0用户中心接口更新 | 王哥 |

![b4fe3684d20e97fa311ca213c8dc7ea9](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202405211033526.jpeg)

### 8. 明确请求头有哪些

接口文档，要写清楚请求头信息，比如：有权限校验的接口请求，在请求头中 `apiKey`。还有一些参数是 JSON 的，要设置 `application/json`。

- Accept：指定客户端能够接收的内容类型，如：`Accept: text/plain, text/html`。
- Authorization：一般存放令牌信息，如：`Authorization: Basic QzPhZGRpbjpvcGVuIHNlc2FtZQ==`
- Cookie：存放 `Cookie` 信息。
- User-Agent：指定客户端信息，作为服务端处理时定制化。
- Accept-Encoding：指定客户端允许的数据压缩格式，如 `gzip、deflate` 等。

![image-20240521104426851](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202405211044984.png)


### 9. 接口安全

有些接口参数涉及到隐私和敏感数据、需要**参数加密**做好**脱敏处理**和说明。此外，还要做好**接口授权访问，防止出现拖库、击穿**等P0问题。

![image-20240521104647299](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202405211046630.png)




### 10. 接口测试

在编写接口文档时，编写测试案例也要给出测试数据，包括请求参数和返回结果。让调用者有一个预期，节省沟通成本。

![image-20240521105043027](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202405211050008.png)




### 11. 定义错误码

接口文档，一定要错误码，错误码作为程序重要的参考，让下游知道什么时候做什么动作。比如：当查询不到用户信息时，可以提示它跳转到注册页面。

| 错误码 | 名称 | 说明 |
|-------|-------|-------|
| 1001 | 参数错误 | 参数不合法 |
| 1002 | 数据库错误 | 数据库请求出错 |

![image-20240521104901378](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202405211049771.png)



