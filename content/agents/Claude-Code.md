---
title: Claude Code
type: agent
status: growing
tags: [agent, cli, coding]
aliases: [Claude Code CLI]
homepage: https://claude.com/product/claude-code
repo: 
license: 商业
---

# Claude Code

> [!abstract] 一句话定位
> 跑在终端里的编码 [[Agent]]：直接读写你的仓库、执行命令、跑测试，用自然语言驱动整个开发循环。

## 基本信息

| 项目 | 内容 |
| --- | --- |
| 类型 | CLI Agent |
| 开源 | 否（客户端可扩展） |
| 形态 | 终端、IDE 插件、桌面端 |
| 上手难度 | ⭐️ 装完就能用 |
| 上下文来源 | 整个工作目录 + 你给的指令 |

## 解决的问题

把「读代码 → 改代码 → 跑命令 → 看报错 → 再改」这个循环交给 Agent，人只做目标定义和审查。

## 核心能力

| 能力 | 说明 |
| --- | --- |
| 文件读写 | 直接改仓库，改动可 diff 可回滚 |
| 命令执行 | 跑测试、构建、git 操作 |
| 子 Agent | 把探索类任务丢给独立上下文，只回传结论 |
| 项目记忆 | `CLAUDE.md` 沉淀项目约定 |
| 扩展 | Hooks、斜杠命令、Skills、[[MCP]] 接入外部系统 |

## 最小可用用法

```bash
cd your-repo
claude                 # 进入交互
> 帮我按 AGENTS.md 的规范重构 src/utils，改完跑 npm test
```

项目根写一份 `CLAUDE.md`：

```markdown
# 项目约定
- 包管理器用 pnpm
- 提交前必须 `pnpm check`
- 不要改 content/ 下的 md 排版
```

> [!tip] 用好它的关键
> 上下文质量决定产出质量。把项目约定、目录说明、常用命令写进 `CLAUDE.md`，比每次口头解释有效得多——本质是 [[上下文工程]]。

## 优点 / 局限

**优点**

- 与真实仓库和命令打通，不用复制粘贴
- 长任务能自主迭代（改完自己跑测试）
- 扩展机制完整（[[MCP]]、hooks、子 Agent）

**局限**

- 权限模型需要认真配置，否则误操作代价高
- 大型仓库的探索成本高，需要好的检索/索引
- 依赖模型能力，复杂重构仍需人审

## 相关节点

- 概念：[[Agent]]、[[上下文工程]]、[[MCP]]
- 同类：[[Cursor]]
- 用法扩展：[[提示工程]]
