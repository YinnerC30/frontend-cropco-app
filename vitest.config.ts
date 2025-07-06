import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts'],
    css: true,
    // Configuración para evitar renderizados múltiples
    pool: 'forks', // Usar forks en lugar de threads para mejor aislamiento
    poolOptions: {
      forks: {
        singleFork: true, // Usar un solo fork para todas las pruebas
      },
    },
    // Configuración de timeouts
    testTimeout: 10000,
    hookTimeout: 10000,
    // Configuración de coverage
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test-utils.tsx',
        'src/test-setup.ts',
        '**/*.d.ts',
        '**/*.config.*',
        '**/coverage/**',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
}); 