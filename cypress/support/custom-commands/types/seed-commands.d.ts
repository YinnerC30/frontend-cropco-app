export interface SeedCommands {
  executeSeed(
    body: any,
    options?: {
      tenantId?: string;
      url?: string;
      callback?: (response: any) => void;
    }
  ): Cypress.Chainable<any>;
  executeClearSeedData(
    body: any,
    options?: {
      tenantId?: string;
      url?: string;
      callback?: (response: any) => void;
    }
  ): Cypress.Chainable<any>;
  getTokenToSeed(): Cypress.Chainable<string>;
}
