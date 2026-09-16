---
title: Dify
type: agent
status: growing
tags: [agent, platform, lowcode]
aliases: [Dify.ai]
homepage: https://dify.ai
repo: https://github.com/langgenius/dify
license: Apache-2.0
---

# Dify

> [!abstract] 一句话定位
> 开源的 LLM 应用开发平台：可视化编排 [[Agent]] 与工作流，自带 [[RAG]] 知识库、Prompt IDE、日志与 API 发布。

## 基本信息

| 项目 | 内容 |
| --- | --- |
| 类型 | 平台（自托管 / 云） |
| 开源 | 是（Apache-2.0，带商用限制条款） |
| 技术栈 | Python + Next.js + Postgres |
| 上手难度 | ⭐️ 会用浏览器就行 |
| 面向 | 不想写胶水代码的产品/业务团队 |

## 解决的问题

把「接模型、切文档、建索引、拼提示、发布 API、看日志」这一整条链路做成开箱即用的产品，省掉 80% 的样板代码。

## 核心抽象

| 抽象 | 说明 |
| --- | --- |
| 应用 | 四类：Chatbot / Agent / Workflow / Completion |
| 工作流 | 节点式编排：LLM、知识检索、条件分支、循环、代码、HTTP |
| 知识库 | 内置 [[RAG]]：上传 → 切分 → [[Embedding]] → [[向量数据库]] |
| 变量 | 会话变量 / 环境变量，控制数据流转 |
| 工具 | 内置工具 + 自定义 API + [[MCP]] |
| 发布 | 一键生成 Web App / API / 嵌入组件 |

## 最小可用路径

```text
1. Docker Compose 起服务
2. 模型供应商里填 API Key
3. 建知识库，传文档，设切分参数
4. 建 Chatflow：开始 → 知识检索 → LLM → 回答
5. 发布为 API，应用侧调用
```

## 优点 / 局限

**优点**

- 从 0 到能用的 API 最快，无需写后端
- 工作流可视化，业务同事能看懂
- 自带可观测：每次调用的输入输出、token、耗时都可查
- 自托管，数据不出内网

**局限**

- 复杂定制（特殊检索逻辑、精细状态机）会被平台能力框住
- 版本升级偶有破坏性变更，需锁版本
- 大规模高并发下需要自己做架构加固

> [!tip] 什么时候用
> 验证阶段最快；到了需要深度定制检索或复杂 Agent 逻辑时，再考虑 [[LangChain]] / [[LlamaIndex]] 自己写。

## 相关节点

- 上层：[[Agent]]
- 内置能力：[[RAG]]、[[提示工程]]、[[向量数据库]]
- 同类对比：[[Agent框架对比]]
