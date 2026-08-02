import { getContent } from '@/lib/content'
import type { Locale } from '@/lib/i18n'

/**
 * The remote-working facts, stated plainly.
 *
 * A client hiring across a border screens for a specific short list before
 * they look at any work: can we talk during my day, in a language we share,
 * and will I have to chase him. The site answered none of it, which quietly
 * loses exactly the international remote work Saad wants.
 *
 * Server-rendered, no JavaScript: it is four facts, and facts do not need a
 * component that ships.
 */
export function RemoteBand({ locale }: { locale: Locale }) {
  const { remote } = getContent(locale).about

  return (
    <div className="mt-12 border-t border-line pt-10 md:mt-16">
      <h3 className="label-caps mb-6">{remote.title}</h3>

      <dl className="grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
        {remote.items.map((item) => (
          <div key={item.label} className="flex flex-col gap-1.5">
            <dt className="font-ui text-sm text-muted">{item.label}</dt>
            <dd className="flex flex-col gap-1.5">
              <span className="font-display text-2xl text-ink">{item.value}</span>
              <span className="copy text-sm text-body">{item.detail}</span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
