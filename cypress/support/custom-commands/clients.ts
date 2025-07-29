import { InformationGenerator } from '../../e2e/helpers/InformationGenerator';

Cypress.Commands.add(
  'createClient',
  function (
    { firstName, lastName, email, cellPhoneNumber, address } = {},
    { fastCreation = false } = {}
  ): Cypress.Chainable<any> {
    const creationClientEndpoint = 'http://localhost:3000/clients/create';

    if (fastCreation) {
      cy.visit('/app/home/clients/create/one');
    } else {
      cy.navigateToModuleWithSideBar('clients');
      cy.wait(3000);
      cy.clickOnCreateButton();
    }

    cy.wait(1000);
    const defaultFirstName = 'ClientName';
    const defaultLastName = 'LastName';

    const defaultEmail = InformationGenerator.generateEmail();
    const defaultCellPhoneNumber = '3123456547';
    const usedFirstName = firstName ?? defaultFirstName;
    const usedLastName = lastName ?? defaultLastName;
    const usedEmail = email ?? defaultEmail;
    const usedCellPhoneNumber = cellPhoneNumber ?? defaultCellPhoneNumber;
    const usedAddress = address ?? InformationGenerator.generateAddress();
    cy.getFormInput('first_name').type(usedFirstName);
    cy.getFormInput('last_name').type(usedLastName);
    cy.getFormInput('email').type(usedEmail);
    cy.getFormInput('cell_phone_number').type(usedCellPhoneNumber);
    cy.getFormTextArea('address').type(usedAddress);

    cy.intercept('POST', creationClientEndpoint).as('createClientRequest');
    cy.clickOnSubmitButton();
    return cy.wait('@createClientRequest').then((interception) => {
      return cy.wrap({
        ...interception.response?.body,
      });
    });
  }
);

Cypress.Commands.add('createClientAnd', (data, callback) => {
  cy.createClient(data, { fastCreation: true }).then((data) => {
    callback(data);
  });
});
