import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,e as i}from"./app-BjojdNjp.js";const e={},l=i(`<blockquote><p>关于 solidity、空投、智能合约</p></blockquote><p>空投作为区块链行业最大的惊喜之一，很多人都是通过空投才接触到了这一领域。</p><p>甚至有很多专业薅空投羊毛的专业玩家。行业内有句话，小薅养活妻儿、大薅...</p><p>[toc]</p><h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言"><span>前言</span></a></h2><p>今天我们一块来看看</p><h2 id="空投到底是什么" tabindex="-1"><a class="header-anchor" href="#空投到底是什么"><span>空投到底是什么</span></a></h2><p>简单来说，空投就是一种营销策略，希望将大家留在这个玩法中，有人气了就有共识，有共识就有价值。</p><p>这里会涉及到一些运营的知识，为了用户有参与感，会让他们做一些任务、比如邀请、签到、分享等等，主要为了裂变、奖励机制、社区建设。总的来说，这个玩法从诞生起就很适合传播。</p><h2 id="空投什么" tabindex="-1"><a class="header-anchor" href="#空投什么"><span>空投什么？</span></a></h2><p>以太坊为例。</p><p>空投一般会是 ERC20 代币、或者是 ERC721 NFT 居多。</p><h2 id="空投合约代码" tabindex="-1"><a class="header-anchor" href="#空投合约代码"><span>空投合约代码</span></a></h2><p>空投合约代码分为很多种，这主要基于产品设计的方案。下面分析一种比较常见的方式：</p><p><strong>需求：</strong> 当用户符合我设置的条件，点击领取就可以获取到对应空投。</p><h3 id="空投步骤" tabindex="-1"><a class="header-anchor" href="#空投步骤"><span>空投步骤</span></a></h3><ol><li>部署合约</li></ol><p>项目方部署空投合约，将打算发放空投的代币转入空投合约地址。</p><ol start="2"><li>设置条件</li></ol><p>合约中设置条件，比如用户持有一定数量的某种代币，或者完成某个任务（比如完成任务后的用户地址里有某个 NFT）。</p><ol start="3"><li>自动分发</li></ol><p>满足条件，自动发送代币到用户地址。</p><h3 id="代码解析" tabindex="-1"><a class="header-anchor" href="#代码解析"><span>代码解析</span></a></h3><div class="language-sol line-numbers-mode" data-highlighter="shiki" data-ext="sol" data-title="sol" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>//  SPDX-License-Identifier: MIT</span></span>
<span class="line"><span>pragma solidity ^0.8.0;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>contract AirdropContract {</span></span>
<span class="line"><span>    address public owner;</span></span>
<span class="line"><span>    mapping(address =&gt; bool) public claimed;</span></span>
<span class="line"><span>    uint public totalClaimed;</span></span>
<span class="line"><span>    uint public totalSupply;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    constructor(uint _totalSupply) {</span></span>
<span class="line"><span>        owner = msg.sender;</span></span>
<span class="line"><span>        totalSupply = _totalSupply;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    function claim() public {</span></span>
<span class="line"><span>        require(!claimed[msg.sender], &quot;Already claimed&quot;);</span></span>
<span class="line"><span>        require(totalClaimed &lt; totalSupply, &quot;Airdrop finished&quot;);</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        uint amount = 100; // 每个用户可以领取的代币数量</span></span>
<span class="line"><span>        require(totalClaimed + amount &lt;= totalSupply, &quot;Not enough tokens&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        claimed[msg.sender] = true;</span></span>
<span class="line"><span>        totalClaimed += amount;</span></span>
<span class="line"><span>        payable(msg.sender).transfer(amount * 1 ether); // 假设代币是以太币</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    function finish() public {</span></span>
<span class="line"><span>        require(msg.sender == owner, &quot;Only owner can finish airdrop&quot;);</span></span>
<span class="line"><span>        require(totalClaimed &lt; totalSupply, &quot;Airdrop finished&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        payable(owner).transfer(address(this).balance);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="代码详解" tabindex="-1"><a class="header-anchor" href="#代码详解"><span>代码详解</span></a></h3><p>如果你了解其他的编程语言，看 solidity 就会感觉很谨慎，这也是这门语言的特点，不要放过任何一个你模凌两可的点。</p><div class="language-sol line-numbers-mode" data-highlighter="shiki" data-ext="sol" data-title="sol" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>// 代码开源协议，不写也行，但是目前多数编辑器会强制让写</span></span>
<span class="line"><span>//  SPDX-License-Identifier: MIT</span></span>
<span class="line"><span>// solidity 版本，表示支持 0.8.0 及以上版本</span></span>
<span class="line"><span>pragma solidity ^0.8.0;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 合约名</span></span>
<span class="line"><span>contract AirdropContract {</span></span>
<span class="line"><span>	// owner 一般存储合约的所有者地址，可以看到他的类型是 address</span></span>
<span class="line"><span>    address public owner;</span></span>
<span class="line"><span>	// 就和Java中map一样，这用于存储已经领取过空投的代币地址</span></span>
<span class="line"><span>    mapping(address =&gt; bool) public claimed;</span></span>
<span class="line"><span>    // 存储已领取代币数</span></span>
<span class="line"><span>    uint public totalClaimed;</span></span>
<span class="line"><span>    // 存储总代币数</span></span>
<span class="line"><span>    uint public totalSupply;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// 构造函数，也就是合约初始化时调用的函数，这里指定了空投合约拥有者地址和发型代币总数</span></span>
<span class="line"><span>    constructor(uint _totalSupply) {</span></span>
<span class="line"><span>        owner = msg.sender;</span></span>
<span class="line"><span>        totalSupply = _totalSupply;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// 领取代币的函数</span></span>
<span class="line"><span>    function claim() public {</span></span>
<span class="line"><span>    	// 判断是否领取过</span></span>
<span class="line"><span>        require(!claimed[msg.sender], &quot;Already claimed&quot;);</span></span>
<span class="line"><span>        // 判断被领取的代币是否超过总的额度，</span></span>
<span class="line"><span>        require(totalClaimed &lt; totalSupply, &quot;Airdrop finished&quot;);</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        uint amount = 100; // 每个用户可以领取的代币数量</span></span>
<span class="line"><span>        // 再加一次校验，防止领超</span></span>
<span class="line"><span>        require(totalClaimed + amount &lt;= totalSupply, &quot;Not enough tokens&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>		// 写入去重map，防止重复领取</span></span>
<span class="line"><span>        claimed[msg.sender] = true;</span></span>
<span class="line"><span>        // 累加被领取的代币总和</span></span>
<span class="line"><span>        totalClaimed += amount;</span></span>
<span class="line"><span>        // 将空投代币发送到制定地址</span></span>
<span class="line"><span>        payable(msg.sender).transfer(amount * 1 ether); // 假设代币是以太币</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// 当活动结束有些代币可能未被领取，由 owner 可以领取回</span></span>
<span class="line"><span>    function finish() public {</span></span>
<span class="line"><span>		// require 就是断言的作用，如果前面的判断为 True 就通过，否则中断并打印后面的说明</span></span>
<span class="line"><span>        require(msg.sender == owner, &quot;Only owner can finish airdrop&quot;);</span></span>
<span class="line"><span>        require(totalClaimed &lt; totalSupply, &quot;Airdrop finished&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        payable(owner).transfer(address(this).balance);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,27),p=[l];function t(d,c){return a(),s("div",null,p)}const u=n(e,[["render",t],["__file","air_drop_contract.html.vue"]]),v=JSON.parse('{"path":"/posts/blockchain/solidity/air_drop_contract.html","title":"空投合约","lang":"zh-CN","frontmatter":{"title":"空投合约","icon":"lightbulb","author":"Wang Shiyu","date":"2024-07-23T00:00:00.000Z","category":["区块链","soldity","空投","智能合约"],"tag":["区块链","soldity","空投","智能合约"],"description":"关于 solidity、空投、智能合约 空投作为区块链行业最大的惊喜之一，很多人都是通过空投才接触到了这一领域。 甚至有很多专业薅空投羊毛的专业玩家。行业内有句话，小薅养活妻儿、大薅... [toc] 前言 今天我们一块来看看 空投到底是什么 简单来说，空投就是一种营销策略，希望将大家留在这个玩法中，有人气了就有共识，有共识就有价值。 这里会涉及到一些...","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/posts/blockchain/solidity/air_drop_contract.html"}],["meta",{"property":"og:site_name","content":"JavaPub"}],["meta",{"property":"og:title","content":"空投合约"}],["meta",{"property":"og:description","content":"关于 solidity、空投、智能合约 空投作为区块链行业最大的惊喜之一，很多人都是通过空投才接触到了这一领域。 甚至有很多专业薅空投羊毛的专业玩家。行业内有句话，小薅养活妻儿、大薅... [toc] 前言 今天我们一块来看看 空投到底是什么 简单来说，空投就是一种营销策略，希望将大家留在这个玩法中，有人气了就有共识，有共识就有价值。 这里会涉及到一些..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-08-09T01:57:51.000Z"}],["meta",{"property":"article:author","content":"Wang Shiyu"}],["meta",{"property":"article:tag","content":"区块链"}],["meta",{"property":"article:tag","content":"soldity"}],["meta",{"property":"article:tag","content":"空投"}],["meta",{"property":"article:tag","content":"智能合约"}],["meta",{"property":"article:published_time","content":"2024-07-23T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-08-09T01:57:51.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"空投合约\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-23T00:00:00.000Z\\",\\"dateModified\\":\\"2024-08-09T01:57:51.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Wang Shiyu\\"}]}"]]},"headers":[{"level":2,"title":"前言","slug":"前言","link":"#前言","children":[]},{"level":2,"title":"空投到底是什么","slug":"空投到底是什么","link":"#空投到底是什么","children":[]},{"level":2,"title":"空投什么？","slug":"空投什么","link":"#空投什么","children":[]},{"level":2,"title":"空投合约代码","slug":"空投合约代码","link":"#空投合约代码","children":[{"level":3,"title":"空投步骤","slug":"空投步骤","link":"#空投步骤","children":[]},{"level":3,"title":"代码解析","slug":"代码解析","link":"#代码解析","children":[]},{"level":3,"title":"代码详解","slug":"代码详解","link":"#代码详解","children":[]}]}],"git":{"createdTime":1721737716000,"updatedTime":1723168671000,"contributors":[{"name":"wangshiyu","email":"iswangshiyu@foxmail.com","commits":1}]},"readingTime":{"minutes":3.35,"words":1005},"filePathRelative":"posts/blockchain/solidity/air_drop_contract.md","localizedDate":"2024年7月23日","excerpt":"<blockquote>\\n<p>关于 solidity、空投、智能合约</p>\\n</blockquote>\\n<p>空投作为区块链行业最大的惊喜之一，很多人都是通过空投才接触到了这一领域。</p>\\n<p>甚至有很多专业薅空投羊毛的专业玩家。行业内有句话，小薅养活妻儿、大薅...</p>\\n<p>[toc]</p>\\n<h2>前言</h2>\\n<p>今天我们一块来看看</p>\\n<h2>空投到底是什么</h2>\\n<p>简单来说，空投就是一种营销策略，希望将大家留在这个玩法中，有人气了就有共识，有共识就有价值。</p>\\n<p>这里会涉及到一些运营的知识，为了用户有参与感，会让他们做一些任务、比如邀请、签到、分享等等，主要为了裂变、奖励机制、社区建设。总的来说，这个玩法从诞生起就很适合传播。</p>","autoDesc":true}');export{u as comp,v as data};
