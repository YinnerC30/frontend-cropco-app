import { InformationGenerator } from 'cypress/helpers/InformationGenerator';

Cypress.Commands.add(
  'createSupply',
  function (
    { name, brand, unit_of_measure, observation } = {},
    { fastCreation = false } = {}
  ): Cypress.Chainable<any> {
    const creationSupplyEndpoint = 'http://localhost:3000/supplies/create';

    if (fastCreation) {
      return cy.executeSeed({ supplies: 1 }).then((result) => {
        // Validamos que la estructura esperada exista
        if (
          result &&
          result.history &&
          Array.isArray(result.history.insertedSupplies) &&
          result.history.insertedSupplies.length > 0
        ) {
          return result.history.insertedSupplies[0];
        } else {
          throw new Error(
            'No se encontró ningún registro de insumo insertado en la respuesta del seed.'
          );
        }
      });
    } else {
      cy.navigateToModuleWithSideBar('supplies');
      cy.wait(3000);
      cy.clickOnCreateButton();
    }

    cy.wait(1000);

    const usedName = !name
      ? 'cropname' + InformationGenerator.generateRandomId()
      : name;

    const usedBrand = !brand
      ? 'brand' + InformationGenerator.generateRandomId()
      : brand;

    const usedUnitOfMeasure = !unit_of_measure ? 'GRAMOS' : unit_of_measure;

    const usedObservation = !observation
      ? 'observation' + InformationGenerator.generateRandomId()
      : observation;

    cy.getFormInput('name').type(usedName);
    cy.getFormInput('brand').type(usedBrand);
    // cy.getFormInput('unit_of_measure').type(usedUnitOfMeasure);
    cy.get('button[data-testid="btn-select-group-field"]').click();
    cy.get(`div[role="option"][data-value="${usedUnitOfMeasure}"]`).click();
    cy.getFormTextArea('observation').type(usedObservation);

    cy.intercept('POST', creationSupplyEndpoint).as('createSupplyRequest');
    cy.clickOnSubmitButton();
    return cy.wait('@createSupplyRequest').then((interception) => {
      return cy.wrap({
        ...interception.response?.body,
      });
    });
  }
);

Cypress.Commands.add(
  'createCustomSupply',
  function ({ unitOfMeasure } = {}): Cypress.Chainable<any> {
    return cy
      .executeSeed({ customSupplies: { quantity: 1, unitOfMeasure } })
      .then((result) => {
        // Validamos que la estructura esperada exista
        if (
          result &&
          result.history &&
          Array.isArray(result.history.insertedCustomSupplies) &&
          result.history.insertedCustomSupplies.length > 0
        ) {
          return result.history.insertedCustomSupplies[0];
        } else {
          throw new Error(
            'No se encontró ningún registro de insumo insertado en la respuesta del seed.'
          );
        }
      });
  }
);

Cypress.Commands.add('createSupplyAnd', (data, callback) => {
  cy.createSupply(data, { fastCreation: true }).then((data) => {
    callback(data);
  });
});
