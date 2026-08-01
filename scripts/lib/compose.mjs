/**
 * Shared collage composer.
 *
 * Used by both capture-projects.mjs (screenshots it takes itself) and
 * compose-card.mjs (screenshots you supply), so a hand-made card is identical
 * to an automated one.
 */
/**
 * Builds the angled collage: three screenshots rotated to a common angle,
 * overlapped along a diagonal, over a gradient drawn from the site's own
 * average colour. Rendered as a page and screenshotted at 1600x1200, which is
 * the 4:3 the card's 533x400 image slot expects.
 */
export async function composeCard(browser, shots, tint, outPath) {
  const [r, g, b] = tint
  // Two stops either side of the sampled colour give the backdrop depth without
  // drifting away from the site's own palette.
  /* The tint arrives as a dominant brand colour, not an average. Sampling the
     reference's own cards shows strongly saturated backdrops (a warm brown at
     rgb(124,71,3), a blue at rgb(42,103,184)), whereas averaging a whole hero
     lands on grey because most of a page is light UI. */
  const shade = (c, amt) => Math.max(0, Math.min(255, Math.round(c * amt)))
  const dark = `rgb(${shade(r, 0.55)}, ${shade(g, 0.55)}, ${shade(b, 0.55)})`
  const light = `rgb(${shade(r, 1.15)}, ${shade(g, 1.15)}, ${shade(b, 1.15)})`

  const html = `<!doctype html><html><head><meta charset="utf-8"><style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{width:1600px;height:1200px;overflow:hidden;
         background:linear-gradient(135deg, ${dark} 0%, ${light} 100%)}
    .stage{position:relative;width:1600px;height:1200px;
           perspective:2200px;transform-style:preserve-3d}
    .shot{position:absolute;width:1180px;border-radius:12px;overflow:hidden;
          box-shadow:0 40px 80px -20px rgba(0,0,0,.55), 0 8px 24px -8px rgba(0,0,0,.4);
          transform-origin:center}
    .shot img{display:block;width:100%;height:auto}
    /* Common angle, staggered along a diagonal, back to front. */
    /* Sized and placed so the panes run off every edge, the way the
       reference's do: the backdrop should only show through in the corner
       gaps, not frame the composition. */
    .s1{left:-330px; top:-260px; transform:rotate(-14deg) scale(.92); z-index:1}
    .s2{left:190px;  top:130px;  transform:rotate(-14deg); z-index:3}
    .s3{left:700px;  top:560px;  transform:rotate(-14deg) scale(.96); z-index:2}
  </style></head><body><div class="stage">
    <div class="shot s1"><img src="${shots[1]}"></div>
    <div class="shot s3"><img src="${shots[2]}"></div>
    <div class="shot s2"><img src="${shots[0]}"></div>
  </div></body></html>`

  const ctx = await browser.newContext({ viewport: { width: 1600, height: 1200 }, deviceScaleFactor: 1 })
  const page = await ctx.newPage()
  await page.setContent(html, { waitUntil: 'load' })
  await page.waitForTimeout(600)
  await page.screenshot({ path: outPath, type: 'jpeg', quality: 88 })
  await ctx.close()
}

/**
 * Picks a card's backdrop colour from its hero screenshot.
 *
 * Deliberately NOT the average. Most of a web page is light UI chrome, so
 * averaging lands on grey and the resulting cards look washed out. Sampling the
 * reference's own cards shows the opposite: strongly saturated brand colours,
 * a warm brown at rgb(124,71,3), a blue at rgb(42,103,184).
 *
 * So this buckets the pixels, throws away anything near white, near black or
 * near grey, and returns the most prominent saturated colour that remains,
 * weighting frequency and saturation together so a large muted area does not
 * beat a small vivid one outright. Falls back to the average when a page really
 * has no colour in it, which is correct for the near-black sites.
 */
export async function sampleTint(browser, dataUrl) {
  const ctx = await browser.newContext()
  const page = await ctx.newPage()
  await page.setContent('<canvas id="c"></canvas>')
  const tint = await page.evaluate(async (src) => {
    const img = new Image()
    img.src = src
    await img.decode()
    const N = 64
    const c = document.getElementById('c')
    c.width = N
    c.height = N
    const g = c.getContext('2d')
    g.drawImage(img, 0, 0, N, N)
    const d = g.getImageData(0, 0, N, N).data

    const buckets = new Map()
    let ar = 0, ag = 0, ab = 0, n = 0
    for (let i = 0; i < d.length; i += 4) {
      const r = d[i], gg = d[i + 1], b = d[i + 2]
      ar += r; ag += gg; ab += b; n++

      const mx = Math.max(r, gg, b)
      const mn = Math.min(r, gg, b)
      if (mn > 225) continue          // near white
      if (mx < 32) continue           // near black
      if (mx - mn < 30) continue      // near grey

      // 32-level bins: coarse enough to group a brand colour together.
      const key = `${r >> 5}|${gg >> 5}|${b >> 5}`
      const cur = buckets.get(key) || { r: 0, g: 0, b: 0, n: 0 }
      cur.r += r; cur.g += gg; cur.b += b; cur.n++
      buckets.set(key, cur)
    }

    let best = null, bestScore = 0
    for (const v of buckets.values()) {
      const r = v.r / v.n, g2 = v.g / v.n, b = v.b / v.n
      const sat = Math.max(r, g2, b) - Math.min(r, g2, b)
      // sqrt on the count so a big dull region cannot swamp a vivid accent.
      const score = sat * Math.sqrt(v.n)
      if (score > bestScore) {
        bestScore = score
        best = [Math.round(r), Math.round(g2), Math.round(b)]
      }
    }
    return best ?? [Math.round(ar / n), Math.round(ag / n), Math.round(ab / n)]
  }, dataUrl)
  await ctx.close()
  return tint
}
