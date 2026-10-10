---
title: 05 · 模型与 RAG 基础
type: series
kind: series
status: growing
track: research
audience: developer
difficulty: advanced
tags: [series, model, rag, track/research, level/advanced]
series_order: 5
verification: not-applicable
prerequisites: [熟悉 AI 任务, 架构深入需相关数学基础, 选做开发实验需 Python 和模型接入环境]
sequence:
  - concepts/大语言模型
  - concepts/Transformer
  - concepts/Embedding
  - concepts/RAG
  - research/comparisons/RAG与微调
knowledge_points: [concepts/Token, concepts/采样, concepts/幻觉, concepts/向量数据库, concepts/微调]
---

# 05 · 模型与 RAG 基础

> [!info] 阅读定位
> **系列阅读 · 技术研究**。面向希望理解模型与知识接入的读者。与系列 04 是两个研究方向，不是日常 AI 使用的毕业要求。

**目标**：区分模型生成、表示、检索与行为调整，并能为文档问答设计可追溯的验收标准。

<!-- archify:series-model-rag:start -->
## 路线图

这是研究阅读顺序，不表示构建 RAG 必须先学完 Transformer 论文；只关注检索应用时可从第 1 站转第 3 站。

<iframe src="assets/diagrams/series-model-rag.html" width="100%" height="700" loading="lazy" style="border: 1px solid var(--gray); border-radius: 8px; margin: 1rem 0;" title="系列 05：区分生成、表示、检索与行为调整"></iframe>

[单独打开图表](assets/diagrams/series-model-rag.html)
<!-- archify:series-model-rag:end -->

## 主线：1 → 2 → 3 → 4 → 5

[[concepts/大语言模型|1 · 模型做什么]] → [[concepts/Transformer|2 · 架构怎样工作]] → [[concepts/Embedding|3 · 资料怎样表示]] → [[concepts/RAG|4 · 检索怎样参与回答]] → [[research/comparisons/RAG与微调|5 · 选择知识接入方案]]

这是一条研究阅读顺序，不表示构建 RAG 必须先掌握整篇 Transformer 论文。仅关注检索应用时，可以从第 1 站直接转第 3 站；架构深入作为选读。

### 1. 理解模型与应用的边界

读 [[concepts/大语言模型|大语言模型]]，区分训练知识、本次输入与应用提供的工具能力。

**这一站完成**：不会把上传文件、加载技能、外部检索称为必然发生的重新训练。

**中途补课**：[[concepts/Token|Token]]。需要研究输出差异与可靠性时，选读 [[concepts/采样|采样]]、[[concepts/幻觉|幻觉]]。

### 2. 了解架构；论文深入另行选读

读 [[concepts/Transformer|Transformer]]，区分架构、训练目标、推理和产品行为。

**这一站完成**：能说明这几个层次不是同一个问题；不会从架构名直接推出某款软件的权限或技能实现。

**选读**：[[research/papers/Attention-Is-All-You-Need|Attention Is All You Need]]，需要相应架构与数学前提，不影响普通应用练习。

### 3. 理解向量表示与资料存取

读 [[concepts/Embedding|Embedding]]，再补 [[concepts/向量数据库|向量数据库]]。

**这一站完成**：能区分向量表示、相似度检索和原始证据；相似不等于事实必然正确。

### 4. 把检索接入回答过程

读 [[concepts/RAG|RAG]]，区分资料处理、检索、上下文组装和答案核对。

**这一站完成**：能为命中来源、缺失信息与引用正确性设计检查，而不是只看回答流畅度。

**选做**：[[tutorials/development/构建RAG应用|构建 RAG 应用]]。需要代码和环境；先核对依赖、版本与示例条件，保留实际失败记录。阅读代码不等于实验通过。

### 5. 按目标比较 RAG 与微调

先补 [[concepts/微调|微调]]，再读 [[research/comparisons/RAG与微调|RAG 与微调]]。

**这一站完成**：能根据事实更新、行为调整、访问控制和验收需求提出方案，并明确待验证条件。

## 研究边界

旧模型、框架和对比文章未全部完成来源与实验核验。本文是阅读路线，不提供已经验证过的统一性能结论。

关注 Agent 工程机制时，另选 [[series/04-Agent机制与可靠性|系列 04]]。返回 [[series/index|系列目录]]。
