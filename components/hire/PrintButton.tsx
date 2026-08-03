'use client'

/**
 * Prints the page, which is also the CV.
 *
 * A button rather than a link to a PDF file: a checked-in PDF is a second copy
 * that drifts the moment any content changes, and this way the document a
 * recruiter saves is always exactly what the site says today.
 */
export function PrintButton({ label, hint }: { label: string; hint: string }) {
  return (
    <span className="flex flex-col gap-1">
      <button
        type="button"
        onClick={() => window.print()}
        className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-white px-5 py-2.5 font-display text-base font-semibold text-ink transition-colors duration-200 ease-signature hover:border-ink"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 6V2h8v4M4 12H2V6h12v6h-2M4 10h8v4H4z" />
        </svg>
        {label}
      </button>
      <span className="text-xs text-muted">{hint}</span>
    </span>
  )
}
