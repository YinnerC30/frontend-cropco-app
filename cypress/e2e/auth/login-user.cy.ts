describe('Login de usuario', () => {
  it('debería permitir iniciar sesión con credenciales válidas', () => {
    cy.visit('/app/authentication/login');
    cy.get('input[name="email"]').type('usermant@mail.com');
    cy.get('input[name="password"]').type('123456');
    cy.get('button[type="submit"]', { timeout: 5000 })
      .should('be.visible')
      .click();

    cy.contains('Bienvenid@ a CropCo').should('be.visible');
    cy.url().should('include', '/app/home/page');
    cy.visit('/app/authentication/login');
    cy.wait(5000);
    cy.url().should('include', '/app/home/page');
  });

  it('debería mostrar error con credenciales inválidas', () => {
    cy.visit('/app/authentication/login');
    cy.get('input[name="email"]').type('otrocorreo@mail.com');
    cy.get('input[name="password"]').type('contraseñaIncorrecta');
    cy.get('button[type="submit"]', { timeout: 5000 })
      .should('be.visible')
      .click();

    cy.contains(
      'Usuario o contraseña incorrectos, inténtelo nuevamente'
    ).should('be.visible');
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
    cy.url().should('include', '/app/authentication/login');
  });

  it('debería mantener el mensaje de bienvenida visible tras recargar la ventana después del login', () => {
    cy.visit('/app/authentication/login');
    cy.get('input[name="email"]').type('usermant@mail.com');
    cy.get('input[name="password"]').type('123456');
    cy.get('button[type="submit"]', { timeout: 5000 })
      .should('be.visible')
      .click();

    cy.contains('Bienvenid@ a CropCo').should('be.visible');
    cy.url().should('include', '/app/home/page');

    // Forzar recarga de la ventana
    cy.reload();

    // Verificar que el mensaje de bienvenida sigue visible tras la recarga
    cy.contains('Bienvenid@ a CropCo').should('be.visible');
    cy.url().should('include', '/app/home/page');
  });
});
