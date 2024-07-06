---
title: 自定义注解实现AOP切面日志[源码]
icon: lightbulb
author: Wang Shiyu
category:
  - annotation
  - aop
  - log
  - java
sticky: false
star: false
---





https://github.com/Rodert/SpringBoot-javapub/tree/main/spring-boot-annotation

[toc]

# 注解

## 前言

注解是JavaEE的基础，更是在Spring中发扬光大。AOP中有大量使用。

## 说明

本案例主要通过俩个实操讲解、演示

1. 切面注解日志
2. 切面注解锁
3. 切面注解权限

后俩个分别再出一个Demo，源码全部都在gitee免费提供


## 代码讲解

![在这里插入图片描述](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202406211708380.png)

### 切面注解日志

#### 1. 新建接口

新建接口用于测试

```java
com\javapub\demo\annotation\springbootannotation\controller
```

#### 2. 引入依赖

```xml
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-aop</artifactId>
        </dependency>
```

#### 3. 注解

```java
package com.javapub.demo.annotation.springbootannotation.annotation;

/**
 * @Author: JavaPub
 * @License: https://github.com/Rodert/ https://gitee.com/rodert/
 * @Contact: https://javapub.blog.csdn.net/
 * @Date: 2022/1/25 15:22
 * @Version: 1.0
 * @Description: #自定义日志注解。
 * <p>
 * ①：什么时候使用该注解，我们定义为运行时；
 * ②：注解用于什么地方，我们定义为作用于方法上；
 * ③：注解是否将包含在 JavaDoc 中；
 * ④：注解名为 Log;
 * ⑤：定义一个属性，默认为空字符串；
 */

import java.lang.annotation.*;


@Target(ElementType.METHOD) //注解用于什么地方，我们定义为作用于方法上；
@Retention(RetentionPolicy.RUNTIME) //什么时候使用该注解，我们定义为运行时；
@Documented //注解是否将包含在 JavaDoc 中；
public @interface Log {//注解名为Log

    String value() default ""; //定义一个属性，默认为空字符串；

}
```

#### 4. AOP切点类

1. 这里实现了对自定义注解的环绕增强切点，对使用了自定义注解的方法进行AOP切面处理；

2. 对方法运行时间进行监控；

3. 对方法名，参数名，参数值，对日志描述的优化处理；

在方法上增加 **@Aspect** 注解声明切面,使用 **@Pointcut** 注解定义切点，标记方法。

使用切点增强的时机注解:**@Before (前置通知),@Around,@AfterReturning,@AfterThrowing,@After(后置通知)**

![在这里插入图片描述](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202406211708436.png)

```java
package com.javapub.demo.annotation.springbootannotation.aop;

/**
 * @Author: JavaPub
 * @License: https://github.com/Rodert/ https://gitee.com/rodert/
 * @Contact: https://javapub.blog.csdn.net/
 * @Date: 2022/1/25 15:42
 * @Version: 1.0
 * @Description: 注释式日志切面
 */

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;

import java.lang.reflect.Method;
import java.util.Arrays;

@Slf4j
@Aspect //@Aspect：声明该类为一个注解类
@Component
public class LogAspect {

    /**
     * @Pointcut：定义一个切点，后面跟随一个表达式，表达式可以定义为切某个注解，也可以切某个 package 下的方法；
     * <p>
     * 此处的切点是注解的方式，也可以用包名的方式达到相同的效果
     * '@Pointcut("execution(* com.javapub.demo.annotation.springbootannotation.*.*(..))")'
     */
    @Pointcut("@annotation(com.javapub.demo.annotation.springbootannotation.annotation.Log)")
    public void logPointCut() {
    }

    /**
     * @param joinPoint
     * @return
     * @throws Throwable
     * @Around 环绕，可以在切入点前后织入代码，并且可以自由的控制何时执行切点；
     * @Description: 这里其实应该使用 try{}catch(){}finally{} 做容错，为了代码简洁易懂就不加了
     */
    @Around("logPointCut()")
    public Object around(ProceedingJoinPoint joinPoint) throws Throwable {
        long beginTime = System.currentTimeMillis();
        // 执行方法
        Object result = joinPoint.proceed();
        // 执行时长(毫秒)
        long time = System.currentTimeMillis() - beginTime;
        //异步保存日志
        saveLog(joinPoint, time);
        return result;
    }

    void saveLog(ProceedingJoinPoint joinPoint, long time) {
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        Method method = signature.getMethod();
        String methodName = signature.getName();
        // 请求的方法名
        String className = joinPoint.getTarget().getClass().getName();
        System.out.println("**************************");
        System.out.println(method);
        log.info("------------------------接口日志-----------------------" + "\n"
                + "类名称:" + className + "\n"
                + "方法名:" + methodName + "\n"
                + "执行时间:" + time + "毫秒");
        log.info("接口参数" + "\n" + Arrays.toString(joinPoint.getArgs()));
    }

    /**
     * 在切点之前，织入相关代码；
     *
     * @param joinPoint
     */
    @Before("logPointCut()")
    public void doBeforeAdvice(JoinPoint joinPoint) {
        log.info("进入方法前执行.....");
    }

    /**
     * 在切点返回内容后，织入相关代码，一般用于对返回值做些加工处理的场景；
     *
     * @param ret
     */
    @AfterReturning(returning = "ret", pointcut = "logPointCut()")
    public void doAfterReturning(Object ret) {
        log.info("方法的返回值 : {}", ret);
    }

    /**
     * 用来处理当织入的代码抛出异常后的逻辑处理;
     */
    @AfterThrowing("logPointCut()")
    public void throwss(JoinPoint jp) {
        log.info("方法异常时执行.....");
    }


    /**
     * 后置最终通知,final增强，不管是抛出异常或者正常退出都会执行
     */
    @After("logPointCut()")
    public void after(JoinPoint jp) {
        log.info("方法最后执行.....");
    }
}
```

## 测试

http://127.0.0.1:9001/order/order-info?id=1

http://127.0.0.1:9001/order/order-info-2/1

源码仓库：https://gitee.com/rodert/SpringBoot-javapub/tree/main/spring-boot-annotation

![在这里插入图片描述](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202406211708904.png)




