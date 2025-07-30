import { PersonalInformation } from 'cypress/interfaces/PersonalInformation';

// Tipos para comandos de clientes
export interface ClientsCommands {
  createClient(
    data?: PersonalInformation,
    opt?: { fastCreation?: boolean }
  ): Cypress.Chainable<any>;
  createClientAnd(
    data: PersonalInformation,
    callback: (data: any) => void
  ): Cypress.Chainable<void>;
} 