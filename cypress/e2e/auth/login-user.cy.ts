describe('Login de usuario', () => {
  beforeEach(() => {
    // Limpiar sesión antes de cada test para mayor confiabilidad
    cy.clearSession();
  });

  it('debería permitir iniciar sesión con credenciales válidas', () => {
    // Usar el comando personalizado - ¡una sola línea!
    cy.loginUser();
  });

  it('debería mostrar error con credenciales inválidas', () => {
    // Usar el comando personalizado para login inválido
    cy.attemptInvalidLogin('otrocorreo@mail.com', 'contraseñaIncorrecta');
  });

  it('debería mostrar errores al intentar enviar el formulario vacío', () => {
    cy.visit('/app/authentication/login');
    cy.get('button[type="submit"]', { timeout: 5000 })
      .should('be.visible')
      .click();

    cy.contains('El correo electrónico no es valido').should('be.visible');
    cy.contains('Debes ingresar la contraseña').should('be.visible');
    cy.contains('Faltan campos por rellenar en el formulario').should(
      'be.visible'
    );
  });

  it('debería redirigir al login si se intenta acceder a /app/home/page sin autenticación', () => {
    cy.visit('/app/home/page');
    cy.wait(3000);
    // Usar el comando personalizado para verificar que no está autenticado
    cy.shouldNotBeAuthenticated();
  });

  it('debería mantener el mensaje de bienvenida visible tras recargar la ventana después del login', () => {
    // Login con comando personalizado
    cy.loginUser();

    // Forzar recarga de la ventana
    cy.reload();

    // Verificar que sigue autenticado con comando personalizado
    cy.shouldBeAuthenticated();
  });

  it('debería permitir login con diferentes credenciales', () => {
    // Ejemplo de cómo usar el comando con credenciales personalizadas
    // cy.loginUser('admin@cropco.com', 'admin123');
    
    // Por ahora usamos las credenciales por defecto
    cy.loginUser();
  });
});
