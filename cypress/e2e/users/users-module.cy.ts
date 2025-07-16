describe('Modulo de usuarios', () => {
  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('users');
  });

  it('Debe ingresar a la ruta correcta ', () => {
    cy.contains('Usuarios');
    cy.checkCurrentUrl('users/view/all');
  });

  it('Debe contener los elementos necesarios', () => {
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
    cy.wait(3000);
    cy.clickOnCreateButton();
    cy.getFormInput('first_name').type('UserName');
    cy.getFormInput('last_name').type('LastName');
    const randomNum = Math.floor(10 + Math.random() * 90);
    cy.getFormInput('email').type(`emailtest${randomNum}@gmail.com`);
    cy.getFormInput('cell_phone_number').type('3123456547');
    cy.getFormInput('passwords.password1').type('123456');
    cy.getFormInput('passwords.password2').type('123456');

    cy.clickOnSubmitButton();
    cy.checkDisabledSubmitButton();
    cy.contains('Usuario creado');
  });

  it('Modificar usuario existente', () => {
    cy.createUser().then((email) => {
      cy.visit(`/app/home/users/view/all?query=${email}`);
      cy.get('button[data-testid="btn-actions-table"]').click();
      cy.get('a[data-testid="link-update-record"]').click();
      cy.getFormInput('first_name').clear().type('UserNameChanged');
      cy.getFormInput('last_name').clear().type('LastNameChanged');
      const randomNum = Math.floor(10 + Math.random() * 90);
      cy.getFormInput('email').clear().type(`emailtest${randomNum}@gmail.com`);
      cy.getFormInput('cell_phone_number').clear().type('3123451111');
      cy.clickOnSubmitButton();
      cy.checkDisabledSubmitButton();
      cy.contains('Usuario actualizado');
    });
  });

  it('Eliminar usuario', () => {
    cy.createUser().then((email) => {
      cy.visit(`/app/home/users/view/all?query=${email}`);
      cy.get('button[data-testid="btn-actions-table"]').click();
      cy.get('button[data-testid="btn-delete-one-record"]').click();
      cy.get('button[data-testid="btn-continue-delete-one-record"]').click();

      cy.contains('Usuario eliminado');
      cy.contains('No hay registros');
    });
  });

  it.only('Copiar Id del usuario', () => {
    cy.createUser().then((email) => {
      cy.visit(`/app/home/users/view/all?query=${email}`);
      cy.get('button[data-testid="btn-actions-table"]').click();
      cy.get('button[data-testid="btn-copy-id"]').click();

      cy.contains('Id copiado al portapapeles');
    });
  });
});
