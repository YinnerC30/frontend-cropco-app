Cypress.Commands.add(
  'createWork',
  function ({
    fastCreation = false,
    returnOnlyWork = true,
  } = {}): Cypress.Chainable<any> {
    const creationWorkEndpoint = 'http://localhost:3000/works/create';

    if (fastCreation) {
      return cy
        .executeSeed({
          works: { quantity: 1, quantityEmployees: 3 },
        })
        .then((result) => {
          // Validamos que la estructura esperada exista
          if (result.history.insertedWorks.length > 0 && returnOnlyWork) {
            return result.history.insertedWorks[0].work;
          } else {
            return result.history.insertedWorks[0];
          }
        });
    } else {
      cy.navigateToModuleWithSideBar('harvests');
      cy.wait(3000);
      cy.clickOnCreateButton();
    }

    cy.wait(1000);

    cy.openCalendar();

    cy.selectCalendarMonth(1);
    cy.selectCalendarYear(2023);
    cy.selectCalendarDay(18);

    // Seleccionar cultivo

    cy.openCommandField('crop');
    cy.selectCommandOption('1');
    cy.wait(500);

    // Abrir boton de crear detalle
    cy.openWorkDetailForm();

    // Seleccionar empleado
    cy.openCommandField('employee');
    cy.selectCommandOption('1');

    cy.get('form[id="formWorkDetail"]').within(() => {
      cy.get('input[name="value_pay"]').clear().type('60000');
    });

    cy.clickOnSubmitWorkDetailForm();
    cy.wait(1000);

    // Abrir boton de crear detalle
    cy.openWorkDetailForm();

    // Seleccionar empleado
    cy.openCommandField('employee');
    cy.selectCommandOption('0');

    cy.get('form[id="formWorkDetail"]').within(() => {
      cy.get('input[name="value_pay"]').clear().type('50000');
    });

    cy.clickOnSubmitWorkDetailForm();

    cy.get('div[data-testid="badge-value-pay"]').contains('$ 110.000');

    cy.intercept('POST', creationWorkEndpoint).as('createWorkRequest');
    cy.clickOnSubmitButton();

    return cy.wait('@createWorkRequest').then((interception) => {
      return cy.wrap({
        ...interception.response?.body,
      });
    });
  }
);

Cypress.Commands.add('createWorkAnd', (callback) => {
  cy.createWork({ fastCreation: true }).then((data) => {
    callback(data);
  });
});

Cypress.Commands.add('openWorkDetailForm', () => {
  cy.get('button[data-testid="btn-open-work-detail-form"]').click();
});

Cypress.Commands.add('clickOnSubmitWorkDetailForm', () => {
  cy.get('button[data-testid="form-detail-submit-button"]').click();
  cy.wait(500);
});
