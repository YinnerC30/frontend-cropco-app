Cypress.Commands.add('existBasicSearchBar', () => {
  cy.get('input[data-testid="input-basic-search-bar"]').should('exist');
  cy.get('input[placeholder="Escribe algo..."]').should('exist');
  cy.get('button[data-testid="btn-submit-basic-searchbar"]').should('exist');
  cy.get('button[data-testid="btn-clear-basic-searchbar"]').should('exist');
});

Cypress.Commands.add('clickOnSubmitBasicSearchBar', () => {
  cy.get('button[data-testid="btn-submit-basic-searchbar"]').click();
});

Cypress.Commands.add('typeOnInputBasicSearchBar', (value: string) => {
  cy.get('input[data-testid="input-basic-search-bar"]').type(value);
});

Cypress.Commands.add('clearInputBasicSearchBar', () => {
  cy.get('button[data-testid="btn-clear-basic-searchbar"]').click();
});

Cypress.Commands.add('checkSearchBarIsDisabled', () => {
  cy.get('input[placeholder="Escribe algo..."]').should('be.disabled');
  cy.get('button[data-testid="btn-submit-basic-searchbar"]').should(
    'be.disabled'
  );
  cy.get('button[data-testid="btn-clear-basic-searchbar"]').should(
    'be.disabled'
  );
});
