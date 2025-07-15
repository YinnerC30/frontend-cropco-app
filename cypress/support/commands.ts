/// <reference types="cypress" />

// ***********************************************
// Comandos personalizados para CropCo App
// ***********************************************

/**
 * Comando para realizar login de usuario
 * @param email - Email del usuario (opcional, usa valor por defecto)
 * @param password - Contraseña del usuario (opcional, usa valor por defecto)
 */
Cypress.Commands.add('loginUser', (email: string = 'usermant@mail.com', password: string = '123456') => {
  cy.visit('/app/authentication/login');
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]', { timeout: 5000 })
    .should('be.visible')
    .click();

  // Verificar que el login fue exitoso
  cy.contains('Bienvenid@ a CropCo').should('be.visible');
  cy.url().should('include', '/app/home/page');
});

/**
 * Comando para realizar logout de usuario
 * Asume que el usuario ya está logueado
 */
Cypress.Commands.add('logoutUser', () => {
  cy.get('button[data-testid="btn-logout-user"]', { timeout: 5000 })
    .should('be.visible')
    .click();
  
  // Verificar que el logout fue exitoso
  cy.url().should('include', '/app/authentication/login');
});

/**
 * Comando para limpiar toda la sesión del usuario
 * Útil para preparar tests limpios
 */
Cypress.Commands.add('clearSession', () => {
  cy.clearCookies();
  cy.clearLocalStorage();
  cy.window().then((win) => {
    win.sessionStorage.clear();
  });
});

/**
 * Comando para verificar que el usuario está autenticado
 */
Cypress.Commands.add('shouldBeAuthenticated', () => {
  cy.url().should('include', '/app/home');
  cy.contains('Bienvenid@ a CropCo').should('be.visible');
});

/**
 * Comando para verificar que el usuario NO está autenticado
 */
Cypress.Commands.add('shouldNotBeAuthenticated', () => {
  cy.url().should('include', '/app/authentication/login');
});

/**
 * Comando para intentar login con credenciales inválidas
 * @param email - Email inválido
 * @param password - Contraseña inválida
 */
Cypress.Commands.add('attemptInvalidLogin', (email: string, password: string) => {
  cy.visit('/app/authentication/login');
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]', { timeout: 5000 })
    .should('be.visible')
    .click();

  // Verificar que aparece el mensaje de error
  cy.contains('Usuario o contraseña incorrectos, inténtelo nuevamente').should('be.visible');
});

// Declaraciones de tipos para TypeScript
declare namespace Cypress {
  interface Chainable<Subject = any> {
    /**
     * Comando personalizado para realizar login
     * @param email Email del usuario (opcional)
     * @param password Contraseña del usuario (opcional)
     */
    loginUser(email?: string, password?: string): Chainable<void>;
    
    /**
     * Comando personalizado para realizar logout
     */
    logoutUser(): Chainable<void>;
    
    /**
     * Comando para limpiar toda la sesión
     */
    clearSession(): Chainable<void>;
    
    /**
     * Comando para verificar autenticación exitosa
     */
    shouldBeAuthenticated(): Chainable<void>;
    
    /**
     * Comando para verificar que no está autenticado
     */
    shouldNotBeAuthenticated(): Chainable<void>;
    
    /**
     * Comando para intentar login con credenciales inválidas
     * @param email Email inválido
     * @param password Contraseña inválida
     */
    attemptInvalidLogin(email: string, password: string): Chainable<void>;
  }
}