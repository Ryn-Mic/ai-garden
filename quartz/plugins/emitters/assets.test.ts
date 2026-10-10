import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs/promises"
import os from "node:os"
import path from "node:path"
import { Assets } from "./assets"
import { BuildCtx } from "../../util/ctx"
import { QuartzConfig } from "../../cfg"
import { FilePath } from "../../util/path"

const resources = { css: [], js: [], additionalHead: [] }

async function fixture() {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), "quartz-assets-"))
  const directory = path.join(root, "content")
  const output = path.join(root, "public")
  await fs.mkdir(path.join(directory, "assets"), { recursive: true })
  const ctx: BuildCtx = {
    buildId: "test",
    argv: {
      directory,
      output,
      verbose: false,
      serve: false,
      watch: false,
      port: 8080,
      wsPort: 3001,
    },
    cfg: { configuration: { ignorePatterns: [] } } as unknown as QuartzConfig,
    allSlugs: [],
    allFiles: [],
    incremental: false,
  }
  return { root, directory, output, ctx }
}

test("HTML assets retain their extension and exact bytes on full builds", async () => {
  const { root, directory, output, ctx } = await fixture()
  try {
    const html = "<!doctype html><title>Diagram</title><svg></svg>"
    await fs.writeFile(path.join(directory, "assets", "flow chart.html"), html)
    await fs.writeFile(path.join(directory, "assets", "index.html"), html)
    await fs.writeFile(path.join(directory, "assets", "image.png"), "png")
    await fs.writeFile(path.join(directory, "note.md"), "# Note")
    for await (const emitted of await Assets().emit(ctx, [], resources)) await emitted
    assert.equal(await fs.readFile(path.join(output, "assets", "flow-chart.html"), "utf8"), html)
    assert.equal(await fs.readFile(path.join(output, "assets", "index.html"), "utf8"), html)
    assert.equal(await fs.readFile(path.join(output, "assets", "image.png"), "utf8"), "png")
    await assert.rejects(fs.stat(path.join(output, "note")))
  } finally {
    await fs.rm(root, { recursive: true, force: true })
  }
})

test("HTML asset extensions are consistent across incremental add, change, and delete", async () => {
  const { root, directory, output, ctx } = await fixture()
  const emitter = Assets()
  const fp = "assets/diagram.html" as FilePath
  const source = path.join(directory, fp)
  const published = path.join(output, fp)
  try {
    for (const type of ["add", "change"] as const) {
      await fs.writeFile(source, type)
      const result = emitter.partialEmit!(ctx, [], resources, [{ type, path: fp }])!
      for await (const emitted of result as AsyncGenerator<FilePath>) await emitted
      assert.equal(await fs.readFile(published, "utf8"), type)
    }
    await fs.unlink(source)
    const result = emitter.partialEmit!(ctx, [], resources, [{ type: "delete", path: fp }])!
    for await (const emitted of result as AsyncGenerator<FilePath>) await emitted
    await assert.rejects(fs.stat(published))
  } finally {
    await fs.rm(root, { recursive: true, force: true })
  }
})
