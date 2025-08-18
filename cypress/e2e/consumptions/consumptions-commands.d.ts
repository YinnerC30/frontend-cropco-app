export interface ConsumptionCommands {
  createConsumption(opt?: {
    fastCreation?: boolean;
    returnOnlyConsumption?: boolean;
  }): Cypress.Chainable<any>;

  createConsumptionAnd(callback: (data: any) => void): void;

  openConsumptionDetailForm(): void;

  clickOnSubmitConsumptionDetailForm(): void;
}
