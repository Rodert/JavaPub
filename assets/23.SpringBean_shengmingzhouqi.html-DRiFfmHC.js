import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as h,a as i,b as n,w as e,d as s,e as t,r as p,o as k}from"./app-DrsF6qiY.js";const r={},d=i("p",null,[i("strong",null,[s("我是 javapub，一名 "),i("code",null,"Markdown"),s(" 程序员从👨‍💻，八股文种子选手。")])],-1),o=i("ol",null,[i("li",null,"实例化(Instantiation):Spring 使用 BeanDefinition 中的信息实例化 Bean。"),i("li",null,"属性赋值(Dependency injection):Spring 将 BeanDefinition 中配置的属性值注入到 Bean 中。"),i("li",null,"初始化前阶段(Post-Construct):如果 Bean 实现了 InitializingBean 接口,会调用 afterPropertiesSet() 方法。"),i("li",null,"初始化阶段(Initialization):如果在 BeanDefinition 中配置了 init-method,会调用该方法。"),i("li",null,"销毁阶段(Destruction):如果 Bean 实现了 DisposableBean 接口,会调用 destroy() 方法。如果配置了 destroy-method,会调用该方法。")],-1),g=t(`<ol><li>@PostConstruct:这是 JSR-250 注解,Spring 会在 Bean 初始化后自动调用被此注解标注的方法。</li><li>InitializingBean 接口:这个接口只有一个方法 afterPropertiesSet(),Spring 会在 Bean 初始化后调用该方法。</li><li>自定义 init-method:在 BeanDefinition 中配置 init-method 属性,指向 Bean 中的某个方法名,Spring 会在 Bean 初始化后调用这个方法。</li></ol><p>在源码层面,这些方法的调用是在 <code>AbstractAutowireCapableBeanFactory</code> 的 <code>initializeBean</code> 方法中实现的:</p><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">protected</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> Object</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> initializeBean</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">final</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> String</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> beanName</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> final</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> Object</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> bean</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> @</span><span style="--shiki-light:#D73A49;--shiki-dark:#E5C07B;">Nullable</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> RootBeanDefinition</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> mbd) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">    // ...</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">        </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">    // 1. 处理 PostConstruct 注解</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> (mbd </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">==</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> null</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> ||</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> !</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">mbd</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">isExternallyManagedInitMethod</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;afterPropertiesSet&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">)</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">        // 2. 实现了 InitializingBean 接口的 Bean 会调用 afterPropertiesSet() 方法</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">        if</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> (bean </span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">instanceof</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> InitializingBean) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">            ((InitializingBean) bean)</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">afterPropertiesSet</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">    // 3. 调用自定义的 init-method </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> (mbd </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">!=</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> null</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> &amp;&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> bean</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">getClass</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">()</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> !=</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> NullBean</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">class</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">        String</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> initMethodName </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> mbd</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">getInitMethodName</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">();</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">        if</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> (</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">StringUtils</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">hasLength</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(initMethodName)</span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;"> &amp;&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">            !</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">(bean </span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">instanceof</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> InitializingBean </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">&amp;&amp;</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> &quot;afterPropertiesSet&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">equals</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(initMethodName)</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">&amp;&amp;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">            !</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">mbd</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">isExternallyManagedInitMethod</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(initMethodName)</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">                Method</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> initMethod </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> bean</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">getClass</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">().</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">getMethod</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(initMethodName);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">                initMethod</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">invoke</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(bean);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),y=t(`<ol><li>DisposableBean 接口:实现这个接口的 Bean 会调用 destroy() 方法。</li><li>自定义 destroy-method:在 BeanDefinition 中配置 destroy-method 属性,指向 Bean 中的某个方法名,Spring 会在 Bean 销毁前调用这个方法。</li></ol><p>在源码层面,这些方法的调用是在 <code>AbstractAutowireCapableBeanFactory</code> 的 <code>destroyBean</code> 方法中实现的:</p><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">protected</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> destroyBean</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">(</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">String</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> beanName</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> @</span><span style="--shiki-light:#D73A49;--shiki-dark:#E5C07B;">Nullable</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> DisposableBean</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> bean) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">    // 1. 实现了 DisposableBean 接口的 Bean 会调用 destroy() 方法</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> (bean </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">!=</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">) { </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">        bean</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">destroy</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">    // 2. 调用自定义的 destroy-method</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">    String</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> destroyMethodName </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> getDestroyMethodName</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">(beanName)</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> (destroyMethodName </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">!=</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">        Method</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> destroyMethod </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">        try</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">            // 获取 destroy-method 方法对象</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">            destroyMethod </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;"> bean</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">getClass</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">().</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">getMethod</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(destroyMethodName);</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">        } </span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">catch</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> (</span><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">NoSuchMethodException</span><span style="--shiki-light:#E36209;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"> ex</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">            throw</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> BeanDefinitionStoreException</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">(</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">...</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">)</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">        </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">        // 调用方法</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">        try</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">            if</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> (destroyMethod </span><span style="--shiki-light:#D73A49;--shiki-dark:#56B6C2;">!=</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E5C07B;">                destroyMethod</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">invoke</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">(bean);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">            }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">        } </span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">catch</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> (...) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;">            throw</span><span style="--shiki-light:#D73A49;--shiki-dark:#C678DD;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;"> BeanCreationException</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">(</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">...</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">)</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">;</span><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;"> </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">    } </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">    </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E06C75;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),B=t(`<ol><li>singleton:单例,整个 Spring 容器中只有一个 Bean 实例。</li><li>prototype:原型,每次获取 Bean 都会创建一个新的实例。</li><li>request:每个 HTTP 请求都会创建一个 Bean 实例。</li><li>session:每个 HTTP 会话都会创建一个 Bean 实例。</li><li>global-session:每个全局 HTTP 会话都会创建一个 Bean 实例。</li></ol><p>我们可以通过 <code>scope</code> 属性控制 Bean 的作用域,从而影响其生命周期:</p><div class="language-xml line-numbers-mode" data-highlighter="shiki" data-ext="xml" data-title="xml" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">bean</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D19A66;"> id</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;...&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D19A66;"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;...&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D19A66;"> scope</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;prototype&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">/&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>此外,我们还可以自定义 Bean 的初始化和销毁方法,在 Bean 作用域开始和结束时触发:</p><div class="language-xml line-numbers-mode" data-highlighter="shiki" data-ext="xml" data-title="xml" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">bean</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D19A66;"> id</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;...&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D19A66;"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;...&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D19A66;"> scope</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;prototype&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#D19A66;">    init-method</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;start&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#D19A66;"> destroy-method</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;end&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">bean</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样我们就可以在 <code>start()</code> 方法中执行初始化逻辑,在 <code>end()</code> 方法中执行清理工作,从而精确控制 Bean 的生命周期。</p>`,6),c=t("<ol><li>BeanPostProcessor:这个接口可以监听 Bean 的初始化前后,提供了扩展点可以在 Bean 初始化前后进行一些处理。这也是 Spring AOP 的底层原理之一。</li><li>了解 BeanFactoryPostProcessor:这个接口可以监听 BeanDefinition 的加载,可以在 Bean 实例化前修改 BeanDefinition 的属性。</li><li>理解 Bean 的加载时机:在 Spring 容器启动时,默认会立即加载 singleton 作用域的 Bean,而其他作用域的 Bean 会延迟加载, singleton 作用域的 Bean 也支持延迟加载。这就要涉及到Spring 的 <code>lazy-init</code> 属性设置。</li><li>了解 Bean 为什么要有不同的作用域:每个作用域适合的场景是什么,选择不同作用域会对 Bean 的生命周期产生怎样的影响。</li><li>了解 Bean 之间的依赖关系对生命周期的影响:比如 A Bean 的初始化依赖 B Bean,那么 A Bean 的初始化也会延迟到 B Bean 初始化完毕后。这涉及到 Spring 的 <code>depends-on</code> 属性配置。</li><li>了解自定义初始化和销毁方法的具体应用场景:什么情况下需要自定义这些方法,能在方法中完成什么样的逻辑处理。</li><li>探索 BeanPostProcessor 和 BeanFactoryPostProcessor 的具体应用:比如 Spring AOP、Spring 事件发布者等机制的实现。 综上,要全面理解 Spring Bean 的生命周期,除了知道每个阶段的调用外,还需要对很多这个过程涉及到的其他知识点进行深入学习和理解,这需要不断实践和总结。但只要把这些要点都串联起来,对 Spring Bean 的生命周期控制就会很得心应手了。</li></ol>",1),E=t('<figure><img src="https://ghproxy.com/https://raw.githubusercontent.com/Rodert/javapub_oss/main/other/23.jpg?raw=true" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>最近我在更新《面试1v1》系列文章，主要以场景化的方式，讲解我们在面试中遇到的问题，致力于让每一位工程师拿到自己心仪的offer，感兴趣可以关注<strong>公众号JavaPub</strong>追更！</p><figure><img src="https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/2024%2F06%2F06%2F20240606-225632.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>🎁目录合集：</p><p>Gitee：<code>https://gitee.com/rodert/JavaPub</code></p><p>GitHub：<code>https://github.com/Rodert/JavaPub</code></p><p><a href="http://javapub.net.cn" target="_blank" rel="noopener noreferrer">http://javapub.net.cn</a></p>',7);function u(C,m){const a=p("font");return k(),h("div",null,[d,i("p",null,[i("strong",null,[n(a,{color:"blue"},{default:e(()=>[s("面试官")]),_:1}),s("： 小伙子,听说你对 Spring Bean 生命周期比较熟悉,我们聊聊吧。Spring Bean 都有哪些生命周期阶段?")])]),i("p",null,[i("strong",null,[n(a,{color:"red"},{default:e(()=>[s("候选人：")]),_:1})]),s(" Spring Bean 的生命周期可以分为 5 个阶段:")]),o,i("p",null,[i("strong",null,[n(a,{color:"blue"},{default:e(()=>[s("面试官")]),_:1}),s("： 聪明!初始化方法有哪些?在源码层面,Spring 是如何调用这些方法的?")])]),i("p",null,[i("strong",null,[n(a,{color:"red"},{default:e(()=>[s("候选人：")]),_:1})]),s(" Spring Bean 提供了 3 种初始化方法:")]),g,i("p",null,[i("strong",null,[n(a,{color:"blue"},{default:e(()=>[s("面试官")]),_:1}),s("： 不错,你对 Spring Bean 的初始化过程很清楚!那销毁方法哪些?原理又是什么?")])]),i("p",null,[i("strong",null,[n(a,{color:"red"},{default:e(()=>[s("候选人：")]),_:1})]),s(" Spring Bean 提供了 2 种销毁方法:")]),y,i("p",null,[i("strong",null,[n(a,{color:"blue"},{default:e(()=>[s("面试官")]),_:1}),s("： 棒!最后,Spring Bean 的作用域都有哪些?如何控制 Bean 的生命周期?")])]),i("p",null,[i("strong",null,[n(a,{color:"red"},{default:e(()=>[s("候选人：")]),_:1})]),s(" Spring Bean 的作用域有 5 种:")]),B,i("p",null,[i("strong",null,[n(a,{color:"blue"},{default:e(()=>[s("面试官")]),_:1}),s("： 很全面,佩服佩服!如果再给你一个机会,你觉得还可以在哪些方面加深对 Spring Bean 生命周期的理解?")])]),i("p",null,[i("strong",null,[n(a,{color:"red"},{default:e(()=>[s("候选人：")]),_:1})]),s(" 这里有几个方面可以进一步加深对 Spring Bean 生命周期的理解:")]),c,i("p",null,[i("strong",null,[n(a,{color:"blue"},{default:e(()=>[s("面试官")]),_:1}),s("： 非常棒,这些点精彩极了!你的回答已经很全面和深入,对 Spring Bean 生命周期有清晰理解,这些又是常见的面试重点,我相信面试一定会取得很好的表现,加油!我们就聊到这里,很高兴与你的交流,谢谢!")])]),E])}const A=l(r,[["render",u],["__file","23.SpringBean_shengmingzhouqi.html.vue"]]),F=JSON.parse('{"path":"/posts/special/1v1/23.SpringBean_shengmingzhouqi.html","title":"SpringBean生命周期","lang":"zh-CN","frontmatter":{"title":"SpringBean生命周期","icon":"laptop-code","category":["《面试1v1》"],"description":"我是 javapub，一名 Markdown 程序员从👨‍💻，八股文种子选手。 ： 小伙子,听说你对 Spring Bean 生命周期比较熟悉,我们聊聊吧。Spring Bean 都有哪些生命周期阶段? Spring Bean 的生命周期可以分为 5 个阶段: 实例化(Instantiation):Spring 使用 BeanDefinition ...","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/posts/special/1v1/23.SpringBean_shengmingzhouqi.html"}],["meta",{"property":"og:site_name","content":"JavaPub"}],["meta",{"property":"og:title","content":"SpringBean生命周期"}],["meta",{"property":"og:description","content":"我是 javapub，一名 Markdown 程序员从👨‍💻，八股文种子选手。 ： 小伙子,听说你对 Spring Bean 生命周期比较熟悉,我们聊聊吧。Spring Bean 都有哪些生命周期阶段? Spring Bean 的生命周期可以分为 5 个阶段: 实例化(Instantiation):Spring 使用 BeanDefinition ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://ghproxy.com/https://raw.githubusercontent.com/Rodert/javapub_oss/main/other/23.jpg?raw=true"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-03T14:35:52.000Z"}],["meta",{"property":"article:author","content":"Mr.Wang"}],["meta",{"property":"article:modified_time","content":"2024-07-03T14:35:52.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"SpringBean生命周期\\",\\"image\\":[\\"https://ghproxy.com/https://raw.githubusercontent.com/Rodert/javapub_oss/main/other/23.jpg?raw=true\\",\\"https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/2024%2F06%2F06%2F20240606-225632.png\\"],\\"dateModified\\":\\"2024-07-03T14:35:52.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Mr.Wang\\",\\"url\\":\\"https://javapub.net.cn\\"}]}"]]},"headers":[],"git":{"createdTime":1717568495000,"updatedTime":1720017352000,"contributors":[{"name":"wangshiyu","email":"iswangshiyu@foxmail.com","commits":1}]},"readingTime":{"minutes":5.46,"words":1637},"filePathRelative":"posts/special/1v1/23.SpringBean_shengmingzhouqi.md","localizedDate":"2024年6月5日","excerpt":"<p><strong>我是 javapub，一名 <code>Markdown</code> 程序员从👨‍💻，八股文种子选手。</strong></p>\\n<p><strong>： 小伙子,听说你对 Spring Bean 生命周期比较熟悉,我们聊聊吧。Spring Bean 都有哪些生命周期阶段?</strong></p>\\n<p><strong></strong> Spring Bean 的生命周期可以分为 5 个阶段:</p>\\n<ol>\\n<li>实例化(Instantiation):Spring 使用 BeanDefinition 中的信息实例化 Bean。</li>\\n<li>属性赋值(Dependency injection):Spring 将 BeanDefinition 中配置的属性值注入到 Bean 中。</li>\\n<li>初始化前阶段(Post-Construct):如果 Bean 实现了 InitializingBean 接口,会调用 afterPropertiesSet() 方法。</li>\\n<li>初始化阶段(Initialization):如果在 BeanDefinition 中配置了 init-method,会调用该方法。</li>\\n<li>销毁阶段(Destruction):如果 Bean 实现了 DisposableBean 接口,会调用 destroy() 方法。如果配置了 destroy-method,会调用该方法。</li>\\n</ol>","autoDesc":true}');export{A as comp,F as data};