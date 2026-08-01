import type { MetadataRoute } from 'next'
import { site } from '@/lib/content'

/**
 * One page, so one entry. `lastModified` is stamped at build time, which is the
 * honest signal: it changes when the content is redeployed.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
