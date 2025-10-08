Cypress.Commands.add('getFormInput', (name: string) => {
  cy.get(`input[name="${name}"]`, { timeout: 3000 });
});
Cypress.Commands.add('getFormTextArea', (name: string) => {
  cy.get(`textarea[name="${name}"]`, { timeout: 3000 });
});

Cypress.Commands.add('clickOnSubmitButton', () => {
  cy.get('button[data-testid="form-submit-button"]').click();
});

Cypress.Commands.add('checkDisabledSubmitButton', () => {
  cy.get('button[data-testid="form-submit-button"]').should('be.disabled');
});

// Calendar Field

Cypress.Commands.add('openCalendar', () => {
  cy.get('button[data-testid="btn-calendar-selector"]').click();
  cy.wait(300);
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

// Command Field

Cypress.Commands.add('openCommandField', (name: string) => {
  cy.get(`button[data-testid="btn-open-command-${name}"]`).click();
  cy.wait(500);
});

Cypress.Commands.add(
  'selectCommandOption',
  (numberOption: string, skipWait = false) => {
    cy.get(
      `div[data-testid="form-field-command-item-${numberOption}"][role="option"]`
    )
      .should('exist')
      .should('be.visible')
      .click();

    if (!skipWait) {
      cy.wait(500);
    }
  }
);

// Select Field

Cypress.Commands.add('openSelectField', () => {
  cy.get('button[data-testid="btn-select-field"]').click();
});

Cypress.Commands.add('selectSelectOption', (value: string) => {
  cy.get(`div[role="option"][data-value="${value}"]`).click();
});

Cypress.Commands.add('clickOnCloseFormDialog', () => {
  cy.get('button[data-testid="btn-close-form-dialog"]').click();
});

Cypress.Commands.add('checkFormInputsAreEmpty', () => {
  cy.get('input').each(($input) => {
    cy.wrap($input).should('have.value', '');
  });
});
