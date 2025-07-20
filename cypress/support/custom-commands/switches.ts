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