import Link from 'next/link'
import { site } from '@/lib/content'

/**
 * Two-line stacked wordmark, as on the reference: given name at 70% ink,
 * surname at full ink, Bricolage Grotesque semibold.
 *
 * The reference's version reads as a solid block only because "Paul" and "Hahn"
 * happen to be the same width. "SAAD" and "IFLI" are not, so the lines are
 * width-matched rather than left to chance:
 *
 *   - `inline-grid` with one column sizes that column to the widest line.
 *   - each line is a flex row of individual letters with `justify-between`, so
 *     grid stretching spreads the narrower line's letters across the column.
 *
 * Both edges end up flush, and it adapts to any name with no hand-tuned
 * letter-spacing to go stale. Set in caps because the narrow lowercase glyphs
 * (i, f, l) would otherwise need distractingly wide gaps to reach the width.
 *
 * Per-letter spans would read as "S A A D" aloud, so the grid is hidden from the
 * accessibility tree and the link carries a real label.
 */
export function Wordmark({ className = '' }: { className?: string }) {
  const lines = [
    { text: site.firstName.toUpperCase(), tone: 'text-muted' },
    { text: site.lastName.toUpperCase(), tone: 'text-ink' },
  ]

  return (
    <Link
      href="#top"
      aria-label={`${site.name}, back to top`}
      className={`font-display text-[1.125rem] leading-[1.2] font-semibold md:text-[1.25rem] ${className}`}
    >
      <span aria-hidden="true" className="inline-grid">
        {lines.map(({ text, tone }) => (
          <span key={text} className={`flex justify-between ${tone}`}>
            {text.split('').map((char, i) => (
              <span key={`${text}-${i}`}>{char}</span>
            ))}
          </span>
        ))}
      </span>
    </Link>
  )
}
