export interface WorkCommands {
  createWork(opt?: {
    fastCreation?: boolean;
    returnOnlyWork?: boolean;
  }): Cypress.Chainable<any>;
  
  createWorkAnd(callback: (data: any) => void): Cypress.Chainable<void>;
  
  openWorkDetailForm(): Cypress.Chainable<void>;
  
  clickOnSubmitWorkDetailForm(): Cypress.Chainable<void>;
} 