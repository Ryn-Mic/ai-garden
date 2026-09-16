# AI Garden 🌱

个人 AI 知识图谱。用 **Obsidian** 写 Markdown，用 **Quartz** 发布成带双链、图谱视图和全文搜索的静态站点。

```text
Obsidian 写 md
      ↓  Markdown + [[Wikilink]]
   content/                    ← 唯一的真相来源（就是 Obsidian Vault）
      ↓
   Quartz build
      ↓
   public/                     ← 静态 HTML + 搜索索引 + 图谱数据
      ↓  git push
   GitHub Actions
      ↓
   GitHub Pages / Cloudflare Pages
```

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
├── content/                    # Obsidian Vault
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
├── .github/workflows/          # CI / 部署
│   └── deploy.yaml             # push main → 构建 → GitHub Pages
├── quartz.config.ts            # 站点主配置（标题 / baseUrl / 主题 / 插件）
├── quartz.layout.ts            # 页面布局
├── package.json
├── package-lock.json
└── README.md
```

> [!NOTE]
> Quartz 4 的配置文件是 `quartz.config.ts`（TypeScript），不是 `quartz.config.yaml`。
> 站点标题、`baseUrl`、语言、主题色、插件都在这里改。

## 用 Obsidian 写作

1. Obsidian → **Open folder as vault** → 选择 `content/`（**不是**仓库根目录）
2. `Cmd/Ctrl + P` → **Insert template** → 选 `概念` / `Agent工具` / `教程` / `对比` / `项目` / `资料`
3. 用 `[[双链]]` 互连，`Cmd/Ctrl + G` 看图谱

仓库自带 `.obsidian/` 配置，关键项已和 Quartz 对齐：

| 设置 | 值 | 原因 |
| --- | --- | --- |
| New link format | shortest | 对应 Quartz 的 `markdownLinkResolution: "shortest"` |
| Attachment folder | `assets` | 图片统一存放，路径不炸 |
| Template folder | `templates` | 已在 `ignorePatterns` 中排除，不发布 |

## 发布前必改

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
| `npx quartz build --serve --port 3000` | 换端口预览 |

## 参考

- Quartz：https://quartz.jzhao.xyz
- Obsidian：https://help.obsidian.md
- 上游框架：https://github.com/jackyzha0/quartz （MIT）
