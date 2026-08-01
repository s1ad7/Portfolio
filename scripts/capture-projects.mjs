/**
 * Captures the hero of every site listed in lib/content.ts and writes it to
 * public/projects/<slug>.jpg.
 *
 * The Projects showcase uses these full-bleed behind the text, so only the top
 * of each site is ever visible. A viewport-sized shot is what is needed; the
 * full-page captures this used to take ran to several megabytes each to serve
 * a crop.
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
import { composeCard, sampleTint } from './lib/compose.mjs'
import { mkdirSync, existsSync, rmSync } from 'node:fs'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(root, 'public', 'projects')

/* Read the project list straight out of content.ts, so this never drifts from
   the site. Parsed with a regex rather than imported, because content.ts is
   TypeScript and this script runs in plain node. */
const source = readFileSync(join(root, 'lib', 'content.ts'), 'utf8')
/* Each entry's block runs from its slug to the next one (or the array's end),
   so an optional captureUrl is picked up without matching the next project's. */
const projects = [...source.matchAll(/slug:\s*'([^']+)'([\s\S]*?)(?=slug:|\n\])/g)].map(
  ([, slug, block]) => {
    const href = block.match(/href:\s*'([^']+)'/)?.[1]
    const captureUrl = block.match(/captureUrl:\s*'([^']+)'/)?.[1]
    // Capture from captureUrl when present: several custom domains do not
    // resolve everywhere, while the Vercel deployment always does.
    return { slug, href, url: captureUrl || href }
  }
).filter((p) => p.url)

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

/**
 * Capture settings.
 *
 * Width 1280 rather than 1440: the preview frame is far narrower than the
 * captured page, so everything is scaled down to fit. Capturing a narrower
 * viewport means the site lays out more compactly and its text survives that
 * downscale. At 1440 into a 653px frame, 16px body copy landed at 7.3px, which
 * is below the legibility floor and reads as mush.
 *
 * deviceScaleFactor 2 gives a 2560px-wide source, which stays crisp full-bleed
 * on a 2x display. Now that each file is one viewport rather than a whole page,
 * quality can go back up to 88 and the set is still far smaller than before.
 *
 * Landscape 1440x900: these become the panes of an angled collage, and a pane
 * only reads as a browser window if it is wider than it is tall.
 */
const VIEWPORT = { width: 1440, height: 900 }
const SCALE = 2
const QUALITY = 88

const browser = await launch()
let ok = 0
let failed = 0

for (const { slug, url } of targets) {
  const ctx = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: SCALE,
    /* Many sites skip their scroll-reveal animations entirely under this, which
       renders content in its final state. Cheapest possible fix for reveals,
       and it costs nothing on sites that ignore it. */
    reducedMotion: 'reduce',
  })
  const page = await ctx.newPage()

  try {
    process.stdout.write(`${slug.padEnd(22)} ${url} ... `)
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 })
    await page.waitForTimeout(2500)

    /* 1. Clear intro modals, cookie banners and consent gates.
     *
     * This has to happen BEFORE scrolling. A modal typically locks body scroll,
     * and if scrolling is locked the scroll-through below silently does nothing,
     * so no scroll-reveal ever fires and the capture comes out full of blank
     * bands. That single cause produced both the overlay and the empty sections
     * on carently.net. */
    const dismissed = await page.evaluate(() => {
      const kill = (el) => el?.parentElement && el.remove()
      let n = 0

      for (const el of document.querySelectorAll(
        '[role="dialog"],[aria-modal="true"],dialog[open]'
      )) {
        kill(el)
        n++
      }

      for (const el of document.querySelectorAll(
        '[class*="cookie" i],[id*="cookie" i],[class*="consent" i],[id*="consent" i],[class*="gdpr" i],[class*="backdrop" i],[class*="overlay" i]'
      )) {
        const s = getComputedStyle(el)
        if (s.position === 'fixed' || s.position === 'absolute') {
          kill(el)
          n++
        }
      }

      // Any remaining fixed element covering most of the viewport is a backdrop.
      for (const el of document.querySelectorAll('body *')) {
        const s = getComputedStyle(el)
        if (s.position !== 'fixed') continue
        const r = el.getBoundingClientRect()
        const covers = r.width * r.height > innerWidth * innerHeight * 0.5
        if (covers && +s.zIndex > 5) {
          kill(el)
          n++
        }
      }

      // Restore scrolling, which the modal almost certainly locked.
      for (const el of [document.body, document.documentElement]) {
        el.style.removeProperty('overflow')
        el.style.removeProperty('position')
        el.style.setProperty('overflow', 'visible', 'important')
      }
      return n
    })

    /* 2. Collapse animation and transition timings so anything triggered
     *    completes instantly rather than being caught mid-flight, and clip
     *    horizontal overflow.
     *
     *    The overflow clip matters: a page that scrolls sideways even slightly
     *    makes fullPage capture at its scrollWidth, so acscripts and acpins came
     *    out 1800px wide instead of 1440. Squeezing that into the preview frame
     *    left a wide empty margin down the right of both. */
    await page.addStyleTag({
      content: `
        *,*::before,*::after{
          animation-duration:0s !important;
          animation-delay:0s !important;
          transition-duration:0s !important;
          transition-delay:0s !important;
        }
        html,body{ overflow-x:hidden !important; max-width:100vw !important; }
      `,
    })

    /* 3. Scroll, so lazy images load and scroll-triggered reveals fire.
     *
     * Two passes: sections whose content arrives from a fetch are often still
     * empty when the first pass goes by, and a second pass gives observers that
     * only bind after hydration another chance. Between them, wait for the
     * network to settle so client-fetched content has actually landed. */
    const sweep = async () => {
      await page.evaluate(async () => {
        const step = window.innerHeight * 0.6
        for (let y = 0; y < document.body.scrollHeight; y += step) {
          window.scrollTo(0, y)
          await new Promise((r) => setTimeout(r, 380))
        }
        window.scrollTo(0, 0)
        await new Promise((r) => setTimeout(r, 500))
      })
    }

    await sweep()
    await page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {})

    // Promote every lazy image, then wait for them all to decode. Without this
    // the taller pages capture half-painted images.
    await page.evaluate(() => {
      for (const img of document.images) {
        img.loading = 'eager'
        img.removeAttribute('data-src-hold')
      }
    })
    await page
      .evaluate(() =>
        Promise.all(
          [...document.images]
            .filter((i) => !i.complete)
            .map((i) => i.decode().catch(() => {}))
        )
      )
      .catch(() => {})

    await sweep()
    await page.waitForTimeout(1200)

    /* 4. Force anything still hidden into its revealed state. Sites whose
     *    reveals are driven by an IntersectionObserver that only fires once,
     *    or that were off-screen during the pass, are still at opacity 0.
     *    Restricted to in-flow elements so genuinely hidden UI (dropdowns,
     *    menus, which are positioned) is left alone. */
    const revealed = await page.evaluate(() => {
      const forced = []

      for (const el of document.querySelectorAll('body *')) {
        const s = getComputedStyle(el)
        if (s.position === 'fixed' || s.position === 'absolute') continue
        if (s.visibility === 'hidden' || s.display === 'none') continue
        const r = el.getBoundingClientRect()
        if (r.width < 8 || r.height < 8) continue

        /* Only un-hide what is actually hidden, and only clear the transform of
           something that was hidden. An element that is visible AND transformed
           is positioned on purpose (a rotator offset, a centring translate), and
           flattening those is what stacked two words of carently.net's rotating
           headline into "DBRVE". */
        if (parseFloat(s.opacity) >= 0.1) continue

        el.style.setProperty('opacity', '1', 'important')
        if (s.transform !== 'none' && !s.transform.startsWith('matrix(1, 0, 0, 1, 0, 0)')) {
          el.style.setProperty('transform', 'none', 'important')
        }
        forced.push(el)
      }

      /* A text rotator keeps several alternates in the DOM at opacity 0, so
         revealing them all overlaps them. Undo any forced element that now sits
         on top of a sibling: whatever was already visible is the one to keep. */
      let reverted = 0
      for (const el of forced) {
        const r = el.getBoundingClientRect()
        for (const sib of el.parentElement?.children ?? []) {
          if (sib === el || forced.includes(sib)) continue
          const sr = sib.getBoundingClientRect()
          const overlapX = Math.min(r.right, sr.right) - Math.max(r.left, sr.left)
          const overlapY = Math.min(r.bottom, sr.bottom) - Math.max(r.top, sr.top)
          if (overlapX <= 0 || overlapY <= 0) continue
          if ((overlapX * overlapY) / (r.width * r.height) > 0.7) {
            el.style.setProperty('opacity', '0', 'important')
            reverted++
            break
          }
        }
      }
      return forced.length - reverted
    })

    /* 5. Pin whatever is left fixed or sticky, so headers appear once at the top
     *    instead of repeating the whole way down a tall capture.
     *
     *    Measure each element BEFORE converting it and re-apply the geometry
     *    afterwards. A fixed header is almost always `width: 100%`, which
     *    resolves against the viewport while fixed but against the nearest
     *    positioned ancestor once absolute, so a plain swap silently shrank
     *    marbio.com's nav to about three-quarters of the page width. Freezing
     *    the measured width in pixels sidesteps the containing-block change
     *    entirely. */
    await page.evaluate(() => {
      const pending = []
      for (const el of document.querySelectorAll('body *')) {
        const s = getComputedStyle(el)
        if (s.position === 'fixed' || s.position === 'sticky') {
          const r = el.getBoundingClientRect()
          pending.push({ el, width: r.width, height: r.height, left: r.left })
        }
      }
      for (const { el, width, height, left } of pending) {
        el.style.setProperty('position', 'absolute', 'important')
        el.style.setProperty('width', `${width}px`, 'important')
        el.style.setProperty('max-width', 'none', 'important')
        if (height) el.style.setProperty('min-height', `${height}px`, 'important')
        if (left === 0) el.style.setProperty('left', '0px', 'important')
      }
    })

    await page.waitForTimeout(900)
    process.stdout.write(`[-${dismissed} overlay, +${revealed} shown] `)

    /* Three shots down the page, then composed into one angled collage.
     *
     * The reference's cards are not flat screenshots: each is three or four
     * views of the site rotated to a common angle, overlapped along a diagonal,
     * each with rounded corners and a drop shadow, over a gradient drawn from
     * the site's own palette. A single flat capture next to that looks inert,
     * so this reproduces the technique.
     *
     * Composition happens in the browser rather than through an image library:
     * CSS already does rotation, radius and shadow, and Playwright is here
     * anyway, so it costs no extra dependency. */
    const pageHeight = await page.evaluate(() => document.body.scrollHeight)
    const stops = [0, Math.round(pageHeight * 0.3), Math.round(pageHeight * 0.62)]
    const shots = []

    for (const y of stops) {
      await page.evaluate((yy) => window.scrollTo(0, yy), y)
      await page.waitForTimeout(700)
      const buf = await page.screenshot({ type: 'jpeg', quality: 90 })
      shots.push(`data:image/jpeg;base64,${buf.toString('base64')}`)
    }

    // Backdrop colour, taken from the hero's dominant brand colour.
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(400)
    const tint = await sampleTint(browser, shots[0])

    await composeCard(browser, shots, tint, join(outDir, `${slug}.jpg`))
    console.log(`ok  collage 1600x1200  tint rgb(${tint.join(',')})`)
    ok++
  } catch (e) {
    console.log(`FAILED  ${String(e).split('\n')[0].slice(0, 90)}`)
    failed++
  }

  await ctx.close()
}

await browser.close()


/* Drop Next's optimised-image cache.
 *
 * next/image caches derivatives under .next/cache/images keyed by the source
 * path, and these screenshots keep the same path every time they are
 * recaptured. The cache therefore keeps serving the previous shot, and it looks
 * as though the capture silently did nothing. Clearing it here means a
 * recapture is always visible after a dev-server restart. */
const imageCache = join(root, '.next', 'cache', 'images')
if (existsSync(imageCache)) {
  rmSync(imageCache, { recursive: true, force: true })
  console.log('cleared .next/cache/images')
}

console.log(`\n${ok} captured, ${failed} failed -> public/projects/`)
console.log('\nRestart the dev server and hard-reload (Ctrl+Shift+R) to see the new shots.')
if (failed) process.exit(1)
