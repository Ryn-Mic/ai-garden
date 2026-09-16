---
title: AI Garden
description: 一个用 Obsidian 写作、Quartz 发布的 AI 知识图谱
tags: [moc]
---

# 🌱 AI Garden

一个持续生长的 AI 知识图谱。左侧目录是骨架，[图谱视图](/graph) 是神经。

> [!tip] 怎么读
> 从任意一个节点进去，跟着 `[[双链]]` 走。没有"官方顺序"，只有你自己的路径。

## 入口

- 🧠 **[[concepts/index|核心概念]]** — 必须先懂的底层节点：[[大语言模型]]、[[Transformer]]、[[Embedding]]、[[提示工程]]
- 🤖 **[[agents/index|Agent 与工具]]** — 产品与框架：[[LangChain]]、[[LlamaIndex]]、[[Dify]]、[[Claude-Code|Claude Code]]
- 📘 **[[tutorials/index|教程]]** — 手把手：[[Quartz部署指南]]、[[Obsidian配置指南]]、[[构建RAG应用]]
- ⚖️ **[[comparisons/index|技术选型]]** — [[RAG与微调]]、[[Agent框架对比]]
- 🚀 **[[projects/index|实战项目]]** — [[ai-garden]] 就是这个库本身
- 📚 **[[resources/index|资料库]]** — [[Attention-Is-All-You-Need|Transformer 原论文]]、[[学习路线]]

## 三个主干

```text
大语言模型 ──→ Transformer ──→ Embedding ──→ 向量数据库
     │                                          │
     └──→ 提示工程 ──→ Agent ──→ MCP             │
                          │                     │
                          └────→ RAG ←──────────┘
                                   │
                             RAG与微调（选型）
```

## 这个库怎么长出来的

| 层 | 用什么 | 说明 |
| --- | --- | --- |
| 写作 | Obsidian | 本地 Markdown + 双链 |
| 存放 | `content/` | 就是 Obsidian Vault |
| 构建 | [Quartz](https://github.com/jackyzha0/quartz) | Markdown → 静态站点 + 图谱 |
| 托管 | GitHub → GitHub Pages / Cloudflare Pages | push 即发布 |

细节见 [[ai-garden]]。

## 状态说明

- 🌱 `seedling` 刚记下，还没验证
- 🌿 `growing` 有结构，还在补
- 🌳 `evergreen` 稳定可引用
