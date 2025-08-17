export interface ShoppingCommands {
  createShopping(opt?: {
    fastCreation?: boolean;
    returnOnlyShopping?: boolean;
  }): Cypress.Chainable<any>;

  createShoppingAnd(callback: (data: any) => void): void;

  openShoppingDetailForm(): void;

  clickOnSubmitShoppingDetailForm(): void;

  validateTotalsShoppingForm(params: {
    amount: number;
    valuePay: number;
  }): void;
}
