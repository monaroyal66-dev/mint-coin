// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  output: 'server',
  adapter: cloudflare(),
  site: 'https://mint-coin.jp',
  integrations: [sitemap()],
  // Removed columns: send old links/bookmarks to the column list instead of a 404
  redirects: {
    '/columns/ebay-guide': { status: 301, destination: '/columns/' },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
