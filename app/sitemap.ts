import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/site-url'

/**
 * One page, so one entry. `lastModified` is stamped at build time, which is the
 * honest signal: it changes when the content is redeployed.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
