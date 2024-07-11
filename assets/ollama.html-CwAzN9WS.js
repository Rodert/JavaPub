import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,o as l,a,d as i,e as t}from"./app-QJMJclNn.js";const n={},h=a("blockquote",null,[a("p",null,"大语言模型，ollama轻松打造本地LLM应用 普通人如何快速搭建本地大语言模型")],-1),r=a("p",null,[i("视频： "),a("a",{href:"https://space.bilibili.com/404747369",target:"_blank",rel:"noopener noreferrer"},"https://space.bilibili.com/404747369")],-1),p=a("p",null,[i("官网： "),a("a",{href:"https://ollama.com/",target:"_blank",rel:"noopener noreferrer"},"https://ollama.com/"),i(" ｜ "),a("a",{href:"https://github.com/ollama/ollama",target:"_blank",rel:"noopener noreferrer"},"https://github.com/ollama/ollama")],-1),o=a("iframe",{src:"//player.bilibili.com/player.html?isOutside=true&aid=1806178648&bvid=BV18b421E7Wu&cid=1611201303&p=1",scrolling:"no",border:"0",frameborder:"no",framespacing:"0",allowfullscreen:"true"},null,-1),d=t(`<p><strong>建议环境&amp;配置</strong> 大于 <code>4c8g</code></p><h1 id="ollama" tabindex="-1"><a class="header-anchor" href="#ollama"><span>ollama</span></a></h1><h2 id="认识-ollama" tabindex="-1"><a class="header-anchor" href="#认识-ollama"><span>认识 ollama</span></a></h2><p>Ollama 是一个开源大语言模型工具，帮助用户快速在本地搭建运行大模型。支持一系列著名的模型。如Llama2、Mistral、Gemma，极大的简化了安装和配置的细节。</p><h2 id="搭建" tabindex="-1"><a class="header-anchor" href="#搭建"><span>搭建</span></a></h2><p>根据不同操作系统，选择对应的安装包进行安装： https://ollama.com/download</p><h3 id="linux-为例" tabindex="-1"><a class="header-anchor" href="#linux-为例"><span>Linux 为例</span></a></h3><p>一键安装</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">curl</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> -fsSL</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> https://ollama.com/install.sh</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> sh</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>加载 llama3 模型</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">ollama</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> run</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> llama3</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>查询模型安装是否成功</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">ollama</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> list</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="测试" tabindex="-1"><a class="header-anchor" href="#测试"><span>测试</span></a></h2><p>ollama 默认启动的端口是：11434</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">curl</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> http://127.0.0.1:11434/</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"># Ollama is running</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="调用llama3试用" tabindex="-1"><a class="header-anchor" href="#调用llama3试用"><span>调用llama3试用</span></a></h3><p>测试响应</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">curl</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> http://localhost:11434/api/generate</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> -d</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &#39;{</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">  &quot;model&quot;: &quot;llama3&quot;,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">  &quot;prompt&quot;:&quot;你知道 JavaPub 吗？&quot;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">}&#39;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>与模型对话</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">curl</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> http://localhost:11434/api/chat</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> -d</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &#39;{</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">  &quot;model&quot;: &quot;llama3&quot;,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">  &quot;messages&quot;: [</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">    { &quot;role&quot;: &quot;user&quot;, &quot;content&quot;: &quot;你知道 JavaPub 吗？&quot; }</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">  ]</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">}&#39;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="webui" tabindex="-1"><a class="header-anchor" href="#webui"><span>webui</span></a></h1><h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言"><span>前言</span></a></h2><p>首先安装 docker</p><h2 id="搭建-1" tabindex="-1"><a class="header-anchor" href="#搭建-1"><span>搭建</span></a></h2><p>推荐使用: <a href="https://github.com/open-webui/open-webui" target="_blank" rel="noopener noreferrer">https://github.com/open-webui/open-webui</a></p><p>ollama 我已经单独安装，现在只需要安装 webui。</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> run</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> -d</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> -p</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 3000:8080</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> --add-host=host.docker.internal:host-gateway</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> -v</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> open-webui:/app/backend/data</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> --name</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> open-webui</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> --restart</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> always</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> ghcr.io/open-webui/open-webui:main</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>默认端口是 3000，<code>http://127.0.0.1:3000</code></p><figure><img src="https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202407081509663.png" alt="image-" tabindex="0" loading="lazy"><figcaption>image-</figcaption></figure><p>第一次进来没有账户，点击 Create 创建，第一个新创建的账户拥有管理员权限。</p><p>接下来登陆进来，就可以使用了。</p><figure><img src="https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202407081511790.png" alt="image" tabindex="0" loading="lazy"><figcaption>image</figcaption></figure><p>TODO</p><p>[ ] 搭建 llama3 模型，并调用成功 [ ] 整合 go 语言，实现 api 调用 [ ] 流式回复</p><p>以 llama3 为例： https://ollama.com/library/llama3</p><p>参考：</p><ul><li>https://zhuanlan.zhihu.com/p/694843237</li><li>https://blog.csdn.net/tirestay/article/details/139744309</li><li>https://blog.csdn.net/qq_40999403/article/details/139320266</li><li>视频参考： https://www.bilibili.com/video/av1903594994/?vd_source=f2a0231e07e27f42fa11f05024479cb8</li><li></li></ul><h2 id="附录" tabindex="-1"><a class="header-anchor" href="#附录"><span>附录</span></a></h2><ul><li>支持模型列表： https://ollama.com/library</li><li>中文参考文档： https://ollama.fan/reference/api/#generate-a-completion-request-streaming</li><li>webui: https://github.com/open-webui/open-webui</li></ul><p>原文： <a href="https://javapub.net.cn/posts/ai/" target="_blank" rel="noopener noreferrer">https://javapub.net.cn/posts/ai/</a></p>`,41),c=[h,r,p,o,d];function m(k,g){return l(),e("div",null,c)}const v=s(n,[["render",m],["__file","ollama.html.vue"]]),y=JSON.parse('{"path":"/posts/ai/ollama/ollama.html","title":"ollama本地调用大模型","lang":"zh-CN","frontmatter":{"title":"ollama本地调用大模型","icon":"lightbulb","author":"Wang Shiyu","date":"2022-07-04T00:00:00.000Z","category":["ollama","ai"],"tag":["ollama","ai","llama3","chatgpt"],"description":"大语言模型，ollama轻松打造本地LLM应用 普通人如何快速搭建本地大语言模型 视频： https://space.bilibili.com/404747369 官网： https://ollama.com/ ｜ https://github.com/ollama/ollama 建议环境&配置 大于 4c8g ollama 认识 ollama Oll...","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/posts/ai/ollama/ollama.html"}],["meta",{"property":"og:site_name","content":"JavaPub"}],["meta",{"property":"og:title","content":"ollama本地调用大模型"}],["meta",{"property":"og:description","content":"大语言模型，ollama轻松打造本地LLM应用 普通人如何快速搭建本地大语言模型 视频： https://space.bilibili.com/404747369 官网： https://ollama.com/ ｜ https://github.com/ollama/ollama 建议环境&配置 大于 4c8g ollama 认识 ollama Oll..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202407081509663.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-11T01:58:07.000Z"}],["meta",{"property":"article:author","content":"Wang Shiyu"}],["meta",{"property":"article:tag","content":"ollama"}],["meta",{"property":"article:tag","content":"ai"}],["meta",{"property":"article:tag","content":"llama3"}],["meta",{"property":"article:tag","content":"chatgpt"}],["meta",{"property":"article:published_time","content":"2022-07-04T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-11T01:58:07.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"ollama本地调用大模型\\",\\"image\\":[\\"https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202407081509663.png\\",\\"https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202407081511790.png\\"],\\"datePublished\\":\\"2022-07-04T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-11T01:58:07.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Wang Shiyu\\"}]}"]]},"headers":[{"level":2,"title":"认识 ollama","slug":"认识-ollama","link":"#认识-ollama","children":[]},{"level":2,"title":"搭建","slug":"搭建","link":"#搭建","children":[{"level":3,"title":"Linux 为例","slug":"linux-为例","link":"#linux-为例","children":[]}]},{"level":2,"title":"测试","slug":"测试","link":"#测试","children":[{"level":3,"title":"调用llama3试用","slug":"调用llama3试用","link":"#调用llama3试用","children":[]}]},{"level":2,"title":"前言","slug":"前言","link":"#前言","children":[]},{"level":2,"title":"搭建","slug":"搭建-1","link":"#搭建-1","children":[]},{"level":2,"title":"附录","slug":"附录","link":"#附录","children":[]}],"git":{"createdTime":1720435584000,"updatedTime":1720663087000,"contributors":[{"name":"wangshiyu","email":"iswangshiyu@foxmail.com","commits":2}]},"readingTime":{"minutes":1.67,"words":501},"filePathRelative":"posts/ai/ollama/ollama.md","localizedDate":"2022年7月4日","excerpt":"<blockquote>\\n<p>大语言模型，ollama轻松打造本地LLM应用\\n普通人如何快速搭建本地大语言模型</p>\\n</blockquote>\\n<p>视频： <a href=\\"https://space.bilibili.com/404747369\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">https://space.bilibili.com/404747369</a></p>\\n<p>官网： <a href=\\"https://ollama.com/\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">https://ollama.com/</a> ｜ <a href=\\"https://github.com/ollama/ollama\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">https://github.com/ollama/ollama</a></p>","autoDesc":true}');export{v as comp,y as data};
