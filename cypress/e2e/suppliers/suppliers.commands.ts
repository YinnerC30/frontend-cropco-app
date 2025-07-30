import { InformationGenerator } from '../helpers/InformationGenerator';

Cypress.Commands.add(
  'createSupplier',
  function (
    { firstName, lastName, email, cellPhoneNumber, address } = {},
    { fastCreation = false } = {}
  ): Cypress.Chainable<any> {
    const creationSupplierEndpoint = 'http://localhost:3000/suppliers/create';

    if (fastCreation) {
      cy.visit('/app/home/suppliers/create/one');
    } else {
      cy.navigateToModuleWithSideBar('suppliers');
      cy.wait(3000);
      cy.clickOnCreateButton();
    }

    cy.wait(1000);
    const defaultFirstName = 'SupplierName';
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
    cy.getFormInput('company_name').type('Nombre de compañia 1');
    cy.getFormTextArea('address').type(usedAddress);

    cy.intercept('POST', creationSupplierEndpoint).as('createSupplierRequest');
    cy.clickOnSubmitButton();
    return cy.wait('@createSupplierRequest').then((interception) => {
      return cy.wrap({
        ...interception.response?.body,
      });
    });
  }
);

Cypress.Commands.add('createSupplierAnd', (data, callback) => {
  cy.createSupplier(data, { fastCreation: true }).then((data) => {
    callback(data);
  });
});
