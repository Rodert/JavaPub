---
title: 基本命令
icon: keyboard
order: 1
---

# 基本命令

这一页只整理 Codex CLI 的高频命令，先满足日常使用。

## 查看版本

```bash
codex --version
```

用于确认 Codex 是否安装成功，以及当前版本号。

## 查看帮助

```bash
codex --help
```

查看 Codex 支持的参数和子命令。遇到命令不确定时，先看这个。

## 在当前项目启动

```bash
codex
```

建议在项目根目录执行。Codex 会以当前目录作为工作区，读取代码、执行命令和修改文件。

## 带着任务启动

```bash
codex "帮我阅读这个项目，并总结启动方式"
```

适合一开始就给 Codex 一个明确任务。

## 指定工作目录

```bash
codex --cd /path/to/project
```

当你不在项目目录里时，可以用 `--cd` 指定 Codex 的工作目录。

## 指定模型

```bash
codex --model <model-name>
```

模型名称以你当前账号和 Codex 支持的实际列表为准。如果不确定，可以先不指定，让 Codex 使用默认模型。

## 登录与退出

```bash
codex login
```

```bash
codex logout
```

`login` 用于管理登录状态，`logout` 用于移除本地保存的认证信息。

## 恢复上次会话

```bash
codex resume
```

如果你中断过一次 Codex 会话，可以用这个命令从历史会话中选择恢复。

恢复最近一次会话：

```bash
codex resume --last
```

## 非交互执行

```bash
codex exec "检查当前项目是否有明显的构建配置问题"
```

`exec` 适合一次性任务，比如检查、总结、生成报告。它不会进入完整的交互界面。

## 代码审查

```bash
codex review --uncommitted
```

用于让 Codex 对当前未提交改动做代码审查。提交前可以先运行一次，重点看风险、回归和缺少验证的地方。

如果只想自定义审查要求，可以加一段提示：

```bash
codex review --uncommitted "重点检查路由、构建配置和无关改动"
```

## 更新 Codex

```bash
codex update
```

也可以使用 npm 重新安装最新版：

```bash
npm install -g @openai/codex@latest
```

## 常用组合

进入项目后启动：

```bash
cd your-project
codex
```

让 Codex 先了解项目：

```bash
codex "先阅读项目结构，告诉我这是一个什么项目，启动和构建命令是什么"
```

让 Codex 做提交前检查：

```bash
codex review --uncommitted
```

王仕宇建议初学者先熟悉这几个命令：`codex`、`codex --help`、`codex exec`、`codex review`、`codex resume`。这些已经能覆盖大部分日常协作场景。
