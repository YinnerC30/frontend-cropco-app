// Tipos para comandos de cosechas
export interface HarvestCommands {
  createHarvest(opt?: { fastCreation?: boolean, returnOnlyHarvest?: boolean }): Cypress.Chainable<any>;
  createHarvestAnd(callback: (data: any) => void): Cypress.Chainable<any>;
  validateTotalsHarvestForm(data: {
    amount: number;
    valuePay: number;
  }): Cypress.Chainable<any>;
} 