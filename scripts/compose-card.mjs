/**
 * Builds a project card collage from screenshots you already have on disk.
 *
 * Use this when `capture:projects` cannot reach a site: take the screenshots
 * yourself (on a VPN, another machine, whatever works) and hand them over. The
 * output is identical to what the automated capture produces, so a hand-made
 * card is indistinguishable from the rest.
 *
 * Usage:
 *   npm run compose:card -- <slug> <hero.png> <second.png> [third.png]
 *
 * The FIRST image is the hero and becomes the front, most visible pane. Give it
 * two or three shots from different parts of the page; more than three are
 * ignored, since the composition only has three slots.
 */
import { chromium } from 'playwright'
import { existsSync, readFileSync, rmSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, extname, join, resolve } from 'node:path'
import { composeCard } from './lib/compose.mjs'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const args = process.argv.slice(2)

if (args.length < 3) {
  console.error('Usage: npm run compose:card -- <slug> <hero.png> <second.png> [third.png]')
  console.error('Example:')
  console.error('  npm run compose:card -- everstead hero.png process.png industries.png')
  process.exit(1)
}

const [slug, ...files] = args
const paths = files.slice(0, 3).map((f) => resolve(f))

for (const p of paths) {
  if (!existsSync(p)) {
    console.error(`Not found: ${p}`)
    process.exit(1)
  }
}

const mime = (p) => {
  const e = extname(p).toLowerCase()
  return e === '.png' ? 'image/png' : e === '.webp' ? 'image/webp' : 'image/jpeg'
}
const shots = paths.map((p) => `data:${mime(p)};base64,${readFileSync(p).toString('base64')}`)

// Three panes are expected; repeat the last if fewer were supplied.
while (shots.length < 3) shots.push(shots[shots.length - 1])

const browser = await chromium.launch()

/* Average colour of the hero, for the backdrop gradient. Sampled in a page
   rather than with an image library, so this needs no extra dependency. */
const probe = await (await browser.newContext()).newPage()
await probe.setContent('<canvas id="c"></canvas>')
const tint = await probe.evaluate(async (dataUrl) => {
  const img = new Image()
  img.src = dataUrl
  await img.decode()
  const c = document.getElementById('c')
  c.width = 40
  c.height = 40
  const ctx = c.getContext('2d')
  ctx.drawImage(img, 0, 0, 40, 40)
  const d = ctx.getImageData(0, 0, 40, 40).data
  let r = 0, g = 0, b = 0
  for (let i = 0; i < d.length; i += 4) {
    r += d[i]; g += d[i + 1]; b += d[i + 2]
  }
  const n = d.length / 4
  return [Math.round(r / n), Math.round(g / n), Math.round(b / n)]
}, shots[0])

const out = join(root, 'public', 'projects', `${slug}.jpg`)
await composeCard(browser, shots, tint, out)
await browser.close()

// Same cache problem the capture script hits: next/image keys its derivatives
// on the path, which has not changed, so it would keep serving the old picture.
const imageCache = join(root, '.next', 'cache', 'images')
if (existsSync(imageCache)) {
  rmSync(imageCache, { recursive: true, force: true })
  console.log('cleared .next/cache/images')
}

console.log(`wrote public/projects/${slug}.jpg  (tint rgb(${tint.join(',')}))`)
console.log('\nRestart the dev server and hard-reload (Ctrl+Shift+R) to see it.')
