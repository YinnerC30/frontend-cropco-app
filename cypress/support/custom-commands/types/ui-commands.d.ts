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
  checkMessageIncorrectInformation(): Cypress.Chainable<void>;
  checkMessageNotFoundInformation(): Cypress.Chainable<void>;
  checkMassUnitOfMeasureButton(): Cypress.Chainable<void>;
  clickOnMassUnitOfMeasureButton(): Cypress.Chainable<void>;
  checkVolumeUnitOfMeasureButton(): Cypress.Chainable<void>;
  clickOnVolumeUnitOfMeasureButton(): Cypress.Chainable<void>;
  checkLengthUnitOfMeasureButton(): Cypress.Chainable<void>;
  clickOnLengthUnitOfMeasureButton(): Cypress.Chainable<void>;
}
