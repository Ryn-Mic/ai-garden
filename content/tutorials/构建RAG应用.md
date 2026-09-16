---
title: 构建 RAG 应用
type: tutorial
status: seedling
tags: [tutorial, rag, python]
difficulty: intermediate
prerequisites: ["[[RAG]]", "[[Embedding]]"]
---

# 构建 RAG 应用

> [!info] 目标
> 用 60 行代码搭一个能回答「我的文档里写了什么」的最小可用 [[RAG]]，并且知道每一步该调哪个旋钮。

**前置知识**：[[RAG]]、[[Embedding]]、[[向量数据库]]
**预计耗时**：40 分钟

## 步骤

### 1. 装依赖

```bash
pip install llama-index llama-index-vector-stores-chroma \
            llama-index-embeddings-huggingface
```

### 2. 最小实现

```python
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader, Settings
from llama_index.embeddings.huggingface import HuggingFaceEmbedding

# 1) 检索用的 embedding 模型（和生成模型是两回事）
Settings.embed_model = HuggingFaceEmbedding(
    model_name="BAAI/bge-small-zh-v1.5"   # 中文场景别用英文模型
)

# 2) 加载 + 切分
docs = SimpleDirectoryReader("./data").load_data()

# 3) 建索引（内部自动做 embedding → 向量库）
index = VectorStoreIndex.from_documents(docs)

# 4) 检索 + 生成
engine = index.as_query_engine(similarity_top_k=5)
resp = engine.query("这份文档的核心结论是什么？")

print(resp)
for node in resp.source_nodes:          # ← 一定要看召回源
    print(node.score, node.text[:80])
```

### 3. 调切分策略

这一步的收益通常最大：

```python
from llama_index.core.node_parser import SentenceSplitter

Settings.node_parser = SentenceSplitter(
    chunk_size=512,
    chunk_overlap=64,        # 10%~15% 重叠，避免切断语义
)
```

经验值：

| 文档类型 | chunk_size | 说明 |
| --- | --- | --- |
| FAQ / 短问答 | 128–256 | 一问一答正好一块 |
| 技术文档 | 512–1024 | 保住代码块完整 |
| 长篇论述 | 1024+ | 保上下文完整，靠重排补救 |

### 4. 换持久化向量库

`VectorStoreIndex` 默认在内存里，进程一退就没了。换成 Chroma 或 [[向量数据库]] 里的其他选项：

```python
import chromadb
from llama_index.vector_stores.chroma import ChromaVectorStore
from llama_index.core import StorageContext

client = chromadb.PersistentClient(path="./chroma_db")
collection = client.get_or_create_collection("docs")

vector_store = ChromaVectorStore(chroma_collection=collection)
index = VectorStoreIndex.from_documents(
    docs, storage_context=StorageContext.from_defaults(vector_store=vector_store)
)
```

## 验证

一次改造是否生效，用**同一批问题**跑前后对比：

- [ ] 召回的前 5 条是不是真的相关（看 `source_nodes`，别只看最终答案）
- [ ] 问一个文档里**没有**的问题，模型会不会说"资料中没有提到"
- [ ] 中文专有名词（人名、型号、编号）能不能被召回

## 常见坑

> [!warning] 踩坑记录
> - **答非所问**：先看召回，再看生成。90% 的"模型不行"其实是没检索到。
> - **中文效果差**：用了英文 embedding 模型。换 `bge` / `m3e` / 多语言模型。
> - **PDF 抽不出表格**：先用 `pymupdf` 或 `unstructured` 检查解析结果，解析错了后面全错。
> - **专有名词漏检**：纯稠密向量搞不定，上混合检索（BM25 + 向量）。
> - **模型硬编**：提示里明确写「若资料中没有答案，直接回答"资料中未提及"」。
> - **没有评测集**：至少手写 20 条「问题 → 期望出处」，每次改参数都跑一遍。

## 相关节点

- 概念：[[RAG]]、[[Embedding]]、[[向量数据库]]、[[上下文工程]]
- 选型：[[RAG与微调]]
- 框架：[[LlamaIndex]]、[[LangChain]]、[[Dify]]

## 参考

- LlamaIndex 官方文档：https://docs.llamaindex.ai
- 原始论文：*Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks* (2020)
