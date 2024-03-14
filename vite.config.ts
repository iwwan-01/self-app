import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // 👇🏻 This fixes the 'Cross-Origin-Opener-Policy' error, but breaks the tokenClient.callback function!
  // server: {
  //   headers: {
  //     'Cross-Origin-Opener-Policy': 'same-origin; same-origin-allow-popups',
  //   },
  // },
});
