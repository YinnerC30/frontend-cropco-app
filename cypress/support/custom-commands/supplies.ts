import { InformationGenerator } from 'cypress/e2e/helpers/InformationGenerator';

Cypress.Commands.add(
  'createSupply',
  function (
    { name, brand, unit_of_measure, observation } = {},
    { fastCreation = false } = {}
  ): Cypress.Chainable<any> {
    const creationSupplyEndpoint = 'http://localhost:3000/supplies/create';

    if (fastCreation) {
      cy.visit('/app/home/supplies/create/one');
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
    cy.get('button[data-testid="btn-select-field"]').click();
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

Cypress.Commands.add('createSupplyAnd', (data, callback) => {
  cy.createSupply(data, { fastCreation: true }).then((data) => {
    callback(data);
  });
});
