export interface SalesCommands {
  createSale(opt?: {
    fastCreation?: boolean;
    returnOnlySale?: boolean;
    isReceivable?: boolean;
    isReceivableGeneric?: boolean;
  }): Cypress.Chainable<any>;
} 