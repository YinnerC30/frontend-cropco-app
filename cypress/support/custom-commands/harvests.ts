Cypress.Commands.add(
  'createHarvest',
  function ({ fastCreation = false } = {}): Cypress.Chainable<any> {
    const creationCropEndpoint = 'http://localhost:3000/harvests/create';

    if (fastCreation) {
      cy.visit('/app/home/harvests/create/one');
    } else {
      cy.navigateToModuleWithSideBar('harvests');
      cy.wait(3000);
      cy.clickOnCreateButton();
    }

    cy.wait(1000);

    cy.get('button[data-testid="btn-calendar-selector"]').click();
    cy.wait(500);

    cy.get('button[data-testid="btn-month-calendar-selector"]').click();
    cy.wait(500);

    cy.get('div[role="option"][data-testid="item-month-4"]').click();
    cy.get('button[data-testid="btn-year-calendar-selector"]').click();
    cy.get('div[role="option"][data-testid="item-year-2023"]').click();

    cy.get('button[name="day"]').contains('19').click();

    // Seleccionar cultivo
    cy.get('button[data-testid="btn-open-command-crop"]').click();
    cy.wait(1000);
    cy.get(
      'div[data-testid="form-field-command-item-1"][role="option"]'
    ).click();
    cy.wait(500);

    // Abrir boton de crear detalle
    cy.get('button[data-testid="btn-open-harvest-detail-form"]').click();

    // Seleccionar empleado
    cy.get('button[data-testid="btn-open-command-employee"]').click();
    cy.wait(1000);
    cy.get(
      'div[data-testid="form-field-command-item-1"][role="option"]'
    ).click();
    cy.wait(500);

    // Unidad de medida
    cy.get('button[data-testid="btn-select-field"]').click();
    cy.get(`div[role="option"][data-value="KILOGRAMOS"]`).click();

    cy.get('form[id="formHarvestDetail"]').within(() => {
      cy.get('input[name="amount"]').clear().type('55');
    });
    cy.get('form[id="formHarvestDetail"]').within(() => {
      cy.get('input[name="value_pay"]').clear().type('60000');
    });

    cy.get('button[data-testid="form-detail-submit-button"]').click();
    cy.wait(1000);

    // Abrir boton de crear detalle
    cy.get('button[data-testid="btn-open-harvest-detail-form"]').click();

    // Seleccionar empleado
    cy.get('button[data-testid="btn-open-command-employee"]').click();
    cy.wait(1000);
    cy.get(
      'div[data-testid="form-field-command-item-0"][role="option"]'
    ).click();
    cy.wait(500);

    // Unidad de medida
    cy.get('button[data-testid="btn-select-field"]').click();
    cy.get(`div[role="option"][data-value="KILOGRAMOS"]`).click();

    cy.get('form[id="formHarvestDetail"]').within(() => {
      cy.get('input[name="amount"]').clear().type('45');
    });
    cy.get('form[id="formHarvestDetail"]').within(() => {
      cy.get('input[name="value_pay"]').clear().type('50000');
    });

    cy.get('button[data-testid="form-detail-submit-button"]').click();

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
