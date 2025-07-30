Cypress.Commands.add(
  'loginUser',
  (email: string = 'usermant@mail.com', password: string = '123456') => {
    cy.visit('/app/authentication/login');
    cy.wait(500);
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').should('be.visible').click();
    cy.contains('Bienvenid@ a CropCo').should('be.visible');
    cy.url().should('include', '/app/home/page');
    cy.get('button[aria-label="Close toast"]').click();
  }
);

Cypress.Commands.add('logoutUser', () => {
  cy.get('button[data-testid="btn-logout-user"]', { timeout: 5000 })
    .should('be.visible')
    .click();
  cy.url().should('include', '/app/authentication/login');
});

Cypress.Commands.add('clearSession', () => {
  cy.clearCookies();
  cy.clearLocalStorage();
  cy.window().then((win) => {
    win.sessionStorage.clear();
  });
});

Cypress.Commands.add('shouldBeAuthenticated', () => {
  cy.url().should('include', '/app/home');
  cy.contains('Bienvenid@ a CropCo').should('be.visible');
});

Cypress.Commands.add('shouldNotBeAuthenticated', () => {
  cy.url().should('include', '/app/authentication/login');
});

Cypress.Commands.add(
  'attemptInvalidLogin',
  (email: string, password: string) => {
    cy.visit('/app/authentication/login');
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]', { timeout: 5000 })
      .should('be.visible')
      .click();
    // Mensaje de error comentado por si cambia el texto
    // cy.contains('Usuario o contraseña incorrectos, inténtelo nuevamente').should('be.visible');
  }
);
