import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as t,e as n}from"./app-D6vUzay6.js";const p={},i=n('<blockquote><p>DeepSeek接入IDEA</p></blockquote><p>这篇文章介绍如何将 IDE 集成 DeepSeek，这里以 Java 作常用的编辑器 IDEA 为例。</p><p>这里推荐使用更通用、且更简单的插件方式 Continue。</p><p>IDEA 有版本要求，太低的版本是无法使用的，建议使用较新版本。</p><p>⚠️注意：DeepSeek 最近由于众所周知的原因，性能不稳定，这个插件也提供了接入本地 Ollama+DeepSeek 的方式。</p><h3 id="通过-continue-插件接入-deepseek" tabindex="-1"><a class="header-anchor" href="#通过-continue-插件接入-deepseek"><span>通过 Continue 插件接入 DeepSeek</span></a></h3><p>Continue 是一款开源的 AI 辅助编程插件，适用于 IntelliJ IDEA 等 JetBrains IDE。通过自然语言和他交互来提升开发效率，为开发者提供实时代码生成、问题解决、单元测试生成等功能。</p><h4 id="安装-continue-插件" tabindex="-1"><a class="header-anchor" href="#安装-continue-插件"><span>安装 Continue 插件</span></a></h4><p>在 IntelliJ IDEA 中，通过 <strong>Settings &gt; Plugins</strong></p><p>搜索 “Continue”，点击安装（Install）并重启 IDE。</p><figure><img src="https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202502101537490.png" alt="image-20250210153749378" tabindex="0" loading="lazy"><figcaption>image-20250210153749378</figcaption></figure><h4 id="配置-deepseek" tabindex="-1"><a class="header-anchor" href="#配置-deepseek"><span>配置 DeepSeek</span></a></h4><p>IDEA 右侧便可以看到 Continue 的图标，选择添加 DeepSeek 模型和 DeepSeek Coder，再填写 DeepSeek API Key。</p><figure><img src="https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202502101540336.png" alt="image-20250210154013201" tabindex="0" loading="lazy"><figcaption>image-20250210154013201</figcaption></figure><h4 id="deepseek-api-key-从哪儿获取" tabindex="-1"><a class="header-anchor" href="#deepseek-api-key-从哪儿获取"><span>DeepSeek API Key 从哪儿获取</span></a></h4><p>在 DeepSeek 官网 API 开发平台中自行创建，地址：</p><p><strong>https://platform.deepseek.com/api_keys</strong></p><figure><img src="https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202502101542437.png" alt="image-20250210154213374" tabindex="0" loading="lazy"><figcaption>image-20250210154213374</figcaption></figure><h3 id="代码编写" tabindex="-1"><a class="header-anchor" href="#代码编写"><span>代码编写</span></a></h3><p>写一段简单代码</p><figure><img src="https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202502101545001.png" alt="image-20250210154542831" tabindex="0" loading="lazy"><figcaption>image-20250210154542831</figcaption></figure><figure><img src="https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202502101546859.png" alt="image-20250210154600455" tabindex="0" loading="lazy"><figcaption>image-20250210154600455</figcaption></figure><p>使用官方 API 可能不太稳定，总是掉线。也可以使用 Ollama 接入。</p><h3 id="接入本地-deepseek" tabindex="-1"><a class="header-anchor" href="#接入本地-deepseek"><span>接入本地 DeepSeek</span></a></h3><p>本地部署 Ollama+DeepSeek 文档视频教程。</p><p><strong>https://javapub.net.cn/posts/ai/ollama/ollama_deepseek_mac.html</strong></p><p>本地启动 Ollama 后，可以用插件连接了。</p><figure><img src="https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202502101553210.png" alt="image-20250210155338362" tabindex="0" loading="lazy"><figcaption>image-20250210155338362</figcaption></figure>',28),o=[i];function s(c,l){return t(),a("div",null,o)}const g=e(p,[["render",s],["__file","deepseek_to_idea.html.vue"]]),u=JSON.parse('{"path":"/posts/ai/deepseek/deepseek_to_idea.html","title":"DeepSeek接入IDEA","lang":"zh-CN","frontmatter":{"title":"DeepSeek接入IDEA","icon":"lightbulb","author":"Wang Shiyu","date":"2025-02-10T00:00:00.000Z","category":["deepseek","ai","idea"],"tag":["deepseek","ai","idea"],"description":"DeepSeek接入IDEA 这篇文章介绍如何将 IDE 集成 DeepSeek，这里以 Java 作常用的编辑器 IDEA 为例。 这里推荐使用更通用、且更简单的插件方式 Continue。 IDEA 有版本要求，太低的版本是无法使用的，建议使用较新版本。 ⚠️注意：DeepSeek 最近由于众所周知的原因，性能不稳定，这个插件也提供了接入本地 Ol...","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/posts/ai/deepseek/deepseek_to_idea.html"}],["meta",{"property":"og:site_name","content":"JavaPub"}],["meta",{"property":"og:title","content":"DeepSeek接入IDEA"}],["meta",{"property":"og:description","content":"DeepSeek接入IDEA 这篇文章介绍如何将 IDE 集成 DeepSeek，这里以 Java 作常用的编辑器 IDEA 为例。 这里推荐使用更通用、且更简单的插件方式 Continue。 IDEA 有版本要求，太低的版本是无法使用的，建议使用较新版本。 ⚠️注意：DeepSeek 最近由于众所周知的原因，性能不稳定，这个插件也提供了接入本地 Ol..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202502101537490.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-02-10T07:55:35.000Z"}],["meta",{"property":"article:author","content":"Wang Shiyu"}],["meta",{"property":"article:tag","content":"deepseek"}],["meta",{"property":"article:tag","content":"ai"}],["meta",{"property":"article:tag","content":"idea"}],["meta",{"property":"article:published_time","content":"2025-02-10T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2025-02-10T07:55:35.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"DeepSeek接入IDEA\\",\\"image\\":[\\"https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202502101537490.png\\",\\"https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202502101540336.png\\",\\"https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202502101542437.png\\",\\"https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202502101545001.png\\",\\"https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202502101546859.png\\",\\"https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202502101553210.png\\"],\\"datePublished\\":\\"2025-02-10T00:00:00.000Z\\",\\"dateModified\\":\\"2025-02-10T07:55:35.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Wang Shiyu\\"}]}"]]},"headers":[{"level":3,"title":"通过 Continue 插件接入 DeepSeek","slug":"通过-continue-插件接入-deepseek","link":"#通过-continue-插件接入-deepseek","children":[]},{"level":3,"title":"代码编写","slug":"代码编写","link":"#代码编写","children":[]},{"level":3,"title":"接入本地 DeepSeek","slug":"接入本地-deepseek","link":"#接入本地-deepseek","children":[]}],"git":{"createdTime":1739174135000,"updatedTime":1739174135000,"contributors":[{"name":"wangshiyu","email":"iswangshiyu@foxmail.com","commits":1}]},"readingTime":{"minutes":1.34,"words":402},"filePathRelative":"posts/ai/deepseek/deepseek_to_idea.md","localizedDate":"2025年2月10日","excerpt":"<blockquote>\\n<p>DeepSeek接入IDEA</p>\\n</blockquote>\\n<p>这篇文章介绍如何将 IDE 集成 DeepSeek，这里以 Java 作常用的编辑器 IDEA 为例。</p>\\n<p>这里推荐使用更通用、且更简单的插件方式 Continue。</p>\\n<p>IDEA 有版本要求，太低的版本是无法使用的，建议使用较新版本。</p>\\n<p>⚠️注意：DeepSeek 最近由于众所周知的原因，性能不稳定，这个插件也提供了接入本地 Ollama+DeepSeek 的方式。</p>\\n<h3>通过 Continue 插件接入 DeepSeek</h3>\\n<p>Continue 是一款开源的 AI 辅助编程插件，适用于 IntelliJ IDEA 等 JetBrains IDE。通过自然语言和他交互来提升开发效率，为开发者提供实时代码生成、问题解决、单元测试生成等功能。</p>","autoDesc":true}');export{g as comp,u as data};
