/**
 * The monospace section label, e.g. "// PROJECTS". The slashes are part of the
 * reference's visual language, so they live here rather than in the copy.
 */
export function Eyebrow({ children, className = '' }: { children: string; className?: string }) {
  return (
    <p className={`eyebrow ${className}`}>
      {/* Braced so the slashes are a string literal, not read as a JS comment. */}
      <span aria-hidden="true">{'// '}</span>
      {children}
    </p>
  )
}
