import { PersonalInformation } from 'cypress/interfaces/PersonalInformation';

// Tipos para comandos de proveedores
export interface SuppliersCommands {
  createSupplier(
    data?: PersonalInformation,
    opt?: { fastCreation?: boolean }
  ): Cypress.Chainable<any>;
  createSupplierAnd(
    data: PersonalInformation,
    callback: (data: any) => void
  ): Cypress.Chainable<void>;
} 