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

  it('Eliminar usuario', () => {
    cy.createUser({}).then((email) => {
      cy.visit(`/app/home/users/view/all?query=${email}`);
      cy.get('button[data-testid="btn-actions-table"]').click();
      cy.get('button[data-testid="btn-delete-one-record"]').click();
      cy.get('button[data-testid="btn-continue-delete-one-record"]').click();

      cy.contains('Usuario eliminado');
      cy.contains('No hay registros');
    });
  });

  it('Copiar Id del usuario', () => {
    cy.createUser({}).then((email) => {
      cy.visit(`/app/home/users/view/all?query=${email}`);
      cy.get('button[data-testid="btn-actions-table"]').click();
      cy.get('button[data-testid="btn-copy-id"]').click();

      cy.contains('Id copiado al portapapeles');
    });
  });

  it('Ver registro de usuario', () => {
    cy.createUser({}).then((email) => {
      cy.visit(`/app/home/users/view/all?query=${email}`);
      cy.get('button[data-testid="btn-actions-table"]').click();
      cy.get('a[data-testid="link-view-record"]').click();
      cy.contains('Información');
      cy.getFormInput('first_name').should('have.value', 'UserName');
      cy.getFormInput('last_name').should('have.value', 'LastName');
      cy.getFormInput('email').should('have.value', email);
      cy.getFormInput('cell_phone_number').should('have.value', '3123456547');
      cy.contains('Volver');
    });
  });
  it('Cambiar estado de usuario', () => {
    cy.createUser({}).then((email) => {
      cy.visit(`/app/home/users/view/all?query=${email}`);
      cy.get('button[data-testid="btn-actions-table"]').click();
      cy.contains('Desactivar');
      cy.get('button[data-testid="btn-toggle-status-user"]').click();
      cy.get('button[data-testid="btn-toggle-status-user"]').should(
        'be.disabled'
      );
      cy.contains('El estado del usuario ha sido actualizado con éxito.');
      cy.get('button[data-testid="btn-actions-table"]').click();
      cy.contains('Activar');
      cy.get('button[data-testid="btn-toggle-status-user"]').click();
      cy.get('button[data-testid="btn-toggle-status-user"]').should(
        'be.disabled'
      );
      cy.contains('El estado del usuario ha sido actualizado con éxito.');
    });
  });

  it('Restablecer contraseña de usuario', () => {
    cy.createUser({}).then((email) => {
      cy.visit(`/app/home/users/view/all?query=${email}`);
      cy.get('button[data-testid="btn-actions-table"]').click();
      cy.get('button[data-testid="btn-reset-password-user"]').click();
      cy.getFormInput('email').should('have.value', email);
      cy.get('button[data-testid="btn-execute-reset-password"]').click();
      cy.get('button[data-testid="btn-execute-reset-password"]').should(
        'be.disabled'
      );
      cy.contains('Contraseña restablecida');
      cy.getFormInput('password').invoke('val').should('not.be.empty');
      cy.get('button[data-testid="btn-copy-pass"]').click();
      cy.contains('Contraseña copiada al portapapeles');
    });
  });

  //Otras pruebas
  it('Intentar ingresar al sistema con un usuario desactivado', () => {
    cy.createUser({}).then((email) => {
      cy.visit(`/app/home/users/view/all?query=${email}`);
      cy.get('button[data-testid="btn-actions-table"]').click();
      cy.contains('Desactivar');
      cy.get('button[data-testid="btn-toggle-status-user"]').click();
      cy.contains('El estado del usuario ha sido actualizado con éxito.');
      cy.logoutUser();
      cy.attemptInvalidLogin(email, '123456');
      cy.contains('El usuario se encuentra desactivado');
    });
  });

  //TODO: Crear usuario con permisos
  //TODO: Ingresar usuario con permisos y verificar que esten visibles y disponibles
  //TODO: Cambiar contraseña
  //TODO: Probar paginado
  //TODO: Probar refetch data
  //TODO: Probar elminiación por lotes
  //TODO: Probar selección
  //TODO: Probar orden de datos en las tablas
  //TODO: Probar ingreso al modulo mediante comando de teclado
  //TODO: Probar mensaje de alerta al salir sin guardar cambios
  //TODO: Probar mensajes de error con formulario vacio
});

describe('Encuentra registros de acuerdo a la cadena de busqueda', () => {
  const userData = {
    firstName: 'usertosearch',
    lastName: 'lasttosearch',
    email: '',
  };

  beforeEach(() => {
    userData.email = `testuser${Math.floor(
      Math.random() * 10000
    )}@fakeemail.com`;
    cy.loginUser();
    cy.createUser(userData);
  });

  it('Busqueda por nombre(s) del usuario', () => {
    cy.typeOnInputBasicSearchBar(userData.firstName);
    cy.clickOnSubmitBasicSearchBar();
    cy.get('tbody tr')
      .filter(`:contains(${userData.firstName})`)
      .should('have.length.greaterThan', 1);
  });
  it('Busqueda por apellido(s) del usuario', () => {
    cy.typeOnInputBasicSearchBar(userData.lastName);
    cy.clickOnSubmitBasicSearchBar();
    cy.get('tbody tr')
      .filter(`:contains(${userData.lastName})`)
      .should('have.length.greaterThan', 1);
  });
  it('Busqueda por correo del usuario', () => {
    cy.typeOnInputBasicSearchBar(userData.email.split('@')[0]);
    cy.clickOnSubmitBasicSearchBar();
    cy.get('tbody tr')
      .filter(`:contains(${userData.email})`)
      .should('have.length', 1);
  });
});

describe('Creación de usuarios', () => {
  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('users');
  });

  it('Debe crear un usuario sin permisos ', () => {
    cy.wait(3000);
    cy.clickOnCreateButton();
    cy.getFormInput('first_name').type('UserName');
    cy.getFormInput('last_name').type('LastName');
    const randomNum = Math.floor(10 + Math.random() * 90);
    const randomLetter = String.fromCharCode(
      97 + Math.floor(Math.random() * 26)
    ); // letra aleatoria a-z
    const defaultEmail = `emailtest${randomNum}${randomLetter}@gmail.com`;
    cy.getFormInput('email').type(defaultEmail);
    cy.getFormInput('cell_phone_number').type('3123456547');
    cy.getFormInput('passwords.password1').type('123456');
    cy.getFormInput('passwords.password2').type('123456');

    cy.clickOnSubmitButton();
    cy.checkDisabledSubmitButton();
    cy.contains('Usuario creado');
  });

  it('Debe crear un usuario con todos los permisos ', () => {
    cy.wait(3000);
    cy.clickOnCreateButton();
    cy.getFormInput('first_name').type('UserName');
    cy.getFormInput('last_name').type('LastName');
    const randomNum = Math.floor(10 + Math.random() * 90);
    const randomLetter = String.fromCharCode(
      97 + Math.floor(Math.random() * 26)
    ); // letra aleatoria a-z
    const defaultEmail = `emailtest${randomNum}${randomLetter}@gmail.com`;
    cy.getFormInput('email').type(defaultEmail);
    cy.getFormInput('cell_phone_number').type('3123456547');
    cy.getFormInput('passwords.password1').type('123456');
    cy.getFormInput('passwords.password2').type('123456');
    cy.clickGlobalActionsSwitch();
    cy.checkGlobalActionsSwitchState(true); // Verifica que está activo

    // Verificar que todos los switches de módulos estén activos
    cy.checkModuleSwitchState('clients');
    cy.checkModuleSwitchState('crops');
    cy.checkModuleSwitchState('employees');
    cy.checkModuleSwitchState('harvests');
    cy.checkModuleSwitchState('payments');
    cy.checkModuleSwitchState('sales');
    cy.checkModuleSwitchState('suppliers');
    cy.checkModuleSwitchState('supplies');
    cy.checkModuleSwitchState('consumptions');
    cy.checkModuleSwitchState('shopping');
    cy.checkModuleSwitchState('users');
    cy.checkModuleSwitchState('works');
    cy.checkModuleSwitchState('dashboard');
    cy.wait(1500);

    cy.clickOnSubmitButton();
    cy.checkDisabledSubmitButton();
    cy.contains('Usuario creado');

    // let userId = undefined;

    // cy.intercept('POST', 'http://localhost:3000/users/create').as('createUser');
    // cy.wait('@createUser').then((interception) => {
    //   // Puedes hacer assertions sobre la respuesta si lo deseas
    //   expect(interception.response?.statusCode).to.eq(201);
    //   // Interceptar y verificar el body de la respuesta
    //   expect(interception.response?.body).to.have.property('id');
    //   userId = interception.response?.body.id;
    //   cy.visit(`/app/home/users/view/one/${userId}`);

    //   // expect(interception.response?.body.user).to.have.property('email');
    //   // expect(interception.response?.body.user.email).to.eq(defaultEmail);
    //   // También puedes inspeccionar el body de la respuesta:
    //   // cy.log(JSON.stringify(interception.response.body));
    // });
    // cy.wait(2000)
  });
});

describe.only('Modificación de usuarios', () => {
  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('users');
  });

  it('Modificar usuario existente', () => {
    cy.createUser({}).then((email) => {
      cy.visit(`/app/home/users/view/all?query=${email}`);
      cy.get('button[data-testid="btn-actions-table"]').click();
      cy.get('a[data-testid="link-update-record"]').click();
      cy.getFormInput('first_name').clear().type('UserNameChanged');
      cy.getFormInput('last_name').clear().type('LastNameChanged');
      const randomNum = Math.floor(10 + Math.random() * 90);
      cy.getFormInput('email').clear().type(`emailtest${randomNum}@gmail.com`);
      cy.getFormInput('cell_phone_number').clear().type('3123451111');
      cy.checkGlobalActionsSwitchState(false); // Verifica que está activo
      cy.clickGlobalActionsSwitch();
      cy.clickOnSubmitButton();
      cy.checkDisabledSubmitButton();
      cy.contains('Usuario actualizado');
    });
  });
});
