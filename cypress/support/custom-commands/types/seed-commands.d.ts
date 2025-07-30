export interface SeedCommands {
  executeSeed(
    body: any,
    options?: {
      token?: string;
      tenantId?: string;
      url?: string;
      callback?: (response: any) => void;
    }
  ): Cypress.Chainable<any>;
  executeClearSeedData(
    body: any,
    options?: {
      token?: string;
      tenantId?: string;
      url?: string;
      callback?: (response: any) => void;
    }
  ): Cypress.Chainable<any>;
} 