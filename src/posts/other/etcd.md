---
title: go整合etcd
icon: lightbulb
author: Wang Shiyu
date: 2022-07-06
category:
  - etcd
  - go
tag:
  - etcd
  - go
---




- 案例源码仓库地址： https://github.com/Rodert/go-demo
- 官方文档： https://etcd.io/
- 视频教程： https://space.bilibili.com/404747369


<iframe src="//player.bilibili.com/player.html?isOutside=true&aid=1456119038&bvid=BV1hi421Y7rV&cid=1609010816&p=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>



# 介绍

谈使用场景之前，看看他有哪些功能

官方定义是这样的：
`
etcd is a strongly consistent, distributed key-value store that provides a reliable way to store data that needs to be accessed by a distributed system or cluster of machines. It gracefully handles leader elections during network partitions and can tolerate machine failure, even in the leader node.
`

![](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/2024%2F07%2F04%2F20240704-212011.png)


## 使用场景

- 服务发现

- 配置中心

- 分布式锁




# 安装&搭建

## 搭建 ETCD

环境： mac

```bash
# 安装
brew install etcd

# 启动
brew services start etcd

# 检查状态
brew services list | grep etcd

# 停止
brew services stop etcd

# 卸载
brew uninstall etcd
```

## 与 ETCD 交互

```bash
# 检查工具是否安装
etcdctl version

# 写入
etcdctl put mykey "myvalue"

# 获取
etcdctl get mykey

# 删除
etcdctl del mykey
```

## 集群

```bash
# 查看集群状态
etcdctl cluster-health
```

# Go+ETCD 编码


安装依赖

```bash
go get go.etcd.io/etcd/client/v3
```


编码

https://github.com/Rodert/go-demo


执行

```bash
go run main.go
```


执行结果：

![](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/2024%2F07%2F04%2F20240704-211952.png)


