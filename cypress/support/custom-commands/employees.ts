import { InformationGenerator } from '../../e2e/helpers/InformationGenerator';

Cypress.Commands.add(
  'createEmployee',
  function (
    { firstName, lastName, email, cellPhoneNumber, address } = {},
    { fastCreation = false } = {}
  ): Cypress.Chainable<any> {
    const creationEmployeeEndpoint = 'http://localhost:3000/employees/create';

    if (fastCreation) {
      cy.visit('/app/home/employees/create/one');
    } else {
      cy.navigateToModuleWithSideBar('employees');
      cy.wait(3000);
      cy.clickOnCreateButton();
    }

    cy.wait(1000);
    const defaultFirstName = 'EmployeeName';
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

    cy.intercept('POST', creationEmployeeEndpoint).as('createEmployeeRequest');
    cy.clickOnSubmitButton();
    return cy.wait('@createEmployeeRequest').then((interception) => {
      return cy.wrap({
        ...interception.response?.body,
      });
    });
  }
);

Cypress.Commands.add('createEmployeeAnd', (callback = () => {}) => {
  cy.executeSeed({ employees: 1 }).then(
    ({ history: { insertedEmployees } }) => {
      callback(insertedEmployees[0]);
    }
  );
});
