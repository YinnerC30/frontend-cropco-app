export interface SupplierCommands {
  createSupplier(
    data?: {
      firstName?: string;
      lastName?: string;
      email?: string;
      cellPhoneNumber?: string;
      address?: string;
    },
    opt?: { fastCreation?: boolean }
  ): Cypress.Chainable<any>;
  
  createSupplierAnd(
    data: {
      firstName?: string;
      lastName?: string;
      email?: string;
      cellPhoneNumber?: string;
      address?: string;
    },
    callback: (data: any) => void
  ): Cypress.Chainable<void>;
} 