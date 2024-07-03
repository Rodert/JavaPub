import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,f as s,a as e,d as t,e as n,o as l}from"./app-DrsF6qiY.js";const r={},o=e("h2",{id:"基于-centos7-的-redis-安装",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#基于-centos7-的-redis-安装"},[e("span",null,"基于 centOS7 的 redis 安装")])],-1),c=e("p",null,[t("基于SpringBoot+VUE的后台管理系统免费开源，欢迎观赏。在线地址："),e("a",{href:"http://liawan.javapub.net.cn/",target:"_blank",rel:"noopener noreferrer"},"http://liawan.javapub.net.cn/"),t("。详细参考文档及视频同步更新。")],-1),d=e("h2",{id:"前言",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#前言"},[e("span",null,"前言")])],-1),p=e("p",null,"安装环境：",-1),h=e("p",null,"centos7、redis5、",-1),u=e("iframe",{src:"//player.bilibili.com/player.html?bvid=BV1qR4y1c78t&page=1",scrolling:"no",border:"0",frameborder:"no",framespacing:"0",allowfullscreen:"true"},null,-1),g=n(`<h2 id="安装教程" tabindex="-1"><a class="header-anchor" href="#安装教程"><span>安装教程</span></a></h2><h3 id="_1-下载" tabindex="-1"><a class="header-anchor" href="#_1-下载"><span>1. 下载</span></a></h3><p>国内镜像地址：https://mirrors.huaweicloud.com/redis/</p><figure><img src="https://tva3.sinaimg.cn/large/007F3CC8ly1h2dguy49obj31hc0q1gzo.jpg" alt="image" tabindex="0" loading="lazy"><figcaption>image</figcaption></figure><h3 id="_2-安装" tabindex="-1"><a class="header-anchor" href="#_2-安装"><span>2. 安装</span></a></h3><p>解压：</p><blockquote><p>tar -zxvf redis-5.0.8.tar.gz</p></blockquote><p>编译：</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#56B6C2;">cd</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> redis-5.0.8</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">make</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> install</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-修改配置" tabindex="-1"><a class="header-anchor" href="#_3-修改配置"><span>3. 修改配置</span></a></h3><p><code>修改redis.conf</code></p><p>开启外网访问</p><blockquote><p>bind 0.0.0.0</p></blockquote><p>关闭Redis的服务保护模式</p><blockquote><p>protected-mode no</p></blockquote><p>修改密码</p><blockquote><p>requirepass javapub</p></blockquote><h3 id="_4-启动" tabindex="-1"><a class="header-anchor" href="#_4-启动"><span>4. 启动</span></a></h3><blockquote><p>redis-server redis.conf</p></blockquote><p>后台启动：</p><blockquote><p>nohup redis-server redis.conf &amp;</p></blockquote><h3 id="_5-访问测试" tabindex="-1"><a class="header-anchor" href="#_5-访问测试"><span>5. 访问测试</span></a></h3><blockquote><p>注意，如果外网访问，要保证防火墙对应端口开放。</p></blockquote><p>原文：https://blog.csdn.net/qq_40374604/article/details/124857707</p>`,24);function m(_,b){return l(),a("div",null,[o,s(" more "),c,d,p,h,u,g])}const v=i(r,[["render",m],["__file","redis_install_to_linux.html.vue"]]),y=JSON.parse('{"path":"/posts/database/redis/redis_install_to_linux.html","title":"Linux下redis安装","lang":"zh-CN","frontmatter":{"title":"Linux下redis安装","icon":"lightbulb","category":["redis"],"tag":["redis"],"description":"基于 centOS7 的 redis 安装","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/posts/database/redis/redis_install_to_linux.html"}],["meta",{"property":"og:site_name","content":"JavaPub"}],["meta",{"property":"og:title","content":"Linux下redis安装"}],["meta",{"property":"og:description","content":"基于 centOS7 的 redis 安装"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://tva3.sinaimg.cn/large/007F3CC8ly1h2dguy49obj31hc0q1gzo.jpg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-03T14:35:52.000Z"}],["meta",{"property":"article:author","content":"Mr.Wang"}],["meta",{"property":"article:tag","content":"redis"}],["meta",{"property":"article:modified_time","content":"2024-07-03T14:35:52.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Linux下redis安装\\",\\"image\\":[\\"https://tva3.sinaimg.cn/large/007F3CC8ly1h2dguy49obj31hc0q1gzo.jpg\\"],\\"dateModified\\":\\"2024-07-03T14:35:52.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Mr.Wang\\",\\"url\\":\\"https://javapub.net.cn\\"}]}"]]},"headers":[{"level":2,"title":"基于 centOS7 的 redis 安装","slug":"基于-centos7-的-redis-安装","link":"#基于-centos7-的-redis-安装","children":[]},{"level":2,"title":"前言","slug":"前言","link":"#前言","children":[]},{"level":2,"title":"安装教程","slug":"安装教程","link":"#安装教程","children":[{"level":3,"title":"1. 下载","slug":"_1-下载","link":"#_1-下载","children":[]},{"level":3,"title":"2. 安装","slug":"_2-安装","link":"#_2-安装","children":[]},{"level":3,"title":"3. 修改配置","slug":"_3-修改配置","link":"#_3-修改配置","children":[]},{"level":3,"title":"4. 启动","slug":"_4-启动","link":"#_4-启动","children":[]},{"level":3,"title":"5. 访问测试","slug":"_5-访问测试","link":"#_5-访问测试","children":[]}]}],"git":{"createdTime":1718350679000,"updatedTime":1720017352000,"contributors":[{"name":"wangshiyu","email":"iswangshiyu@foxmail.com","commits":1}]},"readingTime":{"minutes":0.66,"words":197},"filePathRelative":"posts/database/redis/redis_install_to_linux.md","localizedDate":"2024年6月14日","excerpt":"<h2>基于 centOS7 的 redis 安装</h2>\\n","autoDesc":true}');export{v as comp,y as data};
