---
title: 安装 Codex
icon: download
order: 2
---

# 安装 Codex

Codex 可以通过官方方式安装，也可以参考第三方中转服务的配置方式。建议优先使用官方方案；如果你的网络或账号环境不方便，再参考 ChongPlus 方案。

## 方式一：npm 安装

这是官方推荐的 Codex CLI 安装方式之一，适合习惯在终端里工作的开发者。

先确认本机已经安装 Node.js 和 npm：

```bash
node -v
npm -v
```

然后安装 Codex CLI：

```bash
npm install -g @openai/codex
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

第一次启动时，按提示登录 ChatGPT 账号，或者根据你的使用方式配置 API Key。

## 方式二：Homebrew 安装

macOS 用户也可以使用 Homebrew：

```bash
brew install --cask codex
```

安装后同样使用：

```bash
codex
```

## 方式三：IDE 或桌面端

如果你主要在 VS Code、Cursor、Windsurf 里写代码，可以安装 Codex 的 IDE 扩展。

如果你希望使用桌面应用，可以运行：

```bash
codex app
```

也可以访问 Codex App 页面进行安装。

## ChongPlus 参考方案

ChongPlus 的 Codex 教程提供的是另一套接入方式，适合需要通过第三方 API Key 或中转配置使用的读者。它的大致流程是：

1. 注册 ChongPlus 账号。
2. 购买并兑换余额。
3. 安装 `cc-switch`。
4. 安装 Codex。
5. 创建 API Key，并导入到 `cc-switch`。
6. 在项目目录初始化后开始使用。

这类方案涉及账号、余额、兑换码和第三方 Key 管理。使用前建议你先确认服务来源、费用规则和密钥安全，不要把重要密钥提交到代码仓库。

参考地址：

- [OpenAI Codex GitHub](https://github.com/openai/codex)
- [OpenAI Codex 文档](https://developers.openai.com/codex)
- [ChongPlus Codex 教程](https://docs.chongplus.plus/codex)
