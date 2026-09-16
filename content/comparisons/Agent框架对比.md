---
title: Agent 框架对比
type: comparison
status: growing
tags: [comparison, agent, framework]
options: ["[[LangChain]]", "[[LlamaIndex]]", "[[Dify]]"]
verdict: 按"写代码 vs 配置"分流
---

# Agent 框架对比

## 结论先行

> [!success] 选型建议
> 三个问题定方向：
> 1. **要不要写代码？** 不想写 → [[Dify]]
> 2. **重点是数据与检索？** → [[LlamaIndex]]
> 3. **重点是复杂有状态编排？** → [[LangChain]] + LangGraph
>
> 原型期用 Dify 快，生产期常迁到代码框架。

## 对比维度

| 维度 | [[LangChain]] | [[LlamaIndex]] | [[Dify]] |
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
| 一周内要演示给老板看 | [[Dify]] | 拖拽即出 API |
| 企业知识库问答 | [[LlamaIndex]] | 解析、切分、检索策略最细 |
| 多步审批 / 长流程 Agent | [[LangChain]] + LangGraph | 状态机与断点续跑 |
| 业务同事自己维护提示词 | [[Dify]] | 可视化 + 版本管理 |
| 需要嵌进已有后端服务 | [[LlamaIndex]] / [[LangChain]] | 就是一个 Python 库 |
| 既要快又要能定制 | Dify 做原型 → 迁到代码框架 | 分阶段演进 |

## 决策流程

```text
要写代码吗？
├── 不写 → [[Dify]]
└── 要写
    ├── 瓶颈在"找对资料" → [[LlamaIndex]]
    └── 瓶颈在"流程编排" → [[LangChain]] / LangGraph
```

## 相关节点

- 概念：[[Agent]]、[[MCP]]
- 能力基础：[[RAG]]、[[提示工程]]、[[上下文工程]]
- 单点对比：[[RAG与微调]]

## 参考

- LangChain：https://python.langchain.com
- LlamaIndex：https://docs.llamaindex.ai
- Dify：https://docs.dify.ai
