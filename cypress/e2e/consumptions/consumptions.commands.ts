Cypress.Commands.add(
  'createConsumption',
  function ({
    fastCreation = false,
    returnOnlyConsumption = true,
  } = {}): Cypress.Chainable<any> {
    if (fastCreation) {
      return cy
        .executeSeed({ consumptions: { quantity: 1 } })
        .then((result) => {
          // Validamos que la estructura esperada exista
          if (
            result.history.insertedConsumptionSupplies.length > 0 &&
            returnOnlyConsumption
          ) {
            return result.history.insertedConsumptionSupplies[0].consumption;
          } else {
            return result.history.insertedConsumptionSupplies[0];
          }
        });
    }

    return cy.wait('@createConsumptionRequest').then((interception) => {
      return cy.wrap({
        ...interception.response?.body,
      });
    });
  }
);

Cypress.Commands.add('createConsumptionAnd', (callback) => {
  cy.createConsumption({ fastCreation: true }).then((data) => {
    callback(data);
  });
});

Cypress.Commands.add('openConsumptionDetailForm', () => {
  cy.get('button[data-testid="btn-open-consumption-detail-form"]').click();
});

Cypress.Commands.add('clickOnSubmitConsumptionDetailForm', () => {
  cy.get('button[data-testid="form-detail-submit-button"]').click();
  cy.wait(500);
});
