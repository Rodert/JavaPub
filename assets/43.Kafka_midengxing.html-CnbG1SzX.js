import{_ as r}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as l,a,b as o,w as n,d as t,e as p,r as s,o as c}from"./app-BJnJj2m2.js";const u={},i=a("p",null,[a("strong",null,[t("我是 javapub，一名 "),a("code",null,"Markdown"),t(" 程序员从👨‍💻，八股文种子选手。")])],-1),g=p('<figure><img src="https://ghproxy.com/https://raw.githubusercontent.com/Rodert/javapub_oss/main/other/43.jpg?raw=true" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>最近我在更新《面试1v1》系列文章，主要以场景化的方式，讲解我们在面试中遇到的问题，致力于让每一位工程师拿到自己心仪的offer，感兴趣可以关注<strong>公众号JavaPub</strong>追更！</p><figure><img src="https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/2024%2F06%2F06%2F20240606-225632.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>🎁目录合集：</p><p>Gitee：<code>https://gitee.com/rodert/JavaPub</code></p><p>GitHub：<code>https://github.com/Rodert/JavaPub</code></p><p><a href="http://javapub.net.cn" target="_blank" rel="noopener noreferrer">http://javapub.net.cn</a></p>',7);function f(d,m){const e=s("font");return c(),l("div",null,[i,a("p",null,[a("strong",null,[o(e,{color:"blue"},{default:n(()=>[t("面试官")]),_:1}),t("： 嗨，小明！听说你对Kafka的幂等性很感兴趣，是吗？")])]),a("p",null,[a("strong",null,[o(e,{color:"red"},{default:n(()=>[t("候选人：")]),_:1})]),t(" 是的，我一直听说Kafka的幂等性很重要，但是具体是什么意思呢？")]),a("p",null,[a("strong",null,[o(e,{color:"blue"},{default:n(()=>[t("面试官")]),_:1}),t("： 哈哈，别担心，我来给你解释一下。幂等性其实就是指无论执行多少次相同的操作，结果都是一样的。在Kafka中，幂等性保证了消息的处理不会因为重复发送而产生副作用。")])]),a("p",null,[a("strong",null,[o(e,{color:"red"},{default:n(()=>[t("候选人：")]),_:1})]),t(" 哦，明白了！那Kafka是怎么实现幂等性的呢？")]),a("p",null,[a("strong",null,[o(e,{color:"blue"},{default:n(()=>[t("面试官")]),_:1}),t("： 很好的问题！Kafka通过消息的唯一标识（通常是消息的key）来实现幂等性。在发送消息之前，Kafka会检查消息的key是否已经存在于特定的主题分区中。如果存在，Kafka就会认为这是一条重复的消息，并且不会将其写入分区。")])]),a("p",null,[a("strong",null,[o(e,{color:"red"},{default:n(()=>[t("候选人：")]),_:1})]),t(" 那如果我想要发送相同的消息，但是又希望它们被写入分区怎么办呢？")]),a("p",null,[a("strong",null,[o(e,{color:"blue"},{default:n(()=>[t("面试官")]),_:1}),t("： 好问题！为了解决这个问题，Kafka引入了幂等性序列号（Idempotent Sequence Number）。每个生产者都会生成一个唯一的序列号，并将其附加到消息中。Kafka会使用这个序列号来判断消息的唯一性，而不是仅仅依赖于消息的key。这样，即使发送相同的消息，只要序列号不同，Kafka仍然会将其写入分区。")])]),a("p",null,[a("strong",null,[o(e,{color:"red"},{default:n(()=>[t("候选人：")]),_:1})]),t(" 哇，这个设计真巧妙！那Kafka是如何保证幂等性的呢？")]),a("p",null,[a("strong",null,[o(e,{color:"blue"},{default:n(()=>[t("面试官")]),_:1}),t('： 很好奇心！Kafka使用了一种叫做"幂等性写入"的机制。当生产者发送消息时，Kafka会为每个分区维护一个递增的序列号。在写入消息之前，Kafka会检查消息的序列号是否大于分区中最后一条消息的序列号。如果是，Kafka会将消息写入分区，并更新序列号；如果不是，Kafka会认为这是一条重复的消息，并且不会写入分区。')])]),a("p",null,[a("strong",null,[o(e,{color:"red"},{default:n(()=>[t("候选人：")]),_:1})]),t(" 哇，这样一来，就能保证消息不会被重复写入了！Kafka真是个聪明的家伙！")]),a("p",null,[a("strong",null,[o(e,{color:"blue"},{default:n(()=>[t("面试官")]),_:1}),t("： 是的，Kafka的设计确实很巧妙。通过幂等性的机制，Kafka能够保证消息的可靠性和一致性，让我们在处理大规模数据流时更加放心。")])]),a("p",null,[a("strong",null,[o(e,{color:"red"},{default:n(()=>[t("候选人：")]),_:1})]),t(" 面试官，谢谢你的解答！我对Kafka的幂等性有了更深入的理解。")]),a("p",null,[a("strong",null,[o(e,{color:"blue"},{default:n(()=>[t("面试官")]),_:1}),t("： 不客气，小明！如果你还有其他关于Kafka或者其他技术的问题，随时都可以问我。记得在学习和工作中保持好奇心，不断探索新的知识和技术！")])]),g])}const _=r(u,[["render",f],["__file","43.Kafka_midengxing.html.vue"]]),K=JSON.parse('{"path":"/posts/special/1v1/43.Kafka_midengxing.html","title":"Kafka的幂等性","lang":"zh-CN","frontmatter":{"title":"Kafka的幂等性","icon":"laptop-code","category":["《面试1v1》"],"description":"我是 javapub，一名 Markdown 程序员从👨‍💻，八股文种子选手。 ： 嗨，小明！听说你对Kafka的幂等性很感兴趣，是吗？ 是的，我一直听说Kafka的幂等性很重要，但是具体是什么意思呢？ ： 哈哈，别担心，我来给你解释一下。幂等性其实就是指无论执行多少次相同的操作，结果都是一样的。在Kafka中，幂等性保证了消息的处理不会因为重复发...","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/posts/special/1v1/43.Kafka_midengxing.html"}],["meta",{"property":"og:site_name","content":"JavaPub"}],["meta",{"property":"og:title","content":"Kafka的幂等性"}],["meta",{"property":"og:description","content":"我是 javapub，一名 Markdown 程序员从👨‍💻，八股文种子选手。 ： 嗨，小明！听说你对Kafka的幂等性很感兴趣，是吗？ 是的，我一直听说Kafka的幂等性很重要，但是具体是什么意思呢？ ： 哈哈，别担心，我来给你解释一下。幂等性其实就是指无论执行多少次相同的操作，结果都是一样的。在Kafka中，幂等性保证了消息的处理不会因为重复发..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://ghproxy.com/https://raw.githubusercontent.com/Rodert/javapub_oss/main/other/43.jpg?raw=true"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-03T14:35:52.000Z"}],["meta",{"property":"article:author","content":"Mr.Wang"}],["meta",{"property":"article:modified_time","content":"2024-07-03T14:35:52.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Kafka的幂等性\\",\\"image\\":[\\"https://ghproxy.com/https://raw.githubusercontent.com/Rodert/javapub_oss/main/other/43.jpg?raw=true\\",\\"https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/2024%2F06%2F06%2F20240606-225632.png\\"],\\"dateModified\\":\\"2024-07-03T14:35:52.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Mr.Wang\\",\\"url\\":\\"https://javapub.net.cn\\"}]}"]]},"headers":[],"git":{"createdTime":1717568495000,"updatedTime":1720017352000,"contributors":[{"name":"wangshiyu","email":"iswangshiyu@foxmail.com","commits":1}]},"readingTime":{"minutes":2.89,"words":866},"filePathRelative":"posts/special/1v1/43.Kafka_midengxing.md","localizedDate":"2024年6月5日","excerpt":"<p><strong>我是 javapub，一名 <code>Markdown</code> 程序员从👨‍💻，八股文种子选手。</strong></p>\\n<p><strong>： 嗨，小明！听说你对Kafka的幂等性很感兴趣，是吗？</strong></p>\\n<p><strong></strong> 是的，我一直听说Kafka的幂等性很重要，但是具体是什么意思呢？</p>\\n<p><strong>： 哈哈，别担心，我来给你解释一下。幂等性其实就是指无论执行多少次相同的操作，结果都是一样的。在Kafka中，幂等性保证了消息的处理不会因为重复发送而产生副作用。</strong></p>\\n<p><strong></strong> 哦，明白了！那Kafka是怎么实现幂等性的呢？</p>","autoDesc":true}');export{_ as comp,K as data};