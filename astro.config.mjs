// @ts-check
import { defineConfig, envField } from "astro/config";

import react from "@astrojs/react";

import vercel from "@astrojs/vercel";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  adapter: vercel({
    isr: {
      // caches all pages on first request and saves for 1 day
      expiration: 60 * 60 * 24,
    },
  }),

  vite: {
    plugins: [tailwindcss()],
  },

  env: {
    schema: {
      OPENSTATES_API_KEY: envField.string({
        context: "server",
        access: "secret",
      }),
      PUBLIC_MAPBOX_TOKEN: envField.string({
        context: "client",
        access: "public",
      }),
      GOOGLE_CIVIC_API_KEY: envField.string({
        context: "server",
        access: "secret",
      }),
    },
  },
});
