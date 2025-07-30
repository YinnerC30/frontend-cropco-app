// Importar todas las interfaces de comandos
export * from './auth-commands';
export * from './navigation-commands';
export * from './ui-commands';
export * from './forms-commands';
export * from './table-commands';
export * from './user-commands';
export * from './seed-commands';
export * from './actions-commands';
export * from './search-bar-commands';

// Importar las interfaces específicas de cada módulo
export * from '../../e2e/harvests/harvest-commands';
export * from '../../e2e/sales/sales-commands';
export * from '../../e2e/employees/employee-commands';
export * from '../../e2e/clients/client-commands';
export * from '../../e2e/suppliers/supplier-commands';
export * from '../../e2e/crops/crop-commands';
export * from '../../e2e/supplies/supply-commands';
export * from '../../e2e/users/user-commands';
export * from '../../e2e/auth/auth-commands';
export * from '../work-commands';

// Importar las interfaces para usar en la declaración global
import { AuthCommands } from '../../e2e/auth/auth-commands';
import { NavigationCommands } from './navigation-commands';
import { UICommands } from './ui-commands';
import { FormsCommands } from './forms-commands';
import { TableCommands } from './table-commands';
import { UserCommands } from '../../e2e/users/user-commands';
import { SeedCommands } from './seed-commands';
import { ActionsCommands } from './actions-commands';
import { SearchBarCommands } from './search-bar-commands';

// Importar las interfaces específicas de cada módulo
import { HarvestCommands } from '../../e2e/harvests/harvest-commands';
import { SalesCommands } from '../../e2e/sales/sales-commands';
import { EmployeeCommands } from '../../e2e/employees/employee-commands';
import { ClientCommands } from '../../e2e/clients/client-commands';
import { SupplierCommands } from '../../e2e/suppliers/supplier-commands';
import { CropCommands } from '../../e2e/crops/crop-commands';
import { SupplyCommands } from '../../e2e/supplies/supply-commands';
import { WorkCommands } from '../work-commands';

// Declaración global que extiende Cypress.Chainable con todas las interfaces
declare global {
  namespace Cypress {
    interface Chainable<Subject = any>
      extends AuthCommands,
        NavigationCommands,
        UICommands,
        FormsCommands,
        TableCommands,
        UserCommands,
        SeedCommands,
        ActionsCommands,
        SearchBarCommands,
        HarvestCommands,
        SalesCommands,
        EmployeeCommands,
        ClientCommands,
        SupplierCommands,
        CropCommands,
        SupplyCommands,
        WorkCommands {}
  }
}

export {};
