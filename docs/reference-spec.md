# Reference spec: paul-hahn.com

Single source of truth for this site's design. Every value below was **measured
off the live reference**, not estimated: computed styles harvested from a
headless browser at four breakpoints, animation curves sampled frame by frame,
hover states provoked and diffed, and colours read from screenshot pixels where
the DOM was ambiguous.

Reference: <https://paul-hahn.com/en/> (gallery entry: `framer.com/community/gallery/paul-hahn`)
Audited at viewport widths 1440, 1280, 768 and 390.

When something here disagrees with the code, this document wins. If you change a
value, re-measure rather than eyeballing a screenshot.

---

## 1. Colour

| Token | Value | Use |
|---|---|---|
| `--color-bg` | `#ffffff` | page background |
| `--color-panel` | `#f2f2f2` | hero card, tinted section cards |
| `--color-panel-2` | `#e8e8e8` | badge gradient end, secondary fills |
| `--color-line` | `#d1d1d1` | dividers, card borders |
| `--color-hairline` | `#ededed` | borders on controls sitting on white |
| `--color-ink` | `#191d21` | headings, body at full strength |
| `--color-muted` | `rgb(25 29 33 / 0.7)` | body copy, nav links on hover |
| `--color-faint` | `rgb(25 29 33 / 0.5)` | de-emphasised meta |
| `--color-ink-cta` | `#181818` | the dark CTA capsule fill |
| `--color-ink-cta-hover` | `#424242` | that capsule on hover |
| `--color-accent` | `#4d80d1` | eyebrow labels, focus rings, small marks |
| `--color-accent-tint` | `rgb(77 128 209 / 0.1)` | icon backplates |
| `--color-wordmark` | `#5d6063` | (present but the wordmark uses `--color-muted`) |

Notes:

- The palette is near-monochrome. Blue appears almost exclusively on the
  `// SECTION` eyebrows, which is where nearly all the page's colour lives.
- Muted text uses **plain sRGB alpha**, not Tailwind's `/70` modifier. That
  modifier mixes in oklab and pushes this slightly-blue ink visibly cooler.
- The CTA fill is `#181818`, which is *not* `--color-ink`. Do not merge them.

## 2. Typography

Two families. Bricolage Grotesque carries every heading and all interactive
chrome; Poppins carries body copy and labels. (The reference also loads Work Sans
at 16/400 for a small amount of body text, and Fragment Mono for inline code
only — neither is needed here.)

| Role | Font | Size | Weight | Tracking | Leading |
|---|---|---|---|---|---|
| Hero display | Bricolage Grotesque | 96px | 600 | -0.04em | 1.2 |
| Section heading (h2) | Bricolage Grotesque | 32px | 600 | normal | — |
| Card title (h3) | Bricolage Grotesque | 20px | 600 | normal | 1.5 |
| Wordmark | Bricolage Grotesque | 24px | 600 | -0.03em | 1.1 |
| Nav link | Bricolage Grotesque | 16px | 600 | normal | 1.2 |
| CTA label | Bricolage Grotesque | 16px | 600 | normal | 1.2 |
| Eyebrow (`// PROJECTS`) | Poppins | 14px | 600 | +0.03em | 1.1 |
| Body / intro | Poppins | 16px | 400 | normal | 1.8 |
| FAQ question | Poppins | 16px | 500 | normal | 1.5 |
| Hero badge | Poppins | 16px | 400 | +0.09em, uppercase | 1.1 |
| Small meta | Poppins | 12–14px | 400 | normal | — |

Body copy is `--color-muted`; headings are `--color-ink`; eyebrows are
`--color-accent`.

## 3. Structure and geometry (at 1440px)

The page is a vertical stack of rounded cards inset from the viewport edges,
sitting on white. Alternating fills are what separate them.

| Element | Box (x, y, w, h) | Radius | Fill |
|---|---|---|---|
| Nav bar | `24, 0, 1392, 80` | `0 0 40px 40px` | `rgb(255 255 255 / 0.7)` + backdrop blur, shadow ramp |
| Hero card | `24, 104, 1392, 772` | `40px` | `#f2f2f2`, no shadow |
| Section card | `24, …, 1392, auto` | `40px` | white or `#f2f2f2`, no shadow |

- Side inset is **24px**; the gap between nav and hero is also **24px**.
- Content measure inside a card is **1200px**, centred (so 120px gutters at
  1440). Implemented as `max-w-[1280px]` with 40px padding.
- Nav content is constrained to the same measure: wordmark left, then nav links
  **and** the CTA as one right-aligned group on a **32px** gap rhythm.
- Radii in use: `2, 8, 12, 16, 24, 40`, plus full capsules for buttons/badges.

### Shadow ramp

Three stops, not one blur. This is what grounds the cards.

```
0 0.6px  0.6px  -1.25px rgb(0 0 0 / 0.07),
0 2.29px 2.29px -2.5px  rgb(0 0 0 / 0.06),
0 10px   10px   -3.75px rgb(0 0 0 / 0.05)
```

## 4. Section order

`hero` → `// PROJECTS` → `// ABOUT ME` → `// SERVICES` → `// FAQ` →
`// GET IN TOUCH` → footer.

This site substitutes **Skills** for Services, since it is a portfolio rather
than a freelance pitch. Everything else maps one to one.

## 5. Motion

### Scroll reveal

One spring drives everything. Verified by sampling a reveal at frame resolution
and fitting the trace.

```
initial:  { opacity: 0, y: 24 }
animate:  { opacity: 1, y: 0 }
spring:   { type: 'spring', stiffness: 150, damping: 30, mass: 1 }
```

The travel is **24px**. Measured trace, for regression checking:

| t (ms) | opacity | y |
|---|---|---|
| 7 | 0.000 | 24.00 |
| 105 | 0.291 | 17.02 |
| 205 | 0.607 | 9.44 |
| 405 | 0.889 | 2.66 |
| 605 | 0.969 | 0.75 |
| 755 | 0.988 | 0.00 |

That spring is overdamped (ζ ≈ 1.22), so there is no overshoot — the curve is a
clean decay settling at roughly 750ms.

### Hover states

Measured by provoking each one and diffing computed styles. All three are more
restrained than they look:

| Target | Change | Notes |
|---|---|---|
| Project card | shadow alpha `0.07` → `0.25`, offsets tighten slightly | **Nothing else.** No lift, no image scale, no title recolour. |
| Nav link | `#191d21` → `rgb(25 29 33 / 0.7)` | Full ink **at rest**, fades on hover. Note the direction. |
| CTA capsule | bg `#181818` → `#424242` | Lightens. |

### Easing and transitions

- Interaction easing: `cubic-bezier(0.44, 0, 0.56, 1)`.
- The only CSS transition the reference declares is `opacity 0.1s ease`;
  everything else is JS-driven, so do not expect to find hover effects in CSS.

### What the reference does *not* do

Worth stating, because these are easy to add by accident:

- **No parallax.** The hero portrait moves exactly 1:1 with scroll (200px of
  scroll moved it 200px).
- **No scroll indicator, effectively.** A double chevron exists at the bottom of
  the hero but sits at `opacity: 0.016`, i.e. invisible. Do not reproduce it at
  full strength.
- **No page-load stagger.** Exactly one page-load appear animation is
  registered, on that chevron, at a 2.5s delay.
- **No card lift or image zoom on hover** (see the table above).

## 6. Hero detail

- Grey `#f2f2f2` card, `40px` radius, inset 24px, 772px tall at a 900px viewport.
- Content is vertically centred: badge, display headline, subline.
- **Badge**: Poppins 16/400, `+0.09em`, uppercase, filled with a
  `#f2f2f2 → #e6e6e6` top-to-bottom gradient, hairline border, full capsule.
- **Inline portrait**: sits *inside* the headline between the greeting and the
  name. `169 × 176` at 1440 (about 1.5× the 115px line box), `12px` radius,
  white frame, tilted a few degrees, layered shadow. This is the signature
  element of the whole design.
- **Dot grid** behind the headline: soft blobs roughly **10px** across on a
  **40px** grid at about **7%** ink, radially masked so it fades out. Fine hard
  dots read as speckle and look nothing like it.

## 7. Language switcher

Pill beside the wordmark. Measured: `69 × 36`, radius **12px** (a rounded
rectangle, **not** a capsule), `1px #ededed` border, white fill, no shadow,
padding `8px 8px 8px 12px`, gap `4px`, flag `25 × 18` with `3px` radius.

The reference serves `/de` and `/en` with fully translated copy. This site is
English-only for now, so the control lists French as unavailable rather than
pretending to switch.

## 8. How to re-audit

The harness lives in the session scratchpad (`audit.mjs`, `effects.mjs`,
`curve.mjs`). It writes `ref-audit.json` (~1.7MB of computed styles across four
breakpoints), `ref-effects.json` (hover and reveal deltas) and `ref-curve.json`
(the frame-by-frame trace). Re-run it rather than guessing when a value is in
doubt.
