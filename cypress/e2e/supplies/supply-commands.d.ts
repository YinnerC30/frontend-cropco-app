export interface SupplyCommands {
  createSupply(
    data?: {
      name?: string;
      brand?: string;
      unit_of_measure?: string;
      observation?: string;
    },
    opt?: { fastCreation?: boolean }
  ): Cypress.Chainable<any>;
  
  createSupplyAnd(
    data: {
      name?: string;
      brand?: string;
      unit_of_measure?: string;
      observation?: string;
    },
    callback: (data: any) => void
  ): Cypress.Chainable<void>;

  createCustomSupply(
    data: {
      unitOfMeasure: string;
    },
  ): Cypress.Chainable<any>;
} 