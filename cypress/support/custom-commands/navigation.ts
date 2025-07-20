Cypress.Commands.add('navigateToModuleWithSideBar', (nameModule: string) => {
  cy.get(`button[data-testid="btn-module-${nameModule}"]`).click();
});

Cypress.Commands.add('checkCurrentUrl', (partialUrl: string) => {
  cy.url().should('include', partialUrl);
}); 