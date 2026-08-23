// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://hjorturfreyr.com',
  integrations: [sitemap()],
  /* Note: inlineStylesheets: 'always' was measured and rejected. It clears
     Lighthouse's render-blocking flag, but FCP did not move, LCP got slightly
     worse, and every page then carries a copy of the CSS that can no longer be
     cached across navigations. A clean audit is not worth a slower page. */
  vite: {
    plugins: [tailwindcss()],
  },
});
