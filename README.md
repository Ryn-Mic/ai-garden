# AI Garden 🌱

个人 AI 知识图谱。用 **Obsidian** 写 Markdown，用 **Quartz** 发布成带双链、图谱视图和全文搜索的静态站点。

```text
设备 A / B / C 上的 Obsidian
      ↓  Markdown + [[Wikilink]]
   Gitee: ai-garden-contents      ← 写作仓库（唯一真相来源，Vault 根 = 仓库根）
      ↓  GitHub Actions：每小时 / 手动触发
   content/                       ← 本仓库里的内容副本
      ↓  npx quartz build
   public/                        ← 静态 HTML + 搜索索引 + 图谱数据
      ↓  actions/deploy-pages
   GitHub Pages / Cloudflare Pages
```

**两个仓库，职责分开：**

| 仓库 | 位置 | 干什么 |
| --- | --- | --- |
| 写作仓库 | [Gitee `MeverikC/ai-garden-contents`](https://gitee.com/MeverikC/ai-garden-contents) | 只放内容。国内多端同步快，一台设备一个 clone |
| 站点仓库 | `Ryn-Mic/ai-garden`（本仓库） | Quartz 引擎 + 内容副本 + CI + 部署 |

同步是**单向的**：Gitee → GitHub。直接改本仓库的 `content/` 会在下一次同步（最长 1 小时）被上游覆盖。

## 快速开始

```bash
git clone <this-repo> ai-garden
cd ai-garden

node -v                 # 需要 >= 22
npm ci
npm run dev             # http://localhost:8080，改 md 自动刷新
```

构建产物：

```bash
npm run build           # 输出到 public/
```

## 目录结构

```text
ai-garden/
├── content/                    # 内容副本（由 Gitee 同步而来）
│   ├── index.md                # 网站首页
│   ├── concepts/               # 核心知识节点（LLM / Transformer / RAG ...）
│   ├── agents/                 # Agent 产品与框架
│   ├── tutorials/              # 可复现的操作教程
│   ├── comparisons/            # 技术选型对比
│   ├── projects/               # 实战项目与复盘
│   ├── resources/              # 论文、课程、参考
│   ├── assets/                 # 图片等附件
│   ├── templates/              # Obsidian 模板（不发布）
│   └── .obsidian/              # Obsidian 配置（随仓库走）
│
├── quartz/                     # Quartz 框架源码
├── scripts/push-vault.sh       # 把本地 content/ 推回 Gitee 写作仓库
├── .github/workflows/          # CI / 部署
│   └── deploy.yaml             # 同步 Gitee → 构建 → 发布 Pages（一个工作流包办）
├── quartz.config.ts            # 站点主配置（标题 / baseUrl / 主题 / 插件）
├── quartz.layout.ts            # 页面布局
├── package.json
├── package-lock.json
└── README.md
```

> [!NOTE]
> Quartz 4 的配置文件是 `quartz.config.ts`（TypeScript），不是 `quartz.config.yaml`。
> 站点标题、`baseUrl`、语言、主题色、插件都在这里改。

## 日常操作

### 本机现状（这台 Mac）

| 路径 | 是什么 | 能不能用 Obsidian 打开 |
| --- | --- | --- |
| `~/Library/Mobile Documents/iCloud~md~obsidian/Documents/ai-garden` | **正式 vault**（Gitee 克隆 + iCloud 同步） | ✅ **就用这个** |
| `~/Documents/md/ai-garden-vault.old-20260917` | 迁到 iCloud 之前的本地克隆，留作备份 | ⚠️ 已弃用，可删 |
| `~/Documents/md/ai-garden/content/` | 站点仓库里的内容副本 | ⚠️ 是 CI 的产物，改了会被覆盖 |
| `<站点仓库>/.vault-cache/` | `push-vault.sh` 的缓存仓 | ❌ 脚本会对它 `reset --hard` |

Obsidian 已经注册好 iCloud 里那份 `ai-garden`，打开即用。

**分工**：iCloud 负责多端同步，Git 只负责发布 —— `.git` 跟着 vault 一起放在 iCloud，但 **git 只在 Mac 上跑**，iOS 端只需要看 iCloud。

### 日常写作

**iPhone / iPad**：Obsidian 打开 iCloud 里的 `ai-garden` 就行，不用装 Git 插件、不用克隆。

**这台 Mac**：Obsidian 打开同一个目录，写完推一次：

```bash
cd "$HOME/Library/Mobile Documents/iCloud~md~obsidian/Documents/ai-garden"
git pull && …写… && git add -A && git commit -m "note: …" && git push
```

推送后最长 1 小时站点自动重建。

**没有 iCloud 的机器**：照旧克隆写作仓库，Obsidian 打开仓库根目录：

```bash
git clone https://gitee.com/MeverikC/ai-garden-contents.git ai-garden-vault
```

> [!warning]
> 同一篇笔记不要在两处同时改 —— iCloud 同步和 git 是两条独立通道，撞在一起只能手工合。

> [!tip] 别让 macOS 把 vault 里的文件“优化”掉
> Finder 里对 vault 文件夹右键 → **保留下载**（Keep Downloaded）。否则 iCloud 可能把文件换成占位符，`git` 和 `quartz build` 都会读到空文件。

### 逃生口：在站点仓库里手改了 content/ 想推回上游

```bash
./scripts/push-vault.sh           # 同步 content/ → Gitee 并推送
./scripts/push-vault.sh -n        # 只看会改什么，不提交
```

首次运行会在 `.vault-cache/` 克隆一份 Gitee 仓库（已 gitignore），之后只做增量同步。
脚本会在 `reset --hard` 前检查缓存仓是否干净，脏了就拒绝执行——避免吃掉未提交的改动。

### 立刻发布（不等定时任务）

```bash
gh workflow run deploy.yaml -R Ryn-Mic/ai-garden
```

## 同步机制

工作流 `.github/workflows/deploy.yaml` 在三种情况下触发：

| 触发 | 行为 |
| --- | --- |
| push 到 `main` | 同步 Gitee → 构建 → 部署 |
| 每小时（cron `17 * * * *`） | 同上，用于拾取 Gitee 上的新内容 |
| 手动 `workflow_dispatch` | 同上 |

**为什么只用一个工作流文件？** `GITHUB_TOKEN` 推的 commit 不会触发其它工作流（防循环）。如果拆成「同步」和「部署」两个文件，同步推完内容后部署不会自动跑，除非额外配 PAT。合并成一个就没这个问题。

**Gitee 拉取失败不会阻断构建**——克隆失败的步骤只发 warn，然后继续用本仓库已有的 `content/` 构建。

### 内容仓库是私有的？

工作流会自动检测：有 `GITEE_TOKEN` secret 就走鉴权 URL，没有就匿名拉。私有仓库需要配：

```bash
# 1. Gitee → 设置 → 私人令牌，只勾 projects
# 2. 存到本仓库
gh secret set GITEE_TOKEN -R Ryn-Mic/ai-garden
```

## 用 Obsidian 写作

1. Obsidian → **Open folder as vault** → 选 vault 根目录（本机是 `~/Library/Mobile Documents/iCloud~md~obsidian/Documents/ai-garden`）
2. `Cmd/Ctrl + P` → **Insert template** → 选 `概念` / `Agent工具` / `教程` / `对比` / `项目` / `资料`
3. 用 `[[双链]]` 互连，`Cmd/Ctrl + G` 看图谱

仓库自带 `.obsidian/` 配置，关键项已和 Quartz 对齐：

| 设置 | 值 | 原因 |
| --- | --- | --- |
| New link format | shortest | 对应 Quartz 的 `markdownLinkResolution: "shortest"` |
| Attachment folder | `assets` | 图片统一存放，路径不炸 |
| Template folder | `templates` | 已在 `ignorePatterns` 中排除，不发布 |

## 发布前必改（已配好，仅供迁移参考）

编辑 `quartz.config.ts`：

```ts
baseUrl: "Ryn-Mic.github.io/ai-garden",   // ← 已按 origin remote 预设，换仓库时记得改
pageTitle: "AI Garden",
locale: "zh-CN",
```

| 部署目标 | baseUrl |
| --- | --- |
| GitHub Pages 项目站 | `用户名.github.io/仓库名` |
| GitHub Pages 用户站 | `用户名.github.io` |
| 自定义域名 | `your.domain.com`（不带协议、不带末尾斜杠） |

然后：仓库 **Settings → Pages → Source** 选 **GitHub Actions**，push 到 `main` 即自动发布。

### Cloudflare Pages（可选）

| 配置 | 值 |
| --- | --- |
| Build command | `npx quartz build` |
| Output directory | `public` |
| 环境变量 | `NODE_VERSION=22` |

## 写作约定

- 每篇笔记带 `title` 和 `tags`
- 新笔记至少链到 1 个已有节点，且从某个 `index.md` 可达（**防孤岛**）
- `status` 生命周期：`seedling` → `growing` → `evergreen`
- 文件名不用空格：`Claude-Code.md` 而不是 `Claude Code.md`
- 站内链接一律 `[[双链]]`，别写 `/absolute/path`

## 常用命令

| 命令 | 作用 |
| --- | --- |
| `npm run dev` | 本地预览，热更新 |
| `npm run build` | 构建到 `public/` |
| `npm run check` | 类型检查 + 代码格式检查 |
| `npm run format` | 格式化（不含 `content/`） |
| `./scripts/push-vault.sh` | 把 `content/` 推回 Gitee 写作仓库 |
| `gh workflow run deploy.yaml -R Ryn-Mic/ai-garden` | 立刻同步并发布 |
| `npx quartz build --serve --port 3000` | 换端口预览 |

## 参考

- Quartz：https://quartz.jzhao.xyz
- Obsidian：https://help.obsidian.md
- 上游框架：https://github.com/jackyzha0/quartz （MIT）
