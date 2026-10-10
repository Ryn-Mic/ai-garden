import test from "node:test"
import assert from "node:assert/strict"
import { unified } from "unified"
import { VFile } from "vfile"
import { Element, Root } from "hast"
import { CrawlLinks } from "./links"
import { BuildCtx } from "../../util/ctx"
import { FilePath, FullSlug, normalizeHastElement } from "../../util/path"

async function rewrite(tag: string, attribute: string, value: string) {
  const node: Element = {
    type: "element",
    tagName: tag,
    properties: { [attribute]: value },
    children: [],
  }
  const tree: Root = { type: "root", children: [node] }
  const file = new VFile()
  file.data.slug = "concepts/Example" as FullSlug
  const ctx = { allSlugs: [], allFiles: ["assets/diagram.html" as FilePath] } as unknown as BuildCtx
  await unified().use(CrawlLinks().htmlPlugins!(ctx)).run(tree, file)
  return node.properties[attribute]
}

for (const [source, expected] of [
  ["concepts/embedding-flow.html", "../concepts/embedding-flow.html"],
  ["/assets/diagram.html", "../assets/diagram.html"],
  ["assets/index.html", "../assets/index.html"],
  ["assets/flow chart.html?mode=light#NodeA", "../assets/flow-chart.html?mode=light#NodeA"],
]) {
  test("iframe HTML asset: " + source, async () => {
    assert.equal(await rewrite("iframe", "src", source), expected)
  })
}

test("HTML iframes are rebased when content is reused on another page", () => {
  const node: Element = {
    type: "element",
    tagName: "iframe",
    properties: { src: "../assets/diagram.html" },
    children: [],
  }
  const rebased = normalizeHastElement(node, "index" as FullSlug, "concepts/Example" as FullSlug)
  assert.equal(
    new URL(String(rebased.properties.src), "https://example.test/ai-garden/").href,
    "https://example.test/ai-garden/assets/diagram.html",
  )
  assert.equal(node.properties.src, "../assets/diagram.html")
})

test("external iframe URLs are not rewritten", async () => {
  const source = "https://example.com/viewer.html?mode=light#NodeA"
  assert.equal(await rewrite("iframe", "src", source), source)
})

test("links to known HTML assets keep their extension", async () => {
  assert.equal(await rewrite("a", "href", "assets/diagram.html"), "../assets/diagram.html")
})

test("existing Markdown page and image URL behavior is unchanged", async () => {
  assert.equal(await rewrite("a", "href", "concepts/Other.html"), "../concepts/Other")
  assert.equal(await rewrite("img", "src", "assets/image.png"), "../assets/image.png")
})
