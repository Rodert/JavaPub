---
title: 大学生都会的Linux命令V2
icon: lightbulb
index: false
---






# 命令集合

## awk



## 常用命令大全

> 工作中最常用shell指令

1. ps aux | grep "tomcat"			查找运行的进程

2. find / -name java*				全部查找（java*）文件

3. cat -n name-file | grep "java"		查找文件（java）所在行

4. cat -n name-file | tail -n +92 | head -n 20		查看文件92行前后20行

5. :set nu 显示行号

6. :n  跳转到指定行号

7，tail -n 20 filename	显示后20行数据

8,sudo -u bsafe bash	切换basfe帐户

9，cat textJson_20190216.log | awk -F '\t' '{print $NF}' > result.log	去除文件中字符"\t"
	方法二：#awk -F "\t" '{print $2}' ./textJson_20190215.log >result.log

10，cat file1 file2 | sort | uniq > fileAll	取出文件的并集（去重）

11，远程复制拷贝
$scp local_file remote_username@remote_ip:remote_folder
$scp local_file remote_username@remote_ip:remote_file
$scp local_file remote_ip:remote_folder
$scp local_file remote_ip:remote_file
scp root@192.168.120.204:/opt/soft/nginx-0.5.38.tar.gz /opt/soft/

12，字符串切割
awk '{FS=":"}{print $1"\t" $3}' /etc/passwd，使用FS=””,指定分割符，第一行已经读完，用冒号分割已经来不及了，默认的用空格分割，后面的用冒号分割，在FS之前强制加个BEGIN
***********awk -F '\t' '{print $3}'**********

13，删除指定行	sed -i '1d' <file>

14，删除包含特定字符的行	sed -e '/xxx/d' a1.txt > a2.txt

15，文件授权（递归授权所有文件）	chown -R testname <filename>

16，压缩	压缩方式： 
     tar -zcvf archive_name.tar.gz filename
     解压缩方式： 
     tar -zxvf archive_name.tar.gz 
	压缩解压（zip）
	 zip -r 123.zip 123.txt
	 unzip 123.zip -d ./
	 
17，nohup
	nohup java -jar myProject.jar >> /usr/local/log/output.log 2>&1 &
	

19，替换文件制定字符
	sed -i "s/tf_ab/tf_qw/g" result.txt
	
20，git命令
    git status
	git add .
	git commit -m "一些信息"
	git push 仓库地址
	###分支
	git checkout -b 分支名 #新建分支
	git branch -a 
	git checkout 分支名
	
21，rsync -av  ../log/textJson_$min".log" --port=9215 root@106.12.31.72::web_news_database


