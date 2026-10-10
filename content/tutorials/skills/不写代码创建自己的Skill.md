---
title: 不写代码创建自己的 Skill：把重复要求保存下来
type: tutorial
status: growing
track: guides
audience: non-programmer
difficulty: beginner
tags: [tutorial, skill, workflow, track/guides, level/beginner]
prerequisites: []
verification: docs-only
updated: 2026-09-30
aliases: ["tutorials/不写代码创建自己的Skill"]
---

# 不写代码创建自己的 Skill：把重复要求保存下来

> [!info] 阅读定位
> **上手指南 · 入门**。面向已经用 AI 整理过一次资料的人。不要求编程；练习约 15～25 分钟。

**目标**：把自己的工作要求保存为可复用说明，再决定是否需要安装成原生 Skill。不是一开始就编辑配置文件或编写程序。

**准备**：[[tutorials/basics/练习材料与验收|下载练习包]]。产品操作按官方文档整理，未完成客户端导入实测。

<!-- archify:create-skill:start -->
## 从重复要求到可复用说明

先验证工作说明，再决定是否需要原生 Skill；保留产品分支和证据等级，不编造导入按钮。

<iframe src="assets/diagrams/create-skill.html" width="100%" height="700" loading="lazy" style="border: 1px solid var(--gray); border-radius: 8px; margin: 1rem 0;" title="创建自己的 Skill：先验证规则，再选择安装方式"></iframe>

[单独打开图表](assets/diagrams/create-skill.html)
<!-- archify:create-skill:end -->

## 第 1 步：找出你一直重复纠正的事

先只选一个任务，例如“整理周报”，不要写一个同时负责写文章、发邮件、查账的万能 Skill。

把三条具体要求记下来：

- 讨论中的事项不能算已安排任务。
- 负责人和日期没有写时，要标为待确认。
- 每条事项要保留原文依据，不能编造信息。

**这一阶段的产物**：一份你自己看得懂的规则清单，而不是“你是最优秀的助理”这样的角色口号。

## 第 2 步：让 AI 帮你整理工作说明

新建一个普通聊天，复制：

```text
请把下面这些要求整理成一份“周报整理工作说明”。
先只输出文字，不创建文件、不联网、不安装工具、不发送消息。

适用场景：用户提供工作记录，需要整理成周报或行动清单。
工作要求：
- 区分已完成、待办、风险和待确认。
- 同一事项不同阶段分开，例如已收集但还没分类。
- 负责人和日期只能来自原文，缺失时标“待确认”。
- 输出：分类 / 事项 / 负责人 / 日期 / 原文依据。
- 单独列出缺少的信息，不补造事实。

请按“什么时候用、怎样做、不能做什么、怎样验收”四部分整理。
```

**你应看到**：一份结构清楚的说明。先读它有没有偷偷增加“联网补齐日期”“自动分配负责人”等你没要求的行为。

如果不想从空白开始，直接用练习包中的 `prompts/weekly-summary.txt`，或看 [[toolbox/skills/周报整理Skill|周报整理Skill]]。

## 第 3 步：先当提示模板测试，不急着安装

把工作说明和 `materials/weekly-work.txt` 一起发到新聊天。

```text
请按这份工作说明整理下面的记录。
只用提供的材料；缺失信息标“待确认”。
```

**验收**：对照练习包里的 `expected/weekly-work-check.txt`。

重点看：小陈的“收集已完成”和“分类未完成”是否拆开，预算是否保持未提供，小周的日期是否被猜出来。

规则不清楚时，先改规则；原始资料没有给出的事实，不能靠改规则补出来。至少再换一份材料复试。

## 第 4 步：确认需要原生 Skill，再选择产品分支

### Qoder 桌面端：导入现成纯文字 Skill

1. 解压练习包，找到 `skills/weekly-summary/SKILL.md`。
2. 在 Qoder 左侧打开 **Extensions → Skills**。
3. 使用 **Upload Skill**，选择这个 `SKILL.md` 文件。
4. 在已安装列表核对名称 `weekly-summary`。

官方也提供 **Create with Qoder**，引导创建个人 Skill。若走这条路线，把已测试的工作说明交给它，并要求仅做纯文字 Skill，不增加脚本或外部工具。

**注意**：本文未核对这些按钮在当前账户里的具体排布；以官方说明和实际界面为准。安装成功后还要做第 5 步。

### WorkBuddy：不要猜一个自定义目录

本机观察到 5.6.2 左侧有「专家·技能·连接器」入口，见 [[tutorials/software/WorkBuddy-Qoder-ChatGPT入门#WorkBuddy：从一个新任务开始|菜单截图]]；这只核对了主菜单，没有核对自定义导入页面。

如果你的版本提供创建或导入 Skill 的官方功能，按它的说明操作。**本文不编造自定义导入按钮或安装目录。** 没有确认对应功能时，先用已经测试过的提示模板。

### ChatGPT 普通聊天：使用工作说明，不称为安装

将工作说明和材料一起提供即可复用流程。是否可以保存到项目说明等位置，取决于账户当前功能；不要把上传一个文件等同于原生 Skill 安装。

## 第 5 步：区分安装成功和本次使用

在支持原生 Skill 的产品中，用它支持的方式显式选择 `weekly-summary`，再提供同一份周报记录。

- **安装证据**：列表中存在正确名称。
- **加载证据**：应用展示的技能使用提示、读取记录或诊断信息。
- **效果证据**：输出通过原文验收。

看不到加载记录时，写“输出符合要求，加载未独立确认”，不要用 AI 的自我声明替代证据。具体检查见 [[tutorials/skills/Skill从加载到验证|Skill从加载到验证]]。

## 怎样改成自己的 Skill

**保留流程，替换要求；每次任务的事实另行提供。**

| 适合放进 Skill 的稳定要求 | 应在每次任务中提供的材料 |
| --- | --- |
| 表头、分类、引用要求、缺失信息处理 | 这周做了什么、客户反馈、日期和负责人 |
| 执行边界与验收清单 | 本次输入文件和期望输出位置 |

不要把密钥、真实客户清单或整段公司资料写进 Skill。Skill 也不是永久训练模型；改变说明后，要确认应用加载的是新版本并重新测试。

## 安全边界

纯文字 Skill 不带程序，但里面的要求仍可能诱导应用调用已有工具。安装外部 Skill 前检查来源、脚本和权限；聊天中的“不得删除”不能替代应用侧的限制。

## 参考与下一步

- [Agent Skills 规范](https://agentskills.io/specification)。
- [Qoder Skills](https://docs.qoder.com/qoder/skills)、[自定义扩展说明](https://docs.qoder.com/qoder/extension-publishing)。
- [[toolbox/skills/周报整理Skill|周报整理Skill]]、[[tutorials/skills/Skill从加载到验证|Skill从加载到验证]]、[[tutorials/basics/Agent失败时怎么排查|Agent失败时怎么排查]]。

<!-- series-navigation:start -->
## 系列导航

- **系列 02 · 1/3 站**：下一站 → [[tutorials/skills/Skill从加载到验证|第 2 站]]；[[series/02-把工作流程变成Skill|查看本系列顺序与补课点]]。
<!-- series-navigation:end -->
