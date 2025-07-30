Cypress.Commands.add('existRefetchButton', () => {
  cy.get('button[data-testid="btn-refetch-data"]')
    .should('exist')
    .should('be.visible');
});

Cypress.Commands.add('existCreateButton', () => {
  cy.get('button[data-testid="btn-create-record"]')
    .should('exist')
    .should('be.visible');
});

Cypress.Commands.add('clickOnCreateButton', () => {
  cy.get('button[data-testid="btn-create-record"]').click();
});

Cypress.Commands.add('clickRefetchButton', () => {
  cy.get('button[data-testid="btn-refetch-data"]').click({ multiple: true });
});

Cypress.Commands.add('checkRefetchButtonState', (shouldBeEnabled: boolean) => {
  const assertion = shouldBeEnabled ? 'be.enabled' : 'be.disabled';
  cy.get('button[data-testid="btn-refetch-data"]').should(assertion);
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
  (shouldBeVisible: boolean, shouldBeEnabled = true) => {
    const visibilityAssertion = shouldBeVisible
      ? 'be.visible'
      : 'not.be.visible';
    const activeAssertion = shouldBeEnabled ? 'be.enabled' : 'be.disabled';
    cy.get('button[data-testid="btn-delete-bulk"]').should(visibilityAssertion);
    if (shouldBeVisible) {
      cy.get('button[data-testid="btn-delete-bulk"]').should(activeAssertion);
    }
  }
);

Cypress.Commands.add('checkCreateButtonState', (shouldBeDisabled: boolean) => {
  cy.get('button[data-testid="btn-create-record"]').should(
    shouldBeDisabled ? 'be.disabled' : 'be.enabled'
  );
});

Cypress.Commands.add('clickOnDeleteBulkButton', () => {
  cy.get('button[data-testid="btn-delete-bulk"]').click();
});
