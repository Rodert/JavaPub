---
title: volatile关键字的作用
icon: lightbulb
author: Wang Shiyu
category:
  - volatile
  - java
sticky: false
star: false
---




**引言**：以前只是看过介绍 `volatile` 的文章，对其的理解也只是停留在理论的层面上，由于最近在项目当中用到了关于并发方面的技术，所以下定决心深入研究一下java并发方面的知识。网上关于volatile的文章非常多，但是并没有讲解非常详细的文章。（哪位要是有好的资料麻烦共享一份给我！）多数的都是一些理论讲解，没有实际的例子代码，就算有代码的也测试不出效果，总之理论总是与代码不匹配。

后来在我不懈的努力之下总算研究出一些成果，在此分享给大家！如果大家发现有错误的地方欢迎大家指正，谢谢！

在Java线程并发处理中，有一个关键字 volatile 的使用目前存在很大的混淆，以为使用这个关键字，在进行多线程并发处理的时候就可以万事大吉。

---

Java 语言是支持多线程的，为了解决线程并发的问题，在语言内部引入了` 同步块(synchronized)` 和 `volatile` 关键字机制。



synchronized(不做过多解释)

同步块大家都比较熟悉，通过 synchronized 关键字来实现，所有加上synchronized 和 块语句，在多线程访问的时候，同一时刻只能有一个线程能够用

synchronized 修饰的方法 或者 代码块。

 

**volatile**

用 volatile 修饰的变量，线程在每次使用变量的时候，都会读取变量修改后的最的值。volatile 很容易被误用，用来进行原子性操作。

 

如果要深入了解 volatile 关键字的作用，就必须先来了解一下 JVM 在运行时候的内存分配过程。

 

在 java 垃圾回收整理一文中，描述了 jvm 运行时刻内存的分配。其中有一个内存区域是 jvm 虚拟机栈，每一个线程运行时都有一个线程栈，

 

线程栈保存了线程运行时候变量值信息。当线程访问某一个对象时候值的时候，首先通过对象的引用找到对应在堆内存的变量的值，然后把堆内存

 

变量的具体值load到线程本地内存中，建立一个变量副本，之后线程就不再和对象在堆内存变量值有任何关系，而是直接修改副本变量的值，

 

在修改完之后的某一个时刻（线程退出之前），自动把线程变量副本的值回写到对象在堆中变量。这样在堆中的对象的值就产生变化了。下面一幅图

 

描述这写交互！

 

![JVM在运行时候的内存分配过程](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202406211645029.png)

 

那么在了解完JVM在运行时候的内存分配过程以后，我们开始真正深入的讨论volatile的具体作用

请看代码:

 

```java
public class VolatileTest extends Thread {

    boolean flag = false;
    int i = 0;

    public void run() {
        while (!flag) {
            i++;
        }
    }

    public static void main(String[] args) throws Exception {
        VolatileTest vt = new VolatileTest();
        vt.start();
        Thread.sleep(2000);
        vt.flag = true;
        System.out.println("stope" + vt.i);
    }
}
```


上面的代码是通过标记flag来控制 VolatileTest 线程 while 循环退出的例子!

下面让我用伪代码来描述一下我们的程序

1. 首先创建 VolatileTest vt = new VolatileTest();
2. 然后启动线程 vt.start();
3. 暂停主线程2秒（Main） Thread.sleep(2000);
4. 这时的 vt 线程已经开始执行，进行i++;
5. 主线程暂停2秒结束以后将 vt.flag = true;
6. 打印语句 System.out.println("stope" + vt.i); 在此同时由于 vt.flag 被设置为 true,所以 vt 线程在进行下一次 while 判断 while (!flag) 返回假 结束循环 vt 线程方法结束退出！
7. 主线程结束

上面的叙述看似并没有什么问题，“似乎”完全正确。那就让我们把程序运行起来看看效果吧，执行 mian 方法。2 秒钟以后控制台打印 `stope-202753974`。

可是奇怪的事情发生了 程序并没有退出。vt 线程仍然在运行，也就是说我们在主线程设置的 `vt.flag = true;`没有起作用。


> 在这里我需要说明一下，有的同学可能在测试上面代码的时候程序可以正常退出。那是因为你的JVM没有优化造成的！在DOC下面输入 java -version 查看 如果显示Java HotSpot(TM) ... Server 则JVM会进行优化。

*如果显示Java HotSpot(TM) ... Client 为客户端模式，需要设置成Server模式  设置方法问Google*

![java-version](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202406211646042.png)


**问题出现了，为什么我在主线程（main）中设置了vt.flag = true; 而vt线程在进行判断flag的时候拿到的仍然是false?**

 


那么按照我们上面所讲的 “JVM在运行时候的内存分配过程” 就很好解释上面的问题了。

首先 vt线程在运行的时候会把 变量 flag 与 i (代码3,4行) 从“主内存”  拷贝到 线程栈内存（上图的线程工作内存）

然后 vt 线程开始执行 while 循环 


```java
 7         while (!flag) {
 8             i++;
 9         }
```

while (!flag) 进行判断的 flag 是在线程工作内存当中获取，而不是从 “主内存”中获取。

i++; 将线程内存中的 i++; 加完以后将结果写回至 "主内存"，如此重复。

 

然后再说说主线程的执行过程。 我只说明关键的地方 

vt.flag = true;

主线程将 `vt.flag` 的值同样 从主内存中拷贝到自己的线程工作内存 然后修改 `flag=true`. 然后再将新值回到主内存。

这就解释了为什么在主线程（main）中设置了 `vt.flag = true;` 而 vt 线程在进行判断 flag 的时候拿到的仍然是 false。那就是因为vt线程每次判断flag标记的时候是从它自己的“工作内存中”取值，而并非从主内存中取值！

这也是 JVM 为了提供性能而做的优化。那我们如何能让 vt 线程每次判断 flag 的时候都强制它去主内存中取值呢。这就是 volatile 关键字的作用。

再次修改我们的代码

```java
public class VolatileTest extends Thread {
    
    volatile boolean flag = false;
    int i = 0;
    
    public void run() {
        while (!flag) {
            i++;
        }
    }
    
    public static void main(String[] args) throws Exception {
        VolatileTest vt = new VolatileTest();
        vt.start();
        Thread.sleep(2000);
        vt.flag = true;
        System.out.println("stope" + vt.i);
    }
}
```

在 flag 前面加上 volatile 关键字，强制线程每次读取该值的时候都去“主内存”中取值。在试试我们的程序吧，已经正常退出了。


![可见性-volatile写](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202406211646313.png)


