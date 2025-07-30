// Tipos para comandos de trabajos
export interface WorksCommands {
  createWork(opt?: { fastCreation?: boolean, returnOnlyWork?: boolean }): Cypress.Chainable<any>;
  createWorkAnd(callback: (data: any) => void): Cypress.Chainable<any>;
  validateTotalsWorkForm(data: {
    amount: number;
    valuePay: number;
  }): Cypress.Chainable<any>;
} 