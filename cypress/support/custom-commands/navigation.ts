Cypress.Commands.add('navigateToModuleWithSideBar', (nameModule: string) => {
  cy.get(`button[data-testid="btn-module-${nameModule}"]`).click();
  cy.wait(500);
});

Cypress.Commands.add('checkCurrentUrl', (partialUrl: string) => {
  cy.url().should('include', partialUrl);
});

Cypress.Commands.add(
  'openCommandPaletteAndSelect',
  (typeValue: string, commandDataId: string) => {
    cy.get('body').type('{ctrl}j');
    cy.get('input[data-testid="input-command-search"]').type(typeValue);
    cy.get(`div[data-testid="command-item-${commandDataId}"]`).click();
  }
);
