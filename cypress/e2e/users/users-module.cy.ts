describe('Modulo de usuarios', () => {
  beforeEach(() => {
    cy.loginUser();
    // cy.get('button[data-testid="btn-module-users"]').click();
    cy.navigateToModuleWithSideBar('users');
  });

  it('Debe ingresar a la ruta correcta ', () => {
    cy.contains('Usuarios');
    // cy.url().should('include', 'users/view/all');
    cy.checkCurrentUrl('users/view/all');
  });

  it.only('Debe contener los elementos necesarios', () => {
    cy.existBasicSearchBar();

    cy.existRefetchButton();
    cy.existCreateButton();

    cy.existPaginationInfo();

    cy.contains('Nombre(s):');
    cy.contains('Apellido(s):');
    cy.contains('Correo electrónico:');
    cy.contains('Número celular:');
    cy.contains('Rol asignado:');
    cy.contains('Activo:');

    cy.existPaginationButtons();
  });

  it('Debe crear un usuario ', () => {
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
