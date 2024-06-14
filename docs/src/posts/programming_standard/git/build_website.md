---
title: 基于GitHub搭建网站，无需服务器
icon: lightbulb
---



自建服务器，无需服务器、不用编程。

大家好，我是JavaPub.

这几年自媒体原来热，很多人都知道了个人 IP 的重要性。连一个搞中医的朋友都要要做一个自己的网站，而且不想学编程、还不想花 RMB 租云服务。

老读者都知道，博主是个实战派。搭建网站这种事，手到擒来。但是这位朋友这为一个外行人，这个教程必要做到保姆级、手把手。

当然，**文末**还会提供无剪辑版的完整搭建视频、及演示源代码，绝对是有手就行。

![image-20231229224826134](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202312292248310.png)


今天推荐这款工具，真的非常方便，而且简单易上手。我们的 **编程指南** 就是用他来搭建的。大家看下效果图。

`http://luxian.javapub.net.cn/`

![image-20231229214604013](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202312292146278.png)


#### 前言

在搭建之前，首先大家要保证已经安装了 node、git。

### 快速搭建

#### 安装工具

安装 `docsify-cli` 工具，这个工具可以方便的在本地调试预览网站。

```
npm i docsify-cli -g
```

![image-20231229215720402](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202312292157412.png)

#### 初始化

> 如果你是第一次操作，建议完全模仿。

接下来初始化网站目录，也就是我们要在网页上展示的内容。

```
docsify init ./docs
```

到这里我们的网站目录就搭建成功了，接下来可以写你想要展示的内容。也就是我们网站的内核。

#### 写文档

初始化成功后，可以看到 `docs` 目录下包含以下几个文件：

- `index.html` 入口文件，也就是我们的网站在进入后首先加载的文件。
- `README.md` 作为主页内容渲染，也就是网站的首页。
- `.nojekyll` 阻止 GitHub Pages 忽略掉下划线开头的文件。（不了解可以先不用在意）

​	编辑 `docs/README.md` 就能直接更新网站内容。

#### 本地预览

运行本地服务器，执行命令 `docsify serve` 可以方便的预览。并且有 LiveReload 功能、也就是边改边实时预览。默认的访问地址是 `http://localhost:3000`

```bash
docsify serve
```

到这一步，就已取得间断性胜利。你已经运用了自己网站。

#### 部署 GitHub

接下来，就是如何将网站放在公网上，供全球用户浏览。

进入 GitHub 网站，创建一个我们的博客仓库。（如果没有、用邮箱注册一个就可以了）

第一步、

创建一个仓库，名字就叫 `temp-docsify` 。

![image-20231229222424668](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202312292224064.png)

第二步、

初始化本地代码、并推送到远端

```bash
git init // 初始化仓库
git add .
git commit -m "init"
git remote add origin https://github.com/Rodert/temp-docsify.git // 绑定远端地址
git checkout -b main
git push -u origin main
```

看一下我们的仓库

[仓库文件.jpg]()

第三步、

使用 GitHub Pages 功能搭建网站

进入仓库，选择 `Settings` 栏。

![image-20231229223519373](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202312292235619.png)

然后鼠标一直向下滚动，直到看到 `GitHub Pages` 页签，在Source下面选择`master branch / docs folder` 选项。

![image-20231229223449073](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202312292234946.png)

稍等几分钟，就可以看到部署的网站地址，类似这样 `https://rodert.github.io/temp-docsify/` 。点击 `Visit site` 浏览属于你的网站。

![image-20231229223856569](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202312292239709.png)

我们的演示源代码仓库： `https://github.com/Rodert/temp-docsify/` 