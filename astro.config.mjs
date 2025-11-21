// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  site: 'https://laruotadelsamsara.com',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [
    sitemap({                                // ← genera /sitemap-index.xml
      entryLimit: 5000,                      // siti grandi ready
      changefreq: 'weekly',                  // suggerimento per Google
      priority: 0.7
    })
  ],

  adapter: netlify()
});