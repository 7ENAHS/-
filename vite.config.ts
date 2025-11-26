import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    define: {
      // Ensure it maps to a string even if undefined to prevent build/runtime issues
      'process.env.API_KEY': JSON.stringify(env.API_KEY || ''),
      // Prevent "ReferenceError: process is not defined" if libraries try to access it
      'process.env': {} 
    }
  };
});