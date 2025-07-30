Cypress.Commands.add(
  'createHarvest',
  function ({ fastCreation = false } = {}): Cypress.Chainable<any> {
    const creationCropEndpoint = 'http://localhost:3000/harvests/create';

    if (fastCreation) {
      return cy
        .executeSeed({ harvests: { quantity: 1, quantityEmployees: 3 } })
        .then((result) => {
          // Validamos que la estructura esperada exista
          if (
            result &&
            result.history &&
            Array.isArray(result.history.insertedHarvests) &&
            result.history.insertedHarvests.length > 0
          ) {
            return result.history.insertedHarvests[0].harvest;
          } else {
            throw new Error(
              'No se encontró ningún registro de cosecha insertado en la respuesta del seed.'
            );
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
    cy.openHarvestDetailForm();

    // Seleccionar empleado
    cy.openCommandField('employee');
    cy.selectCommandOption('1');

    // Unidad de medida
    cy.openSelectField();
    cy.selectSelectOption('KILOGRAMOS');

    cy.get('form[id="formHarvestDetail"]').within(() => {
      cy.get('input[name="amount"]').clear().type('55');
    });
    cy.get('form[id="formHarvestDetail"]').within(() => {
      cy.get('input[name="value_pay"]').clear().type('60000');
    });

    cy.clickOnSubmitHarvestDetailForm();
    cy.wait(1000);

    // Abrir boton de crear detalle
    cy.openHarvestDetailForm();

    // Seleccionar empleado
    cy.openCommandField('employee');
    cy.selectCommandOption('0');

    // Unidad de medida
    cy.openSelectField();
    cy.selectSelectOption('KILOGRAMOS');

    cy.get('form[id="formHarvestDetail"]').within(() => {
      cy.get('input[name="amount"]').clear().type('45');
    });
    cy.get('form[id="formHarvestDetail"]').within(() => {
      cy.get('input[name="value_pay"]').clear().type('50000');
    });

    cy.clickOnSubmitHarvestDetailForm();

    // Validar totales
    cy.get('div[data-testid="badge-amount"]').contains('100,00');
    cy.get('div[data-testid="badge-value-pay"]').contains('$ 110.000');

    cy.intercept('POST', creationCropEndpoint).as('createHarvestRequest');
    cy.clickOnSubmitButton();

    return cy.wait('@createHarvestRequest').then((interception) => {
      return cy.wrap({
        ...interception.response?.body,
      });
    });
  }
);

Cypress.Commands.add('createHarvestAnd', (callback) => {
  cy.createHarvest({ fastCreation: true }).then((data) => {
    callback(data);
  });
});

Cypress.Commands.add('openHarvestDetailForm', () => {
  cy.get('button[data-testid="btn-open-harvest-detail-form"]').click();
});

Cypress.Commands.add('clickOnSubmitHarvestDetailForm', () => {
  cy.get('button[data-testid="form-detail-submit-button"]').click();
  cy.wait(500);
});

// Cypress.Commands.add('validateTotalsHarvestForm', ({ amount, valuePay }) => {
//   // Validar totales
//   cy.getFormInput('amount').should('have.value', amount.toString());
//   cy.getFormInput('value_pay').should('have.value', valuePay.toString());
// });
