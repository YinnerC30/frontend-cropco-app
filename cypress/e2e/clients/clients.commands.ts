import { InformationGenerator } from '../../helpers/InformationGenerator';

Cypress.Commands.add(
  'createClient',
  function (
    { firstName, lastName, email, cellPhoneNumber, address } = {},
    { fastCreation = false } = {}
  ): Cypress.Chainable<any> {
    const creationClientEndpoint = 'http://localhost:3000/clients/create';

    if (fastCreation) {
      return cy.executeSeed({ clients: 1 }).then((result) => {
        // Validamos que la estructura esperada exista
        if (
          result &&
          result.history &&
          Array.isArray(result.history.insertedClients) &&
          result.history.insertedClients.length > 0
        ) {
          return result.history.insertedClients[0];
        } else {
          throw new Error(
            'No se encontró ningún registro de cliente insertado en la respuesta del seed.'
          );
        }
      });
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
  cy.executeSeed({ clients: 1 }).then(({ history: { insertedClients } }) => {
    callback(insertedClients[0]);
  });
});

Cypress.Commands.add('clickExportAllClientsButton', () => {
  cy.get('button[data-testid="btn-export-all-clients"]').click();
});
