---
title: cas和自旋锁
icon: lightbulb
author: Wang Shiyu
date: 2025-03-31
category:
  - 算法
tag:
  - 算法
  - cas
  - 自旋锁
---


# CAS 和自旋锁

## CAS (Compare-And-Swap)

CAS 是一种原子操作，全称为"比较并交换"(Compare-And-Swap)。它是实现无锁数据结构和算法的基础，也是许多并发框架的核心机制。

### CAS 的基本原理

CAS 操作包含三个操作数：
- **内存位置 V**：需要读写的内存位置
- **预期值 A**：预期内存位置 V 中存储的值
- **新值 B**：如果 V 中的值等于 A，则将 V 的值更新为 B

CAS 的伪代码表示：

```java
boolean compareAndSwap(V, A, B) {
    if (V == A) {
        V = B;
        return true;
    }
    return false;
}
```

CAS 操作是原子的，意味着它在执行期间不会被中断，要么完全执行成功，要么完全不执行。

### CAS 在 Java 中的应用

在 Java 中，`java.util.concurrent.atomic` 包提供了一系列基于 CAS 操作的原子类，如 `AtomicInteger`、`AtomicLong` 等：

```java
AtomicInteger counter = new AtomicInteger(0);
// 原子地将当前值增加1，并返回更新后的值
int updatedValue = counter.incrementAndGet();
// 原子地比较当前值是否等于期望值，如果是则更新为新值并返回true
boolean success = counter.compareAndSet(updatedValue, 100);
```

### CAS 的优缺点

**优点：**
1. **无锁**：不需要加锁解锁操作，减少了线程上下文切换和调度的开销
2. **高效**：在竞争不激烈的情况下，性能远高于互斥锁
3. **适合实现原子操作**：尤其适合简单变量的原子更新

**缺点：**
1. **ABA 问题**：如果一个值从 A 变成 B 再变回 A，CAS 检查时会认为它没有被修改过
2. **循环时间长开销大**：如果 CAS 失败，通常会不断重试，可能会消耗较多的 CPU 资源
3. **只能保证单个变量的原子性**：无法保证多个变量的原子性操作

### ABA 问题解决方案

ABA 问题可以通过引入版本号或时间戳来解决：

```java
// 使用 AtomicStampedReference 解决 ABA 问题
AtomicStampedReference<Integer> reference = new AtomicStampedReference<>(100, 1);
// 获取当前值和版本号
int stamp = reference.getStamp();
Integer value = reference.getReference();
// CAS 操作时同时检查值和版本号
reference.compareAndSet(value, 101, stamp, stamp + 1);
```

## 自旋锁 (Spin Lock)

自旋锁是一种基于忙等待（busy waiting）的锁机制，线程在请求获取锁时，如果锁已被其他线程持有，会一直循环检查锁是否可用，而不是被阻塞或进入睡眠状态。

### 自旋锁的基本原理

自旋锁的基本实现通常基于 CAS 操作：

```java
public class SimpleSpinLock {
    private AtomicReference<Thread> owner = new AtomicReference<>();
    
    public void lock() {
        Thread currentThread = Thread.currentThread();
        // 如果锁已被获取，则自旋等待
        while (!owner.compareAndSet(null, currentThread)) {
            // 自旋等待
        }
    }
    
    public void unlock() {
        Thread currentThread = Thread.currentThread();
        owner.compareAndSet(currentThread, null);
    }
}
```

### 自旋锁的类型

1. **简单自旋锁**：基本的自旋实现，如上述代码所示
2. **TicketLock**：采用类似排队叫号的机制，避免线程饥饿
3. **CLH 锁**：基于链表的公平自旋锁，减少了空间复杂度
4. **MCS 锁**：也是基于链表的公平自旋锁，但每个线程自旋在本地变量上，降低了缓存一致性协议开销

### 自旋锁的适用场景

自旋锁适用于以下场景：
1. **锁持有时间短**：如果锁被持有的时间很短，自旋等待可能比线程阻塞和唤醒更高效
2. **处理器资源丰富**：在多核处理器上，一个线程的自旋不会影响其他线程的执行
3. **实时性要求高**：避免线程调度带来的延迟

### 自旋锁的优缺点

**优点：**
1. **避免上下文切换**：线程不会被挂起，减少了线程调度的开销
2. **响应更快**：在锁被持有时间短的情况下，自旋等待可以更快地获取锁

**缺点：**
1. **CPU 资源消耗**：自旋会消耗处理器时间，如果锁被长时间持有，会造成资源浪费
2. **不公平**：基本的自旋锁可能导致某些线程长时间无法获取锁（饥饿问题）
3. **优化困难**：难以确定最佳的自旋次数

### Java 中的自旋锁应用

在 Java 中，显式的自旋锁很少直接使用，但 JVM 中的锁实现（如 synchronized）在内部可能使用自旋优化：

```java
// synchronized 在轻量级锁状态可能使用自旋优化
synchronized (lock) {
    // 临界区代码
}

// 也可以使用 ReentrantLock
ReentrantLock lock = new ReentrantLock();
try {
    lock.lock();
    // 临界区代码
} finally {
    lock.unlock();
}
```

### 适应性自旋锁

Java 的 HotSpot VM 使用"适应性自旋锁"，它会根据前一次自旋的效果动态调整自旋的时间：
- 如果前几次自旋获取到了锁，会增加自旋次数
- 如果自旋很少成功，则会减少自旋次数，甚至不自旋

## CAS 与自旋锁的关系

CAS 是自旋锁实现的基础，自旋锁通常使用 CAS 操作来实现无锁的同步机制。两者关系如下：

1. CAS 是一种底层原子操作，自旋锁是一种基于 CAS 的同步机制
2. 自旋锁通常在 CAS 失败时进行自旋重试
3. 两者都属于乐观并发控制的范畴，相比传统的悲观锁定，在低竞争情况下性能更好

## 总结

CAS 和自旋锁在现代并发编程中扮演着重要角色：

- **CAS** 提供了无锁的原子操作能力，是实现高性能并发算法的基础
- **自旋锁** 通过忙等待而非线程阻塞提供了低延迟的同步机制，适用于锁竞争不激烈且锁持有时间短的场景

理解这两种机制对于设计和实现高性能并发系统非常重要，但同时也需要注意它们的局限性和适用场景。


