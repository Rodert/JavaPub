---
title: 用 Gemini + VS Code 打造属于你的 AI 编程神器
icon: lightbulb
author: Wang Shiyu
date: 2025-02-08
category:
  - gemini
  - ai
  - vscode
tag:
  - gemini
  - ai
  - vscode
  - cursor
  - 编程助手
---

> 用 Gemini + VS Code 打造属于你的 AI 编程神器（完胜 Cursor！）
> 每天可以使用高达 1000 次请求，完全免费！

[视频](https://space.bilibili.com/404747369) | [Gemini 官网](https://aistudio.google.com/) | [VS Code 官网](https://code.visualstudio.com/)

## 前言

最近很多朋友问我，Cursor + Claude 是不是最强 AI 编程组合？确实，现在主流的 AI 编程软件中，Cursor 加 Claude Cloud 可以说是"王者中的王炸"。

但问题也很现实——**太贵了！**

对于刚入门的开发者、小白甚至学生党来说，这个价格实在是一个不小的负担。

今天，我就教大家一招：**用 Gemini + VS Code，打造自己的 AI 编程助手**。每天可以使用高达 1000 次请求，完全够你工作 + 学习使用，而且——**完全免费！**

最后，我还会分享一个 Cursor 系统级提示词（System Prompt），让你的 VS Code 也能拥有 Cursor 一样的智能感知与编程体验。

## 一、Cursor 的定价为什么"劝退"？

先看一下 Cursor 的价格结构：

| 版本 | 每月价格 | 每日使用次数（约） | 模型支持 |
|------|---------|------------------|---------|
| 免费版 | $0 | 很少 | GPT-3.5 / Claude 3 Haiku |
| Pro | $20 | 约 700 次 | GPT-4 + Claude 3 Sonnet |
| Pro+ | $70 | 约 2000 次 | 高级模型支持 |
| Ultra | $400 | 约 4500 次 | Claude 3 Opus + GPT-4 Turbo |

换算一下：一个 Pro 用户每月 20 美元（约 140 元人民币），每天平均只能使用 20 多次。对于我们这种经常靠 AI 辅助编程的开发者来说，这远远不够用。

更重要的是，Cursor 还会对 **token 上限** 做限制。很多人做商业项目时，一次性消耗几十万 token，不小心第二天银行卡就"爆单"。

## 二、免费替代方案：Gemini + VS Code

现在我们来看这位"平价王者"——**Google Gemini**。

在 Gemini 官方 GitHub 上，我们能看到它给出了详细的使用说明和调用限制：

✅ **免费额度：**
- 每分钟 60 次调用
- 每天最多 1000 次调用

对于日常开发者来说，完全够用！而且，如果你用完额度，还可以注册新的 Google 账号，继续使用。

**Gemini Pro 2.5** 还提供了 **100 万 token** 的上下文窗口，这意味着你可以直接把整个项目丢进去，它都能完整理解！

最关键的是：💡 **无需付费，无需订阅，只需一个 Google 账号即可使用。**

## 三、在 VS Code 中整合 Gemini

下面是完整步骤，让你 5 分钟完成集成👇

### 第一步：安装 VS Code

到 [VS Code 官网](https://code.visualstudio.com/) 下载适合自己系统的版本（Windows / macOS / Linux 均可）。安装完成后，打开 VS Code。

### 第二步：安装插件「Roll Code」

1. 点击左侧「扩展」图标，在搜索框输入 **Roll Code**
2. 图标是一个蓝色的"代数"符号
3. 点击安装后，侧边栏会出现一个新的图标「Roll Code」

### 第三步：配置 Gemini API

1. 打开「Roll Code」的齿轮图标 ⚙️
2. 在供应商选项中选择 **Google Gemini**
3. 前往 [Google AI Studio](https://aistudio.google.com/)
4. 点击 **Get API Key** → **Create Key**
5. 复制生成的 API Key，粘贴回 VS Code
6. 点击「保存」即可完成配置 ✅

## 四、优化 Roll Code 的 AI 使用体验

在设置中建议开启以下选项：

- **语言**：选择"简体中文"
- **自动批准操作**：打开（创建文件、写文件、运行命令时无需确认）
- **上下文页数**：拉满（获得更完整的理解能力）
- **子任务与重试**：全部启用（提高任务成功率）

配置完成后，你的 VS Code 就能像 Cursor 一样——在编程时主动补全、生成代码、优化逻辑、做代码审查。

## 五、实际效果演示

我这里用自己做的一个开源项目 —— **Golang Consoles** 做演示。

1. 打开项目后，AI 会自动识别项目结构
2. 它会提出几个优化建议
3. 我让它执行"全面代码审查"
4. 它自动生成了一个 6 项的审查计划（to-do list）
5. 一键批准后，AI 开始静态分析

期间如果遇到 **"Too Many Requests"** 错误，只需：

打开设置 → 找到「上下文页数」→ 拉满 → 保存 → 重试

免费用户可以放心使用到上限，不怕花钱。但如果是付费 API，一定要控制好每次任务的 token 消耗，否则可能一夜爆单 😅

## 六、进阶：用 Cursor 的系统级提示词强化你的 Gemini

我最后分享一个"压轴好东西"—— **Cursor 官方使用的系统级提示词 System Prompt**。

这个开源项目整合了几乎所有主流 AI 编程工具的系统提示，包括：

- Claude / Cloud Code
- Cursor
- ByteDance CodeAI
- Wind Server Code
- CuteCoder 等等

你可以把这些提示词粘贴到 Gemini 里，让它"学会"更专业的对话规范和开发逻辑。

这些提示词主要包括：

- 身份与目标设定
- 沟通规则
- 工具调用策略
- 代码修改规则
- 上下文信息结构
- 用户请求识别

简单来说，就是给 AI 套上一个"专业紧箍咒"——让它高效、可预测、符合开发者思维。

## 七、总结：打造属于你的 AI 编程助手

- ✅ Cursor 太贵？Gemini 免费！
- ✅ VS Code + Roll Code = AI 编程神器
- ✅ 每天 1000 次调用 足够你写项目、做实验
- ✅ 系统级提示词 让你的 AI 更懂你

如果你也想用 AI 辅助开发，或者自己构建 AI 工具链，记得关注我，我会持续分享：

- ✅ AI 编程技巧
- ✅ AI 使用边界与伦理
- ✅ 最新 AI 工具实测

让我们一起，用 AI 改变编程的方式！

## 视频教程

[离线下载观看](https://pan.baidu.com/s/1QZSdRU6PW81WHTHY4-QikA?pwd=yud4)

通过网盘分享的文件：用 Gemini + VS Code 打造属于你的 AI 编程神器.mp4等2个文件

链接: https://pan.baidu.com/s/1QZSdRU6PW81WHTHY4-QikA?pwd=yud4 提取码: yud4

## 参考资源

- [Google AI Studio](https://aistudio.google.com/)
- [VS Code 官网](https://code.visualstudio.com/)
- [Roll Code 插件](https://marketplace.visualstudio.com/items?itemName=rollcode.rollcode)
- [GitHub 学习教程](https://github.com/)

## 附录

以下是一些付费项，丰简由人、公共区域还是会分享干货。

如果不懂 GitHub，不妨跟着这门 **从0到精通学习GitHub** ⬇️

如果对 AI 编程感兴趣，可以加入知识星球。加入第三天送 Google Gemini 账号，Cursor Pro 体验账号，进入 AI 编程问答群等。

---

原文： [https://javapub.net.cn/posts/ai/gemini/](https://javapub.net.cn/posts/ai/gemini/)

