Cypress.Commands.add('clickOnIgnoreButton', () => {
  cy.contains('button', 'Ignorar').click();
});

Cypress.Commands.add('clickOnCloseToast', () => {
  cy.get('button[aria-label="Close toast"]').click();
});

Cypress.Commands.add('checkDialogIsNotVisible', () => {
  cy.get('div[role="dialog"]').should('not.exist');
});

Cypress.Commands.add('checkDialogIsVisible', () => {
  cy.get('div[role="dialog"]').should('exist');
});

Cypress.Commands.add('checkLoadingInformation', () => {
  cy.contains('Cargando información');
});

Cypress.Commands.add('checkMessageFieldsMissing', () => {
  cy.contains('Faltan campos por rellenar en el formulario');
});

Cypress.Commands.add('checkMessageLostFormData', () => {
  cy.contains('¡Atención! Cambios sin guardar.');
  cy.contains('Tienes modificaciones pendientes en el formulario.');
  cy.contains('Ignorar');
});

Cypress.Commands.add('shouldBeRedirectedForNoPermission', () => {
  cy.contains('No tienes permiso para esta acción, seras redirigido');
});

Cypress.Commands.add('checkNoRecordsMessage', () => {
  cy.contains('No hay registros');
});

Cypress.Commands.add('checkSidebarMenuItem', (menuItem: string) => {
  cy.get('ul[data-sidebar="menu"]').within(() => {
    cy.get('li[data-sidebar="menu-item"]')
      .should('have.length', 1)
      .contains(menuItem);
  });
});

Cypress.Commands.add('checkMessageIncorrectInformation', () => {
  cy.contains('La solicitud contiene información incorrecta');
});

Cypress.Commands.add('checkMessageNotFoundInformation', () => {
  cy.contains('No se encontró la información solicitada');
});

Cypress.Commands.add('checkMassUnitOfMeasureButton', () => {
  cy.get('button[data-testid="btn-select-mass-unit-of-measure"]')
    .should('exist')
    .should('be.visible');
});

Cypress.Commands.add(
  'checkCurrentMassUnitOfMeasureSelected',
  (value: string) => {
    cy.get('button[data-testid="btn-select-mass-unit-of-measure"]')
      .should('exist')
      .and('have.attr', 'data-value', value);
  }
);

Cypress.Commands.add('clickOnMassUnitOfMeasureButton', () => {
  cy.get('button[data-testid="btn-select-mass-unit-of-measure"]').click();
});

Cypress.Commands.add('checkVolumeUnitOfMeasureButton', () => {
  cy.get('button[data-testid="btn-select-volume-unit-of-measure"]')
    .should('exist')
    .should('be.visible');
});

Cypress.Commands.add(
  'checkCurrentVolumeUnitOfMeasureSelected',
  (value: string) => {
    cy.get('button[data-testid="btn-select-volume-unit-of-measure"]')
      .should('exist')
      .and('have.attr', 'data-value', value);
  }
);

Cypress.Commands.add('clickOnVolumeUnitOfMeasureButton', () => {
  cy.get('button[data-testid="btn-select-volume-unit-of-measure"]').click();
});

Cypress.Commands.add('checkLengthUnitOfMeasureButton', () => {
  cy.get('button[data-testid="btn-select-length-unit-of-measure"]')
    .should('exist')
    .should('be.visible');
});

Cypress.Commands.add(
  'checkCurrentLengthUnitOfMeasureSelected',
  (value: string) => {
    cy.get('button[data-testid="btn-select-length-unit-of-measure"]')
      .should('exist')
      .and('have.attr', 'data-value', value);
  }
);

Cypress.Commands.add('clickOnLengthUnitOfMeasureButton', () => {
  cy.get('button[data-testid="btn-select-length-unit-of-measure"]').click();
});
