import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import matter from "gray-matter"
import { fromHtml } from "hast-util-from-html"
import { visit } from "unist-util-visit"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const content = path.join(root, "content")
const output = path.join(root, "public")
const errors = []
const roots = ["series", "tutorials", "toolbox", "concepts", "research", "maintenance"]
const ignored = new Set(["templates", "assets", "private", ".obsidian"])

function walk(dir, extension, exclusions = new Set()) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(dir, entry.name)
    if (entry.isDirectory())
      return exclusions.has(entry.name) ? [] : walk(file, extension, exclusions)
    return entry.name.endsWith(extension) ? [file] : []
  })
}

function slugify(value) {
  return value
    .replace(/\.md$/, "")
    .split("/")
    .map((segment) =>
      segment
        .replace(/\s/g, "-")
        .replace(/&/g, "-and-")
        .replace(/%/g, "-percent")
        .replace(/[?#]/g, ""),
    )
    .join("/")
}

function prose(text) {
  return text
    .replace(/^(`{3,}|~{3,})[^\n]*\n[\s\S]*?^\1[ \t]*$/gm, "")
    .replace(/(`+)[^\n]*?\1/g, "")
    .replace(/<!--[\s\S]*?-->/g, "")
}

function wikiRefs(text) {
  return [...prose(text).matchAll(/!?\[\[([^\]]+)\]\]/g)].map((match) =>
    match[1].replace(/\\\|/g, "|").split("|")[0].trim(),
  )
}

const docs = new Map(
  walk(content, ".md", ignored).map((file) => {
    const relative = path.relative(content, file).split(path.sep).join("/")
    const parsed = matter(fs.readFileSync(file, "utf8"))
    return [slugify(relative), { file, relative, ...parsed }]
  }),
)
const aliases = new Map()
const edges = new Map()
const types = {
  tutorials: ["tutorial"],
  toolbox: ["tool-note"],
  concepts: ["concept"],
  research: ["research", "agent", "comparison", "resource"],
  maintenance: ["tutorial", "resource", "project"],
  series: ["series"],
}

for (const [slug, doc] of docs) {
  const category = slug.split("/")[0]
  const isIndex = path.basename(doc.file) === "index.md"
  if (slug !== "index" && !roots.includes(category)) errors.push(`${slug}: unexpected content root`)
  if (!doc.data.title || !Array.isArray(doc.data.tags)) errors.push(`${slug}: title/tags missing`)
  if (!isIndex) {
    if (!types[category]?.includes(doc.data.type))
      errors.push(`${slug}: type does not match directory`)
    for (const [field, allowed] of Object.entries({
      track: ["toolbox", "guides", "research", "meta"],
      audience: ["non-programmer", "practitioner", "developer", "maintainer"],
      difficulty: ["beginner", "intermediate", "advanced"],
    }))
      if (!allowed.includes(doc.data[field])) errors.push(`${slug}: invalid ${field}`)
    for (const tag of [`track/${doc.data.track}`, `level/${doc.data.difficulty}`]) {
      if (!doc.data.tags?.includes(tag)) errors.push(`${slug}: missing ${tag}`)
    }
    if (!doc.content.includes("> [!info] 阅读定位"))
      errors.push(`${slug}: visible reading level missing`)
  }
  for (let parent = path.posix.dirname(slug); parent !== "."; parent = path.posix.dirname(parent)) {
    if (!docs.has(`${parent}/index`)) errors.push(`${slug}: missing ${parent}/index.md`)
  }
  for (const name of doc.data.aliases ?? []) {
    const alias = slugify(name)
    if (docs.has(alias)) errors.push(`${slug}: alias overwrites current page ${alias}`)
    if (aliases.has(alias) && aliases.get(alias) !== slug)
      errors.push(`${slug}: duplicate alias ${alias}`)
    aliases.set(alias, slug)
  }
}

for (const [slug, doc] of docs) {
  const outgoing = []
  for (const ref of wikiRefs(doc.content)) {
    const target = ref.split("#")[0].replace(/\.md$/, "") || slug
    if (docs.has(target)) outgoing.push(target)
    else if (target.startsWith("assets/")) {
      const file = path.resolve(content, target)
      if (!file.startsWith(content + path.sep) || !fs.existsSync(file))
        errors.push(`${slug}: missing asset ${ref}`)
    } else if (aliases.has(slugify(target)))
      errors.push(`${slug}: use current path instead of alias ${ref}`)
    else errors.push(`${slug}: unresolved or non-qualified link ${ref}`)
  }
  edges.set(slug, outgoing)
}
const reachable = new Set()
const queue = ["index"]
while (queue.length) {
  const slug = queue.shift()
  if (reachable.has(slug)) continue
  reachable.add(slug)
  queue.push(...(edges.get(slug) ?? []))
}
for (const slug of docs.keys())
  if (!reachable.has(slug)) errors.push(`${slug}: unreachable from homepage`)

const courses = [...docs].filter(([, doc]) => doc.data.type === "series")
const orders = courses.map(([, doc]) => doc.data.series_order).sort((a, b) => a - b)
if (orders.join(",") !== "1,2,3,4,5") errors.push("Series order must be 01 through 05 without gaps")
let stations = 0
for (const [slug, doc] of courses) {
  const sequence = doc.data.sequence
  if (!Array.isArray(sequence) || sequence.length < 2) {
    errors.push(`${slug}: missing sequence`)
    continue
  }
  stations += sequence.length
  const headings = [...doc.content.matchAll(/^### (\d+)\./gm)].map((m) => Number(m[1]))
  if (headings.join(",") !== sequence.map((_, i) => i + 1).join(","))
    errors.push(`${slug}: station headings disagree with sequence`)
  const refs = wikiRefs(doc.content)
  const offset = doc.content.indexOf("## 主线")
  const chain =
    offset === -1 ? [] : wikiRefs(doc.content.slice(offset).split("\n").slice(0, 4).join("\n"))
  if (sequence.some((target, i) => chain[i] !== target))
    errors.push(`${slug}: visible main chain disagrees with sequence`)
  for (const target of [...sequence, ...(doc.data.knowledge_points ?? [])]) {
    const member = docs.get(target.split("#")[0])
    if (!member || !refs.includes(target))
      errors.push(`${slug}: missing series reference ${target}`)
    else if (
      !member.content.includes("<!-- series-navigation:start -->") ||
      !member.content.includes(`[[${slug}|`)
    ) {
      errors.push(`${target}: missing return navigation for ${slug}`)
    }
  }
  for (const target of doc.data.knowledge_points ?? []) {
    if (docs.get(target)?.data.type !== "concept")
      errors.push(`${slug}: knowledge point is not a concept ${target}`)
  }
}

let internal = 0
let anchors = 0
let pageCount = 0
if (!process.argv.includes("--source-only")) {
  if (!fs.existsSync(output)) errors.push("public/ missing: run npm run build first")
  else {
    const configured = fs
      .readFileSync(path.join(root, "quartz.config.ts"), "utf8")
      .match(/baseUrl:\s*"([^"]+)"/)?.[1]
    if (!configured) throw new Error("Cannot read configured baseUrl")
    const origin = new URL(`https://${configured}`)
    const prefix = origin.pathname.replace(/\/$/, "")
    const pages = new Map(
      walk(output, ".html").map((file) => {
        const tree = fromHtml(fs.readFileSync(file, "utf8"))
        const ids = new Set(),
          refs = []
        let refresh
        visit(tree, "element", (node) => {
          const props = node.properties ?? {}
          if (props.id) ids.add(String(props.id))
          if (node.tagName === "a" && props.name) ids.add(String(props.name))
          const ref =
            node.tagName === "a"
              ? props.href
              : ["img", "iframe"].includes(node.tagName)
                ? props.src
                : undefined
          if (ref !== undefined) refs.push(String(ref))
          if (node.tagName === "meta" && String(props.httpEquiv).toLowerCase() === "refresh") {
            refresh = String(props.content).match(/^\s*\d+\s*;\s*url=(.*)$/i)?.[1]
          }
        })
        return [file, { ids, refs, refresh }]
      }),
    )
    pageCount = pages.size
    function destination(file, ref) {
      const relative = path
        .relative(output, file)
        .split(path.sep)
        .join("/")
        .replace(/\.html$/, "")
      const url = new URL(ref, `${origin.href.replace(/\/$/, "")}/${relative}`)
      if (!["http:", "https:"].includes(url.protocol) || url.hostname !== origin.hostname)
        return null
      const pathname = decodeURIComponent(url.pathname)
      if (pathname !== prefix && !pathname.startsWith(prefix + "/"))
        return { error: "outside deployment prefix" }
      const route = pathname.slice(prefix.length).replace(/^\//, "")
      const candidates = route
        ? [
            path.join(output, route),
            path.join(output, route + ".html"),
            path.join(output, route, "index.html"),
          ]
        : [path.join(output, "index.html")]
      const target = candidates.find((p) => fs.existsSync(p) && fs.statSync(p).isFile())
      return target
        ? { target, fragment: decodeURIComponent(url.hash.slice(1)) }
        : { error: "target missing" }
    }
    function follow(file, seen = new Set()) {
      if (seen.has(file)) {
        errors.push(`Redirect cycle at ${path.relative(output, file)}`)
        return file
      }
      seen.add(file)
      const refresh = pages.get(file)?.refresh
      if (!refresh) return file
      const next = destination(file, refresh)
      if (!next?.target) {
        errors.push(`Broken redirect at ${path.relative(output, file)}`)
        return file
      }
      return follow(next.target, seen)
    }
    for (const [file, page] of pages) {
      if (page.refresh) follow(file)
      for (const ref of page.refs) {
        const result = destination(file, ref)
        if (!result) continue
        internal++
        if (result.error) {
          errors.push(`${path.relative(output, file)}: ${result.error} ${ref}`)
          continue
        }
        const final = follow(result.target)
        if (result.fragment && final.endsWith(".html")) {
          anchors++
          if (!pages.get(final)?.ids.has(result.fragment))
            errors.push(`${path.relative(output, file)}: missing anchor ${ref}`)
        }
      }
    }
    for (const slug of docs.keys())
      if (!pages.has(path.join(output, slug + ".html")))
        errors.push(`${slug}: generated page missing`)
    for (const [alias, slug] of aliases) {
      const file = path.join(output, alias + ".html")
      if (!pages.get(file)?.refresh || follow(file) !== path.join(output, slug + ".html"))
        errors.push(`${alias}: redirect does not reach ${slug}`)
    }
    const assets = walk(path.join(content, "assets"), "").filter(
      (file) =>
        !path.basename(file).startsWith(".") && !path.basename(file).includes(".visual-check."),
    )
    for (const file of assets) {
      const published = path.join(output, path.relative(content, file))
      if (!fs.existsSync(published) || !fs.readFileSync(file).equals(fs.readFileSync(published)))
        errors.push(`Asset differs from source: ${path.relative(content, file)}`)
    }
  }
}

console.log(
  `Content structure: ${errors.length ? "FAIL" : "PASS"} — ${docs.size} pages, ${courses.length} series, ${stations} stations, ${aliases.size} aliases`,
)
if (pageCount)
  console.log(
    `Generated checks: ${pageCount} HTML pages, ${internal} internal links/images/iframes, ${anchors} anchors; redirects and assets checked`,
  )
for (const error of errors.slice(0, 15)) console.error(error)
if (errors.length > 15) console.error(`… ${errors.length - 15} additional errors`)
if (errors.length) process.exitCode = 1
