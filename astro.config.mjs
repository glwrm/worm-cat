// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  security: {
    checkOrigin: false,
    allowedDomains: [
      { hostname: 'v0.app' },
      {}
    ],
  },
  
  server: {
    host: true,
    allowedHosts: true,
  },

  vite: {
    server: {
      cors: true,
      allowedHosts: true,
    },
  },

  i18n: {
        defaultLocale: 'en',
        locales: ['en', 'ca'],
        routing: {
            prefixDefaultLocale: false,
        },
    },
});
