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
  /* Push the sample away from grey before using it. Averaging a whole hero
     tends toward mud, and a muddy backdrop makes the whole card look flat. */
  const avg = (r + g + b) / 3
  const sat = (c) => Math.max(0, Math.min(255, Math.round(avg + (c - avg) * 2.2)))
  const [sr, sg, sb] = [sat(r), sat(g), sat(b)]
  const shade = (c, amt) => Math.max(0, Math.min(255, Math.round(c * amt)))
  const dark = `rgb(${shade(sr, 0.42)}, ${shade(sg, 0.42)}, ${shade(sb, 0.42)})`
  const light = `rgb(${shade(sr, 0.95)}, ${shade(sg, 0.95)}, ${shade(sb, 0.95)})`

  const html = `<!doctype html><html><head><meta charset="utf-8"><style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{width:1600px;height:1200px;overflow:hidden;
         background:linear-gradient(135deg, ${dark} 0%, ${light} 100%)}
    .stage{position:relative;width:1600px;height:1200px;
           perspective:2200px;transform-style:preserve-3d}
    .shot{position:absolute;width:880px;border-radius:12px;overflow:hidden;
          box-shadow:0 40px 80px -20px rgba(0,0,0,.55), 0 8px 24px -8px rgba(0,0,0,.4);
          transform-origin:center}
    .shot img{display:block;width:100%;height:auto}
    /* Common angle, staggered along a diagonal, back to front. */
    .s1{left:-120px; top:-40px;  transform:rotate(-14deg) scale(.88); z-index:1}
    .s2{left:330px;  top:250px;  transform:rotate(-14deg); z-index:3}
    .s3{left:830px;  top:640px;  transform:rotate(-14deg) scale(.92); z-index:2}
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
