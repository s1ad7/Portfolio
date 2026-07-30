import { useId } from 'react'

/**
 * Inline flag artwork, as the reference uses. Drawn as SVG rather than emoji:
 * regional-indicator emoji render as bare letters on Windows, whereas this is
 * identical everywhere.
 *
 * The viewBox is 50x36 (about 1.39:1) to match the reference's 25x18 flag box.
 * That is deliberately not the UK flag's official 2:1 ratio: a 2:1 viewBox in an
 * 18px-tall box gets letterboxed by preserveAspectRatio and the artwork shrinks
 * with invisible padding above and below.
 */
export function Flag({ code, className = '' }: { code: 'gb' | 'fr'; className?: string }) {
  // Clip paths are referenced by id, so each instance needs its own.
  const clip = `flag-${useId().replace(/:/g, '')}`

  return (
    <svg
      viewBox="0 0 50 36"
      width="25"
      height="18"
      className={`shrink-0 ${className}`}
      role="img"
      aria-label={code === 'gb' ? 'English' : 'French'}
    >
      <clipPath id={clip}>
        <rect width="50" height="36" rx="3" />
      </clipPath>

      <g clipPath={`url(#${clip})`}>
        {code === 'gb' ? (
          <>
            <rect width="50" height="36" fill="#012169" />
            {/* White saltire, then the narrower red saltire over it. */}
            <path d="M0 0 50 36M50 0 0 36" stroke="#fff" strokeWidth="8" />
            <path d="M0 0 50 36M50 0 0 36" stroke="#C8102E" strokeWidth="4" />
            {/* White cross, then the narrower red cross. */}
            <path d="M25 0v36M0 18h50" stroke="#fff" strokeWidth="13" />
            <path d="M25 0v36M0 18h50" stroke="#C8102E" strokeWidth="7" />
          </>
        ) : (
          <>
            <rect width="17" height="36" fill="#002395" />
            <rect x="17" width="16" height="36" fill="#fff" />
            <rect x="33" width="17" height="36" fill="#ED2939" />
          </>
        )}
      </g>
    </svg>
  )
}
