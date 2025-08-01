import { InformationGenerator } from 'cypress/helpers/InformationGenerator';

Cypress.Commands.add(
  'createCrop',
  function (
    {
      name,
      description,
      units,
      number_hectares,
      location,
      date_of_creation,
      date_of_termination,
    } = {},
    { fastCreation = false } = {}
  ): Cypress.Chainable<any> {
    const creationCropEndpoint = 'http://localhost:3000/crops/create';

    if (fastCreation) {
      return cy.executeSeed({ crops: 1 }).then((result) => {
        // Validamos que la estructura esperada exista
        if (
          result &&
          result.history &&
          Array.isArray(result.history.insertedCrops) &&
          result.history.insertedCrops.length > 0
        ) {
          return result.history.insertedCrops[0];
        } else {
          throw new Error(
            'No se encontró ningún registro de cultivo insertado en la respuesta del seed.'
          );
        }
      });
    } else {
      cy.navigateToModuleWithSideBar('crops');
      cy.wait(3000);
      cy.clickOnCreateButton();
    }

    cy.wait(1000);

    const usedName = !name ? 'cropname' + InformationGenerator.generateRandomId() : name;
    const usedUnits = !units ? 1000 : units;
    const usedNumberHectares = !number_hectares ? 10 : number_hectares;
    const usedLocation = !location
      ? InformationGenerator.generateObservation()
      : location;
    const usedDescription = !description
      ? InformationGenerator.generateDescription()
      : description;

    cy.getFormInput('name').type(usedName);
    cy.getFormInput('units').type(usedUnits.toString());
    cy.getFormInput('number_hectares').type(usedNumberHectares.toString());

    cy.getFormTextArea('location').type(usedLocation);
    cy.getFormTextArea('description').type(usedDescription);

    cy.intercept('POST', creationCropEndpoint).as('createCropRequest');
    cy.clickOnSubmitButton();
    return cy.wait('@createCropRequest').then((interception) => {
      return cy.wrap({
        ...interception.response?.body,
      });
    });
  }
);

Cypress.Commands.add('createCropAnd', (data, callback) => {
  cy.createCrop(data, { fastCreation: true }).then((data) => {
    callback(data);
  });
});
