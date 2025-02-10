---
title: DeepSeek接入IDEA
icon: lightbulb
author: Wang Shiyu
date: 2025-02-10
category:
  - deepseek
  - ai
  - idea
tag:
  - deepseek
  - ai
  - idea
---


> DeepSeek接入IDEA

这篇文章介绍如何将 IDE 集成 DeepSeek，这里以 Java 作常用的编辑器 IDEA 为例。

这里推荐使用更通用、且更简单的插件方式 Continue。

IDEA 有版本要求，太低的版本是无法使用的，建议使用较新版本。

⚠️注意：DeepSeek 最近由于众所周知的原因，性能不稳定，这个插件也提供了接入本地 Ollama+DeepSeek 的方式。



### 通过 Continue 插件接入 DeepSeek

Continue 是一款开源的 AI 辅助编程插件，适用于 IntelliJ IDEA 等 JetBrains IDE。通过自然语言和他交互来提升开发效率，为开发者提供实时代码生成、问题解决、单元测试生成等功能。


#### 安装 Continue 插件

在 IntelliJ IDEA 中，通过 **Settings > Plugins** 

搜索 “Continue”，点击安装（Install）并重启 IDE。

![image-20250210153749378](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202502101537490.png)



#### 配置 DeepSeek

IDEA 右侧便可以看到 Continue 的图标，选择添加 DeepSeek 模型和 DeepSeek Coder，再填写 DeepSeek API Key。

![image-20250210154013201](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202502101540336.png)


#### DeepSeek API Key 从哪儿获取

在 DeepSeek 官网 API 开发平台中自行创建，地址：

**https://platform.deepseek.com/api_keys**

![image-20250210154213374](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202502101542437.png)



### 代码编写

写一段简单代码

![image-20250210154542831](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202502101545001.png)

![image-20250210154600455](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202502101546859.png)

使用官方 API 可能不太稳定，总是掉线。也可以使用 Ollama 接入。


### 接入本地 DeepSeek

本地部署 Ollama+DeepSeek 文档视频教程。

**https://javapub.net.cn/posts/ai/ollama/ollama_deepseek_mac.html**


本地启动 Ollama 后，可以用插件连接了。

![image-20250210155338362](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202502101553210.png)

