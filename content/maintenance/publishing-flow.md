---
title: AI Garden 发布流程
type: project
status: growing
track: meta
audience: maintainer
difficulty: beginner
tags: [project, workflow, publishing, track/meta, level/beginner]
---

# AI Garden 发布流程

> [!info] 阅读定位
> **项目文档 · 维护者**。展示从写作到发布的完整自动化流程。

## 交互式流程图

下方是完整的发布流程图，支持缩放、搜索和主题切换：

<iframe 
  src="/assets/ai-garden-publish-flow.html" 
  width="100%" 
  height="750px" 
  style="border: 1px solid var(--gray); border-radius: 8px; margin: 2rem 0;"
  title="AI Garden 发布流程图"
></iframe>

> [!tip] 交互功能
> - **缩放**：滚轮缩放，或点击图表右下角的 +/- 按钮
> - **搜索**：点击右上角的搜索图标，输入关键词快速定位
> - **主题切换**：点击右上角的月亮/太阳图标切换明暗主题
> - **导出**：点击导出按钮，支持 PNG、SVG、WebM 等格式

---

## 流程说明

### 1. 编写内容（Obsidian）

**环境**：作者本地

- **Mac**：iCloud 同步的 Obsidian vault（`~/Library/Mobile Documents/iCloud~md~obsidian/Documents/ai-garden`）
- **iPhone/iPad**：通过 iCloud 同步使用 Obsidian 移动端
- **其他设备**：直接 clone Gitee 仓库

**写作规范**：
- 使用 Obsidian 的双方括号链接语法
- 完整的 frontmatter（title, type, tags 等）
- 遵循 [[maintenance/内容分层与写作规范|内容分层与写作规范]]

### 2. 推送源仓库（Gitee）

**仓库**：[MeverikC/ai-garden-contents](https://gitee.com/MeverikC/ai-garden-contents)（私有）

**提交方式**：
- **Mac 推荐**：使用 `~/.local/bin/gpush` 脚本
  ```bash
  gpush        # 自动 add + commit + push
  gpush -p     # 推送后触发站点发布
  ```
- **手动提交**：
  ```bash
  git add -A
  git commit -m "your message"
  git push
  ```

**为什么用 Gitee**：
- 国内访问快，适合多端同步
- 与 iCloud 双保险
- 作为单一内容源（Single Source of Truth）

### 3. 同步内容（GitHub Actions）

**触发条件**：
- 手动触发（`workflow_dispatch`）
- 每小时自动运行（cron: `17 * * * *`）
- 推送到 main 分支

**工作流**：`.github/workflows/deploy.yaml`

**同步逻辑**：
```yaml
1. Checkout GitHub 仓库
2. 配置 Gitee 认证（需要 GITEE_TOKEN secret）
3. Fetch Gitee 最新内容
4. 复制到 content/ 目录
5. 如果有更新，继续构建和部署
```

**注意**：如果 Gitee 同步失败，工作流会警告但不会中断，继续使用现有 `content/`

### 4. 构建站点（Quartz）

**构建命令**：`npx quartz build`

**处理流程**：
- 解析 Markdown + frontmatter
- 转换双方括号链接为超链接
- 生成双向链接（backlinks）
- 构建知识图谱（graph view）
- 生成搜索索引
- 应用主题和样式
- 输出到 `public/` 目录

**验证**：`node scripts/check-content.mjs`
- 检查 frontmatter 完整性
- 验证所有链接可解析
- 检查系列导航一致性
- 验证别名重定向

### 5. 发布站点（GitHub Pages）

**部署目标**：https://Ryn-Mic.github.io/ai-garden

**部署方式**：GitHub Actions 自动部署

**CDN 加速**：GitHub Pages 自带 CDN，全球访问速度良好

---

## 架构优势

### 双仓库架构

| 仓库 | 作用 | 位置 | 更新频率 |
|------|------|------|----------|
| **ai-garden-contents** | 内容源 | Gitee（私有） | 随时写作 |
| **ai-garden** | 发布引擎 | GitHub（公开） | 每小时同步 |

**优点**：
1. **写作体验好**：Gitee 在中国访问快，配合 iCloud + Obsidian 多端同步流畅
2. **发布体验好**：GitHub Pages + CDN 全球访问快
3. **内容安全**：双仓库备份，写作仓库私有保护草稿
4. **自动化**：推送即发布，无需手动操作

### 单向同步

**Gitee → GitHub**（单向）

- 避免双向同步的冲突
- Gitee 是唯一真相源
- GitHub 仓库的 `content/` 目录是只读的（会被覆盖）

**重要**：⚠️ 不要直接编辑 GitHub 仓库的 `content/` 目录！

---

## 手动发布

如果需要立即发布（不等每小时自动同步）：

```bash
# 方式 1: Mac 上使用 gpush -p
cd ~/Library/Mobile\ Documents/iCloud~md~obsidian/Documents/ai-garden
gpush -p

# 方式 2: 手动触发 GitHub Actions
gh workflow run deploy.yaml -R Ryn-Mic/ai-garden

# 方式 3: 在 GitHub 网页上手动触发
# https://github.com/Ryn-Mic/ai-garden/actions/workflows/deploy.yaml
# 点击 "Run workflow"
```

---

## 应急操作

### 内容推送到 Gitee 失败

**可能原因**：
- 网络问题
- 认证失效
- 仓库权限问题

**解决方法**：
```bash
# 检查 Gitee 远程仓库
git remote -v

# 测试连接
git fetch origin

# 重新推送
git push origin main
```

### GitHub Actions 同步失败

**检查 GITEE_TOKEN**：
```bash
# 查看 secret 是否配置
gh secret list -R Ryn-Mic/ai-garden

# 如果过期，重新设置
gh secret set GITEE_TOKEN -R Ryn-Mic/ai-garden
# 粘贴新 token（在 Gitee → 设置 → 私人令牌 生成）
```

### 构建失败

**常见原因**：
- Markdown 语法错误
- 链接指向不存在的文件
- frontmatter 格式错误

**本地验证**：
```bash
npm run build
node scripts/check-content.mjs
```

### 使用 push-vault.sh 应急推送

**场景**：GitHub 仓库的 `content/` 需要紧急修复，但没有访问 Gitee 的环境

```bash
# 在 ai-garden 项目目录
./scripts/push-vault.sh -n  # 先预览
./scripts/push-vault.sh      # 确认后执行
```

**注意**：这会将 `content/` 推送回 Gitee，覆盖源仓库！

---

## 相关文档

- [[maintenance/内容分层与写作规范|内容分层与写作规范]] - frontmatter、链接格式、系列导航
- [[maintenance/多端同步与发布流程|多端同步与发布流程]] - 双仓库同步的技术细节
- [[maintenance/index|维护文档索引]]

---

## 流程图技术说明

本页使用的交互式流程图由 [archify](https://github.com/tt-a1i/archify) 生成：

- **格式**：独立 HTML + 内联 SVG
- **大小**：707KB（包含完整交互逻辑）
- **兼容性**：现代浏览器，支持移动端
- **无依赖**：无需外部 JavaScript 库
- **导出**：支持 PNG/SVG/WebM 多种格式

如需修改流程图，编辑源文件：`ai-garden-publish-flow.workflow.json`
