export interface PaymentsCommands {
  createPayment(opt?: { returnOnlyPayment?: boolean }): Cypress.Chainable<any>;
}
