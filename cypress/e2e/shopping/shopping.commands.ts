Cypress.Commands.add(
  'createShopping',
  function ({
    fastCreation = false,
    returnOnlyShopping = true,
  } = {}): Cypress.Chainable<any> {
    if (fastCreation) {
      return cy.executeSeed({ shoppings: { quantity: 1 } }).then((result) => {
        // Validamos que la estructura esperada exista
        if (
          result.history.insertedShoppingSupplies.length > 0 &&
          returnOnlyShopping
        ) {
          return result.history.insertedShoppingSupplies[0].shopping;
        } else {
          return result.history.insertedShoppingSupplies[0];
        }
      });
    }

    return cy.wait('@createShoppingRequest').then((interception) => {
      return cy.wrap({
        ...interception.response?.body,
      });
    });
  }
);

Cypress.Commands.add('createShoppingAnd', (callback) => {
  cy.createShopping({ fastCreation: true }).then((data) => {
    callback(data);
  });
});

Cypress.Commands.add('openShoppingDetailForm', () => {
  cy.get('button[data-testid="btn-open-shopping-detail-form"]').click();
});

Cypress.Commands.add('clickOnSubmitShoppingDetailForm', () => {
  cy.get('button[data-testid="form-detail-submit-button"]').click();
  cy.wait(500);
});

Cypress.Commands.add('validateTotalsShoppingForm', ({ amount, valuePay }) => {
  // Validar totales
  cy.getFormInput('amount').should('have.value', amount.toString());
  cy.getFormInput('value_pay').should('have.value', valuePay.toString());
});
