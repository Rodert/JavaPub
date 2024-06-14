---
title: Python安装cv2
icon: lightbulb
category:
  - python
tag:
  - python
  - cv2
---





## python 安装 cv2 - 已解决




`建议收藏`

提供多种操作，一定有一种适合你的

@[toc]

情况就这么个情况，就是装不上。本文没一句废话，仔细阅读。

![image](https://tva2.sinaimg.cn/large/007F3CC8ly1h1ky1xzxiij30rl0efqem.jpg)



## 1. 传统方式1
（执行一遍，一条条试）

> 可尝试 python3 -m pip install --upgrade pip

> pip install cv2


> pip3 install opencv-python

国内镜像

> pip3 install opencv-python  -i http://pypi.mirrors.ustc.edu.cn/simple/

> pip install cv2 -i http://pypi.mirrors.ustc.edu.cn/simple/

进度：

![image](https://tva3.sinaimg.cn/large/007F3CC8ly1h1ky2lreabj315c0lkdyk.jpg)


---

## 2. 第一阶段 终极办法01

切换 python 版本， python3.9 不支持 cv2 (python3.7及以下)

---

## 3. 第二阶段 终极办法02
自己安装

https://www.lfd.uci.edu/~gohlke/pythonlibs/#wordcloud

![image](https://tva4.sinaimg.cn/large/007F3CC8ly1h1ky2v4l1cj31hc0lq4k1.jpg)

 等待下载好，copy到python安装目录下的lib目录当中


 接着，在cmd中安装（先进入lib目录中再安装你下载的那个文件）

```bash
pip install opencv_python‑2.4.13.7‑cp27‑cp27m‑win_amd64.whl
```

等待安装好，验证一下。

```bash
pip install numpy
```

## 附加

![image](https://tva1.sinaimg.cn/large/007F3CC8ly1h1ky36j7ztj30l208i79e.jpg)

下载：

如果是以上错误，你可能需要安装 OpenSSL。http://slproweb.com/products/Win32OpenSSL.html

![image](https://tvax4.sinaimg.cn/large/007F3CC8ly1h1ky3c790uj31e50qknlm.jpg)

安装：

一直下一步

配置环境变量

