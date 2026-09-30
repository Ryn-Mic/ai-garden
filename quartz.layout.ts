import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// Keep reading routes first and content categories predictable in both explorers.
// The comparator is serialized into the browser, so it must not capture outer variables.
const contentExplorer = () =>
  Component.Explorer({
    title: "内容目录",
    folderDefaultState: "collapsed",
    sortFn: (a, b) => {
      const orderedPaths = [
        "series/index",
        "tutorials/index",
        "toolbox/index",
        "concepts/index",
        "research/index",
        "maintenance/index",
        "tutorials/basics/index",
        "tutorials/software/index",
        "tutorials/skills/index",
        "tutorials/mcp/index",
        "tutorials/development/index",
        "toolbox/skills/index",
        "toolbox/mcp/index",
        "research/analysis/index",
        "research/products/index",
        "research/comparisons/index",
        "research/papers/index",
        "concepts/上下文",
        "concepts/AI能看到什么",
        "concepts/规则与权限",
        "concepts/Skill",
        "concepts/MCP",
      ]
      const aRank = orderedPaths.indexOf(a.slug)
      const bRank = orderedPaths.indexOf(b.slug)
      if (aRank !== -1 || bRank !== -1) {
        return (
          (aRank === -1 ? orderedPaths.length : aRank) -
          (bRank === -1 ? orderedPaths.length : bRank)
        )
      }
      if (a.isFolder !== b.isFolder) return a.isFolder ? -1 : 1
      return a.displayName.localeCompare(b.displayName, "zh-CN", {
        numeric: true,
        sensitivity: "base",
      })
    },
  })

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/jackyzha0/quartz",
      "Discord Community": "https://discord.gg/cRFFHYye7t",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    contentExplorer(),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    contentExplorer(),
  ],
  right: [],
}
