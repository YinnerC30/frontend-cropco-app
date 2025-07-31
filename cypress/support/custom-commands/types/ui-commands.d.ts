export interface UICommands {
  clickOnIgnoreButton(): Cypress.Chainable<void>;
  clickOnCloseToast(): Cypress.Chainable<void>;
  checkDialogIsNotVisible(): Cypress.Chainable<void>;
  checkDialogIsVisible(): Cypress.Chainable<void>;
  checkLoadingInformation(): Cypress.Chainable<void>;
  checkMessageFieldsMissing(): Cypress.Chainable<void>;
  checkMessageLostFormData(): Cypress.Chainable<void>;
  shouldBeRedirectedForNoPermission(): Cypress.Chainable<void>;
  checkNoRecordsMessage(): Cypress.Chainable<void>;
  checkSidebarMenuItem(menuItem: string): Cypress.Chainable<void>;
} 