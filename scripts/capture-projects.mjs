/**
 * Captures a tall full-page screenshot of every site listed in lib/content.ts
 * and writes it to public/projects/<slug>.jpg.
 *
 * The Projects showcase pans down these images as you scroll, so they need to
 * be full-page captures rather than hero crops.
 *
 * Usage:
 *   npm run capture:projects              capture everything
 *   npm run capture:projects -- marbio    capture one site by slug
 *
 * Uses your installed Chrome by default, so there is no browser to download.
 * If that fails, it falls back to Playwright's bundled Chromium, which you can
 * install with:  npx playwright install chromium
 */
import { chromium } from 'playwright'
import { mkdirSync, existsSync, writeFileSync } from 'node:fs'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(root, 'public', 'projects')

/* Read the project list straight out of content.ts, so this never drifts from
   the site. Parsed with a regex rather than imported, because content.ts is
   TypeScript and this script runs in plain node. */
const source = readFileSync(join(root, 'lib', 'content.ts'), 'utf8')
const projects = [...source.matchAll(/slug:\s*'([^']+)'[\s\S]*?href:\s*'([^']+)'/g)].map(
  ([, slug, href]) => ({ slug, href })
)

if (projects.length === 0) {
  console.error('No projects found in lib/content.ts. Has the Project shape changed?')
  process.exit(1)
}

const only = process.argv.slice(2).filter((a) => !a.startsWith('-'))
const targets = only.length ? projects.filter((p) => only.includes(p.slug)) : projects

if (targets.length === 0) {
  console.error(`No project matched "${only.join(', ')}".`)
  console.error(`Available: ${projects.map((p) => p.slug).join(', ')}`)
  process.exit(1)
}

if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true })

/** Prefer installed Chrome; fall back to bundled Chromium. */
async function launch() {
  try {
    return await chromium.launch({ channel: 'chrome' })
  } catch {
    console.log('Installed Chrome not found, falling back to bundled Chromium.')
    return await chromium.launch()
  }
}

const browser = await launch()
let ok = 0
let failed = 0

/* Records each capture's pixel dimensions. The showcase needs them to size the
   pan: pages differ wildly in length (1.5:1 to over 4:1 here), so a hardcoded
   pan distance either stops short of the footer or races past it. */
const manifestPath = join(outDir, 'manifest.json')
const manifest = existsSync(manifestPath)
  ? JSON.parse(readFileSync(manifestPath, 'utf8'))
  : {}

for (const { slug, href } of targets) {
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  })
  const page = await ctx.newPage()

  try {
    process.stdout.write(`${slug.padEnd(22)} ${href} ... `)
    await page.goto(href, { waitUntil: 'domcontentloaded', timeout: 60000 })

    // Scroll the whole page so lazy images load and scroll-triggered content
    // reveals before the capture. Otherwise the tall shot is full of gaps.
    await page.evaluate(async () => {
      const step = window.innerHeight * 0.8
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y)
        await new Promise((r) => setTimeout(r, 350))
      }
      window.scrollTo(0, 0)
      await new Promise((r) => setTimeout(r, 600))
    })

    // Hide cookie banners and other fixed overlays, which otherwise repeat all
    // the way down a full-page capture.
    await page.addStyleTag({
      content: `
        [class*="cookie" i], [id*="cookie" i],
        [class*="consent" i], [id*="consent" i],
        [class*="gdpr" i] { display: none !important; }
        *[style*="position: fixed"], .fixed { position: absolute !important; }
      `,
    })
    await page.waitForTimeout(800)

    // JPEG, not PNG: these are photographic full-page shots and PNG runs to
    // several MB each, which is a lot of repo weight for no visible gain.
    await page.screenshot({
      path: join(outDir, `${slug}.jpg`),
      fullPage: true,
      type: 'jpeg',
      quality: 80,
    })
    const { width, height } = await page.evaluate(() => ({
      width: document.documentElement.scrollWidth,
      height: document.body.scrollHeight,
    }))
    manifest[slug] = { width, height }
    console.log(`ok  ${width}x${height}  (${(height / width).toFixed(2)}:1)`)
    ok++
  } catch (e) {
    console.log(`FAILED  ${String(e).split('\n')[0].slice(0, 90)}`)
    failed++
  }

  await ctx.close()
}

await browser.close()

writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n')
console.log(`\n${ok} captured, ${failed} failed -> public/projects/`)
console.log('manifest written -> public/projects/manifest.json')
if (failed) process.exit(1)
