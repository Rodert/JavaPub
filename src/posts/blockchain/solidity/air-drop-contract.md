---
title: 空投合约
icon: lightbulb
author: Wang Shiyu
date: 2024-07-23
category:
  - 区块链
  - soldity
  - 空投
  - 智能合约
tag:
  - 区块链
  - soldity
  - 空投
  - 智能合约
---




> 关于 solidity、空投、智能合约

空投作为区块链行业最大的惊喜之一，很多人都是通过空投才接触到了这一领域。

甚至有很多专业薅空投羊毛的专业玩家。行业内有句话，小薅养活妻儿、大薅...

[toc]

## 前言

今天我们一块来看看



## 空投到底是什么

简单来说，空投就是一种营销策略，希望将大家留在这个玩法中，有人气了就有共识，有共识就有价值。

这里会涉及到一些运营的知识，为了用户有参与感，会让他们做一些任务、比如邀请、签到、分享等等，主要为了裂变、奖励机制、社区建设。总的来说，这个玩法从诞生起就很适合传播。

## 空投什么？

以太坊为例。

空投一般会是 ERC20 代币、或者是 ERC721 NFT 居多。


## 空投合约代码

空投合约代码分为很多种，这主要基于产品设计的方案。下面分析一种比较常见的方式：



**需求：** 当用户符合我设置的条件，点击领取就可以获取到对应空投。


### 空投步骤

1. 部署合约

项目方部署空投合约，将打算发放空投的代币转入空投合约地址。

2. 设置条件

合约中设置条件，比如用户持有一定数量的某种代币，或者完成某个任务（比如完成任务后的用户地址里有某个 NFT）。

3. 自动分发

满足条件，自动发送代币到用户地址。


### 代码解析

```sol
//  SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AirdropContract {
    address public owner;
    mapping(address => bool) public claimed;
    uint public totalClaimed;
    uint public totalSupply;

    constructor(uint _totalSupply) {
        owner = msg.sender;
        totalSupply = _totalSupply;
    }

    function claim() public {
        require(!claimed[msg.sender], "Already claimed");
        require(totalClaimed < totalSupply, "Airdrop finished");
        
        uint amount = 100; // 每个用户可以领取的代币数量
        require(totalClaimed + amount <= totalSupply, "Not enough tokens");

        claimed[msg.sender] = true;
        totalClaimed += amount;
        payable(msg.sender).transfer(amount * 1 ether); // 假设代币是以太币
    }

    function finish() public {
        require(msg.sender == owner, "Only owner can finish airdrop");
        require(totalClaimed < totalSupply, "Airdrop finished");

        payable(owner).transfer(address(this).balance);
    }
}

```


### 代码详解

如果你了解其他的编程语言，看 solidity 就会感觉很谨慎，这也是这门语言的特点，不要放过任何一个你模凌两可的点。


```sol
// 代码开源协议，不写也行，但是目前多数编辑器会强制让写
//  SPDX-License-Identifier: MIT
// solidity 版本，表示支持 0.8.0 及以上版本
pragma solidity ^0.8.0;

// 合约名
contract AirdropContract {
	// owner 一般存储合约的所有者地址，可以看到他的类型是 address
    address public owner;
	// 就和Java中map一样，这用于存储已经领取过空投的代币地址
    mapping(address => bool) public claimed;
    // 存储已领取代币数
    uint public totalClaimed;
    // 存储总代币数
    uint public totalSupply;

	// 构造函数，也就是合约初始化时调用的函数，这里指定了空投合约拥有者地址和发型代币总数
    constructor(uint _totalSupply) {
        owner = msg.sender;
        totalSupply = _totalSupply;
    }

	// 领取代币的函数
    function claim() public {
    	// 判断是否领取过
        require(!claimed[msg.sender], "Already claimed");
        // 判断被领取的代币是否超过总的额度，
        require(totalClaimed < totalSupply, "Airdrop finished");
        
        uint amount = 100; // 每个用户可以领取的代币数量
        // 再加一次校验，防止领超
        require(totalClaimed + amount <= totalSupply, "Not enough tokens");

		// 写入去重map，防止重复领取
        claimed[msg.sender] = true;
        // 累加被领取的代币总和
        totalClaimed += amount;
        // 将空投代币发送到制定地址
        payable(msg.sender).transfer(amount * 1 ether); // 假设代币是以太币
    }

	// 当活动结束有些代币可能未被领取，由 owner 可以领取回
    function finish() public {
		// require 就是断言的作用，如果前面的判断为 True 就通过，否则中断并打印后面的说明
        require(msg.sender == owner, "Only owner can finish airdrop");
        require(totalClaimed < totalSupply, "Airdrop finished");

        payable(owner).transfer(address(this).balance);
    }
}
```



