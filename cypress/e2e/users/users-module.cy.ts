describe('Modulo de usuarios', () => {
  beforeEach(() => {
    cy.loginUser();
    cy.get('button[data-testid="btn-module-users"]').click();
  });

  it('Debe ingresar a la ruta correcta ', () => {
    cy.contains('Usuarios');
    cy.url().should('include', 'users/view/all');
  });

  it('Debe contener los elementos necesarios', () => {
    cy.get('input[data-testid="input-basic-search-bar"]').should('exist');
    cy.get('input[placeholder="Escribe algo..."]').should('exist');

    cy.get('button[data-testid="btn-submit-basic-searchbar"]').should('exist');
    cy.get('button[data-testid="btn-clear-basic-searchbar"]').should('exist');

    cy.get('button[data-testid="btn-refetch-data"]').should('exist');
    cy.get('button[data-testid="btn-create-record"]').should('exist');

    cy.contains('Total:');
    cy.contains('N° seleccionados:');
    cy.contains('N° registros:');
    cy.get('button[data-testid="btn-page-size-selector"]').should('exist');

    cy.contains('Nombre(s):');
    cy.contains('Apellido(s):');
    cy.contains('Correo electrónico:');
    cy.contains('Número celular:');
    cy.contains('Rol asignado:');
    cy.contains('Activo:');

    cy.get('button[data-testid="btn-go-first-page"]').should('exist');
    cy.get('button[data-testid="btn-go-previous-page"]').should('exist');
    cy.get('button[data-testid="btn-go-next-page"]').should('exist');
    cy.get('button[data-testid="btn-go-last-page"]').should('exist');

    cy.contains('Página 1 de');
  });

  it.only('Debe crear un usuario ', () => {
    cy.get('button[data-testid="btn-create-record"]').click();
    cy.get('input[name="first_name"]').type('UserName');
    cy.get('input[name="last_name"]').type('LastName');
    const randomNum = Math.floor(10 + Math.random() * 90);
    cy.get('input[name="email"]').type(`emailtest${randomNum}@gmail.com`);
    cy.get('input[name="cell_phone_number"]').type('3123456547');
    cy.get('input[name="passwords.password1"]').type('123456');
    cy.get('input[name="passwords.password2"]').type('123456');

    cy.get('button[data-testid="form-submit-button"]').click();
    cy.get('button[data-testid="form-submit-button"]').should('be.disabled');
    cy.contains('Usuario creado');
  });
});
