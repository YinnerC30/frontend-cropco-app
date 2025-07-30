// Extiende la interfaz Chainable de Cypress para incluir los comandos personalizados
// Este archivo ahora importa todos los tipos desde archivos modulares organizados

import {
  AuthCommands,
  NavigationCommands,
  UICommands,
  FormsCommands,
  TableCommands,
  UsersCommands,
  EmployeesCommands,
  ClientsCommands,
  SuppliersCommands,
  CropsCommands,
  SuppliesCommands,
  HarvestCommands,
  WorksCommands,
  SeedCommands,
} from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable<Subject = any>
      extends AuthCommands,
        NavigationCommands,
        UICommands,
        FormsCommands,
        TableCommands,
        UsersCommands,
        EmployeesCommands,
        ClientsCommands,
        SuppliersCommands,
        CropsCommands,
        SuppliesCommands,
        HarvestCommands,
        WorksCommands,
        SeedCommands {}
  }
}

export {};
