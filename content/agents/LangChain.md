---
title: LangChain
type: agent
status: growing
tags: [agent, framework, python]
aliases: [LangChain.js, LangGraph]
homepage: https://python.langchain.com
repo: https://github.com/langchain-ai/langchain
license: MIT
---

# LangChain

> [!abstract] 一句话定位
> 生态最全的 [[Agent]] / LLM 应用开发框架，用统一抽象把模型、提示、工具、记忆、检索拼成流水线。

## 基本信息

| 项目 | 内容 |
| --- | --- |
| 类型 | 开发框架（Python / JS） |
| 开源 | 是（MIT） |
| 维护方 | LangChain Inc. |
| 上手难度 | ⭐️⭐️⭐️ 概念多，抽象层厚 |
| 配套 | LangGraph（有状态编排）、LangSmith（可观测） |

## 解决的问题

把「调模型 → 拼提示 → 取检索 → 解析输出」的重复胶水代码抽象成可组合组件，并允许随时换底层模型。

## 核心抽象

| 抽象 | 作用 |
| --- | --- |
| ChatModel | 统一各家模型接口，方便替换 |
| PromptTemplate | 参数化提示 |
| OutputParser | 把自由文本转成结构化数据 |
| Retriever | 统一检索接口，接 [[向量数据库]] |
| Tool | 工具定义，供 [[Agent]] 调用 |
| Chain / LCEL | 用 `\|` 管道串联组件 |
| Runnable | 一切可执行单元的公共接口 |

## 最小可用示例

```python
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

prompt = ChatPromptTemplate.from_template("用一句话解释 {topic}")
chain = prompt | ChatOpenAI(model="gpt-4o-mini") | StrOutputParser()

print(chain.invoke({"topic": "RAG"}))
```

LCEL 的 `|` 是 LangChain 的核心表达方式：左边输出即右边输入。

## 优点 / 局限

**优点**

- 集成数量最多，几乎所有模型/向量库/工具都有适配
- LCEL + LangGraph 能表达复杂有状态流程
- 生态资料与社区规模最大

**局限**

- 抽象层多，出问题时要读源码才知道调用链
- 版本迭代快，旧教程容易失效
- 简单场景属于过度设计——几行 `requests` 就够时别硬套

> [!tip] 什么时候用
> 需求还没定型、要快速试多种模型与检索方案时用它；流程稳定后，很多团队会换成直接调 SDK 以减少黑盒。

## 相关节点

- 上层：[[Agent]]
- 常用组件：[[RAG]]、[[向量数据库]]、[[提示工程]]
- 同类对比：[[Agent框架对比]]、[[LlamaIndex]]
