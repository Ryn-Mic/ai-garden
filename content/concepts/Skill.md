---
title: Skill
type: concept
status: seedling
tags: [concept, agent, skill]
aliases: [Agent Skill, 技能包, Skills]
---

# Skill

> [!abstract] 一句话定义
> 给 Agent 的一本「业务操作手册」：一个装着指令、步骤和参考资料的文件夹，Agent 遇到某类活时才翻开它、照着做。

## 为什么重要

接上 [[MCP]] 之后，Agent 有了手——能搜索、能读文件、能调 API。但有了手，不等于会做事的章法：

- 同一套工具，老手和新手做出来的结果天差地别。差的从来不是工具，是**流程和经验**；
- 而这些经验如果全塞进系统提示词，每个任务的"章法"动辄几千字，上下文立刻爆掉（见 [[上下文工程]]）。

Skill 解决的就是这两件事：**把"某类任务怎么干好"写成一份可复用的手册，按需加载**——用到才翻开，平时不占地方。

## 一个 Skill 长什么样

本质是一个文件夹，核心是一份 `SKILL.md`（YAML 头 + Markdown 正文）：

```text
my-skill/
├── SKILL.md      # 手册正文：什么时候用、怎么做、注意事项
├── reference.md  # 可选：更细的参考资料
└── scripts/      # 可选：配套脚本
```

SKILL.md 里通常写三件事：

1. **什么时候翻开我**（description）——一句话，Agent 靠它判断当前任务要不要用这份手册。这句写不好，手册再好也永远不会被翻开；
2. **照着怎么做**——分步骤的操作流程、约束、好例子和坏例子；
3. **需要细节去哪找**（references）——标出更深的参考文档，做到那一步才读。

## 核心机制：按需加载

Skill 最关键的设计是**渐进式披露**（progressive disclosure），分三层：

1. 平时，上下文里只有每份 Skill 的"标题 + 一句话简介"，成本极低；
2. Agent 判断当前任务匹配某个 Skill → 才把整份手册加载进来；
3. 手册里引用的 references，做到那一步才读。

这正是 [[上下文工程]] 的典型实践：工作台上只放现在用得着的东西，其余全在书架上待命。

## 举个具体的例子

一份"做幻灯片"的 Skill 大概是：

- **description**：当用户要求制作 PPT 或幻灯片时使用；
- **正文**：先和用户对齐大纲 → 确定受众和时长 → 每页只讲一个论点 → 图表优先于文字 → 交付前自查字号；
- **references**：配色方案表、版式模板库。

平时 Agent 完全"不知道"这份手册的存在，只占一句话的上下文。一旦你说"帮我做个 PPT"，它把手册翻开，从此不再需要你每次重复交代"先对齐大纲再动手"。

## 三条扩展路线的分工

| | 给 Agent 的是什么 | 类比 | 例子 |
| --- | --- | --- | --- |
| [[MCP]] | 新**能力**（工具、数据源） | 给机器人接一双手 | 接数据库、接浏览器 |
| Skill | 新**章法**（流程、经验） | 发给实习生一本 SOP 手册 | "做 PPT 前先对齐大纲" |
| [[RAG]] | 新**事实**（资料、知识） | 往档案柜里存文件 | 产品手册、公司制度 |

> [!tip] 一句话记
> **MCP 管「能干什么」，Skill 管「怎么干好」，RAG 管「依据是什么」**。

## 去哪找现成的 Skill

Skill 的格式（SKILL.md）是开放的：Claude Code、Codex、Gemini CLI、Cursor、GitHub Copilot 等主流客户端读的都是同一套结构，所以生态里已经积累了大量现成的手册。先逛这几个地方：

| 站点 | 是什么 | 适合 |
| --- | --- | --- |
| [skills.sh](https://skills.sh) | Agent Skills 社区目录，支持一条命令安装，跨 11 种客户端 | 快速试装热门 Skill |
| [awesomeskill.ai](https://awesomeskill.ai) | 聚合 GitHub 上的 SKILL.md，按 star 排行、按分类浏览 | 按领域淘 Skill |
| [awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills) | GitHub 上的 Awesome 清单，1000+ 官方与社区 Skill | 系统性检索 |
| [agentskillshub.dev](https://agentskillshub.dev) | 带安全扫描的 Skill + MCP 目录 | 关注供应链安全时 |
| [anthropics/skills](https://github.com/anthropics/skills) | Anthropic 官方仓库 | 文档处理类起步 |

厂商官方仓库也值得直接去翻：Vercel、obra、各家公司都在给自己的产品出配套 Skill。遇到「Agent 用不好某工具」时，先看工具方有没有出官方 Skill。

### 常用 Skill 推荐

按用途分四类，都是社区里经过大量验证的：

**方法论类（改变 Agent 的工作方式）**
- **superpowers**（obra/superpowers）——社区头牌。装上后 Agent 不再「上来就写代码」：先头脑风暴对齐需求 → 写规格文档 → TDD 循环开发 → 系统化调试与代码审查
- **planning-with-files**——Manus 风格的文件化计划：复杂任务开始时先建 task_plan.md / findings.md / progress.md，长任务不跑偏

**能力类（接上某个具体工具）**
- **agent-browser**（Vercel）——给 Agent 一个真浏览器：导航、填表、点击、截图、抓数据
- **文档处理四件套**（Anthropic 官方）——docx / pptx / xlsx / pdf 的创建与编辑

**质量类（审查与约束）**
- **web-design-guidelines**（Vercel）——按 Web Interface Guidelines 审查 UI 代码：可访问性、交互细节
- **react-best-practices / tailwind-design-system**——前端代码规范与设计系统约束

**元技能类**
- **find-skills**——教 Agent 自己去发现并安装需要的 Skill：「有没有 skill 能做 X？」

> [!tip] 别贪多
> 每装一个 Skill，它的 description 就常驻上下文。装太多不但占地方，还会互相抢触发。从 3～5 个高频用到的开始，遇到重复纠正的问题再补。

挑选时看三件事：**更新时间**（半年不更新的慎装）、**来源**（优先官方与知名组织）、**star 与装机量**（社区验证过）。

## 相关节点

- 宿主：[[Agent]]
- 姊妹篇：[[MCP]]（接工具）、[[RAG]]（喂知识）
- 机制基础：[[提示工程]]、[[上下文工程]]

## 参考

- Anthropic：Agent Skills 文档（2025）
- Claude Code 等客户端的 skills 目录即此机制的落地
