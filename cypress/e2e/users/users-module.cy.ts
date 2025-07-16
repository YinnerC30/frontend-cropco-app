import { InformationGenerator } from '../helpers/InformationGenerator';

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

  it('Debe mostrar el loading cuando se intenta forzar la recarga de datos', () => {
    cy.clickRefetchButton();
    cy.checkRefetchButtonState(false);
    cy.contains('Cargando información');
  });

  it.only('Se puede seleccionar todos los elementos al dar clic sobre el checkbox del encabezado', () => {
    cy.wait(2000);
    cy.get('button[data-testid="btn-clear-selection-table"]').should(
      'not.be.visible'
    );
    cy.get('button[data-testid="btn-delete-bulk"]').should('not.be.visible');
    cy.get('button[aria-label="Select all"]').click();
    cy.get('span[data-testid="data-table-row-selection-number"]')
      .invoke('text')
      .then((text) => {
        const value = Number(text.trim());
        expect(value).to.be.greaterThan(0);
      });
    cy.get('button[data-testid="btn-clear-selection-table"]').should(
      'be.visible'
    );
    cy.get('button[data-testid="btn-delete-bulk"]').should('be.visible');
  });

  it.only('Debe deseleccionar todos los elementos al dar clic nuevamente en el checkbox del encabezado', () => {
    cy.wait(2000);
    cy.get('button[aria-label="Select all"]').click(); // Selecciona todos
    cy.get('span[data-testid="data-table-row-selection-number"]')
      .invoke('text')
      .then((text) => {
        const value = Number(text.trim());
        expect(value).to.be.greaterThan(0);
      });
    cy.get('button[aria-label="Select all"]').click(); // Deselecciona todos
    cy.get('button[data-testid="btn-clear-selection-table"]').should(
      'not.be.visible'
    );
    cy.get('button[data-testid="btn-delete-bulk"]').should('not.be.visible');
    cy.get('span[data-testid="data-table-row-selection-number"]')
      .invoke('text')
      .then((text) => {
        const value = Number(text.trim());
        expect(value).to.equal(0);
      });
  });

  //TODO: Ingresar usuario con permisos y verificar que esten visibles y disponibles
  //TODO: Cambiar contraseña
  //TODO: Probar paginado
  //TODO: Probar elminiación por lotes
  //TODO: Probar selección
  //TODO: Probar orden de datos en las tablas
  //TODO: Probar ingreso al modulo mediante comando de teclado
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
      .should('have.length.greaterThan', 0);
  });
  it('Busqueda por apellido(s) del usuario', () => {
    cy.typeOnInputBasicSearchBar(userData.lastName);
    cy.clickOnSubmitBasicSearchBar();
    cy.get('tbody tr')
      .filter(`:contains(${userData.lastName})`)
      .should('have.length.greaterThan', 0);
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
    cy.wait(700);
    cy.clickOnCreateButton();
  });

  it('Debe crear un usuario sin permisos ', () => {
    cy.getFormInput('first_name').type('UserName');
    cy.getFormInput('last_name').type('LastName');

    const defaultEmail = InformationGenerator.generateEmail();
    cy.getFormInput('email').type(defaultEmail);
    cy.getFormInput('cell_phone_number').type('3123456547');
    cy.getFormInput('passwords.password1').type('123456');
    cy.getFormInput('passwords.password2').type('123456');

    cy.clickOnSubmitButton();
    cy.checkDisabledSubmitButton();
    cy.contains('Usuario creado');
  });

  it('Debe crear un usuario con todos los permisos ', () => {
    cy.getFormInput('first_name').type('UserName');
    cy.getFormInput('last_name').type('LastName');
    const defaultEmail = InformationGenerator.generateEmail();
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
    cy.wait(700);

    cy.clickOnSubmitButton();
    cy.checkDisabledSubmitButton();
    cy.contains('Usuario creado');
  });

  it('Debe mostrar mensajes de error al intentar enviar el formulario vacio', () => {
    cy.clickOnSubmitButton();
    cy.contains('El nombre debe tener al menos 2 caracteres');
    cy.contains('El apellido debe tener al menos 2 caracteres');
    cy.contains('El correo electrónico es incorrecto');
    cy.contains('El número de celular es requerido');
    cy.contains('La contraseña debe tener mínimo 6 caracteres');
    cy.checkMessageFieldsMissing();
  });

  it('Debe mostrar error si las contraseñas no coinciden', () => {
    cy.getFormInput('first_name').type('UserName');
    cy.getFormInput('last_name').type('LastName');
    cy.getFormInput('email').type('testuser@example.com');
    cy.getFormInput('cell_phone_number').type('3123456789');
    cy.getFormInput('passwords.password1').type('Password123');
    cy.getFormInput('passwords.password2').type('Password456');
    cy.clickOnSubmitButton();
    cy.contains('Las contraseñas no coinciden');
  });

  it('Debe advertir al usuario antes de salir del formulario si hay campos rellenados (salir usando sidebar)', () => {
    cy.getFormInput('first_name').type('UserName');
    cy.navigateToModuleWithSideBar('users');
    cy.checkMessageLostFormData();
  });

  it('Debe permitir al usuario salir del formulario incluso si hay campos rellenados, presionando "Ignorar" (salir usando sidebar)', () => {
    cy.getFormInput('first_name').type('UserName');
    cy.navigateToModuleWithSideBar('users');
    cy.checkMessageLostFormData();
    cy.contains('button', 'Ignorar').click();
    cy.url().then((currentUrl) => {
      expect(currentUrl).to.not.include('/app/home/users/create');
    });
  });

  it('No debe permitir al usuario salir del formulario cuando hay campos rellenados, cerrando el sonner (salir usando sidebar)', () => {
    cy.getFormInput('first_name').type('UserName');
    cy.navigateToModuleWithSideBar('users');
    cy.checkMessageLostFormData();
    cy.get('button[aria-label="Close toast"]').click();
    cy.url().should('include', '/app/home/users/create');
  });
});

describe('Modificación de usuarios', () => {
  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('users');
  });

  it('Modificar usuario existente', () => {
    cy.createUser({}).then(({ email, id }) => {
      cy.visit(`/app/home/users/view/all?query=${email}`);
      cy.clickActionsButtonTableRow(id);
      cy.get('a[data-testid="link-update-record"]').click();
      cy.getFormInput('first_name').clear().type('UserNameChanged');
      cy.getFormInput('last_name').clear().type('LastNameChanged');
      const defaultEmail = InformationGenerator.generateEmail();
      cy.getFormInput('email').clear().type(defaultEmail);
      cy.getFormInput('cell_phone_number').clear().type('3123451111');
      cy.checkGlobalActionsSwitchState(false); // Verifica que está activo
      cy.clickGlobalActionsSwitch();
      cy.clickOnSubmitButton();
      cy.checkDisabledSubmitButton();
      cy.contains('Usuario actualizado');
    });
  });

  it('Debe advertir al usuario antes de salir del formulario si hay campos rellenados (salir usando sidebar)', () => {
    cy.createUser({}).then(({ email, id }) => {
      cy.visit(`/app/home/users/view/all?query=${email}`);
      cy.clickActionsButtonTableRow(id);
      cy.get('a[data-testid="link-update-record"]').click();
      cy.getFormInput('first_name').type('UserName');
      cy.navigateToModuleWithSideBar('users');
      cy.checkMessageLostFormData();
    });
  });

  it('Debe permitir al usuario salir del formulario incluso si hay campos rellenados, presionando "Ignorar" (salir usando sidebar)', () => {
    cy.createUser({}).then(({ email, id }) => {
      cy.visit(`/app/home/users/view/all?query=${email}`);
      cy.clickActionsButtonTableRow(id);
      cy.get('a[data-testid="link-update-record"]').click();
      cy.getFormInput('first_name').type('UserName');
      cy.navigateToModuleWithSideBar('users');
      cy.checkMessageLostFormData();
      cy.contains('button', 'Ignorar').click();
      cy.url().then((currentUrl) => {
        expect(currentUrl).to.not.include('/app/home/users/update');
      });
    });
  });

  it('No debe permitir al usuario salir del formulario cuando hay campos rellenados, cerrando el sonner (salir usando sidebar)', () => {
    cy.createUser({}).then(({ email, id }) => {
      cy.visit(`/app/home/users/view/all?query=${email}`);
      cy.clickActionsButtonTableRow(id);
      cy.get('a[data-testid="link-update-record"]').click();
      cy.getFormInput('first_name').type('UserName');
      cy.navigateToModuleWithSideBar('users');
      cy.checkMessageLostFormData();
      cy.get('button[aria-label="Close toast"]').click();
      cy.url().should('include', '/app/home/users/update');
    });
  });
});

describe('Eliminación de usuario', () => {
  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('users');
  });

  it('Eliminar usuario', () => {
    cy.createUser({}).then(({ email, id }) => {
      cy.visit(`/app/home/users/view/all?query=${email}`);
      cy.clickActionsButtonTableRow(id);
      cy.get('button[data-testid="btn-delete-one-record"]').click();
      cy.get('button[data-testid="btn-continue-delete-one-record"]').click();

      cy.contains('Usuario eliminado');
      cy.contains('No hay registros');
    });
  });
});

describe('Copiar Id de registro', () => {
  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('users');
  });

  it('Copiar Id del usuario', () => {
    cy.createUser({}).then(({ email, id }) => {
      cy.visit(`/app/home/users/view/all?query=${email}`);
      cy.clickActionsButtonTableRow(id);
      cy.get('button[data-testid="btn-copy-id"]').click();

      cy.contains('Id copiado al portapapeles');
    });
  });
});

describe('Ver registro de usuario', () => {
  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('users');
  });

  it('Ver registro de usuario', () => {
    cy.createUser({}).then(({ email, id }) => {
      cy.visit(`/app/home/users/view/all?query=${email}`);
      cy.clickActionsButtonTableRow(id);
      cy.get('a[data-testid="link-view-record"]').click();
      cy.contains('Información');
      cy.getFormInput('first_name').should('have.value', 'UserName');
      cy.getFormInput('last_name').should('have.value', 'LastName');
      cy.getFormInput('email').should('have.value', email);
      cy.getFormInput('cell_phone_number').should('have.value', '3123456547');
      cy.contains('Volver');
    });
  });
});

describe('Cambiar estado de usuario', () => {
  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('users');
  });

  it('Cambiar estado de usuario', () => {
    cy.createUser({}).then(({ email, id }) => {
      cy.visit(`/app/home/users/view/all?query=${email}`);
      cy.clickActionsButtonTableRow(id);
      cy.contains('Desactivar');
      cy.get('button[data-testid="btn-toggle-status-user"]').click();
      cy.get('button[data-testid="btn-toggle-status-user"]').should(
        'be.disabled'
      );
      cy.contains('El estado del usuario ha sido actualizado con éxito.');
      cy.clickActionsButtonTableRow(id);
      cy.contains('Activar');
      cy.get('button[data-testid="btn-toggle-status-user"]').click();
      cy.get('button[data-testid="btn-toggle-status-user"]').should(
        'be.disabled'
      );
      cy.contains('El estado del usuario ha sido actualizado con éxito.');
    });
  });
});

describe('Reset password user', () => {
  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('users');
  });
  it('Restablecer contraseña de usuario', () => {
    cy.createUser({}).then(({ email, id }) => {
      cy.visit(`/app/home/users/view/all?query=${email}`);
      cy.get(`button[data-testid="btn-actions-table-row-id-${id}"]`).click();
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
});

describe('Auth modulo de usuarios', () => {
  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('users');
  });

  it('Intentar ingresar al sistema con un usuario desactivado', () => {
    cy.createUser({}).then(({ id, email }) => {
      cy.visit(`/app/home/users/view/all?query=${email}`);
      cy.get(`button[data-testid="btn-actions-table-row-id-${id}"]`).click();
      cy.contains('Desactivar');
      cy.get('button[data-testid="btn-toggle-status-user"]').click();
      cy.contains('El estado del usuario ha sido actualizado con éxito.');
      cy.logoutUser();
      cy.attemptInvalidLogin(email, '123456');
      cy.contains('El usuario se encuentra desactivado');
    });
  });
});

describe('Paginado y selectores', () => {
  before(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('users');
    cy.wait(2000);
    cy.get('span[data-testid="data-table-row-total"]')
      .invoke('text')
      .then((text) => {
        const total = parseInt(text, 10);
        if (total <= 15) {
          for (let index = 0; index < 15; index++) {
            cy.createUserFast();
          }
        }
      });
  });
  it('Navegar entre paginas disponibles (10 registro por página - default)', () => {
    cy.wait(2000);
    cy.checkPaginationValues();
    cy.get('button[data-testid="btn-go-next-page"]').click();
    cy.get('p[data-testid="data-table-page-info-number"]').contains(
      'Página 2 de'
    );
    cy.get('button[data-testid="btn-go-previous-page"]').click();
    cy.get('p[data-testid="data-table-page-info-number"]').contains(
      'Página 1 de'
    );
  });

  it('Navegar entre paginas disponibles (20 registro por página)', () => {
    cy.wait(2000);
    cy.get('button[data-testid="btn-page-size-selector"]').click();
    cy.get(`div[data-testid="select-item-page-size-${20}"]`).click();
    cy.wait(2000);
    cy.checkPaginationValues();
    cy.get('button[data-testid="btn-go-next-page"]').click();
    cy.wait(2000);
    cy.get('p[data-testid="data-table-page-info-number"]').contains(
      'Página 2 de'
    );
    cy.get('button[data-testid="btn-go-previous-page"]').click();
    cy.wait(2000);
    cy.get('p[data-testid="data-table-page-info-number"]').contains(
      'Página 1 de'
    );
    // cy.contains('20');
    // cy.checkPaginationValues();
    // cy.get('button[data-testid="btn-go-next-page"]').click();
    // cy.get('p[data-testid="data-table-page-info-number"]').contains(
    //   'Página 2 de'
    // );
    // cy.get('button[data-testid="btn-go-previous-page"]').click();
    // cy.get('p[data-testid="data-table-page-info-number"]').contains(
    //   'Página 1 de'
    // );
  });
});
