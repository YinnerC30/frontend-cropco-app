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

Cypress.Commands.add('checkPaginationValues', () => {
  cy.get('span[data-testid="data-table-row-total"]')
    .invoke('text')
    .then((text) => {
      const rowTotal = parseInt(text, 10);
      cy.get('span[data-testid="page-size-value"]')
        .invoke('text')
        .then((text) => {
          const pageSizeValue = parseInt(text, 10);
          const pagesCount = Math.ceil(rowTotal / pageSizeValue);
          cy.get('p[data-testid="data-table-page-info-number"]').contains(
            `Página 1 de ${pagesCount}`
          );
        });
    });
});

Cypress.Commands.add('existRefetchButton', () => {
  cy.get('button[data-testid="btn-refetch-data"]').should('exist');
});

Cypress.Commands.add('existCreateButton', () => {
  cy.get('button[data-testid="btn-create-record"]').should('exist');
});

Cypress.Commands.add('clickOnIgnoreButton', () => {
  cy.contains('button', 'Ignorar').click();
});

Cypress.Commands.add('clickOnCloseToast', () => {
  cy.get('button[aria-label="Close toast"]').click();
});

Cypress.Commands.add('checkDialogIsNotVisible', () => {
  cy.get('div[role="dialog"]').should('not.exist');
});

Cypress.Commands.add('checkDialogIsVisible', () => {
  cy.get('div[role="dialog"]').should('exist');
});

Cypress.Commands.add('checkLoadingInformation', () => {
  cy.contains('Cargando información');
});

Cypress.Commands.add(
  'openCommandPaletteAndSelect',
  (typeValue: string, commandDataId: string) => {
    cy.get('body').type('{ctrl}j');
    cy.get('input[data-testid="input-command-search"]').type(typeValue);
    cy.get(`div[data-testid="command-item-${commandDataId}"]`).click();
  }
);
