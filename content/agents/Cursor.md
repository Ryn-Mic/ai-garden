---
title: Cursor
type: agent
status: seedling
tags: [agent, ide, coding]
aliases: [Cursor IDE]
homepage: https://cursor.com
license: 商业
---

# Cursor

> [!abstract] 一句话定位
> 以 VS Code 为基座的 AI 编辑器。把 [[Agent]] 嵌进 IDE，让"补全、改多文件、跑命令"发生在编辑器里而不是聊天窗口里。

## 基本信息

| 项目 | 内容 |
| --- | --- |
| 类型 | IDE（VS Code fork） |
| 开源 | 否 |
| 上手难度 | ⭐️ VS Code 用户零成本迁移 |
| 核心差异 | 代码库索引 + 多文件编辑 |

## 解决的问题

在编辑器里用自然语言完成"跨文件改动"，并让它理解整个代码库而不是单个文件。

## 核心能力

| 能力 | 说明 |
| --- | --- |
| Tab 补全 | 预测下一步编辑，跨行跨文件 |
| Cmd+K | 选区内的就地改写 |
| Composer / Agent | 多文件批量改动 |
| 代码库索引 | 用 [[Embedding]] 建语义索引，实现全库问答 |
| 规则文件 | `.cursor/rules` 沉淀项目约定 |
| 扩展 | [[MCP]] 接入外部工具 |

> [!note] 和 [[Claude-Code|Claude Code]] 的差异
> Cursor 强在**人在环内的高频小改动**（补全、就地改）；终端 Agent 强在**目标导向的长任务**（自己跑测试、迭代）。很多人的实际用法是两者并用。

## 优点 / 局限

**优点**

- 迁移成本低，VS Code 生态与快捷键全部保留
- 索引整个代码库，跨文件理解准确
- Tab 补全的体感明显强于传统补全

**局限**

- 闭源，模型与索引行为不完全透明
- 大仓库索引耗时，且隐私敏感项目需谨慎
- Agent 长任务的自主迭代弱于专门的 CLI Agent

## 相关节点

- 概念：[[Agent]]、[[Embedding]]
- 同类：[[Claude-Code|Claude Code]]
