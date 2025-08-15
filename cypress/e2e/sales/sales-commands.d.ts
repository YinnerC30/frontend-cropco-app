export interface SalesCommands {
  createSale(opt?: {
    fastCreation?: boolean;
    returnOnlySale?: boolean;
    isReceivable?: boolean;
    isReceivableGeneric?: boolean;
  }): Cypress.Chainable<any>;
  createSaleAnd(callback: (data: any) => void): Cypress.Chainable<void>;
  
  openSaleDetailForm(): Cypress.Chainable<void>;
  
  clickOnSubmitSaleDetailForm(): Cypress.Chainable<void>;
} 