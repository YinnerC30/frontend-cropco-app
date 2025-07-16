/// <reference types="cypress" />

// ***********************************************
// Comandos personalizados para CropCo App
// ***********************************************

/**
 * Comando para realizar login de usuario
 * @param email - Email del usuario (opcional, usa valor por defecto)
 * @param password - Contraseña del usuario (opcional, usa valor por defecto)
 */
Cypress.Commands.add(
  'loginUser',
  (email: string = 'usermant@mail.com', password: string = '123456') => {
    cy.visit('/app/authentication/login');
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]', { timeout: 5000 })
      .should('be.visible')
      .click();

    // Verificar que el login fue exitoso
    cy.contains('Bienvenid@ a CropCo').should('be.visible');
    cy.url().should('include', '/app/home/page');
  }
);

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
Cypress.Commands.add(
  'attemptInvalidLogin',
  (email: string, password: string) => {
    cy.visit('/app/authentication/login');
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]', { timeout: 5000 })
      .should('be.visible')
      .click();

    // Verificar que aparece el mensaje de error
    cy.contains(
      'Usuario o contraseña incorrectos, inténtelo nuevamente'
    ).should('be.visible');
  }
);

Cypress.Commands.add('existBasicSearchBar', () => {
  cy.get('input[data-testid="input-basic-search-bar"]').should('exist');
  cy.get('input[placeholder="Escribe algo..."]').should('exist');

  cy.get('button[data-testid="btn-submit-basic-searchbar"]').should('exist');
  cy.get('button[data-testid="btn-clear-basic-searchbar"]').should('exist');
});

Cypress.Commands.add('existPaginationButtons', () => {
  cy.get('button[data-testid="btn-go-first-page"]').should('exist');
  cy.get('button[data-testid="btn-go-previous-page"]').should('exist');
  cy.get('button[data-testid="btn-go-next-page"]').should('exist');
  cy.get('button[data-testid="btn-go-last-page"]').should('exist');
});

Cypress.Commands.add('existPaginationInfo', () => {
  cy.contains('Total:');
  cy.contains('N° seleccionados:');
  cy.contains('N° registros:');
  cy.get('button[data-testid="btn-page-size-selector"]').should('exist');
  cy.contains('Página 1 de');
});

Cypress.Commands.add('existRefetchButton', () => {
  cy.get('button[data-testid="btn-refetch-data"]').should('exist');
});

Cypress.Commands.add('existCreateButton', () => {
  cy.get('button[data-testid="btn-create-record"]').should('exist');
});

Cypress.Commands.add('navigateToModuleWithSideBar', (nameModule: string) => {
  cy.get(`button[data-testid="btn-module-${nameModule}"]`).click();
});

Cypress.Commands.add('checkCurrentUrl', (partialUrl: string) => {
  cy.url().should('include', partialUrl);
});

Cypress.Commands.add('getFormInput', (name: string) => {
  cy.get(`input[name="${name}"]`);
});

Cypress.Commands.add('clickOnCreateButton', () => {
  cy.get('button[data-testid="btn-create-record"]').click();
});

Cypress.Commands.add('clickOnSubmitButton', () => {
  cy.get('button[data-testid="form-submit-button"]').click();
});

Cypress.Commands.add('checkDisabledSubmitButton', () => {
  cy.get('button[data-testid="form-submit-button"]').should('be.disabled');
});

// Users module
Cypress.Commands.add('createUser', function (): Cypress.Chainable<string> {
  cy.navigateToModuleWithSideBar('users');
  cy.wait(3000);
  cy.clickOnCreateButton();
  cy.getFormInput('first_name').type('UserName');
  cy.getFormInput('last_name').type('LastName');
  const randomNum = Math.floor(10 + Math.random() * 90);
  const randomLetter = String.fromCharCode(97 + Math.floor(Math.random() * 26)); // letra aleatoria a-z
  const email = `emailtest${randomNum}${randomLetter}@gmail.com`;
  cy.getFormInput('email').type(email);
  cy.getFormInput('cell_phone_number').type('3123456547');
  cy.getFormInput('passwords.password1').type('123456');
  cy.getFormInput('passwords.password2').type('123456');

  cy.clickOnSubmitButton();
  cy.checkDisabledSubmitButton();
  cy.wait(3000);
  return cy.wrap(email) as Cypress.Chainable<string>;
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

    // Elementos comunes de los modulos
    existBasicSearchBar(): Chainable<void>;
    existPaginationButtons(): Chainable<void>;
    existPaginationInfo(): Chainable<void>;

    existRefetchButton(): Chainable<void>;
    existCreateButton(): Chainable<void>;

    navigateToModuleWithSideBar(nameModule: string): Chainable<void>;
    checkCurrentUrl(partialUrl: string): Chainable<void>;

    getFormInput(name: string): Chainable<HTMLElement>;

    clickOnCreateButton(): Chainable<void>;
    clickOnSubmitButton(): Chainable<void>;
    checkDisabledSubmitButton(): Chainable<void>;

    // Users module
    createUser(): Chainable<string>;
  }
}
