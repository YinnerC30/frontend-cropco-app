import { InformationGenerator } from '../../e2e/helpers/InformationGenerator';

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

// Cypress.Commands.add('createSupplierFast', function (): void {
//   cy.visit('/app/home/suppliers/create/one');
//   cy.wait(1000);
//   const defaultFirstName = InformationGenerator.generateFirstName();
//   const defaultLastName = InformationGenerator.generateLastName();

//   const defaultEmail = InformationGenerator.generateEmail();
//   const defaultCellPhoneNumber = InformationGenerator.generateCellPhoneNumber();

//   const usedFirstName = defaultFirstName;
//   const usedLastName = defaultLastName;

//   const usedEmail = defaultEmail;
//   const usedCellPhoneNumber = defaultCellPhoneNumber;
//   const usedAddress = InformationGenerator.generateAddress();

//   cy.getFormInput('first_name').type(usedFirstName);
//   cy.getFormInput('last_name').type(usedLastName);
//   cy.getFormInput('email').type(usedEmail);
//   cy.getFormInput('cell_phone_number').type(usedCellPhoneNumber);
//   cy.getFormTextArea('address').type(usedAddress);

//   cy.clickOnSubmitButton();
// });

// Cypress.Commands.add('createRandomSupplier', function () {
//   const firstName = InformationGenerator.generateFirstName();
//   const lastName = InformationGenerator.generateLastName();
//   const email = InformationGenerator.generateEmail();
//   const cellPhoneNumber = InformationGenerator.generateCellPhoneNumber();
//   const password = '123456';
//   cy.createSupplier({
//     firstName,
//     lastName,
//     email,
//     cellPhoneNumber,
//     password1: password,
//     password2: password,
//   });
// });

Cypress.Commands.add('createSupplierAnd', (data, callback) => {
  cy.createSupplier(data, { fastCreation: true }).then((data) => {
    callback(data);
  });
});

// Cypress.Commands.add(
//   'openActionsMenuByField',
//   (field: string, value: string) => {
//     cy.visit(`/app/home/users/view/all?query=${value}`);
//     cy.wait(1000);
//     cy.get('tbody tr')
//       .filter(`:contains(${value})`)
//       .first()
//       .within(() => {
//         cy.get('button[data-testid^="btn-actions-table-row-id-"]').click();
//       });
//   }
// );

// Cypress.Commands.add(
//   'searchAndSelectTableRow',
//   (field: string, value: string) => {
//     cy.typeOnInputBasicSearchBar(value);
//     cy.clickOnSubmitBasicSearchBar();
//     cy.get('tbody tr')
//       .filter(`:contains(${value})`)
//       .should('have.length.greaterThan', 0);
//     cy.contains(value);
//   }
// );
