// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  // 1. Configure Astro's security middleware
  security: {
    checkOrigin: false, // Bypasses the strict CSRF origin check in development
    allowedDomains: [
      { hostname: 'v0.app' }, // Replace with your proxy or external tool domain if known
      {}                      // An empty object acts as a dev-only wildcard allowlist
    ],
  },
  
  // 2. Configure Astro's server rules
  server: {
    host: true,
    allowedHosts: true, // Permits your dev site to be loaded via external hosts/proxies
  },

  // 3. Configure Vite's asset and HMR layers
  vite: {
    server: {
      cors: true,         // Adds 'Access-Control-Allow-Origin: *' to Vite assets
      allowedHosts: true, // Bypasses Vite's separate host-validation gate
    },
  },
});
