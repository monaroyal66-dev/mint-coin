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
  vite: {
    plugins: [tailwindcss()],
  },
});
