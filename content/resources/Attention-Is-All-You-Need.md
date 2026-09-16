---
title: Attention Is All You Need
type: resource
status: growing
tags: [resource, paper, transformer]
kind: paper
url: https://arxiv.org/abs/1706.03762
authors: [Vaswani, Shazeer, Parmar, Uszkoreit, Jones, Gomez, Kaiser, Polosukhin]
year: 2017
---

# Attention Is All You Need

> [!quote] 核心贡献
> 提出 [[Transformer]]：完全抛弃循环与卷积，只用注意力机制做序列建模。训练可并行，为之后所有 [[大语言模型]] 铺平道路。

## 出处

| 项目 | 内容 |
| --- | --- |
| 作者 | Vaswani et al. (Google Brain / Google Research) |
| 年份 | 2017 (NeurIPS) |
| 链接 | https://arxiv.org/abs/1706.03762 |
| 类型 | 论文 |

## 要点

1. **自注意力替代 RNN**：任意两位置直接交互，路径长度 O(1)，长距离依赖不再衰减。
2. **完全并行**：不像 RNN 必须按时间步串行，可以吃满 GPU。这是"规模能变大"的前提。
3. **多头注意力**：多组 Q/K/V 并行，不同头捕捉不同关系。
4. **位置编码**：注意力本身无序，用正弦函数注入位置信息。
5. **残差 + LayerNorm**：让深网络可训练。
6. **O(n²) 的代价**：注意力复杂度随序列长度平方增长——长上下文的根本瓶颈，也是后续所有高效注意力研究的起点。

## 我的理解

读完这篇要带走的最重要一件事：**注意力的本质是可学习的加权平均**。Query 决定"我要找什么"，Key 决定"我提供什么"，点积给出相关性权重，再对 Value 加权求和。理解了这个，KV Cache、Flash Attention、长上下文优化就都有了共同的语言。

它是典型的"结构简单但影响巨大"的工作——核心公式只有一行，却重塑了整个领域。

## 引用到

- [[Transformer]]
- [[大语言模型]]
- [[Embedding]]（BERT 这一支的源头）

## 原文摘录

> We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely.

> Attention Is All You Need.
