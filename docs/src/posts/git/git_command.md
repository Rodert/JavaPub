---
title: 企业生产环境中最常使用的git组合命令集
icon: lightbulb
---




持续更新git命令集



以下案例是在生产环境中最常使用的git组合命令集。

[toc]

## 案例1

最常使用命令集，拉取新分支 - 写代码 - 提交代码 - 合并到主分支

```bash
git checkout -b feature/new-branch #拉取新分支
git add . #提交代码
git commit -m '第一次提交' 
git push
git checkout develop #切换分支
git merge feature/new-branch #合并分支
以上是我们最最常使用的git命令
```

---



## 案例2（git stash）

场景：一大早领导甲某分配给p哥一个需求，要求下班前完成，小李马不停蹄，拉取新分支 command+C/V 哼哧哼哧搞了起来。下午1:30pm，甲某：p哥，现场有个紧急需求，你快点处理一下，一小时后上线。

对于这种情况，p哥不想开新分支，又不想把没开发完的代码提交远程仓库，他是这样做的。做法：将工作区内容 `stash` 暂存起来，在当前分支进行紧急需求开发提交，再将工作区的内容取出来，恢复到暂存时的状态。

![stash翻译](https://img-blog.csdnimg.cn/20210621202214814.png)

恢复暂存时的状态有俩种命令：

1. git stash pop
2. git stash apply

俩种都可以，区别是什么呢？

使用 git stash 命令之后会在stash列表中生成一个对应的信息，使用 apply 命令恢复，stash 列表中的信息是会继续保留的，而使用 pop 命令进行恢复，会将 stash列表中的信息进行删除。

**例子：**

- 初始状态index.html文件在工作区进行修改：可以使用命令git status 和git diff看到此时的修改信息

![gitstatus](https://img-blog.csdnimg.cn/20190331161719261.png)



这个时候还没有修改完，不想提交，但是要去修复bug。

- 将index文件的内容 stash 起来，使用命令：git stash，如下图：使用 git stash 命令后，再使用 git status 或者 git diff 查看可以发现，对工作区的修改内容已经没有了，这个时候进行bug修复提交



![gitstash](https://img-blog.csdnimg.cn/2019033116215110.png)



- bug修复提交后，恢复之前暂存的状态，这个时候有两种命令可选，我们选择：git stash pop 命令

![gitstashpop](https://img-blog.csdnimg.cn/20190331162413287.png)



- 并使用 git status 和 git diff 可以发现，此时工作区 index文件的内容跟我们暂存前是一样的。

常用git stash命令：

（1）**git stash** save "save message" : 执行存储时，添加备注，方便查找，只有git stash 也要可以的，但查找时不方便识别。

（2）**git stash list** ：查看stash了哪些存储

（3）**git stash show** ：显示做了哪些改动，默认show第一个存储,如果要显示其他存贮，后面加stash@{$num}，比如第二个 git stash show stash@{1}

（4）**git stash show -p** : 显示第一个存储的改动，如果想显示其他存存储，命令：git stash show stash@{$num} -p ，比如第二个：git stash show stash@{1} -p    `待确定？？？`

（5）**git stash apply** :应用某个存储,但不会把存储从存储列表中删除，默认使用第一个存储,即stash@{0}，如果要使用其他个，git stash apply stash@{$num} ， 比如第二个：git stash apply stash@{1} 

（6）**git stash pop** ：命令恢复之前缓存的工作目录，将缓存堆栈中的对应stash删除，并将对应修改应用到当前的工作目录下,默认为第一个stash,即stash@{0}，如果要应用并删除其他stash，命令：git stash pop stash@{$num} ，比如应用并删除第二个：git stash pop stash@{1}

（7）**git stash drop** stash@{$num} ：丢弃stash@{$num}存储，从列表中删除这个存储

（8）**git stash clear** ：删除所有缓存的stash

---

---

## 案例3（git cherry-pick）

`gi cherry-pick` 可以理解为“挑拣”提交，我们经常遇到代码从一个分支迁移到另一个分支的需求。

如果是所有代码，直接 `git merge` ，另一种情况，只需要合并一次或几次提交。（比如，我们拿到需求后，一通狂写git push，最后发现提交到了测试分支，如果不使用这个命令，那只能一点一点往新分支迁移，这里的心酸😔，谁干 谁知道。）这时，ta来了 `git cherry-pick` 



- **基本用法**

`git cherry-pick`命令的作用，就是将指定的提交（commit）应用于其他分支。

 ```bash
 $ git cherry-pick <commitHash>
 ```

上面命令就会将指定的提交`commitHash`，应用于当前分支。这会在当前分支产生一个新的提交，当然它们的哈希值会不一样。

举例来说，代码仓库有`master`和`feature`两个分支。

 ```bash
     a - b - c - d   Master
          \
            e - f - g Feature
 ```

现在将提交`f`应用到`master`分支。

 ```bash
 # 切换到 master 分支
 $ git checkout master
 
 # Cherry pick 操作
 $ git cherry-pick f
 ```

上面的操作完成以后，代码库就变成了下面的样子。

 ```bash
     a - b - c - d - f   Master
          \
            e - f - g Feature
 ```

从上面可以看到，`master`分支的末尾增加了一个提交`f`。

`git cherry-pick`命令的参数，不一定是提交的哈希值，分支名也是可以的，表示转移该分支的最新提交。

 ```bash
 $ git cherry-pick feature
 ```

上面代码表示将`feature`分支的最近一次提交，转移到当前分支。



- **转移多个提交**

Cherry pick 支持一次转移多个提交。

 ```bash
 $ git cherry-pick <HashA> <HashB>
 ```

上面的命令将 A 和 B 两个提交应用到当前分支。这会在当前分支生成两个对应的新提交。

如果想要转移一系列的连续提交，可以使用下面的简便语法。

 ```bash
 $ git cherry-pick A..B 
 ```

上面的命令可以转移从 A 到 B 的所有提交。它们必须按照正确的顺序放置：提交 A 必须早于提交 B，否则命令将失败，但不会报错。

注意，使用上面的命令，提交 A 将不会包含在 Cherry pick 中。如果要包含提交 A，可以使用下面的语法。

 ```bash
 $ git cherry-pick A^..B 
 ```

`JavaPub说：git cherry-pick 是非常重要且非常实用的一个命令，但是也有很多要点，下篇单独写一篇图解。`

参考：

https://blog.csdn.net/FightFightFight/article/details/81039050

http://www.ruanyifeng.com/blog/2020/04/git-cherry-pick.html

---

---

## 案例4（git reset）

写完代码后，我们一般这样

> git add . //添加所有文件

> git commit -m "本功能全部完成"


执行完commit后，想撤回commit，怎么办？

 

这样：

> git reset --soft HEAD^



这样就成功的撤销了你的 commit

注意，仅仅是撤回 commit 操作，您写的代码仍然保留。



`HEAD^`的意思是上一个版本，也可以写成 `HEAD~1`

如果你进行了2次 commit，想都撤回，可以使用 `HEAD~2`

 

**几个参数：**

> --mixed 

意思是：不删除工作空间改动代码，撤销 commit，并且撤销 `git add .` 操作
这个为默认参数，`git reset --mixed HEAD^` 和 `git reset HEAD^` 效果是一样的。

> --soft 

不删除工作空间改动代码，撤销 commit，不撤销 `git add . `

> --hard

删除工作空间改动代码，撤销 commit，撤销 `git add . `

注意完成这个操作后，就恢复到了上一次的 commit 状态。



```bash
顺便说一下，如果 commit 注释写错了，只是想改一下注释，只需要：
git commit --amend

此时会进入默认 vim编辑器，修改注释完毕后保存就好了。
```

---

---

## 案例5（git fetch）

提到 `git fetch` 主要已通过和 `git pull` 来做区别。

一图顶千文

![git流程图](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202405271044703.png)

简单来说：git pull = git fetch + git merge



---

---

参考：

https://blog.csdn.net/yao_94/article/details/88929992

https://www.cnblogs.com/zndxall/archive/2018/09/04/9586088.html

https://blog.csdn.net/FightFightFight/article/details/81039050

http://www.ruanyifeng.com/blog/2020/04/git-cherry-pick.html


