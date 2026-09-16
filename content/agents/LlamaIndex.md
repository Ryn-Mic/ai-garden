---
title: LlamaIndex
type: agent
status: growing
tags: [agent, framework, rag, python]
aliases: [GPT Index]
homepage: https://docs.llamaindex.ai
repo: https://github.com/run-llama/llama_index
license: MIT
---

# LlamaIndex

> [!abstract] 一句话定位
> 以**数据接入与检索**为中心的应用框架，[[RAG]] 场景下比 [[LangChain]] 更顺手。

## 基本信息

| 项目 | 内容 |
| --- | --- |
| 类型 | 开发框架（Python / TS） |
| 开源 | 是（MIT） |
| 维护方 | LlamaIndex Inc. |
| 上手难度 | ⭐️⭐️ 数据侧抽象清晰 |
| 强项 | 文档解析、索引结构、检索策略 |

## 解决的问题

RAG 的痛点在数据侧：格式五花八门、切分策略难调、检索质量不稳。LlamaIndex 把这一整段做成了可组合组件。

## 核心抽象

| 抽象 | 作用 |
| --- | --- |
| Reader / Connector | 从 PDF、Notion、DB、网页加载数据 |
| Node / TextSplitter | 切分与元数据挂载 |
| Index | 索引结构：Vector / Summary / Keyword / Tree |
| Retriever | 检索策略：向量、BM25、混合、递归 |
| QueryEngine | 检索 + 生成的端到端封装 |
| PostProcessor | 重排、过滤、去重 |

### 几种索引的取舍

| 索引 | 适合 |
| --- | --- |
| VectorStoreIndex | 默认选择，语义检索 |
| SummaryIndex | 需要"全文过一遍"的总结任务 |
| KeywordTableIndex | 关键词精确匹配 |
| TreeIndex | 长文档的层次化问答 |
| KnowledgeGraphIndex | 多跳关系推理，见 [[RAG]] 里的 GraphRAG |

## 最小可用示例

```python
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader

docs = SimpleDirectoryReader("./data").load_data()
index = VectorStoreIndex.from_documents(docs)
engine = index.as_query_engine(similarity_top_k=5)

print(engine.query("这个文档讲了什么？"))
```

## 优点 / 局限

**优点**

- 数据接入与切分能力最强
- 检索策略可插拔，调优空间大
- 分层清晰，`Reader → Index → Retriever → QueryEngine` 一眼看懂

**局限**

- Agent 编排能力弱于 [[LangChain]] / LangGraph
- 抽象同样偏厚，简单场景显得绕
- 版本迭代快

> [!tip] 分工经验
> 数据与检索用 LlamaIndex，复杂状态编排用 LangGraph，两者可以共存。

## 相关节点

- 上层：[[Agent]]
- 核心场景：[[RAG]]、[[构建RAG应用]]
- 组件：[[Embedding]]、[[向量数据库]]
- 同类对比：[[Agent框架对比]]
