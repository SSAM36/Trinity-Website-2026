import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  
  build: {
    // Optimize chunk splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Split huge icon libraries into separate chunks
          if (id.includes('react-icons/fa')) {
            return 'icons-fa';
          }
          if (id.includes('react-icons/gi')) {
            return 'icons-gi';
          }
          if (id.includes('react-icons')) {
            return 'icons-other';
          }
          // Vendor chunks
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react-vendor';
          }
          if (id.includes('node_modules/react-router')) {
            return 'react-router';
          }
          if (id.includes('@cloudinary')) {
            return 'cloudinary';
          }
          if (id.includes('gsap') || id.includes('@use-gesture')) {
            return 'animations';
          }
          if (id.includes('lucide-react')) {
            return 'lucide-icons';
          }
        },
      },
    },
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
    // Use esbuild minifier (faster)
    minify: 'esbuild',
    // Target modern browsers
    target: 'es2020',
    // Enable source map for debugging (disable in production)
    sourcemap: false,
  },
  
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: ['@vercel/analytics', '@vercel/speed-insights'],
  },
})
