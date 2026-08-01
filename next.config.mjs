/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The floating dev-tools badge overlaps the bottom-left of the design.
  devIndicators: false,
  images: {
    /* Project cards append a content hash as `?v=` so the URL changes whenever
       the collage is regenerated, and Next 16 rejects query strings on local
       images unless the path is declared here.

       Both entries are needed. Declaring localPatterns REPLACES the permissive
       default rather than adding to it, so listing only /projects broke every
       other local image: the hero portrait started returning 400. The second
       entry restores the default for everything else, with `search: ''` keeping
       the query surface limited to /projects. */
    localPatterns: [{ pathname: '/projects/**' }, { pathname: '/**', search: '' }],
  },
}

export default nextConfig
