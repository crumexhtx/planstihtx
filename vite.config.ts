/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolveSiteUrl } from './scripts/resolveSiteUrl.mjs';

export default defineConfig(({ command }) => {
  // Keep the client bundle and the prerender script on the same origin.
  if (command === 'build' && !process.env.VITE_SITE_URL?.trim()) {
    process.env.VITE_SITE_URL = resolveSiteUrl();
  }

  return {
    plugins: [react()],
    test: {
      environment: 'node',
    },
  };
});
