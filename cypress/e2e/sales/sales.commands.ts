Cypress.Commands.add(
  'createSale',
  function ({
    fastCreation = false,
    returnOnlySale = true,
    isReceivable = false,
    isReceivableGeneric = false,
  } = {}): Cypress.Chainable<any> {
    // const creationSaleEndpoint = 'http://localhost:3000/sales/create';

    if (fastCreation) {
      return cy
        .executeSeed({ sales: { quantity: 1, isReceivable, isReceivableGeneric  } })
        .then((result) => {
          // Validamos que la estructura esperada exista
          if (result.history.insertedSales.length > 0 && returnOnlySale) {
            return result.history.insertedSales[0].sale;
          } else {
            return result.history.insertedSales[0];
          }
        });
    }

    return cy.wait('@createSaleRequest').then((interception) => {
      return cy.wrap({
        ...interception.response?.body,
      });
    });
  }
);

// Cypress.Commands.add('createSaleAnd', (callback) => {
//   cy.createSale({ fastCreation: true }).then((data) => {
//     callback(data);
//   });
// });

// Cypress.Commands.add('openSaleDetailForm', () => {
//   cy.get('button[data-testid="btn-open-sale-detail-form"]').click();
// });

// Cypress.Commands.add('clickOnSubmitSaleDetailForm', () => {
//   cy.get('button[data-testid="form-detail-submit-button"]').click();
//   cy.wait(500);
// });

// Cypress.Commands.add('validateTotalsSaleForm', ({ amount, valuePay }) => {
//   // Validar totales
//   cy.getFormInput('amount').should('have.value', amount.toString());
//   cy.getFormInput('value_pay').should('have.value', valuePay.toString());
// });
