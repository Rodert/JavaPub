---
title: 后端返回值结构体定义
icon: circle-info
category:
  - 项目实战
  - 《用户中心》
tag:
  - 项目实战
  - 用户管理系统
---




## 《用户中心》

[介绍文档](https://kazjsfecs3y.feishu.cn/wiki/QJDwwM5bbi2nT9k6laycWm4ynad)







在后端接口封装中，我们一般都会对返回的数据做一个封装，以防止系统出现不可预期的数据结构和类型。比如这样：

结构体 1

```json
{
  "success": true,
  "code": 200,
  "message": "成功",
  "data": {
    "items": [
      {
        "id": "1",
        "name": "小王",
        "identified": "JavaPub博主"
      }
    ]
  }
}
```

结构体 2

```json
{
    "ret": 200,
    "data": {
        "title": "Default Api",
        "content": "王哥 您好，欢迎使用 apifather!",
        "version": "1.1.0",
        "time": 14231428021
    },
    "msg": ""
}
```

不论如何定义，多一个或少一个字段，我们都需要统一规范。接下来我们拆解一下，

首先，通过观察，一定要有状态码，也就是案例中的 `code` 和 `ret` ，通过状态码可以知道当前程序哪里出了问题，比如 `200` 就是成功。有同学会问，为何不用 `data` 来判断，为空或者为 `0` 就是错误，当然不行。

比如：下面这个结构，`data` 长度虽然等于 `0`，但是这属于确实没查到数据，而不是程序出错。


```json
{
    "ret": 200,
    "data": [],
    "msg": ""
}
```

再看 `data`，这个毋庸置疑，它是接口的核心数据，也是接口对外提供的业务数据。

再看 `message` 或者称为 `msg`，它是给状态做一个文字说明。比如，有个老六在定义了一个状态码（666），第一次调用这个接口的同学可能并不知道返回的状态码含义、也不想去查接口文档，我加个描述：（老六的接口不通啦），调用者就一目了然了。

最后看 `success` 字段，这个字段是为了更规范而加的，方便前端直接将接口响应状态展示。比如：用户登录成功，可以展示一个 `true`，或者前端在判断时也可以写更简洁的代码 `if result.success:`。毕竟将（老六的接口不通啦）描述直接展示出来显得不太正式。


基于以上几点，我们的返回结构这样定义：

`ApiResponse.class`

```java
// 定义API响应结构体
public class ApiResponse<T> {
    private int status; // HTTP状态码
    private String message; // 状态信息
    private T data; // 返回的数据，泛型支持返回不同类型的数据

    // 构造函数
    public ApiResponse(ResponseStatus status) {
        this.status = status.getCode();
        this.message = status.getMessage();
    }

    // 带数据的构造函数
    public ApiResponse(ResponseStatus status, T data) {
        this(status);
        this.data = data;
    }

    // Getter和Setter方法
    // ...
}
```

定义完返回结构后，我们需要定义状态的枚举值。这是为了定一个统一的规范，方便开发时状态码搞混。

```java
// 定义状态码枚举
public enum ResponseStatus {
    SUCCESS(200, "操作成功"),
    ERROR(500, "服务器内部错误"),
    BAD_REQUEST(400, "请求参数错误"),
    NOT_FOUND(404, "资源未找到"),
    UNAUTHORIZED(401, "未授权"),
    FORBIDDEN(403, "禁止访问");

    private final int code;
    private final String message;

    ResponseStatus(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public int getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}
```

如何使用呢

```java
@GetMapping("/users/{id}")
public ResponseEntity<ApiResponse<User>> getUser(@PathVariable Long id) {
    try {
        User user = userService.getUserById(id);
        if (user != null) {
            return ResponseEntity.ok(new ApiResponse<>(ResponseStatus.SUCCESS, user));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                 .body(new ApiResponse<>(ResponseStatus.NOT_FOUND));
        }
    } catch (Exception e) {
        // 这里可以根据异常类型返回不同的错误状态码和消息
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                             .body(new ApiResponse<>(ResponseStatus.ERROR));
    }
}
```


这里使用了 Spring 自带的返回结构体 `ResponseEntity` 进行封装。

获取到的结果是这样的：

```json
{
  "code": 200,
  "message": "操作成功",
  "data": {
    "id": "1",
    "name": "javapub",
    "age": 18
  }
}
```






原文地址： [https://javapub.net.cn/star/project/user-center/](https://javapub.net.cn/star/project/user-center/)


