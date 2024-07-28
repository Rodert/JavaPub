import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as r,f as t,a,e as i,o as s}from"./app-BJnJj2m2.js";const n={},o=a("p",null,"Redis",-1),p=i('<p>10道不得不会的 Redis 面试题</p><p>以下是 Redis 面试题，相信大家都会有种及眼熟又陌生的感觉、看过可能在短暂的面试后又马上忘记了。<strong>JavaPub</strong>在这里整理这些容易忘记的重点知识及<strong>解答</strong>，<code>建议收藏，经常温习查阅</code>。</p><p>评论区见</p><p>@[toc]</p><h3 id="_1-redis是什么" tabindex="-1"><a class="header-anchor" href="#_1-redis是什么"><span>1. Redis是什么？</span></a></h3><blockquote><p>一般问这个问题你最少要答出以下几点</p></blockquote><p>Redis 是一个<strong>基于内存的 key-value</strong> 存储系统，数据结构包括<strong>字符串、list、set、zset（sorted set --有序集合）和hash</strong>，bitmap，GeoHash(坐标)，HyperLogLog，Streams（5.x版本以后）</p><h3 id="_2-你在哪些场景使用redis" tabindex="-1"><a class="header-anchor" href="#_2-你在哪些场景使用redis"><span>2. 你在哪些场景使用redis</span></a></h3><blockquote><p>你有实战经验，那就直接表演。如果没有，选几个下面的经典场景</p></blockquote><ol><li>作为队列使用，（因为是基于内存、一般不会作为消费队列、作为循环队列必要适用）；</li><li>模拟类似于token这种需要设置过期时间的场景，登录失效；</li><li>分布式缓存，避免大量请求底层关系型数据库，大大降低数据库压力；</li><li>分布式锁；</li><li>基于 bitmap 实现布隆过滤器；</li><li>排行榜-基于zset（有序集合数据类型）；</li><li>计数器-对于浏览量、播放量等并发较高，使用 redis incr 实现计数器功能；</li><li>分布式会话；</li><li>消息系统；</li></ol><h3 id="_3-为什么redis是单线程的" tabindex="-1"><a class="header-anchor" href="#_3-为什么redis是单线程的"><span>3. 为什么Redis是单线程的?</span></a></h3><p>这个问题给一个官方答案</p><p>因为Redis是基于内存的操作，CPU不是Redis的瓶颈，Redis的瓶颈最有可能是机器内存的大小或者网络带宽。既然单线程容易实现，而且CPU不会成为瓶颈，那就顺理成章地采用单线程的方案了。</p><h3 id="_4-redis持久化有几种方式" tabindex="-1"><a class="header-anchor" href="#_4-redis持久化有几种方式"><span>4. Redis持久化有几种方式？</span></a></h3><p>redis 提供了两种持久化的方式，分别是<strong>快照方式（RDB Redis DataBase）和文件追加（AOF Append Only File）</strong>。</p><p>显而易见，快照方式重启恢复快、但是数据更容易丢失，文件追加数据更完整、重启恢复慢。</p><p><strong>混合持久化方式</strong>，Redis 4.0之后新增的方式，混合持久化是结合RDB和AOF的优点，在写入的时候先把当前的数据以RDB的形式写入到文件的开头，再将后续的操作以AOF的格式存入文件当中，这样既能保证重启时的速度，又能降低数据丢失的风险。</p><p>在恢复时，先恢复快照方式保存的文件，然后再恢复追加文件中的增量数据。</p><h3 id="_5-什么是缓存穿透-怎么解决" tabindex="-1"><a class="header-anchor" href="#_5-什么是缓存穿透-怎么解决"><span>5. 什么是缓存穿透？怎么解决？</span></a></h3><p>缓存穿透是指用户请求的数据在缓存中不存在即没有命中，同时在数据库中也不存在，导致用户每次请求该数据都要去数据库中查询一遍，然后返回空。</p><p>如果有恶意攻击者不断请求系统中不存在的数据，会导致短时间大量请求落在数据库上，造成数据库压力过大，甚至击垮数据库系统。</p><p>这就叫做缓存穿透。</p><p><strong>怎么解决？</strong></p><ul><li><p>对查询结果为空的情况也进行缓存，缓存时间设置短一点，或者该key对应的数据insert之后清理缓存。</p></li><li><p>对一定不存在的key进行过滤。可以把所有的可能存在的key放到一个大的Bitmap中，查询时通过该Bitmap过滤。(也就是布隆过滤器的原理：<a href="https://mp.weixin.qq.com/s?__biz=MzUzNDUyOTY0Nw==&amp;mid=2247483968&amp;idx=1&amp;sn=0251e9eed08ca688cc4442cf8223b643&amp;chksm=fa921140cde5985647e8b5a98b0e0270d59f962a2daba6784b26546a892677e5d7965811b402&amp;token=529078779&amp;lang=zh_CN#rd" target="_blank" rel="noopener noreferrer">大白话讲解布隆过滤器</a>)</p></li></ul><h3 id="_6-什么是缓存雪崩" tabindex="-1"><a class="header-anchor" href="#_6-什么是缓存雪崩"><span>6. 什么是缓存雪崩?</span></a></h3><p>缓存雪崩是指缓存中数据大批量到过期时间，而查询数据量巨大，请求直接落到数据库上，引起数据库压力过大甚至宕机。和缓存击穿不同的是，缓存击穿指并发查同一条数据，缓存雪崩是不同数据都过期了，很多数据都查不到从而查数据库。</p><p><strong>怎么解决？</strong></p><p>常用的解决方案有：</p><ul><li>均匀过期</li><li>加互斥锁</li><li>缓存永不过期</li><li>双层缓存策略</li></ul><p><strong>均匀过期</strong>：设置不同的过期时间，让缓存失效的时间点尽量均匀。通常可以为有效期增加随机值或者统一规划有效期。</p><p><strong>加互斥锁</strong>：跟缓存击穿解决思路一致，同一时间只让一个线程构建缓存，其他线程阻塞排队。</p><p><strong>缓存永不过期</strong>：跟缓存击穿解决思路一致，缓存在物理上永远不过期，用一个异步的线程更新缓存。</p><p><strong>双层缓存策略</strong>：使用主备两层缓存：</p><p>主缓存：有效期按照经验值设置，设置为主读取的缓存，主缓存失效后从数据库加载最新值。</p><p>备份缓存：有效期长，获取锁失败时读取的缓存，主缓存更新时需要同步更新备份缓存。</p><h3 id="_7-redis使用上如何做内存优化" tabindex="-1"><a class="header-anchor" href="#_7-redis使用上如何做内存优化"><span>7. Redis使用上如何做内存优化？</span></a></h3><ol><li><strong>缩短键值的长度</strong></li></ol><ul><li>缩短值的长度才是关键，如果值是一个大的业务对象，可以将对象序列化成二进制数组；</li><li>首先应该在业务上进行精简，去掉不必要的属性，避免存储一些没用的数据；</li><li>其次是序列化的工具选择上，应该选择更高效的序列化工具来降低字节数组大小；</li><li>以JAVA为例，内置的序列化方式无论从速度还是压缩比都不尽如人意，这时可以选择更高效的序列化工具，如: protostuff，kryo等</li></ul><ol start="2"><li><strong>共享对象池</strong></li></ol><p>对象共享池指Redis内部维护[0-9999]的整数对象池。创建大量的整数类型redisObject存在内存开销，每个redisObject内部结构至少占16字节，甚至超过了整数自身空间消耗。所以Redis内存维护一个[0-9999]的整数对象池，用于节约内存。 除了整数值对象，其他类型如list,hash,set,zset内部元素也可以使用整数对象池。因此开发中在满足需求的前提下，尽量使用整数对象以节省内存。</p><ol start="3"><li><strong>字符串优化</strong></li></ol><p>因为redis的惰性删除机制，字符串缩减后的空间不释放，作为预分配空间保留。尽量做新增不做更新。</p><ol start="4"><li><strong>编码优化</strong></li></ol><p>所谓编码就是具体使用哪种底层数据结构来实现。编码不同将直接影响数据的内存占用和读写效率。</p><p>这个需要掌握redis底层的数据结构。下图作为参考：</p><figure><img src="https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202405271041311.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ol start="5"><li><strong>控制key的数量</strong></li></ol><h3 id="_8-你们redis使用哪种部署方式" tabindex="-1"><a class="header-anchor" href="#_8-你们redis使用哪种部署方式"><span>8. 你们redis使用哪种部署方式？</span></a></h3><p>redis部署分为单节点、主从部署（master-slave）、哨兵部署（Sentinel）、集群部署（cluster）。</p><p>单节点：也就是单机部署；</p><p>主从部署：分为一主一从或一主多从，主从之间同步分为全量或增量。量同步：master 节点通过 BGSAVE 生成对应的RDB文件，然后发送给slave节点，slave节点接收到写入命令后将master发送过来的文件加载并写入；增量同步：即在 master-slave 关系建立开始，master每执行一次数据变更的命令就会同步至slave节点。一般会将写请求转发到master，读请求转发到slave。提高了redis的性能。</p><p>哨兵部署：分别有哨兵集群与Redis的主从集群，哨兵作为操作系统中的一个监控进程，对应监控每一个Redis实例，如果master服务异常（ping pong其中节点没有回复且超过了一定时间），就会多个哨兵之间进行确认，如果超过一半确认服务异常，则对master服务进行下线处理，并且选举出当前一个slave节点来转换成master节点；如果slave节点服务异常，也是经过多个哨兵确认后，进行下线处理。提高了redis集群高可用的特性，及横向扩展能力的增强。</p><figure><img src="https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202405271041077.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>集群部署：属于**“去中心化”**的一种方式，多个 master 节点保存整个集群中的全部数据，而数据根据 key 进行 crc-16 校验算法进行散列，将 key 散列成对应 16383 个 slot，而 Redis cluster 集群中每个 master 节点负责不同的slot范围。每个 master 节点下还可以配置多个 slave 节点，同时也可以在集群中再使用 sentinel 哨兵提升整个集群的高可用性。</p><figure><img src="https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202405271042033.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_9-redis实现分布式锁要注意什么" tabindex="-1"><a class="header-anchor" href="#_9-redis实现分布式锁要注意什么"><span>9. redis实现分布式锁要注意什么？</span></a></h3><ol><li>加锁过程要保证原子性；</li><li>保证谁加的锁只能被谁解锁，即Redis加锁的value，解锁时需要传入相同的value才能成功，保证value唯一性；</li><li>设置锁超时时间，防止加锁方异常无法释放锁时其他客户端无法获取锁，同时，超时时间要大于业务处理时间；</li></ol><p>使用Redis命令 <code>SET lock_key unique_value NX EX seconds</code> 进行加锁，单命令操作，Redis是串行执行命令，所以能保证只有一个能加锁成功。</p><h2 id="推荐阅读" tabindex="-1"><a class="header-anchor" href="#推荐阅读"><span>推荐阅读：</span></a></h2><p><a href="https://mp.weixin.qq.com/s/3Nviyml0cvnX_HHkZ5DjWg" target="_blank" rel="noopener noreferrer">10道不得不会的Java基础面试题</a></p><p><a href="https://mp.weixin.qq.com/s/ug3LBR4MfM1C5uVFJaPWLQ" target="_blank" rel="noopener noreferrer">10道不得不会的Java容器面试题</a></p><p><a href="https://mp.weixin.qq.com/s/h2tTwDVqL15rCI6rftgn9A" target="_blank" rel="noopener noreferrer">10道不得不会的Java并发基础面试题</a></p><p><a href="https://mp.weixin.qq.com/s/59Tif95LGi8BTJXu47zi6g" target="_blank" rel="noopener noreferrer">10道不得不会的JavaEE面试题</a></p><p><a href="https://mp.weixin.qq.com/s/hvsaD1NlzpR0LpP-GmbU_A" target="_blank" rel="noopener noreferrer">10道不得不会的JVM面试题</a></p><p><a href="https://mp.weixin.qq.com/s/yVPwCoSQ-8OYvhw8bH0PtA" target="_blank" rel="noopener noreferrer">10道不得不会的MySQL基础面试题</a></p><p><a href="https://mp.weixin.qq.com/s/lVFwy765hQ2FvIYBHyw0yA" target="_blank" rel="noopener noreferrer">10道不得不会的MyBatis面试题</a></p><p><a href="https://mp.weixin.qq.com/s/lrHsLZANxHxd_FWTCdMNJw" target="_blank" rel="noopener noreferrer">10道不得不会的Spring面试题</a></p><p><a href="https://mp.weixin.qq.com/s/-oYKVXBaQwzyzp7ffqH7gw" target="_blank" rel="noopener noreferrer">10道不得不会的SpringBoot面试题</a></p><p><a href="https://mp.weixin.qq.com/s/z3D37HqeTUmwrdheUL_Efw" target="_blank" rel="noopener noreferrer">10道不得不会的ElasticSearch面试题</a></p><p><a href="https://mp.weixin.qq.com/s/_Pq2VgxRA4yw1j_eCfEiLg" target="_blank" rel="noopener noreferrer">10道不得不会的Redis面试题</a></p><p><a href="https://javapub.blog.csdn.net/category_11740063.html" target="_blank" rel="noopener noreferrer">10道不得不会的Kafka面试题</a></p><p><a href="https://mp.weixin.qq.com/s/ym0-x6okFi0CgF8RcxeLFA" target="_blank" rel="noopener noreferrer">10道不得不会的Zookeeper面试题</a></p><p><a href="https://mp.weixin.qq.com/s/DTC3gZNHm3Rlf_GK7twlkQ" target="_blank" rel="noopener noreferrer">10道不得不会的Docker面试题</a></p><p><a href="">10道不得不会的缓存面试题</a></p><p><a href="https://github.com/Rodert" target="_blank" rel="noopener noreferrer">GItHub</a>|<a href="https://gitee.com/rodert" target="_blank" rel="noopener noreferrer">GitEE</a></p>',75);function l(d,c){return s(),r("div",null,[o,t(" more "),p])}const g=e(n,[["render",l],["__file","redis-interview-must.html.vue"]]),u=JSON.parse('{"path":"/posts/special/havato/redis-interview-must.html","title":"10道不得不会的Redis面试题","lang":"zh-CN","frontmatter":{"index":true,"icon":"page","title":"10道不得不会的Redis面试题","author":"Wang Shiyu","date":"2022-06-15T00:00:00.000Z","category":["最少必要面试题"],"tag":["redis","面试题"],"description":"Redis","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/posts/special/havato/redis-interview-must.html"}],["meta",{"property":"og:site_name","content":"JavaPub"}],["meta",{"property":"og:title","content":"10道不得不会的Redis面试题"}],["meta",{"property":"og:description","content":"Redis"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202405271041311.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-03T14:35:52.000Z"}],["meta",{"property":"article:author","content":"Wang Shiyu"}],["meta",{"property":"article:tag","content":"redis"}],["meta",{"property":"article:tag","content":"面试题"}],["meta",{"property":"article:published_time","content":"2022-06-15T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-03T14:35:52.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"10道不得不会的Redis面试题\\",\\"image\\":[\\"https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202405271041311.png\\",\\"https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202405271041077.png\\",\\"https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202405271042033.png\\"],\\"datePublished\\":\\"2022-06-15T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-03T14:35:52.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Wang Shiyu\\"}]}"]]},"headers":[{"level":3,"title":"1. Redis是什么？","slug":"_1-redis是什么","link":"#_1-redis是什么","children":[]},{"level":3,"title":"2. 你在哪些场景使用redis","slug":"_2-你在哪些场景使用redis","link":"#_2-你在哪些场景使用redis","children":[]},{"level":3,"title":"3. 为什么Redis是单线程的?","slug":"_3-为什么redis是单线程的","link":"#_3-为什么redis是单线程的","children":[]},{"level":3,"title":"4. Redis持久化有几种方式？","slug":"_4-redis持久化有几种方式","link":"#_4-redis持久化有几种方式","children":[]},{"level":3,"title":"5. 什么是缓存穿透？怎么解决？","slug":"_5-什么是缓存穿透-怎么解决","link":"#_5-什么是缓存穿透-怎么解决","children":[]},{"level":3,"title":"6. 什么是缓存雪崩?","slug":"_6-什么是缓存雪崩","link":"#_6-什么是缓存雪崩","children":[]},{"level":3,"title":"7. Redis使用上如何做内存优化？","slug":"_7-redis使用上如何做内存优化","link":"#_7-redis使用上如何做内存优化","children":[]},{"level":3,"title":"8. 你们redis使用哪种部署方式？","slug":"_8-你们redis使用哪种部署方式","link":"#_8-你们redis使用哪种部署方式","children":[]},{"level":3,"title":"9. redis实现分布式锁要注意什么？","slug":"_9-redis实现分布式锁要注意什么","link":"#_9-redis实现分布式锁要注意什么","children":[]},{"level":2,"title":"推荐阅读：","slug":"推荐阅读","link":"#推荐阅读","children":[]}],"git":{"createdTime":1717582746000,"updatedTime":1720017352000,"contributors":[{"name":"wangshiyu","email":"iswangshiyu@foxmail.com","commits":1}]},"readingTime":{"minutes":8.83,"words":2650},"filePathRelative":"posts/special/havato/redis-interview-must.md","localizedDate":"2022年6月15日","excerpt":"<p>Redis</p>\\n","autoDesc":true}');export{g as comp,u as data};