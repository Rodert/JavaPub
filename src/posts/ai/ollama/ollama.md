---
title: ollama本地调用大模型
icon: lightbulb
author: Wang Shiyu
date: 2022-07-04
category:
  - ollama
  - ai
tag:
  - ollama
  - ai
  - llama3
  - chatgpt
---




> 大语言模型，ollama轻松打造本地LLM应用
> 普通人如何快速搭建本地大语言模型


视频： [https://space.bilibili.com/404747369](https://space.bilibili.com/404747369)

官网： [https://ollama.com/](https://ollama.com/) ｜ [https://github.com/ollama/ollama](https://github.com/ollama/ollama)


<iframe src="//player.bilibili.com/player.html?isOutside=true&aid=1806178648&bvid=BV18b421E7Wu&cid=1611201303&p=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>


**建议环境&配置** 大于 `4c8g`


# ollama

## 认识 ollama

Ollama 是一个开源大语言模型工具，帮助用户快速在本地搭建运行大模型。支持一系列著名的模型。如Llama2、Mistral、Gemma，极大的简化了安装和配置的细节。


## 搭建

根据不同操作系统，选择对应的安装包进行安装： https://ollama.com/download

### Linux 为例

一键安装

```bash
curl -fsSL https://ollama.com/install.sh | sh
```

加载 llama3 模型

```bash
ollama run llama3
```

查询模型安装是否成功

```bash
ollama list
```


## 测试

ollama 默认启动的端口是：11434

```bash
curl http://127.0.0.1:11434/

# Ollama is running
```


### 调用llama3试用

测试响应

```bash
curl http://localhost:11434/api/generate -d '{
  "model": "llama3",
  "prompt":"你知道 JavaPub 吗？"
}'
```

与模型对话

```bash
curl http://localhost:11434/api/chat -d '{
  "model": "llama3",
  "messages": [
    { "role": "user", "content": "你知道 JavaPub 吗？" }
  ]
}'
```



# webui

## 前言

首先安装 docker

## 搭建

推荐使用: [https://github.com/open-webui/open-webui](https://github.com/open-webui/open-webui)

ollama 我已经单独安装，现在只需要安装 webui。

```bash
docker run -d -p 3000:8080 --add-host=host.docker.internal:host-gateway -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:main
```

默认端口是 3000，`http://127.0.0.1:3000`

![image-](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202407081509663.png)

第一次进来没有账户，点击 Create 创建，第一个新创建的账户拥有管理员权限。

接下来登陆进来，就可以使用了。

![image](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202407081511790.png)









TODO

[ ] 搭建 llama3 模型，并调用成功
[ ] 整合 go 语言，实现 api 调用
[ ] 流式回复


以 llama3 为例： https://ollama.com/library/llama3




参考：
- https://zhuanlan.zhihu.com/p/694843237
- https://blog.csdn.net/tirestay/article/details/139744309
- https://blog.csdn.net/qq_40999403/article/details/139320266
- 视频参考： https://www.bilibili.com/video/av1903594994/?vd_source=f2a0231e07e27f42fa11f05024479cb8
- 



## 附录

- 支持模型列表： https://ollama.com/library
- 中文参考文档： https://ollama.fan/reference/api/#generate-a-completion-request-streaming
- webui: https://github.com/open-webui/open-webui




原文： [https://javapub.net.cn/posts/ai/](https://javapub.net.cn/posts/ai/)





