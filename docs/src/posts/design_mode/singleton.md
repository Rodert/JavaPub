---
title: 单例模式-生产环境用法
icon: lightbulb
category:
  - 单例模式
tag:
  - 单例模式
---






大家好，我是JavaPub！

`最近各大互联网公司都传出裁员消息，各个自媒体更是跟风传着各种小道消息，好像寒冬马上要侵蚀整个IT行业。我认为作为提高生产力的技术，永远都会走在发展的最前沿。作为一个技术人，打铁还要自身硬。`


```
1. 当被问到你知道哪些设计模式？
2. 你在代码使用了那些设计模式？
3. 你是怎么怎么使用的？
```

---

![在这里插入图片描述](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202406211729825.png)

单例模式是最常见的设计模式之一

相信没有一个攻城狮不懂单例模式，本篇介绍如何在生产环境使用单例模式

[toc]

## 为什么使用单例模式

对于软件系统的某些类，它可能是全局使用，无需频繁创建销毁。例如创建、销毁代价比较大的数据库连接，会浪费大量资源。

单例最有代表就是我们耳熟能详的 windows 任务管理器，无论我们创建多少次，总是打开一个窗口。1. 如果打开多个重复的窗口，那就是对资源的浪费，资源是宝贵的。2. 多个窗口还要保证一致性，否则谁也不知道谁对谁错。

![在这里插入图片描述](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202406211729495.png)
所以，就有个单例模式的用武之地

## 实现
**定义**：确保一个类只有一个实例，并提供一个全局访问点。
![在这里插入图片描述](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202406211730794.png)

单例模式又可以分为预加载和懒加载。当然我们在生产环境中一般使用较多的是 **线程安全+懒加载**。下文会提及单例的演变过程，你可以直接看最后一个案例，快速掌握生产环境中实战要点。JavaPub为金九银十助力，淦 


#### 预加载
```java
package com.javapub.schema;

/**
 * 预加载 单例模式
 * JavaPub
 */
public class PreloadSingleton {

    public static PreloadSingleton instance = new PreloadSingleton();

    // 其他的类无法实例化单例类的对象
    private PreloadSingleton() {
    }

    public static PreloadSingleton getInstance() {
        return instance;
    }
}
```

上面这种写法可以保证线程安全。

但是对象还没有使用时就被创建，很明显这种写法会造成资源浪费。

#### 懒加载

```java
package com.javapub.schema;

/**
 * 懒加载 单例模式
 * JavaPub
 */
public class LazyLoadingSingleton {

    private static LazyLoadingSingleton instance = null;

    private LazyLoadingSingleton() {
    }

    public static LazyLoadingSingleton getInstance() {
        if (instance == null) {
            instance = new LazyLoadingSingleton();
        }
        return instance;
    }
}
```

懒加载显然是不能保证线程安全的，在Java实例化对象会分为三步，**JVM为了提高程序执行性能，会对没有依赖关系的代码进行重排序**。

> 1. 初始化内存空间
> 2. 初始化对象
> 3. 设置instance实例指向刚分配的内存空间


## Java
#### 懒加载+线程安全

`synchronized` 关键字是我们处理线程安全的一个利器，加载 `getInstace()` 函数可以保证线程安全。但是，如果要经常的调用 getInstance() 方法，不管有没有初始化实例，都会唤醒和阻塞线程。为了避免线程的上下文切换消耗大量时间，如果对象已经实例化了，我们没有必要再使用 synchronized 加锁，直接返回对象。经过如上分析

#### Sychronized 
如上分析，我们把锁加在 `if (instance == null) ` 里面，保证instance未实例化的时候才加锁
```java
package com.javapub.schema;

/**
 * 单例模式 线程安全
 * JavaPub
 */
public class SychronizedSingleton {
    private static SychronizedSingleton instance = null;

    private SychronizedSingleton() {
    }

    public static synchronized SychronizedSingleton getInstance() {
        if (instance == null) {
            synchronized (SychronizedSingleton.class) {
                if (instance == null) {
                    instance = new SychronizedSingleton();
                }
            }
        }
        return instance;
    }
}
```

#### Sychronized + Volatile 

上面我们了解过，Java 在 new 一个对象是无法保证顺序性的。因此我们需要另一个关键字**Volatile**保证对象实例化过程中的顺序性。

```java
package com.javapub.schema;

/**
 * 单例模式 线程安全 synchronized volatile
 * JavaPub
 */
public class Singleton {
    private static volatile Singleton instance = null;

    private Singleton() {
    }

    public static synchronized Singleton getInstance() {
        if (instance == null) {
            synchronized (Singleton.class) {
                if (instance == null) {
                    instance = new Singleton();
                }
            }
        }
        return instance;
    }
}
```




网络讲解设计模式的文章有很多，但是真正在生产环境中怎么用确一直不被大多数人掌握，所以最近想更新一个系列文章，专门针对设计模式在生产环境怎么用，让更多攻城狮在极客之路提供一点点思路。--- 


