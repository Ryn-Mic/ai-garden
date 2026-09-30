---
title: 03 · 连接外部工具 MCP
type: series
kind: series
status: growing
track: guides
audience: practitioner
difficulty: intermediate
tags: [series, mcp, track/guides, level/intermediate]
series_order: 3
verification: not-applicable
prerequisites: [已有明确的外部读取需求, 支持 MCP 的客户端, 运行环境已准备]
sequence:
  - toolbox/mcp/网页读取MCP
  - 'tutorials/mcp/MCP从接入到验收#第 1 步：打开自定义连接入口'
  - 'tutorials/mcp/MCP从接入到验收#第 4 步：用公开网页做小测试'
knowledge_points: [concepts/MCP, concepts/规则与权限]
---

# 03 · 连接外部工具 MCP

> [!info] 阅读定位
> **系列阅读 · 进阶使用**。有实际需求再学；客户端、运行环境与权限需要事先准备。不是第一次聊天后的必修。

**目标**：接入一个公开网页读取能力，按证据区分配置、工具发现、调用和交付。产品步骤按官方文档整理，未完成客户端实测。

## 开始前补两个知识点

- [[concepts/MCP|MCP]]：连接外部能力，不是把网页永久训练进模型。
- [[concepts/规则与权限|规则与权限]]：提示语、执行审批与访问控制不能混为一谈。

缺少依赖安装经验时，找技术协作者准备环境；可以先手动提供网页正文，不必硬走配置流程。

## 主线：1 → 2 → 3

[[toolbox/mcp/网页读取MCP|1 · 判断是否需要]] → [[tutorials/mcp/MCP从接入到验收#第 1 步：打开自定义连接入口|2 · 接入并发现工具]] → [[tutorials/mcp/MCP从接入到验收#第 4 步：用公开网页做小测试|3 · 调用与验收]]

### 1. 确认需要哪一种能力

读 [[toolbox/mcp/网页读取MCP|网页读取 MCP]]，比较它与应用已有浏览、搜索功能的区别。

**这一站完成**：能说明为什么需要 Fetch，或者判断现有功能足够并停止安装。避免重复叠加工具。

### 2. 接入服务，先取得工具列表

按 [[tutorials/mcp/MCP从接入到验收#第 1 步：打开自定义连接入口|接入教程的第 1～3 步]] 配置与检查，不先反复让 AI 查网页。

**这一站完成**：客户端可以通信，当前任务取得目标服务提供的工具；保存配置或市场能搜到服务都不够。

若失败，先处理环境、参数、传输或日志中明确的错误。没有查清原因时不换成来历不明的下载命令。

### 3. 执行一次小调用，检查真实结果

按 [[tutorials/mcp/MCP从接入到验收#第 4 步：用公开网页做小测试|接入教程的第 4～5 步]] 获取公开测试网页，核对实际服务、URL、调用记录和返回正文。

**这一站完成**：四层证据可说明；看不到调用记录时保留“调用未独立确认”，不凭模型答对标题判定成功。

## 下一种能力不是默认下一课

- 真正需要目录操作时，再读 [[toolbox/mcp/文件系统MCP|文件系统 MCP]]；有效范围不等于只读权限。
- 普通失败先用 [[tutorials/basics/Agent失败时怎么排查|失败排查]]。
- 需要自己开发或研究调用机制，再走 [[series/04-Agent机制与可靠性|系列 04]]。

测试后停用不需要的连接。返回 [[series/index|系列目录]]。
