import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as n,a as i,d as t,e as l}from"./app-Cno9IsiL.js";const e={},h=i("h2",{id:"springboot生成二维码的正确姿势-附视频-附源码",tabindex:"-1"},[i("a",{class:"header-anchor",href:"#springboot生成二维码的正确姿势-附视频-附源码"},[i("span",null,"SpringBoot生成二维码的正确姿势[附视频/附源码]")])],-1),p=i("p",null,[t("视频： "),i("a",{href:"https://space.bilibili.com/404747369",target:"_blank",rel:"noopener noreferrer"},"https://space.bilibili.com/404747369")],-1),k=i("iframe",{src:"//player.bilibili.com/player.html?isOutside=true&aid=277269604&bvid=BV1cw411w7Rk&cid=1302631496&p=1",scrolling:"no",border:"0",frameborder:"no",framespacing:"0",allowfullscreen:"true"},null,-1),r=l(`<p>[toc]</p><p>二维码的原理是什么，如何保证不重复？你有没有想过这样一件事，二维码是实现原理是什么？如何保证各个平台的二维码是唯一的？就算你的程序停止运行，但是你的二维码依然存在。设计上要保证唯一性，比如在物流等环境中扫码编程别人的二维码。</p><p>二维码是我们当今社会非常重要的一项技术，不论是我们在买菜，网购，停车等等，都需要扫码，几乎覆盖我们生产、生活的方方面面。</p><h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言"><span>前言</span></a></h2><p>你有没有想过这样一些问题：</p><p>二维码的原理是什么，如何保证不重复？保证各个平台的二维码是唯一</p><p>你有没有想过这样一件事，二维码是实现原理是什么？</p><p>就算你的程序停止运行，但是你的二维码依然存在。</p><p>设计上要保证唯一性，比如在物流等容易损坏的环境中，如何保证二维码的准确性？</p><h2 id="初始化-springboot-项目" tabindex="-1"><a class="header-anchor" href="#初始化-springboot-项目"><span>初始化 SpringBoot 项目</span></a></h2><p><code>https://start.aliyun.com</code></p><figure><img src="https://ghproxy.com/https://raw.githubusercontent.com/Rodert/javapub_oss/main/other/springboot-qr-init.png?raw=true" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="引入依赖" tabindex="-1"><a class="header-anchor" href="#引入依赖"><span>引入依赖</span></a></h2><div class="language-xml line-numbers-mode" data-highlighter="shiki" data-ext="xml" data-title="xml" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">        &lt;!-- 引入二维码依赖 --&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">        &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">dependency</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">             &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">groupId</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;com.google.zxing&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">groupId</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">             &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">artifactId</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;core&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">artifactId</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">             &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">version</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;3.2.0&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">version</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">        &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">dependency</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">        &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">dependency</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">             &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">groupId</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;com.google.zxing&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">groupId</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">             &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">artifactId</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;javase&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">artifactId</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">             &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">version</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;3.2.0&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">version</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">        &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">dependency</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="编码" tabindex="-1"><a class="header-anchor" href="#编码"><span>编码</span></a></h2><h3 id="编写工具类" tabindex="-1"><a class="header-anchor" href="#编写工具类"><span>编写工具类</span></a></h3><p><strong>QrCodeController1</strong> 工具类</p><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">package</span><span style="--shiki-light:#24292E;--shiki-dark:#C678DD;"> cn.net.javapub.springbootqr.demos.web.controller</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> cn.net.javapub.springbootqr.demos.web.utils.QRCodeUtil1</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> org.springframework.stereotype.Controller</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> org.springframework.web.bind.annotation.RequestMapping</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> javax.servlet.ServletOutputStream</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> javax.servlet.http.HttpServletRequest</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> javax.servlet.http.HttpServletResponse</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> java.io.File</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">/**</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"> * 作者 JavaPub</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"> */</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">@</span><span style="--shiki-light:#D73A49;--shiki-dark:#E5C07B;">Controller</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">//@Deprecated</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;"> QrCodeController1</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">	/**</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">     * 根据 url 生成 普通二维码</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">     */</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    @</span><span style="--shiki-light:#D73A49;--shiki-dark:#E5C07B;">RequestMapping</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">value</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &quot;/createCommonQRCode&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">    public</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> createCommonQRCode</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">HttpServletResponse</span><span style="--shiki-light:#E36209;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"> response</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">HttpServletRequest</span><span style="--shiki-light:#E36209;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"> request</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">)</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> throws</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> Exception</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">        ServletOutputStream</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> stream</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">        try</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">            stream </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> response</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">getOutputStream</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">            String</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> url</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> request</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">getParameter</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;url&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">            //使用工具类生成二维码</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">            QRCodeUtil1</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">encode</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(url, stream);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">        } </span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">catch</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> (</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">Exception</span><span style="--shiki-light:#E36209;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"> e</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">            e</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">getStackTrace</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">        } </span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">finally</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">            if</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> (stream </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">!=</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">                stream</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">flush</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">                stream</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">close</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">            }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">    /**</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">     * 根据 url 生成 带有logo二维码</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">     */</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    @</span><span style="--shiki-light:#D73A49;--shiki-dark:#E5C07B;">RequestMapping</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">value</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &quot;/createLogoQRCode&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">    public</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> createLogoQRCode</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">HttpServletResponse</span><span style="--shiki-light:#E36209;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"> response</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">HttpServletRequest</span><span style="--shiki-light:#E36209;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"> request</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">)</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> throws</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> Exception</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">        ServletOutputStream</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> stream</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">        try</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">            stream </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> response</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">getOutputStream</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">();</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">//            String logoPath = Thread.currentThread().getContextClassLoader().getResource(&quot;&quot;).getPath() </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">//                    + &quot;templates&quot; + File.separator +&quot;logo-&quot;+UUID.randomUUID().toString().trim().replaceAll(&quot;-&quot;, &quot;&quot;)+ &quot;.jpg&quot;;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">            String</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> logoPath</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> Thread</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">currentThread</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">().</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">getContextClassLoader</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">().</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">getResource</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">).</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">getPath</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">() </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">                    +</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &quot;templates&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> +</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> File</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">separator</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> +</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;logo.jpg&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">            String</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> url</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> request</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">getParameter</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;url&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">            //使用工具类生成二维码</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">            QRCodeUtil1</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">encode</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(url, logoPath, stream, </span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">        } </span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">catch</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> (</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">Exception</span><span style="--shiki-light:#E36209;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"> e</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">            e</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">getStackTrace</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">        } </span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">finally</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">            if</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> (stream </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">!=</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">                stream</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">flush</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">                stream</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">close</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">            }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="生成二维码" tabindex="-1"><a class="header-anchor" href="#生成二维码"><span>生成二维码</span></a></h3><p>附带功能化：</p><ul><li><p>离线可以扫描二维码</p></li><li><p>二维码可以带logo</p></li></ul><h3 id="资源共享" tabindex="-1"><a class="header-anchor" href="#资源共享"><span>资源共享</span></a></h3><p>视频：https://www.bilibili.com/video/BV1cw411w7Rk/</p><p>源码：https://github.com/Rodert/springboot-qr/</p>`,24),d=[h,p,k,r];function g(o,B){return n(),a("div",null,d)}const E=s(e,[["render",g],["__file","springboot_generate_qr_code.html.vue"]]),u=JSON.parse('{"path":"/posts/java/springboot/springboot_generate_qr_code.html","title":"SpringBoot生成二维码的正确姿势[附视频/附源码]","lang":"zh-CN","frontmatter":{"title":"SpringBoot生成二维码的正确姿势[附视频/附源码]","icon":"lightbulb","category":["springboot","java"],"tag":["springboot","java","二维码"],"description":"SpringBoot生成二维码的正确姿势[附视频/附源码] 视频： https://space.bilibili.com/404747369 [toc] 二维码的原理是什么，如何保证不重复？你有没有想过这样一件事，二维码是实现原理是什么？如何保证各个平台的二维码是唯一的？就算你的程序停止运行，但是你的二维码依然存在。设计上要保证唯一性，比如在物流等环境...","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/posts/java/springboot/springboot_generate_qr_code.html"}],["meta",{"property":"og:site_name","content":"JavaPub"}],["meta",{"property":"og:title","content":"SpringBoot生成二维码的正确姿势[附视频/附源码]"}],["meta",{"property":"og:description","content":"SpringBoot生成二维码的正确姿势[附视频/附源码] 视频： https://space.bilibili.com/404747369 [toc] 二维码的原理是什么，如何保证不重复？你有没有想过这样一件事，二维码是实现原理是什么？如何保证各个平台的二维码是唯一的？就算你的程序停止运行，但是你的二维码依然存在。设计上要保证唯一性，比如在物流等环境..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://ghproxy.com/https://raw.githubusercontent.com/Rodert/javapub_oss/main/other/springboot-qr-init.png?raw=true"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-11T01:58:07.000Z"}],["meta",{"property":"article:author","content":"Mr.Wang"}],["meta",{"property":"article:tag","content":"springboot"}],["meta",{"property":"article:tag","content":"java"}],["meta",{"property":"article:tag","content":"二维码"}],["meta",{"property":"article:modified_time","content":"2024-07-11T01:58:07.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"SpringBoot生成二维码的正确姿势[附视频/附源码]\\",\\"image\\":[\\"https://ghproxy.com/https://raw.githubusercontent.com/Rodert/javapub_oss/main/other/springboot-qr-init.png?raw=true\\"],\\"dateModified\\":\\"2024-07-11T01:58:07.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Mr.Wang\\",\\"url\\":\\"https://javapub.net.cn\\"}]}"]]},"headers":[{"level":2,"title":"SpringBoot生成二维码的正确姿势[附视频/附源码]","slug":"springboot生成二维码的正确姿势-附视频-附源码","link":"#springboot生成二维码的正确姿势-附视频-附源码","children":[]},{"level":2,"title":"前言","slug":"前言","link":"#前言","children":[]},{"level":2,"title":"初始化 SpringBoot 项目","slug":"初始化-springboot-项目","link":"#初始化-springboot-项目","children":[]},{"level":2,"title":"引入依赖","slug":"引入依赖","link":"#引入依赖","children":[]},{"level":2,"title":"编码","slug":"编码","link":"#编码","children":[{"level":3,"title":"编写工具类","slug":"编写工具类","link":"#编写工具类","children":[]},{"level":3,"title":"生成二维码","slug":"生成二维码","link":"#生成二维码","children":[]},{"level":3,"title":"资源共享","slug":"资源共享","link":"#资源共享","children":[]}]}],"git":{"createdTime":1718350679000,"updatedTime":1720663087000,"contributors":[{"name":"wangshiyu","email":"iswangshiyu@foxmail.com","commits":3}]},"readingTime":{"minutes":2.08,"words":625},"filePathRelative":"posts/java/springboot/springboot_generate_qr_code.md","localizedDate":"2024年6月14日","excerpt":"<h2>SpringBoot生成二维码的正确姿势[附视频/附源码]</h2>\\n<p>视频： <a href=\\"https://space.bilibili.com/404747369\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">https://space.bilibili.com/404747369</a></p>\\n<iframe src=\\"//player.bilibili.com/player.html?isOutside=true&amp;aid=277269604&amp;bvid=BV1cw411w7Rk&amp;cid=1302631496&amp;p=1\\" scrolling=\\"no\\" border=\\"0\\" frameborder=\\"no\\" framespacing=\\"0\\" allowfullscreen=\\"true\\"></iframe>","autoDesc":true}');export{E as comp,u as data};