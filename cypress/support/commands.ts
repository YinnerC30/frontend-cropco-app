/// <reference types="cypress" />
/// <reference path="./custom-commands/types/types.d.ts" />

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

import '../e2e/auth/auth';
import './custom-commands/navigation';
import './custom-commands/ui';
import './custom-commands/forms';
import './custom-commands/table';
import '../e2e/users/users-commands';
import '../e2e/employees/employees';
import '../e2e/clients/clients';
import '../e2e/suppliers/suppliers';
import '../e2e/crops/crops';
import '../e2e/supplies/supplies';
import '../e2e/harvests/harvests';
import '../e2e/sales/sales-commands';
import './custom-commands/works';
import './custom-commands/seed';
import './custom-commands/search-bar';
import './custom-commands/actions';

// Declaraciones de tipos y cualquier configuración global pueden ir aquí si es necesario.
