---
title: Obsidian 配置指南
type: tutorial
status: growing
tags: [tutorial, obsidian]
difficulty: beginner
prerequisites: []
---

# Obsidian 配置指南

> [!info] 目标
> 让 Obsidian 直接打开本仓库的 `content/` 目录，并且设置与 Quartz 完全对齐。

**预计耗时**：10 分钟

## 步骤

### 1. 用 Obsidian 打开 Vault

Obsidian → **Open folder as vault** → 选择本仓库的 `content/` 目录。

> [!warning] 不要打开仓库根目录
> 根目录是 Quartz 工程（有 `quartz/`、`node_modules/`），打开它会让 Obsidian 索引整个框架源码。**只打开 `content/`**。

### 2. 确认关键设置

仓库里已经带好了 `.obsidian/` 配置，正常打开就生效。核对这几项（Settings → Files & Links）：

| 设置 | 值 | 为什么 |
| --- | --- | --- |
| New link format | `Shortest path when possible` | 对应 Quartz 的 `markdownLinkResolution: "shortest"` |
| Use Wikilinks | 开启 | Quartz 原生支持 `[[双链]]` |
| Automatically update internal links | 开启 | 改文件名不炸链 |
| Default location for new attachments | `In subfolder under current folder` → `assets` | 图片统一进 `content/assets/` |

模板设置（Settings → Templates）：

```text
Template folder location: templates
```

### 3. 用模板建笔记

`Cmd/Ctrl + P` → **Insert template** → 选 `概念` / `Agent工具` / `教程` / `对比` / `项目` / `资料`。

新笔记放到对应文件夹，例如新概念放 `concepts/`。

### 4. 看图谱

`Cmd/Ctrl + G` 打开图谱视图。仓库里的 `graph.json` 已经按文件夹配色：

| 文件夹 | 颜色 |
| --- | --- |
| `concepts/` | 蓝 |
| `agents/` | 橙 |
| `tutorials/` | 绿 |
| `comparisons/` | 黄 |
| `projects/` | 紫 |
| `resources/` | 灰 |

配色组可以自己改：图谱视图 → 设置 → Groups。

### 5. 写作约定

**YAML frontmatter**（必须有，Quartz 靠它显示标题和描述）：

```yaml
---
title: 笔记标题
description: 一句话摘要（用于 SEO 和分享卡片）
tags: [concept, rag]
---
```

**链接**：一律用 `[[双链]]`，别写死路径：

```markdown
✅ [[RAG]]                    最短路径，改名后自动更新
✅ [[RAG|检索增强生成]]        带显示文本
❌ [RAG](/concepts/RAG)       站内绝对路径，改目录就炸
```

**状态标记**：`status: seedling` → `growing` → `evergreen`，对应首页里的说明。

**Callout**（Quartz 支持渲染）：

```markdown
> [!tip] 提示
> [!warning] 警告
> [!abstract] 摘要
```

## 验证清单

- [ ] Obsidian 里 `Cmd/Ctrl+G` 能看到彩色图谱
- [ ] `Cmd/Ctrl+P` 能搜到 `Insert template`
- [ ] 插图后图片落在 `content/assets/`
- [ ] 点 `[[RAG]]` 能跳转，不是"未创建"

## 常见坑

> [!warning] 踩坑记录
> - **链接在 Quartz 上变红**：Obsidian 用了绝对路径（`/concepts/RAG`），改成 `[[RAG]]`。
> - **文件名带空格**：URL 会变成 `%20` 或连字符，尽量用中文连写或 `-` 连接，例如 `Claude-Code.md`。
> - **`templates/` 被发布**：本仓库的 `quartz.config.ts` 已在 `ignorePatterns` 里排除 `templates`、`.obsidian`、`private`。如果改了要同步。
> - **`.obsidian/workspace.json` 被提交**：它记录当前打开的标签页，属于个人状态，已加进 `.gitignore`。

## 相关节点

- 下一步：[[Quartz部署指南]]
- 项目：[[ai-garden]]
- 写作方法：[[提示工程]]（把"给谁读"想清楚再写）

## 参考

- Obsidian 官方帮助：https://help.obsidian.md
