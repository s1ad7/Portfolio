import { ImageResponse } from 'next/og'
import { site } from '@/lib/content'

export const alt = `${site.name}, ${site.role}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/**
 * The card shown when the site is pasted into WhatsApp, LinkedIn or X.
 *
 * Generated rather than a static file so it can never drift from the content
 * module, and drawn with system fonts only: fetching Bricolage at build time
 * would add a network dependency to the build for a difference nobody can spot
 * at card size.
 */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#f2f2f2',
          padding: 72,
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', color: '#4d80d1', fontSize: 28, letterSpacing: 4 }}>
          {site.role.toUpperCase()}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ display: 'flex', fontSize: 92, fontWeight: 700, color: '#191d21' }}>
            {site.name}
          </div>
          <div style={{ display: 'flex', fontSize: 34, color: '#3f444a', maxWidth: 900 }}>
            Websites, stores and automations that turn visitors into customers.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 26,
            color: '#3f444a',
          }}
        >
          <div style={{ display: 'flex' }}>{site.url.replace('https://', '')}</div>
          <div style={{ display: 'flex', gap: 28 }}>
            <span>30+ projects</span>
            <span>·</span>
            <span>Worldwide</span>
          </div>
        </div>
      </div>
    ),
    size
  )
}
