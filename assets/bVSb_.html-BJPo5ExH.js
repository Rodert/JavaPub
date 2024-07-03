import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as i,e as n}from"./app-DrsF6qiY.js";const t={},e=n(`<p>[toc]</p><h1 id="简述" tabindex="-1"><a class="header-anchor" href="#简述"><span>简述</span></a></h1><h2 id="写在前面" tabindex="-1"><a class="header-anchor" href="#写在前面"><span>写在前面</span></a></h2><p>大家在面试的时候，肯定都会被问到MySql的知识，以下是面试场景： <img src="https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202406210948243.jpg" alt="请添加图片描述" loading="lazy"> B树 和B+树是 MySQL索引使用的数据结构，对于索引优化和原理理解都非常重要，下面我的写文章就是要把B树，B+树的神秘面纱揭开，让大家在面试的时候碰到这个知识点一往无前，不再成为你的知识盲点！</p><h2 id="_1、b树" tabindex="-1"><a class="header-anchor" href="#_1、b树"><span>1、B树</span></a></h2><ul><li>这里的 B 是 Balance（平衡）的缩写。它是一种多路的平衡搜索树。</li><li>它跟普通的平衡二叉树的不同是，B树的每个节点可以存储多个数据，而且每个节点不止有两个子节点，最多可以有上千个子节点。</li><li>B树中每个节点都存放着索引和数据，数据遍布整个树结构，搜索可能在非叶子节点结束，最好的情况是O(1)。</li><li>一般一棵 B 树的高度在 <strong>3</strong> 层左右，<strong>3</strong> 层就可满足 <strong>百万</strong>级别的数据量</li></ul><figure><img src="https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202406210948847.png" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><blockquote><p>B树 每个节点都存储了一定的范围区间，区间更多的情况下，搜索也就更快。</p><p>比如普通的二叉树对于 1~ 100 的索引值，首先分为 1~ 50 和51~ 100 两部分。</p><p>而 B树可以分为四个区间 1~ 25, 26~ 50, 51~ 75, 76~ 100 。甚至可以划分为更多区间，这样一次就能排除四分之三的数据</p></blockquote><h2 id="_2、b-树" tabindex="-1"><a class="header-anchor" href="#_2、b-树"><span>2、B+树</span></a></h2><p>B+树是B树的一种变种，它与 B树 的 <strong>区别</strong> 是：</p><ul><li>叶子节点保存了完整的索引和数据，而非叶子节点只保存索引值，因此它的查询时间固定为 log(n).</li><li>叶子节点中有指向下一个叶子节点的指针，叶子节点类似于一个单链表</li><li>正因为叶子节点保存了完整的数据以及有指针作为连接，B+树可以增加了区间访问性，提高了范围查询，而B树的范围查询相对较差</li><li>B+树更适合外部存储。因为它的非叶子节点不存储数据，只保存索引。</li></ul><p>B+树的示意图如下：</p><figure><img src="https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202406210948518.png" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><blockquote><p>到此为止相信你已经对B树和B+树有一定认识，下面结合数据库深入了解</p></blockquote><hr><h1 id="深入浅出" tabindex="-1"><a class="header-anchor" href="#深入浅出"><span>深入浅出</span></a></h1><h2 id="b树" tabindex="-1"><a class="header-anchor" href="#b树"><span>B树</span></a></h2><p>B-树有如下特点:</p><ol><li>所有键值分布在整颗树中（索引值和具体data都在每个节点里）；</li><li>任何一个关键字出现且只出现在一个结点中；</li><li>搜索有可能在非叶子结点结束（最好情况O(1)就能找到数据）；</li><li>在关键字全集内做一次查找,性能逼近二分查找；</li></ol><h3 id="b树深入" tabindex="-1"><a class="header-anchor" href="#b树深入"><span>B树深入</span></a></h3><p><strong>B树由来</strong></p><blockquote><p>定义：B-树是一类树，包括B-树、B+树、B*树等，是一棵自平衡的搜索树，它类似普通的平衡二叉树，不同的一点是B-树允许每个节点有更多的子节点。 <strong>B-树是专门为外部存储器设计的，如磁盘，它对于读取和写入大块数据有良好的性能，所以一般被用在文件系统及数据库中。</strong></p></blockquote><p>定义只需要知道<strong>B-树允许每个节点有更多的子节点即可（多叉树）</strong>。子节点数量一般在上千，具体数量依赖外部存储器的特性。</p><p>先来看看为什么会出现B-树这类数据结构。</p><p>传统用来搜索的平衡二叉树有很多，如 AVL 树，红黑树等。这些树在一般情况下查询性能非常好，但当数据非常大的时候它们就无能为力了。原因当数据量非常大时，内存不够用，大部分数据只能存放在磁盘上，只有需要的数据才加载到内存中。一般而言内存访问的时间约为 50 ns，而磁盘在 10 ms 左右。速度相差了近 5 个数量级，磁盘读取时间远远超过了数据在内存中比较的时间。这说明程序大部分时间会阻塞在磁盘 IO 上。那么我们如何提高程序性能？减少磁盘 IO 次数，像 AVL 树，红黑树这类平衡二叉树从设计上无法“迎合”磁盘。</p><p><img src="https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202406210948963.png" alt="在这里插入图片描述" loading="lazy"> 上图是一颗简单的平衡二叉树，平衡二叉树是通过旋转来保持平衡的，而旋转是对整棵树的操作，若部分加载到内存中则无法完成旋转操作。其次平衡二叉树的高度相对较大为 log n（底数为2），<strong>这样逻辑上很近的节点实际可能非常远，无法很好的利用磁盘预读（局部性原理)</strong>，所以这类平衡二叉树在数据库和文件系统上的选择就被 pass 了。</p><blockquote><p><strong>空间局部性原理：如果一个存储器的某个位置被访问，那么将它附近的位置也会被访问。</strong></p></blockquote><p>我们从“迎合”磁盘的角度来看看B-树的设计。</p><p><strong>索引的效率依赖与磁盘 IO 的次数，快速索引需要有效的减少磁盘 IO 次数</strong>，如何快速索引呢？索引的原理其实是不断的缩小查找范围，就如我们平时用字典查单词一样，先找首字母缩小范围，再第二个字母等等。平衡二叉树是每次将范围分割为两个区间。为了更快，<strong>B-树每次将范围分割为多个区间，区间越多，定位数据越快越精确。那么如果节点为区间范围，每个节点就较大了</strong>。所以新建节点时，直接申请页大小的空间（磁盘存储单位是按 block 分的，一般为 512 Byte。<strong>磁盘 IO 一次读取若干个 block，我们称为一页</strong>，具体大小和操作系统有关，一般为 4 k，8 k或 16 k），计算机内存分配是按页对齐的，这样就实现了一个节点只需要一次 IO。</p><p><img src="https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202406210948813.png" alt="在这里插入图片描述" loading="lazy"> 上图是一棵简化的B-树，多叉的好处非常明显，有效的降低了B-树的高度，为底数很大的 log n，底数大小与节点的子节点数目有关，一般一棵B-树的高度在 3 层左右。层数低，每个节点区确定的范围更精确，范围缩小的速度越快（<strong>比二叉树深层次的搜索肯定快很多</strong>）。上面说了一个节点需要进行一次 IO，那么总 IO 的次数就缩减为了 log n 次。B-树的每个节点是 n 个有序的序列(a1,a2,a3…an)，并将该节点的子节点分割成 n+1 个区间来进行索引(X1&lt; a1, a2 &lt; X2 &lt; a3, … , an+1 &lt; Xn &lt; anXn+1 &gt; an)。</p><blockquote><p>点评：B树的每个节点，都是存多个值的，不像二叉树那样，一个节点就一个值，B树把每个节点都给了一点的范围区间，区间更多的情况下，搜索也就更快了，比如：有1-100个数，二叉树一次只能分两个范围，0-50和51-100，而B树，分成4个范围 1-25， 25-50，51-75，76-100一次就能筛选走四分之三的数据。所以作为多叉树的B树是更快的</p></blockquote><h3 id="b-树的查找" tabindex="-1"><a class="header-anchor" href="#b-树的查找"><span>B-树的查找</span></a></h3><p>我们来看看B-树的查找，假设每个节点有 n 个 key值，被分割为 n+1 个区间，注意，每个 key 值紧跟着 data 域，这说明B-树的 key 和 data 是聚合在一起的。一般而言，根节点都在内存中，B-树以每个节点为一次磁盘 IO，比如上图中，若搜索 key 为 25 节点的 data，首先在根节点进行二分查找（因为 keys 有序，二分最快），判断 key 25 小于 key 50，所以定位到最左侧的节点，此时进行一次磁盘 IO，将该节点从磁盘读入内存，接着继续进行上述过程，直到找到该 key 为止。</p><div class="language-c line-numbers-mode" data-highlighter="shiki" data-ext="c" data-title="c" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">Data</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">*</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> BTreeSearch</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">Root </span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">*</span><span style="--shiki-light:#E36209;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">node</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> Key </span><span style="--shiki-light:#E36209;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">key</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">{</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    Data</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> data;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(root </span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">==</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> NULL</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">        return</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> NULL</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    data </span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> BinarySearch</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(node);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">data</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">-&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">key</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> ==</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> key)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">        return</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> data;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    }</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">else</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">{</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">        node </span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> ReadDisk</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">data</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">-&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">next</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">        BTreeSearch</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(node, key);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="b-树" tabindex="-1"><a class="header-anchor" href="#b-树"><span>B+ 树</span></a></h2><h3 id="b-树概述" tabindex="-1"><a class="header-anchor" href="#b-树概述"><span>B+树概述</span></a></h3><p>B+树是B-树的变体，也是一种多路搜索树, 它与 B- 树的不同之处在于:</p><ol><li>所有关键字存储在叶子节点出现,内部节点(非叶子节点并不存储真正的 data)</li><li>为所有叶子结点增加了一个链指针</li></ol><p>简化 B+树 如下图</p><p><img src="https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202406210948312.png" alt="在这里插入图片描述" loading="lazy"><img src="https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202406210948956.png" alt="在这里插入图片描述" loading="lazy"><strong>因为内节点并不存储 data，所以一般B+树的叶节点和内节点大小不同，而B-树的每个节点大小一般是相同的，为一页。</strong></p><p>为了增加 <strong>区间访问性</strong>，一般会对B+树做一些优化。 如下图带顺序访问的B+树。</p><figure><img src="https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202406210948043.png" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure><h2 id="b-树和b-树的区别" tabindex="-1"><a class="header-anchor" href="#b-树和b-树的区别"><span>B-树和B+树的区别</span></a></h2><p><strong>1.B+树内节点不存储数据，所有 data 存储在叶节点导致查询时间复杂度固定为 log n。而B-树查询时间复杂度不固定，与 key 在树中的位置有关，最好为O(1)。</strong></p><p>如下所示B-树/B+树查询节点 key 为 50 的 data。</p><p>B-树：</p><p><img src="https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202406210948420.png" alt="在这里插入图片描述" loading="lazy"> 从上图可以看出，key 为 50 的节点就在第一层，B-树只需要一次磁盘 IO 即可完成查找。所以说B-树的查询最好时间复杂度是 O(1)。</p><p>B+树：</p><p><img src="https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202406210948270.png" alt="在这里插入图片描述" loading="lazy"><strong>由于B+树所有的 data 域都在根节点，所以查询 key 为 50的节点必须从根节点索引到叶节点，时间复杂度固定为 O(log n)。</strong></p><blockquote><p>点评：B树的由于每个节点都有key和data，所以查询的时候可能不需要O(logn)的复杂度，甚至最好的情况是O(1)就可以找到数据，而B+树由于只有叶子节点保存了data，所以必须经历O(logn)复杂度才能找到数据</p></blockquote><p><strong>2. B+树叶节点两两相连可大大增加区间访问性，可使用在范围查询等，而B-树每个节点 key 和 data 在一起，则无法区间查找。</strong></p><p><img src="https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202406210948794.png" alt="在这里插入图片描述" loading="lazy"> 根据空间局部性原理：如果一个存储器的某个位置被访问，那么将它附近的位置也会被访问。</p><p>B+树可以很好的利用局部性原理，若我们访问节点 key为 50，则 key 为 55、60、62 的节点将来也可能被访问，<strong>我们可以利用磁盘预读原理提前将这些数据读入内存，减少了磁盘 IO 的次数。 当然B+树也能够很好的完成范围查询。比如查询 key 值在 50-70 之间的节点。</strong></p><blockquote><p>点评：由于B+树的叶子节点的数据都是使用链表连接起来的，而且他们在磁盘里是顺序存储的，所以当读到某个值的时候，磁盘预读原理就会提前把这些数据都读进内存，使得范围查询和排序都很快</p></blockquote><p><strong>3.B+树更适合外部存储。由于内节点无 data 域，每个节点能索引的范围更大更精确</strong></p><p>这个很好理解，由于B-树节点内部每个 key 都带着 data 域，而B+树节点只存储 key 的副本，真实的 key 和 data 域都在叶子节点存储。前面说过磁盘是分 block 的，一次磁盘 IO 会读取若干个 block，具体和操作系统有关，<strong>那么由于磁盘 IO 数据大小是固定的，在一次 IO 中，单个元素越小，量就越大。这就意味着B+树单次磁盘 IO 的信息量大于B-树</strong>，从这点来看B+树相对B-树磁盘 IO 次数少。</p><blockquote><p>点评：由于B树的节点都存了key和data，而B+树只有叶子节点存data，非叶子节点都只是索引值，没有实际的数据，这就时B+树在一次IO里面，能读出的索引值更多。从而减少查询时候需要的IO次数！</p></blockquote><p><img src="https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202406210948287.png" alt="在这里插入图片描述" loading="lazy"> 从上图可以看出相同大小的区域，B-树仅有 2 个 key，而B+树有 3 个 key。</p><h2 id="拓展-mysql为什么使用b-tree-b-tree-存储知识" tabindex="-1"><a class="header-anchor" href="#拓展-mysql为什么使用b-tree-b-tree-存储知识"><span>拓展：MySQL为什么使用B-Tree（B+Tree）&amp;&amp; 存储知识</span></a></h2><p>上文说过，红黑树等数据结构也可以用来实现索引，但是文件系统及数据库系统普遍采用B-/+Tree作为索引结构，这一节将结合计算机组成原理相关知识讨论B-/+Tree作为索引的理论基础。</p><p>一般来说，索引本身也很大，不可能全部存储在内存中，因此索引往往以索引文件的形式存储的磁盘上。这样的话，索引查找过程中就要产生磁盘I/O消耗，相对于内存存取，I/O存取的消耗要高几个数量级，所以评价一个数据结构作为索引的优劣最重要的指标就是在查找过程中磁盘I/O操作次数的渐进复杂度。换句话说，索引的结构组织要尽量减少查找过程中磁盘I/O的存取次数。下面先介绍内存和磁盘存取原理，然后再结合这些原理分析B-/+Tree作为索引的效率。</p><h3 id="存储数据最小单元" tabindex="-1"><a class="header-anchor" href="#存储数据最小单元"><span>存储数据最小单元</span></a></h3><p>我们都知道计算机在存储数据的时候，有最小存储单元，这就好比我们今天进行现金的流通最小单位是一毛。</p><p>在计算机中磁盘存储数据最小单元是扇区，一个扇区的大小是512字节，而文件系统（例如XFS/EXT4）他的最小单元是块，一个块的大小是4k</p><p>而对于我们的InnoDB存储引擎也有自己的最小储存单元——页（Page），一个页的大小是16K。</p><p>下面几张图可以帮你理解最小存储单元：</p><p>文件系统中一个文件大小只有1个字节，但不得不占磁盘上4KB的空间。</p><p>磁盘扇区、文件系统、InnoDB存储引擎都有各自的最小存储单元。</p><p><img src="https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202406210948952.png" alt="在这里插入图片描述" loading="lazy"> 在MySQL中我们的InnoDB页的大小默认是16k，当然也可以通过参数设置：</p><p><img src="https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202406210949978.png" alt="在这里插入图片描述" loading="lazy"> 数据表中的数据都是存储在页中的，所以一个页中能存储多少行数据呢？假设一行数据的大小是1k，那么一个页可以存放16行这样的数据。</p><h3 id="主存存取原理" tabindex="-1"><a class="header-anchor" href="#主存存取原理"><span>主存存取原理</span></a></h3><p>目前计算机使用的主存基本都是随机读写存储器（RAM），现代RAM的结构和存取原理比较复杂，这里本文抛却具体差别，抽象出一个十分简单的存取模型来说明RAM的工作原理。</p><p><img src="https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202406210948762.png" alt="在这里插入图片描述" loading="lazy"> 从抽象角度看，主存是一系列的存储单元组成的矩阵，每个存储单元存储固定大小的数据。每个存储单元有唯一的地址，现代主存的编址规则比较复杂，这里将其简化成一个二维地址：通过一个行地址和一个列地址可以唯一定位到一个存储单元。图5展示了一个4 x 4的主存模型。</p><p>主存的存取过程如下：</p><p>当系统需要读取主存时，则将地址信号放到地址总线上传给主存，主存读到地址信号后，解析信号并定位到指定存储单元，然后将此存储单元数据放到数据总线上，供其它部件读取。</p><p>写主存的过程类似，系统将要写入单元地址和数据分别放在地址总线和数据总线上，主存读取两个总线的内容，做相应的写操作。</p><p>这里可以看出，主存存取的时间仅与存取次数呈线性关系，因为不存在机械操作，两次存取的数据的“距离”不会对时间有任何影响，例如，先取A0再取A1和先取A0再取D3的时间消耗是一样的。</p><h3 id="磁盘存取原理" tabindex="-1"><a class="header-anchor" href="#磁盘存取原理"><span>磁盘存取原理</span></a></h3><p>上文说过，索引一般以文件形式存储在磁盘上，索引检索需要磁盘I/O操作。与主存不同，磁盘I/O存在机械运动耗费，因此磁盘I/O的时间消耗是巨大的。</p><p>图6是磁盘的整体结构示意图。</p><p>一个磁盘由大小相同且同轴的圆形盘片组成，磁盘可以转动（各个磁盘必须同步转动）。在磁盘的一侧有磁头支架，磁头支架固定了一组磁头，每个磁头负责存取一个磁盘的内容。磁头不能转动，但是可以沿磁盘半径方向运动（实际是斜切向运动），每个磁头同一时刻也必须是同轴的，即从正上方向下看，所有磁头任何时候都是重叠的（不过目前已经有多磁头独立技术，可不受此限制）。</p><p>图7是磁盘结构的示意图。</p><p><img src="https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202406210948294.png" alt="在这里插入图片描述" loading="lazy"> 盘片被划分成一系列同心环，圆心是盘片中心，每个同心环叫做一个磁道，所有半径相同的磁道组成一个柱面。磁道被沿半径线划分成一个个小的段，<strong>每个段叫做一个扇区，每个扇区是磁盘的最小存储单元</strong>。为了简单起见，我们下面假设磁盘只有一个盘片和一个磁头。</p><p>当需要从磁盘读取数据时，系统会将数据逻辑地址传给磁盘，磁盘的控制电路按照寻址逻辑将逻辑地址翻译成物理地址，即确定要读的数据在哪个磁道，哪个扇区。为了读取这个扇区的数据，需要将磁头放到这个扇区上方，为了实现这一点，磁头需要移动对准相应磁道，这个过程叫做寻道，所耗费时间叫做寻道时间，然后磁盘旋转将目标扇区旋转到磁头下，这个过程耗费的时间叫做旋转时间。</p><p><strong>局部性原理与磁盘预读</strong></p><p>由于存储介质的特性，磁盘本身存取就比主存慢很多，再加上机械运动耗费，磁盘的存取速度往往是主存的几百分分之一，因此为了提高效率，要尽量减少磁盘I/O。为了达到这个目的，磁盘往往不是严格按需读取，而是每次都会预读，即使只需要一个字节，磁盘也会从这个位置开始，顺序向后读取一定长度的数据放入内存。这样做的理论依据是计算机科学中著名的局部性原理：</p><p>当一个数据被用到时，其附近的数据也通常会马上被使用。</p><p>程序运行期间所需要的数据通常比较集中。</p><p>由于磁盘顺序读取的效率很高（不需要寻道时间，只需很少的旋转时间），因此对于具有局部性的程序来说，预读可以提高I/O效率。</p><p>预读的长度一般为页（page）的整倍数。<strong>页是计算机管理存储器的逻辑块，硬件及操作系统往往将主存和磁盘存储区分割为连续的大小相等的块，每个存储块称为一页（在许多操作系统中，页得大小通常为4k）</strong>，主存和磁盘以页为单位交换数据。当程序要读取的数据不在主存中时，会触发一个缺页异常，此时系统会向磁盘发出读盘信号，磁盘会找到数据的起始位置并向后连续读取一页或几页载入内存中，然后异常返回，程序继续运行。</p><p><strong>所以IO一次就是读一页的大小</strong></p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2><p>MySQL的B树和B+树原理就说到这里了。</p><p>我是JavaPub，下期见</p><blockquote><p>参考：https://blog.csdn.net/qq_40374604/article/details/120284492</p></blockquote>`,95),p=[e];function l(o,h){return i(),a("div",null,p)}const g=s(t,[["render",l],["__file","bVSb_.html.vue"]]),d=JSON.parse('{"path":"/posts/algorithms_data_structures/data_structures/bVSb_.html","title":"B树和B+树区别","lang":"zh-CN","frontmatter":{"title":"B树和B+树区别","icon":"lightbulb","author":"Wang Shiyu","category":["B树","B+树"],"sticky":true,"star":true,"description":"[toc] 简述 写在前面 大家在面试的时候，肯定都会被问到MySql的知识，以下是面试场景： 请添加图片描述 B树 和B+树是 MySQL索引使用的数据结构，对于索引优化和原理理解都非常重要，下面我的写文章就是要把B树，B+树的神秘面纱揭开，让大家在面试的时候碰到这个知识点一往无前，不再成为你的知识盲点！ 1、B树 这里的 B 是 Balance（平...","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/posts/algorithms_data_structures/data_structures/bVSb_.html"}],["meta",{"property":"og:site_name","content":"JavaPub"}],["meta",{"property":"og:title","content":"B树和B+树区别"}],["meta",{"property":"og:description","content":"[toc] 简述 写在前面 大家在面试的时候，肯定都会被问到MySql的知识，以下是面试场景： 请添加图片描述 B树 和B+树是 MySQL索引使用的数据结构，对于索引优化和原理理解都非常重要，下面我的写文章就是要把B树，B+树的神秘面纱揭开，让大家在面试的时候碰到这个知识点一往无前，不再成为你的知识盲点！ 1、B树 这里的 B 是 Balance（平..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202406210948243.jpg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-03T14:35:52.000Z"}],["meta",{"property":"article:author","content":"Wang Shiyu"}],["meta",{"property":"article:modified_time","content":"2024-07-03T14:35:52.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"B树和B+树区别\\",\\"image\\":[\\"https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202406210948243.jpg\\",\\"https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202406210948847.png\\",\\"https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202406210948518.png\\",\\"https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202406210948963.png\\",\\"https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202406210948813.png\\",\\"https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202406210948312.png\\",\\"https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202406210948956.png\\",\\"https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202406210948043.png\\",\\"https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202406210948420.png\\",\\"https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202406210948270.png\\",\\"https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202406210948794.png\\",\\"https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202406210948287.png\\",\\"https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202406210948952.png\\",\\"https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202406210949978.png\\",\\"https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202406210948762.png\\",\\"https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202406210948294.png\\"],\\"dateModified\\":\\"2024-07-03T14:35:52.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Wang Shiyu\\"}]}"]]},"headers":[{"level":2,"title":"写在前面","slug":"写在前面","link":"#写在前面","children":[]},{"level":2,"title":"1、B树","slug":"_1、b树","link":"#_1、b树","children":[]},{"level":2,"title":"2、B+树","slug":"_2、b-树","link":"#_2、b-树","children":[]},{"level":2,"title":"B树","slug":"b树","link":"#b树","children":[{"level":3,"title":"B树深入","slug":"b树深入","link":"#b树深入","children":[]},{"level":3,"title":"B-树的查找","slug":"b-树的查找","link":"#b-树的查找","children":[]}]},{"level":2,"title":"B+ 树","slug":"b-树","link":"#b-树","children":[{"level":3,"title":"B+树概述","slug":"b-树概述","link":"#b-树概述","children":[]}]},{"level":2,"title":"B-树和B+树的区别","slug":"b-树和b-树的区别","link":"#b-树和b-树的区别","children":[]},{"level":2,"title":"拓展：MySQL为什么使用B-Tree（B+Tree）&& 存储知识","slug":"拓展-mysql为什么使用b-tree-b-tree-存储知识","link":"#拓展-mysql为什么使用b-tree-b-tree-存储知识","children":[{"level":3,"title":"存储数据最小单元","slug":"存储数据最小单元","link":"#存储数据最小单元","children":[]},{"level":3,"title":"主存存取原理","slug":"主存存取原理","link":"#主存存取原理","children":[]},{"level":3,"title":"磁盘存取原理","slug":"磁盘存取原理","link":"#磁盘存取原理","children":[]}]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1718934750000,"updatedTime":1720017352000,"contributors":[{"name":"wangshiyu","email":"iswangshiyu@foxmail.com","commits":1}]},"readingTime":{"minutes":17.65,"words":5296},"filePathRelative":"posts/algorithms_data_structures/data_structures/bVSb+.md","localizedDate":"2024年6月21日","excerpt":"<p>[toc]</p>\\n<h1>简述</h1>\\n<h2>写在前面</h2>\\n<p>大家在面试的时候，肯定都会被问到MySql的知识，以下是面试场景：\\n<img src=\\"https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202406210948243.jpg\\" alt=\\"请添加图片描述\\" loading=\\"lazy\\">\\nB树 和B+树是 MySQL索引使用的数据结构，对于索引优化和原理理解都非常重要，下面我的写文章就是要把B树，B+树的神秘面纱揭开，让大家在面试的时候碰到这个知识点一往无前，不再成为你的知识盲点！</p>","autoDesc":true}');export{g as comp,d as data};
