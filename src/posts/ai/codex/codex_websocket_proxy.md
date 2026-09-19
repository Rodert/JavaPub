---
title: Codex WebSocket 反复重连怎么办？三种代理配置方案
icon: robot
date: 2026-09-19
description: Codex 出现 Reconnecting 1/5 等 WebSocket 重连提示时，可通过配置代理环境变量、改用 OpenAI HTTP 模式或开启 TUN 模式解决。本文说明三种方案的配置、原理和适用场景。
category:
  - AI
  - Codex
tag:
  - Codex
  - WebSocket
  - 代理
  - OpenAI
---

# Codex WebSocket 反复重连怎么办？三种代理配置方案

使用 Codex 时，如果持续看到下面的提示，通常意味着客户端无法稳定建立 WebSocket 连接：

```text
Reconnecting 1/5
Reconnecting 2/5
Reconnecting 3/5
Reconnecting 4/5
Reconnecting 5/5
```

这类问题多与网络链路或代理转发有关。下面按影响范围从小到大整理三种处理方式。

## 为什么 Codex 会使用 WebSocket？

OpenAI 的 [Responses WebSocket Mode 文档](https://developers.openai.com/api/docs/guides/websocket-mode?utm_source=chatgpt.com)说明，这种模式通过持续连接支持增量输入、并行流式响应，并降低 Agent 多轮工具调用的延迟。官方在包含 20 次以上工具调用的工作流中，观察到端到端执行速度最高约 40% 的提升。

公开资料可以确认，Codex 至少从 `0.106.0` 开始已经包含这套连接机制。

因此，优先目标不是关闭 WebSocket，而是让 Codex 能够通过正确的代理链路使用它。

## 方案一：为 Codex 单独配置代理环境变量

这是最推荐的方式。它不改变 Codex 的 WebSocket 工作方式，只是明确告诉 Codex 代理服务的位置。

Mac / Linux 配置文件：

```bash
~/.codex/.env
```

Windows 配置文件：

```text
C:\Users\你的用户名\.codex\.env
```

在文件中加入以下配置，并将端口替换为代理软件的实际端口：

```text
HTTP_PROXY="http://127.0.0.1:7890"
HTTPS_PROXY="http://127.0.0.1:7890"
ALL_PROXY="socks5://127.0.0.1:7891"
NO_PROXY="localhost,127.0.0.1,::1"
```

如果代理软件只提供一个 Mixed 或 HTTP 端口，也可以统一使用同一个端口：

```text
HTTP_PROXY=http://127.0.0.1:7890
HTTPS_PROXY=http://127.0.0.1:7890
ALL_PROXY=http://127.0.0.1:7890
NO_PROXY=localhost,127.0.0.1,::1
```

保存后，需要**彻底退出 Codex 并重新打开**，让应用重新读取环境变量。

连接链路如下：

```text
Codex
  ↓
读取 ~/.codex/.env
  ↓
代理
  ↓
WebSocket
  ↓
OpenAI
```

## 方案二：禁用 WebSocket，改走 HTTP

如果代理无法稳定转发 WebSocket，或者希望先恢复基本可用性，可以让 Codex 改走 HTTP / SSE。

Mac / Linux 修改：

```bash
~/.codex/config.toml
```

Windows 修改：

```text
C:\Users\你的用户名\.codex\config.toml
```

在顶层配置中增加：

```toml
model_provider = "openai_http"

[model_providers.openai_http]
name = "OpenAI HTTP only"
wire_api = "responses"
requires_openai_auth = true
supports_websockets = false
```

关键配置是：

```toml
supports_websockets = false
```

它会让 Codex 不再尝试 WebSocket，而是通过 HTTPS / SSE 调用 Responses API：

```text
Codex
  ↓
HTTPS / SSE
  ↓
Responses API
```

注意：`model_provider = "openai_http"` 必须位于正确的顶层位置，并且不能与已有的 `model_provider` 重复定义，否则 TOML 配置会报错。

## 方案三：在代理软件中开启 TUN 模式

如果不希望分别为应用配置代理，可以在 Clash、Mihomo、Surge 等代理软件中开启 TUN 模式。

普通系统代理的流量路径可能是：

```text
浏览器 → 代理 ✓
Codex → 不一定走代理 ✗
WebSocket → 可能不走代理 ✗
```

开启 TUN 后，代理会在系统网络层接管流量：

```text
           ┌→ 浏览器
系统流量 → TUN → Codex
           ├→ Terminal
           └→ WebSocket
```

这样 Codex 不需要单独读取 `HTTP_PROXY`，WebSocket 也更容易被代理接管。

但 TUN 会影响整个系统网络环境，可能波及本地开发服务、Docker、虚拟机、局域网设备、公司内网和 DNS。启用前应确认代理规则和绕过规则正确。

## 方案四：让 Codex 自动检测并写入代理端口

如果不想手动寻找本地 HTTP 代理端口，可以把下面这段提示词直接发给 Codex。它会检测当前代理端口，创建或更新 `~/.codex/.env`，并且只维护 `HTTP_PROXY` 与 `HTTPS_PROXY` 两项配置。

```text
检查一下我电脑当前使用的 HTTP 代理本地端口号，然后创建 ~/.codex/.env 文件，并写入以下两个环境变量：
HTTP_PROXY=http://127.0.0.1:<检测到的端口号>
HTTPS_PROXY=http://127.0.0.1:<检测到的端口号>
请注意：
自动获取当前代理端口，不要让我手动填写。
如果 ~/.codex 目录不存在，请先创建。
如果 .env 文件已存在，请保留原有内容，只新增或更新这两个变量，避免重复写入。
变量名是 HTTPS_PROXY，不是 HTPPS_PROXY。
完成后输出检测到的端口号，并展示最终写入的两行配置。
```

运行完成后，彻底退出并重新打开 Codex，使新的环境变量生效。

## 如何选择？

1. 优先使用方案一：只影响 Codex，最容易排查和回退。
2. 方案一无效时使用方案二：牺牲 WebSocket 的连接方式，换取更稳定的 HTTP 链路。
3. 只有需要统一接管系统流量时再使用方案三：配置最少，但影响范围最大。
4. 希望由 Codex 自动写入 HTTP 代理配置时使用方案四：适合已有本地代理、但不确定端口的场景。

如果配置后仍持续重连，先检查代理端口是否正在监听，再确认代理规则允许访问 OpenAI 域名。
