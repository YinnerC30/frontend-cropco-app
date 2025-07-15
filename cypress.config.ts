import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://prueba.localhost:5173',

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    chromeWebSecurity: false,
    // Aumenta los timeouts para conexiones lentas
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
  },
  // hosts: {
  //   'prueba.localhost': '127.0.0.1',
  // },
});
