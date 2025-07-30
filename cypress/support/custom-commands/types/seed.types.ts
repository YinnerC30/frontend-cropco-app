// Tipos para comandos de seed
export interface SeedOptions {
  token?: string;
  tenantId?: string;
  url?: string;
  callback?: (response: any) => void;
}

export interface SeedCommands {
  executeSeed(
    body: any,
    options?: SeedOptions
  ): Cypress.Chainable<any>;
  executeClearSeedData(
    body: any,
    options?: SeedOptions
  ): Cypress.Chainable<void>;
} 