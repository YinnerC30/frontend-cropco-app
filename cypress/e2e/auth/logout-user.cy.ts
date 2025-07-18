describe('Logout de usuario', () => {
  beforeEach(() => {
    // Limpiar sesión antes de cada test
    cy.clearSession();
  });

  it('debería permitir cerrar la sesión', () => {
    // Usar comando personalizado para login
    cy.loginUser();
    
    // Usar comando personalizado para logout
    cy.logoutUser();
  });

  it('debería redirigir al login después del logout', () => {
    // Login primero
    cy.loginUser();
    
    // Verificar que está autenticado
    cy.shouldBeAuthenticated();
    
    // Hacer logout
    cy.logoutUser();
    
    // Verificar que no está autenticado
    cy.shouldNotBeAuthenticated();
  });

  it('debería limpiar la sesión completamente tras logout', () => {
    // Login
    cy.loginUser();
    
    // Logout
    cy.logoutUser();
    
    // Intentar acceder a página protegida debería redirigir al login
    cy.visit('/app/home/page');
    cy.wait(2000);
    cy.shouldNotBeAuthenticated();
  });
});
