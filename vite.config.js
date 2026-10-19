import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import leetcodeHandler from './api/leetcode.js'
import codechefHandler from './api/codechef.js'

// Serves the /api serverless functions locally, so live stats work in
// `npm run dev` and `npm run preview` exactly as they do on Vercel.
function localApi() {
  // Block body on purpose: a function returned from these hooks is run by Vite as a post-hook.
  const mount = (server) => {
    server.middlewares.use('/api/leetcode', (req, res) => leetcodeHandler(req, res))
    server.middlewares.use('/api/codechef', (req, res) => codechefHandler(req, res))
  }
  return { name: 'local-api', configureServer: mount, configurePreviewServer: mount }
}

// Fills %SITE_URL% in index.html (canonical + link-preview tags need absolute URLs).
// Uses SITE_URL if set (e.g. a custom domain), otherwise Vercel's production domain,
// which Vercel exposes automatically during builds.
function siteUrl() {
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL
  const url = (process.env.SITE_URL || (vercel ? `https://${vercel}` : '')).replace(/\/$/, '')
  return {
    name: 'site-url',
    transformIndexHtml: {
      order: 'pre',
      handler: (html) =>
        (url ? html : html.replace(/^.*(rel="canonical"|property="og:url").*\r?\n/gm, '')) // need a real domain
          .replaceAll('%SITE_URL%', url),
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), localApi(), siteUrl()],
})
