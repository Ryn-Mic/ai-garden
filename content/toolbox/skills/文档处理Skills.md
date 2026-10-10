---
title: 文档处理 Skills：Word、Excel、PPT 的作用与边界
type: tool-note
status: growing
track: toolbox
audience: non-programmer
difficulty: beginner
tags: [tool, skill, documents, track/toolbox, level/beginner]
verification: docs-only
updated: 2026-09-30
aliases: ["toolbox/文档处理Skills"]
---

# 文档处理 Skills：Word、Excel、PPT 的作用与边界

> [!info] 阅读定位
> **工具箱 · 入门**。介绍用途和选用条件，不要求编程；带脚本的安装与运行依赖按所用应用另行确认。

## 这条记录推荐什么

[Anthropic 官方 Skills 仓库](https://github.com/anthropics/skills) 中的 `docx`、`xlsx`、`pptx` 等文档处理 Skill。

**作用**：把文档处理要求、步骤、配套脚本和检查方法打包给支持的 Agent，帮助完成文件工作，而不只是生成一段可以复制的文字。

**证据等级**：官方资料整理，未在本库跨产品逐项实测。官方仓库介绍这些文档能力在 Claude 产品中的应用，不能据此推断任意客户端安装后都有同样效果。

## 它适合解决什么

| Skill | 你可能提出的任务 | 交付后重点检查 |
| --- | --- | --- |
| `docx` | 把会议纪要整理成带标题、表格的 Word 文档 | 文件能打开；内容、分页、表格与原文一致 |
| `xlsx` | 把散乱的数据整理为工作簿，增加计算与格式 | 数据没有漏行；公式和计算值正确 |
| `pptx` | 把已确认的材料做成演示文稿 | 没有文字溢出；图表和来源正确；讲述顺序清楚 |

另有 `pdf` 等能力，但 PDF、Word、Excel、PPT 不是同一种文件格式，不应把一份 Skill 当作全部格式的通用保证。

## 什么时候值得用

- 经常需要交付**实际文件**，而不是只要一段文字。
- 文件有版式、表格、公式或编辑要求，需要稳定的处理流程。
- 你的应用可以读取或生成文件，并具备该 Skill 所需的运行环境。

**不一定要安装**：如果应用已经自带文件生成能力，先直接测试。能通过验收时，不必再重复配置相似能力。

## 安装前要确认什么

1. **支持方式**：所用客户端是否支持 Agent Skills；商店同名技能是否真的来自官方仓库。
2. **运行能力**：Skill 可能带程序并依赖软件包；纯聊天入口不能自动变成文件处理环境。
3. **文件范围**：先处理副本，输出到新位置，不覆盖原文件。
4. **许可**：仓库中部分示例为开放许可，但文档处理技能标为 source-available；商用、修改与分发须看各目录的具体许可，不把整个仓库都称为 Apache 开源。

安装与加载验证见 [[tutorials/skills/Skill从加载到验证|Skill从加载到验证]]。若需要额外终端配置而你不熟悉，先使用应用已有的文件能力或找技术协作。

<!-- archify:document-skill-check:start -->
### 从格式选择到实际文件验收

Word、Excel、PPT 各有运行依赖和验收项；实际打开文件，而不只看聊天里的完成声明。

<iframe src="assets/diagrams/document-skill-check.html" width="100%" height="700" loading="lazy" style="border: 1px solid var(--gray); border-radius: 8px; margin: 1rem 0;" title="文档处理 Skill：交付的是可打开、可检查的文件"></iframe>

[单独打开图表](assets/diagrams/document-skill-check.html)
<!-- archify:document-skill-check:end -->

## 一次最小试用

用一段非敏感的测试纪要，要求：

```text
请把这份练习纪要生成 Word 文档副本：
包含标题、行动清单表格、待确认事项。
不得补造负责人和日期，不覆盖原文件。
生成后说明输出文件在哪里、哪些信息仍需确认。
```

把练习材料一起提供，不能只发这段要求。

**验收**：打开实际文件，核对内容，再检查版式。聊天里说“已生成”，或给出一个不可用的下载入口，不算完成。

试 Excel 时增加公式和空值样例；试 PPT 时实际查看每页，不只读它的文字摘要。不同格式使用各自的验收清单。

## 局限与安全

Skill 不保证信息正确、公式正确或排版始终完美。处理敏感文件时仍要确认数据是否送到远程模型，以及附带脚本可能读写哪些文件。

记录试用结果时，写下产品形态、Skill 来源版本、测试文件和失败样例，再把证据等级从“资料整理”提升为对应环境下的“实测”。

## 相关节点与来源

- [[concepts/Skill|Skill]]、[[tutorials/skills/Skill从加载到验证|Skill从加载到验证]]、[[concepts/AI能看到什么|AI能看到什么]]。
- [官方仓库说明](https://github.com/anthropics/skills#readme)。
- [docx](https://github.com/anthropics/skills/tree/main/skills/docx)、[xlsx](https://github.com/anthropics/skills/tree/main/skills/xlsx)、[pptx](https://github.com/anthropics/skills/tree/main/skills/pptx)。
