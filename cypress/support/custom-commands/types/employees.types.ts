import { PersonalInformation } from 'cypress/interfaces/PersonalInformation';

// Tipos para comandos de empleados
export interface EmployeesCommands {
  createEmployee(
    data?: PersonalInformation,
    opt?: { fastCreation?: boolean }
  ): Cypress.Chainable<any>;
  createEmployeeAnd(callback?: (data: any) => void): Cypress.Chainable<void>;
} 