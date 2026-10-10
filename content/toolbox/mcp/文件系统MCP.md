---
title: 文件系统 MCP：给 AI 文件入口，不等于只读授权
type: tool-note
status: growing
track: toolbox
audience: non-programmer
difficulty: beginner
tags: [tool, mcp, files, security, track/toolbox, level/beginner]
verification: docs-only
updated: 2026-09-30
aliases: ["toolbox/文件系统MCP"]
---

# 文件系统 MCP：给 AI 文件入口，不等于只读授权

> [!info] 阅读定位
> **工具箱 · 入门**。帮助普通用户判断是否需要文件服务；实际配置涉及 Node.js、客户端和权限，属于进阶使用或技术协作，不隐藏这些前提。

## 记录什么工具

[MCP 官方参考实现的 Filesystem Server](https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem)，发布包名为 `@modelcontextprotocol/server-filesystem`。

它提供文件和目录操作，包括读取、写入、编辑、搜索、移动和元数据查询等。具体工具以安装版本实际暴露的列表为准。

**证据等级**：官方 README 整理，未在本库客户端中安装并实测；参考实现不等于对所有业务场景都有生产保障。

## 日常工作中有什么用

例如，你有一个单独的练习文件夹，里面有几份纯文字会议记录。文件服务可以帮助 Agent 找到指定记录、读取内容，交给 [[concepts/Skill|工作流程]] 整理。

| 需求 | 优先尝试 | 何时再考虑这类 MCP |
| --- | --- | --- |
| 总结一份文档 | 应用的附件或文件引用 | 附件入口不满足需求 |
| 反复读取指定目录的多份文字记录 | 应用已有的工作文件夹功能 | 需要兼容的 MCP 文件入口 |
| 生成或编辑 Word、Excel、PPT | 应用文档能力或 [[toolbox/skills/文档处理Skills|文档处理Skills]] | 文件服务可作入口，但不自动提供格式解析与排版能力 |

WorkBuddy 等软件已经有文件工作能力时，不必再叠一套 MCP。**能读取字节或文字，不等于理解所有文件格式。**

## 最容易误会的权限边界

**允许目录只规定范围，不规定“只能读”。** 服务可能仍在这个目录里提供写入、编辑或移动工具。

“我告诉 AI 只读”“这个目录只是用来阅读”都不是权限锁。需要只读流程时，确认宿主能否限制写工具、系统权限是否允许写入，以及服务的实际策略；不能假设有一个通用只读开关。

官方服务还可以通过客户端的 Roots 管理目录范围，因此最终有效范围需要查看实际配置，不能只看最初一份启动参数。

## 接入成本与需要核对的事

- Node.js / 包运行环境与支持 MCP 的客户端。
- 真实有效的允许目录，不选择整个主目录、桌面或资料盘。
- 当前暴露的工具及写入风险；必要时由技术协作者设置限制。
- 数据处理方式：文件在本地，不代表提取内容不会送给远程模型。

配置按 [官方 README](https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem#readme) 核对，不照搬其中演示用的桌面目录。需要学习连接验收时，先看 [[tutorials/mcp/MCP从接入到验收|MCP从接入到验收]] 的公开网页练习；两种服务的参数不能混用。

<!-- archify:filesystem-safety:start -->
### 文件入口与权限的检查链路

允许目录只限定范围，不代表只读；先检查当前实际工具，再用单个测试文件验收。

<iframe src="assets/diagrams/filesystem-safety.html" width="100%" height="700" loading="lazy" style="border: 1px solid var(--gray); border-radius: 8px; margin: 1rem 0;" title="文件系统 MCP：范围、工具与实际读取证据"></iframe>

[单独打开图表](assets/diagrams/filesystem-safety.html)
<!-- archify:filesystem-safety:end -->

## 只用测试目录验收一次

### 1. 单独准备原始材料目录

解压 [[tutorials/basics/练习材料与验收|练习包]]，仅使用 `materials`，不要授权整个包。`expected` 是验收答案，不应作为待分析资料一起提供。

### 2. 确认范围与可用工具

通过产品的工具和权限展示确认有效范围。如果支持 `list_allowed_directories`，可用它辅助检查；具体以版本为准。

无法确认范围，或无法限制不需要的写操作时，先不要处理真实资料。

### 3. 明确读取目标

```text
请使用已经授权的文件读取工具，只读取练习目录中的 meeting.txt。
列出演示批次、会议待办和对应原文。
不搜索其他目录，不写入、移动或覆盖任何文件。
读取失败时直接说明，不根据文件名猜测。
```

### 4. 检查调用与事实

核对工具读取记录、返回文件和批次 `海风-7319`，再用人工清单检查小陈的日期与广告讨论状态。

答对公开编号只是辅助证据；只有 AI 自述时，不能认定读取已独立确认。文字禁令也不能代替执行权限控制。

## 安全与局限

- 使用练习资料和副本；写工具可能造成持久改动。
- 敏感文件、配置、凭据与密钥不放进授权目录。
- 大目录和长文件可能只返回部分结果，不能自动视为全文分析。
- 停止 Agent 不会自动撤销已经发生的文件操作。

## 什么时候自己做一个 MCP 更合适

业务系统需要按用户身份、对象权限和固定字段读取时，开放整片文件目录可能不合适。可以考虑只暴露少量已授权查询，而不是把所有文件操作都交给模型。

这需要开发、访问控制和维护，见 [[research/analysis/MCP的接入与调用机制|MCP的接入与调用机制]]，不是普通用户必须亲自完成的步骤。

## 相关节点

[[concepts/MCP|MCP]] · [[concepts/AI能看到什么|AI能看到什么]] · [[toolbox/skills/周报整理Skill|周报整理Skill]] · [[tutorials/basics/Agent失败时怎么排查|Agent失败时怎么排查]]
