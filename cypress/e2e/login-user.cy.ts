describe('template spec', () => {
  it('passes', () => {
    cy.visit('/app/authentication/login');
    cy.get('input[name="email"]').type('usermant@mail.com');
    cy.get('input[name="password"]').type('123456');
    cy.get('button[type="submit"]', { timeout: 5000 })
      .should('be.visible')
      .click();

    cy.contains('Bienvenid@ a CropCo').should('be.visible');
  });
});
