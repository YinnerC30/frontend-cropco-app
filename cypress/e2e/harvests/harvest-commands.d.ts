export interface HarvestCommands {
  createHarvest(opt?: {
    fastCreation?: boolean;
    returnOnlyHarvest?: boolean;
    unitOfMeasure?: string;
  }): Cypress.Chainable<any>;

  createHarvestAnd(callback: (data: any) => void): Cypress.Chainable<void>;

  openHarvestDetailForm(): Cypress.Chainable<void>;

  clickOnSubmitHarvestDetailForm(): Cypress.Chainable<void>;

  createHarvestProcessed(opt?: {
    cropId: string;
    harvestId: string;
    amount: number;
    unitOfMeasure?: UnitType;
  }): Cypress.Chainable<any>;
}
