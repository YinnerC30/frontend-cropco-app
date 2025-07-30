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

Cypress.Commands.add(
  'checkClearSelectionButtonState',
  (shouldBeVisible: boolean) => {
    const assertion = shouldBeVisible ? 'be.visible' : 'not.be.visible';
    cy.get('button[data-testid="btn-clear-selection-table"]').should(assertion);
  }
);

Cypress.Commands.add(
  'checkDeleteBulkButtonState',
  (shouldBeVisible: boolean) => {
    const assertion = shouldBeVisible ? 'be.visible' : 'not.be.visible';
    cy.get('button[data-testid="btn-delete-bulk"]').should(assertion);
  }
);

Cypress.Commands.add('clickOnGoNextPageButton', () => {
  cy.get('button[data-testid="btn-go-next-page"]').click();
  cy.wait(1000);
});

Cypress.Commands.add('checkCreateButtonState', (shouldBeDisabled: boolean) => {
  cy.get('button[data-testid="btn-create-record"]').should(
    shouldBeDisabled ? 'be.disabled' : 'be.enabled'
  );
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

Cypress.Commands.add('clickOnDeleteBulkButton', () => {
  cy.get('button[data-testid="btn-delete-bulk"]').click();
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

Cypress.Commands.add('shouldBeRedirectedForNoPermission', () => {
  cy.contains('No tienes permiso para esta acción, seras redirigido');
});

Cypress.Commands.add('clickOnUpdateRecord', () => {
  cy.get('button[data-testid="btn-update-record"]').click();
});

Cypress.Commands.add('checkNoRecordsMessage', () => {
  cy.contains('No hay registros');
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
