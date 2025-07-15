/**
 * Ejemplos de uso de comandos personalizados de autenticación
 * Este archivo demuestra las diferentes formas de usar los comandos
 */
describe('Ejemplos de comandos de autenticación', () => {
  describe('Comando loginUser', () => {
    beforeEach(() => {
      cy.clearSession();
    });

    it('Login con credenciales por defecto', () => {
      // Forma más simple - usa credenciales por defecto
      cy.loginUser();
      cy.shouldBeAuthenticated();
    });

    it('Login con credenciales personalizadas', () => {
      // Forma personalizada - especifica credenciales
      cy.loginUser('usermant@mail.com', '123456');
      cy.shouldBeAuthenticated();
    });

    it('Login seguido de navegación', () => {
      cy.loginUser();
      // Después del login puedes navegar donde necesites
      cy.visit('/app/home/page');
      cy.shouldBeAuthenticated();
    });
  });

  describe('Comando logoutUser', () => {
    beforeEach(() => {
      cy.clearSession();
      cy.loginUser(); // Preparar estado autenticado
    });

    it('Logout simple', () => {
      cy.logoutUser();
      cy.shouldNotBeAuthenticated();
    });

    it('Logout y verificación de redirección', () => {
      cy.shouldBeAuthenticated(); // Verificar estado inicial
      cy.logoutUser();
      cy.shouldNotBeAuthenticated();
    });
  });

  describe('Flujo completo de autenticación', () => {
    beforeEach(() => {
      cy.clearSession();
    });

    it('Login → Navegación → Logout', () => {
      // 1. Login
      cy.loginUser();
      cy.shouldBeAuthenticated();

      // 2. Navegar por la app (ejemplo)
      cy.visit('/app/home/page');
      cy.shouldBeAuthenticated();

      // 3. Logout
      cy.logoutUser();
      cy.shouldNotBeAuthenticated();
    });

    it('Múltiples sesiones de login/logout', () => {
      // Primera sesión
      cy.loginUser();
      cy.shouldBeAuthenticated();
      cy.logoutUser();
      cy.shouldNotBeAuthenticated();

      // Segunda sesión
      cy.loginUser();
      cy.shouldBeAuthenticated();
      cy.logoutUser();
      cy.shouldNotBeAuthenticated();
    });
  });

  describe('Comando attemptInvalidLogin', () => {
    beforeEach(() => {
      cy.clearSession();
    });

    it('Probar credenciales inválidas', () => {
      cy.attemptInvalidLogin('wrong@email.com', 'wrongpassword');
      // El comando ya verifica que aparezca el mensaje de error
    });

    it('Diferentes combinaciones de credenciales inválidas', () => {
      // Email correcto, contraseña incorrecta
      cy.attemptInvalidLogin('usermant@mail.com', 'wrongpassword');
      
      // Limpiar y probar email incorrecto, contraseña correcta
      cy.clearSession();
      cy.attemptInvalidLogin('wrong@email.com', '123456');
    });
  });

  describe('Comandos de utilidad', () => {
    it('clearSession limpia todo', () => {
      // Primero hacer login
      cy.loginUser();
      cy.shouldBeAuthenticated();

      // Limpiar sesión
      cy.clearSession();

      // Verificar que al intentar acceder página protegida redirige
      cy.visit('/app/home/page');
      cy.wait(2000);
      cy.shouldNotBeAuthenticated();
    });

    it('shouldBeAuthenticated verifica estado correcto', () => {
      cy.loginUser();
      cy.shouldBeAuthenticated(); // Esto verifica URL y mensaje de bienvenida
    });

    it('shouldNotBeAuthenticated verifica estado correcto', () => {
      // Sin hacer login, debería estar en login
      cy.visit('/app/authentication/login');
      cy.shouldNotBeAuthenticated();
    });
  });
}); 