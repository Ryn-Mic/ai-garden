---
title: 自建周报整理 Skill：让流程可复用、结果可核对
type: tool-note
status: growing
track: toolbox
audience: non-programmer
difficulty: beginner
tags: [tool, skill, workflow, track/toolbox, level/beginner]
verification: docs-only
updated: 2026-09-30
aliases: ["toolbox/周报整理Skill"]
---

# 自建周报整理 Skill：让流程可复用、结果可核对

> [!info] 阅读定位
> **工具箱 · 入门**。这是本库自行创建的纯文字 Skill 示例，不带脚本。作用是保存工作要求，不是提供新工具或训练模型。

## 为什么自己做这一份

整理周报时容易重复纠正同样的问题：没有日期就补一个、把讨论写成决定、把完成一个阶段写成整项完成。

这份 Skill 把这些要求保存为明确流程，适合有固定交付习惯的人。偶尔用一次时，直接粘贴工作说明即可，不必安装。

## 来源与验证范围

| 项目 | 记录 |
| --- | --- |
| 名称 | `weekly-summary` |
| 来源 | AI Garden 自建示例，按 Agent Skills 格式编写 |
| 内容 | 工作步骤、输出表头、缺失信息规则、验收项 |
| 依赖 | 无附带脚本或外部服务；原生安装需要客户端支持 |
| 证据 | 文件格式、练习包结构与材料一致性已检查；未完成客户端加载或模型效果实测 |

**[[assets/examples/agent-practice.zip|下载含 Skill 的练习包]]**。解压后，Skill 文件在 `skills/weekly-summary/SKILL.md`。不用安装时，使用 `prompts/weekly-summary.txt`。

不要把公开的 [[assets/examples/weekly-summary-source.txt|源码预览文本]] 直接当作已安装 Skill；它用于阅读和维护，导入时应使用包内正确命名的 `SKILL.md`。

## 它保存了哪些经验

- 已完成、待办、风险、待确认分开。
- 同一个事项的阶段分开，例如“已收集、未分类”。
- 负责人和日期来自原文，缺失标待确认。
- 每条事项保留原文依据，缺少的关键信息单独列出。
- 不联网补造事实，不发送消息，不覆盖原始材料。

最后一条是工作规则，真正的网络和写权限仍需应用侧控制。

<!-- archify:weekly-summary:start -->
### 周报内容怎样形成可核对记录

分类、阶段、日期和原文依据分别提取；不能把某阶段的截止日期套给整个事项。

<iframe src="assets/diagrams/weekly-summary.html" width="100%" height="700" loading="lazy" style="border: 1px solid var(--gray); border-radius: 8px; margin: 1rem 0;" title="周报整理：事实提取、阶段拆分与缺失标记"></iframe>

[单独打开图表](assets/diagrams/weekly-summary.html)
<!-- archify:weekly-summary:end -->

## 一个能暴露问题的例子

原始记录：

> 小陈已经收集客户问题，但还没有分类；6 月 12 日提交分类初稿。记录没有说明收集工作的完成日期。

应拆成：

| 分类 | 事项 | 负责人 | 日期 | 依据 |
| --- | --- | --- | --- | --- |
| 已完成 | 收集客户问题 | 小陈 | 待确认 | 已经收集；没有说明完成日期 |
| 待办 | 客户问题分类初稿 | 小陈 | 6 月 12 日 | 还没有分类；6 月 12 日提交初稿 |

这是**验收示例，不是一次实际模型输出**。不能把第二行截止日期套给第一行，也不能写成客户问题整理全部完成。

## 怎样试用

1. 用 [[tutorials/skills/不写代码创建自己的Skill|不写代码创建自己的Skill]] 选择提示模板或原生 Skill 分支。
2. 提供练习包里的 `materials/weekly-work.txt`。
3. 对照 `expected/weekly-work-check.txt` 验收。
4. 换一份含缺失信息的记录复试，保存仍需纠正的字段。

安装是否成功、本轮是否加载、输出是否合格分别记录，见 [[tutorials/skills/Skill从加载到验证|Skill从加载到验证]]。

## 怎样改成自己的版本

先修改稳定规则，例如表头、分类和引用要求，再替换每次任务的材料。不要把真实人员清单、预算或客户资料写进可复用技能。

一旦修改规则，用旧的失败样例回归检查。名字不变不代表应用已经加载最新文件；要核对更新后的内容和加载状态。

## 不适合什么

- 自动补齐记录没有提供的事实。
- 保证所有输出正确或所有规则永不违反。
- 自动取得文件、邮件或数据库权限。
- 替代岗位责任、审批或人工事实核对。

## 相关节点与依据

[[concepts/Skill|Skill]] · [[tutorials/skills/不写代码创建自己的Skill|不写代码创建自己的Skill]] · [[tutorials/basics/练习材料与验收|练习材料与验收]] · [[tutorials/basics/Agent失败时怎么排查|Agent失败时怎么排查]]

格式依据：[Agent Skills 规范](https://agentskills.io/specification)。内容是本库自建工作流程，不冒充厂商官方技能。

<!-- series-navigation:start -->
## 系列导航

- **系列 02 · 3/3 站**：主线完成 → [[series/02-把工作流程变成Skill|回到本系列验收与按需延伸]]。
<!-- series-navigation:end -->
