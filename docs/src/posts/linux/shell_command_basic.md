---
title: 大学生都会的Linux命令
icon: lightbulb
index: false
---






## 面试官：这些命令大学生都会


大家好，我是 JavaPub。

最近有些同学在后台问我，面试总是会遇到被问 Linux 命令的问题，自己就面试个后端开发岗位，怎么这么难呢？

![image-20231216131924099](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/image-20231216131924099.png)

其实 Linux 命令，对于一个后端开发来说，并不是很难，只是我们平时很少使用而已。

但是，我们平时开发，用到的 Linux 命令，其实也就那么几个，比如：
- 文件操作：ls、cd、pwd、mkdir、touch、cp、mv、rm
- 文件查看：cat、more、less、head、tail
- 文件压缩：tar、gzip、zip
- 文件权限：chmod、chown
- 文件搜索：find、grep
- 网络操作：ping、ifconfig、netstat
- 进程操作：ps、kill、top
- 系统操作：date、df、du、free、top

有没有发现上面的命令大多都是对文件的操作。linux 有句话叫做：一切皆文件 `Everything is a file`。

![image-20231216131826484](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/image-20231216131826484.png)

...

接下来给大家演示一些文件的操作。有的同学说，我没有 Linux 服务器，没关系，我之前给大家推荐了一个可以**免费**使用 Linux 的在线网站、跟着下面视频一学就会。当然，大家也可以在自己的电脑上安装虚拟机来操作。

[play-with-docker在线linux操作视频]()

## 文件操作

```bash                                                         
ls
```

`ls` 命令用于显示指定工作目录下之内容（列出当前目录下的文件和目录）。

![](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/image-20231216124110943.png)


```bash
cd
```

当要进入某个目录时。

![image-20231216124523478](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/image-20231216124523478.png)

```bash
pwd
```
`pwd` 命令用于显示工作目录。

![image-20231216124628242](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/image-20231216124628242.png)

```bash
mkdir
```

`mkdir` 命令用于创建目录。当你要给自己的项目分层，比如 Javapub-docs 放文档、javapub-img 放图片。

![image-20231216124857718](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/image-20231216124857718.png)

```bash
touch
```

`touch` 是用来创建文件的命令。

![image-20231216125205177](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/image-20231216125205177.png)



```bash
cp
```

`cp` 命令用于复制文件或目录。这个命令很有用，比如把我们上传到服务器的代码复制到需要运行的目录下。

![image-20231216130058600](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/image-20231216130058600.png)

```bash
mv
```

`mv` 命令用于移动文件或目录。

![image-20231216130625976](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/image-20231216130625976.png)


```bash
rm
```

`rm` 命令用于删除文件或目录。

![image-20231216125353767](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/image-20231216125353767.png)


下期继续。。。

