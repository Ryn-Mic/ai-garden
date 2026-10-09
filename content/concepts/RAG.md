---
title: RAG
type: concept
status: growing
track: research
audience: developer
difficulty: advanced
tags: [concept, rag, retrieval, track/research, level/advanced]
aliases: [检索增强生成, Retrieval-Augmented Generation]
---

# RAG

> [!info] 阅读定位
> **进阶研究 · 技术研究**。检索增强的工程链路；日常提供资料的方法见 [[concepts/AI能看到什么|AI能看到什么]]。

> [!abstract] 一句话定义
> 在生成之前，先从外部知识库检索相关内容塞进上下文，让 [[concepts/大语言模型|大语言模型]] 基于**证据**而不是**记忆**来回答。

## 为什么重要

它同时解决 [[concepts/大语言模型|大语言模型]] 的两个硬伤：知识过期、无法引用来源。而且**不用训练**，改数据即可生效——这是它相比 [[concepts/微调|微调]] 的最大优势。

## 核心原理

### 完整流程图

<iframe 
  src="../diagrams/rag-pipeline.html" 
  width="100%" 
  height="700px" 
  style="border: 1px solid var(--gray); border-radius: 8px; margin: 2rem 0;"
  title="RAG 检索增强生成流程图"
></iframe>

> [!tip] 交互功能
> - **缩放**：滚轮缩放，或点击图表右下角的 +/- 按钮
> - **搜索**：点击右上角的搜索图标，输入关键词快速定位
> - **主题切换**：点击右上角的月亮/太阳图标切换明暗主题
> - **关注流程**：点击节点或连线可以高亮相关路径

### 文字说明

```text
离线：文档 → 切分(chunk) → [[concepts/Embedding|Embedding]] → 写入 [[concepts/向量数据库|向量数据库]]
在线：问题 → Embedding → 向量检索 Top-K → (重排) → 拼进 Prompt → LLM → 带引用回答
```

### 每个环节的成败点

| 环节 | 关键决策 | 失败表现 |
| --- | --- | --- |
| 解析 | PDF/表格/代码怎么抽 | 抽取错 → 后面全错 |
| 切分 | 大小、重叠、按语义还是按标题 | 切碎上下文 / 单块太杂 |
| 向量化 | 模型选择、是否多语言、维度 | 语义近的搜不到 |
| 检索 | 纯向量 / 纯 BM25 / 混合 | 专有名词漏检 |
| 重排 | 是否加 cross-encoder | 前几条不相关 |
| 生成 | 提示约束、必须引用、允许说"没有" | 编造答案 |

### 进阶形态

- **混合检索**：BM25 + 稠密向量（推荐默认）
- **重排（Rerank）**：先召回 50 条粗筛，再精排出 Top 5
- **查询改写**：多轮对话里先把"它/这个"补全成完整问题
- **HyDE**：先让模型假装回答，再用假答案去检索
- **GraphRAG**：用知识图谱补上多跳推理（和本库的双链思路同源）
- **Agentic RAG**：让 [[concepts/Agent|Agent]] 自己决定检索几次、检索什么

> [!warning] 最常见的三个坑
> 1. 只看检索指标，不看端到端答案质量
> 2. 切分策略从不调，直接默认 512/0
> 3. 没让模型"允许说没有"——没检索到就硬编

## 相关节点

- 组件：[[concepts/Embedding|Embedding]]、[[concepts/向量数据库|向量数据库]]、[[concepts/上下文工程|上下文工程]]
- 替代路线：[[concepts/微调|微调]]，选型见 [[research/comparisons/RAG与微调|RAG与微调]]
- 动手：[[tutorials/development/构建RAG应用|构建RAG应用]]
- 框架：[[research/products/LangChain|LangChain]]、[[research/products/LlamaIndex|LlamaIndex]]

## 参考

- 原始论文：*Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks* (Lewis et al., 2020)

<!-- series-navigation:start -->
## 系列导航

- **系列 05 · 4/5 站**：下一站 → [[research/comparisons/RAG与微调|第 5 站]]；[[series/05-模型与RAG基础|查看本系列顺序与补课点]]。
<!-- series-navigation:end -->
