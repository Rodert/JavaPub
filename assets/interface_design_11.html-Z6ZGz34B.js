import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,o as i,e as t}from"./app-Cno9IsiL.js";const n={},s=t(`<blockquote><p>标题： 接口设计这11点要注意 ｜ 接口设计军规 | 干了3年程序员，老板让我这样写接口 | 11条军规，让你的接口设计无可挑剔</p></blockquote><figure><img src="https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202405211115020.jpg" alt="cover" tabindex="0" loading="lazy"><figcaption>cover</figcaption></figure><p>作为后端工程师，多数情况都是给别人提供接口，写的好不好使你得重视起来。</p><figure><img src="https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202405171707202.jpeg" alt="74076262d8f14d5390e1ba557e0296a0" tabindex="0" loading="lazy"><figcaption>74076262d8f14d5390e1ba557e0296a0</figcaption></figure><p>最近我手头一些活，需要和外部公司对接，我们需要提供一个接口文档，这样可以节省双方时间、也可以防止后续扯皮。这是就要考验我的接口是否规范化。</p><figure><img src="https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202405211059259.png" alt="接口设计规范JavaPub" tabindex="0" loading="lazy"><figcaption>接口设计规范JavaPub</figcaption></figure><h3 id="_1-接口名称清晰、明确" tabindex="-1"><a class="header-anchor" href="#_1-接口名称清晰、明确"><span>1. 接口名称清晰、明确</span></a></h3><p>顾名思义，接口是做什么的，是否准确、清晰？让使用这一眼就能知道这个接口在做什么，力求言简意赅。比如：<strong>查询用户信息</strong>，简单明了。</p><figure><img src="https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202405211017176.jpeg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h3 id="_2-接口路径规整" tabindex="-1"><a class="header-anchor" href="#_2-接口路径规整"><span>2. 接口路径规整</span></a></h3><p>接口地址，也就是接口的 <code>URL</code> 路径。当别人调用你的接口，就是通过 <code>URL</code> 配合请求时参数来调用。比如： <code>/api/user/queryById</code> 。一般来说，接口地址的命名也要可以大概看出接口的作用，比如前面这个接口，它是作用使用：<strong>通过用户id查询用户信息</strong>。</p><p>除了接口路径，还需要指明接口的域名或IP。以 http 协议为例、端口是 8080，当我请求 javapub 的用户中心信息时：</p><blockquote><p>https://javapub.net.cn:8080/api/user/queryById</p></blockquote><figure><img src="https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202405211023485.jpeg" alt="4677eb13-b696-43be-b530-60766742a4e3" tabindex="0" loading="lazy"><figcaption>4677eb13-b696-43be-b530-60766742a4e3</figcaption></figure><h3 id="_3-请求方式规范" tabindex="-1"><a class="header-anchor" href="#_3-请求方式规范"><span>3. 请求方式规范</span></a></h3><p>请求方式常用的有如下几种：</p><ul><li>GET（SELECT）：从服务器取出资源，通常用于查询数据（一项或多项）。</li><li>POST（CREATE）：在服务器新建一个资源，通常用在新增、修改、删除操作。</li><li>PUT（UPDATE）：在服务器更新资源，通常用于更新数据（客户端提供改变后的完整资源）。</li><li>PATCH（UPDATE）：在服务器更新资源，通常用于修改部分数据（客户端提供改变的属性）。</li><li>DELETE（DELETE）：从服务器删除资源，通常用于删除数据。</li></ul><p>这么多请求方式，多数中小公司只用 <code>GET 和 POST</code>，可能还有些公司只用 <code>POST</code>。但是选择合适的请求方式可以提升开发效率、并且让我们的接口更容易复用。</p><p>不管用哪种，一定要写清楚。</p><figure><img src="https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202405211025708.jpeg" alt="eb21c081-f26c-4c8c-9197-4a35573e8b04" tabindex="0" loading="lazy"><figcaption>eb21c081-f26c-4c8c-9197-4a35573e8b04</figcaption></figure><h3 id="_4-接口详细说明" tabindex="-1"><a class="header-anchor" href="#_4-接口详细说明"><span>4. 接口详细说明</span></a></h3><p>如果是非常简单的接口，通过接口名就可以了解个大概。如果是一些非常复杂的接口，就一定要添加详细说明文档，包括功能描述、请求参数、请求相应参数等信息。</p><p>力求言简意赅，通过入参、做了什么动作、返回哪些值。</p><figure><img src="https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202405211026412.jpg" alt="006r3PQBjw1fb5h84baewj306404lmx9" tabindex="0" loading="lazy"><figcaption>006r3PQBjw1fb5h84baewj306404lmx9</figcaption></figure><h3 id="_5-编写接口请求示例" tabindex="-1"><a class="header-anchor" href="#_5-编写接口请求示例"><span>5. 编写接口请求示例</span></a></h3><p>接口文档需要提供接口示例，接口实例是为了帮助调用者理解接口的使用方法和调用流程，快速开始调试程序。一般是 <code>CURL</code> 格式的示例。</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">curl</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> javapub.net.cn</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><figure><img src="https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202405211028827.jpeg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h3 id="_6-引入接口版本管理" tabindex="-1"><a class="header-anchor" href="#_6-引入接口版本管理"><span>6. 引入接口版本管理</span></a></h3><p>随着功能开发的日趋完善，可能对接口做出修改更新，例如添加、删除时变更参数，或者修改返回值的格式。这些新变更可能影响用户的 API 使用体验，造成现有客户端无法使用。</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">https://javapub.net.cn:8080/api/user/v1/queryById</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">https://javapub.net.cn:8080/api/user/v2/queryById</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202405211037091.jpeg" alt="56d7cbc6-0b2c-4a90-ac37-a8e65c040d47" tabindex="0" loading="lazy"><figcaption>56d7cbc6-0b2c-4a90-ac37-a8e65c040d47</figcaption></figure><h3 id="_7-维护接口文档版本更新" tabindex="-1"><a class="header-anchor" href="#_7-维护接口文档版本更新"><span>7. 维护接口文档版本更新</span></a></h3><p>如果接口发生了变更，接口文档也要做出相应调整，维护文档。比如<strong>错误码更新、参数类型变更</strong>等，要明确记录。</p><table><thead><tr><th>日期</th><th>变更内容</th><th>责任人</th></tr></thead><tbody><tr><td>2028-03-01</td><td>创建接口文档，定义基本数据结构。</td><td>JavaPub</td></tr><tr><td>2028-05-10</td><td>V2.0用户中心接口更新</td><td>王哥</td></tr></tbody></table><figure><img src="https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202405211033526.jpeg" alt="b4fe3684d20e97fa311ca213c8dc7ea9" tabindex="0" loading="lazy"><figcaption>b4fe3684d20e97fa311ca213c8dc7ea9</figcaption></figure><h3 id="_8-明确请求头有哪些" tabindex="-1"><a class="header-anchor" href="#_8-明确请求头有哪些"><span>8. 明确请求头有哪些</span></a></h3><p>接口文档，要写清楚请求头信息，比如：有权限校验的接口请求，在请求头中 <code>apiKey</code>。还有一些参数是 JSON 的，要设置 <code>application/json</code>。</p><ul><li>Accept：指定客户端能够接收的内容类型，如：<code>Accept: text/plain, text/html</code>。</li><li>Authorization：一般存放令牌信息，如：<code>Authorization: Basic QzPhZGRpbjpvcGVuIHNlc2FtZQ==</code></li><li>Cookie：存放 <code>Cookie</code> 信息。</li><li>User-Agent：指定客户端信息，作为服务端处理时定制化。</li><li>Accept-Encoding：指定客户端允许的数据压缩格式，如 <code>gzip、deflate</code> 等。</li></ul><figure><img src="https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202405211044984.png" alt="image-20240521104426851" tabindex="0" loading="lazy"><figcaption>image-20240521104426851</figcaption></figure><h3 id="_9-接口安全" tabindex="-1"><a class="header-anchor" href="#_9-接口安全"><span>9. 接口安全</span></a></h3><p>有些接口参数涉及到隐私和敏感数据、需要<strong>参数加密</strong>做好<strong>脱敏处理</strong>和说明。此外，还要做好<strong>接口授权访问，防止出现拖库、击穿</strong>等P0问题。</p><figure><img src="https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202405211046630.png" alt="image-20240521104647299" tabindex="0" loading="lazy"><figcaption>image-20240521104647299</figcaption></figure><h3 id="_10-接口测试" tabindex="-1"><a class="header-anchor" href="#_10-接口测试"><span>10. 接口测试</span></a></h3><p>在编写接口文档时，编写测试案例也要给出测试数据，包括请求参数和返回结果。让调用者有一个预期，节省沟通成本。</p><figure><img src="https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202405211050008.png" alt="image-20240521105043027" tabindex="0" loading="lazy"><figcaption>image-20240521105043027</figcaption></figure><h3 id="_11-定义错误码" tabindex="-1"><a class="header-anchor" href="#_11-定义错误码"><span>11. 定义错误码</span></a></h3><p>接口文档，一定要错误码，错误码作为程序重要的参考，让下游知道什么时候做什么动作。比如：当查询不到用户信息时，可以提示它跳转到注册页面。</p><table><thead><tr><th>错误码</th><th>名称</th><th>说明</th></tr></thead><tbody><tr><td>1001</td><td>参数错误</td><td>参数不合法</td></tr><tr><td>1002</td><td>数据库错误</td><td>数据库请求出错</td></tr></tbody></table><figure><img src="https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202405211049771.png" alt="image-20240521104901378" tabindex="0" loading="lazy"><figcaption>image-20240521104901378</figcaption></figure>`,50),o=[s];function c(p,l){return i(),e("div",null,o)}const d=a(n,[["render",c],["__file","interface_design_11.html.vue"]]),u=JSON.parse('{"path":"/posts/programming_standard/interface_design_11.html","title":"接口设计这11点要注意","lang":"zh-CN","frontmatter":{"title":"接口设计这11点要注意","icon":"lightbulb","author":"Wang Shiyu","date":"2022-07-04T00:00:00.000Z","category":["编程规范","接口"],"tag":["编程规范","接口"],"description":"标题： 接口设计这11点要注意 ｜ 接口设计军规 | 干了3年程序员，老板让我这样写接口 | 11条军规，让你的接口设计无可挑剔 covercover 作为后端工程师，多数情况都是给别人提供接口，写的好不好使你得重视起来。 74076262d8f14d5390e1ba557e0296a074076262d8f14d5390e1ba557e0296a0 ...","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/posts/programming_standard/interface_design_11.html"}],["meta",{"property":"og:site_name","content":"JavaPub"}],["meta",{"property":"og:title","content":"接口设计这11点要注意"}],["meta",{"property":"og:description","content":"标题： 接口设计这11点要注意 ｜ 接口设计军规 | 干了3年程序员，老板让我这样写接口 | 11条军规，让你的接口设计无可挑剔 covercover 作为后端工程师，多数情况都是给别人提供接口，写的好不好使你得重视起来。 74076262d8f14d5390e1ba557e0296a074076262d8f14d5390e1ba557e0296a0 ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202405211115020.jpg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-08T10:46:24.000Z"}],["meta",{"property":"article:author","content":"Wang Shiyu"}],["meta",{"property":"article:tag","content":"编程规范"}],["meta",{"property":"article:tag","content":"接口"}],["meta",{"property":"article:published_time","content":"2022-07-04T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-08T10:46:24.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"接口设计这11点要注意\\",\\"image\\":[\\"https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202405211115020.jpg\\",\\"https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202405171707202.jpeg\\",\\"https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202405211059259.png\\",\\"https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202405211017176.jpeg\\",\\"https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202405211023485.jpeg\\",\\"https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202405211025708.jpeg\\",\\"https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202405211026412.jpg\\",\\"https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202405211028827.jpeg\\",\\"https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202405211037091.jpeg\\",\\"https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202405211033526.jpeg\\",\\"https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202405211044984.png\\",\\"https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202405211046630.png\\",\\"https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202405211050008.png\\",\\"https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202405211049771.png\\"],\\"datePublished\\":\\"2022-07-04T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-08T10:46:24.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Wang Shiyu\\"}]}"]]},"headers":[{"level":3,"title":"1. 接口名称清晰、明确","slug":"_1-接口名称清晰、明确","link":"#_1-接口名称清晰、明确","children":[]},{"level":3,"title":"2. 接口路径规整","slug":"_2-接口路径规整","link":"#_2-接口路径规整","children":[]},{"level":3,"title":"3. 请求方式规范","slug":"_3-请求方式规范","link":"#_3-请求方式规范","children":[]},{"level":3,"title":"4. 接口详细说明","slug":"_4-接口详细说明","link":"#_4-接口详细说明","children":[]},{"level":3,"title":"5. 编写接口请求示例","slug":"_5-编写接口请求示例","link":"#_5-编写接口请求示例","children":[]},{"level":3,"title":"6. 引入接口版本管理","slug":"_6-引入接口版本管理","link":"#_6-引入接口版本管理","children":[]},{"level":3,"title":"7. 维护接口文档版本更新","slug":"_7-维护接口文档版本更新","link":"#_7-维护接口文档版本更新","children":[]},{"level":3,"title":"8. 明确请求头有哪些","slug":"_8-明确请求头有哪些","link":"#_8-明确请求头有哪些","children":[]},{"level":3,"title":"9. 接口安全","slug":"_9-接口安全","link":"#_9-接口安全","children":[]},{"level":3,"title":"10. 接口测试","slug":"_10-接口测试","link":"#_10-接口测试","children":[]},{"level":3,"title":"11. 定义错误码","slug":"_11-定义错误码","link":"#_11-定义错误码","children":[]}],"git":{"createdTime":1718348642000,"updatedTime":1720435584000,"contributors":[{"name":"wangshiyu","email":"iswangshiyu@foxmail.com","commits":2}]},"readingTime":{"minutes":4.67,"words":1400},"filePathRelative":"posts/programming_standard/interface_design_11.md","localizedDate":"2022年7月4日","excerpt":"<blockquote>\\n<p>标题： 接口设计这11点要注意 ｜ 接口设计军规 | 干了3年程序员，老板让我这样写接口 | 11条军规，让你的接口设计无可挑剔</p>\\n</blockquote>\\n<figure><img src=\\"https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202405211115020.jpg\\" alt=\\"cover\\" tabindex=\\"0\\" loading=\\"lazy\\"><figcaption>cover</figcaption></figure>\\n<p>作为后端工程师，多数情况都是给别人提供接口，写的好不好使你得重视起来。</p>","autoDesc":true}');export{d as comp,u as data};