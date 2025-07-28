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
  function ({ firstName, withAllActions = false }): void {
    cy.visit('/app/home/users/create/one');
    cy.wait(1000);
    const defaultFirstName = InformationGenerator.generateFirstName();
    const defaultLastName = InformationGenerator.generateLastName();

    const defaultEmail = InformationGenerator.generateEmail();
    const defaultCellPhoneNumber =
      InformationGenerator.generateCellPhoneNumber();

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

Cypress.Commands.add(
  'checkModuleSwitchState',
  (moduleName: string, shouldBeActive: boolean = true) => {
    cy.get(`button[data-testid="switch-actions-module-${moduleName}"]`).should(
      'have.attr',
      'aria-checked',
      shouldBeActive ? 'true' : 'false'
    );
  }
);

Cypress.Commands.add('clickGlobalActionsSwitch', () => {
  cy.get('button[data-testid="switch-global-actions"]').click();
});

Cypress.Commands.add('clickModuleActionsSwitch', (moduleName: string) => {
  cy.get(`button[data-testid="switch-actions-module-${moduleName}"]`, {
    timeout: 5000,
  }).click({ timeout: 5000 });
});

Cypress.Commands.add('clickActionSwitch', (actionName: string) => {
  cy.get(`button[data-testid="switch-action-${actionName}"]`).click();
});

Cypress.Commands.add(
  'checkGlobalActionsSwitchState',
  (shouldBeActive: boolean) => {
    cy.get('button[data-testid="switch-global-actions"]').should(
      'have.attr',
      'aria-checked',
      shouldBeActive ? 'true' : 'false'
    );
  }
);

Cypress.Commands.add('clickOnToggleStatusUserButton', () => {
  cy.get('button[data-testid="btn-toggle-status-user"]').click();
});

Cypress.Commands.add('checkToggleStatusUserButtonState', (shouldBeDisabled: boolean) => {
  cy.get('button[data-testid="btn-toggle-status-user"]').should(
    shouldBeDisabled ? 'be.disabled' : 'be.enabled'
  );
});

Cypress.Commands.add('clickOnResetPasswordUserButton', () => {
  cy.get('button[data-testid="btn-reset-password-user"]').click();
});


Cypress.Commands.add('checkResetPasswordUserButtonState', (shouldBeDisabled: boolean) => {
  cy.get('button[data-testid="btn-reset-password-user"]').should(
    shouldBeDisabled ? 'be.disabled' : 'be.enabled'
  );
});
