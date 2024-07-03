import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,e as n}from"./app-DrsF6qiY.js";const l={},t=n(`<p><strong>引言</strong>：以前只是看过介绍 <code>volatile</code> 的文章，对其的理解也只是停留在理论的层面上，由于最近在项目当中用到了关于并发方面的技术，所以下定决心深入研究一下java并发方面的知识。网上关于volatile的文章非常多，但是并没有讲解非常详细的文章。（哪位要是有好的资料麻烦共享一份给我！）多数的都是一些理论讲解，没有实际的例子代码，就算有代码的也测试不出效果，总之理论总是与代码不匹配。</p><p>后来在我不懈的努力之下总算研究出一些成果，在此分享给大家！如果大家发现有错误的地方欢迎大家指正，谢谢！</p><p>在Java线程并发处理中，有一个关键字 volatile 的使用目前存在很大的混淆，以为使用这个关键字，在进行多线程并发处理的时候就可以万事大吉。</p><hr><p>Java 语言是支持多线程的，为了解决线程并发的问题，在语言内部引入了<code> 同步块(synchronized)</code> 和 <code>volatile</code> 关键字机制。</p><p>synchronized(不做过多解释)</p><p>同步块大家都比较熟悉，通过 synchronized 关键字来实现，所有加上synchronized 和 块语句，在多线程访问的时候，同一时刻只能有一个线程能够用</p><p>synchronized 修饰的方法 或者 代码块。</p><p><strong>volatile</strong></p><p>用 volatile 修饰的变量，线程在每次使用变量的时候，都会读取变量修改后的最的值。volatile 很容易被误用，用来进行原子性操作。</p><p>如果要深入了解 volatile 关键字的作用，就必须先来了解一下 JVM 在运行时候的内存分配过程。</p><p>在 java 垃圾回收整理一文中，描述了 jvm 运行时刻内存的分配。其中有一个内存区域是 jvm 虚拟机栈，每一个线程运行时都有一个线程栈，</p><p>线程栈保存了线程运行时候变量值信息。当线程访问某一个对象时候值的时候，首先通过对象的引用找到对应在堆内存的变量的值，然后把堆内存</p><p>变量的具体值load到线程本地内存中，建立一个变量副本，之后线程就不再和对象在堆内存变量值有任何关系，而是直接修改副本变量的值，</p><p>在修改完之后的某一个时刻（线程退出之前），自动把线程变量副本的值回写到对象在堆中变量。这样在堆中的对象的值就产生变化了。下面一幅图</p><p>描述这写交互！</p><figure><img src="https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202406211645029.png" alt="JVM在运行时候的内存分配过程" tabindex="0" loading="lazy"><figcaption>JVM在运行时候的内存分配过程</figcaption></figure><p>那么在了解完JVM在运行时候的内存分配过程以后，我们开始真正深入的讨论volatile的具体作用</p><p>请看代码:</p><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;"> VolatileTest</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> extends</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;"> Thread</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">    boolean</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> flag </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> false</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">    int</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> i </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">    public</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> run</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">()</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">        while</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">!</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">flag) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">            i</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">++</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">    public</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> static</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> main</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#E5C07B;">String</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">[] </span><span style="--shiki-light:#E36209;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">args</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">)</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> throws</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> Exception</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">        VolatileTest</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> vt</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> VolatileTest</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">        vt</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">start</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">        Thread</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">sleep</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">2000</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">        vt</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">flag</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> true</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">        System</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">out</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">println</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;stope&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> +</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> vt</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">i</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的代码是通过标记flag来控制 VolatileTest 线程 while 循环退出的例子!</p><p>下面让我用伪代码来描述一下我们的程序</p><ol><li>首先创建 VolatileTest vt = new VolatileTest();</li><li>然后启动线程 vt.start();</li><li>暂停主线程2秒（Main） Thread.sleep(2000);</li><li>这时的 vt 线程已经开始执行，进行i++;</li><li>主线程暂停2秒结束以后将 vt.flag = true;</li><li>打印语句 System.out.println(&quot;stope&quot; + vt.i); 在此同时由于 vt.flag 被设置为 true,所以 vt 线程在进行下一次 while 判断 while (!flag) 返回假 结束循环 vt 线程方法结束退出！</li><li>主线程结束</li></ol><p>上面的叙述看似并没有什么问题，“似乎”完全正确。那就让我们把程序运行起来看看效果吧，执行 mian 方法。2 秒钟以后控制台打印 <code>stope-202753974</code>。</p><p>可是奇怪的事情发生了 程序并没有退出。vt 线程仍然在运行，也就是说我们在主线程设置的 <code>vt.flag = true;</code>没有起作用。</p><blockquote><p>在这里我需要说明一下，有的同学可能在测试上面代码的时候程序可以正常退出。那是因为你的JVM没有优化造成的！在DOC下面输入 java -version 查看 如果显示Java HotSpot(TM) ... Server 则JVM会进行优化。</p></blockquote><p><em>如果显示Java HotSpot(TM) ... Client 为客户端模式，需要设置成Server模式 设置方法问Google</em></p><figure><img src="https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202406211646042.png" alt="java-version" tabindex="0" loading="lazy"><figcaption>java-version</figcaption></figure><p><strong>问题出现了，为什么我在主线程（main）中设置了vt.flag = true; 而vt线程在进行判断flag的时候拿到的仍然是false?</strong></p><p>那么按照我们上面所讲的 “JVM在运行时候的内存分配过程” 就很好解释上面的问题了。</p><p>首先 vt线程在运行的时候会把 变量 flag 与 i (代码3,4行) 从“主内存” 拷贝到 线程栈内存（上图的线程工作内存）</p><p>然后 vt 线程开始执行 while 循环</p><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 7</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">         while</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">flag) {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 8</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">             i</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">++</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 9</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">         }</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>while (!flag) 进行判断的 flag 是在线程工作内存当中获取，而不是从 “主内存”中获取。</p><p>i++; 将线程内存中的 i++; 加完以后将结果写回至 &quot;主内存&quot;，如此重复。</p><p>然后再说说主线程的执行过程。 我只说明关键的地方</p><p>vt.flag = true;</p><p>主线程将 <code>vt.flag</code> 的值同样 从主内存中拷贝到自己的线程工作内存 然后修改 <code>flag=true</code>. 然后再将新值回到主内存。</p><p>这就解释了为什么在主线程（main）中设置了 <code>vt.flag = true;</code> 而 vt 线程在进行判断 flag 的时候拿到的仍然是 false。那就是因为vt线程每次判断flag标记的时候是从它自己的“工作内存中”取值，而并非从主内存中取值！</p><p>这也是 JVM 为了提供性能而做的优化。那我们如何能让 vt 线程每次判断 flag 的时候都强制它去主内存中取值呢。这就是 volatile 关键字的作用。</p><p>再次修改我们的代码</p><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;"> VolatileTest</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> extends</span><span style="--shiki-light:#6F42C1;--shiki-dark:#E5C07B;"> Thread</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">    </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">    volatile</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> boolean</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> flag </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> false</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">    int</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> i </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">    </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">    public</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> run</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">()</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">        while</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">!</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">flag) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">            i</span><span style="--shiki-light:#D73A49;--shiki-dark:#ABB2BF;">++</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">    </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">    public</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> static</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> main</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#E5C07B;">String</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">[] </span><span style="--shiki-light:#E36209;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">args</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">)</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> throws</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> Exception</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">        VolatileTest</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> vt</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> VolatileTest</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">        vt</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">start</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">        Thread</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">sleep</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">2000</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">        vt</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">flag</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> true</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">        System</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">out</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">println</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;stope&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> +</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> vt</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">i</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 flag 前面加上 volatile 关键字，强制线程每次读取该值的时候都去“主内存”中取值。在试试我们的程序吧，已经正常退出了。</p><figure><img src="https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202406211646313.png" alt="可见性-volatile写" tabindex="0" loading="lazy"><figcaption>可见性-volatile写</figcaption></figure>`,44),e=[t];function h(p,k){return a(),s("div",null,e)}const g=i(l,[["render",h],["__file","volatile.html.vue"]]),o=JSON.parse('{"path":"/posts/java/javase/volatile.html","title":"volatile关键字的作用","lang":"zh-CN","frontmatter":{"title":"volatile关键字的作用","icon":"lightbulb","author":"Wang Shiyu","category":["volatile"],"sticky":false,"star":false,"description":"引言：以前只是看过介绍 volatile 的文章，对其的理解也只是停留在理论的层面上，由于最近在项目当中用到了关于并发方面的技术，所以下定决心深入研究一下java并发方面的知识。网上关于volatile的文章非常多，但是并没有讲解非常详细的文章。（哪位要是有好的资料麻烦共享一份给我！）多数的都是一些理论讲解，没有实际的例子代码，就算有代码的也测试不出效...","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/posts/java/javase/volatile.html"}],["meta",{"property":"og:site_name","content":"JavaPub"}],["meta",{"property":"og:title","content":"volatile关键字的作用"}],["meta",{"property":"og:description","content":"引言：以前只是看过介绍 volatile 的文章，对其的理解也只是停留在理论的层面上，由于最近在项目当中用到了关于并发方面的技术，所以下定决心深入研究一下java并发方面的知识。网上关于volatile的文章非常多，但是并没有讲解非常详细的文章。（哪位要是有好的资料麻烦共享一份给我！）多数的都是一些理论讲解，没有实际的例子代码，就算有代码的也测试不出效..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202406211645029.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-03T14:35:52.000Z"}],["meta",{"property":"article:author","content":"Wang Shiyu"}],["meta",{"property":"article:modified_time","content":"2024-07-03T14:35:52.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"volatile关键字的作用\\",\\"image\\":[\\"https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202406211645029.png\\",\\"https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202406211646042.png\\",\\"https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202406211646313.png\\"],\\"dateModified\\":\\"2024-07-03T14:35:52.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Wang Shiyu\\"}]}"]]},"headers":[],"git":{"createdTime":1718965796000,"updatedTime":1720017352000,"contributors":[{"name":"wangshiyu","email":"iswangshiyu@foxmail.com","commits":1}]},"readingTime":{"minutes":5.62,"words":1686},"filePathRelative":"posts/java/javase/volatile.md","localizedDate":"2024年6月21日","excerpt":"<p><strong>引言</strong>：以前只是看过介绍 <code>volatile</code> 的文章，对其的理解也只是停留在理论的层面上，由于最近在项目当中用到了关于并发方面的技术，所以下定决心深入研究一下java并发方面的知识。网上关于volatile的文章非常多，但是并没有讲解非常详细的文章。（哪位要是有好的资料麻烦共享一份给我！）多数的都是一些理论讲解，没有实际的例子代码，就算有代码的也测试不出效果，总之理论总是与代码不匹配。</p>\\n<p>后来在我不懈的努力之下总算研究出一些成果，在此分享给大家！如果大家发现有错误的地方欢迎大家指正，谢谢！</p>\\n<p>在Java线程并发处理中，有一个关键字 volatile 的使用目前存在很大的混淆，以为使用这个关键字，在进行多线程并发处理的时候就可以万事大吉。</p>","autoDesc":true}');export{g as comp,o as data};
