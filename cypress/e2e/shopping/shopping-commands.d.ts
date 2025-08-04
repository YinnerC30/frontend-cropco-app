export interface ShoppingCommands {
  createShopping(opt?: {
    fastCreation?: boolean;
    returnOnlyShopping?: boolean;
  }): Cypress.Chainable<any>;
} 