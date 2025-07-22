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

Cypress.Commands.add('selectCalendarMonth', (month: number) => {
  cy.get('button[data-testid="btn-month-calendar-selector"]').click();
  cy.get(`div[role="option"][data-testid="item-month-${month}"]`).click();
});

Cypress.Commands.add('selectCalendarYear', (year: number) => {
  cy.get('button[data-testid="btn-year-calendar-selector"]').click();
  cy.get(`div[role="option"][data-testid="item-year-${year}"]`).click();
});

Cypress.Commands.add('selectCalendarDay', (day: number) => {
  cy.get('button[name="day"]').contains(day).click();
});
