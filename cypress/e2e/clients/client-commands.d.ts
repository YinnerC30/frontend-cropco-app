export interface ClientCommands {
  createClient(
    data?: {
      firstName?: string;
      lastName?: string;
      email?: string;
      cellPhoneNumber?: string;
      address?: string;
    },
    opt?: { fastCreation?: boolean }
  ): Cypress.Chainable<any>;
  
  createClientAnd(
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