import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as i,f as a,a as e,e as l,o as n}from"./app-Cno9IsiL.js";const t={},r=e("p",null,"Elastic Search",-1),h=l(`<p>10道不得不会的ElasticSearch面试题</p><p>以下是 ElasticSearch 面试题，相信大家都会有种及眼熟又陌生的感觉、看过可能在短暂的面试后又马上忘记了。<strong>JavaPub</strong>在这里整理这些容易忘记的重点知识及<strong>解答</strong>，<code>建议收藏，经常温习查阅</code>。</p><p>评论区见</p><p><code>关于es的面试，建议使用名词用官方语言描述会更准确。</code></p><p>@[toc]</p><h3 id="_1-说说你们公司-es-的集群架构-索引数据大小-分片有多少-以及一些调优手段-。" tabindex="-1"><a class="header-anchor" href="#_1-说说你们公司-es-的集群架构-索引数据大小-分片有多少-以及一些调优手段-。"><span>1. 说说你们公司 es 的集群架构，索引数据大小，分片有多少，以及一些调优手段 。</span></a></h3><p>节点数、分片数、副本数，尽量根据自己公司使用情况回答，当然适当放大也可行。</p><p>调优手段是现在很常见的面试题，下面这几种调优手段一定要了解懂。当然，下面的每一条都可以当做调优的一部分。</p><p><strong>设计调优</strong></p><p>参考： https://www.cnblogs.com/sanduzxcvbnm/p/12084012.html</p><p>a. 根据业务增量需求，采取基于日期模板创建索引，通过 <code>rollover API</code> 滚动索引；(rollover API我会单独写一个代码案例做讲解，公众号：JavaPub) b. 使用别名进行索引管理；（es的索引名不能改变，提供的别名机制使用非常广泛。） c. 每天凌晨定时对索引做force_merge操作，以释放空间； d. 采取冷热分离机制，热数据存储到SSD，提高检索效率；冷数据定期进行shrink操作，以缩减存储； e. 采取curator进行索引的生命周期管理； f. 仅针对需要分词的字段，合理的设置分词器； g. Mapping阶段充分结合各个字段的属性，是否需要检索、是否需要存储等。</p><p>进100+原创文章：https://gitee.com/rodert/JavaPub</p><p><strong>写入调优</strong></p><ol><li>写入前副本数设置为0；</li><li>写入前关闭refresh_interval设置为-1，禁用刷新机制；</li><li>写入过程中：采取bulk批量写入；</li><li>写入后恢复副本数和刷新间隔；</li><li>尽量使用自动生成的id。</li></ol><p><strong>查询调优</strong></p><ol><li>禁用wildcard；（通配符模式，类似于%like%）</li><li>禁用批量terms（成百上千的场景）；</li><li>充分利用倒排索引机制，能keyword类型尽量keyword；</li><li>数据量大时候，可以先基于时间敲定索引再检索；</li><li>设置合理的路由机制。</li></ol><h3 id="_2-elasticsearch-的倒排索引是什么" tabindex="-1"><a class="header-anchor" href="#_2-elasticsearch-的倒排索引是什么"><span>2. elasticsearch 的倒排索引是什么</span></a></h3><p>倒排索引也就是单词到文档的映射，当然不只是存里文档id这么简单。还包括：词频（TF，Term Frequency）、偏移量（offset）、位置（Posting）。</p><h3 id="_3-elasticsearch-是如何实现-master-选举的" tabindex="-1"><a class="header-anchor" href="#_3-elasticsearch-是如何实现-master-选举的"><span>3. elasticsearch 是如何实现 master 选举的</span></a></h3><blockquote><p>ElasticSearch 的选主是 ZenDiscovery 模块负责，源码分析将首发在。 https://gitee.com/rodert/JavaPub</p></blockquote><ol><li>对所有可以成为 Master 的节点（node.master: true）根据 nodeId 排序，每次选举每个节点都把自己所知道节点排一次序，然后选出第一个（第0位）节点，暂且认为它是 Master 节点。</li><li>如果对某个节点的投票数达到一定的值（可以成为master节点数n/2+1）并且该节点自己也选举自己，那这个节点就是master。否则重新选举。 (当然也可以自己设定一个值，最小值设定为超过能成为Master节点的n/2+1，否则会出现脑裂问题。discovery.zen.minimum_master_nodes)</li></ol><h3 id="_4-描述一下-elasticsearch-索引文档的过程" tabindex="-1"><a class="header-anchor" href="#_4-描述一下-elasticsearch-索引文档的过程"><span>4. 描述一下 Elasticsearch 索引文档的过程</span></a></h3><figure><img src="https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202405271034088.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ol><li>客户端向 Node 1 发送新建、索引或者删除请求。</li><li>节点使用文档的 _id 确定文档属于分片 0 。请求会被转发到 Node 3，因为分片 0 的主分片目前被分配在 Node 3 上。</li><li>Node 3 在主分片上面执行请求。如果成功了，它将请求并行转发到 Node 1 和 Node 2 的副本分片上。一旦所有的副本分片都报告成功, Node 3 将向协调节点报告成功，协调节点向客户端报告成功。</li></ol><p><strong>一图胜千文，记住这幅图，上面是文档在节点间分发的过程，接着说一下文档从接收到写入磁盘过程。</strong> 协调节点默认使用文档 ID 参与计算（也支持通过 routing），以便为路由提供合适的分片。</p><blockquote><p>shard = hash(document_id) % (num_of_primary_shards)</p></blockquote><ol><li>当分片所在的节点接收到来自协调节点的请求后，会将请求写入到 MemoryBuffer，然后定时（默认是每隔 1 秒）写入到 Filesystem Cache，这个从 MomeryBuffer 到 Filesystem Cache 的过程就叫做 refresh；</li><li>当然在某些情况下，存在 Momery Buffer 和 Filesystem Cache 的数据可能会丢失，ES 是通过 translog 的机制来保证数据的可靠性的。其实现机制是接收到请求后，同时也会写入到 translog 中，当 Filesystem cache 中的数据写入到磁盘中时，才会清除掉，这个过程叫做 flush；</li><li>在 flush 过程中，内存中的缓冲将被清除，内容被写入一个新段，段的 fsync将创建一个新的提交点，并将内容刷新到磁盘，旧的 translog 将被删除并开始一个新的 translog。</li><li>flush 触发的时机是定时触发（默认 30 分钟）或者 translog 变得太大（默认为 512M）时；</li></ol><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">1.</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> translog</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 可以理解为就是一个文件，一直追加。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">2.</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> MemoryBuffer</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 应用缓存。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">3.</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> Filesystem</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> Cache</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 系统缓冲区。</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>延伸阅读：Lucene 的 <code>Segement</code>:</p><blockquote><ol><li>Lucene 索引是由多个段组成，段本身是一个功能齐全的倒排索引。</li><li>段是不可变的，允许 Lucene 将新的文档增量地添加到索引中，而不用从头重建索引。</li><li>对于每一个搜索请求而言，索引中的所有段都会被搜索，并且每个段会消耗CPU 的时钟周、文件句柄和内存。这意味着段的数量越多，搜索性能会越低。</li><li>为了解决这个问题，Elasticsearch 会合并小段到一个较大的段，提交新的合并段到磁盘，并删除那些旧的小段。</li></ol></blockquote><h3 id="_5-详细描述一下-elasticsearch-搜索的过程" tabindex="-1"><a class="header-anchor" href="#_5-详细描述一下-elasticsearch-搜索的过程"><span>5. 详细描述一下 Elasticsearch 搜索的过程？</span></a></h3><blockquote><p>es作为一个分布式的存储和检索系统，每个文档根据 _id 字段做路由分发被转发到对应的shard上。</p></blockquote><p>搜索执行阶段过程分俩个部分，我们称之为 Query Then Fetch。</p><p><strong>5.1 query-查询阶段</strong></p><p>当一个search请求发出的时候，这个query会被广播到索引里面的每一个shard（主shard或副本shard），每个shard会在本地执行查询请求后会生成一个命中文档的优先级队列。</p><p>这个队列是一个排序好的top N数据的列表，它的size等于from+size的和，也就是说如果你的from是10，size是10，那么这个队列的size就是20，所以这也是为什么深度分页不能用from+size这种方式，因为from越大，性能就越低。</p><p>es里面分布式search的查询流程如下：</p><figure><img src="https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202405271035703.png" alt="es里面分布式search的查询流程" tabindex="0" loading="lazy"><figcaption>es里面分布式search的查询流程</figcaption></figure><p>查询阶段包含以下三个步骤:</p><ol><li>客户端发送一个 search 请求到 Node 3 ， Node 3 会创建一个大小为 from + size 的空优先队列。</li><li>Node 3 将查询请求转发到索引的每个主分片或副本分片中。每个分片在本地执行查询并添加结果到大小为 from + size 的本地有序优先队列中。</li><li>每个分片返回各自优先队列中所有文档的 ID 和排序值给协调节点，也就是 Node 3 ，它合并这些值到自己的优先队列中来产生一个全局排序后的结果列表。</li></ol><p><strong>5.2 fetch - 读取阶段 / 取回阶段</strong></p><figure><img src="https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202405271036279.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>分布式阶段由以下步骤构成：</p><ol><li>协调节点辨别出哪些文档需要被取回并向相关的分片提交多个 GET 请求。</li><li>每个分片加载并 丰富 文档，如果有需要的话，接着返回文档给协调节点。</li><li>一旦所有的文档都被取回了，协调节点返回结果给客户端。</li></ol><p>协调节点首先决定哪些文档 确实 需要被取回。例如，如果我们的查询指定了 { &quot;from&quot;: 90, &quot;size&quot;: 10 } ，最初的90个结果会被丢弃，只有从第91个开始的10个结果需要被取回。这些文档可能来自和最初搜索请求有关的一个、多个甚至全部分片。</p><p>协调节点给持有相关文档的每个分片创建一个 multi-get request ，并发送请求给同样处理查询阶段的分片副本。</p><p>分片加载文档体-- _source 字段—​如果有需要，用元数据和 search snippet highlighting 丰富结果文档。 一旦协调节点接收到所有的结果文档，它就组装这些结果为单个响应返回给客户端。</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">拓展阅读：</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">深翻页（Deep</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> Pagination）</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">---</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">先查后取的过程支持用</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> from</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 和</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> size</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 参数分页，但是这是</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 有限制的</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 。</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 要记住需要传递信息给协调节点的每个分片必须先创建一个</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> from</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> +</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> size</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 长度的队列，协调节点需要根据</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> number_of_shards</span><span style="--shiki-light:#005CC5;--shiki-dark:#E5C07B;"> *</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> (from </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">+</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> size</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">) 排序文档，来找到被包含在 size 里的文档。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">取决于你的文档的大小，分片的数量和你使用的硬件，给</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 10,000</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 到</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 50,000</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 的结果文档深分页（</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 1,000</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 到</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 5,000</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 页）是完全可行的。但是使用足够大的</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> from</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 值，排序过程可能会变得非常沉重，使用大量的CPU、内存和带宽。因为这个原因，我们强烈建议你不要使用深分页。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">实际上，</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> “深分页”</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 很少符合人的行为。当2到3页过去以后，人会停止翻页，并且改变搜索标准。会不知疲倦地一页一页的获取网页直到你的服务崩溃的罪魁祸首一般是机器人或者web</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> spider。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">如果你</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 确实</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 需要从你的集群取回大量的文档，你可以通过用</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> scroll</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 查询禁用排序使这个取回行为更有效率，我们会在</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> later</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> in</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> this</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> chapter</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 进行讨论。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">注：https://www.elastic.co/guide/cn/elasticsearch/guide/current/scroll.html</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-elasticsearch-在部署时-对-linux-的设置有哪些优化方法" tabindex="-1"><a class="header-anchor" href="#_6-elasticsearch-在部署时-对-linux-的设置有哪些优化方法"><span>6. Elasticsearch 在部署时，对 Linux 的设置有哪些优化方法</span></a></h3><ol><li>关闭缓存swap;</li></ol><blockquote><p>原因：大多数操作系统会将内存使用到文件系统缓存，会将应用程序未用到的内存交换出去。会导致jvm的堆内存交换到磁盘上。交换会导致性能问题。会导致内存垃圾回收延长。会导致集群节点响应时间变慢，或者从集群中断开。</p></blockquote><ol start="2"><li><p>堆内存设置为：Min（节点内存/2, 32GB）;</p></li><li><p>设置最大文件句柄数；</p></li></ol><p><strong>后俩点不懂可以先说有一定了解，关注JavaPub会做详细讲解。</strong></p><ol start="4"><li><p>调整线程池和队列大小</p></li><li><p>磁盘存储 raid 方式——存储有条件使用 RAID6，增加单节点性能以及避免单节点存储故障。</p></li></ol><blockquote><p>https://www.elastic.co/cn/blog/how-to-design-your-elasticsearch-data-storage-architecture-for-scale#raid56</p></blockquote><h3 id="_7-elasticsearch-中的节点-比如共-20-个-其中的-10-个选了一个-master-另外-10-个选了另一个-master-怎么办" tabindex="-1"><a class="header-anchor" href="#_7-elasticsearch-中的节点-比如共-20-个-其中的-10-个选了一个-master-另外-10-个选了另一个-master-怎么办"><span>7. Elasticsearch 中的节点（比如共 20 个），其中的 10 个选了一个 master，另外 10 个选了另一个 master，怎么办？</span></a></h3><ol><li><p>当集群 master 候选数量不小于 3 个时，可以通过设置最少投票通过数量（discovery.zen.minimum_master_nodes）超过所有候选节点一半以上来解决脑裂问题；</p></li><li><p>当候选数量为两个时，只能修改为唯一的一个 master 候选，其他作为 data节点，避免脑裂问题。</p></li></ol><h3 id="_8-客户端在和集群连接时-如何选择特定的节点执行请求的" tabindex="-1"><a class="header-anchor" href="#_8-客户端在和集群连接时-如何选择特定的节点执行请求的"><span>8. 客户端在和集群连接时，如何选择特定的节点执行请求的？</span></a></h3><p>client 远程连接连接一个 elasticsearch 集群。它并不加入到集群中，只是获得一个或者多个初始化的地址，并以轮询的方式与这些地址进行通信。</p><h3 id="_9-详细描述一下-elasticsearch-更新和删除文档的过程。" tabindex="-1"><a class="header-anchor" href="#_9-详细描述一下-elasticsearch-更新和删除文档的过程。"><span>9. 详细描述一下 Elasticsearch 更新和删除文档的过程。</span></a></h3><ol><li>删除和更新也都是写操作，但是 Elasticsearch 中的文档是不可变的，因此不能被删除或者改动以展示其变更；(根本原因是底层lucene的segment段文件不可更新删除)</li><li>磁盘上的每个段都有一个相应的 .del 文件。当删除请求发送后，文档并没有真 的被删除，而是在 <code>.del</code> 文件中被标记为删除。该文档依然能匹配查询，但是会在 结果中被过滤掉。当段合并时，在.del 文件中被标记为删除的文档将不会被写入 新段。</li><li>在新的文档被创建时，Elasticsearch 会为该文档指定一个版本号，当执行更新 时，旧版本的文档在.del 文件中被标记为删除，新版本的文档被索引到一个新段。</li></ol><p>旧版本的文档依然能匹配查询，但是会在结果中被过滤掉。</p><h3 id="_10-elasticsearch-对于大数据量-上亿量级-的聚合如何实现" tabindex="-1"><a class="header-anchor" href="#_10-elasticsearch-对于大数据量-上亿量级-的聚合如何实现"><span>10. Elasticsearch 对于大数据量（上亿量级）的聚合如何实现？</span></a></h3><blockquote><p>这道题目较难，相信大家看到很多类似这种回答</p></blockquote><p>Elasticsearch 提供的首个近似聚合是cardinality 度量。它提供一个字段的基数，即该字段的distinct或者unique值的数目。它是基于HLL算法的。HLL 会先对我们的输入作哈希运算，然后根据哈希运算的结果中的 bits 做概率估算从而得到基数。其特点是：可配置的精度，用来控制内存的使用（更精确 ＝ 更多内存）；小的数据集精度是非常高的；我们可以通过配置参数，来设置去重需要的固定内存使用量。无论数千还是数十亿的唯一值，内存使用量只与你配置的精确度相关。</p><p><strong>科普&amp;拓展</strong>：</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">HyperLogLog：</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">下面简称为HLL，它是</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> LogLog</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 算法的升级版，作用是能够提供不精确的去重计数。存在以下的特点：</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">1.</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 能够使用极少的内存来统计巨量的数据，在</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> Redis</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 中实现的</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> HyperLogLog，只需要12K内存就能统计2^64个数据。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">2.</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 计数存在一定的误差，误差率整体较低。标准误差为</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 0.81%</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">3.</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 误差可以被设置辅助计算因子进行降低。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">---</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">应用场景：</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">1.</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 基数不大，数据量不大就用不上，会有点大材小用浪费空间</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">2.</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 有局限性，就是只能统计基数数量，而没办法去知道具体的内容是什么</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">3.</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 和bitmap相比，属于两种特定统计情况，简单来说，HyperLogLog</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 去重比</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> bitmap</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 方便很多</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">4.</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 一般可以bitmap和hyperloglog配合使用，bitmap标识哪些用户活跃，hyperloglog计数</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">---</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">应用场景：</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">1.</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 基数不大，数据量不大就用不上，会有点大材小用浪费空间</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">2.</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 有局限性，就是只能统计基数数量，而没办法去知道具体的内容是什么</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">3.</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 和bitmap相比，属于两种特定统计情况，简单来说，HyperLogLog</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 去重比</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> bitmap</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 方便很多</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">4.</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 一般可以bitmap和hyperloglog配合使用，bitmap标识哪些用户活跃，hyperloglog计数</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">来源：刷刷面试</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_11-在并发情况下-elasticsearch-如果保证读写一致" tabindex="-1"><a class="header-anchor" href="#_11-在并发情况下-elasticsearch-如果保证读写一致"><span>11. 在并发情况下，Elasticsearch 如果保证读写一致？</span></a></h3><blockquote><p>首先要了解什么是一致性，在分布式系统中，我们一般通过CPA理论分析。</p></blockquote><p>分布式系统不可能同时满足一致性（C：Consistency）、可用性（A：Availability）和分区容忍性（P：Partition Tolerance），最多只能同时满足其中两项。</p><figure><img src="https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202405271037838.png" alt="分布式系统不可能同时满足一致性（C：Consistency）、可用性（A：Availability）和分区容忍性（P：Partition Tolerance），最多只能同时满足其中两项。" tabindex="0" loading="lazy"><figcaption>分布式系统不可能同时满足一致性（C：Consistency）、可用性（A：Availability）和分区容忍性（P：Partition Tolerance），最多只能同时满足其中两项。</figcaption></figure><ol><li>可以通过版本号使用乐观并发控制，以确保新版本不会被旧版本覆盖，由应用层来处理具体的冲突；</li><li>另外对于写操作，一致性级别支持 quorum/one/all，默认为 quorum，即只有当大多数分片可用时才允许写操作。但即使大多数可用，也可能存在因为网络等原因导致写入副本失败，这样该副本被认为故障，分片将会在一个不同的节点上重建。</li><li>对于读操作，可以设置 replication 为 sync(默认)，这使得操作在主分片和副本分片都完成后才会返回；如果设置 replication 为 async 时，也可以通过设置搜索请求参数_preference 为 primary 来查询主分片，确保文档是最新版本。</li></ol><h3 id="_11-介绍一下你们的个性化搜索方案" tabindex="-1"><a class="header-anchor" href="#_11-介绍一下你们的个性化搜索方案"><span>11. 介绍一下你们的个性化搜索方案？</span></a></h3><blockquote><p>如果你没有很多实战经验，可以基于 word2vec 做一些练习，我的博客提供了 word2vec Java版的一些Demo。</p></blockquote><p>基于 word2vec 和 Elasticsearch 实现个性化搜索，它有以下优点：</p><ol><li>基于word2vec的商品向量还有一个可用之处，就是可以用来实现相似商品的推荐；</li></ol><h3 id="推荐阅读" tabindex="-1"><a class="header-anchor" href="#推荐阅读"><span>推荐阅读：</span></a></h3><p><a href="https://mp.weixin.qq.com/s/3Nviyml0cvnX_HHkZ5DjWg" target="_blank" rel="noopener noreferrer">10道不得不会的Java基础面试题</a></p><p><a href="https://mp.weixin.qq.com/s/ug3LBR4MfM1C5uVFJaPWLQ" target="_blank" rel="noopener noreferrer">10道不得不会的Java容器面试题</a></p><p><a href="https://mp.weixin.qq.com/s/h2tTwDVqL15rCI6rftgn9A" target="_blank" rel="noopener noreferrer">10道不得不会的Java并发基础面试题</a></p><p><a href="https://mp.weixin.qq.com/s/59Tif95LGi8BTJXu47zi6g" target="_blank" rel="noopener noreferrer">10道不得不会的JavaEE面试题</a></p><p><a href="https://mp.weixin.qq.com/s/hvsaD1NlzpR0LpP-GmbU_A" target="_blank" rel="noopener noreferrer">10道不得不会的JVM面试题</a></p><p><a href="https://mp.weixin.qq.com/s/yVPwCoSQ-8OYvhw8bH0PtA" target="_blank" rel="noopener noreferrer">10道不得不会的MySQL基础面试题</a></p><p><a href="https://mp.weixin.qq.com/s/lVFwy765hQ2FvIYBHyw0yA" target="_blank" rel="noopener noreferrer">10道不得不会的MyBatis面试题</a></p><p><a href="https://mp.weixin.qq.com/s/lrHsLZANxHxd_FWTCdMNJw" target="_blank" rel="noopener noreferrer">10道不得不会的Spring面试题</a></p><p><a href="https://mp.weixin.qq.com/s/-oYKVXBaQwzyzp7ffqH7gw" target="_blank" rel="noopener noreferrer">10道不得不会的SpringBoot面试题</a></p><p><a href="https://mp.weixin.qq.com/s/z3D37HqeTUmwrdheUL_Efw" target="_blank" rel="noopener noreferrer">10道不得不会的ElasticSearch面试题</a></p><p><a href="https://mp.weixin.qq.com/s/_Pq2VgxRA4yw1j_eCfEiLg" target="_blank" rel="noopener noreferrer">10道不得不会的Redis面试题</a></p><p><a href="https://javapub.blog.csdn.net/category_11740063.html" target="_blank" rel="noopener noreferrer">10道不得不会的Kafka面试题</a></p><p><a href="https://mp.weixin.qq.com/s/ym0-x6okFi0CgF8RcxeLFA" target="_blank" rel="noopener noreferrer">10道不得不会的Zookeeper面试题</a></p><p><a href="https://mp.weixin.qq.com/s/DTC3gZNHm3Rlf_GK7twlkQ" target="_blank" rel="noopener noreferrer">10道不得不会的Docker面试题</a></p><p><a href="">10道不得不会的缓存面试题</a></p><p><a href="https://github.com/Rodert" target="_blank" rel="noopener noreferrer">GItHub</a>|<a href="https://gitee.com/rodert" target="_blank" rel="noopener noreferrer">GitEE</a></p>`,93);function p(c,o){return n(),i("div",null,[r,a(" more "),h])}const g=s(t,[["render",p],["__file","elasticsearch-interview-must.html.vue"]]),m=JSON.parse('{"path":"/posts/special/havato/elasticsearch-interview-must.html","title":"10道不得不会的ElasticSearch面试题","lang":"zh-CN","frontmatter":{"index":true,"icon":"page","title":"10道不得不会的ElasticSearch面试题","author":"Wang Shiyu","date":"2022-04-21T00:00:00.000Z","category":["最少必要面试题"],"tag":["elasticsearch","面试题"],"description":"Elastic Search","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/posts/special/havato/elasticsearch-interview-must.html"}],["meta",{"property":"og:site_name","content":"JavaPub"}],["meta",{"property":"og:title","content":"10道不得不会的ElasticSearch面试题"}],["meta",{"property":"og:description","content":"Elastic Search"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202405271034088.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-03T14:35:52.000Z"}],["meta",{"property":"article:author","content":"Wang Shiyu"}],["meta",{"property":"article:tag","content":"elasticsearch"}],["meta",{"property":"article:tag","content":"面试题"}],["meta",{"property":"article:published_time","content":"2022-04-21T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-03T14:35:52.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"10道不得不会的ElasticSearch面试题\\",\\"image\\":[\\"https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202405271034088.png\\",\\"https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202405271035703.png\\",\\"https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202405271036279.png\\",\\"https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202405271037838.png\\"],\\"datePublished\\":\\"2022-04-21T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-03T14:35:52.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Wang Shiyu\\"}]}"]]},"headers":[{"level":3,"title":"1. 说说你们公司 es 的集群架构，索引数据大小，分片有多少，以及一些调优手段 。","slug":"_1-说说你们公司-es-的集群架构-索引数据大小-分片有多少-以及一些调优手段-。","link":"#_1-说说你们公司-es-的集群架构-索引数据大小-分片有多少-以及一些调优手段-。","children":[]},{"level":3,"title":"2. elasticsearch 的倒排索引是什么","slug":"_2-elasticsearch-的倒排索引是什么","link":"#_2-elasticsearch-的倒排索引是什么","children":[]},{"level":3,"title":"3. elasticsearch 是如何实现 master 选举的","slug":"_3-elasticsearch-是如何实现-master-选举的","link":"#_3-elasticsearch-是如何实现-master-选举的","children":[]},{"level":3,"title":"4. 描述一下 Elasticsearch 索引文档的过程","slug":"_4-描述一下-elasticsearch-索引文档的过程","link":"#_4-描述一下-elasticsearch-索引文档的过程","children":[]},{"level":3,"title":"5. 详细描述一下 Elasticsearch 搜索的过程？","slug":"_5-详细描述一下-elasticsearch-搜索的过程","link":"#_5-详细描述一下-elasticsearch-搜索的过程","children":[]},{"level":3,"title":"6. Elasticsearch 在部署时，对 Linux 的设置有哪些优化方法","slug":"_6-elasticsearch-在部署时-对-linux-的设置有哪些优化方法","link":"#_6-elasticsearch-在部署时-对-linux-的设置有哪些优化方法","children":[]},{"level":3,"title":"7. Elasticsearch 中的节点（比如共 20 个），其中的 10 个选了一个 master，另外 10 个选了另一个 master，怎么办？","slug":"_7-elasticsearch-中的节点-比如共-20-个-其中的-10-个选了一个-master-另外-10-个选了另一个-master-怎么办","link":"#_7-elasticsearch-中的节点-比如共-20-个-其中的-10-个选了一个-master-另外-10-个选了另一个-master-怎么办","children":[]},{"level":3,"title":"8. 客户端在和集群连接时，如何选择特定的节点执行请求的？","slug":"_8-客户端在和集群连接时-如何选择特定的节点执行请求的","link":"#_8-客户端在和集群连接时-如何选择特定的节点执行请求的","children":[]},{"level":3,"title":"9. 详细描述一下 Elasticsearch 更新和删除文档的过程。","slug":"_9-详细描述一下-elasticsearch-更新和删除文档的过程。","link":"#_9-详细描述一下-elasticsearch-更新和删除文档的过程。","children":[]},{"level":3,"title":"10. Elasticsearch 对于大数据量（上亿量级）的聚合如何实现？","slug":"_10-elasticsearch-对于大数据量-上亿量级-的聚合如何实现","link":"#_10-elasticsearch-对于大数据量-上亿量级-的聚合如何实现","children":[]},{"level":3,"title":"11. 在并发情况下，Elasticsearch 如果保证读写一致？","slug":"_11-在并发情况下-elasticsearch-如果保证读写一致","link":"#_11-在并发情况下-elasticsearch-如果保证读写一致","children":[]},{"level":3,"title":"11. 介绍一下你们的个性化搜索方案？","slug":"_11-介绍一下你们的个性化搜索方案","link":"#_11-介绍一下你们的个性化搜索方案","children":[]},{"level":3,"title":"推荐阅读：","slug":"推荐阅读","link":"#推荐阅读","children":[]}],"git":{"createdTime":1717582746000,"updatedTime":1720017352000,"contributors":[{"name":"wangshiyu","email":"iswangshiyu@foxmail.com","commits":1}]},"readingTime":{"minutes":15.23,"words":4569},"filePathRelative":"posts/special/havato/elasticsearch-interview-must.md","localizedDate":"2022年4月21日","excerpt":"<p>Elastic Search</p>\\n","autoDesc":true}');export{g as comp,m as data};