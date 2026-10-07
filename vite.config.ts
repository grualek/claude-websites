import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { buildStructuredData, seo } from './src/lib/seo'
import { clinic } from './src/content/clinic'

const escapeHtml = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

/** Injects SEO metadata + JSON-LD from the content layer into index.html (static, crawlable). */
function seoPlugin(): Plugin {
  return {
    name: 'clinic-seo',
    transformIndexHtml(html) {
      const jsonLd = buildStructuredData()
        .map((d) => `<script type="application/ld+json">${JSON.stringify(d).replace(/</g, '\\u003c')}</script>`)
        .join('\n    ')
      return html
        .replace(/%SEO_TITLE%/g, escapeHtml(seo.title))
        .replace(/%SEO_DESCRIPTION%/g, escapeHtml(seo.description))
        .replace(/%SITE_NAME%/g, escapeHtml(clinic.name))
        .replace(/%SITE_URL%/g, clinic.url)
        .replace(/%THEME_COLOR%/g, seo.themeColor)
        .replace('<!-- STRUCTURED_DATA -->', jsonLd)
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), seoPlugin()],
})
