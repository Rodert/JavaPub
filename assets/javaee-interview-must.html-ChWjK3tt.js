import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,f as p,a as r,e as a,o as i}from"./app-DrsF6qiY.js";const l={},o=r("p",null,"JavaEE",-1),n=a('<p>10道不得不会的 JavaEE 面试题</p><p>我是 JavaPub，专注于面试、副业，技术人的成长记录。</p><p>以下是 JavaEE 面试题，相信大家都会有种及眼熟又陌生的感觉、看过可能在短暂的面试后又马上忘记了。<strong>JavaPub</strong>在这里整理这些容易忘记的重点知识及<strong>解答</strong>，<code>建议收藏，经常温习查阅</code>。</p><p>评论区见</p><p>@[toc]</p><h1 id="javaee" tabindex="-1"><a class="header-anchor" href="#javaee"><span>JavaEE</span></a></h1><p>本系列<a href="https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzUzNDUyOTY0Nw==&amp;action=getalbum&amp;album_id=2344061143381508097#wechat_redirect" target="_blank" rel="noopener noreferrer">《最少必要面试题》</a></p><p>目前很多新项目很少会用到JavaEE的技术栈，但是对于部分维护老代码的工程师来说，还是尤为重要。</p><h3 id="_1-jsp-有哪些内置对象-作用分别是什么" tabindex="-1"><a class="header-anchor" href="#_1-jsp-有哪些内置对象-作用分别是什么"><span>1. JSP 有哪些内置对象？作用分别是什么？</span></a></h3><p>JSP有9个内置对象：</p><ul><li><p>request：封装客户端的请求，其中包含来自GET或POST请求的参数；</p></li><li><p>response：封装服务器对客户端的响应；</p></li><li><p>pageContext：通过该对象可以获取其他对象；</p></li><li><p>session：封装用户会话的对象；</p></li><li><p>application：封装服务器运行环境的对象；</p></li><li><p>out：输出服务器响应的输出流对象；</p></li><li><p>config：web应用的配置对象；</p></li><li><p>page：jsp页面本身（相当于Java程序中的this）；</p></li><li><p>exception：封装页面抛出异常的对象。</p></li></ul><figure><img src="https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202405271038434.png" alt="JSP的9内置对象及其含义" tabindex="0" loading="lazy"><figcaption>JSP的9内置对象及其含义</figcaption></figure><h3 id="_2-介绍一下-servlet-生命周期" tabindex="-1"><a class="header-anchor" href="#_2-介绍一下-servlet-生命周期"><span>2. 介绍一下 Servlet 生命周期</span></a></h3><p>Servlet是运行在服务器端，以多线程的方式处理客户端请求的小程序。是sun公司提供的一套规范（规范的实现是接口）。</p><p>servlet的生命周期就是从servlet出现到消亡(销毁)的全过程。主要分为以下几个阶段：</p><p><strong>加载类—&gt;实例化(为对象分配空间)—&gt;初始化(为对象的属性赋值)—&gt;请求响应(服务阶段)—&gt;销毁</strong></p><p>详细介绍：</p><ol><li>加载</li></ol><p>在下列时刻会加载Servlet（只执行一次）：</p><ul><li>如果已经配置自动加载选项，则在启动服务器时自动加载 <code>web.xml</code> 文件中设置的<code>&lt;load-on-start&gt;</code>；</li><li>服务器启动之后，客户机首次向Servlet发出请求时会加载；</li><li>重新加载Servlet时会进行一次加载；</li></ul><ol start="2"><li>实例化</li></ol><p>加载Servlet后，服务器创建一个Servlet实例。（只执行一次）</p><ol start="3"><li>初始化</li></ol><ul><li>调用 Servlet 的 <code>init()</code> 方法。在初始化阶段，Servlet 初始化参数被传递给 Servlet 配置对象 ServletConfig。（只执行一次）；</li></ul><ol start="4"><li>请求处理</li></ol><p>对于到达服务器的客户机请求，服务器创建针对此次请求的一个&quot;请求对象&quot;和一个&quot;响应对象&quot;。</p><p>服务器调用 Servlet 的 <code>service()</code> 方法，该方法用于传递&quot;请求&quot;和&quot;响应&quot;对象。</p><p><code>service()</code> 方法从&quot;请求&quot;对象获得请求信息、处理该请求并用&quot;响应&quot;对象的方法将响应回传给客户端。</p><p><code>service()</code> 方法可以调用其他方法来处理请求，例如 <code>doGet()、doPost()</code> 或其他方法。</p><ol start="5"><li>销毁</li></ol><p>当服务器不需要 Servlet，或重新装入 Servlet 的新实例时，服务器会调用 Servlet 的 <code>destroy()</code> 方法。（只执行一次）；</p><h3 id="_3-servlet和jsp的区别和联系" tabindex="-1"><a class="header-anchor" href="#_3-servlet和jsp的区别和联系"><span>3. Servlet和JSP的区别和联系</span></a></h3><p><strong>区别：</strong></p><ol><li><p>JSP是在HTML代码里面写Java代码；而Servlet是在Java代码中写HTML代码，Servlet本身是个Java类；</p></li><li><p>JSP使人们将显示和逻辑分隔称为可能，这意味着两者的开发可以并行进行；而Servlet并没有将两者分开；</p></li><li><p>Servlet独立地处理静态表示逻辑与动态业务逻辑，任何文件的变动都需要对此服务程序重新编译；JSP允许使用特殊标签直接嵌入到HTML页面，HTML内容与JAVA内容也可放在单独文件中，HTML内容的任何变动会自动编译装入到服务程序；</p></li><li><p>Servlet需要在web.xml中配置；而JSP无需配置；</p></li><li><p>目前JSP主要用在视图层，负责显示；而Servlet主要用在控制层，负责调度；</p></li></ol><p><strong>联系：</strong></p><ol><li><p>都是SUN公司推出的动态网页技术；</p></li><li><p>先有Servlet，针对Servlet缺点推出JSP。JSP是Servlet的一种特殊形式，每个JSP页面就是一个Servlet实例，JSP页面由系统翻译成Servlet，Servlet再负责响应用户的请求。</p></li></ol><h3 id="_4-jsp的执行过程" tabindex="-1"><a class="header-anchor" href="#_4-jsp的执行过程"><span>4. JSP的执行过程</span></a></h3><p>在JSP运行过程中，首先由客户端发出请求，Web服务器接收到请求之后，如果是第一次访问某个JSP页面，Web服务器对它进行一下三个操作：</p><ol><li>翻译</li></ol><p>由.jsp变为.java，由JSP引擎完成。</p><ol start="2"><li>编译</li></ol><p>由.java变为.class，由Java编译器实现。</p><ol start="3"><li>执行</li></ol><p>由.class变为.html，用Java虚拟机执行编译文件，然后将执行结果返回给Web服务器，并最终返回给客户端。</p><p>如果不是第一次访问某个JSP页面，则只执行第三步，<strong>所以第一次访问JSP较慢</strong>。</p><h3 id="_5-session和cookie的区别和联系-说明在自己项目中如何使用" tabindex="-1"><a class="header-anchor" href="#_5-session和cookie的区别和联系-说明在自己项目中如何使用"><span>5. Session和Cookie的区别和联系；说明在自己项目中如何使用？</span></a></h3><p>Session 和 Cookie 都是会话(Seesion)跟踪技术。Cookie 通过在客户端记录信息确定用户身份，Session 通过在服务器端记录信息确定用户身份。但是 Session 的实现依赖于 <strong>Cookie，sessionId</strong>(session的唯一标识需要存放在客户端).</p><ol><li><p>cookie数据存放在客户的浏览器上，session数据放在服务器上。</p></li><li><p>cookie不是很安全，别人可以分析存放在本地的cookie并进行cookie欺骗，考虑到安全应当使用session。</p></li><li><p>session会在一定时间内保存在服务器上。当访问增多，会比较占用你服务器的性能，考虑到减轻服务器性能方面，应当使用cookie。</p></li><li><p>单个cookie保存的数据不能超过4K，很多浏览器都限制一个站点最多保存20个cookie。</p></li><li><p>可以考虑将登录信息等重要信息存放为session，其他信息如果需要保留，可以放在cookie中。</p></li><li><p>在程序开发过程中，我们可以在客户端每次与服务器交互时检查SessionID（Session中属性值，非HttpServlet环境开发中也可以用其它的Key值代替），用于会话管理。</p></li></ol><ul><li><p>将登陆信息等重要信息存放为SESSION</p></li><li><p>其他信息如果需要保留，可以放在COOKIE中，比如购物车</p><p>购物车最好使用cookie，但是cookie是可以在客户端禁用的，这时候我们要使用cookie+数据库的方式实现，当从cookie中不能取出数据时，就从数据库获取。</p></li></ul><h3 id="_6-转发和重定向的联系和区别" tabindex="-1"><a class="header-anchor" href="#_6-转发和重定向的联系和区别"><span>6. 转发和重定向的联系和区别？</span></a></h3><ul><li><p><strong>转发</strong>：服务器端的跳转，路径不会发生改变（针对的是servlet），是服务器内部的处理，一次请求，请求对象不会变</p></li><li><p><strong>重定向</strong>：客户端的跳转，路径会发生改变，将要请求的路径和302重定向的状态码发给客户端浏览器，客户端浏览器将再次向服务器发出请求，不是同个请求，两次请求。</p></li></ul><h3 id="_7-拦截器和过滤器的区别" tabindex="-1"><a class="header-anchor" href="#_7-拦截器和过滤器的区别"><span>7. 拦截器和过滤器的区别</span></a></h3><p>Spring 的拦截器与 Servlet 的 Filter 有相似之处，比如二者都是AOP编程思想的体现，都能实现权限检查、日志记录等。不同的是:</p><ol><li><p>使用范围不同: Filter 是 Servlet 规范规定的，只能用于Web程序中。而拦截器既可以用于Web程序，也可以用于 Application、Swing程序中。</p></li><li><p>规范不同: Filter 是在 Servlet 规范中定义的，是 Servlet 容器支持的。而拦截器是在 Spring 容器内的，是 Spring 框架支持的。</p></li><li><p>使用的资源不同:同其他的代码块一样，拦截器也是一个 Spring 的组件，归 Spring 管理，配置在 Spring 文件中，因此能使用 Spring 里的任何资源、对象，例如 Service 对象、数据源、事务管理等，通过 IoC 注入到拦截器即可;而Filter则不能。</p></li><li><p>深度不同: Filter 在只在 Servlet 前后起作用。而拦截器能够深入到方法前后、异常抛出前后等，因此拦截器的使用具有更大的弹性。所以在 Spring 构架的程序中，要优先使用拦截器。</p></li></ol><p>一张经典的图</p><figure><img src="https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/2024%2F06%2F15%2F20240615-092104.png" alt="过滤器&amp;拦截器" tabindex="0" loading="lazy"><figcaption>过滤器&amp;拦截器</figcaption></figure><h3 id="_8-三次握手和四次挥手" tabindex="-1"><a class="header-anchor" href="#_8-三次握手和四次挥手"><span>8. 三次握手和四次挥手</span></a></h3><blockquote><p>这里是字面描述</p></blockquote><p><strong>三次握手:</strong></p><ol><li><p>客户端向服务器发出连接请求等待服务器确认</p></li><li><p>服务器向客户端返回一个响应告诉客户端收到了请求</p></li><li><p>客户端向服务器再次发出确认信息,此时连接建立</p></li></ol><p><strong>四次挥手:</strong></p><ol><li><p>客户端向服务器发出取消连接请求</p></li><li><p>服务器向客户端返回一个响应,表示收到客户端取消请求</p></li><li><p>服务器向客户端发出确认取消信息(向客户端表明可以取消连接了)</p></li><li><p>客户端再次发送确认消息,此时连接取消</p></li></ol><h3 id="_9-tcp和udp的区别" tabindex="-1"><a class="header-anchor" href="#_9-tcp和udp的区别"><span>9. TCP和UDP的区别</span></a></h3><ol><li><p>TCP ：面向连接，UDP ：面向无连接</p></li><li><p>TCP ：传输效率低，UDP ：传输效率高(有大小限制，一次限定在64kb之内)</p></li><li><p>TCP：可靠，UDP ：不可靠</p></li></ol><h3 id="_10-如何解决跨域问题" tabindex="-1"><a class="header-anchor" href="#_10-如何解决跨域问题"><span>10. 如何解决跨域问题？</span></a></h3><p>跨域指的是浏览器不能执行其它网站的脚本，它是由浏览器的<strong>同源策略</strong>造成的，是浏览器对 JavaScript 施加的安全限制。</p><p>所谓同源指的是：<strong>协议、域名、端口号</strong>都相同，只要有一个不相同，那么都是非同源。</p><p><strong>解决方案：</strong></p><ol><li><p>使用 ajax 的 jsonp。（这一点有些人是不知道的）</p></li><li><p>nginx 转发：利用 nginx 反向代理，将请求分发到部署相应项目的 tomcat 服务器，当然也不存在跨域问题。</p></li><li><p>使用 CORS：写一个配置类实现 WebMvcConfigurer 接口或者配置 FilterRegistrationBean。</p></li></ol><p><code>CORS（Cross-Origin Resource Sharing）是一个W3C标准，全称“跨域资源共享”</code></p><h3 id="_11-什么是-csrf-攻击-如何防御csrf-攻击" tabindex="-1"><a class="header-anchor" href="#_11-什么是-csrf-攻击-如何防御csrf-攻击"><span>11. 什么是 CSRF 攻击？如何防御CSRF 攻击</span></a></h3><p>CSRF（Cross-site request forgery） 跨站请求伪造。CSRF 攻击是在受害者毫不知情的情况下，以受害者名义伪造请求发送给受攻击站点，从而在受害者并未授权的情况下执行受害者权限下的各种操作。</p><p>CSRF 攻击专门针对状态改变请求，而不是数据窃取，因为攻击者无法查看对伪造请求的响应。</p><p>目前防御 CSRF 攻击主要有三种策略：</p><ol><li><p>验证 HTTP Referer 字段</p></li><li><p>在请求地址中添加 token 并验证</p></li><li><p>在 HTTP 头中自定义属性并验证</p></li></ol><h3 id="_12-http1-0和http1-1和http2-0的区别" tabindex="-1"><a class="header-anchor" href="#_12-http1-0和http1-1和http2-0的区别"><span>12. HTTP1.0和HTTP1.1和HTTP2.0的区别</span></a></h3><ol><li><p><strong>HTTP1.0</strong> ：无状态，无连接。</p></li><li><p><strong>HTTP1.1</strong> ：长连接，请求管道化，增加缓存处理，增加 Host 字段，支持断点传输。</p></li><li><p><strong>HTTP2.0</strong> ：二进制分帧，多路复用(连接共享)，头部压缩，服务器推送。</p></li></ol><p>低谷蓄力</p><p><strong>《最少必要面试题》</strong></p><p><a href="https://mp.weixin.qq.com/s/3Nviyml0cvnX_HHkZ5DjWg" target="_blank" rel="noopener noreferrer">10道不得不会的Java基础面试题</a></p><p><a href="https://mp.weixin.qq.com/s/ug3LBR4MfM1C5uVFJaPWLQ" target="_blank" rel="noopener noreferrer">10道不得不会的Java容器面试题</a></p><p><a href="https://mp.weixin.qq.com/s/h2tTwDVqL15rCI6rftgn9A" target="_blank" rel="noopener noreferrer">10道不得不会的Java并发基础面试题</a></p><p><a href="https://mp.weixin.qq.com/s/59Tif95LGi8BTJXu47zi6g" target="_blank" rel="noopener noreferrer">10道不得不会的JavaEE面试题</a></p><p><a href="https://mp.weixin.qq.com/s/hvsaD1NlzpR0LpP-GmbU_A" target="_blank" rel="noopener noreferrer">10道不得不会的JVM面试题</a></p><p><a href="https://mp.weixin.qq.com/s/yVPwCoSQ-8OYvhw8bH0PtA" target="_blank" rel="noopener noreferrer">10道不得不会的MySQL基础面试题</a></p><p><a href="https://mp.weixin.qq.com/s/lVFwy765hQ2FvIYBHyw0yA" target="_blank" rel="noopener noreferrer">10道不得不会的MyBatis面试题</a></p><p><a href="https://mp.weixin.qq.com/s/lrHsLZANxHxd_FWTCdMNJw" target="_blank" rel="noopener noreferrer">10道不得不会的Spring面试题</a></p><p><a href="https://mp.weixin.qq.com/s/-oYKVXBaQwzyzp7ffqH7gw" target="_blank" rel="noopener noreferrer">10道不得不会的SpringBoot面试题</a></p><p><a href="https://mp.weixin.qq.com/s/z3D37HqeTUmwrdheUL_Efw" target="_blank" rel="noopener noreferrer">10道不得不会的ElasticSearch面试题</a></p><p><a href="https://mp.weixin.qq.com/s/_Pq2VgxRA4yw1j_eCfEiLg" target="_blank" rel="noopener noreferrer">10道不得不会的Redis面试题</a></p><p><a href="https://javapub.blog.csdn.net/category_11740063.html" target="_blank" rel="noopener noreferrer">10道不得不会的Kafka面试题</a></p><p><a href="https://mp.weixin.qq.com/s/ym0-x6okFi0CgF8RcxeLFA" target="_blank" rel="noopener noreferrer">10道不得不会的Zookeeper面试题</a></p><p><a href="https://mp.weixin.qq.com/s/DTC3gZNHm3Rlf_GK7twlkQ" target="_blank" rel="noopener noreferrer">10道不得不会的Docker面试题</a></p><p><a href="">10道不得不会的缓存面试题</a></p><p><a href="https://github.com/Rodert" target="_blank" rel="noopener noreferrer">GItHub</a>|<a href="https://gitee.com/rodert" target="_blank" rel="noopener noreferrer">GitEE</a></p>',95);function s(c,h){return i(),t("div",null,[o,p(" more "),n])}const v=e(l,[["render",s],["__file","javaee-interview-must.html.vue"]]),m=JSON.parse('{"path":"/posts/special/havato/javaee-interview-must.html","title":"10道不得不会的 JavaEE 面试题","lang":"zh-CN","frontmatter":{"index":true,"icon":"page","title":"10道不得不会的 JavaEE 面试题","author":"Wang Shiyu","date":"2022-06-25T00:00:00.000Z","category":["最少必要面试题"],"tag":["javaee","面试题"],"description":"JavaEE","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/posts/special/havato/javaee-interview-must.html"}],["meta",{"property":"og:site_name","content":"JavaPub"}],["meta",{"property":"og:title","content":"10道不得不会的 JavaEE 面试题"}],["meta",{"property":"og:description","content":"JavaEE"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202405271038434.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-03T14:35:52.000Z"}],["meta",{"property":"article:author","content":"Wang Shiyu"}],["meta",{"property":"article:tag","content":"javaee"}],["meta",{"property":"article:tag","content":"面试题"}],["meta",{"property":"article:published_time","content":"2022-06-25T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-03T14:35:52.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"10道不得不会的 JavaEE 面试题\\",\\"image\\":[\\"https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202405271038434.png\\",\\"https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/2024%2F06%2F15%2F20240615-092104.png\\"],\\"datePublished\\":\\"2022-06-25T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-03T14:35:52.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Wang Shiyu\\"}]}"]]},"headers":[{"level":3,"title":"1. JSP 有哪些内置对象？作用分别是什么？","slug":"_1-jsp-有哪些内置对象-作用分别是什么","link":"#_1-jsp-有哪些内置对象-作用分别是什么","children":[]},{"level":3,"title":"2. 介绍一下 Servlet 生命周期","slug":"_2-介绍一下-servlet-生命周期","link":"#_2-介绍一下-servlet-生命周期","children":[]},{"level":3,"title":"3. Servlet和JSP的区别和联系","slug":"_3-servlet和jsp的区别和联系","link":"#_3-servlet和jsp的区别和联系","children":[]},{"level":3,"title":"4. JSP的执行过程","slug":"_4-jsp的执行过程","link":"#_4-jsp的执行过程","children":[]},{"level":3,"title":"5. Session和Cookie的区别和联系；说明在自己项目中如何使用？","slug":"_5-session和cookie的区别和联系-说明在自己项目中如何使用","link":"#_5-session和cookie的区别和联系-说明在自己项目中如何使用","children":[]},{"level":3,"title":"6. 转发和重定向的联系和区别？","slug":"_6-转发和重定向的联系和区别","link":"#_6-转发和重定向的联系和区别","children":[]},{"level":3,"title":"7. 拦截器和过滤器的区别","slug":"_7-拦截器和过滤器的区别","link":"#_7-拦截器和过滤器的区别","children":[]},{"level":3,"title":"8. 三次握手和四次挥手","slug":"_8-三次握手和四次挥手","link":"#_8-三次握手和四次挥手","children":[]},{"level":3,"title":"9. TCP和UDP的区别","slug":"_9-tcp和udp的区别","link":"#_9-tcp和udp的区别","children":[]},{"level":3,"title":"10. 如何解决跨域问题？","slug":"_10-如何解决跨域问题","link":"#_10-如何解决跨域问题","children":[]},{"level":3,"title":"11. 什么是 CSRF 攻击？如何防御CSRF 攻击","slug":"_11-什么是-csrf-攻击-如何防御csrf-攻击","link":"#_11-什么是-csrf-攻击-如何防御csrf-攻击","children":[]},{"level":3,"title":"12. HTTP1.0和HTTP1.1和HTTP2.0的区别","slug":"_12-http1-0和http1-1和http2-0的区别","link":"#_12-http1-0和http1-1和http2-0的区别","children":[]}],"git":{"createdTime":1717582746000,"updatedTime":1720017352000,"contributors":[{"name":"wangshiyu","email":"iswangshiyu@foxmail.com","commits":1}]},"readingTime":{"minutes":10.18,"words":3055},"filePathRelative":"posts/special/havato/javaee-interview-must.md","localizedDate":"2022年6月25日","excerpt":"<p>JavaEE</p>\\n","autoDesc":true}');export{v as comp,m as data};
