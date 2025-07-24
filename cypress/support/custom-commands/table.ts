Cypress.Commands.add('clickActionsButtonTableRow', (id: string | number) => {
  cy.get(`button[data-testid="btn-actions-table-row-id-${id}"]`).click();
});

Cypress.Commands.add('clickRefetchButton', () => {
  cy.get('button[data-testid="btn-refetch-data"]').click({ multiple: true });
});

Cypress.Commands.add('checkRefetchButtonState', (shouldBeEnabled: boolean) => {
  const assertion = shouldBeEnabled ? 'not.be.disabled' : 'be.disabled';
  cy.get('button[data-testid="btn-refetch-data"]').should(assertion);
});

Cypress.Commands.add('changeTablePageSize', (size: number) => {
  cy.get('button[data-testid="btn-page-size-selector"]').click();
  cy.get(`div[data-testid="select-item-page-size-${size}"]`).click();
  cy.wait(1000);
});

Cypress.Commands.add('toggleSelectAllTableRows', (select: boolean = true) => {
  cy.get('button[aria-label="Select all"]').click();
  cy.wait(500);
  if (select) {
    cy.get('button[data-testid="btn-clear-selection-table"]').should(
      'be.visible'
    );
    cy.get('button[data-testid="btn-delete-bulk"]').should('be.visible');
  } else {
    cy.get('button[data-testid="btn-clear-selection-table"]').should(
      'not.be.visible'
    );
    cy.get('button[data-testid="btn-delete-bulk"]').should('not.be.visible');
  }
});

Cypress.Commands.add('shouldBeRedirectedForNoPermission', () => {
  cy.contains('No tienes permiso para esta acción, seras redirigido');
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
