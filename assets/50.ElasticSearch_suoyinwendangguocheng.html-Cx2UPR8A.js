import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c,a as t,b as o,w as r,d as e,e as s,r as l,o as i}from"./app-DrsF6qiY.js";const p={},u=t("p",null,[t("strong",null,[e("我是 javapub，一名 "),t("code",null,"Markdown"),e(" 程序员从👨‍💻，八股文种子选手。")])],-1),g=s("<ol><li><p><strong>分析文档内容：</strong> 首先，Elasticsearch会将文档内容进行分析，包括词条化、去除停用词、转换为小写等。这样可以提高搜索的准确性和效率。</p></li><li><p><strong>路由到分片：</strong> 接下来，Elasticsearch会根据文档的路由值确定将文档索引到哪个分片。路由值可以是文档ID的哈希值，或者是自定义的路由键。这样可以确保具有相同路由值的文档被索引到同一个分片中。</p></li><li><p><strong>创建倒排索引：</strong> 对于目标分片，Elasticsearch会为每个词条创建倒排索引，记录词条在文档中的位置信息。</p></li><li><p><strong>处理副本：</strong> 如果索引配置了副本，Elasticsearch会将文档的副本分配给其他节点上的分片。这样可以提高数据的可用性和容错性。副本的数量可以根据需求进行配置。</p></li><li><p><strong>分布式写入：</strong> 当文档被索引到目标分片和副本后，Elasticsearch会使用分布式写入协调器来确保数据的一致性。协调器会将索引请求发送给相关的分片和副本，并等待它们的确认。</p></li><li><p><strong>存储文档：</strong> 最后，Elasticsearch会将原始文档和相关的元数据存储在磁盘上。这样，当我们检索文档时，Elasticsearch可以从磁盘中读取文档内容并返回给我们。</p></li></ol>",1),h=s('<figure><img src="https://ghproxy.com/https://raw.githubusercontent.com/Rodert/javapub_oss/main/other/50.jpg?raw=true" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>最近我在更新《面试1v1》系列文章，主要以场景化的方式，讲解我们在面试中遇到的问题，致力于让每一位工程师拿到自己心仪的offer，感兴趣可以关注<strong>公众号JavaPub</strong>追更！</p><figure><img src="https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/2024%2F06%2F06%2F20240606-225632.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>🎁目录合集：</p><p>Gitee：<code>https://gitee.com/rodert/JavaPub</code></p><p>GitHub：<code>https://github.com/Rodert/JavaPub</code></p><p><a href="http://javapub.net.cn" target="_blank" rel="noopener noreferrer">http://javapub.net.cn</a></p>',7);function d(m,_){const a=l("font");return i(),c("div",null,[u,t("p",null,[t("strong",null,[o(a,{color:"blue"},{default:r(()=>[e("面试官")]),_:1}),e("： 嗨，你准备好聊一聊Elasticsearch索引文档的底层过程了吗？")])]),t("p",null,[t("strong",null,[o(a,{color:"red"},{default:r(()=>[e("候选人：")]),_:1})]),e(" 当然准备好了！让我们开始吧！")]),t("p",null,[t("strong",null,[o(a,{color:"blue"},{default:r(()=>[e("面试官")]),_:1}),e("： 首先，我们需要了解一下Elasticsearch底层索引文档的过程，包括分片和副本的处理。你知道分片和副本是什么吗？")])]),t("p",null,[t("strong",null,[o(a,{color:"red"},{default:r(()=>[e("候选人：")]),_:1})]),e(" 当然！在Elasticsearch中，索引被分成多个分片，每个分片存储了索引的一部分数据。而副本则是分片的复制，用于提高数据的可用性和容错性。")]),t("p",null,[t("strong",null,[o(a,{color:"blue"},{default:r(()=>[e("面试官")]),_:1}),e("： 很好！那我们来看一下具体的索引文档的底层过程，包括分片和副本的处理。")])]),t("p",null,[t("strong",null,[o(a,{color:"red"},{default:r(()=>[e("候选人：")]),_:1})]),e(" 在底层，当我们索引一个文档时，Elasticsearch会执行以下几个步骤：")]),g,t("p",null,[t("strong",null,[o(a,{color:"blue"},{default:r(()=>[e("面试官")]),_:1}),e("： 很好！这就是Elasticsearch索引文档的底层过程，包括分片和副本的处理。通过分析文档内容，路由到目标分片，创建倒排索引，处理副本，并使用分布式写入协调器来确保数据的一致性，Elasticsearch能够高效地处理大量的文档和复杂的搜索需求。")])]),t("p",null,[t("strong",null,[o(a,{color:"red"},{default:r(()=>[e("候选人：")]),_:1})]),e(" 是的，这个底层过程非常重要，它使得Elasticsearch能够在分布式环境中处理大规模的数据，并提供高可用性和容错性。")]),t("p",null,[t("strong",null,[o(a,{color:"blue"},{default:r(()=>[e("面试官")]),_:1}),e("： 没错！希望这个对话能帮助到你，也能帮助到你的读者。如果你还有其他问题，随时告诉我哦！")])]),h])}const E=n(p,[["render",d],["__file","50.ElasticSearch_suoyinwendangguocheng.html.vue"]]),y=JSON.parse('{"path":"/posts/special/1v1/50.ElasticSearch_suoyinwendangguocheng.html","title":"Elasticsearch索引文档底层过程","lang":"zh-CN","frontmatter":{"title":"Elasticsearch索引文档底层过程","icon":"laptop-code","category":["《面试1v1》"],"description":"我是 javapub，一名 Markdown 程序员从👨‍💻，八股文种子选手。 ： 嗨，你准备好聊一聊Elasticsearch索引文档的底层过程了吗？ 当然准备好了！让我们开始吧！ ： 首先，我们需要了解一下Elasticsearch底层索引文档的过程，包括分片和副本的处理。你知道分片和副本是什么吗？ 当然！在Elasticsearch中，索引被...","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/posts/special/1v1/50.ElasticSearch_suoyinwendangguocheng.html"}],["meta",{"property":"og:site_name","content":"JavaPub"}],["meta",{"property":"og:title","content":"Elasticsearch索引文档底层过程"}],["meta",{"property":"og:description","content":"我是 javapub，一名 Markdown 程序员从👨‍💻，八股文种子选手。 ： 嗨，你准备好聊一聊Elasticsearch索引文档的底层过程了吗？ 当然准备好了！让我们开始吧！ ： 首先，我们需要了解一下Elasticsearch底层索引文档的过程，包括分片和副本的处理。你知道分片和副本是什么吗？ 当然！在Elasticsearch中，索引被..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://ghproxy.com/https://raw.githubusercontent.com/Rodert/javapub_oss/main/other/50.jpg?raw=true"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-03T14:35:52.000Z"}],["meta",{"property":"article:author","content":"Mr.Wang"}],["meta",{"property":"article:modified_time","content":"2024-07-03T14:35:52.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Elasticsearch索引文档底层过程\\",\\"image\\":[\\"https://ghproxy.com/https://raw.githubusercontent.com/Rodert/javapub_oss/main/other/50.jpg?raw=true\\",\\"https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/2024%2F06%2F06%2F20240606-225632.png\\"],\\"dateModified\\":\\"2024-07-03T14:35:52.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Mr.Wang\\",\\"url\\":\\"https://javapub.net.cn\\"}]}"]]},"headers":[],"git":{"createdTime":1717568495000,"updatedTime":1720017352000,"contributors":[{"name":"wangshiyu","email":"iswangshiyu@foxmail.com","commits":1}]},"readingTime":{"minutes":3.01,"words":903},"filePathRelative":"posts/special/1v1/50.ElasticSearch_suoyinwendangguocheng.md","localizedDate":"2024年6月5日","excerpt":"<p><strong>我是 javapub，一名 <code>Markdown</code> 程序员从👨‍💻，八股文种子选手。</strong></p>\\n<p><strong>： 嗨，你准备好聊一聊Elasticsearch索引文档的底层过程了吗？</strong></p>\\n<p><strong></strong> 当然准备好了！让我们开始吧！</p>\\n<p><strong>： 首先，我们需要了解一下Elasticsearch底层索引文档的过程，包括分片和副本的处理。你知道分片和副本是什么吗？</strong></p>\\n<p><strong></strong> 当然！在Elasticsearch中，索引被分成多个分片，每个分片存储了索引的一部分数据。而副本则是分片的复制，用于提高数据的可用性和容错性。</p>","autoDesc":true}');export{E as comp,y as data};
