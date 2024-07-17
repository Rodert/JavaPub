---
title: Redis分布式锁要点注意
icon: lightbulb
category:
  - redis
  - 分布式
  - 锁
tag:
  - redis
  - 分布式
  - 锁
  - lock
---

参考： https://juejin.cn/post/7178327462869205051#heading-1



## Redis分布式锁要注意哪几点...离BUG远一点



当前开发中，为了避免应用出现单点故障，大多数应用都会部署多个节点。分布式应用部署，就会涉及到状态同步的场景，比如 `session` 共享，单点抢占式任务执行、秒杀抢购等等。比如我最近开发中需要一个邮件验证码发送服务，这个邮件服务是一个死循环，持续轮训表里有没有需要发送验证码的邮箱地址，保证实时性的同时，并且不可以重复发送。


这时，分布式锁就成为一个必要、且简单的解决方案。这里基于 Redis 特性和分布式场景来分析会遇到哪些关键点。

**前言** 众所周知，redis 是单线程应用，就算是 v6 版本也是网络并发、键值读写依然是单线程。



1. 原子操作（setnx + expire）

说到分布式锁，很多人一定会想到 `setnx + expire` 命令， `setnx` 用来抢占锁（不存在就创建、存在就不做任何操作），抢到后再设置**过期时间**。

```java
// 抢占锁
if (jedis.setnx(key_lock, value) == 1) {
    // 设置过期时间
    jedis.expire(key_lock, expiration_time);
    // TODO Something
}
```

这个代码有很明显的问题，当程序执行完 `setnx` 后出现异常宕机，这是后这个锁就永久无法释放了。造成的后果是：需要拿到这个锁来获取执行任务权限的应用都停止了。



2. 
















原文： [https://javapub.net.cn/posts/database/redis/](https://javapub.net.cn/posts/database/redis/)



