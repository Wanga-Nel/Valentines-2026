/** next.config.js
 * Static export configuration for GitHub Pages (project site)
 */
/**
 * Notes:
 * - output: 'export' enables next export
 * - trailingSlash: true is recommended for GitHub Pages
 * - basePath/assetPrefix set for a project page at /Valentines-2026
 */
const nextConfig = {
  // Use Next's static export mode (we already used this for GitHub Pages)
  output: 'export',
  // trailingSlash helps when hosting static files on platforms that expect folders
  trailingSlash: true,
  // NOTE: removed basePath/assetPrefix (these are only needed for GitHub Pages project sites)
  // For Cloudflare Pages or other root-hosted platforms, leaving basePath unset ensures
  // assets and routes resolve at the site root.
};

module.exports = nextConfig;
