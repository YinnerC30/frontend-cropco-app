import { InformationGenerator } from '../../e2e/helpers/InformationGenerator';

Cypress.Commands.add(
  'createUser',
  function ({
    firstName,
    lastName,
    email,
    cellPhoneNumber,
    password1,
    password2,
    withAllActions = false,
    selectedModules = [],
    selectedActions = [],
  } = {}): Cypress.Chainable<any> {
    const creationUserEndpoint = 'http://localhost:3000/users/create';

    cy.navigateToModuleWithSideBar('users');
    cy.wait(3000);
    cy.clickOnCreateButton();
    cy.wait(1000);
    const defaultFirstName = 'UserName';
    const defaultLastName = 'LastName';

    const defaultEmail = InformationGenerator.generateEmail();
    const defaultCellPhoneNumber = '3123456547';
    const defaultPassword = '123456';
    const usedFirstName = firstName ?? defaultFirstName;
    const usedLastName = lastName ?? defaultLastName;
    const usedEmail = email ?? defaultEmail;
    const usedCellPhoneNumber = cellPhoneNumber ?? defaultCellPhoneNumber;
    const usedPassword1 = password1 ?? defaultPassword;
    const usedPassword2 = password2 ?? defaultPassword;
    cy.getFormInput('first_name').type(usedFirstName);
    cy.getFormInput('last_name').type(usedLastName);
    cy.getFormInput('email').type(usedEmail);
    cy.getFormInput('cell_phone_number').type(usedCellPhoneNumber);
    cy.getFormInput('passwords.password1').type(usedPassword1);
    cy.getFormInput('passwords.password2').type(usedPassword2);

    if (withAllActions) {
      cy.clickGlobalActionsSwitch();
      cy.wait(1000);
    }

    if (selectedModules.length > 0) {
      for (const module of selectedModules) {
        cy.clickModuleActionsSwitch(module);
      }
    }

    if (selectedActions.length > 0) {
      for (const action of selectedActions) {
        cy.clickActionSwitch(action);
      }
    }

    cy.intercept('POST', creationUserEndpoint).as('createUserRequest');
    cy.clickOnSubmitButton();
    return cy.wait('@createUserRequest').then((interception) => {
      return cy.wrap({
        ...interception.response?.body,
        password: defaultPassword,
      });
    });
  }
);

Cypress.Commands.add(
  'createUserFast',
  function ({
    firstName,
    withAllActions = false,
  }): void {
    cy.visit('/app/home/users/create/one');
    cy.wait(1000);
    const defaultFirstName = InformationGenerator.generateFirstName();
    const defaultLastName = InformationGenerator.generateLastName();

    const defaultEmail = InformationGenerator.generateEmail();
    const defaultCellPhoneNumber = InformationGenerator.generateCellPhoneNumber();

    const defaultPassword = '123456';

    const usedFirstName = firstName || defaultFirstName;
    const usedLastName = defaultLastName;

    const usedEmail = defaultEmail;
    const usedCellPhoneNumber = defaultCellPhoneNumber;
    const usedPassword1 = defaultPassword;
    const usedPassword2 = defaultPassword;
    cy.getFormInput('first_name').type(usedFirstName);
    cy.getFormInput('last_name').type(usedLastName);
    cy.getFormInput('email').type(usedEmail);
    cy.getFormInput('cell_phone_number').type(usedCellPhoneNumber);
    cy.getFormInput('passwords.password1').type(usedPassword1);
    cy.getFormInput('passwords.password2').type(usedPassword2);
    cy.clickOnSubmitButton();
  }
);

Cypress.Commands.add('createRandomUser', function () {
  const firstName = InformationGenerator.generateFirstName();
  const lastName = InformationGenerator.generateLastName();
  const email = InformationGenerator.generateEmail();
  const cellPhoneNumber = InformationGenerator.generateCellPhoneNumber();
  const password = '123456';
  cy.createUser({
    firstName,
    lastName,
    email,
    cellPhoneNumber,
    password1: password,
    password2: password,
  });
});

Cypress.Commands.add('createUserAnd', (userData, callback) => {
  cy.createUser(userData).then((data) => {
    callback(data);
  });
});

Cypress.Commands.add(
  'openActionsMenuByField',
  (field: string, value: string) => {
    cy.visit(`/app/home/users/view/all?query=${value}`);
    cy.wait(1000);
    cy.get('tbody tr')
      .filter(`:contains(${value})`)
      .first()
      .within(() => {
        cy.get('button[data-testid^="btn-actions-table-row-id-"]').click();
      });
  }
);

Cypress.Commands.add(
  'searchAndSelectTableRow',
  (field: string, value: string) => {
    cy.typeOnInputBasicSearchBar(value);
    cy.clickOnSubmitBasicSearchBar();
    cy.get('tbody tr')
      .filter(`:contains(${value})`)
      .should('have.length.greaterThan', 0);
    cy.contains(value);
  }
); 