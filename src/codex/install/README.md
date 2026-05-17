---
title: 安装 Codex
icon: download
order: 2
---

# 安装 Codex

Codex 是 OpenAI 的编程助手，可以在终端、IDE、桌面端和云端使用。本文先整理最常用的本地安装方式，建议优先使用官方方案；如果你的网络或账号环境不方便，再谨慎参考第三方中转方案。

开始之前，先准备一个可用的 ChatGPT 账号或 OpenAI API Key。第一次启动 Codex 时，会提示你登录 ChatGPT 账号，或者按你的使用方式配置 API Key。

## 方式一：npm 安装

这是 Codex CLI 最通用的安装方式，适合 macOS、Windows 和 Linux 用户。

npm 是 Node.js 自带的包管理工具。可以简单理解为：npm 专门用来安装 JavaScript / Node.js 生态里的命令行工具，Codex CLI 就可以通过 npm 安装。

如果你是一台刚买的新电脑，大概率还没有 Node.js 和 npm。先打开 Node.js 官网：

[https://nodejs.org/](https://nodejs.org/)

进入官网后，下载推荐的 LTS 版本。LTS 是长期维护版，更适合新手和日常开发使用。npm 会跟着 Node.js 一起安装，不需要单独安装。

Codex 官方没有单独要求 npm 的最低版本。对新手来说，不用纠结 npm 版本，直接安装 Node.js 官网推荐的 LTS 版本即可。

安装完成后，重新打开终端，检查 Node.js 和 npm 是否安装成功：

```bash
node -v
npm -v
```

如果能看到版本号，比如 `v22.x.x`、`10.x.x`，就说明安装成功了。

然后安装 Codex CLI：

```bash
npm i -g @openai/codex
```

安装完成后查看版本：

```bash
codex --version
```

进入你的项目目录，启动 Codex：

```bash
cd your-project
codex
```

如果后续需要升级到最新版，可以执行：

```bash
npm i -g @openai/codex@latest
```

## 方式二：Homebrew 安装

macOS 用户也可以使用 Homebrew：

```bash
brew install codex
```

安装后同样使用：

```bash
codex
```

## 方式三：IDE 扩展

如果你平时用 VS Code、Cursor、Windsurf 或 JetBrains IDE 写代码，可以安装 Codex 插件版。插件版的好处是：你不用离开编辑器，就能让 Codex 看当前项目、解释代码、修改文件、审查改动。

### VS Code 如何安装 Codex 插件

先安装 VS Code：

[https://code.visualstudio.com/](https://code.visualstudio.com/)

安装完成后，打开 VS Code。左侧有一排图标，其中有一个像“四个小方块”的图标，这个就是插件商店，也叫 Extensions。

也可以用快捷键打开插件商店：

- Windows / Linux：`Ctrl + Shift + X`
- macOS：`Command + Shift + X`

打开插件商店后，在搜索框输入：

```text
Codex
```

找到名称为 `Codex - OpenAI's coding agent`、发布者为 `OpenAI` 的插件，然后点击 `Install` 安装。

也可以直接打开 VS Code 插件商店页面：

[https://marketplace.visualstudio.com/items?itemName=OpenAI.chatgpt](https://marketplace.visualstudio.com/items?itemName=OpenAI.chatgpt)

安装完成后，VS Code 侧边栏会出现 Codex 入口。官方文档说明，Codex 在 VS Code 里默认会出现在右侧边栏；如果你没有马上看到，可以重启一下 VS Code。

第一次打开 Codex 插件时，按提示使用 ChatGPT 账号或 OpenAI API Key 登录。登录后，先打开一个项目文件夹，再让 Codex 读取和修改当前项目。

### Cursor、Windsurf 和 JetBrains

Cursor、Windsurf 属于 VS Code 兼容编辑器，一般也可以从它们自己的插件入口搜索 `Codex` 安装。

JetBrains IDE 包括 IntelliJ IDEA、PyCharm、WebStorm 等。JetBrains 用户建议直接看官方入口：

[https://developers.openai.com/codex/ide/](https://developers.openai.com/codex/ide/)

## 方式四：桌面端

如果你不想在终端里输入命令，也不想依赖某一个编辑器，可以安装 Codex 桌面端。桌面端更像一个独立软件，适合同时管理多个项目、多个任务。

官方桌面端目前提供 macOS 和 Windows 版本：

[https://developers.openai.com/codex/app/](https://developers.openai.com/codex/app/)

进入页面后，按你的电脑系统选择下载：

- Apple Silicon Mac：一般是 M1、M2、M3、M4 芯片的 Mac。
- Intel Mac：较早的 Intel 芯片 Mac。
- Windows：Windows 电脑选择 Windows 版本。

安装完成后，打开 Codex，按提示登录 ChatGPT 账号或 OpenAI API Key。

桌面端的基本使用流程是：

1. 打开 Codex。
2. 选择一个项目文件夹。
3. 确认使用本地模式，也就是让 Codex 在你的电脑上操作这个项目。
4. 输入你的第一个问题，比如：`先阅读这个项目，告诉我它是做什么的，不要修改文件`。

如果你只是刚开始学习，建议优先使用 VS Code 插件版，因为它和代码编辑器在一起，能边看代码边问 Codex。等你熟悉之后，再尝试桌面端管理更复杂的任务。

## 方式五：云端使用

如果你希望把任务交给云端环境运行，可以访问 Codex 云端入口，并按提示连接 GitHub 仓库、配置环境、启动任务。

云端方式更适合耗时较长的代码任务。本地 CLI 或 IDE 扩展更适合日常边写边改。

## ChongPlus 参考方案

ChongPlus 的 Codex 教程提供的是另一套接入方式，适合需要通过第三方 API Key 或中转配置使用的读者。大致流程是：

1. 注册 ChongPlus 账号。
2. 购买并兑换余额。
3. 安装 `cc-switch`。
4. 安装 Codex。
5. 创建 API Key，并导入到 `cc-switch`。
6. 在项目目录初始化后开始使用。

这类方案涉及账号、余额、兑换码和第三方 Key 管理。使用前建议先确认服务来源、费用规则和密钥安全。不要把任何 API Key 写进代码仓库，也不要截图公开包含密钥的终端或配置文件。

## 安装后快速验证

安装完成后，可以按下面顺序检查：

```bash
codex --version
codex
```

在项目目录里启动后，可以先让 Codex 做一个只读任务：

```bash
codex "先阅读这个项目，告诉我启动命令和目录结构，不要修改文件"
```

确认回答正常后，再让它执行修 Bug、补文档、加功能这类任务。

参考地址：

- [OpenAI Codex GitHub](https://github.com/openai/codex)
- [OpenAI Codex Quickstart](https://developers.openai.com/codex/quickstart/)
- [OpenAI Codex CLI](https://developers.openai.com/codex/cli/)
- [OpenAI Codex IDE extension](https://developers.openai.com/codex/ide/)
- [OpenAI Codex App](https://developers.openai.com/codex/app/)
- [ChongPlus Codex 教程](https://docs.chongplus.plus/codex)
