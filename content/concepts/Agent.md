---
title: Agent
type: concept
status: growing
tags: [concept, agent]
aliases: [智能体, AI Agent, LLM Agent]
---

# Agent

> [!abstract] 一句话定义
> 让 [[大语言模型]] 从「回答问题」变成「完成任务」：给它目标、工具和循环，它自己决定下一步做什么。

## 为什么重要

模型本身只能输出文本。Agent 把文本变成**动作**——读文件、调 API、写代码、查数据库——从而真正产生副作用。这是从"聊天"到"干活"的分界线。

## 核心原理

### 最小循环

```text
观察(Observation) → 思考(Thought) → 行动(Action) → 结果 → 再观察 ... → 直到完成
```

这就是 [[提示工程]] 里的 **ReAct** 模式。一个 Agent 系统 = 模型 + 工具 + 循环 + 记忆 + 停止条件。

### 四个组成部分

| 组成 | 作用 | 关键问题 |
| --- | --- | --- |
| 模型 | 决策大脑 | 能力与成本权衡 |
| 工具 | 与外界交互 | 描述质量决定调用准确率 |
| 记忆 | 跨步骤保持状态 | 见 [[上下文工程]] |
| 控制流 | 循环、分支、停机 | 防死循环、防跑飞 |

### 常见架构

- **ReAct**：交替思考与行动，最通用
- **Plan-and-Execute**：先出计划再逐步执行，适合长任务
- **Reflection**：自我批判并重试
- **Multi-Agent**：角色分工（规划者/执行者/审查者），成本高，只在任务确实可拆分时用
- **Workflow vs Agent**：路径固定就用工作流，路径需要模型临场判断才上 Agent

> [!warning] 最常见的失败模式
> - **工具描述含糊** → 模型调错工具。这比模型能力更常见
> - **没有停机条件** → 死循环烧钱
> - **上下文爆炸** → 长任务越跑越傻，见 [[上下文工程]]
> - **过早多 Agent** → 复杂度爆炸而收益极小

## 相关节点

- 大脑：[[大语言模型]]
- 接工具的协议：[[MCP]]
- 底层能力：[[提示工程]]、[[上下文工程]]、[[RAG]]
- 框架与产品：[[LangChain]]、[[LlamaIndex]]、[[Dify]]、[[Claude-Code|Claude Code]]、[[Cursor]]
- 选型：[[Agent框架对比]]

## 参考

- ReAct 论文：*ReAct: Synergizing Reasoning and Acting in Language Models* (Yao et al., 2022)
