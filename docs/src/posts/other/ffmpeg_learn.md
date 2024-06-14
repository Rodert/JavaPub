---
title: rodert教你学FFmpeg实战这一篇就够了
icon: lightbulb
---



## rodert教你学FFmpeg实战这一篇就够了

[toc]

## 前言


> 有人问rodert哥这篇文章干货有多干，问就是，硌牙。



> ffmpeg有多强大，我想你都知道了，现在很多市场上的剪辑软件都是基于它做的，只是加了一些包装。读完本篇，你会发现一切如此简单。

## 1. 简介

官网地址：https://trac.ffmpeg.org/wiki

>FFmpeg是一套可以用来记录、转换数字音频、视频，并能将其转化为流的开源计算机程序。采用LGPL或GPL许可证。它提供了录制、转换以及流化音视频的完整解决方案。它包含了非常先进的音频/视频编解码库libavcodec，为了保证高可移植性和编解码质量，libavcodec里很多code都是从头开发的。

> FFmpeg在Linux平台下开发，但它同样也可以在其它操作系统环境中编译运行，包括Windows、Mac OS X等。这个项目最早由Fabrice Bellard发起，2004年至2015年间由Michael Niedermayer主要负责维护。许多FFmpeg的开发人员都来自MPlayer项目，而且当前FFmpeg也是放在MPlayer项目组的服务器上。项目的名称来自MPEG[视频编码标准](https://baike.baidu.com/item/视频编码标准)，前面的"FF"代表"Fast Forward"。

## 2. 安装
### 2.1. windows安装



### 2.2. linux安装

1. 下载

> wget http://ffmpeg.org/releases/ffmpeg-3.4.1.tar.bz2


2. 解压

> tar -jxvf ffmpeg-3.4.1.tar.bz2

3. 安装

> yum install yasm

> cd ffmpeg-3.4.1

> ./configure --enable-shared  --prefix=/usr/local/ffmpeg

> make && make install

- 编译时间较长

> 修改文件/etc/ld.so.conf 中增加/usr/local/ffmpeg/lib

>  使其生效：ldconfig

> 加入环境变量：vim /etc/profile

> export FFMPEG_HOME=/usr/local/ffmpeg

> export PATH=$FFMPEG_HOME/bin:$PATH

> 配置生效： source /etc/profile





## 3. 命令行操使用

#### 3.1.简单说明

> 在操作前，简单介绍一下常用指令

```
ffmpeg的使用方式： 
ffmpeg [options] [[infile options] -i infile]... {[outfile options] outfile}...

常用参数说明： 
主要参数： 
-i 设定输入流 
-f 设定输出格式 
-ss 开始时间 
视频参数： 
-b 设定视频流量，默认为200Kbit/s 
-r 设定帧速率，默认为25 
-s 设定画面的宽与高 
-aspect 设定画面的比例 
-vn 不处理视频 
-vcodec 设定视频编解码器，未设定时则使用与输入流相同的编解码器 
音频参数： 
-ar 设定采样率 
-ac 设定声音的Channel数 
-acodec 设定声音编解码器，未设定时则使用与输入流相同的编解码器 
-an 不处理音频
```

#### 3.2.视频剪切

##### 3.2.1.掐头去尾

> ffmpeg -ss 00:00:15 -t 00:00:06 -i input.mp4 -vcodec copy -acodec copy output.mp4

> 剪辑原视频input.mp4，15s开始向后6s，保存到output.mp4

> -ss 表示开始切割时间，-t 表示要切多少

##### 3.2.2.

#### 3.3.视频格式转换

准确来说，是视频容器转换

> ffmpeg -i input.avi output.mp4

> avi文件转为mp4

> ffmpeg -i input.mp4 output.ts

> mp4文件转为ts

#### 3.4.提取音频

> ffmpeg -i JavaPub讲坛.mp4 -acodec copy -vn output.aac

> 提取JavaPub讲坛.mp4音频到output.acc，acc是一种常见默认视频，也可以转为其他格式。或者防止出现异常，直接使用下面方式

> ffmpeg -i JavaPub讲坛.mp4 -acodec aac -vn output.aac

#### 3.5.提取音频

> ffmpeg -i input.mp4 -vcodec copy -an output.mp4

> 纯视频

#### 3.6.码率控制

码率控制对于在线视频比较重要。因为在线视频需要考虑其能提供的带宽。现在这个直播使用很广泛的时代

> 码率是什么：
>
> bitrate = file size / duration 
>
> 比如一个文件20.8M，时长1分钟，那么，码率就是： 
> biterate = 20.8M bit/60s = 20.8*1024*1024*8 bit/60s= 2831Kbps 
> 一般音频的码率只有固定几种，比如是128Kbps， 
> 那么，video的就是 
> video biterate = 2831Kbps -128Kbps = 2703Kbps。

- **控制码率主要还是为了缩小文件大小，尽量不影响分辨率**

ffmpg控制码率有3种选择，-minrate -b:v -maxrate 

> -b:v 控制平均码率



比如一个视频源的码率太高了，有10Mbps，文件太大，想把文件弄小一点，但是又不破坏分辨率。 

> `ffmpeg -i input.mp4 -b:v 2000k output.mp4`



ffmpeg官方wiki比较建议，设置b:v时，同时加上 -bufsize 
-bufsize 用于设置码率控制缓冲器的大小，设置的好处是，让整体的码率更趋近于希望的值，减少波动。（简单来说，比如1 2的平均值是1.5， 1.49 1.51 也是1.5, 当然是第二种比较好） 

> ffmpeg -i input.mp4 -b:v 2000k -bufsize 2000k output.mp4



-minrate -maxrate就简单了，在线视频有时候，希望码率波动，不要超过一个阈值，可以设置maxrate。 

> ffmpeg -i input.mp4 -b:v 2000k -bufsize 2000k -maxrate 2500k output.mp4



#### 3.7. 视频编码格式转换



比如一个视频的编码是MPEG4，想用H264编码

> ffmpeg -i input.mp4 -vcodec h264 output.mp4 

相反也一样 

> ffmpeg -i input.mp4 -vcodec mpeg4 output.mp4

当然了，如果ffmpeg当时编译时，添加了外部的x265或者X264，那也可以用外部的编码器来编码。（不知道什么是X265，可以Google一下，简单的说，就是她不包含在ffmpeg的源码里，是独立的一个开源代码，用于编码HEVC，ffmpeg编码时可以调用它。当然了，ffmpeg自己也有编码器） 

> ffmpeg -i input.mp4 -c:v libx265 output.mp4 

> ffmpeg -i input.mp4 -c:v libx264 output.mp4



#### 3.8. 只提取视频ES数据

这个是不常用的，更多阅读下面链接

> ffmpeg –i input.mp4 –vcodec copy –an –f m4v output.h264

更多：http://www.360doc.com/content/13/0829/15/13084517_310733557.shtml



#### 3.9.过滤器的使用

##### 3.9.1. 将输入的1920x1080缩小到960x540输出

> fmpeg -i input.mp4 -vf scale=960:540 output.mp4` 

//ps: 如果540不写，写成-1，即scale=960:-1, 那也是可以的，ffmpeg会通知缩放滤镜在输出时保持原始的宽高比。



##### 3.9.2.视频添加logo

左上角

> ffmpeg -i input.mp4 -i logo.png -filter_complex overlay output.mp4 

右上角： 

> ffmpeg -i input.mp4 -i logo.png -filter_complex overlay=W-w output.mp4 

左下角： 

> ffmpeg -i input.mp4 -i logo.png -filter_complex overlay=0:H-h output.mp4 

右下角： 

> ffmpeg -i input.mp4 -i logo.png -filter_complex overlay=W-w:H-h output.mp4
> 



##### 3.9.3.去掉视频的logo

有时候，下载了某个网站的视频，但是有logo很烦，咋办？有办法，用ffmpeg的delogo过滤器。 
语法：-vf delogo=x:y:w:h[:t[:show]] 
x:y 离左上角的坐标 
w:h logo的宽和高 
t: 矩形边缘的厚度默认值4 
show：若设置为1有一个绿色的矩形，默认值0。

```bash
ffmpeg -i input.mp4 -vf delogo=0:0:220:90:100:1 output.mp4
```

> 处理后的视频样式是在过滤处加磨砂处理，并加绿色边框



#### 3.10.抓取视频的一些帧，存为jpeg图片

视频抽取一些帧作为图片时很常用的操作。

- 情况一

> ffmpeg -i input.mp4 -r 1 -q:v 2 -f image2 pic-%03d.jpeg

-r 表示每一秒几帧, -q:v表示存储jpeg的图像质量，一般2是高质量。 

假设60s，会保存60张图片。



- 情况二

> ffmpeg -i input.mp4 -ss 00:00:20 -t 10 -r 1 -q:v 2 -f image2 pic-%03d.jpeg

ffmpeg会从input.mp4的第20s时间开始，往下10s，即20~30s这10秒钟之间，每隔1s就抓一帧，总共会抓10帧。



- 情况三

> ffmpeg -i input.mp4 -vf "select=between(n\,84\,208)*not(mod(n\,4))" -vsync 0 image_%05d.jpg

主体是一个select 的过滤语句：

其中：between(n,*)　是指　从第几帧到第几帧之间进行提取...

　　　not(mode(n\, K))是指每隔几帧输出一帧。



#### 3.11.查询操作

##### 3.11.1.查询视频总帧数

> ffprobe -v error -count_frames -select_streams v:0 -show_entries stream=nb_read_frames -of default=nokey=1:noprint_wrappers=1 input.mp4

说明：读取帧数需要文件解码，时长取决于文件大小

> -v error：这隐藏了“info”输出(版本信息等)，使解析更容易。
> -count_frames：计算每个流的帧数，并在相应的流部分中报告。
> -select_streams v:0 ：仅选择视频流。
> -show_entries stream = nb_read_frames ：只显示读取的帧数。
> -of default = nokey = 1：noprint_wrappers = 1 ：将输出格式(也称为“writer”)设置为默认值，不打印每个字段的键(nokey = 1)，不打印节头和页脚(noprint_wrappers = 1)。

##### 3.11.2.查询FFmpeg软件信息

```bash
version	显示版本
demuxers	显示可用的demuxers
muxers	显示可用的muxers
devices	显示可用的设备
codecs	显示所有编解码器
decoders	显示可用编解码器
encoders	显示所有编码器
bsfs	显示比特流filter
formats	显示可用的格式
protocols	显示可用的协议
filters	显示可用的过滤器
pix_fmts	显示可用的像素格式
sample_fmts	显示可用的采样格式
layouts	显示channel名称
colors	显示识别的颜色名称
```

> ffmpeg -version 



#### 3.12.录制

**查询有哪些设备**

```bash
ffmpeg -f avfoundation -list_devices true -i ""
```



**录屏**

```bash
ffmpeg -f avfoundation -i 1 -r 30 out.yuv
```

-f 指定使用 avfoundation 采集数据。
 -i 指定从哪儿采集数据，它是一个文件索引号。在我的MAC上，1代表桌面（可以通过上面的命令查询设备索引号）。
 -r 指定帧率。按ffmpeg官方文档说-r与-framerate作用相同，但实际测试时发现不同。-framerate 用于限制输入，而-r用于限制输出。
 注意，桌面的输入对帧率没有要求，所以不用限制桌面的帧率。其实限制了也没用。

**录屏+声音**

```bash
ffmpeg -f avfoundation -i 1:0 -r 29.97 -c:v libx264 -crf 0 -c:a libfdk_aac -profile:a aac_he_v2 -b:a 32k out.flv
```

-i 1:0 冒号前面的 “1” 代表的屏幕索引号。冒号后面的"0"代表的声音索相号。
 -c:v 与参数 -vcodec 一样，表示视频编码器。c 是 codec 的缩写，v 是video的缩写。
 -crf 是 x264 的参数。 0 表式无损压缩。
 -c:a 与参数 -acodec 一样，表示音频编码器。
 -profile 是 fdk_aac 的参数。 aac_he_v2 表式使用 AAC_HE v2 压缩数据。
 -b:a 指定音频码率。 b 是 bitrate的缩写, a是 audio的缩与。

**录视频**

```
ffmpeg -framerate 30 -f avfoundation -i 0 out.mp4
```



-framerate 限制视频的采集帧率。这个必须要根据提示要求进行设置，如果不设置就会报错。
 -f 指定使用 avfoundation 采集数据。
 -i 指定视频设备的索引号。

**录音**

```
ffmpeg -f avfoundation -i :0 out.wav
```





#### 3.13.直播相关

**推流**
> ffmpeg -re -i out.mp4 -c copy -f flv rtmp://server/live/streamName`

**拉流保存**
> ffmpeg -i rtmp://server/live/streamName -c copy dump.flv`

**转流**
> ffmpeg -i rtmp://server/live/originalStream -c:a copy -c:v copy -f flv rtmp://server/live/h264Stream`

**实时推流**
> ffmpeg -framerate 15 -f avfoundation -i "1" -s 1280x720 -c:v libx264 -f flv rtmp://localhost:1935/live/room`





