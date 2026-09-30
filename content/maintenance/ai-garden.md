---
title: AI Garden 知识图谱
type: project
status: building
track: meta
audience: maintainer
difficulty: intermediate
tags: [project, quartz, obsidian, track/meta, level/intermediate]
repo: 
stack: [Obsidian, Markdown, Quartz, Gitee, GitHub Actions, GitHub Pages]
aliases: ["projects/ai-garden"]
---

# AI Garden 知识图谱

> [!info] 阅读定位
> **站点维护 · 进阶使用**。本站的架构和维护记录；普通用户上手请到 [[tutorials/index|上手指南]]。

> [!abstract] 项目目标
> 用纯 Markdown 维护一个可持续生长的 AI 知识图谱，一键发布成带双链和图谱视图的静态站点。

## 背景与动机

知识散落在聊天记录、浏览器书签、临时笔记里，无法积累。目标是：

1. **写作零摩擦** —— 本地 Markdown，纯文本，不锁定任何平台
2. **关系可导航** —— `[[双链]]` 而不是文件夹层级，跟着链接走
3. **可以看见全貌** —— 图谱视图暴露孤岛笔记和核心枢纽
4. **发布零成本** —— push 即上线，无服务器

## 技术选型

| 环节 | 选型 | 理由 |
| --- | --- | --- |
| 写作 | Obsidian | 本地优先、双链、插件生态、纯 md |
| 存储 | `content/` 目录 | 就是 Vault，同时是站点源目录，**一份数据** |
| 存储 | iCloud + Gitee `ai-garden-contents` | Vault 本体放 iCloud（Apple 设备自动同步），Gitee 是 Mac push 的远端 |
| 构建 | [Quartz](https://github.com/jackyzha0/quartz) | 原生支持双链/图谱/搜索/反链 |
| CI | GitHub Actions | 拉 Gitee 内容 → 构建 → 发布，一个工作流走完 |
| 托管 | GitHub Pages | 免费、自动 HTTPS；备选 Cloudflare Pages |
| 版本控制 | Git | 知识也有历史，可回溯可 diff |

## 架构

```text
设备 A / B / C 上的 Obsidian（iPhone / iPad / Mac）
      ↕  iCloud 同步（vault 本体：笔记 + .obsidian + .git）
  Gitee: ai-garden-contents        ← 仓库远端（Mac push）
      ↓  GitHub Actions 每小时 / 手动触发
  content/  in GitHub: ai-garden   ← 内容副本
      ↓  npx quartz build
   public/  (静态 HTML + 搜索索引 + 图谱数据)
      ↓  actions/deploy-pages
  GitHub Pages / Cloudflare Pages
```

### 为什么是「Gitee 写作 + GitHub 发布」

| 考虑 | 结论 |
| --- | --- |
| 国内多端 clone/pull 速度 | Gitee 快 → 写作仓库放 Gitee |
| Quartz 构建与 Pages 托管 | GitHub 生态最顺 → 发布仓库放 GitHub |
| 同步方向 | 单向：Gitee → GitHub。双向会打架 |
| 为什么合成一个工作流 | `GITHUB_TOKEN` 推的 commit **不会触发**其它工作流（防循环），拆成「同步」+「部署」两个文件的话，同步完部署不会自动跑 |

> [!warning] 单向同步的代价
> 直接改 GitHub 仓库里的 `content/` 会在下一次同步（最长 1 小时）被 Gitee 内容覆盖。要改内容就改 `content/` 的**上游**。

## 目录约定

| 目录 | 放什么 | 判断标准 |
| --- | --- | --- |
| `series/` | 系列阅读路线 | 只引用正文，标明 1 → 2 → 3、补课点和完成标准 |
| `tutorials/` | 操作教程 | 按基础、软件、Skill、MCP、开发分组 |
| `toolbox/` | Skill / MCP 记录 | 用途、来源、成本、边界与试用验收 |
| `concepts/` | 独立知识点 | 解释一个问题，可被多条系列引用 |
| `research/` | 深入研究 | 机制分析、产品与框架、选型和论文 |
| `maintenance/` | 建站、写作与复盘 | 作者入口，不混入 AI 入门路线 |
| `templates/` | 笔记模板 | 不发布 |
| `assets/` | 图片和练习包 | 发布 |

正文按类型只存一份，学习顺序由系列维护。迁移的旧页面路径用 `aliases` 兼容，站内双链使用完整 Vault 路径与显示名。规则见 [[maintenance/内容分层与写作规范|内容分层与写作规范]]。

## 里程碑

- [x] M1 目录骨架 + Obsidian 配置 + Quartz 接入
- [x] M2 种子笔记（概念主干 + 6 个 MOC 索引页）
- [x] M3 发布到 GitHub Pages，`baseUrl` 落地
- [x] M4 内容仓库拆到 Gitee，多端 Obsidian 同步
- [ ] M5 补齐 [[concepts/向量数据库|向量数据库]] 与编码 Agent 的对比
- [ ] M6 接入本地搜索增强 / 语义检索
- [ ] M7 笔记数 ≥ 100，清理孤岛笔记

## 约定

- 每篇笔记必须有 `title` 和 `tags`
- 新笔记至少链到 1 个已有节点，且从某个 `index.md` 可达（防孤岛）
- `status` 生命周期：`seedling` → `growing` → `evergreen`
- 文件名不用空格，用中连写或 `-`

## 日常操作

```bash
# iPhone / iPad / Mac：Obsidian 直接开 iCloud 里那份，不 clone
#   ~/Library/Mobile Documents/iCloud~md~obsidian/Documents/ai-garden

# 没有 iCloud 的机器：clone Gitee 内容仓库，Obsidian 打开仓库根目录
git clone https://gitee.com/MeverikC/ai-garden-contents.git

# 本机（站点仓库里改完 content/ 后）一条命令推回 Gitee
./scripts/push-vault.sh

# 不想等定时同步，立刻发布
gh workflow run deploy.yaml -R Ryn-Mic/ai-garden
```

## 复盘

（待 M3 完成后填写）

## 相关节点

- 教程：[[maintenance/Quartz部署指南|Quartz部署指南]]、[[maintenance/Obsidian配置指南|Obsidian配置指南]]
- 用到的概念：[[concepts/上下文工程|上下文工程]]
- 未来演进：[[concepts/RAG|RAG]]、[[concepts/Embedding|Embedding]]、[[concepts/向量数据库|向量数据库]]
