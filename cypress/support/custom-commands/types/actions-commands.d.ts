export interface ActionsCommands {
  existRefetchButton(): Cypress.Chainable<void>;
  existCreateButton(): Cypress.Chainable<void>;
  clickOnCreateButton(): Cypress.Chainable<void>;
  clickRefetchButton(): Cypress.Chainable<void>;
  checkRefetchButtonState(shouldBeEnabled: boolean): Cypress.Chainable<void>;
  checkClearSelectionButtonState(shouldBeVisible: boolean): Cypress.Chainable<void>;
  checkDeleteBulkButtonState(shouldBeVisible: boolean, shouldBeEnabled?: boolean): Cypress.Chainable<void>;
  checkCreateButtonState(shouldBeDisabled: boolean): Cypress.Chainable<void>;
  clickOnDeleteBulkButton(): Cypress.Chainable<void>;
} 