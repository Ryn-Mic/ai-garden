---
title: Quartz 部署指南
type: tutorial
status: growing
tags: [tutorial, quartz, deploy]
difficulty: beginner
prerequisites: ["[[Obsidian配置指南]]"]
---

# Quartz 部署指南

> [!info] 目标
> 把这个仓库推到 GitHub，并在 GitHub Pages（或 Cloudflare Pages）上看到你的知识图谱。

**前置知识**：[[Obsidian配置指南]]
**预计耗时**：20 分钟

## 仓库结构

```text
ai-garden/
├── content/            # Obsidian Vault（你只写这里）
│   ├── index.md
│   ├── concepts/ agents/ tutorials/ comparisons/ projects/ resources/
│   ├── assets/         # 图片
│   ├── templates/      # 站点不发布
│   └── .obsidian/
├── quartz/             # Quartz 框架源码（不要改，除非要定制）
├── quartz.config.ts    # 站点主配置
├── quartz.layout.ts    # 页面布局
└── .github/workflows/deploy.yaml
```

> [!warning] 注意
> Quartz 4 的配置是 `quartz.config.ts`（TypeScript），不是 YAML。改配置改这个文件。

## 步骤

### 1. 本地跑起来

```bash
node -v          # 需要 >= 22
npm ci
npx quartz build --serve
```

打开 http://localhost:8080 。改 `content/` 下任意 md，浏览器会热更新。

### 2. 改配置

编辑 `quartz.config.ts` 顶部：

```ts
pageTitle: "AI Garden",
baseUrl: "yourname.github.io/ai-garden",   // ← 必须改，否则资源路径错
locale: "zh-CN",
```

`baseUrl` 规则：

| 部署目标 | baseUrl 怎么写 |
| --- | --- |
| GitHub Pages 项目站 | `用户名.github.io/仓库名` |
| GitHub Pages 用户站（仓库名 = `用户名.github.io`） | `用户名.github.io` |
| 自定义域名 | `your-domain.com`（**不带** `https://`，不带末尾斜杠） |

### 3. 推上 GitHub

```bash
git add -A
git commit -m "init: quartz + obsidian vault"
git branch -M main
git remote add origin git@github.com:你的用户名/ai-garden.git
git push -u origin main
```

### 4. 打开 GitHub Pages

仓库 → **Settings → Pages → Build and deployment → Source** 选 **GitHub Actions**。

工作流 `.github/workflows/deploy.yaml` 会在每次 push 到 `main` 时构建并发布。

### 5. 验证

Actions 里 `Deploy Quartz site to GitHub Pages` 变成绿色后，访问：

```text
https://用户名.github.io/ai-garden
```

## Cloudflare Pages 替代方案

想用 CF Pages 的话：

| 配置项 | 值 |
| --- | --- |
| Build command | `npx quartz build` |
| Build output directory | `public` |
| 环境变量 `NODE_VERSION` | `22` |

记得把 `baseUrl` 改成 CF 分配的域名，并同步更新 `quartz.config.ts`。

> [!tip] 怎么选
> 只要 GitHub Pages，零额外账号；要全球加速和 Preview 部署，用 Cloudflare Pages。

## 验证清单

- [ ] 首页能打开，颜色/字体正常
- [ ] 点一个 `[[双链]]` 能跳转（不是 404）
- [ ] 右上角搜索能搜到中文笔记
- [ ] 笔记底部的**关系图谱**有节点和连线，悬停显示标题、点击能跳转（Quartz 没有独立的 `/graph` 页面，图谱是嵌入式组件）
- [ ] 手机端能正常阅读

## 常见坑

> [!warning] 踩坑记录
> - **全站样式丢失 / 链接 404**：99% 是 `baseUrl` 写错（带了 `https://` 或末尾斜杠）。
> - **构建报 Node 版本**：本仓库启用了 `engine-strict`，Node 必须 ≥ 22。
> - **本地能看，线上空白**：`content/` 里只有一个 md 目录但**没有 index.md**，或者 `ignorePatterns` 把它排除了。
> - **图片不显示**：Obsidian 的附件目录要设成 `assets`（见 [[Obsidian配置指南]]），否则相对路径对不上。
> - **中文文件名链接 404**：本地文件名和链接里的汉字要完全一致（含全角/半角）。

## 相关节点

- 前置：[[Obsidian配置指南]]
- 项目：[[ai-garden]]
- 上游概念：[[上下文工程]]（写笔记时的信息组织同理）

## 参考

- Quartz 官方文档：https://quartz.jzhao.xyz
