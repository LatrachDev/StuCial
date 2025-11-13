import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { copyFileSync } from 'fs';

// Plugin to copy index.html to 404.html for GitHub Pages SPA routing
const copy404Plugin = () => {
  return {
    name: 'copy-404',
    closeBundle() {
      const outDir = 'dist';
      try {
        const indexPath = path.resolve(process.cwd(), `${outDir}/index.html`);
        const notFoundPath = path.resolve(process.cwd(), `${outDir}/404.html`);
        copyFileSync(indexPath, notFoundPath);
        console.log('✓ Copied index.html to 404.html for GitHub Pages');
      } catch (error) {
        console.warn('Could not copy index.html to 404.html:', error.message);
      }
    },
  };
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), copy404Plugin()],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      '@': path.resolve(process.cwd(), './src'),
    },
  },
  // For main GitHub Pages site (username.github.io), use '/'
  // For project sites (username.github.io/repo-name), use '/repo-name/'
  base: process.env.GITHUB_PAGES === 'true' ? '/StuCial/' : '/',
  build: {
    target: 'esnext',
    outDir: 'dist',
  },
  server: {
    port: 3000,
    open: true,
  },
});

