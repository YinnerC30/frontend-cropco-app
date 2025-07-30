export interface TableCommands {
  clickActionsButtonTableRow(id: string | number): Cypress.Chainable<void>;
  changeTablePageSize(size: number): Cypress.Chainable<void>;
  clickOnGoNextPageButton(): Cypress.Chainable<void>;
  checkTablePageInfoContains(text: string): Cypress.Chainable<void>;
  clickOnGoPreviousPageButton(): Cypress.Chainable<void>;
  clickOnViewRecord(): Cypress.Chainable<void>;
  clickOnCopyIdButton(): Cypress.Chainable<void>;
  toggleSelectAllTableRows(): Cypress.Chainable<void>;
  checkSelectedTableRowsGreaterThanZero(): Cypress.Chainable<void>;
  checkSelectedTableRowsIsZero(): Cypress.Chainable<void>;
  clickOnUpdateRecord(): Cypress.Chainable<void>;
  checkActionButtonsState(expected: {
    update?: boolean;
    view?: boolean;
    delete?: boolean;
  }): Cypress.Chainable<void>;
  openActionsMenuByField(value: string, url: string): Cypress.Chainable<void>;
  clickOnDeleteRecord(): Cypress.Chainable<void>;
  clickOnContinueDeleteOneRecord(): Cypress.Chainable<void>;
  clickOnContinueDeleteBulkRecord(): Cypress.Chainable<void>;
  existPaginationButtons(): Cypress.Chainable<void>;
  existPaginationInfo(): Cypress.Chainable<void>;
  checkPaginationValues(): Cypress.Chainable<void>;
  clickOnUpdateDetailRecord(): Cypress.Chainable<void>;
} 