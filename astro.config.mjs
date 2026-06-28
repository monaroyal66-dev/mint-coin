// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'static',
  adapter: cloudflare(),
  site: 'https://mint-coin.pages.dev',
  i18n: {
    defaultLocale: 'ja',
    locales: ['ja'],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
