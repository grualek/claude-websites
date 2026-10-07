import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { buildStructuredData, seo } from './src/lib/seo'
import { company } from './src/content/company'

const escapeHtml = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

/** Injects SEO metadata + JSON-LD from the content layer into index.html (static, crawlable). */
function seoPlugin(): Plugin {
  return {
    name: 'real-estate-seo',
    transformIndexHtml(html) {
      const jsonLd = buildStructuredData()
        .map((d) => `<script type="application/ld+json">${JSON.stringify(d).replace(/</g, '\\u003c')}</script>`)
        .join('\n    ')
      return html
        .replace(/%SEO_TITLE%/g, escapeHtml(seo.title))
        .replace(/%SEO_DESCRIPTION%/g, escapeHtml(seo.description))
        .replace(/%SITE_NAME%/g, escapeHtml(company.name))
        .replace(/%SITE_URL%/g, company.url)
        .replace(/%THEME_COLOR%/g, seo.themeColor)
        .replace('<!-- STRUCTURED_DATA -->', jsonLd)
    },
  }
}

export default defineConfig({
  // Relative asset paths so the build works under any sub-path (GitHub Pages /claude-websites/real-estate/)
  base: './',
  plugins: [react(), tailwindcss(), seoPlugin()],
})
