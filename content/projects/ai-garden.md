---
title: AI Garden 知识图谱
type: project
status: building
tags: [project, quartz, obsidian]
repo: 
stack: [Obsidian, Markdown, Quartz, Gitee, GitHub Actions, GitHub Pages]
---

# AI Garden 知识图谱

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
| 存储 | Gitee `ai-garden-contents` | 写作仓库。国内多端同步快，一个 Vault 一个 clone |
| 构建 | [Quartz](https://github.com/jackyzha0/quartz) | 原生支持双链/图谱/搜索/反链 |
| CI | GitHub Actions | 拉 Gitee 内容 → 构建 → 发布，一个工作流走完 |
| 托管 | GitHub Pages | 免费、自动 HTTPS；备选 Cloudflare Pages |
| 版本控制 | Git | 知识也有历史，可回溯可 diff |

## 架构

```text
设备 A / B / C 上的 Obsidian
      ↓  (Markdown + [[Wikilink]])
  Gitee: ai-garden-contents        ← 唯一真相来源（Vault 根 = 仓库根）
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
| `concepts/` | 底层概念节点 | 能被别的笔记反复引用 |
| `agents/` | 产品、框架、工具 | 有明确的"用不用它"决策 |
| `tutorials/` | 可复现操作步骤 | 有前置知识和验证方式 |
| `comparisons/` | A vs B 选型 | 存在真实的两难 |
| `projects/` | 实战与复盘 | 有目标和里程碑 |
| `resources/` | 论文、课程、链接 | 是"外部材料"而非我的观点 |
| `templates/` | 笔记模板 | 不发布 |
| `assets/` | 图片附件 | 发布 |

## 里程碑

- [x] M1 目录骨架 + Obsidian 配置 + Quartz 接入
- [x] M2 种子笔记（概念主干 + 6 个 MOC 索引页）
- [x] M3 发布到 GitHub Pages，`baseUrl` 落地
- [x] M4 内容仓库拆到 Gitee，多端 Obsidian 同步
- [ ] M5 补齐 [[向量数据库]] 与编码 Agent 的对比
- [ ] M6 接入本地搜索增强 / 语义检索
- [ ] M7 笔记数 ≥ 100，清理孤岛笔记

## 约定

- 每篇笔记必须有 `title` 和 `tags`
- 新笔记至少链到 1 个已有节点，且从某个 `index.md` 可达（防孤岛）
- `status` 生命周期：`seedling` → `growing` → `evergreen`
- 文件名不用空格，用中连写或 `-`

## 日常操作

```bash
# 另开一台设备：clone Gitee 内容仓库，Obsidian 打开仓库根目录
git clone https://gitee.com/MeverikC/ai-garden-contents.git

# 本机（站点仓库里改完 content/ 后）一条命令推回 Gitee
./scripts/push-vault.sh

# 不想等定时同步，立刻发布
gh workflow run deploy.yaml -R Ryn-Mic/ai-garden
```

## 复盘

（待 M3 完成后填写）

## 相关节点

- 教程：[[Quartz部署指南]]、[[Obsidian配置指南]]
- 用到的概念：[[上下文工程]]
- 未来演进：[[RAG]]、[[Embedding]]、[[向量数据库]]
