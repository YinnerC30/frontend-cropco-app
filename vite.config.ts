/// <reference types="vitest" />
import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    host: "0.0.0.0", // Permite conexiones externas
    port: 5173, // Puerto para desarrollo
    // strictPort: true, // Si el puerto está ocupado, no cambia automáticamente
  },
  preview: {
    port: 5173, // Puerto para preview/producción
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
