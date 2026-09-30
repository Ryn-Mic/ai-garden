---
title: Skill
type: concept
status: growing
track: toolbox
audience: non-programmer
difficulty: beginner
tags: [concept, agent, skill, track/toolbox, level/beginner]
aliases: [Agent Skill, 技能包, Skills]
---

# Skill

> [!info] 阅读定位
> **工具箱 · 入门**。不要求编程。本文帮你判断 Skill 有没有用；具体加载步骤见 [[tutorials/skills/Skill从加载到验证|Skill从加载到验证]]，技术机制另见 [[research/analysis/Skill的加载机制与遵循边界|Skill的加载机制与遵循边界]]。

## 先看一个你可能遇到的问题

你每周让 AI 整理周报，每次都要重复交代：

> 按「完成事项、待办、风险」分类。负责人和日期必须来自原文；没有写就标为待确认。不要把建议写成已经完成的工作。

这段要求就是可以沉淀成 Skill 的经验。以后做同类任务时，让应用找到并加载它，可以减少重复交代和格式漂移。

**Skill 像一份可复用的工作说明书，不是换了一个更聪明的模型。**

## 它里面有什么

采用 Agent Skills 格式的 Skill 通常是一个文件夹：

```text
weekly-summary/
├── SKILL.md       ← 名称、适用场景和工作步骤
├── references/    ← 可选：参考说明
├── assets/        ← 可选：模板
└── scripts/       ← 可选：要执行的程序
```

你先记住两件事：

- **简介**告诉应用或 Agent「什么时候考虑用它」。
- **正文**告诉 Agent「这类任务怎样完成、怎样验收」。

普通用户可以从只有一份 `SKILL.md` 的 Skill 开始，不需要编程。但来自别人、带脚本的 Skill 可能会执行程序，不能因为它叫“说明书”就忽略风险。

## 哪些情况值得用

| 你遇到的情况 | 是否值得先试 Skill |
| --- | --- |
| 每周按固定要求整理资料、写报告 | 值得：把稳定的流程保存下来 |
| 每次修改都在纠正同样的格式或遗漏 | 值得：把纠正变成明确规则和验收项 |
| 只是偶尔问一次问题 | 通常不用：直接发要求更简单 |
| AI 无法读取网页或没有数据库权限 | Skill 本身不能解决：需要已有工具或 [[concepts/MCP|MCP]] 接入 |
| AI 经常编造信息 | 不能靠安装 Skill 保证消除：仍要提供证据并核对 |

## 安装之后，实际发生了什么

支持这套机制的应用通常先发现 Skill 的名称和简介，再按任务需要加载正文；附带资料不一定同时全部加载。

**安装成功 ≠ 本轮已加载 ≠ 输出一定符合要求。** 不同产品的扫描范围、触发方式和权限策略也不同。

如果应用不支持 Agent Skills，把说明贴在聊天里仍有帮助，但这是“提供提示模板”，不等于完成了原生 Skill 安装。

## 从哪里找

先看你正在使用的应用是否有官方技能市场或安装文档，再看来源仓库：

- [Anthropic 官方 Skills 仓库](https://github.com/anthropics/skills)：包含文档处理等示例，见 [[toolbox/skills/文档处理Skills|文档处理Skills]]。
- [skills.sh](https://skills.sh)：社区发现入口；收录不等于官方审核或适合你的软件。
- 应用自己的市场：例如 WorkBuddy 的技能市场、Qoder 的 Skills 页面，操作见 [[tutorials/skills/Skill从加载到验证|Skill从加载到验证]]。

挑选时看**作者、实际步骤、附带程序、权限和维护记录**。Star、下载量只能帮助发现，不能代替安全审查和自己的试用。

## 自己写一个能解决什么

最适合写的是你已经重复确认过的工作规则，而不是一句「你是专家」。例如：

- 客户反馈按产品、问题、影响、证据整理。
- 每条会议待办都保留负责人、截止日期和原文依据。
- 报告必须区分事实、推断和待确认的信息。

见 [[tutorials/skills/Skill从加载到验证#自己做一个纯文字 Skill|创建纯文字 Skill 的练习]]。先用测试材料检验三次，再逐步增加要求。

## 边界：它不是强制执行器

写「必须」可以表达要求，却不能保证模型绝不违反。涉及删除、外发、支付或敏感资料，必须依靠**应用权限、审批和人工验收**，不能只靠 Skill 中的禁止语句。

选择能力扩展时记住：[[concepts/MCP|MCP]] 接外部工具，Skill 保存做事流程，[[concepts/RAG|RAG]] 提供检索到的资料。三者可以协作，不互相替代。

## 相关节点与参考

- 使用：[[tutorials/skills/Skill从加载到验证|Skill从加载到验证]]、[[toolbox/skills/文档处理Skills|文档处理Skills]]。
- 理解边界：[[concepts/AI能看到什么|AI能看到什么]]、[[research/analysis/Skill的加载机制与遵循边界|Skill的加载机制与遵循边界]]。
- 格式依据：[Agent Skills 概览](https://agentskills.io/what-are-skills)、[规范](https://agentskills.io/specification)。本文说明通用机制，不承诺所有客户端行为完全一致。

<!-- series-navigation:start -->
## 系列导航

同一正文被多条路线或不同章节引用时，按你当前所在的系列与站点继续。

- **系列 02 · 中途知识点**：理解后回到 [[series/02-把工作流程变成Skill|本系列当前站]]。
- **系列 04 · 中途知识点**：理解后回到 [[series/04-Agent机制与可靠性|本系列当前站]]。
<!-- series-navigation:end -->
