#!/usr/bin/env bash
#
# 把本地 content/ 推到 Gitee 内容仓库（多端 Obsidian 用）。
#
#   ./scripts/push-vault.sh              # 同步并推送
#   ./scripts/push-vault.sh -n           # 只看会改什么，不提交
#
# ⚠️ 这不是日常写作路径。日常写作请在正式 vault 里（iCloud）：
#      ~/Library/Mobile Documents/iCloud~md~obsidian/Documents/ai-garden
#    这个脚本只服务于“在站点仓库里手改了 content/ 想推回上游”的场合。
#
# 依赖：git、rsync。首次运行会在 .vault-cache/ 克隆一份 Gitee 仓库（已 gitignore）。
# 不要把 .vault-cache/ 用 Obsidian 打开 —— 脚本会对它 reset --hard。
#
# 设计说明：Gitee 内容仓库的根目录 = Obsidian Vault 根目录，
# 所以本地 content/ 要平移到克隆仓库的根目录，而不是 content/。

set -euo pipefail

GITEE_REPO="${GITEE_REPO:-https://gitee.com/MeverikC/ai-garden-contents.git}"
BRANCH="${BRANCH:-main}"
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CACHE="$REPO_ROOT/.vault-cache"
DRY_RUN=0

for arg in "$@"; do
  case "$arg" in
    -n | --dry-run) DRY_RUN=1 ;;
    -h | --help) sed -n '2,12p' "${BASH_SOURCE[0]}" | sed 's/^# \{0,1\}//'; exit 0 ;;
    *) echo "未知参数: $arg" >&2; exit 2 ;;
  esac
done

command -v rsync >/dev/null || { echo "缺少 rsync" >&2; exit 1; }

# 1. 准备/更新本地克隆
if [ -d "$CACHE/.git" ]; then
  # 关键护栏：下面要 reset --hard，如果有未提交改动会被直接吃掉。
  # 正常流程下脚本每次都会提交完自己的改动，所以这里脏 = 出了意外
  # （上一次跑挂了，或者有人在 Obsidian 里打开了这个缓存目录改东西）。
  if [ -n "$(git -C "$CACHE" status --porcelain)" ]; then
    {
      echo "❌ $CACHE 有未提交的改动，拒绝执行 reset --hard（会丢失它们）"
      echo
      git -C "$CACHE" status --short | head -20
      echo
      echo "处理方式二选一："
      echo "  1) 改动有用 → cd \"$CACHE\" && git add -A && git commit -m '...' && git push"
      echo "  2) 改动不要了   → rm -rf \"$CACHE\" 后重跑本脚本"
      echo
      echo "提示：这个目录是脚本的缓存仓，不要用 Obsidian 打开它。"
      echo "      日常写作请打开正式 vault：~/Library/Mobile Documents/iCloud~md~obsidian/Documents/ai-garden"
    } >&2
    exit 1
  fi

  echo "→ 更新缓存仓库 $CACHE"
  git -C "$CACHE" fetch -q origin "$BRANCH"
  git -C "$CACHE" checkout -q "$BRANCH"
  git -C "$CACHE" reset -q --hard "origin/$BRANCH"
else
  echo "→ 克隆 $GITEE_REPO 到 $CACHE"
  rm -rf "$CACHE"
  git clone -q -b "$BRANCH" "$GITEE_REPO" "$CACHE"
fi

# 2. content/ → 仓库根目录（仓库独有的文件不删）
#    带 / 的排除规则只匹配顶层，不会误伤笔记里的同名文件
rsync -a --delete \
  --exclude='/.git/' \
  --exclude='/.gitignore' \
  --exclude='/README.md' \
  --exclude='/.gitee/' \
  --exclude='/.github/' \
  "$REPO_ROOT/content/" "$CACHE/"

# 3. 提交
if [ -z "$(git -C "$CACHE" status --porcelain)" ]; then
  echo "✅ 内容无变化，无需推送"
  exit 0
fi

echo "📝 变更如下："
git -C "$CACHE" status --short | head -40

if [ "$DRY_RUN" = "1" ]; then
  echo "(dry-run，未提交)"
  exit 0
fi

git -C "$CACHE" add -A
git -C "$CACHE" commit -q -m "content: 更新 $(date '+%Y-%m-%d %H:%M')"
git -C "$CACHE" push -q origin "$BRANCH"
echo "✅ 已推送到 Gitee，GitHub Actions 会在一小时内同步并重建站点"
echo "   想立刻发布：gh workflow run deploy.yaml -R Ryn-Mic/ai-garden"
