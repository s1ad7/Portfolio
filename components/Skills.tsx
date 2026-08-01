'use client'

import type { ReactNode } from 'react'
import { skillsSection, type SkillCard } from '@/lib/content'
import { Pill } from './ui/Pill'
import { Reveal } from './ui/Reveal'
import { Section } from './ui/Section'

/* Inline SVGs rather than an icon dependency: three icons is not worth a
   package, and these can be tuned to the 1.5px stroke weight used site-wide. */
const icons: Record<SkillCard['icon'], ReactNode> = {
  layout: (
    <>
      <rect x="2.75" y="3.75" width="18.5" height="16.5" rx="2.25" />
      <path d="M2.75 9h18.5M9 9v11.25" />
    </>
  ),
  cart: (
    <>
      <path d="M3 3.75h2l2.2 11.5h11.3l2.25-8.5H6.1" />
      <circle cx="8.75" cy="19.5" r="1.4" />
      <circle cx="17" cy="19.5" r="1.4" />
    </>
  ),
  workflow: (
    <>
      <rect x="2.75" y="2.75" width="7" height="7" rx="2" />
      <rect x="14.25" y="14.25" width="7" height="7" rx="2" />
      <path d="M6.25 9.75v4.5a2 2 0 002 2h6" />
    </>
  ),
}

function SkillIcon({ name }: { name: SkillCard['icon'] }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {icons[name]}
    </svg>
  )
}

export function Skills() {

  return (
    <Section
      id="services"
      eyebrow={skillsSection.eyebrow}
      heading={skillsSection.heading}
      intro={skillsSection.intro}
      tone="white"
    >
      <Reveal stagger={0.1} className="grid gap-6 md:grid-cols-3">
        {skillsSection.cards.map((card) => (
          <article
            key={card.title}
            className="flex flex-col gap-4 rounded-panel border border-line/70 bg-white p-7 shadow-ramp md:p-8"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/10 text-accent">
              <SkillIcon name={card.icon} />
            </span>

            <h3 className="font-body text-base font-medium">{card.title}</h3>
            <p className="text-sm leading-relaxed text-muted">{card.body}</p>

            <ul className="mt-auto flex flex-wrap gap-2 pt-2">
              {card.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-line bg-panel px-3 py-1 text-[11px] tracking-[0.03em] text-muted"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </Reveal>

      <Reveal delay={0.1} className="mt-12 flex justify-center">
        <Pill href={skillsSection.cta.href} variant="dark">
          {skillsSection.cta.label}
        </Pill>
      </Reveal>
    </Section>
  )
}
