/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

import './custom-commands/auth';
import './custom-commands/navigation';
import './custom-commands/ui';
import './custom-commands/forms';
import './custom-commands/table';
import './custom-commands/users';
import './custom-commands/employees';
import './custom-commands/clients';
import './custom-commands/suppliers';
import './custom-commands/crops';
import './custom-commands/supplies';
import './custom-commands/harvests';

// Declaraciones de tipos y cualquier configuración global pueden ir aquí si es necesario.
