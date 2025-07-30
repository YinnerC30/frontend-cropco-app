// Tipos para comandos de tablas
export interface TableCommands {
  changeTablePageSize(size: number): Cypress.Chainable<void>;
  toggleSelectAllTableRows(select?: boolean): Cypress.Chainable<void>;
  checkClearSelectionButtonState(shouldBeVisible: boolean): Cypress.Chainable<void>;
  checkDeleteBulkButtonState(shouldBeVisible: boolean): Cypress.Chainable<void>;
  checkSelectAllButtonState(shouldBeVisible: boolean): Cypress.Chainable<void>;
  checkSelectedTableRowsGreaterThanZero(): Cypress.Chainable<void>;
  checkSelectedTableRowsIsZero(): Cypress.Chainable<void>;
} 