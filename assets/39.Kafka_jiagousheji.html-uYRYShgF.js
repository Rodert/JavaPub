import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as i,o as a,e as t}from"./app-BJnJj2m2.js";const n={},e=t(`<p><strong>面试官：</strong> 嗨，小明！听说你对Kafka的架构设计很感兴趣，是吗？</p><p><strong>候选人：</strong> 是的，我一直对Kafka很好奇。它是如何处理大规模数据流的呢？</p><p><strong>面试官：</strong> 哈哈，没错！Kafka是一个强大的分布式流处理平台。它的架构设计非常有趣，我们来一起探索一下吧！</p><p><strong>候选人：</strong> 太好了！我迫不及待想了解更多。</p><p><strong>面试官：</strong> 那我们先从Kafka的基本概念开始吧。Kafka有四个核心组件：Producer（生产者）、Consumer（消费者）、Topic（主题）和Broker（代理）。</p><p><strong>候选人：</strong> 好的，这些概念我都知道。Producer负责将消息发送到Kafka集群，Consumer从集群中读取消息，Topic是消息的类别，而Broker则是消息的存储和传输中心。</p><p><strong>面试官：</strong> 没错！Kafka的架构设计非常简洁明了。现在，让我们深入了解一下Broker的内部结构。</p><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">// 这是Kafka Broker的源码，我们来看一下它是如何工作的</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;"> KafkaBroker</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">    private</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> List</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#E5C07B;">TopicPartition</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> partitions</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">    </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">    public</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> receiveMessage</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">Message</span><span style="--shiki-light:#E36209;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"> message</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">)</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">        // 接收消息的逻辑</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">        // ...</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">    </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">    public</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> sendMessage</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">Message</span><span style="--shiki-light:#E36209;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"> message</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">)</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">        // 发送消息的逻辑</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">        // ...</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">    </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">    // 更多方法...</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>候选人：</strong> 哇，你真的写了一段Kafka Broker的源码！看起来很简单。</p><p><strong>面试官：</strong> 是的，这只是一个简化的示例，但它展示了Broker的基本工作原理。当Producer发送消息时，Broker会接收并存储消息。而当Consumer请求消息时，Broker会将消息发送给Consumer。</p><p><strong>候选人：</strong> 这听起来很直观。那么，Kafka是如何实现高吞吐量和可伸缩性的呢？</p><p><strong>面试官：</strong> 很好的问题！Kafka通过分区（Partition）和副本（Replication）来实现高吞吐量和可伸缩性。</p><p><strong>候选人：</strong> 分区和副本？能给我解释一下吗？</p><p><strong>面试官：</strong> 当然！分区是将Topic分成多个较小的部分，每个分区都有一个Leader和多个Follower副本。Leader负责处理读写请求，而Follower副本则用于备份和提供冗余。</p><p><strong>候选人：</strong> 这样一来，每个分区都可以独立地处理读写请求，对吗？</p><p><strong>面试官：</strong> 没错！这就是为什么Kafka能够实现高吞吐量和可伸缩性的原因之一。通过将Topic分成多个分区，Kafka可以并行处理大量的消息。</p><p><strong>候选人：</strong> 那么，如果Leader副本出现故障怎么办？</p><p><strong>面试官：</strong> 很好的问题！Kafka使用ZooKeeper来管理分区和副本的状态。当Leader副本发生故障时，ZooKeeper会自动选举一个新的Leader副本。</p><p><strong>候选人：</strong> 这样就能保证高可用性了！</p><p><strong>面试官：</strong> 没错！Kafka的架构设计非常注重可靠性和容错性。它能够自动处理故障，并保证消息的可靠传递。</p><p><strong>候选人：</strong> 太棒了！我对Kafka的架构设计有了更深入的了解。谢谢你的解答！</p><p><strong>面试官：</strong> 不客气！如果你还有其他问题，随时问我。记住，Kafka是一个非常强大的工具，它在大数据处理和实时流处理方面有着广泛的应用。</p>`,22),r=[e];function l(p,k){return a(),i("div",null,r)}const g=s(n,[["render",l],["__file","39.Kafka_jiagousheji.html.vue"]]),d=JSON.parse('{"path":"/posts/special/1v1/39.Kafka_jiagousheji.html","title":"Kafka架构设计","lang":"zh-CN","frontmatter":{"title":"Kafka架构设计","icon":"laptop-code","category":["《面试1v1》"],"description":"面试官： 嗨，小明！听说你对Kafka的架构设计很感兴趣，是吗？ 候选人： 是的，我一直对Kafka很好奇。它是如何处理大规模数据流的呢？ 面试官： 哈哈，没错！Kafka是一个强大的分布式流处理平台。它的架构设计非常有趣，我们来一起探索一下吧！ 候选人： 太好了！我迫不及待想了解更多。 面试官： 那我们先从Kafka的基本概念开始吧。Kafka有四个...","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/posts/special/1v1/39.Kafka_jiagousheji.html"}],["meta",{"property":"og:site_name","content":"JavaPub"}],["meta",{"property":"og:title","content":"Kafka架构设计"}],["meta",{"property":"og:description","content":"面试官： 嗨，小明！听说你对Kafka的架构设计很感兴趣，是吗？ 候选人： 是的，我一直对Kafka很好奇。它是如何处理大规模数据流的呢？ 面试官： 哈哈，没错！Kafka是一个强大的分布式流处理平台。它的架构设计非常有趣，我们来一起探索一下吧！ 候选人： 太好了！我迫不及待想了解更多。 面试官： 那我们先从Kafka的基本概念开始吧。Kafka有四个..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-03T14:35:52.000Z"}],["meta",{"property":"article:author","content":"Mr.Wang"}],["meta",{"property":"article:modified_time","content":"2024-07-03T14:35:52.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Kafka架构设计\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-07-03T14:35:52.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Mr.Wang\\",\\"url\\":\\"https://javapub.net.cn\\"}]}"]]},"headers":[],"git":{"createdTime":1717568495000,"updatedTime":1720017352000,"contributors":[{"name":"wangshiyu","email":"iswangshiyu@foxmail.com","commits":1}]},"readingTime":{"minutes":2.68,"words":805},"filePathRelative":"posts/special/1v1/39.Kafka_jiagousheji.md","localizedDate":"2024年6月5日","excerpt":"<p><strong>面试官：</strong> 嗨，小明！听说你对Kafka的架构设计很感兴趣，是吗？</p>\\n<p><strong>候选人：</strong> 是的，我一直对Kafka很好奇。它是如何处理大规模数据流的呢？</p>\\n<p><strong>面试官：</strong> 哈哈，没错！Kafka是一个强大的分布式流处理平台。它的架构设计非常有趣，我们来一起探索一下吧！</p>\\n<p><strong>候选人：</strong> 太好了！我迫不及待想了解更多。</p>\\n<p><strong>面试官：</strong> 那我们先从Kafka的基本概念开始吧。Kafka有四个核心组件：Producer（生产者）、Consumer（消费者）、Topic（主题）和Broker（代理）。</p>","autoDesc":true}');export{g as comp,d as data};