describe('Logout de usuario', () => {
  it('debería permitir cerrar la sesión', () => {
    cy.visit('/app/authentication/login');
    cy.get('input[name="email"]').type('usermant@mail.com');
    cy.get('input[name="password"]').type('123456');
    cy.get('button[type="submit"]', { timeout: 5000 })
      .should('be.visible')
      .click();

    cy.contains('Bienvenid@ a CropCo').should('be.visible');
    cy.url().should('include', '/app/home/page');
    cy.get('button[data-testid="btn-logout-user"]').click();
    cy.url().should('include', '/app/authentication/login');
  });
});
