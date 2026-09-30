---
title: 02 · 把工作流程变成 Skill
type: series
kind: series
status: growing
track: guides
audience: non-programmer
difficulty: beginner
tags: [series, skill, track/guides, level/beginner]
series_order: 2
verification: not-applicable
prerequisites: [已完成一次基本 AI 任务]
sequence:
  - tutorials/skills/不写代码创建自己的Skill
  - tutorials/skills/Skill从加载到验证
  - toolbox/skills/周报整理Skill
knowledge_points: [concepts/Skill, concepts/规则与权限]
---

# 02 · 把工作流程变成 Skill

> [!info] 阅读定位
> **系列阅读 · 入门**。先测试工作说明，再决定需不需要原生 Skill。不要求编写脚本。

**目标**：保存稳定要求，并分清“有文件、已安装、本轮加载、结果合格”。先会做一次基本任务即可，不要求读完所有知识点。

## 主线：1 → 2 → 3

[[tutorials/skills/不写代码创建自己的Skill|1 · 保存并测试流程]] → [[tutorials/skills/Skill从加载到验证|2 · 按需导入与检查]] → [[toolbox/skills/周报整理Skill|3 · 换材料验收]]

### 1. 先保存工作说明，不急着安装

读 [[tutorials/skills/不写代码创建自己的Skill|不写代码创建自己的 Skill]]，先完成整理要求和提示模板测试。

**这一站完成**：有一份自己看得懂的流程，包含分类、表头、缺失信息处理与验收标准；测试中不补造事实。

**中途补课**：[[concepts/Skill|Skill]]。确认提示模板、原生技能、工具能力之间的区别，再进入第 2 站。

### 2. 支持原生 Skill 时再导入

读 [[tutorials/skills/Skill从加载到验证|Skill 从加载到验证]]，选择自己的产品分支，分别核对安装与本轮加载。

**这一站完成**：能记录安装、加载、输出三个状态，无法独立确认的状态明确保留为未知。

软件不支持导入时，继续使用提示模板；不要把普通聊天中的说明文件称为已经安装的原生 Skill。

**中途补课**：[[concepts/规则与权限|规则与权限]]。技能里的“不得删除”不是权限锁；新工具或写操作需要另外核对授权。

### 3. 用自建周报示例回归验收

读 [[toolbox/skills/周报整理Skill|自建周报整理 Skill]]，使用其中链接的虚构记录和验收清单，再换一份含缺失信息的材料。

**这一站完成**：能拆开“收集已完成、分类未完成”，不猜负责人、截止日期或预算，并保留失败字段。

Skill 文件结构已检查，不代表在你当前产品和版本中已经加载或生效。

## 按需延伸，不算主线

- 需要处理办公文件：[[toolbox/skills/文档处理Skills|文档处理 Skills]]，先看依赖和许可。
- 结果仍不对：[[tutorials/basics/Agent失败时怎么排查|失败排查]]。
- 想研究为什么加载仍不保证遵循：[[series/04-Agent机制与可靠性|系列 04，技术研究]]。

返回 [[series/index|系列目录]]。没有外部读取需求时，不必接着安装 MCP。
