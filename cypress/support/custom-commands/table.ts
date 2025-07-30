Cypress.Commands.add('clickActionsButtonTableRow', (id: string | number) => {
  cy.get(`button[data-testid="btn-actions-table-row-id-${id}"]`).click();
});

Cypress.Commands.add('changeTablePageSize', (size: number) => {
  cy.get('button[data-testid="btn-page-size-selector"]').click();
  cy.get(`div[data-testid="select-item-page-size-${size}"]`).click();
  cy.wait(1000);
});

Cypress.Commands.add('clickOnGoNextPageButton', () => {
  cy.get('button[data-testid="btn-go-next-page"]').click();
  cy.wait(1000);
});

Cypress.Commands.add('checkTablePageInfoContains', (text: string) => {
  cy.get('p[data-testid="data-table-page-info-number"]').contains(text);
});

Cypress.Commands.add('clickOnGoPreviousPageButton', () => {
  cy.get('button[data-testid="btn-go-previous-page"]').click();
  cy.wait(1000);
});

Cypress.Commands.add('clickOnViewRecord', () => {
  cy.get('button[data-testid="btn-view-record"]').click();
});

Cypress.Commands.add('clickOnCopyIdButton', () => {
  cy.get('button[data-testid="btn-copy-id"]').click();
  cy.contains('Id copiado al portapapeles');
});

Cypress.Commands.add('toggleSelectAllTableRows', () => {
  cy.get('button[aria-label="Select all"]').click();
});

Cypress.Commands.add('checkSelectedTableRowsGreaterThanZero', () => {
  cy.get('span[data-testid="data-table-row-selection-number"]')
    .invoke('text')
    .then((text) => {
      const value = Number(text.trim());
      expect(value).to.be.greaterThan(0);
    });
});

Cypress.Commands.add('checkSelectedTableRowsIsZero', () => {
  cy.get('span[data-testid="data-table-row-selection-number"]')
    .invoke('text')
    .then((text) => {
      const value = Number(text.trim());
      expect(value).to.equal(0);
    });
});

Cypress.Commands.add('clickOnUpdateRecord', () => {
  cy.get('button[data-testid="btn-update-record"]').click();
});

Cypress.Commands.add(
  'checkActionButtonsState',
  (expected: { update?: boolean; view?: boolean; delete?: boolean }) => {
    if (expected.update !== undefined)
      cy.get('button[data-testid="btn-update-record"]').should(
        expected.update ? 'be.enabled' : 'be.disabled'
      );
    if (expected.view !== undefined)
      cy.get('button[data-testid="btn-view-record"]').should(
        expected.view ? 'be.enabled' : 'be.disabled'
      );
    if (expected.delete !== undefined)
      cy.get('button[data-testid="btn-delete-one-record"]').should(
        expected.delete ? 'be.enabled' : 'be.disabled'
      );
  }
);

Cypress.Commands.add('openActionsMenuByField', (value: string, url: string) => {
  cy.visit(url);
  cy.wait(1000);
  cy.get('tbody tr')
    .filter(`:contains(${value})`)
    .first()
    .within(() => {
      cy.get('button[data-testid^="btn-actions-table-row-id-"]').click();
    });
});

Cypress.Commands.add('clickOnDeleteRecord', () => {
  cy.get('button[data-testid="btn-delete-one-record"]').click();
});

Cypress.Commands.add('clickOnContinueDeleteOneRecord', () => {
  cy.get('button[data-testid="btn-continue-delete-one-record"]').click();
});

Cypress.Commands.add('clickOnContinueDeleteBulkRecord', () => {
  cy.get('button[data-testid="btn-continue-delete"]').click();
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

Cypress.Commands.add('clickOnUpdateDetailRecord', () => {
  cy.get('button[data-testid="btn-update-detail-record"]').click();
});
