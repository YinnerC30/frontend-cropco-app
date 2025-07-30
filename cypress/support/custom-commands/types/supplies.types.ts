// Tipos para comandos de suministros
export interface SupplyData {
  name?: string;
  brand?: string;
  unit_of_measure?: string;
  observation?: string;
}

export interface SuppliesCommands {
  createSupply(
    data?: SupplyData,
    opt?: { fastCreation?: boolean }
  ): Cypress.Chainable<any>;
  createSupplyAnd(
    data: SupplyData,
    callback: (data: any) => void
  ): Cypress.Chainable<void>;
} 