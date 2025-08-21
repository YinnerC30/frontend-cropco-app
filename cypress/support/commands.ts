/// <reference types="cypress" />

import '../e2e/auth/auth.commands';
import '../e2e/clients/clients.commands';
import '../e2e/crops/crops.commands';
import '../e2e/employees/employees.commands';
import '../e2e/harvests/harvests.commands';
import '../e2e/sales/sales.commands';
import '../e2e/suppliers/suppliers.commands';
import '../e2e/supplies/supplies.commands';
import '../e2e/users/users.commands';
import '../e2e/works/works.commands';
import '../e2e/shopping/shopping.commands';
import '../e2e/consumptions/consumptions.commands';
import '../e2e/payments/payments.commands';

import './custom-commands/actions.commands';
import './custom-commands/forms.commands';
import './custom-commands/navigation.commands';
import './custom-commands/search-bar.commands';
import './custom-commands/seed.commands';
import './custom-commands/table.commands';
import './custom-commands/ui.commands';
import "cypress-real-events/support";
