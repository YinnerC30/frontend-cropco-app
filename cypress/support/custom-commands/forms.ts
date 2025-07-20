Cypress.Commands.add('getFormInput', (name: string) => {
  cy.get(`input[name="${name}"]`, { timeout: 3000 });
});
Cypress.Commands.add('getFormTextArea', (name: string) => {
  cy.get(`textarea[name="${name}"]`, { timeout: 3000 });
});

Cypress.Commands.add('clickOnCreateButton', () => {
  cy.get('button[data-testid="btn-create-record"]').click();
});

Cypress.Commands.add('clickOnSubmitButton', () => {
  cy.get('button[data-testid="form-submit-button"]').click();
});

Cypress.Commands.add('checkMessageFieldsMissing', () => {
  cy.contains('Faltan campos por rellenar en el formulario');
});

Cypress.Commands.add('checkMessageLostFormData', () => {
  cy.contains('¡Atención! Cambios sin guardar.');
  cy.contains('Tienes modificaciones pendientes en el formulario.');
  cy.contains('Ignorar');
});

Cypress.Commands.add('checkDisabledSubmitButton', () => {
  cy.get('button[data-testid="form-submit-button"]').should('be.disabled');
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
