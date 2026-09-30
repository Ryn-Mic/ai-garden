---
title: Obsidian 配置指南
type: tutorial
status: growing
track: meta
audience: maintainer
tags: [tutorial, obsidian, track/meta, level/beginner]
difficulty: beginner
prerequisites: []
aliases: ["tutorials/Obsidian配置指南"]
---

# Obsidian 配置指南

> [!info] 阅读定位
> **站点维护 · 入门**。面向本站作者与维护者；这是写作软件设置，不是 AI 使用教程。

> [!info] 目标
> 让 Obsidian 直接打开本仓库的 `content/` 目录，并且设置与 Quartz 完全对齐。

**预计耗时**：10 分钟

## 步骤

### 1. 打开 Vault

**iPhone / iPad / Mac（推荐）**：vault 本体在 iCloud 里，Obsidian 直接打开这个目录，不用克隆：

```text
~/Library/Mobile Documents/iCloud~md~obsidian/Documents/ai-garden
```

**没有 iCloud 的机器**：把写作仓库 clone 下来，Obsidian 打开**仓库根目录**。

```bash
git clone https://gitee.com/MeverikC/ai-garden-contents.git ai-garden-vault
```

**要跑构建的机器**：Obsidian → **Open folder as vault** → 选站点仓库的 `content/` 目录。

> [!warning] 不要打开站点仓库根目录
> 根目录是 Quartz 工程（有 `quartz/`、`node_modules/`），打开它会让 Obsidian 索引整个框架源码。

两个仓库的关系和同步机制见 [[maintenance/ai-garden|ai-garden]]。

### 2. 确认关键设置

仓库里已经带好了 `.obsidian/` 配置，正常打开就生效。核对这几项（Settings → Files & Links）：

| 设置 | 值 | 为什么 |
| --- | --- | --- |
| New link format | `Absolute path in vault` | 对应 Quartz 的 `markdownLinkResolution: "absolute"`；完整 Vault 路径避免旧路径别名与同名文件歧义 |
| Use Wikilinks | 开启 | Quartz 原生支持 `[[双链]]` |
| Automatically update internal links | 开启 | 改文件名不炸链 |
| Default location for new attachments | `In subfolder under current folder` → `assets` | 图片统一进 `content/assets/` |

模板设置（Settings → Templates）：

```text
Template folder location: templates
```

### 3. 用模板建笔记

`Cmd/Ctrl + P` → **Insert template** → 按文章类型选模板。普通用户教程用 `教程`，工具记录用 `Skill-MCP记录`；阅读路线用新增的 `系列` 模板。

正文放到对应类型目录，例如知识点放 `concepts/`，Skill 记录放 `toolbox/skills/`。系列放 `series/`，只引用正文，不复制成另一篇。

### 4. 看图谱

`Cmd/Ctrl + G` 打开图谱视图。仓库里的 `graph.json` 已经按文件夹配色：

| 文件夹 | 颜色 |
| --- | --- |
| `concepts/` | 蓝 |
| `toolbox/` | 橙 |
| `tutorials/` | 绿 |
| `research/` | 黄 |
| `series/` | 紫 |
| `maintenance/` | 灰 |

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

**链接**：使用从 Vault 根开始的完整双链路径，不加开头的 `/`；显示名可以保持简短。Obsidian 的链接更新功能应开启。

```markdown
✅ [[concepts/RAG|RAG]]              完整 Vault 路径
✅ [[concepts/RAG|检索增强生成]]      带显示名
❌ [[RAG]]                          本站使用 absolute 解析，裸名称不能可靠定位
❌ [RAG](/concepts/RAG)              从站点域名根开始，不兼容部署前缀
```

旧路径放在文章的 `aliases` 中用于页面跳转；新写的正文引用当前路径，不把旧地址当作第二份文件。

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
- [ ] 点 `[[concepts/RAG|RAG]]` 能跳转，不是"未创建"

## 常见坑

> [!warning] 踩坑记录
> - **换设备后笔记没同步**：Apple 设备之间靠 iCloud 自动同步（确认 Obsidian 打开的是 iCloud 里那份）；站点要更新得由 Mac `git push`。
> - **iCloud 把文件“优化”成占位符**：Finder 里对 vault 文件夹右键 → **保留下载**，否则 `git` / `quartz build` 会读到空文件。
> - **多台设备各改各的**：`.obsidian/workspace.json`（当前开的标签页）已 gitignore，不会互相冲。但同一篇笔记在两台设备同时改仍会冲突，先 pull 再写。
> - **链接在 Quartz 上变红**：Obsidian 用了绝对路径（`/concepts/RAG`），改成 `[[concepts/RAG|RAG]]`。
> - **文件名带空格**：URL 会变成 `%20` 或连字符，尽量用中文连写或 `-` 连接，例如 `Claude-Code.md`。
> - **`templates/` 被发布**：本仓库的 `quartz.config.ts` 已在 `ignorePatterns` 里排除 `templates`、`.obsidian`、`private`。如果改了要同步。
> - **`.obsidian/workspace.json` 被提交**：它记录当前打开的标签页，属于个人状态，已加进 `.gitignore`。

## 相关节点

- 下一步：[[maintenance/Quartz部署指南|Quartz部署指南]]
- 项目：[[maintenance/ai-garden|ai-garden]]
- 写作方法：[[concepts/提示工程|提示工程]]（把"给谁读"想清楚再写）

## 参考

- Obsidian 官方帮助：https://help.obsidian.md
