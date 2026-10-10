---
title: Agent 框架对比
type: comparison
status: growing
track: research
audience: developer
difficulty: advanced
tags: [comparison, agent, framework, track/research, level/advanced]
options: ["[[research/products/LangChain|LangChain]]", "[[research/products/LlamaIndex|LlamaIndex]]", "[[research/products/Dify|Dify]]"]
verdict: 按"写代码 vs 配置"分流
aliases: ["comparisons/Agent框架对比"]
---

# Agent 框架对比

> [!info] 阅读定位
> **进阶研究 · 技术研究**。比较应用构建方案，不是普通用户的聊天软件选购指南。

## 结论先行

> [!success] 选型建议
> 三个问题定方向：
> 1. **要不要写代码？** 不想写 → [[research/products/Dify|Dify]]
> 2. **重点是数据与检索？** → [[research/products/LlamaIndex|LlamaIndex]]
> 3. **重点是复杂有状态编排？** → [[research/products/LangChain|LangChain]] + LangGraph
>
> 原型期用 Dify 快，生产期常迁到代码框架。

## 对比维度

| 维度 | [[research/products/LangChain|LangChain]] | [[research/products/LlamaIndex|LlamaIndex]] | [[research/products/Dify|Dify]] |
| --- | --- | --- | --- |
| 形态 | 代码库 | 代码库 | 平台（Web UI） |
| 上手门槛 | 中（概念多） | 中 | **低** |
| 数据接入 | 够用 | **最强** | 内置，够用 |
| 检索策略 | 可插拔 | **最丰富** | 可视化配置 |
| 编排能力 | **最强**（LangGraph 有状态图） | 弱 | 中（节点式工作流） |
| 可视化 | LangSmith（另装） | 弱 | **内置** |
| 发布 API | 自己写服务 | 自己写服务 | **一键** |
| 定制自由度 | 高 | 高 | 中（受平台限制） |
| 可观测 | LangSmith | 需自建 | 内置日志 |
| 部署 | 随你的应用 | 随你的应用 | 自托管 Docker |
| 适合谁 | 工程师 | 工程师 | 产品/业务团队 |
| 主要代价 | 抽象厚、版本快 | 编排弱 | 深度定制被卡住 |

## 分场景推荐

| 场景 | 推荐 | 理由 |
| --- | --- | --- |
| 一周内要演示给老板看 | [[research/products/Dify|Dify]] | 拖拽即出 API |
| 企业知识库问答 | [[research/products/LlamaIndex|LlamaIndex]] | 解析、切分、检索策略最细 |
| 多步审批 / 长流程 Agent | [[research/products/LangChain|LangChain]] + LangGraph | 状态机与断点续跑 |
| 业务同事自己维护提示词 | [[research/products/Dify|Dify]] | 可视化 + 版本管理 |
| 需要嵌进已有后端服务 | [[research/products/LlamaIndex|LlamaIndex]] / [[research/products/LangChain|LangChain]] | 就是一个 Python 库 |
| 既要快又要能定制 | Dify 做原型 → 迁到代码框架 | 分阶段演进 |

## 决策流程

<!-- archify:framework-selection:start -->
### 按开发方式和瓶颈做选择

这不是产品统一排名；可视化原型、资料检索与复杂状态编排是不同侧重点，最终要核对实际约束。

<iframe src="assets/diagrams/framework-selection.html" width="100%" height="700" loading="lazy" style="border: 1px solid var(--gray); border-radius: 8px; margin: 1rem 0;" title="按开发方式和瓶颈做选择"></iframe>

[单独打开图表](assets/diagrams/framework-selection.html)
<!-- archify:framework-selection:end -->


```text
要写代码吗？
├── 不写 → [[research/products/Dify|Dify]]
└── 要写
    ├── 瓶颈在"找对资料" → [[research/products/LlamaIndex|LlamaIndex]]
    └── 瓶颈在"流程编排" → [[research/products/LangChain|LangChain]] / LangGraph
```

## 相关节点

- 概念：[[concepts/Agent|Agent]]、[[concepts/MCP|MCP]]
- 能力基础：[[concepts/RAG|RAG]]、[[concepts/提示工程|提示工程]]、[[concepts/上下文工程|上下文工程]]
- 单点对比：[[research/comparisons/RAG与微调|RAG与微调]]

## 参考

- LangChain：https://python.langchain.com
- LlamaIndex：https://docs.llamaindex.ai
- Dify：https://docs.dify.ai

<!-- series-navigation:start -->
## 系列导航

- **系列 04 · 4/4 站**：主线完成 → [[series/04-Agent机制与可靠性|回到本系列验收与按需延伸]]。
<!-- series-navigation:end -->
