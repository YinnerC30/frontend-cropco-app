describe('Tema de color de la app', () => {
  beforeEach(() => {
    cy.loginUser();
  });

  it('Debe cambiar a modo oscuro', () => {
    cy.get('button[data-testid="btn-change-theme-app"]').click();
    cy.get('div[data-testid="btn-dark-theme"]').click();
    // Verificar que la etiqueta html tiene la clase 'dark'
    cy.get('html').should('have.class', 'dark');
  });

  it('Debe cambiar a modo claro', () => {
    cy.get('button[data-testid="btn-change-theme-app"]').click();
    cy.get('div[data-testid="btn-light-theme"]').click();
    // Verificar que la etiqueta html tiene la clase 'dark'
    cy.get('html').should('have.class', 'light');
  });

  it('Debe cambiar a modo sistema', () => {
    cy.get('button[data-testid="btn-change-theme-app"]').click();
    cy.get('div[data-testid="btn-system-theme"]').click();
    // Verificar que la etiqueta html tiene la clase 'system' o no tiene ni 'dark' ni 'light'
    // Dependiendo de la implementación, podrías verificar que no tenga ni 'dark' ni 'light'
    cy.get('html').should(($html) => {
      const hasDark = $html.hasClass('dark');
      const hasLight = $html.hasClass('light');
      expect(hasDark || hasLight).to.be.true;
      expect(hasDark && hasLight).to.be.false;
    });
  });
});
