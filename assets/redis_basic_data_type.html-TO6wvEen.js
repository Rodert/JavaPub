import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,e}from"./app-BesLpzob.js";const n={},l=e(`<h2 id="redis基本类型使用场景都懂了" tabindex="-1"><a class="header-anchor" href="#redis基本类型使用场景都懂了"><span>redis基本类型使用场景都懂了</span></a></h2><p>学习 Redis 基础数据结构，不讲虚的。</p><p>一个群友给我发消息，“该学的都学了，怎么就找不到心意的工作，太难了”。</p><p>很多在近期找过工作的同学一定都知道了，背诵八股文已经不是找工作的绝对王牌。企业最终要的是可以创造价值，或者首先需要干活的人，所以实战很重要。今天这篇文章就是给大家分享一下如何在我们实战生产中使用 redis。</p><blockquote><p>如果不了解 redis 的同学，可以先学习之前的 redis 入门教程。<a href="https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzUzNDUyOTY0Nw==&amp;action=getalbum&amp;album_id=1389304118178840577#wechat_redirect" target="_blank" rel="noopener noreferrer">reids 从黑铁到王者</a></p></blockquote><p>...</p><p><strong>⚠️注意：命令不区分大小写，而 key 是区分大小写的。</strong></p><h4 id="string" tabindex="-1"><a class="header-anchor" href="#string"><span>String</span></a></h4><hr><p>String 作为最基本的类型，就是普通的 get、set，做简单的 key - value 存储</p><p>应用场景：</p><ul><li><p>比如在商品编号的生成、订单编号的生成（当然现在很少用到了，毕竟现在这种编号已经不足以承载当今的电商服务）</p></li><li><figure><img src="https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202402061104821.png" alt="商品编号生成" tabindex="0" loading="lazy"><figcaption>商品编号生成</figcaption></figure></li><li><p>是否喜欢的文章</p></li></ul><figure><img src="https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202402061109221.png" alt="文章点赞打赏截图" tabindex="0" loading="lazy"><figcaption>文章点赞打赏截图</figcaption></figure><h4 id="hash" tabindex="-1"><a class="header-anchor" href="#hash"><span>Hash</span></a></h4><hr><ul><li>Hash 是一个类似于 Map 的结构，我们可以将整个对象缓存到 redis 中（这个对象不可以在嵌套其他对象），每次读写缓存时可以直接操作 hash 这个对象里的某个字段值。</li><li>类似于 Java 中的 <code>Map&lt;String, Map&lt;Object, Object&gt;&gt;</code></li></ul><p>语法：</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">redis</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 127.0.0.1:637</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">9&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> HSET</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> KEY_NAME</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> FIELD</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> VALUE</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><ul><li>应用场景：购物车早期，当前小中厂可用</li></ul><figure><img src="https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202402061154101.png" alt="image-20210110223728047" tabindex="0" loading="lazy"><figcaption>image-20210110223728047</figcaption></figure><h4 id="list" tabindex="-1"><a class="header-anchor" href="#list"><span>List</span></a></h4><hr><ul><li><p>List 就是编程中常用的字符串列表，列表的最大长度是 2^32 - 1 个元素 (4294967295, 每个列表超过40亿个元素)。</p></li><li><p>比如文章列表、粉丝列表等需要缓存的场景。</p></li><li><p>可以作为一个单项或者双向队列，lpush、rpop、rpush、lpop。</p></li><li><p><code>LRANGE</code> 命令可以指定元素获取区间，实现分页查询，比如微博新闻的列表页面、一些高性能查询的场景</p></li><li><p>应用场景：</p></li></ul><ol><li>循环抓取新闻的主站点列表</li></ol><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">redis</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 127.0.0.1:637</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">9&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> RPOPLPUSH</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> SOURCE_KEY_NAME</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> DESTINATION_KEY_NAME</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">redis</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 127.0.0.1:637</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">9&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> RPOPLPUSH</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> news:list:websites</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> news:list:websites</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><ol start="2"><li>分页查询网站首页的新闻资讯，查询第 0～10 条的数据。</li></ol><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">lrange</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> article:list</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 0</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 10</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h4 id="set" tabindex="-1"><a class="header-anchor" href="#set"><span>Set</span></a></h4><hr><ul><li><p>无序列表，自动去重。</p></li><li><p>和 Java 中的 hashset 一样，当需要进行大量数据的去重、之前你是基于 JVM 在内存去重，现在多机器部署的程序可以基于 redis 去重。</p></li><li><p>比如需要进行交集计算，两个自媒体账号属于同一个人、他的粉丝一共有多少，需要将两个账号粉丝进行去重统计。当然，并集、差集都可以这样操作。</p></li><li><p>应用场景：</p><ul><li><p>微信抽奖小程序</p><figure><img src="https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202402061400633.png" alt="image-20210111131808595" tabindex="0" loading="lazy"><figcaption>image-20210111131808595</figcaption></figure><figure><img src="https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202402061400317.png" alt="image-20210111131949452" tabindex="0" loading="lazy"><figcaption>image-20210111131949452</figcaption></figure></li><li><p>微信朋友圈点赞</p><figure><img src="https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202402061400576.png" alt="image-20210111133506484" tabindex="0" loading="lazy"><figcaption>image-20210111133506484</figcaption></figure></li><li><p>微博好友关注社交关系</p><p>共同关注的人：我去到 gakki 的微博，马上获得我和 gakki 共同关注的人</p><figure><img src="https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202402061401129.png" alt="image-20210111133650920" tabindex="0" loading="lazy"><figcaption>image-20210111133650920</figcaption></figure><p>我关注的人也关注他(大家爱好相同)</p><figure><img src="https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202402061401417.png" alt="image-20210111133831044" tabindex="0" loading="lazy"><figcaption>image-20210111133831044</figcaption></figure></li><li><p>qq推荐可能认识的人</p><figure><img src="https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202402061402111.png" alt="image-20210111133958782" tabindex="0" loading="lazy"><figcaption>image-20210111133958782</figcaption></figure></li></ul></li></ul><h4 id="sortedset" tabindex="-1"><a class="header-anchor" href="#sortedset"><span>SortedSet</span></a></h4><hr><ul><li><p>排序的 set，去重但是可以排序，写进去的时候给一个分数，自动根据分数排序，这个可以玩儿很多的花样，最大的特点是有个分数可以自定义排序规则。</p></li><li><p>比如说你要是想根据时间对数据排序，那么可以写入进去的时候用某个时间作为分数，人家自动给你按照时间排序了。</p></li><li><p>排行榜：将每个用户以及其对应的什么分数写入进去，<code>zadd board score username</code>，接着 <code>zrevrange board 0 99</code>，就可以获取排名前100的用户；<code>zrank board username</code>，可以看到用户在排行榜里的排名。</p></li><li><p>应用场景：</p><ul><li><p>根据商品销售对商品进行排序显示。</p><figure><img src="https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202402061410945.png" alt="image-20210111140054296" tabindex="0" loading="lazy"><figcaption>image-20210111140054296</figcaption></figure></li><li><p>抖音热搜</p><figure><img src="https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202402061410131.png" alt="image-20210111140639166" tabindex="0" loading="lazy"><figcaption>image-20210111140639166</figcaption></figure></li></ul></li></ul><blockquote><p>下面这三个你可能不太熟悉，耐心看完，这是通俗易懂的。</p></blockquote><h4 id="bitmap" tabindex="-1"><a class="header-anchor" href="#bitmap"><span>Bitmap</span></a></h4><hr><blockquote><p>Bitmap 大家可能有些陌生，什么是 Bitmap 呢？</p></blockquote><p>Bitmap 的底层数据结构用的是 String 类型的 SDS 数据结构来保存位数组，Redis 把每个字节数组的 8 个 bit 位利用起来，每个 bit 位 表示一个元素的二值状态（不是 0 就是 1）。</p><p>可以将 Bitmap 看成是一个 bit 为单位的数组，数组的每个单元只能存储 0 或者 1，数组的下标在 Bitmap 中叫做 offset 偏移量。</p><p><strong>8 个 bit 组成一个 Byte，所以 Bitmap 会极大地节省存储空间。</strong> 这就是 Bitmap 的优势。</p><ul><li><p>比如判断用户是否登录状态，可以将用户 id 映射为一个唯一 id 编号，将 bit 位映射为 1。</p></li><li><p>布隆过滤器底层选用的数据结构就是 bitmap（在程序中也用 bitset）。</p></li><li><p>应用场景：</p><ul><li><p>用户每月签到情况。在签到统计中，每个用户每天的签到用 1 个 bit 位表示，一年的签到只需要 365 个 bit 位。一个月最多只有 31 天，只需要 31 个 bit 位即可。</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">1.</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 编号</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 9527</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 的用户在</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 2024</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 年</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 1</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 月</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 16</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 号打卡。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">SETBIT</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> uid:sign:9527:202401</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 15</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 1</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">2.</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 判断是否打卡。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">GETBIT</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> uid:sign:9527:202401</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 15</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">3.</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 统计</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 1</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 月份打卡次数，使用</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> \`</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">BITCOUNT</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">\`</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> 命令。该指令用于统计给定的</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> bit</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 数组中，值</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 1</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 的</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> bit</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 位的数量。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">BITCOUNT</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> uid:sign:9527:202401</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul></li></ul><h4 id="hyperloglog" tabindex="-1"><a class="header-anchor" href="#hyperloglog"><span>HyperLogLog</span></a></h4><hr><p>HyperLogLog 并非 Redis 一家独有，Redis 只是基于 HyperLogLog 算法实现可一个 HyperLogLog 数据结构，并用该数据结构提供基数统计的功能。其优势就是可以做到只需要 12 kb 的空间大小，就可以实现接近 2^64 量级的基数统计。</p><p>HyperLogLog 数据结构并不会保存真实的元数据，所以其核心就是基数估算算法 <strong>在工程实践中，通常会用于 App 或页面的 UV 统计</strong>。</p><ul><li><p>HyperLogLog 是一种<strong>基数估算</strong>算法。所谓基数估算，就是估算在一批数据中，不重复元素的个数有多少。</p></li><li><p>应用场景：</p><ul><li><p>计算 <code>javapub.net.cn</code> 网站的日活跃用户。通过 ip 在程序中用 HashSet 分析、如果有几百万用户，占用存储无疑是很大的。但是用了 HyperLogLog，事情变得如此简单。因为存储日活数据所需要的内存只有 12K。</p><p><code>HyperLogLog</code> 只提供了 3 个简单的命令。</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">1.</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 添加元素到</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> HyperLogLog</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 中。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">PFADD</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> key</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> element</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> [element </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">...]</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">127.0.0.1:6379</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt; </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">pfadd</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> website:javapub:uv</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 39.1.2.0</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">2.</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 返回给定</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> HyperLogLog</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 的基数估算。</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">PFCOUNT</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> key</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> [key </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">...]</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">127.0.0.1:6379</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt; </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">pfcount</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> website:javapub:uv</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">3.</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 将多个</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> HyperLogLog</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> 合并为一个</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> HyperLogLog。PFMERGE</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> destkey</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> sourcekey</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> [sourcekey </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">...]</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">127.0.0.1:6379</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt; </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">pfmerge</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> website:javapub:uv</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> website:javapub-2:uv</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul></li></ul><h4 id="geo" tabindex="-1"><a class="header-anchor" href="#geo"><span>GEO</span></a></h4><hr><p>看到这个名字就知道是经纬度坐标相关。需要涉及到地图的业务才会使用。</p><ul><li><p>Redis GEO 有如下操作方法：</p><ul><li>geoadd：添加地理位置的坐标。</li><li>geopos：获取地理位置的坐标。</li><li>geodist：计算两个位置之间的距离。</li><li>georadius：根据用户给定的经纬度坐标来获取指定范围内的地理位置集合。</li><li>georadiusbymember：根据储存在位置集合里面的某个地点获取指定范围内的地理位置集合。</li><li>geohash：返回一个或多个位置对象的 geohash 值。</li></ul></li><li><p>应用场景：</p><p>计算 Palermo 与 Catania 之间的距离：</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">redis</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt; </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">GEOADD</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> Sicily</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 13.361389</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 38.115556</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &quot;Palermo&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 15.087269</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 37.502669</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &quot;Catania&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">integer</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">) </span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">2</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">redis</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt; </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">GEODIST</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> Sicily</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> Palermo</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> Catania</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">&quot;166274.1516&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">redis</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt; </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">GEODIST</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> Sicily</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> Palermo</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> Catania</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> km</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">&quot;166.2742&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">redis</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt; </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">GEODIST</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> Sicily</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> Palermo</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> Catania</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> mi</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">&quot;103.3182&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">redis</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt; </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">GEODIST</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> Sicily</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> Foo</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> Bar</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">nil</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">redis</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul>`,51),t=[l];function p(h,k){return a(),s("div",null,t)}const g=i(n,[["render",p],["__file","redis_basic_data_type.html.vue"]]),o=JSON.parse('{"path":"/posts/database/redis/redis_basic_data_type.html","title":"Redis基础数据结构","lang":"zh-CN","frontmatter":{"title":"Redis基础数据结构","icon":"lightbulb","category":["redis"],"tag":["redis"],"description":"redis基本类型使用场景都懂了 学习 Redis 基础数据结构，不讲虚的。 一个群友给我发消息，“该学的都学了，怎么就找不到心意的工作，太难了”。 很多在近期找过工作的同学一定都知道了，背诵八股文已经不是找工作的绝对王牌。企业最终要的是可以创造价值，或者首先需要干活的人，所以实战很重要。今天这篇文章就是给大家分享一下如何在我们实战生产中使用 redi...","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/posts/database/redis/redis_basic_data_type.html"}],["meta",{"property":"og:site_name","content":"JavaPub"}],["meta",{"property":"og:title","content":"Redis基础数据结构"}],["meta",{"property":"og:description","content":"redis基本类型使用场景都懂了 学习 Redis 基础数据结构，不讲虚的。 一个群友给我发消息，“该学的都学了，怎么就找不到心意的工作，太难了”。 很多在近期找过工作的同学一定都知道了，背诵八股文已经不是找工作的绝对王牌。企业最终要的是可以创造价值，或者首先需要干活的人，所以实战很重要。今天这篇文章就是给大家分享一下如何在我们实战生产中使用 redi..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202402061104821.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-03T14:35:52.000Z"}],["meta",{"property":"article:author","content":"Mr.Wang"}],["meta",{"property":"article:tag","content":"redis"}],["meta",{"property":"article:modified_time","content":"2024-07-03T14:35:52.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Redis基础数据结构\\",\\"image\\":[\\"https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202402061104821.png\\",\\"https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202402061109221.png\\",\\"https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202402061154101.png\\",\\"https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202402061400633.png\\",\\"https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202402061400317.png\\",\\"https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202402061400576.png\\",\\"https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202402061401129.png\\",\\"https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202402061401417.png\\",\\"https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202402061402111.png\\",\\"https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202402061410945.png\\",\\"https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202402061410131.png\\"],\\"dateModified\\":\\"2024-07-03T14:35:52.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Mr.Wang\\",\\"url\\":\\"https://javapub.net.cn\\"}]}"]]},"headers":[{"level":2,"title":"redis基本类型使用场景都懂了","slug":"redis基本类型使用场景都懂了","link":"#redis基本类型使用场景都懂了","children":[]}],"git":{"createdTime":1718350679000,"updatedTime":1720017352000,"contributors":[{"name":"wangshiyu","email":"iswangshiyu@foxmail.com","commits":1}]},"readingTime":{"minutes":6.56,"words":1968},"filePathRelative":"posts/database/redis/redis_basic_data_type.md","localizedDate":"2024年6月14日","excerpt":"<h2>redis基本类型使用场景都懂了</h2>\\n<p>学习 Redis 基础数据结构，不讲虚的。</p>\\n<p>一个群友给我发消息，“该学的都学了，怎么就找不到心意的工作，太难了”。</p>\\n<p>很多在近期找过工作的同学一定都知道了，背诵八股文已经不是找工作的绝对王牌。企业最终要的是可以创造价值，或者首先需要干活的人，所以实战很重要。今天这篇文章就是给大家分享一下如何在我们实战生产中使用 redis。</p>\\n<blockquote>\\n<p>如果不了解 redis 的同学，可以先学习之前的 redis 入门教程。<a href=\\"https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzUzNDUyOTY0Nw==&amp;action=getalbum&amp;album_id=1389304118178840577#wechat_redirect\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">reids 从黑铁到王者</a></p>\\n</blockquote>","autoDesc":true}');export{g as comp,o as data};