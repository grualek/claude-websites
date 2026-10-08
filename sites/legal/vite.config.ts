import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { buildStructuredData, seo } from './src/lib/seo'
import { firm } from './src/content/firm'

const escapeHtml = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

/** Injects SEO metadata + JSON-LD from the content layer into index.html (static, crawlable). */
function seoPlugin(): Plugin {
  return {
    name: 'legal-seo',
    transformIndexHtml(html) {
      const jsonLd = buildStructuredData()
        .map((d) => `<script type="application/ld+json">${JSON.stringify(d).replace(/</g, '\\u003c')}</script>`)
        .join('\n    ')
      return html
        .replace(/%SEO_TITLE%/g, escapeHtml(seo.title))
        .replace(/%SEO_DESCRIPTION%/g, escapeHtml(seo.description))
        .replace(/%SITE_NAME%/g, escapeHtml(firm.name))
        .replace(/%SITE_URL%/g, firm.url)
        .replace(/%THEME_COLOR%/g, seo.themeColor)
        .replace(/%PHONE%/g, escapeHtml(firm.phone.display))
        .replace('<!-- STRUCTURED_DATA -->', jsonLd)
    },
  }
}

export default defineConfig({
  // Relative asset paths so the build works under any sub-path (GitHub Pages /claude-websites/legal/)
  base: './',
  plugins: [react(), tailwindcss(), seoPlugin()],
})
