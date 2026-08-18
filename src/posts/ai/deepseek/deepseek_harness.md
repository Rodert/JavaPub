---
title: DeepSeek Harness 实测：大模型为什么还需要 Harness？
icon: robot
author: Wang Shiyu
date: 2026-08-18
description: 实测 DeepSeek Harness 的安装、Agent 编程能力、任务完成质量、Token 消耗与插件生态，并与 GPT / Codex 进行对比。
category:
  - deepseek
  - ai
  - agent
  - harness
tag:
  - deepseek
  - ai
  - agent
  - harness
  - codex
  - claude-code
---

# DeepSeek Harness 实测：大模型为什么还需要 Harness？

最近 DeepSeek 推出了 DeepSeek Harness。类似的 AI 编程和 Agent 工具还有 Codex、Claude Code、Pi、OpenHarness、OpenCode、Cline 等。

很多人可能会问：大模型本身已经足够强了，为什么还需要一个 Harness？

我这次没有停留在 Hello World，而是从安装开始，实际测试了三个任务：

1. 生成一个幸存者类小游戏
2. 生成一个俄罗斯方块
3. 生成一个“梁子滑动变阻器”网页

同时，我把相同或相近的任务交给 GPT / Codex 做对比，记录完成时间、Token 消耗、实际费用和最终效果，最后再看 DeepSeek Harness 的插件生态。

官方地址：<https://www.deepseek.com/harness/>

![DeepSeek Harness](/assets/deepseek-harness/cover.png)

## 一、Harness 解决了什么问题？

普通聊天助手通常是：

```text
用户提问
↓
模型回答
↓
结束
```

而 Agent 工具需要让模型真正参与一个完整的执行流程：

```text
用户给出目标
↓
模型分析任务
↓
调用工具
↓
读取执行结果
↓
修改文件或执行命令
↓
运行项目并测试
↓
发现问题后继续修改
```

可以把大模型理解成“大脑”，把 Harness 理解成让大脑拥有“手和脚”的运行环境。它负责提供文件读写、终端命令、脚本执行、浏览器操作和工具调用等能力，并把每一步的结果重新交给模型判断。

以前我们问 AI：

> 这段代码应该怎么改？

模型给出建议后，还需要我们自己找到文件、完成修改、运行项目并检查结果。现在更理想的方式是让 Agent 直接完成这些动作，遇到错误后继续修复。

这正是普通聊天助手和 Agent 的主要区别。

## 二、安装 DeepSeek Harness

![DeepSeek Harness 安装页面](/assets/deepseek-harness/install.png)

我使用的是一台 16GB 内存的 Mac mini。DeepSeek Harness 官方提供了通过 NPX 运行的方式，因此需要先准备 Node.js 和 NPX。

### 1. 准备 Node.js 和 NPX

安装 Node.js 后，先检查 NPX 是否可用：

```bash
npx -v
```

我这次测试得到的版本是 `11.17.0`。不同机器的版本可能不同，能够正常输出版本号即可。

Mac 用户可以通过 Homebrew 安装 Node.js，Windows 用户可以直接从 Node.js 官网下载安装包。安装命令以 DeepSeek Harness 官方页面的最新说明为准。

### 2. 启动 Harness

回到官方页面，复制当前的启动命令并执行。第一次运行时，NPX 可能会询问是否安装相关软件包，确认安装即可。

如果安装过程长时间卡住或依赖下载失败，通常与网络、代理或 NPM Registry 有关。可以切换到可用的镜像源后重试：

```bash
npm config set registry <你的 NPM 镜像地址>
```

启动成功后，终端会返回一个本地地址。把这个地址复制到浏览器中打开即可。

### 3. 配置 API Key

第一次进入页面时，需要配置 DeepSeek API Key。可以在 DeepSeek 开放平台创建一个新的 Key，再粘贴到 Harness 页面中。

API Key 属于敏感凭证，不要提交到 Git 仓库，也不要直接发布在文章或截图中。

如果页面显示的是 `127.0.0.1`，说明服务默认只监听本机，其他设备无法直接访问。

整个安装流程可以概括为：

1. 安装 Node.js / NPX
2. 启动 DeepSeek Harness
3. 配置 DeepSeek API Key

## 三、第一次使用

进入 DeepSeek Harness 后，需要先选择一个工作目录。Agent 创建、读取和修改的项目文件，都会集中在这个目录里。

进入工作区后，可以看到模型和推理等级等选项。这次测试主要使用 DeepSeek V4 Flash 和 DeepSeek V4 Pro。

先发送一条简单消息：

```text
hi
```

模型能够正常响应后，就说明一个可以读取文件、修改代码和执行命令的 DeepSeek Agent 已经运行起来了。

有趣的是，安装 Harness 这件事本身也可以交给其他 Agent。把官方地址或安装说明交给 Codex、Claude Code 等工具，然后告诉它：

> 帮我安装 DeepSeek Harness。

让一个 Agent 安装另一个 Agent，正在逐渐变成 AI 编程工具的常见使用方式。

## 四、第一轮测试：幸存者类小游戏

![幸存者类小游戏测试](/assets/deepseek-harness/survivor-game.png)

第一个任务不是 Hello World，也不是 Todo List，而是生成一个类似 Vampire Survivors 的极简网页版幸存者游戏。

我希望它从一句自然语言需求开始，自己创建文件、编写代码、组织游戏逻辑，最后给出一个可以打开运行的网页游戏。

这次使用 DeepSeek V4 Flash。任务开始后，Harness 会分析需求、创建项目并写入代码。

本轮结果：

| 指标 | 结果 |
| --- | --- |
| 完成时间 | 约 3 分 08 秒 |
| 输入 Token | 约 243K |
| 输出 Token | 约 29K |
| 最终结果 | 可以运行 |

最终代码直接写入 HTML 文件。打开后，游戏具备角色、敌人、血量、升级和能力强化等基本机制，游戏结束后也可以重新开始。

视觉效果目前只能算 Demo，人物和敌人主要由方块、三角形、圆点等基础图形组成。不过从“几分钟内根据自然语言生成一个真正能玩的网页小游戏”这个目标来看，DeepSeek V4 Flash 的表现是合格的。

### 与 GPT / Codex 对比

我把相同需求交给 GPT / Codex，并将推理强度调高。

这一轮 GPT / Codex 的完成时间约为 2 分 35 秒，同样生成了一个可以运行的网页小游戏，还给它起名为“暮色幸存者”。两边最终完成度接近，也都使用了基础图形表现人物和敌人。

至少在这一轮测试里，DeepSeek V4 Flash 和 GPT 的差距并不明显，可以看作基本打平。

## 五、第二轮测试：俄罗斯方块

第二个任务是实现俄罗斯方块。这次 DeepSeek 使用 V4 Pro。

DeepSeek 这一轮的速度非常快：

| 指标 | 结果 |
| --- | --- |
| 完成时间 | 约 1 分 52 秒 |
| 页面状态 | 可以打开 |
| 基础操作 | 方向键可以控制，方块形态可以切换 |
| 核心问题 | 方块不会自动下落 |

页面、方块和控制逻辑都有了，但最核心的自动下落逻辑没有实现。因此这一轮的结论是：做出来了，但没有完全做对。

这个问题也说明，Agent 说“任务已完成”并不代表最终结果没有 Bug。代码必须真正运行起来，核心流程也需要人工验证。

### GPT / Codex 的俄罗斯方块

GPT / Codex 这一轮明显慢很多。执行过程中出现过一次中断，我让它继续后，它完成了写代码、运行命令、打开浏览器、测试页面和根据结果修改代码等流程。

最终耗时约 18 分 13 秒，但俄罗斯方块可以正常自动下落，核心逻辑更加完整。

这一轮形成了一个很有意思的对比：

| 工具 | 完成时间 | 最终结果 |
| --- | ---: | --- |
| DeepSeek Harness | 1 分 52 秒 | 很快，但核心逻辑有 Bug |
| GPT / Codex | 18 分 13 秒 | 较慢，但结果更加完整 |

因此，比较 Agent 不能只看谁先生成代码，至少还应该关注：

- 完成时间
- 最终质量
- Token 消耗
- 实际费用
- 是否一次完成

这次 GPT / Codex 使用的是中转 API，算力和上游状态也会影响执行速度。18 分 13 秒只代表本次测试，不代表每次都会这么慢。

## 六、第三轮测试：梁子滑动变阻器

前两个任务都有相对明确的游戏规则，第三个任务则更偏向网络梗网页：通过拖动滑块，让人物从“小梁子”逐渐发生变化。

这类任务不只是写代码，还需要理解想要模仿的视觉效果和交互方式。

DeepSeek 继续使用 V4 Pro，最终耗时约 3 分 24 秒。“小梁子”“老梁”等状态基本做了出来，整体复刻效果不错。

GPT / Codex 这一轮等待约 5 分钟后，最终提示无法打开页面。在这一次具体测试中，DeepSeek 成功，GPT / Codex 失败。

当然，一次任务不能证明某个模型绝对更强。它只能说明 Agent 的真实体验并不完全等于模型排行榜上的分数。

任务规划、文件操作、浏览器能力、工具调用、执行稳定性和失败恢复能力，都会影响最后能不能真正把事情做完。

## 七、为什么需要 Harness？

把这几轮测试放在一起，就能回答文章开头的问题。

模型负责判断：

> 下一步应该做什么？

Harness 负责把判断执行出来：

```text
找到文件
↓
打开文件
↓
修改代码
↓
执行项目
↓
读取报错
↓
继续修改
↓
打开浏览器
↓
验证结果
```

在测试中，DeepSeek Harness 会进入 Think 阶段，然后不断创建文件、读取文件和执行命令。有些网页任务还会通过 `curl` 获取资源。

GPT / Codex 也会调用浏览器、Skill 和其他工具。它们的共同点是：模型不再只是输出一段答案，而是可以在一个工作目录里持续行动。

所以，模型能力强，并不等于 Agent 任务一定完成得好。模型、Harness 和工具链需要共同工作。

![常见 AI 编程 Harness](/assets/deepseek-harness/harness-home.png)

## 八、Agent 任务到底贵不贵？

这次测试时，DeepSeek 后台显示的实际消费大致如下：

| 测试任务 | 模型 | 本次实际费用 |
| --- | --- | ---: |
| 幸存者类小游戏 | V4 Flash | 约 0.36 元 |
| 俄罗斯方块 | V4 Pro | 约 0.37 元 |
| 梁子滑动变阻器 | V4 Pro | 约 1.2 元 |

这些是录制测试时后台显示的实际消费，不代表长期固定价格，具体计费应该以 DeepSeek 官方最新说明为准。

普通请求只调用一次模型，但一个 Agent 任务可能经历多轮调用：

```text
理解任务
↓
决定创建哪些文件
↓
执行工具
↓
读取结果
↓
遇到报错后重新请求模型
↓
打开浏览器测试
↓
继续修改
```

因此，单看“每百万 Token 多少钱”并不能说明一个 Agent 到底贵不贵。更有意义的比较方式是记录一次完整任务的总成本：

| 指标 | GPT / Codex | DeepSeek Harness |
| --- | ---: | ---: |
| 输入 Token | 实测 | 实测 |
| 输出 Token | 实测 | 实测 |
| Cache Token | 实测 | 实测 |
| 完成时间 | 实测 | 实测 |
| API 总费用 | 实测 | 实测 |
| 是否一次完成 | 是 / 否 | 是 / 否 |
| 最终效果 | 实际评价 | 实际评价 |

Token 单价便宜的模型，如果任务需要反复重试，最终未必便宜；Token 单价更高的模型，如果一次就把任务完成，也可能更划算。

## 九、DeepSeek Harness 的插件生态

![DeepSeek Harness 插件生态](/assets/deepseek-harness/plugin-ecosystem.png)

我觉得 DeepSeek Harness 最有意思的部分之一，是围绕它逐渐出现的插件和周边项目。有人把这种发展形容为“一切皆插件”。

Harness 提供的是 Agent 基础能力，社区则在上面叠加文件引用、多模态、数据库、设计画布、长期记忆、插件市场、侧边栏、TUI、桌面端和主题等功能。

下面是本次整理到的项目：

### 1. 文件引用：dsh-at-file

项目地址：<https://github.com/omdsh-dev/dsh-at-file>

这个插件为 DeepSeek Harness 增加 `@文件` 能力。在输入框中输入 `@` 后，可以引用本地 PDF、Word、PPT、图片和代码文件，使用体验接近给聊天助手上传文件。

### 2. 多模态图片识别：dsh-vision-toolkit

项目地址：<https://github.com/Anionex/dsh-vision-toolkit>

它为 Harness 增加图片识别和视觉能力，可以处理 UI 截图、报错截图、网页截图和设计稿。

### 3. Data Agent：dsh-data-agent

项目地址：<https://github.com/omdsh-dev/dsh-data-agent>

这个项目把 Agent 和数据库连接起来。用户可以直接提出“统计最近 30 天每天的订单量和销售额”等需求，再让 Agent 负责查询和分析。

### 4. Agent 设计画布：dsh-openpencil

项目地址：<https://github.com/ZSeven-W/dsh-openpencil>

它把 Agent 和设计画布结合起来，让 Harness 不只服务于程序员，也能进入设计、产品和原型工作流。

### 5. 多 Agent 长期记忆：dsh-mnemon

项目地址：<https://github.com/omdsh-dev/dsh-mnemon>

Agent 的一个明显问题是记忆。不同会话之间未必能完整保留上下文，如果多个 Agent 长期参与同一个项目，长期记忆会变得非常重要。

### 6. 插件市场：dsh-market

项目地址：<https://github.com/dsh-market/dsh-market>

插件数量增加后，普通用户不可能每天去 GitHub 搜索项目。插件市场可以集中解决插件发现、安装和管理问题。

### 7. 侧边栏工作台：DSH Better Sidebar

项目地址：<https://github.com/omdsh-dev/DSH-better-sidebar>

这个项目主要增强 UI 和工作区。对于每天使用 Agent 的人来说，工作区是否顺手会直接影响效率。

### 8. TUI：dsh-TUI

项目地址：<https://github.com/ccch1mneyyy/dsh-TUI>

它将 DeepSeek Harness 做成 TUI。习惯 Claude Code、Codex CLI 等终端工作方式的用户，可能会更喜欢这种交互。

### 9. 桌面端：DeepSeek Harness Desktop

项目地址：<https://github.com/anywhere-labs/deepseek-harness-desktop>

不喜欢终端的用户可以选择桌面端，以传统软件的方式使用 DeepSeek Harness。

### 10. TUI + Desktop + Web：oh-dsh

项目地址：<https://github.com/hust-open-atom-club/oh-dsh>

这个项目尝试同时覆盖 TUI、Desktop 和 Web。它也说明底层 Agent 能力和外部交互界面可以分离，同一套能力可以对应不同的产品形态。

### 11. Deep Whale

项目地址：<https://github.com/Small-tailqwq/dsh-deep-whale>

有人做功能，有人做多模态、数据库、桌面端和 TUI，也有人专门做主题和皮肤。Deep Whale 就属于后者。

当一个项目周围同时出现底层扩展、插件、UI、桌面端和 TUI 时，它已经开始从单个工具发展为一个生态。

## 十、实际安装一个插件：文件引用

最后实际安装 `dsh-at-file`：

<https://github.com/omdsh-dev/dsh-at-file>

传统安装一个 GitHub 项目通常需要打开 README、阅读文档、复制命令、安装依赖，再处理过程中遇到的报错。现在也可以直接把项目地址交给 Agent：

> 帮我安装这个插件。

让 Agent 自己阅读 README、执行命令和修改配置。

这次安装文件引用插件大约用了三分多钟。安装完成后，按照提示重新启动 DeepSeek Harness 并刷新页面，在输入框中输入 `@`，就可以选择本地文件。

这样，PDF、Word、PPT、图片和代码文件都可以直接作为上下文交给 Agent。

这形成了一个有意思的循环：我们正在用 Agent 增强 Agent 自己。以后安装 Skill、插件、MCP，甚至安装另一个 Agent，可能都不需要手动完成每一步。

## 十一、总结：模型是大脑，Harness 是手和脚

为什么需要 Codex、Claude Code、OpenCode、Cline 和 DeepSeek Harness？

因为模型强，不等于 Agent 强。

一个大模型可以很聪明，但如果它只能在聊天框里告诉你：

> 这个文件应该这样修改。

那它本质上还是一个对话助手。

有了 Harness 以后，它可以直接找到文件、修改代码、执行项目、读取报错、继续修复，再打开浏览器验证结果。AI 也就从“告诉你怎么做”，开始变成“帮你把事情做完”。

未来 AI 的竞争可能不只是单个模型的 Benchmark，而是下面这整套组合：

```text
模型 + Harness + Tool + Skill + Plugin + Memory + MCP + 生态
```

这次测试并不能证明 DeepSeek 每个任务都比 GPT 强。俄罗斯方块这一轮，GPT / Codex 的最终完成度就更高；DeepSeek 也会出现“任务说完成了，但实际还有 Bug”的情况。

但它至少展示了一个趋势：国产模型正在快速补齐模型之外的 Agent 工具链，社区也在不断贡献文件引用、多模态、数据库、设计画布、长期记忆、插件市场、TUI、桌面端和主题等扩展。

DeepSeek Harness 不只是一个“DeepSeek 版 Claude Code”，更像一个可以持续叠加能力的 Agent 底座。如果你正在研究 Claude Code、Codex、OpenCode 或其他 AI Agent，值得亲自安装体验一次。

毕竟，看再多 Benchmark，都不如真正让 Agent 帮你完成一次工作。

我是王仕宇，JavaPub。

我们下期见。
