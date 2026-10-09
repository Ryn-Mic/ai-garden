---
title: Transformer
type: concept
status: growing
track: research
audience: developer
difficulty: advanced
tags: [concept, architecture, track/research, level/advanced]
aliases: [Transformer架构, Self-Attention]
---

# Transformer

> [!info] 阅读定位
> **进阶研究 · 技术研究**。涉及注意力与公式；建议了解向量、矩阵和模型基础。

> [!abstract] 一句话定义
> 2017 年论文 [[research/papers/Attention-Is-All-You-Need|Attention-Is-All-You-Need]] 提出的序列建模架构，用**自注意力**替换循环结构，让训练可以完全并行。今天几乎所有 [[concepts/大语言模型|大语言模型]] 都是它的变体。

## 为什么重要

- 并行化 → 能在海量数据上训练 → 规模带来的能力涌现成为可能
- 注意力机制 → 任意两个位置直接交互，长距离依赖不再衰减
- 结构统一 → 文本、图像、音频都能塞进同一个框架

## 核心原理

<iframe src="transformer-arch.html" width="100%" height="750" frameborder="0" style="border: 1px solid #e5e7eb; border-radius: 8px;"></iframe>

### 自注意力（Self-Attention）

每个 token 生成 Query / Key / Value 三个向量：

```text
Attention(Q, K, V) = softmax(QKᵀ / √d_k) · V
```

直觉：Query 是「我在找什么」，Key 是「我是什么」，两者点积得到「我该关注谁」，再用权重加权汇总 Value。

### 多头注意力（Multi-Head）

并行跑多组 Q/K/V，让不同头关注不同关系（语法、指代、位置……），最后拼接。

### 位置编码（Positional Encoding）

注意力本身无序，必须额外注入位置信息。从正弦编码到 RoPE，是长上下文能力的关键演进点。

### 三种架构

| 架构 | 注意力 | 代表 | 适合 |
| --- | --- | --- | --- |
| Encoder-only | 双向 | BERT | 理解、分类、[[concepts/Embedding|Embedding]] |
| Decoder-only | 因果（单向） | GPT 系列 | 生成 —— 当前主流 |
| Encoder-Decoder | 交叉 | T5 | 翻译、seq2seq |

## 关键术语

| 术语 | 含义 |
| --- | --- |
| 残差连接 | 让深层网络可训练 |
| LayerNorm | 稳定每层分布 |
| FFN | 逐位置前馈层，占参数大头 |
| KV Cache | 推理加速：缓存历史 K/V，避免重算 |
| 复杂度 | 注意力是 O(n²)，长上下文的根本瓶颈 |

## 相关节点

- 上层：[[concepts/大语言模型|大语言模型]]
- 输出侧：[[concepts/Embedding|Embedding]]
- 原始论文：[[research/papers/Attention-Is-All-You-Need|Attention-Is-All-You-Need]]
- 工程影响：[[concepts/向量数据库|向量数据库]]（同源的点积/余弦相似度）

<!-- series-navigation:start -->
## 系列导航

- **系列 05 · 2/5 站**：下一站 → [[concepts/Embedding|第 3 站]]；[[series/05-模型与RAG基础|查看本系列顺序与补课点]]。
<!-- series-navigation:end -->
