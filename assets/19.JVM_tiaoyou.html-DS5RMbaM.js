import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as l,a as t,b as n,w as s,d as e,e as i,r,o as p}from"./app-DrsF6qiY.js";const c={},g=t("p",null,[t("strong",null,[e("我是 javapub，一名 "),t("code",null,"Markdown"),e(" 程序员从👨‍💻，八股文种子选手。")])],-1),u=i(`<ol><li><strong>设置JVM参数</strong>:像Heap大小、垃圾收集器选择等,根据应用特点选择合适参数。</li></ol><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">-Xmx4096m</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">   //堆最大值</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">-Xms4096m</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">    //堆初始值</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">-XX:+UseG1GC</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> //设置G1垃圾收集器</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li><strong>采用监控工具</strong>:像JDK自带的JConsole、JVisualVM,或第三方工具。实时监控运行指标,找出性能瓶颈。</li><li><strong>JAVA代码优化</strong>:合理使用数据结构,避免高复杂度算法,少创建临时对象等。</li><li><strong>配置日志</strong>:输出GC、内存、CPU相关日志,分析定位问题。</li><li><strong>定期压测</strong>:通过压力测试找出系统瓶颈,及早解决潜在问题。</li></ol>`,3),d=i("<ol><li><strong>-Xmx、-Xms</strong>:设置堆最大值和初始值,根据应用内存需求适当设置。</li><li><strong>-XX:+UseG1GC</strong>:设置G1垃圾收集器,针对我使用的应用,G1表现良好。</li><li><strong>-XX:+PrintGCDetails</strong>:输出详细的GC日志,用于分析垃圾收集情况。</li><li><strong>-XX:+PrintGCDateStamps</strong>:在GC日志前输出时间戳,方便对时间敏感应用进行分析。</li><li><strong>-XX:+HeapDumpOnOutOfMemoryError</strong>:导出OOM时的堆转储文件,用于后续分析。</li><li><strong>JVisualVM</strong>:用来实时监控内存、GC、线程、CPU等运行情况。</li><li><strong>JConsole</strong>:用于观察运行时的线程活动、内存变化、类加载等情况。</li></ol><p>这些参数和工具在我日常工作的JVM调优和问题排查中发挥了很大作用。但我还需要继续学习其更深层次的用法与理论知识,运用得更加娴熟高效。</p>",2),h=i('<ol><li>深入理解各种垃圾收集器的设计与实现原理,特别是G1、ZGC等高性能收集器。</li><li>研究JVM内存模型和对象创建过程,以及两者对调优的影响。</li><li>学习各项运行指标的测量与对调优的意义,如吞吐量、停顿时间等。</li><li>掌握各类JVM运行日志的生成与解析,特别是GC日志、CPU profiles等。</li><li>理解JIT(Just-In-Time)编译器的工作原理与调优手段。</li><li>学习Java Mission Control等高级监控与故障排除工具的使用。</li><li>不断通过实践来提高各工具与理论的运用能力,发现更多调优机会。</li><li>关注OpenJDK等开源项目了解JVM的最新进展与发展方向。</li><li>参考业界大佬的优秀文章与经验,不断总结与提高。</li></ol><p>这些是我进阶JVM调优所制定的学习计划,需要耐心学习与长期实践,不断深耕累积。</p><figure><img src="https://ghproxy.com/https://raw.githubusercontent.com/Rodert/javapub_oss/main/other/19.jpg?raw=true" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>最近我在更新《面试1v1》系列文章，主要以场景化的方式，讲解我们在面试中遇到的问题，致力于让每一位工程师拿到自己心仪的offer，感兴趣可以关注<strong>公众号JavaPub</strong>追更！</p><figure><img src="https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/2024%2F06%2F06%2F20240606-225632.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>🎁目录合集：</p><p>Gitee：<code>https://gitee.com/rodert/JavaPub</code></p><p>GitHub：<code>https://github.com/Rodert/JavaPub</code></p><p><a href="http://javapub.net.cn" target="_blank" rel="noopener noreferrer">http://javapub.net.cn</a></p>',9);function m(J,M){const o=r("font");return p(),l("div",null,[g,t("p",null,[t("strong",null,[n(o,{color:"blue"},{default:s(()=>[e("面试官")]),_:1}),e("： 小伙子,说听说你JVM调优挺在行?")])]),t("p",null,[t("strong",null,[n(o,{color:"red"},{default:s(()=>[e("候选人：")]),_:1})]),e(" 谢谢夸奖,我对JVM调优还在学习中,远未达到在行的程度。不过日常工作中也对JVM参数与监控工具稍有使用,算是入门水平吧。")]),t("p",null,[t("strong",null,[n(o,{color:"blue"},{default:s(()=>[e("面试官")]),_:1}),e("： 那就给我简单介绍下JVM调优的方法和手段吧!")])]),t("p",null,[t("strong",null,[n(o,{color:"red"},{default:s(()=>[e("候选人：")]),_:1})]),e(" JVM调优主要通过以下手段:")]),u,t("p",null,[t("strong",null,[n(o,{color:"blue"},{default:s(()=>[e("面试官")]),_:1}),e("： 日常工作用的最多哪些JVM参数和监控工具?")])]),t("p",null,[t("strong",null,[n(o,{color:"red"},{default:s(()=>[e("候选人：")]),_:1})]),e(" 我日常工作中最常用的JVM参数和监控工具如下:")]),d,t("p",null,[t("strong",null,[n(o,{color:"blue"},{default:s(()=>[e("面试官")]),_:1}),e("： 不错,你已经掌握了JVM调优的基础知识和日常工具,这是个不错的入门!")])]),t("p",null,[t("strong",null,[n(o,{color:"blue"},{default:s(()=>[e("面试官")]),_:1}),e("： 那么,作为JVM调优的进阶,你有哪些学习计划?")])]),t("p",null,[t("strong",null,[n(o,{color:"red"},{default:s(()=>[e("候选人：")]),_:1})]),e(" 我的JVM调优进阶学习计划如下:")]),h])}const _=a(c,[["render",m],["__file","19.JVM_tiaoyou.html.vue"]]),f=JSON.parse('{"path":"/posts/special/1v1/19.JVM_tiaoyou.html","title":"JVM调优","lang":"zh-CN","frontmatter":{"title":"JVM调优","icon":"laptop-code","category":["《面试1v1》"],"description":"我是 javapub，一名 Markdown 程序员从👨‍💻，八股文种子选手。 ： 小伙子,说听说你JVM调优挺在行? 谢谢夸奖,我对JVM调优还在学习中,远未达到在行的程度。不过日常工作中也对JVM参数与监控工具稍有使用,算是入门水平吧。 ： 那就给我简单介绍下JVM调优的方法和手段吧! JVM调优主要通过以下手段: 设置JVM参数:像Heap大...","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/posts/special/1v1/19.JVM_tiaoyou.html"}],["meta",{"property":"og:site_name","content":"JavaPub"}],["meta",{"property":"og:title","content":"JVM调优"}],["meta",{"property":"og:description","content":"我是 javapub，一名 Markdown 程序员从👨‍💻，八股文种子选手。 ： 小伙子,说听说你JVM调优挺在行? 谢谢夸奖,我对JVM调优还在学习中,远未达到在行的程度。不过日常工作中也对JVM参数与监控工具稍有使用,算是入门水平吧。 ： 那就给我简单介绍下JVM调优的方法和手段吧! JVM调优主要通过以下手段: 设置JVM参数:像Heap大..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://ghproxy.com/https://raw.githubusercontent.com/Rodert/javapub_oss/main/other/19.jpg?raw=true"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-03T14:35:52.000Z"}],["meta",{"property":"article:author","content":"Mr.Wang"}],["meta",{"property":"article:modified_time","content":"2024-07-03T14:35:52.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"JVM调优\\",\\"image\\":[\\"https://ghproxy.com/https://raw.githubusercontent.com/Rodert/javapub_oss/main/other/19.jpg?raw=true\\",\\"https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/2024%2F06%2F06%2F20240606-225632.png\\"],\\"dateModified\\":\\"2024-07-03T14:35:52.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Mr.Wang\\",\\"url\\":\\"https://javapub.net.cn\\"}]}"]]},"headers":[],"git":{"createdTime":1717568495000,"updatedTime":1720017352000,"contributors":[{"name":"wangshiyu","email":"iswangshiyu@foxmail.com","commits":1}]},"readingTime":{"minutes":3.39,"words":1017},"filePathRelative":"posts/special/1v1/19.JVM_tiaoyou.md","localizedDate":"2024年6月5日","excerpt":"<p><strong>我是 javapub，一名 <code>Markdown</code> 程序员从👨‍💻，八股文种子选手。</strong></p>\\n<p><strong>： 小伙子,说听说你JVM调优挺在行?</strong></p>\\n<p><strong></strong> 谢谢夸奖,我对JVM调优还在学习中,远未达到在行的程度。不过日常工作中也对JVM参数与监控工具稍有使用,算是入门水平吧。</p>\\n<p><strong>： 那就给我简单介绍下JVM调优的方法和手段吧!</strong></p>\\n<p><strong></strong> JVM调优主要通过以下手段:</p>\\n<ol>\\n<li><strong>设置JVM参数</strong>:像Heap大小、垃圾收集器选择等,根据应用特点选择合适参数。</li>\\n</ol>","autoDesc":true}');export{_ as comp,f as data};