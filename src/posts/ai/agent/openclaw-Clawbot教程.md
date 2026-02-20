---
title: openclaw-Clawbot教程
icon: lightbulb
author: Wang Shiyu
date: 2026-02-14
category:
  - clawbot
  - openclaw
tag:
  - clawbot
  - openclaw
---




## 前言

最新网址： `openclaw.ai`

## openclaw 名字历史

受到 Anthropic /ænˈθrɒpɪk/ 法务团队压力


Clawdbot 英/klɔː/ - Moltbot 英/məʊlt/ - OpenClaw


## 强大功能
·
- 对话聊天
- 定时任务
- 长期记忆
- 多模型统一调度
- 私有化部署

它不是聊天工具，是一个可持续运行的 AI 自动化中枢。


## 使用设备

Mac mini 




## 登录ChatGPT



## 连接WhatsApp

`https://web.whatsapp.com/`




## 连接飞书

```bash
openclaw plugins install @m1heng-clawd/feishu

openclaw config set channels.feishu.appId "YOU APP ID"

openclaw config set channels.feishu.appSecret "YOU APP Secret"

openclaw config set channels.feishu.enabled true

openclaw config set channels.feishu.connectionMode websocket

// 停止
openclaw gateway stop

// 启动
openclaw gateway
```

