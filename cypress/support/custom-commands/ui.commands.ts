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
  cy.shouldBeRedirectedForNoPermission();
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
