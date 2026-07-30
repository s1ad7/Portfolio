import Link from 'next/link'
import { site } from '@/lib/content'
import { Container } from './ui/Section'
import { Wordmark } from './Navbar'

const social = [
  { label: 'GitHub', href: site.links.github },
  { label: 'LinkedIn', href: site.links.linkedin },
  { label: 'Email', href: `mailto:${site.email}` },
]

export function Footer() {
  return (
    <footer className="border-t border-line bg-panel/50 py-14">
      <Container>
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-3">
            <Wordmark />
            <p className="max-w-xs text-sm leading-relaxed text-ink/50">{site.tagline}</p>
          </div>

          <nav aria-label="Social" className="flex flex-col gap-3">
            {social.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-ink/60 transition-colors duration-200 ease-signature hover:text-accent"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-xs text-ink/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <p>{site.location}</p>
        </div>
      </Container>
    </footer>
  )
}
