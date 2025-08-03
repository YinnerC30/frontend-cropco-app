export * from '../e2e/auth/auth.commands';
export * from '../e2e/clients/clients.commands';
export * from '../e2e/crops/crops.commands';
export * from '../e2e/employees/employees.commands';
export * from '../e2e/harvests/harvests.commands';
export * from '../e2e/sales/sales.commands';
export * from '../e2e/suppliers/suppliers.commands';
export * from '../e2e/supplies/supplies.commands';
export * from '../e2e/users/users.commands';
export * from '../e2e/works/works.commands';

export * from './custom-commands/actions.commands';
export * from './custom-commands/forms.commands';
export * from './custom-commands/navigation.commands';
export * from './custom-commands/search-bar.commands';
export * from './custom-commands/seed.commands';
export * from './custom-commands/table.commands';
export * from './custom-commands/ui.commands';

import { AuthCommands } from '../e2e/auth/auth-commands';
import { ClientCommands } from '../e2e/clients/client-commands';
import { CropCommands } from '../e2e/crops/crop-commands';
import { EmployeeCommands } from '../e2e/employees/employee-commands';
import { HarvestCommands } from '../e2e/harvests/harvest-commands';
import { SalesCommands } from '../e2e/sales/sales-commands';
import { SupplierCommands } from '../e2e/suppliers/supplier-commands';
import { SupplyCommands } from '../e2e/supplies/supply-commands';
import { UserCommands } from '../e2e/users/user-commands';
import { WorkCommands } from '../e2e/works/work-commands';

import { ActionsCommands } from './custom-commands/types/actions-commands';
import { FormsCommands } from './custom-commands/types/forms-commands';
import { NavigationCommands } from './custom-commands/types/navigation-commands';
import { SearchBarCommands } from './custom-commands/types/search-bar-commands';
import { SeedCommands } from './custom-commands/types/seed-commands';
import { TableCommands } from './custom-commands/types/table-commands';
import { UICommands } from './custom-commands/types/ui-commands';

declare global {
  namespace Cypress {
    interface Chainable<Subject = any>
      extends AuthCommands,
        ClientCommands,
        CropCommands,
        EmployeeCommands,
        HarvestCommands,
        SalesCommands,
        SupplierCommands,
        SupplyCommands,
        UserCommands,
        WorkCommands,
        ActionsCommands,
        FormsCommands,
        NavigationCommands,
        SearchBarCommands,
        SeedCommands,
        TableCommands,
        UICommands {}
  }
}

export {};
