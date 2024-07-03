import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,a as t,b as o,w as n,d as e,e as r,r as c,o as i}from"./app-DrsF6qiY.js";const p={},u=t("h1",{id:"elasticsearch倒排索引-让搜索变得简单有趣",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#elasticsearch倒排索引-让搜索变得简单有趣"},[t("span",null,"ElasticSearch倒排索引：让搜索变得简单有趣！")])],-1),d=t("p",null,[t("strong",null,[e("我是 javapub，一名 "),t("code",null,"Markdown"),e(" 程序员从👨‍💻，八股文种子选手。")])],-1),h=r(`<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>文档1: &quot;我喜欢吃苹果&quot;</span></span>
<span class="line"><span>文档2: &quot;我喜欢吃香蕉&quot;</span></span>
<span class="line"><span>文档3: &quot;我喜欢吃橙子&quot;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们要搜索关键词&quot;喜欢吃苹果&quot;，倒排索引会记录下这个关键词在文档1中出现过。这样，当我们搜索&quot;喜欢吃苹果&quot;时，就可以直接找到文档1，而不需要遍历所有文档。</p>`,2),g=r('<figure><img src="https://ghproxy.com/https://raw.githubusercontent.com/Rodert/javapub_oss/main/other/48.jpg?raw=true" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>最近我在更新《面试1v1》系列文章，主要以场景化的方式，讲解我们在面试中遇到的问题，致力于让每一位工程师拿到自己心仪的offer，感兴趣可以关注<strong>公众号JavaPub</strong>追更！</p><figure><img src="https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/2024%2F06%2F06%2F20240606-225632.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>🎁目录合集：</p><p>Gitee：<code>https://gitee.com/rodert/JavaPub</code></p><p>GitHub：<code>https://github.com/Rodert/JavaPub</code></p><p><a href="http://javapub.net.cn" target="_blank" rel="noopener noreferrer">http://javapub.net.cn</a></p>',7);function m(b,_){const a=c("font");return i(),s("div",null,[u,d,t("p",null,[t("strong",null,[o(a,{color:"blue"},{default:n(()=>[e("面试官")]),_:1}),e("： 嗨，欢迎来到我们的面试！今天我们要聊一聊ElasticSearch倒排索引，你对这个概念了解多少呢？")])]),t("p",null,[t("strong",null,[o(a,{color:"red"},{default:n(()=>[e("候选人：")]),_:1})]),e(" 嗨，谢谢！ElasticSearch倒排索引，听起来有点高大上啊。不过，我会尽力用人话解释它。咱们先从搜索引擎说起吧。你知道搜索引擎是怎么找到相关结果的吗？")]),t("p",null,[t("strong",null,[o(a,{color:"blue"},{default:n(()=>[e("面试官")]),_:1}),e("： 当然知道！搜索引擎会根据关键词在网页中进行匹配，然后返回相关的结果。")])]),t("p",null,[t("strong",null,[o(a,{color:"red"},{default:n(()=>[e("候选人：")]),_:1})]),e(" Bingo！而ElasticSearch倒排索引就是搜索引擎的一种核心技术。它的原理其实很简单，就像是一本索引书，记录了每个关键词在哪些文档中出现过。")]),t("p",null,[t("strong",null,[o(a,{color:"blue"},{default:n(()=>[e("面试官")]),_:1}),e("： 哦，那这样搜索的速度会更快，对吧？")])]),t("p",null,[t("strong",null,[o(a,{color:"red"},{default:n(()=>[e("候选人：")]),_:1})]),e(" 没错！因为倒排索引可以直接定位到包含关键词的文档，而不需要逐个文档地搜索。这就像是你在书架上找一本书，如果有索引，你可以直接翻到对应的页码，而不需要一页一页地找。")]),t("p",null,[t("strong",null,[o(a,{color:"blue"},{default:n(()=>[e("面试官")]),_:1}),e("： 好像明白了。那你能给我一个简单的例子来解释一下吗？")])]),t("p",null,[t("strong",null,[o(a,{color:"red"},{default:n(()=>[e("候选人：")]),_:1})]),e(" 当然可以！假设我们有三个文档，分别是：")]),h,t("p",null,[t("strong",null,[o(a,{color:"blue"},{default:n(()=>[e("面试官")]),_:1}),e("： 哇，这样的话搜索速度真的会快很多！那倒排索引是怎么构建的呢？")])]),t("p",null,[t("strong",null,[o(a,{color:"red"},{default:n(()=>[e("候选人：")]),_:1})]),e(" 构建倒排索引其实也很简单。我们可以遍历所有文档，将每个文档中的关键词提取出来，并记录下关键词出现的文档编号。这样，当用户搜索时，我们只需要查找关键词对应的文档编号，就能快速定位到相关文档。")]),t("p",null,[t("strong",null,[o(a,{color:"blue"},{default:n(()=>[e("面试官")]),_:1}),e("： 这听起来不错！那倒排索引有什么应用场景呢？")])]),t("p",null,[t("strong",null,[o(a,{color:"red"},{default:n(()=>[e("候选人：")]),_:1})]),e(" 倒排索引在搜索引擎、文本检索、数据分析等领域都有广泛应用。比如，当你在搜索引擎中输入关键词，它会根据倒排索引快速找到相关的网页；在电商网站中，倒排索引可以帮助用户快速找到想要的商品。")]),t("p",null,[t("strong",null,[o(a,{color:"blue"},{default:n(()=>[e("面试官")]),_:1}),e("： 哈哈，我现在对倒排索引有了更清晰的认识！谢谢你的解释。")])]),t("p",null,[t("strong",null,[o(a,{color:"red"},{default:n(()=>[e("候选人：")]),_:1})]),e(" 不客气！我很高兴能帮助你理解倒排索引。如果你还有其他问题，我随时都可以回答。")]),g])}const y=l(p,[["render",m],["__file","48.ElasticSearch_daopaisuoyin.html.vue"]]),E=JSON.parse('{"path":"/posts/special/1v1/48.ElasticSearch_daopaisuoyin.html","title":"Elasticsearch倒排索引","lang":"zh-CN","frontmatter":{"title":"Elasticsearch倒排索引","icon":"laptop-code","category":["《面试1v1》"],"description":"ElasticSearch倒排索引：让搜索变得简单有趣！ 我是 javapub，一名 Markdown 程序员从👨‍💻，八股文种子选手。 ： 嗨，欢迎来到我们的面试！今天我们要聊一聊ElasticSearch倒排索引，你对这个概念了解多少呢？ 嗨，谢谢！ElasticSearch倒排索引，听起来有点高大上啊。不过，我会尽力用人话解释它。咱们先从搜索...","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/posts/special/1v1/48.ElasticSearch_daopaisuoyin.html"}],["meta",{"property":"og:site_name","content":"JavaPub"}],["meta",{"property":"og:title","content":"Elasticsearch倒排索引"}],["meta",{"property":"og:description","content":"ElasticSearch倒排索引：让搜索变得简单有趣！ 我是 javapub，一名 Markdown 程序员从👨‍💻，八股文种子选手。 ： 嗨，欢迎来到我们的面试！今天我们要聊一聊ElasticSearch倒排索引，你对这个概念了解多少呢？ 嗨，谢谢！ElasticSearch倒排索引，听起来有点高大上啊。不过，我会尽力用人话解释它。咱们先从搜索..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://ghproxy.com/https://raw.githubusercontent.com/Rodert/javapub_oss/main/other/48.jpg?raw=true"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-03T14:35:52.000Z"}],["meta",{"property":"article:author","content":"Mr.Wang"}],["meta",{"property":"article:modified_time","content":"2024-07-03T14:35:52.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Elasticsearch倒排索引\\",\\"image\\":[\\"https://ghproxy.com/https://raw.githubusercontent.com/Rodert/javapub_oss/main/other/48.jpg?raw=true\\",\\"https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/2024%2F06%2F06%2F20240606-225632.png\\"],\\"dateModified\\":\\"2024-07-03T14:35:52.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Mr.Wang\\",\\"url\\":\\"https://javapub.net.cn\\"}]}"]]},"headers":[],"git":{"createdTime":1717568495000,"updatedTime":1720017352000,"contributors":[{"name":"wangshiyu","email":"iswangshiyu@foxmail.com","commits":1}]},"readingTime":{"minutes":3.03,"words":908},"filePathRelative":"posts/special/1v1/48.ElasticSearch_daopaisuoyin.md","localizedDate":"2024年6月5日","excerpt":"\\n<p><strong>我是 javapub，一名 <code>Markdown</code> 程序员从👨‍💻，八股文种子选手。</strong></p>\\n<p><strong>： 嗨，欢迎来到我们的面试！今天我们要聊一聊ElasticSearch倒排索引，你对这个概念了解多少呢？</strong></p>\\n<p><strong></strong> 嗨，谢谢！ElasticSearch倒排索引，听起来有点高大上啊。不过，我会尽力用人话解释它。咱们先从搜索引擎说起吧。你知道搜索引擎是怎么找到相关结果的吗？</p>\\n<p><strong>： 当然知道！搜索引擎会根据关键词在网页中进行匹配，然后返回相关的结果。</strong></p>","autoDesc":true}');export{y as comp,E as data};
