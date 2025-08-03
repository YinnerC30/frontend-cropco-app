export interface SearchBarCommands {
  existBasicSearchBar(): Cypress.Chainable<void>;
  clickOnSubmitBasicSearchBar(): Cypress.Chainable<void>;
  typeOnInputBasicSearchBar(value: string): Cypress.Chainable<void>;
  clearInputBasicSearchBar(): Cypress.Chainable<void>;
  checkSearchBarIsDisabled(): Cypress.Chainable<void>;
} 