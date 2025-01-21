---
title: 如何给自己的域名配置免费的HTTPS
icon: lightbulb
---

<!--
 * @Author: JavaPub
 * @Date: 2025-01-21 16:26:47
 * @LastEditors: your name
 * @LastEditTime: 2025-01-21 17:12:48
 * @Description: Here is the JavaPub code base. Search JavaPub on the whole web.
 * @FilePath: /JavaPub/src/posts/http/http_to_https.md
-->





## 如何给自己的域名配置免费的HTTPS


今天有小伙伴给我发私信，你的 https 到期啦

![image-20250121160131161](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202501211601303.png)

并且随手丢给我一个截图。

还真到期了。

`javapub.net.cn` 这个网站作为一个用爱发电的编程学习网站，用来存编程知识和面试题等，平时我都用业余时间来维护，并且还自费买了服务器和阿里云存储。

之前都是白嫖阿里云的 SSL 证书，现在用光了。当然，最关键的是每三个月都要手动更新，这离了大谱，我不是成黑n了。


![image-20250121161421250](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202501211614736.png)

有人说免费还这么多事，那你说对了，今天就给你教一种免费还自动续的方案。

---

以 Ubuntu 为例

在 Ubuntu 上免费申请 Let's Encrypt SSL 证书，你可以使用 Certbot 这个工具。它是由 EFF 提供的一个免费的，自动化的证书颁发客户端。

#### 1. 首先安装 Snapd

一般最新版本的 Ubuntu 是自带的，如果没有通过这个命令安装

```bash
sudo apt update sudo apt install snapd
```

#### 2. 安装 Certbot

使用 Snap 安装 Certbot

```bash
sudo snap install --classic certbot
```

#### 3. 安装 Certbot 命令

```bash
sudo ln -s /snap/bin/certbot /usr/bin/certbot
```

相当于是个软连接，现在全局都是可以使用 Certbot 命令了。

#### 4. 获取证书

接下来就可以配置你的证书了

**Ngnix**

```bash
sudo certbot --nginx
```

**Apache**

```bash
sudo certbot --apache
```

**只获取证书**（不自动配置Web服务器）

```bash
sudo certbot certonly --standalone
```


#### 5. 自动续订证书

Let's Encrypt 颁发的证书有效期为 90 天，我们直接开启自动续订。

```bash
sudo certbot renew --dry-run
```

当证书到期前 30 天时，如果需要续订，Certbot 会自动处理。

---

最近还在开发一个编程面试小程序，编程鸭，后面接入 API 也需要一个证书，所以也用上了这个方法，非常方便。

