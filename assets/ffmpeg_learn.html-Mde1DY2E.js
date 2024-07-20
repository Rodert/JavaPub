import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,o as i,e as a}from"./app-Cno9IsiL.js";const p={},n=a(`<h2 id="rodert教你学ffmpeg实战这一篇就够了" tabindex="-1"><a class="header-anchor" href="#rodert教你学ffmpeg实战这一篇就够了"><span>rodert教你学FFmpeg实战这一篇就够了</span></a></h2><p>[toc]</p><h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言"><span>前言</span></a></h2><blockquote><p>有人问rodert哥这篇文章干货有多干，问就是，硌牙。</p></blockquote><blockquote><p>ffmpeg有多强大，我想你都知道了，现在很多市场上的剪辑软件都是基于它做的，只是加了一些包装。读完本篇，你会发现一切如此简单。</p></blockquote><h2 id="_1-简介" tabindex="-1"><a class="header-anchor" href="#_1-简介"><span>1. 简介</span></a></h2><p>官网地址：https://trac.ffmpeg.org/wiki</p><blockquote><p>FFmpeg是一套可以用来记录、转换数字音频、视频，并能将其转化为流的开源计算机程序。采用LGPL或GPL许可证。它提供了录制、转换以及流化音视频的完整解决方案。它包含了非常先进的音频/视频编解码库libavcodec，为了保证高可移植性和编解码质量，libavcodec里很多code都是从头开发的。</p></blockquote><blockquote><p>FFmpeg在Linux平台下开发，但它同样也可以在其它操作系统环境中编译运行，包括Windows、Mac OS X等。这个项目最早由Fabrice Bellard发起，2004年至2015年间由Michael Niedermayer主要负责维护。许多FFmpeg的开发人员都来自MPlayer项目，而且当前FFmpeg也是放在MPlayer项目组的服务器上。项目的名称来自MPEG<a href="https://baike.baidu.com/item/%E8%A7%86%E9%A2%91%E7%BC%96%E7%A0%81%E6%A0%87%E5%87%86" target="_blank" rel="noopener noreferrer">视频编码标准</a>，前面的&quot;FF&quot;代表&quot;Fast Forward&quot;。</p></blockquote><h2 id="_2-安装" tabindex="-1"><a class="header-anchor" href="#_2-安装"><span>2. 安装</span></a></h2><h3 id="_2-1-windows安装" tabindex="-1"><a class="header-anchor" href="#_2-1-windows安装"><span>2.1. windows安装</span></a></h3><h3 id="_2-2-linux安装" tabindex="-1"><a class="header-anchor" href="#_2-2-linux安装"><span>2.2. linux安装</span></a></h3><ol><li>下载</li></ol><blockquote><p>wget http://ffmpeg.org/releases/ffmpeg-3.4.1.tar.bz2</p></blockquote><ol start="2"><li>解压</li></ol><blockquote><p>tar -jxvf ffmpeg-3.4.1.tar.bz2</p></blockquote><ol start="3"><li>安装</li></ol><blockquote><p>yum install yasm</p></blockquote><blockquote><p>cd ffmpeg-3.4.1</p></blockquote><blockquote><p>./configure --enable-shared --prefix=/usr/local/ffmpeg</p></blockquote><blockquote><p>make &amp;&amp; make install</p></blockquote><ul><li>编译时间较长</li></ul><blockquote><p>修改文件/etc/ld.so.conf 中增加/usr/local/ffmpeg/lib</p></blockquote><blockquote><p>使其生效：ldconfig</p></blockquote><blockquote><p>加入环境变量：vim /etc/profile</p></blockquote><blockquote><p>export FFMPEG_HOME=/usr/local/ffmpeg</p></blockquote><blockquote><p>export PATH=$FFMPEG_HOME/bin:$PATH</p></blockquote><blockquote><p>配置生效： source /etc/profile</p></blockquote><h2 id="_3-命令行操使用" tabindex="-1"><a class="header-anchor" href="#_3-命令行操使用"><span>3. 命令行操使用</span></a></h2><h4 id="_3-1-简单说明" tabindex="-1"><a class="header-anchor" href="#_3-1-简单说明"><span>3.1.简单说明</span></a></h4><blockquote><p>在操作前，简单介绍一下常用指令</p></blockquote><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>ffmpeg的使用方式： </span></span>
<span class="line"><span>ffmpeg [options] [[infile options] -i infile]... {[outfile options] outfile}...</span></span>
<span class="line"><span></span></span>
<span class="line"><span>常用参数说明： </span></span>
<span class="line"><span>主要参数： </span></span>
<span class="line"><span>-i 设定输入流 </span></span>
<span class="line"><span>-f 设定输出格式 </span></span>
<span class="line"><span>-ss 开始时间 </span></span>
<span class="line"><span>视频参数： </span></span>
<span class="line"><span>-b 设定视频流量，默认为200Kbit/s </span></span>
<span class="line"><span>-r 设定帧速率，默认为25 </span></span>
<span class="line"><span>-s 设定画面的宽与高 </span></span>
<span class="line"><span>-aspect 设定画面的比例 </span></span>
<span class="line"><span>-vn 不处理视频 </span></span>
<span class="line"><span>-vcodec 设定视频编解码器，未设定时则使用与输入流相同的编解码器 </span></span>
<span class="line"><span>音频参数： </span></span>
<span class="line"><span>-ar 设定采样率 </span></span>
<span class="line"><span>-ac 设定声音的Channel数 </span></span>
<span class="line"><span>-acodec 设定声音编解码器，未设定时则使用与输入流相同的编解码器 </span></span>
<span class="line"><span>-an 不处理音频</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-2-视频剪切" tabindex="-1"><a class="header-anchor" href="#_3-2-视频剪切"><span>3.2.视频剪切</span></a></h4><h5 id="_3-2-1-掐头去尾" tabindex="-1"><a class="header-anchor" href="#_3-2-1-掐头去尾"><span>3.2.1.掐头去尾</span></a></h5><blockquote><p>ffmpeg -ss 00:00:15 -t 00:00:06 -i input.mp4 -vcodec copy -acodec copy output.mp4</p></blockquote><blockquote><p>剪辑原视频input.mp4，15s开始向后6s，保存到output.mp4</p></blockquote><blockquote><p>-ss 表示开始切割时间，-t 表示要切多少</p></blockquote><h5 id="_3-2-2" tabindex="-1"><a class="header-anchor" href="#_3-2-2"><span>3.2.2.</span></a></h5><h4 id="_3-3-视频格式转换" tabindex="-1"><a class="header-anchor" href="#_3-3-视频格式转换"><span>3.3.视频格式转换</span></a></h4><p>准确来说，是视频容器转换</p><blockquote><p>ffmpeg -i input.avi output.mp4</p></blockquote><blockquote><p>avi文件转为mp4</p></blockquote><blockquote><p>ffmpeg -i input.mp4 output.ts</p></blockquote><blockquote><p>mp4文件转为ts</p></blockquote><h4 id="_3-4-提取音频" tabindex="-1"><a class="header-anchor" href="#_3-4-提取音频"><span>3.4.提取音频</span></a></h4><blockquote><p>ffmpeg -i JavaPub讲坛.mp4 -acodec copy -vn output.aac</p></blockquote><blockquote><p>提取JavaPub讲坛.mp4音频到output.acc，acc是一种常见默认视频，也可以转为其他格式。或者防止出现异常，直接使用下面方式</p></blockquote><blockquote><p>ffmpeg -i JavaPub讲坛.mp4 -acodec aac -vn output.aac</p></blockquote><h4 id="_3-5-提取音频" tabindex="-1"><a class="header-anchor" href="#_3-5-提取音频"><span>3.5.提取音频</span></a></h4><blockquote><p>ffmpeg -i input.mp4 -vcodec copy -an output.mp4</p></blockquote><blockquote><p>纯视频</p></blockquote><h4 id="_3-6-码率控制" tabindex="-1"><a class="header-anchor" href="#_3-6-码率控制"><span>3.6.码率控制</span></a></h4><p>码率控制对于在线视频比较重要。因为在线视频需要考虑其能提供的带宽。现在这个直播使用很广泛的时代</p><blockquote><p>码率是什么：</p><p>bitrate = file size / duration</p><p>比如一个文件20.8M，时长1分钟，那么，码率就是： biterate = 20.8M bit/60s = 20.8<em>1024</em>1024*8 bit/60s= 2831Kbps 一般音频的码率只有固定几种，比如是128Kbps， 那么，video的就是 video biterate = 2831Kbps -128Kbps = 2703Kbps。</p></blockquote><ul><li><strong>控制码率主要还是为了缩小文件大小，尽量不影响分辨率</strong></li></ul><p>ffmpg控制码率有3种选择，-minrate -b:v -maxrate</p><blockquote><p>-b:v 控制平均码率</p></blockquote><p>比如一个视频源的码率太高了，有10Mbps，文件太大，想把文件弄小一点，但是又不破坏分辨率。</p><blockquote><p><code>ffmpeg -i input.mp4 -b:v 2000k output.mp4</code></p></blockquote><p>ffmpeg官方wiki比较建议，设置b:v时，同时加上 -bufsize -bufsize 用于设置码率控制缓冲器的大小，设置的好处是，让整体的码率更趋近于希望的值，减少波动。（简单来说，比如1 2的平均值是1.5， 1.49 1.51 也是1.5, 当然是第二种比较好）</p><blockquote><p>ffmpeg -i input.mp4 -b:v 2000k -bufsize 2000k output.mp4</p></blockquote><p>-minrate -maxrate就简单了，在线视频有时候，希望码率波动，不要超过一个阈值，可以设置maxrate。</p><blockquote><p>ffmpeg -i input.mp4 -b:v 2000k -bufsize 2000k -maxrate 2500k output.mp4</p></blockquote><h4 id="_3-7-视频编码格式转换" tabindex="-1"><a class="header-anchor" href="#_3-7-视频编码格式转换"><span>3.7. 视频编码格式转换</span></a></h4><p>比如一个视频的编码是MPEG4，想用H264编码</p><blockquote><p>ffmpeg -i input.mp4 -vcodec h264 output.mp4</p></blockquote><p>相反也一样</p><blockquote><p>ffmpeg -i input.mp4 -vcodec mpeg4 output.mp4</p></blockquote><p>当然了，如果ffmpeg当时编译时，添加了外部的x265或者X264，那也可以用外部的编码器来编码。（不知道什么是X265，可以Google一下，简单的说，就是她不包含在ffmpeg的源码里，是独立的一个开源代码，用于编码HEVC，ffmpeg编码时可以调用它。当然了，ffmpeg自己也有编码器）</p><blockquote><p>ffmpeg -i input.mp4 -c:v libx265 output.mp4</p></blockquote><blockquote><p>ffmpeg -i input.mp4 -c:v libx264 output.mp4</p></blockquote><h4 id="_3-8-只提取视频es数据" tabindex="-1"><a class="header-anchor" href="#_3-8-只提取视频es数据"><span>3.8. 只提取视频ES数据</span></a></h4><p>这个是不常用的，更多阅读下面链接</p><blockquote><p>ffmpeg –i input.mp4 –vcodec copy –an –f m4v output.h264</p></blockquote><p>更多：http://www.360doc.com/content/13/0829/15/13084517_310733557.shtml</p><h4 id="_3-9-过滤器的使用" tabindex="-1"><a class="header-anchor" href="#_3-9-过滤器的使用"><span>3.9.过滤器的使用</span></a></h4><h5 id="_3-9-1-将输入的1920x1080缩小到960x540输出" tabindex="-1"><a class="header-anchor" href="#_3-9-1-将输入的1920x1080缩小到960x540输出"><span>3.9.1. 将输入的1920x1080缩小到960x540输出</span></a></h5><blockquote><p>fmpeg -i input.mp4 -vf scale=960:540 output.mp4\`</p></blockquote><p>//ps: 如果540不写，写成-1，即scale=960:-1, 那也是可以的，ffmpeg会通知缩放滤镜在输出时保持原始的宽高比。</p><h5 id="_3-9-2-视频添加logo" tabindex="-1"><a class="header-anchor" href="#_3-9-2-视频添加logo"><span>3.9.2.视频添加logo</span></a></h5><p>左上角</p><blockquote><p>ffmpeg -i input.mp4 -i logo.png -filter_complex overlay output.mp4</p></blockquote><p>右上角：</p><blockquote><p>ffmpeg -i input.mp4 -i logo.png -filter_complex overlay=W-w output.mp4</p></blockquote><p>左下角：</p><blockquote><p>ffmpeg -i input.mp4 -i logo.png -filter_complex overlay=0:H-h output.mp4</p></blockquote><p>右下角：</p><blockquote><p>ffmpeg -i input.mp4 -i logo.png -filter_complex overlay=W-w:H-h output.mp4</p></blockquote><h5 id="_3-9-3-去掉视频的logo" tabindex="-1"><a class="header-anchor" href="#_3-9-3-去掉视频的logo"><span>3.9.3.去掉视频的logo</span></a></h5><p>有时候，下载了某个网站的视频，但是有logo很烦，咋办？有办法，用ffmpeg的delogo过滤器。 语法：-vf delogo=x:y:w:h[:t[:show]] x:y 离左上角的坐标 w:h logo的宽和高 t: 矩形边缘的厚度默认值4 show：若设置为1有一个绿色的矩形，默认值0。</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">ffmpeg</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> -i</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> input.mp4</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> -vf</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> delogo=0:0:220:90:100:1</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> output.mp4</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><blockquote><p>处理后的视频样式是在过滤处加磨砂处理，并加绿色边框</p></blockquote><h4 id="_3-10-抓取视频的一些帧-存为jpeg图片" tabindex="-1"><a class="header-anchor" href="#_3-10-抓取视频的一些帧-存为jpeg图片"><span>3.10.抓取视频的一些帧，存为jpeg图片</span></a></h4><p>视频抽取一些帧作为图片时很常用的操作。</p><ul><li>情况一</li></ul><blockquote><p>ffmpeg -i input.mp4 -r 1 -q:v 2 -f image2 pic-%03d.jpeg</p></blockquote><p>-r 表示每一秒几帧, -q:v表示存储jpeg的图像质量，一般2是高质量。</p><p>假设60s，会保存60张图片。</p><ul><li>情况二</li></ul><blockquote><p>ffmpeg -i input.mp4 -ss 00:00:20 -t 10 -r 1 -q:v 2 -f image2 pic-%03d.jpeg</p></blockquote><p>ffmpeg会从input.mp4的第20s时间开始，往下10s，即20~30s这10秒钟之间，每隔1s就抓一帧，总共会抓10帧。</p><ul><li>情况三</li></ul><blockquote><p>ffmpeg -i input.mp4 -vf &quot;select=between(n,84,208)*not(mod(n,4))&quot; -vsync 0 image_%05d.jpg</p></blockquote><p>主体是一个select 的过滤语句：</p><p>其中：between(n,*)　是指　从第几帧到第几帧之间进行提取...</p><p>not(mode(n, K))是指每隔几帧输出一帧。</p><h4 id="_3-11-查询操作" tabindex="-1"><a class="header-anchor" href="#_3-11-查询操作"><span>3.11.查询操作</span></a></h4><h5 id="_3-11-1-查询视频总帧数" tabindex="-1"><a class="header-anchor" href="#_3-11-1-查询视频总帧数"><span>3.11.1.查询视频总帧数</span></a></h5><blockquote><p>ffprobe -v error -count_frames -select_streams v:0 -show_entries stream=nb_read_frames -of default=nokey=1:noprint_wrappers=1 input.mp4</p></blockquote><p>说明：读取帧数需要文件解码，时长取决于文件大小</p><blockquote><p>-v error：这隐藏了“info”输出(版本信息等)，使解析更容易。 -count_frames：计算每个流的帧数，并在相应的流部分中报告。 -select_streams v:0 ：仅选择视频流。 -show_entries stream = nb_read_frames ：只显示读取的帧数。 -of default = nokey = 1：noprint_wrappers = 1 ：将输出格式(也称为“writer”)设置为默认值，不打印每个字段的键(nokey = 1)，不打印节头和页脚(noprint_wrappers = 1)。</p></blockquote><h5 id="_3-11-2-查询ffmpeg软件信息" tabindex="-1"><a class="header-anchor" href="#_3-11-2-查询ffmpeg软件信息"><span>3.11.2.查询FFmpeg软件信息</span></a></h5><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">version</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">	显示版本</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">demuxers</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">	显示可用的demuxers</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">muxers</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">	显示可用的muxers</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">devices</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">	显示可用的设备</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">codecs</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">	显示所有编解码器</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">decoders</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">	显示可用编解码器</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">encoders</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">	显示所有编码器</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">bsfs</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">	显示比特流filter</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">formats</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">	显示可用的格式</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">protocols</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">	显示可用的协议</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">filters</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">	显示可用的过滤器</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">pix_fmts</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">	显示可用的像素格式</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">sample_fmts</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">	显示可用的采样格式</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">layouts</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">	显示channel名称</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">colors</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">	显示识别的颜色名称</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>ffmpeg -version</p></blockquote><h4 id="_3-12-录制" tabindex="-1"><a class="header-anchor" href="#_3-12-录制"><span>3.12.录制</span></a></h4><p><strong>查询有哪些设备</strong></p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">ffmpeg</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> -f</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> avfoundation</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> -list_devices</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> true</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> -i</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &quot;&quot;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><strong>录屏</strong></p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">ffmpeg</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> -f</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> avfoundation</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> -i</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 1</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> -r</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 30</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> out.yuv</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>-f 指定使用 avfoundation 采集数据。 -i 指定从哪儿采集数据，它是一个文件索引号。在我的MAC上，1代表桌面（可以通过上面的命令查询设备索引号）。 -r 指定帧率。按ffmpeg官方文档说-r与-framerate作用相同，但实际测试时发现不同。-framerate 用于限制输入，而-r用于限制输出。 注意，桌面的输入对帧率没有要求，所以不用限制桌面的帧率。其实限制了也没用。</p><p><strong>录屏+声音</strong></p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">ffmpeg</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> -f</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> avfoundation</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> -i</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 1:0</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> -r</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 29.97</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> -c:v</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> libx264</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> -crf</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 0</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> -c:a</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> libfdk_aac</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> -profile:a</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> aac_he_v2</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> -b:a</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 32k</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> out.flv</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>-i 1:0 冒号前面的 “1” 代表的屏幕索引号。冒号后面的&quot;0&quot;代表的声音索相号。 -c:v 与参数 -vcodec 一样，表示视频编码器。c 是 codec 的缩写，v 是video的缩写。 -crf 是 x264 的参数。 0 表式无损压缩。 -c:a 与参数 -acodec 一样，表示音频编码器。 -profile 是 fdk_aac 的参数。 aac_he_v2 表式使用 AAC_HE v2 压缩数据。 -b:a 指定音频码率。 b 是 bitrate的缩写, a是 audio的缩与。</p><p><strong>录视频</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>ffmpeg -framerate 30 -f avfoundation -i 0 out.mp4</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>-framerate 限制视频的采集帧率。这个必须要根据提示要求进行设置，如果不设置就会报错。 -f 指定使用 avfoundation 采集数据。 -i 指定视频设备的索引号。</p><p><strong>录音</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>ffmpeg -f avfoundation -i :0 out.wav</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h4 id="_3-13-直播相关" tabindex="-1"><a class="header-anchor" href="#_3-13-直播相关"><span>3.13.直播相关</span></a></h4><p><strong>推流</strong></p><blockquote><p>ffmpeg -re -i out.mp4 -c copy -f flv rtmp://server/live/streamName\`</p></blockquote><p><strong>拉流保存</strong></p><blockquote><p>ffmpeg -i rtmp://server/live/streamName -c copy dump.flv\`</p></blockquote><p><strong>转流</strong></p><blockquote><p>ffmpeg -i rtmp://server/live/originalStream -c:a copy -c:v copy -f flv rtmp://server/live/h264Stream\`</p></blockquote><p><strong>实时推流</strong></p><blockquote><p>ffmpeg -framerate 15 -f avfoundation -i &quot;1&quot; -s 1280x720 -c:v libx264 -f flv rtmp://localhost:1935/live/room\`</p></blockquote>`,137),t=[n];function l(o,r){return i(),e("div",null,t)}const d=s(p,[["render",l],["__file","ffmpeg_learn.html.vue"]]),k=JSON.parse('{"path":"/posts/other/ffmpeg_learn.html","title":"rodert教你学FFmpeg实战这一篇就够了","lang":"zh-CN","frontmatter":{"title":"rodert教你学FFmpeg实战这一篇就够了","icon":"lightbulb","description":"rodert教你学FFmpeg实战这一篇就够了 [toc] 前言 有人问rodert哥这篇文章干货有多干，问就是，硌牙。 ffmpeg有多强大，我想你都知道了，现在很多市场上的剪辑软件都是基于它做的，只是加了一些包装。读完本篇，你会发现一切如此简单。 1. 简介 官网地址：https://trac.ffmpeg.org/wiki FFmpeg是一套可以...","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/posts/other/ffmpeg_learn.html"}],["meta",{"property":"og:site_name","content":"JavaPub"}],["meta",{"property":"og:title","content":"rodert教你学FFmpeg实战这一篇就够了"}],["meta",{"property":"og:description","content":"rodert教你学FFmpeg实战这一篇就够了 [toc] 前言 有人问rodert哥这篇文章干货有多干，问就是，硌牙。 ffmpeg有多强大，我想你都知道了，现在很多市场上的剪辑软件都是基于它做的，只是加了一些包装。读完本篇，你会发现一切如此简单。 1. 简介 官网地址：https://trac.ffmpeg.org/wiki FFmpeg是一套可以..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-03T14:35:52.000Z"}],["meta",{"property":"article:author","content":"Mr.Wang"}],["meta",{"property":"article:modified_time","content":"2024-07-03T14:35:52.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"rodert教你学FFmpeg实战这一篇就够了\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-07-03T14:35:52.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Mr.Wang\\",\\"url\\":\\"https://javapub.net.cn\\"}]}"]]},"headers":[{"level":2,"title":"rodert教你学FFmpeg实战这一篇就够了","slug":"rodert教你学ffmpeg实战这一篇就够了","link":"#rodert教你学ffmpeg实战这一篇就够了","children":[]},{"level":2,"title":"前言","slug":"前言","link":"#前言","children":[]},{"level":2,"title":"1. 简介","slug":"_1-简介","link":"#_1-简介","children":[]},{"level":2,"title":"2. 安装","slug":"_2-安装","link":"#_2-安装","children":[{"level":3,"title":"2.1. windows安装","slug":"_2-1-windows安装","link":"#_2-1-windows安装","children":[]},{"level":3,"title":"2.2. linux安装","slug":"_2-2-linux安装","link":"#_2-2-linux安装","children":[]}]},{"level":2,"title":"3. 命令行操使用","slug":"_3-命令行操使用","link":"#_3-命令行操使用","children":[]}],"git":{"createdTime":1718348642000,"updatedTime":1720017352000,"contributors":[{"name":"wangshiyu","email":"iswangshiyu@foxmail.com","commits":1}]},"readingTime":{"minutes":8.46,"words":2539},"filePathRelative":"posts/other/ffmpeg_learn.md","localizedDate":"2024年6月14日","excerpt":"<h2>rodert教你学FFmpeg实战这一篇就够了</h2>\\n<p>[toc]</p>\\n<h2>前言</h2>\\n<blockquote>\\n<p>有人问rodert哥这篇文章干货有多干，问就是，硌牙。</p>\\n</blockquote>\\n<blockquote>\\n<p>ffmpeg有多强大，我想你都知道了，现在很多市场上的剪辑软件都是基于它做的，只是加了一些包装。读完本篇，你会发现一切如此简单。</p>\\n</blockquote>\\n<h2>1. 简介</h2>\\n<p>官网地址：https://trac.ffmpeg.org/wiki</p>\\n<blockquote>\\n<p>FFmpeg是一套可以用来记录、转换数字音频、视频，并能将其转化为流的开源计算机程序。采用LGPL或GPL许可证。它提供了录制、转换以及流化音视频的完整解决方案。它包含了非常先进的音频/视频编解码库libavcodec，为了保证高可移植性和编解码质量，libavcodec里很多code都是从头开发的。</p>\\n</blockquote>","autoDesc":true}');export{d as comp,k as data};