---
title: LangChain 零基础入门指南
icon: lightbulb
author: Wang Shiyu
date: 2022-07-04
category:
  - langchain
  - ai
tag:
  - langchain
  - ai
  - chatgpt
---


# LangChain 零基础入门指南

我将练习的代码案例放在仓库：https://github.com/Rodert/langchain-Demo

## 什么是 LangChain？

LangChain 是一个开源框架，旨在简化使用大语言模型(LLMs)构建应用程序的过程。它提供了一套工具和组件，让开发者能够更容易地将语言模型与外部数据源和环境连接起来，创建更实用、更智能的应用。

## 为什么要学习 LangChain？

- **简化开发流程**：不必从零开始构建与 LLM 的交互
- **增强 LLM 能力**：让语言模型能够访问外部数据和工具
- **构建实用应用**：创建聊天机器人、文档问答系统、数据分析助手等

## 使用本地 Ollama 模型与商业 API 的对比

### Ollama 本地模型 vs ChatGPT/DeepSeek 商业 API

在使用 LangChain 时，你可以选择本地部署的 Ollama 模型或商业 API 如 OpenAI 的 ChatGPT、DeepSeek 等。以下是它们的主要区别：

#### 1. 部署方式

- **Ollama**：
  - 完全本地部署，无需网络连接
  - 一次性下载模型，后续无需联网
  - 数据隐私更有保障，所有计算在本地完成

- **ChatGPT/DeepSeek**：
  - 通过 API 调用云端服务
  - 需要稳定的网络连接
  - 数据传输至服务提供商的服务器处理

#### 2. 性能与资源需求

- **Ollama**：
  - 性能受限于本地硬件（CPU/GPU/RAM）
  - 大模型需要强大的计算资源
  - 小型模型（3B-7B参数）在普通机器上可运行
  - 首次运行需要下载模型（几GB至几十GB）

- **ChatGPT/DeepSeek**：
  - 性能稳定，不受本地硬件限制
  - 可以访问最先进的大型模型
  - 资源消耗小，主要是网络带宽

#### 3. 成本对比

- **Ollama**：
  - 一次性硬件投资，后续使用免费
  - 无使用次数限制
  - 适合频繁调用场景

- **ChatGPT/DeepSeek**：
  - 按调用次数或token数量收费
  - 大量使用可能成本较高
  - 通常有免费额度或试用期

#### 4. 响应质量

- **Ollama**：
  - 开源模型质量可能略逊于顶级商业模型
  - 但最新的开源模型（如Llama 3、Mistral）质量已经很高
  - 可以微调适应特定领域

- **ChatGPT/DeepSeek**：
  - 通常提供最先进的模型性能
  - 响应质量更一致
  - 更新更及时

#### 5. 在 LangChain 中的使用区别

```python
# 使用 Ollama
from langchain_ollama import OllamaLLM

# 查看您已经下载的模型，并使用其中一个
# 例如使用 "mistral" 或其他已下载的模型
llm = OllamaLLM(model="llama3:latest")  # 或者其他已下载的模型名称

# 发送简单请求
response = llm.invoke("你好，请介绍一下自己")

print(response)

# 使用 OpenAI (ChatGPT)
from langchain_openai import ChatOpenAI

openai_llm = ChatOpenAI(model="gpt-3.5-turbo", api_key="你的API密钥")
response = openai_llm.invoke("介绍一下人工智能")

# 使用 DeepSeek
from langchain_deepseek import DeepSeekChatAPI

deepseek_llm = DeepSeekChatAPI(api_key="你的DeepSeek API密钥")
response = deepseek_llm.invoke("介绍一下人工智能")
```

![image-20250330171634026](https://javapub-common-oss.oss-cn-beijing.aliyuncs.com/javapub/202503301716806.png)

#### 6. 适用场景

- **Ollama 适合**：
  - 本地开发和测试
  - 对数据隐私有严格要求的应用
  - 预算有限但需要大量调用的场景
  - 离线环境

- **ChatGPT/DeepSeek 适合**：
  - 需要最高质量响应的生产环境
  - 硬件资源有限的设备
  - 对延迟要求较高的应用
  - 需要特定专业领域知识的场景

### 两者结合的混合策略

在实际开发中，一个好的策略是结合使用两种方式：

1. 开发阶段使用 Ollama 本地模型进行免费、快速的迭代
2. 生产环境或对质量要求高的场景使用商业 API
3. 针对不同的请求类型选择不同的模型提供者

LangChain 的优势在于它提供了统一的抽象层，让你可以轻松地在不同模型之间切换，而无需大幅修改代码。

## 平缓学习路径

### 第一阶段：基础概念（1-2周）

1. **了解大语言模型 (LLMs)**
   - 什么是大语言模型
   - 常见模型：GPT-4、Claude、Llama等
   - 基本概念：token、提示词(prompt)、温度(temperature)

2. **安装与配置**
   ```bash
   # 安装基本版本
   pip install langchain
   
   # 根据需求安装特定集成
   pip install langchain-openai  # 如需使用OpenAI模型
   pip install langchain-ollama  # 如需使用本地Ollama模型
   ```

3. **第一个简单示例**
   ```python
   # 使用OpenAI API的示例
   from langchain_openai import ChatOpenAI
   
   # 初始化一个简单的语言模型
   chat = ChatOpenAI()
   
   # 发送一个简单的请求
   response = chat.invoke("你好，请介绍一下自己")
   
   print(response.content)
   ```

   ```python
   # 使用本地Ollama的示例
   from langchain_ollama import OllamaLLM
   
   # 初始化本地模型
   # 确保先运行 ollama pull llama2 下载模型
   llm = OllamaLLM(model="llama2")
   
   # 发送一个简单的请求
   response = llm.invoke("你好，请介绍一下自己")
   
   print(response)
   ```

### 第二阶段：核心组件（2-3周）

1. **模型 (Models)**
   - 学习如何使用不同的语言模型
   - 调整参数(temperature, max_tokens等)
   
   ```python
   from langchain_ollama import OllamaLLM
   
   # 创建一个基本的Ollama模型实例
   llm = OllamaLLM(model="llama2")
   
   # 创建一个更有创意的模型实例
   creative_llm = OllamaLLM(
       model="llama2",
       temperature=0.8,  # 较高的温度产生更多样化的回答
       num_predict=500   # 在Ollama中控制生成的token数量
   )
   
   # 可以尝试不同的开源模型
   mistral_llm = OllamaLLM(model="mistral")
   gemma_llm = OllamaLLM(model="gemma:2b")
   ```

2. **提示模板 (Prompts)**
   - 学习如何创建和使用提示模板
   
   ```python
   from langchain.prompts import ChatPromptTemplate
   from langchain_ollama import OllamaLLM
   from langchain_core.messages import HumanMessage
   
   # 初始化Ollama模型
   llm = OllamaLLM(model="llama3:latest")  # 使用您已下载的模型
   
   # 方法1: 使用 ChatPromptTemplate 生成消息列表
   template = ChatPromptTemplate.from_messages([
       ("system", "你是一名{role}专家。"),
       ("human", "请回答以下问题：{question}")
   ])
   
   # 填充模板生成消息列表
   messages = template.format_messages(
       role="Python编程", 
       question="如何使用列表推导式？"
   )
   
   # 使用消息列表生成回答
   response = llm.invoke(messages)
   print("方法1结果:")
   print(response)
   print("\n" + "-"*50 + "\n")
   
   # 方法2: 直接使用字符串提示
   simple_prompt = "请用中文解释Python列表推导式，并给出三个例子。"
   response2 = llm.invoke(simple_prompt)
   print("方法2结果:")
   print(response2)
   ```

### 第三阶段：实用功能（3-4周）

1. **链 (Chains)**
   - 将多个组件连接起来形成处理流程
   
   ```python
   from langchain.chains import LLMChain
   from langchain_ollama import OllamaLLM
   from langchain.prompts import ChatPromptTemplate
   
   # 创建提示模板
   template = ChatPromptTemplate.from_template(
       "为{product}写一个简短的广告语。"
   )
   
   # 初始化语言模型
   llm = OllamaLLM(model="llama2")
   
   # 创建链
   chain = LLMChain(llm=llm, prompt=template)
   
   # 运行链
   result = chain.invoke({"product": "智能手机"})
   print(result["text"])
   ```

2. **内存 (Memory)**
   - 让应用记住对话历史
   
   ```python
   from langchain.memory import ConversationBufferMemory
   from langchain.chains import ConversationChain
   from langchain_ollama import OllamaLLM
   
   # 初始化模型
   llm = OllamaLLM(model="llama2")
   
   # 创建一个简单的记忆组件
   memory = ConversationBufferMemory()
   
   # 创建一个带记忆的对话链
   conversation = ConversationChain(
       llm=llm, 
       memory=memory,
       verbose=True  # 输出整个过程
   )
   
   # 进行对话
   response1 = conversation.invoke({"input": "你好，我叫王小明"})
   print(response1["response"])
   
   # 模型会记住上下文
   response2 = conversation.invoke({"input": "你还记得我的名字吗？"})
   print(response2["response"])
   ```

案例：

```python
'''
Author: javapub iswangshiyu@foxmail.com
Date: 2025-03-30 18:00:00
LastEditors: javapub iswangshiyu@foxmail.com
LastEditTime: 2025-03-30 17:30:14
FilePath: /langchain-Demo/chains_demo.py
Description: LangChain 链示例
'''
from langchain.chains import LLMChain, SimpleSequentialChain, SequentialChain
from langchain.prompts import PromptTemplate
from langchain_ollama import OllamaLLM
from langchain_core.output_parsers import StrOutputParser

def simple_llm_chain():
    """简单的LLM链示例"""
    print("=== 简单的LLM链 ===\n")
    
    # 初始化LLM
    llm = OllamaLLM(model="llama3:latest")
    
    # 创建提示模板
    template = PromptTemplate.from_template(
        "请为一家销售{product}的公司起一个创意名称。"
    )
    
    # 创建链
    chain = LLMChain(llm=llm, prompt=template)
    
    # 运行链
    result = chain.invoke({"product": "智能家居设备"})
    
    print("链的输出:")
    print(result["text"])  # LLMChain返回一个包含"text"键的字典
    print("\n" + "-"*50 + "\n")

def sequential_chain():
    """顺序链示例 - 一个链的输出作为下一个链的输入"""
    print("=== 顺序链 ===\n")
    
    # 初始化LLM
    llm = OllamaLLM(model="llama3:latest")
    
    # 第一个链：生成公司名称
    name_template = PromptTemplate.from_template(
        "请为一家销售{product}的公司起一个创意名称。只需要提供名称，不要其他解释。"
    )
    name_chain = LLMChain(llm=llm, prompt=name_template, output_key="company_name")
    
    # 第二个链：基于公司名称生成口号
    slogan_template = PromptTemplate.from_template(
        '请为名为"{company_name}"的公司创作一个吸引人的中文广告口号。这家公司销售{product}。'
    )
    slogan_chain = LLMChain(llm=llm, prompt=slogan_template, output_key="slogan")
    
    # 创建顺序链
    overall_chain = SequentialChain(
        chains=[name_chain, slogan_chain],
        input_variables=["product"],
        output_variables=["company_name", "slogan"]
    )
    
    # 运行链
    result = overall_chain.invoke({"product": "智能健康监测设备"})
    
    print("顺序链输出:")
    print(f"公司名称: {result['company_name']}")
    print(f"广告口号: {result['slogan']}")
    print("\n" + "-"*50 + "\n")

def simple_sequential_chain():
    """简单顺序链示例 - 每个链只有一个输入和一个输出"""
    print("=== 简单顺序链 ===\n")
    
    # 初始化LLM
    llm = OllamaLLM(model="llama3:latest")
    
    # 第一个链：生成故事主题
    theme_template = PromptTemplate.from_template(
        "请生成一个有趣的儿童故事主题。只需要提供主题，不要开始讲故事。"
    )
    theme_chain = LLMChain(llm=llm, prompt=theme_template)
    
    # 第二个链：基于主题生成故事
    story_template = PromptTemplate.from_template(
        "请基于以下主题，用中文写一个简短的儿童故事：\n\n{text}\n\n故事应该有教育意义且适合5-8岁的孩子。"
    )
    story_chain = LLMChain(llm=llm, prompt=story_template)
    
    # 创建简单顺序链
    overall_chain = SimpleSequentialChain(chains=[theme_chain, story_chain])
    
    # 运行链
    result = overall_chain.invoke({"input": "我需要一个儿童故事"})
    
    print("简单顺序链输出:")
    print(result["output"])
    print("\n" + "="*50 + "\n")

def modern_chain_syntax():
    """使用现代链语法（管道操作符）"""
    print("=== 现代链语法 ===\n")
    
    # 初始化LLM
    llm = OllamaLLM(model="llama3:latest")
    
    # 创建提示模板
    prompt = PromptTemplate.from_template(
        "请用中文解释以下概念，并给出一个实际应用例子：{concept}"
    )
    
    # 使用管道操作符创建链
    chain = prompt | llm | StrOutputParser()
    
    # 运行链
    result = chain.invoke({"concept": "区块链技术"})
    
    print("现代链语法输出:")
    print(result)
    print("\n" + "="*50 + "\n")

if __name__ == "__main__":
    # 测试简单LLM链
    simple_llm_chain()
    
    # 测试顺序链
    sequential_chain()
    
    # 测试简单顺序链
    simple_sequential_chain()
    
    # 测试现代链语法
    modern_chain_syntax() 
```



### 第四阶段：进阶应用（1-2个月）

1. **文档处理与检索**
   
   - 学习如何处理文档并回答相关问题
   
   ```python
   from langchain.text_splitter import CharacterTextSplitter
   
   # 分割长文本
   text_splitter = CharacterTextSplitter(
       chunk_size=1000,
       chunk_overlap=200
   )
   
   documents = text_splitter.split_text(long_text)
   ```
   
2. **简单的代理 (Agents)**
   - 让语言模型能够使用工具完成任务

## 初学者友好的项目实践

1. **个人助手**
   - 创建一个能记住对话历史的简单聊天机器人

2. **知识库问答**
   - 上传PDF文档，创建一个能回答文档相关问题的系统

3. **内容生成器**
   - 构建一个能生成博客文章大纲或社交媒体内容的工具

## 学习资源

### 初学者友好的资源

1. **官方文档**
   - [LangChain 快速入门](https://python.langchain.com/v0.2/docs/get_started/quickstart/)
   - 从简单示例开始，慢慢掌握基本概念

2. **视频教程**
   - 初学者推荐：[LangChain for Beginners](https://www.youtube.com/watch?v=aywZrzNaKjs)

3. **练习项目**
   - [LangChain Cookbook](https://github.com/gkamradt/langchain-tutorials) - 从简单到复杂的示例项目

### 实用技巧

- **从小处开始**：先创建一个非常简单的项目，确保基础功能正常工作
- **逐步添加功能**：一次只添加一个新功能，确保理解每个组件的作用
- **使用免费或低成本资源**：开发阶段可以使用开源模型或设置API使用限制
- **查看示例代码**：学习他人的代码示例可以加速理解

## 常见挑战与解决方案

1. **入门障碍**
   - **问题**：概念太多，不知从何开始
   - **解决方案**：从简单的LLM调用开始，逐步添加更多功能

2. **API密钥设置**
   - **问题**：不确定如何安全设置API密钥
   - **解决方案**：使用环境变量存储敏感信息

3. **成本控制**
   - **问题**：担心API调用费用
   - **解决方案**：设置使用限制，使用缓存机制减少重复调用

参考：

- https://python.langchain.com/v0.2/docs/introduction/
- https://blog.csdn.net/qq_35812205/article/details/131709720
- https://github.com/langchain-ai/langchain

