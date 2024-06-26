---
### 这是侧边栏索引
index: true
### 这是页面的图标
icon: page
### 这是文章的标题
title: 10道不得不会的Java并发基础面试题
### 设置作者
author: Wang Shiyu
### 设置写作时间
date: 2022-04-21
### 一个页面可以有多个分类
category:
  - 最少必要面试题
### 一个页面可以有多个标签
tag:
  - java
  - 面试题
##
---

Java并发

<!-- more -->

10道不得不会的Java并发基础面试题

以下都是Java的并发基础面试题，相信大家都会有种及眼熟又陌生的感觉、看过可能在短暂的面试后又马上忘记了。**JavaPub**在这里整理这些容易忘记的重点知识及**解答**，`建议收藏，经常温习查阅`。

评论区见


@[toc]

---

### 1. start()方法和run()方法的区别

如果只是调用 run() 方法，那么代码还是同步执行的，必须等待一个线程的run()方法里面的代码全部执行完毕之后，另外一个线程才可以执行其run()方法里面的代码。

只有调用了start()方法，才会表现出多线程的特性，不同线程的run()方法里面的代码交替执行。

参考图：

![在这里插入图片描述](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/2024%2F06%2F15%2F20240615-094050.png)


---

### 2. volatile关键字的作用
volatile `英 [ˈvɒlətaɪl]` ，第一个想到的一定是**保证内存可见性**（Memory Visibility）。可见性是性对于线程而言。

![在这里插入图片描述](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/2024%2F06%2F15%2F20240615-094053.png)
上图是Java内存模型，所有线程的共享变量都放在主内存中，每一个线程都有一个独有的工作内存，每个线程不直接操作在主内存中的变量，而是将主内存上变量的副本放进自己的工作内存中，只操作工作内存中的数据。当修改完毕后，再把修改后的结果放回到主内存中。每个线程都只操作自己工作内存中的变量，无法直接访问对方工作内存中的变量，线程间变量值的传递需要通过主内存来完成。

很明显，在并发环境下一定会发生脏数据问题。

使用volatile变量能够保证:

1. 每次读取前必须先从主内存刷新最新的值。
2. 每次写入后必须立即同步回主内存当中。

> 也就是说，volatile关键字修饰的变量看到的随时是自己的最新值。

**防止指令重排**

在基于偏序关系的Happens-Before内存模型中，指令重排技术大大提高了程序执行效率。但是也引入一个新问题：被部分初始化的对象

例子：

```java
创建一个对象
instance = new Singleton();
```

它并不是一个原子操作。事实上，它可以”抽象“为下面几条JVM指令：

```java
memory = allocate();    //1：分配对象的内存空间
initInstance(memory);   //2：初始化对象
instance = memory;      //3：设置instance指向刚分配的内存地址
```

上面操作2依赖于操作1，但是操作3并不依赖于操作2，所以JVM可以以“优化”为目的对它们进行重排序，经过重排序后如下：

```java
memory = allocate();    //1：分配对象的内存空间
instance = memory;      //3：设置instance指向刚分配的内存地址（此时对象还未初始化）
initInstance(memory);   //2：初始化对象
```

可以看到指令重排之后，操作 3 排在了操作 2 之前，即引用instance指向内存memory时，这段崭新的内存还没有初始化。由于instance已经指向了一块内存空间，从而返回 instance!=null，用户得到了没有完成初始化的“半个”单例。

但是有一点：volatile不保证原子性。

> 这里有一篇生产环境使用volatile的例子：https://mp.weixin.qq.com/s/s1cwut9WvUSrMYw_6UK3sg

---

### 3. sleep方法和wait方法有什么区别

要了解sleep和wait，首先需要了解Java线程的6种状态。

```java
#下面是Java线程的6种状态
1. 初始(NEW)：新创建了一个线程对象，但还没有调用start()方法。
2. 运行(RUNNABLE)：Java线程中将就绪（ready）和运行中（running）两种状态笼统的称为“运行”。
线程对象创建后，其他线程(比如main线程）调用了该对象的start()方法。该状态的线程位于可运行线程池中，等待被线程调度选中，获取CPU的使用权，此时处于就绪状态（ready）。就绪状态的线程在获得CPU时间片后变为运行中状态（running）。
3. 阻塞(BLOCKED)：表示线程阻塞于锁。
4. 等待(WAITING)：进入该状态的线程需要等待其他线程做出一些特定动作（通知或中断）。
5. 超时等待(TIMED_WAITING)：该状态不同于WAITING，它可以在指定的时间后自行返回。
6. 终止(TERMINATED)：表示该线程已经执行完毕。
```

**sleep** 休眠方法

```java
static void sleep(long ms)
```

该方法会使当前线程进入阻塞状态指定毫秒，当阻塞指定毫秒后，当前线程会重新进入Runnable状态，等待划分时间片。

sleep方法属于Thread类中方法，表示让一个线程进入睡眠状态，等待一定的时间之后，自动醒来进入到可运行状态，不会马上进入运行状态，因为线程调度机制恢复线程的运行也需要时间，一个线程对象调用了sleep方法之后，并不会释放他所持有的所有对象锁，所以也就不会影响其他进程对象的运行。

**wait** 方法一般是跟notify方法连用的

多线程之间需要协调工作。如果条件不满足则等待。当条件满足时，等待该条件的线程将被唤醒。在Java中，这个机制实现依赖于wait/notify或wait/notifyAll。

object.wait()让当前线程进入不可运行状态，如sleep()一样，但不同的是wait方法从一个对象调用，而不是从一个线程调用；我们称这个对象为“锁定对象（lockObj）”。在lockObj.wait()被调用之前，当前线程必须在lockObj上同步（synchronize）；然后调用wait()后释放这个锁，并将线程增加到与lockObj相关的“等待名单（wait list）”。然后，另一个在同一个lockObj锁定（synchronize）的方法可以调用lockObj.nofity()。这会唤醒原来等待的线程。基本上，wait() / notify()就像sleep() / interrupt()，只是活动线程不需要直接指向一个睡眠线程，他们只需要共享锁对象（lockObj）。

到这里你是否明白这个问题，如果不明白来JavaPub，后续一篇代码分析，马上安排。

---

### 4. 如何停止一个正在运行的线程？

最直观的一定是 Thread.stop，但是它是不推荐的，并且已经废弃。看一下官方说明
https://docs.oracle.com/javase/8/docs/technotes/guides/concurrency/threadPrimitiveDeprecation.html

```java
*   	This method is inherently unsafe.   Stopping a thread with 
*       Thread. stop causes it to unlock all of the monitors that it 
*       has locked (as a natural consequence of the unchecked 
*       <code>ThreadDeath</code> exception propagating up the stack).   If 
*       any of the objects previously protected by these monitors were in 
*       an inconsistent state, the damaged objects become visible to 
*       other threads, potentially resulting in arbitrary behavior.   Many 
*       uses of <code>stop</code> should be replaced by code that simply 
*       modifies some variable to indicate that the target thread should 
*       stop running.   The target thread should check this variable 
*       regularly, and return from its run method in an orderly fashion 
*       if the variable indicates that it is to stop running.   If the 
*       target thread waits for long periods (on a condition variable, 
*       for example), the <code>interrupt</code> method should be used to 
*       interrupt the wait.
```
小结：
简单来说，Thread.stop()不安全，已不再建议使用。

**方法一：**

使用 interrupt 方法中断线程。

interrupt()方法的使用效果并不像for+break语句那样，马上就停止循环。调用interrupt方法是在当前线程中打了一个停止标志，并不是真的停止线程。

需要 this.isInterrupted(): 测试线程是否真的已经中断。

**方法二：**

最好的一种方法，使用标志位停止。

run() 方法中做标识符，保证优雅的停止服务。

---

### 5. java如何实现多线程之间的通讯和协作？(如何在两个线程间共享数据？)
**volatile关键字方式**

volatile有两大特性，一是可见性，二是有序性，禁止指令重排序，其中可见性就是可以让线程之间进行通信。

**等待/通知机制**

等待通知机制是基于wait和notify方法来实现的，在一个线程内调用该线程锁对象的wait方法，线程将进入等待队列进行等待直到被通知或者被唤醒。

也就是通过**等待/通知机制** 让多个线程协作

**join方式**

join其实合理理解成是线程合并，当在一个线程调用另一个线程的join方法时，当前线程阻塞等待被调用join方法的线程执行完毕才能继续执行，所以join的好处能够保证线程的执行顺序，但是如果调用线程的join方法其实已经失去了并行的意义，虽然存在多个线程，但是本质上还是串行的，最后join的实现其实是基于等待通知机制的。

**threadLocal方式**

threadLocal方式的线程通信，不像以上三种方式是多个线程之间的通信，它更像是一个线程内部的通信，将当前线程和一个map绑定，在当前线程内可以任意存取数据，减省了方法调用间参数的传递。

---

### 6. 什么是ThreadLocal?

定义：线程局部变量是局限于线程内的变量，属于线程自身所有，不在多个线程间共享。java提供 ThreadLocal类 来支持线程局部变量，是一个实现线程安全的方式。

作用：ThreadLocal 是一种以空间换时间的做法，在每一个 Thread 里面维护了一个 ThreadLocal.ThreadLocalMap 把数据进行隔离，数据不共享，自然就没有线程安全方面的问题了。

---

### 7. Java 中 CountDownLatch 和 CyclicBarrier 有什么不同？

**概念：**

**CountDownLatch** 是一个同步的辅助类，允许一个或多个线程，等待其他一组线程完成操作，再继续执行。简单来说：CountDownLatch 是一个计数器，可以保证线程之间的顺序执行把线程从并发状态调整为串行状态保证了线程的执行顺序。(只可以使用一次)

**CyclicBarrier** 是一个同步的辅助类，允许一组线程相互之间等待，达到一个共同点，再继续执行。典型场景：可以用于多线程计算数据，最后合并计算结果。（可以多次使用）



分享一个直观的代码：

```java
package com.javapub.test;

import java.util.concurrent.CountDownLatch;

/**
 * @Author: JavaPub
 * @License: https://github.com/Rodert/
 * @Contact: https://javapub.blog.csdn.net/
 * @Date: 2022/1/1 16:50
 * @Version: 1.0
 * @Description: countDownLatch 可以保证线程之间的顺序执行把线程从并发状态调整为串行状态保证了线程的执行顺序。
 * demo效果：当打印完B，再打印C。
 */

class ThreadA extends Thread {

    private CountDownLatch down;

    public ThreadA(CountDownLatch down) {
        this.down = down;
    }

    @Override
    public void run() {
        System.out.println("A");
        try {
            down.await();//相当于wait(),调用await()方法的线程会被挂起，它会等待直到count值为0才继续执行
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("C");
    }
}

class ThreadB extends Thread {
    private CountDownLatch down;

    public ThreadB(CountDownLatch down) {
        this.down = down;
    }

    @Override
    public void run() {
        System.out.println("B");
        System.out.println(down.getCount());
        down.countDown();//将count值减1
    }
}

public class Test {
    public static void main(String[] args) {
        CountDownLatch down = new CountDownLatch(1);//创建1个计数器
        new ThreadA(down).start();
        new ThreadB(down).start();
    }
}

/*输出
A
B
C
 */
```

```java
package com.roundyuan.fanggateway.test;

import java.util.concurrent.CyclicBarrier;

/**
 * @Author: JavaPub
 * @License: https://github.com/Rodert/
 * @Contact: https://javapub.blog.csdn.net/
 * @Date: 2022/1/2 13:42
 * @Version: 1.0
 * @Description: CyclicBarrier
 */

public class CyclicBarrierDemo {

    static class TaskThread extends Thread {

        CyclicBarrier barrier;

        public TaskThread(CyclicBarrier barrier) {
            this.barrier = barrier;
        }

        @Override
        public void run() {
            try {
                Thread.sleep(1000);
                System.out.println(getName() + " 到达栅栏 A");
                barrier.await();
                System.out.println(getName() + " 冲破栅栏 A");

                Thread.sleep(2000);
                System.out.println(getName() + " 到达栅栏 B");
                barrier.await();
                System.out.println(getName() + " 冲破栅栏 B");
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    public static void main(String[] args) {
        int threadNum = 5;
        CyclicBarrier barrier = new CyclicBarrier(threadNum, new Runnable() {

            @Override
            public void run() {
                System.out.println(Thread.currentThread().getName() + " 完成最后任务");
            }
        });

        for (int i = 0; i < threadNum; i++) {
            new TaskThread(barrier).start();
        }
    }
}

/*
Thread-3 到达栅栏 A
Thread-1 到达栅栏 A
Thread-4 到达栅栏 A
Thread-2 到达栅栏 A
Thread-0 到达栅栏 A
Thread-2 完成最后任务
Thread-2 冲破栅栏 A
Thread-0 冲破栅栏 A
Thread-4 冲破栅栏 A
Thread-3 冲破栅栏 A
Thread-1 冲破栅栏 A
Thread-4 到达栅栏 B
Thread-0 到达栅栏 B
Thread-2 到达栅栏 B
Thread-1 到达栅栏 B
Thread-3 到达栅栏 B
Thread-3 完成最后任务
Thread-3 冲破栅栏 B
Thread-0 冲破栅栏 B
Thread-4 冲破栅栏 B
Thread-1 冲破栅栏 B
Thread-2 冲破栅栏 B
 */
```

网上看到一个比较形象一个例子：

```
CountDownLatch：
宿管阿姨，晚上关宿舍大门睡觉，需要等到所有学生回寝，才能关门睡觉，学生之间不用相互等待，回寝就能睡觉。	（学生就是各个线程，宿管阿姨就是监听CountDownLatch为0后要执行的。）

CyclicBarrier：
家庭聚餐，等待家庭成员到齐才能开饭，家庭成员之间需要相互等待，直到最后一个到达，才能同时开饭。
```


---

### 8. 如何避免死锁？
![](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/2024%2F06%2F15%2F20240615-093536.png)
从上图我们就可以看出，产生死锁就是俩个或多个线程在申请资源时，自己需要的资源别别人持有、并阻塞。所以导致死锁。

**如何解决：**

1. 减小锁的范围，尽量保证之锁定自己需要的资源，减小交叉持有资源情况
2. 但是有些时候不得不持有多个资源，比如**银行转账**，我们必须同时获得两个账户上的锁，才能进行操作，两个锁的申请必须发生交叉。这时我们也可以打破死锁的那个闭环，在涉及到要同时申请两个锁的方法中，总是以相同的顺序来申请锁，比如总是先申请 id 大的账户上的锁 ，然后再申请 id 小的账户上的锁，这样就无法形成导致死锁的那个闭环。
3. 我们知道导致死锁有一个因素是阻塞，所以如果我们不使用默认阻塞的锁，也是可以避免死锁的。我们可以使用 ReentrantLock.tryLock() 方法，在一个循环中，如果 tryLock() 返回失败，那么就释放以及获得的锁，并睡眠一小段时间。这样就打破了死锁的闭环。

```java
package com.roundyuan.fanggateway.test;

import java.util.Random;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

/**
 * @Author: JavaPub
 * @License: https://github.com/Rodert/
 * @Contact: https://javapub.blog.csdn.net/
 * @Date: 2022/1/2 14:38
 * @Version: 1.0
 * @Description: ReentrantLock
 */

public class DeadLock {

    private static Lock lock1 = new ReentrantLock();
    private static Lock lock2 = new ReentrantLock();

    public static void deathLock() {
        new Thread() {
            @Override
            public void run() {
                while (true) {
                    if (lock1.tryLock()) {
                        try {
                            //如果获取成功则执行业务逻辑，如果获取失败，则释放lock1的锁，自旋重新尝试获得锁
                            if (lock2.tryLock()) {
                                try {
                                    System.out.println("Thread1：已成功获取 lock1 and lock2 ...");
                                    break;
                                } finally {
                                    lock2.unlock();
                                }
                            }
                        } finally {
                            lock1.unlock();
                        }
                    }
                    System.out.println("Thread1：获取锁失败，重新获取---");
                    try {
                        //防止发生活锁
                        TimeUnit.NANOSECONDS.sleep(new Random().nextInt(100));
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
            }
        }.start();

        new Thread() {
            @Override
            public void run() {
                while (true) {
                    if (lock2.tryLock()) {
                        try {
                            //如果获取成功则执行业务逻辑，如果获取失败，则释放lock2的锁，自旋重新尝试获得锁
                            if (lock1.tryLock()) {
                                try {
                                    System.out.println("Thread2：已成功获取 lock2 and lock1 ...");
                                    break;
                                } finally {
                                    lock1.unlock();
                                }
                            }
                        } finally {
                            lock2.unlock();
                        }
                    }
                    System.out.println("Thread2：获取锁失败，重新获取---");
                    try {
                        //防止发生活锁
                        TimeUnit.NANOSECONDS.sleep(new Random().nextInt(100));
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
            }
        }.start();
    }

    public static void main(String[] args) throws InterruptedException {
        for (int i = 0; i < 5; i++) {
            deathLock();
        }
    }
}

```

说起死锁，银行家算法非常有必要了解：

```
银行家算法（Banker’s Algorithm）是一个避免死锁（Deadlock）的著名算法，是由艾兹格·迪杰斯特拉在1965年为T.H.E系统设计的一种避免死锁产生的算法。它以银行借贷系统的分配策略为基础，判断并保证系统的安全运行。
1、操作系统按照银行家指定的规则为进程分配资源，当进程首次申请资源时，需要测试该进程对资源的最大需求量，如果系统现存的资源可以满足它的最大需求量则按当前的申请资源分配资源，否则就推迟分配；
2、当进程在执行中继续申请资源时，先测试该进程本次申请的资源数，是否超过了该资源剩余的总量，若超过则拒绝分配资源，若能满足则按当前的申请量分配资源，否则也要推迟分配。
```

参考阅读：

如何快速排查死锁？如何避免死锁？
https://zhuanlan.zhihu.com/p/136294283

---

### 9. Java 中 synchronized 和 ReentrantLock 有什么不同？

**等待可中断:**

使用synchronized，不能被中断。synchronized 也可以说是Java提供的原子性内置锁机制。内部锁扮演了互斥锁（mutual exclusion lock ，mutex）的角色，一个线程引用锁的时候，别的线程阻塞等待。

使用ReentrantLock。等待了很长时间以后，可以中断等待，转而去做别的事情。

**公平锁:**

公平锁是指多个线程在等待同一个锁时，必须按照申请的时间顺序来依次获得锁；而非公平锁则不能保证这一点。非公平锁在锁被释放时，任何一个等待锁的线程都有机会获得锁。 synchronized的锁是非公平锁，ReentrantLock默认情况下也是非公平锁，但可以通过带布尔值的构造函数要求使用公平锁。

还有大家已知的俩点：

1. synchronized是独占锁，加锁和解锁的过程自动进行，易于操作，但不够灵活。ReentrantLock也是独占锁，加锁和解锁的过程需要手动进行，不易操作，但非常灵活。

2. synchronized可重入，因为加锁和解锁自动进行，不必担心最后是否释放锁；ReentrantLock也可重入，但加锁和解锁需要手动进行，且次数需一样，否则其他线程无法获得锁。

---

### 10. 有三个线程 T1，T2，T3，怎么确保它们按顺序执行？

 **方法1：**

线程内部顺序调用，T1、T2、T3。这个可能不是要考察的点，但也是一个方案。

 **方法2：**

join()方法用于将线程由 ”并行“变成”串行“，它用于等待其他线程的终止，在当前线程掉用了join()方法，那么当前线程将进入阻塞状态，等到另一个线程结束，当前线程再由阻塞状态转变成就绪状态，等待CPU的使用权。

```java
package com.javapub.test;

/**
 * @Author: JavaPub
 * @License: https://github.com/Rodert/
 * @Contact: https://javapub.blog.csdn.net/
 * @Date: 2022/1/2 15:20
 * @Version: 1.0
 * @Description:
 */


public class Test1 {

    public static void main(String[] args) {
        ThreadA threadA = new ThreadA();
        ThreadB threadB = new ThreadB(threadA);
        ThreadC threadC = new ThreadC(threadB);

        threadA.start();
        threadB.start();
        threadC.start();

    }

}

class ThreadA extends Thread {
    @Override
    public void run() {
        System.out.println("线程A");
    }
}

class ThreadB extends Thread {
    Thread threadA;

    public ThreadB() {
        // dosomething Auto-generated constructor stub
    }

    public ThreadB(Thread threadA) {
        this.threadA = threadA;
    }

    @Override
    public void run() {
        try {
            threadA.join();
        } catch (InterruptedException e) {
            // dosomething Auto-generated catch block
            e.printStackTrace();
        }
        System.out.println("线程B");
    }
}

class ThreadC extends Thread {
    Thread threadB;

    public ThreadC(Thread threadB) {
        this.threadB = threadB;
    }

    @Override
    public void run() {
        try {
            threadB.join();
        } catch (InterruptedException e) {
            // dosomething Auto-generated catch block
            e.printStackTrace();
        }
        System.out.println("线程C");
    }
}

```


信号量方式 java.util.concurrent.Semaphore `英 [ˈseməfɔː(r)]` 
待研究



---



**联系JavaPub:**

1. 如果需要下载CSDN资料又没有积分可以JavaPub留言，JavaPub帮你下载


### 推荐阅读：




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

