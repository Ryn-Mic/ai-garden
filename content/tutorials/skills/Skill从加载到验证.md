---
title: Skill 从加载到验证：装好不等于生效
type: tutorial
status: growing
track: guides
audience: non-programmer
difficulty: beginner
tags: [tutorial, skill, track/guides, level/beginner]
prerequisites: []
verification: docs-only
updated: 2026-09-30
aliases: ["tutorials/Skill从加载到验证"]
---

# Skill 从加载到验证：装好不等于生效

> [!info] 阅读定位
> **上手指南 · 入门**。不要求编程。先选自己的产品分支，再做一次小测试；练习约 15～20 分钟。

**目标**：区分“已经安装”和“本次真的使用了”，并创建一份不带程序的工作说明。

**准备**：熟悉 [[tutorials/basics/通用Agent的使用|会议记录练习]]。软件分支按官方文档整理，未在本机逐步实测；不把本文当作所有版本都相同的菜单截图指南。

## 第 1 步：确认软件支持哪种方式

| 软件形态 | 本文采用的方式 | 不能混为一谈 |
| --- | --- | --- |
| WorkBuddy 桌面端 | 技能市场安装、管理已安装技能 | 不套用别的客户端的私有目录 |
| Qoder 桌面端 | Extensions → Skills；支持导入 Skill 文件 | 不套用 Qoder IDE / CLI 的目录和设置 |
| ChatGPT 普通聊天 | 粘贴明确的工作说明作为提示模板 | 不称为原生 Skill 安装 |

一个产品支持 Skills，不代表所有形态、所有账户都采用同一种机制。界面不一致时，先核对官方文档，而不是让 AI 随便猜一个安装路径。

## 第 2 步：安装或提供工作说明

### WorkBuddy：从技能市场安装

先核对版本：官方页面使用 **Skill Marketplace / 技能市场**；本机 5.6.2 主菜单显示的是「专家·技能·连接器」，见 [[tutorials/software/WorkBuddy-Qoder-ChatGPT入门#WorkBuddy：从一个新任务开始|导航截图]]。本轮只观察了主菜单，不能据此推断子页面的按钮位置。

**如果你的版本提供官方技能市场页面**，按文档路径继续：

1. 从对应技能入口进入市场。
2. 搜索与你任务有关的关键词，打开候选技能详情。
3. 阅读作者、版本、描述和所需能力；不清楚风险时先不安装。
4. 点击 **Install / 安装**。
5. 在已安装列表确认目标 Skill 存在且已启用。

**这一阶段的成功证据**：已安装列表里出现目标 Skill。它还不能证明当前任务已加载该 Skill。

找不到对应市场时，先用提示模板，不猜菜单或自定义安装目录。自行保存流程见 [[tutorials/skills/不写代码创建自己的Skill|不写代码创建自己的Skill]]。

### Qoder：安装或导入

1. 在左侧选择 **Extensions / 扩展**，打开 **Skills**。
2. 浏览或搜索技能，打开 **View details / 详情** 看描述与发布者。
3. 选择 **Install / 安装**。
4. 在 **Installed / 已安装** 中确认目标 Skill。

如果你自己创建了下文的纯文字 Skill，官方提供 **Upload Skill**，可以导入 Skill ZIP 或 `SKILL.md` 文件；**Create with Qoder** 则用于引导创建个人 Skill。具体按钮位置以当前版本为准。

**这一阶段的成功证据**：目标 Skill 出现在本设备的已安装列表，而不是只出现在市场搜索结果里。

### ChatGPT：用提示模板完成同类练习

把“工作说明 + 任务材料”一起发在聊天里，或使用账户当前明确支持的持久说明功能。

这可以帮助复用流程，但**不代表应用完成了技能发现、按需加载或脚本执行**。不要为了模仿别的软件，往不明位置复制 `SKILL.md`。

## 第 3 步：在一个明确匹配的任务里使用

不要只测试“你好”，也不要把一份做 PPT 的技能用来查天气。任务应与它的适用描述一致。

若安装的是周报整理 Skill，可以明确发送下面的任务。**把 `weekly-summary` 换成已安装技能的真实名称**；它是下文自建示例，不保证市场中有同名技能：

```text
请使用已安装的 weekly-summary 技能整理下面的练习记录。
负责人和日期缺失时标“待确认”。
请说明依据的是哪些用户材料；如果无法找到这个技能，直接说明。

练习记录：
小林完成报价核对；小陈待整理客户问题，截止日期未确定。
```

Qoder 官方文档还说明，可以通过 `/` 显式选择 Skill；未被推荐时，先检查是否安装、任务是否匹配，再尝试手动选择。

其他产品是否有显式选择入口，以其文档为准。自然语言点名有帮助，但不保证所有应用都将它当作强制加载命令。

## 第 4 步：分别验证三个阶段

| 阶段 | 应检查的证据 | 不能只看什么 |
| --- | --- | --- |
| 安装 / 发现 | 正确设备与范围中的已安装列表 | “下载成功”或 AI 自称已安装 |
| 本轮加载 | 应用提供的技能使用提示、文件读取记录或诊断日志 | 输出里复述了技能名称 |
| 按要求交付 | 对照原文，检查缺失日期、分类和格式 | AI 自称“严格遵循” |

有些应用不展示加载记录。这时可以做输出对照测试，但应该记录为**“输出符合要求，加载过程未独立确认”**，而不是捏造已验证日志。

同一个任务再试两次，确认不是偶然成功。不要把一次成功等同于以后永远不会出错。

## 自己做一个纯文字 Skill

完整流程另写在 [[tutorials/skills/不写代码创建自己的Skill|不写代码创建自己的Skill]]，避免同时维护多份同名、规则不同的示例。

最短路径：

1. 下载 [[tutorials/basics/练习材料与验收|练习包]]，先用里面的工作说明和文字材料测试。
2. 确认需要原生 Skill 后，导入包内 `skills/weekly-summary/SKILL.md`。
3. 按本文的安装、加载、输出三个阶段验收。

这份 [[toolbox/skills/周报整理Skill|自建周报 Skill]] 没有脚本或外部服务，只保存流程与验收规则。当前格式与练习材料已检查，但客户端加载、模型效果未实测。

应用不支持导入时，使用包内 `prompts/weekly-summary.txt` 作为提示模板，不称为原生安装。

## 失败时按这条顺序排查

1. **列表里找不到**：检查产品形态、设备、安装范围、文件格式和导入结果。
2. **列表里有但没使用**：检查适用描述与任务匹配；使用产品支持的显式选择功能。
3. **已使用但输出不对**：给具体反例、验收项和样例；检查是否缺资料或存在冲突要求。
4. **要读文件却没有工具或权限**：解决工具与授权问题；继续改 Skill 的措辞不会凭空产生能力。

深入解释见 [[research/analysis/Skill的加载机制与遵循边界|Skill的加载机制与遵循边界]]。不要用“多写几遍必须”代替这四种检查。

## 参考与相关记录

- [Agent Skills 概览](https://agentskills.io/what-are-skills)、[规范](https://agentskills.io/specification)。
- [WorkBuddy 技能市场](https://www.codebuddy.ai/docs/workbuddy/From-Beginner-to-Expert-Guide/Function-Description/Skills-Market)。
- [Qoder Skills](https://docs.qoder.com/qoder/skills)。
- 选用：[[concepts/Skill|Skill]]、[[toolbox/skills/文档处理Skills|文档处理Skills]]；资料边界：[[concepts/AI能看到什么|AI能看到什么]]。

<!-- series-navigation:start -->
## 系列导航

- **系列 02 · 2/3 站**：下一站 → [[toolbox/skills/周报整理Skill|第 3 站]]；[[series/02-把工作流程变成Skill|查看本系列顺序与补课点]]。
<!-- series-navigation:end -->
