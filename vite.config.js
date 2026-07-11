import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // Ensure this is set to the correct base URL
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        // Isolate rarely-changing framework code into one long-lived chunk so an
        // app-code change doesn't invalidate it on repeat visits (pairs with the
        // immutable /assets caching in vercel.json). supabase is included because
        // it's imported app-wide via AuthContext.
        manualChunks: {
          vendor: [
            'react',
            'react-dom',
            'react-router-dom',
            'react-helmet-async',
            '@supabase/supabase-js',
          ],
        },
      },
    },
  },
  server: {
    open: true,
  }
});
