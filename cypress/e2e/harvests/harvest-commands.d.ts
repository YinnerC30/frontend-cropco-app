export interface HarvestCommands {
  createHarvest(opt?: {
    fastCreation?: boolean;
    returnOnlyHarvest?: boolean;
  }): Cypress.Chainable<any>;
  
  createHarvestAnd(callback: (data: any) => void): Cypress.Chainable<void>;
  
  openHarvestDetailForm(): Cypress.Chainable<void>;
  
  clickOnSubmitHarvestDetailForm(): Cypress.Chainable<void>;
} 