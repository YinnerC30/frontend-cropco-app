import { InformationGenerator } from '../../helpers/InformationGenerator';

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
    cy.checkLoadingInformation();
  });

  it('Se puede seleccionar todos los elementos al dar clic sobre el checkbox del encabezado', () => {
    cy.wait(2000);
    cy.checkClearSelectionButtonState(false);
    cy.checkDeleteBulkButtonState(false);
    cy.toggleSelectAllTableRows();
    cy.checkSelectedTableRowsGreaterThanZero();
    cy.checkClearSelectionButtonState(true);
    cy.checkDeleteBulkButtonState(true);
  });

  it('Debe deseleccionar todos los elementos al dar clic nuevamente en el checkbox del encabezado', () => {
    cy.wait(2000);
    cy.toggleSelectAllTableRows(); // Selecciona todos
    cy.checkSelectedTableRowsGreaterThanZero();
    cy.toggleSelectAllTableRows(); // Deselecciona todos
    cy.checkClearSelectionButtonState(false);
    cy.checkDeleteBulkButtonState(false);
    cy.checkSelectedTableRowsIsZero();
  });

  it('Ingresar al modulo usando el command', () => {
    cy.visit('/app/home/page');
    cy.wait(3000);
    cy.openCommandPaletteAndSelect('usuarios', 'users');
    cy.checkCurrentUrl('users/view/all');
  });

  //TODO: Ingresar usuario con permisos y verificar que esten visibles y disponibles
  //TODO: Probar selección
  //TODO: Probar orden de datos en las tablas
});

describe('Encuentra registros de acuerdo a la cadena de busqueda', () => {
  const userData = {
    firstName: 'usertosearch',
    lastName: 'lasttosearch',
    email: '',
  };

  beforeEach(() => {
    userData.email = InformationGenerator.generateEmail();
    cy.loginUser();
    cy.createUser(userData);
  });

  it('Busqueda por nombre(s) del usuario', () => {
    cy.typeOnInputBasicSearchBar(userData.firstName);
    cy.clickOnSubmitBasicSearchBar();
    cy.get('tbody tr')
      .filter(`:contains(${userData.firstName})`)
      .should('have.length.greaterThan', 0);
    cy.contains(userData.firstName);
    cy.contains(userData.lastName);
    cy.contains(userData.email);
  });
  it('Busqueda por apellido(s) del usuario', () => {
    cy.typeOnInputBasicSearchBar(userData.lastName);
    cy.clickOnSubmitBasicSearchBar();
    cy.get('tbody tr')
      .filter(`:contains(${userData.lastName})`)
      .should('have.length.greaterThan', 0);
    cy.contains(userData.firstName);
    cy.contains(userData.lastName);
    cy.contains(userData.email);
  });
  it('Busqueda por correo del usuario', () => {
    cy.typeOnInputBasicSearchBar(userData.email.split('@')[0]);
    cy.clickOnSubmitBasicSearchBar();
    cy.get('tbody tr')
      .filter(`:contains(${userData.email})`)
      .should('have.length', 1);
    cy.contains(userData.firstName);
    cy.contains(userData.lastName);
    cy.contains(userData.email);
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
    cy.clickOnIgnoreButton();
    cy.url().then((currentUrl) => {
      expect(currentUrl).to.not.include('/app/home/users/create');
    });
  });

  it('No debe permitir al usuario salir del formulario cuando hay campos rellenados, cerrando el sonner (salir usando sidebar)', () => {
    cy.getFormInput('first_name').type('UserName');
    cy.navigateToModuleWithSideBar('users');
    cy.checkMessageLostFormData();
    cy.clickOnCloseToast();
    cy.checkCurrentUrl('/app/home/users/create');
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
      cy.clickOnUpdateRecord();
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
      cy.clickOnUpdateRecord();
      cy.getFormInput('first_name').type('UserName');
      cy.navigateToModuleWithSideBar('users');
      cy.checkMessageLostFormData();
    });
  });

  it('Debe permitir al usuario salir del formulario incluso si hay campos rellenados, presionando "Ignorar" (salir usando sidebar)', () => {
    cy.createUser({}).then(({ email, id }) => {
      cy.visit(`/app/home/users/view/all?query=${email}`);
      cy.clickActionsButtonTableRow(id);
      cy.clickOnUpdateRecord();
      cy.getFormInput('first_name').type('UserName');
      cy.navigateToModuleWithSideBar('users');
      cy.checkMessageLostFormData();
      cy.clickOnIgnoreButton();
      cy.url().then((currentUrl) => {
        expect(currentUrl).to.not.include('/app/home/users/update');
      });
    });
  });

  it('No debe permitir al usuario salir del formulario cuando hay campos rellenados, cerrando el sonner (salir usando sidebar)', () => {
    cy.createUser({}).then(({ email, id }) => {
      cy.visit(`/app/home/users/view/all?query=${email}`);
      cy.clickActionsButtonTableRow(id);
      cy.clickOnUpdateRecord();
      cy.getFormInput('first_name').type('UserName');
      cy.navigateToModuleWithSideBar('users');
      cy.checkMessageLostFormData();
      cy.clickOnCloseToast();
      cy.checkCurrentUrl('/app/home/users/update');
    });
  });

  it('Al modificar los permisos del usuario activo en la sesión se actualizan sus permisos al instante', () => {
    cy.createUserAnd({ selectedModules: ['users', 'clients'] }, (data) => {
      cy.logoutUser();
      cy.loginUser(data.email, data.password);
      cy.get('ul[data-sidebar="menu"]').within(() => {
        cy.get('li[data-sidebar="menu-item"]').should('have.length', 2);
        cy.get('button[data-testid="btn-module-users"]').should('exist');
        cy.get('button[data-testid="btn-module-clients"]').should('exist');
      });
      cy.visit(`/app/home/users/update/one/${data.id}`);
      cy.wait(2000);
      cy.clickModuleActionsSwitch('clients');
      cy.clickOnSubmitButton();
      cy.contains('Tu información y permisos han sido actualizados');
      cy.get('ul[data-sidebar="menu"]').within(() => {
        cy.get('li[data-sidebar="menu-item"]')
          .should('have.length', 1)
          .contains('Usuarios');
      });
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
      cy.clickOnDeleteRecord();
      cy.clickOnContinueDeleteOneRecord();

      cy.contains('Usuario eliminado');
      cy.checkNoRecordsMessage();
    });
  });

  it('Intentar eliminar usuario con rol administrator', () => {
    cy.visit(`/app/home/users/view/all?query=Mantenimiento`);
    cy.wait(2000);
    cy.get('tbody tr').first().dblclick();
    cy.url().then((url) => {
      const partes = url.split('/');
      const ultimoElemento = partes[partes.length - 1].split('?')[0];
      cy.visit(`/app/home/users/view/all?query=Mantenimiento`);
      cy.clickActionsButtonTableRow(ultimoElemento);
      cy.checkActionButtonsState({ delete: false });
    });
  });
});

describe('Eliminación de usuarios por lote', () => {
  before(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('users');
    for (let index = 0; index < 2; index++) {
      cy.createUserFast({ firstName: 'UserToRemoveBulk' });
    }
    cy.logoutUser();
  });

  it('Eliminar usuarios seleccionados', () => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('users');
    cy.visit(`/app/home/users/view/all?query=UserToRemoveBulk`);
    cy.wait(2000);
    cy.toggleSelectAllTableRows();
    cy.clickOnDeleteBulkButton();
    cy.clickOnContinueDeleteBulkRecord();
    cy.checkLoadingInformation();
    cy.contains('Los registros seleccionados fueron eliminados');
    cy.checkNoRecordsMessage();
  });

  it('Intentar eliminar usuario con rol administrator en lote', () => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('users');
    cy.visit(`/app/home/users/view/all?query=Mantenimiento`);
    cy.wait(2000);
    cy.toggleSelectAllTableRows();
    cy.clickOnDeleteBulkButton();
    cy.clickOnContinueDeleteBulkRecord();
    cy.contains(
      'No se pudieron eliminar los usuarios seleccionados, revisa que no tengan rol "Administrador"'
    );
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
      cy.clickOnCopyIdButton();
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
      cy.clickOnViewRecord();
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
      cy.clickOnToggleStatusUserButton();
      // cy.checkToggleStatusUserButtonState(false);
      cy.contains('El estado del usuario ha sido actualizado con éxito.');
      cy.clickActionsButtonTableRow(id);
      cy.contains('Activar');
      cy.clickOnToggleStatusUserButton();
      // cy.checkToggleStatusUserButtonState(true);
      cy.contains('El estado del usuario ha sido actualizado con éxito.');
    });
  });

  it('Se actualizara el estado y se cerrara la sesión del usuario que intente desactivarse', () => {
    cy.createUserAnd(
      { selectedModules: ['users'] },
      ({ email, id, password }) => {
        cy.logoutUser();
        cy.loginUser(email, password);
        cy.visit(`/app/home/users/view/all?query=${email}`);
        cy.clickActionsButtonTableRow(id);
        cy.contains('Desactivar');
        cy.clickOnToggleStatusUserButton();
        cy.contains('Se cerrara la sesión');
        cy.contains(
          'Esta por desactivar su usuario, si desea continuar por favor presione "Desactivar"'
        );
        cy.get('button[data-button]').contains('Desactivar');
        cy.get('button[data-button]').click();
        cy.contains('El estado del usuario ha sido actualizado con éxito.');
        cy.contains('Tu sesión ha terminado, seras redirigido al login');
        cy.wait(2000);
        cy.shouldNotBeAuthenticated();
        cy.attemptInvalidLogin(email, password);
        cy.contains('El usuario se encuentra desactivado');
        cy.shouldNotBeAuthenticated();
      }
    );
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
      cy.clickActionsButtonTableRow(id);
      cy.clickOnResetPasswordUserButton();
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
      cy.clickActionsButtonTableRow(id);
      cy.contains('Desactivar');
      cy.clickOnToggleStatusUserButton();
      cy.contains('El estado del usuario ha sido actualizado con éxito.');
      cy.logoutUser();
      cy.attemptInvalidLogin(email, '123456');
      cy.contains('El usuario se encuentra desactivado');
    });
  });

  it('Intentar ingresar al sistema con un usuario sin permisos', () => {
    cy.createUserAnd({}, ({ email, password }) => {
      cy.logoutUser();
      cy.loginUser(email, password);
      cy.get('ul[data-sidebar="menu"]').within(() => {
        cy.get('li[data-sidebar="menu-item"]').should('have.length', 0);
      });
    });
  });

  it('Crear usuario con acceso unicamente al modulo de usuarios', () => {
    cy.createUser({ selectedModules: ['users'] }).then((data: any) => {
      cy.log(JSON.stringify(data, null, 2));
      cy.logoutUser();
      cy.wait(2000);
      cy.loginUser(data.email, data.password);
      cy.wait(1500);
      cy.get('ul[data-sidebar="menu"]').within(() => {
        cy.get('li[data-sidebar="menu-item"]')
          .should('have.length', 1)
          .contains('Usuarios');
      });
      cy.get('body').type('{ctrl}j');
      cy.get('div[cmdk-item][role="option"]').should('have.length', 1);
      cy.get('div[cmdk-item][role="option"]').click();

      cy.visit(`/app/home/users/view/all?query=${data.email}`);
      cy.wait(2000);

      // Comprobar que haya registro en las tablas
      cy.get('table tbody tr').should('exist');

      // Comprobar habitiación de botones
      // Recarga de datos
      cy.checkRefetchButtonState(true);

      // Crear registro
      cy.checkCreateButtonState(false);

      cy.toggleSelectAllTableRows();
      cy.wait(700);
      // Eliminar bulk
      cy.checkDeleteBulkButtonState(true);

      cy.clickActionsButtonTableRow(data.id);

      // Modificar
      cy.checkActionButtonsState({ update: true });

      // Ver
      cy.checkActionButtonsState({ view: true });
      // Eliminar
      cy.checkActionButtonsState({ delete: true });

      // Contraseña
      cy.checkResetPasswordUserButtonState(false);

      // Estado user
      cy.checkToggleStatusUserButtonState(false);
    });
  });

  it('Crear usuario con acceso unicamente a ver tabla de usuarios', () => {
    cy.createUser({ selectedActions: ['find_all_users'] }).then((data: any) => {
      cy.log(JSON.stringify(data, null, 2));
      cy.logoutUser();
      cy.wait(2000);
      cy.loginUser(data.email, data.password);
      cy.wait(1500);
      cy.get('ul[data-sidebar="menu"]').within(() => {
        cy.get('li[data-sidebar="menu-item"]')
          .should('have.length', 1)
          .contains('Usuarios');
      });
      cy.get('body').type('{ctrl}j');
      cy.get('div[cmdk-item][role="option"]').should('have.length', 1);
      cy.get('div[cmdk-item][role="option"]').click();

      cy.visit(`/app/home/users/view/all?query=${data.email}`);
      cy.wait(2000);

      cy.get('button[data-testid="btn-user-account"]').click();
      cy.get('div[data-testid="btn-open-form-change-password"]').should(
        'have.attr',
        'aria-disabled',
        'true'
      );
      cy.get('body').type('{esc}');

      // Comprobar que haya registro en las tablas
      cy.get('table tbody tr').should('exist');

      // Comprobar habitiación de botones
      // Recarga de datos
      cy.checkRefetchButtonState(true);

      // Crear registro
      cy.checkCreateButtonState(true);

      cy.toggleSelectAllTableRows(); // Deselecciona todos
      cy.wait(700);
      // Eliminar bulk
      // cy.checkDeleteBulkButtonState(false);

      cy.clickActionsButtonTableRow(data.id);

      // Modificar
      cy.checkActionButtonsState({ update: false });

      // Ver
      cy.checkActionButtonsState({ view: false });
      // Eliminar
      cy.checkActionButtonsState({ delete: false });

      // Contraseña
      cy.checkResetPasswordUserButtonState(true);

      // Estado user
      cy.checkToggleStatusUserButtonState(true);
    });
  });

  it('No tiene permisos para ver el listado de usuarios', () => {
    cy.createUserAnd({ selectedActions: ['create_user'] }, (data) => {
      cy.logoutUser();
      cy.wait(2000);
      cy.loginUser(data.email, data.password);
      cy.wait(1500);
      cy.get('ul[data-sidebar="menu"]').within(() => {
        cy.get('li[data-sidebar="menu-item"]')
          .should('have.length', 1)
          .contains('Usuarios');
      });
      cy.get('body').type('{ctrl}j');
      cy.get('div[cmdk-item][role="option"]').should('have.length', 1);
      cy.get('div[cmdk-item][role="option"]').click();

      cy.visit(`/app/home/users/view/all`);
      cy.wait(2000);
      cy.contains('No tienes permiso para ver el listado de usuarios');
      cy.checkRefetchButtonState(false);
      cy.get('input[placeholder="Escribe algo..."]').should('be.disabled');
      cy.get('button[data-testid="btn-submit-basic-searchbar"]').should(
        'be.disabled'
      );
      cy.get('button[data-testid="btn-clear-basic-searchbar"]').should(
        'be.disabled'
      );
    });
  });

  it('Debe sacar al usuario si intenta crear un usuario y no tiene permisos ', () => {
    cy.createUser({ selectedActions: ['find_all_users'] }).then((data: any) => {
      cy.log(JSON.stringify(data, null, 2));
      cy.logoutUser();
      cy.wait(2000);
      cy.loginUser(data.email, data.password);
      cy.wait(1500);
      cy.get('ul[data-sidebar="menu"]').within(() => {
        cy.get('li[data-sidebar="menu-item"]')
          .should('have.length', 1)
          .contains('Usuarios');
      });
      cy.get('body').type('{ctrl}j');
      cy.get('div[cmdk-item][role="option"]').should('have.length', 1);
      cy.get('div[cmdk-item][role="option"]').click();

      cy.visit(`/app/home/users/view/all?query=${data.email}`);
      cy.wait(2000);

      cy.visit('/app/home/users/create/one');
      cy.shouldBeRedirectedForNoPermission();
    });
  });

  it('Debe sacar al usuario si intenta modificar a un usuario y no tiene permisos', () => {
    cy.createUser({ selectedActions: ['find_all_users'] }).then((data: any) => {
      cy.log(JSON.stringify(data, null, 2));
      cy.logoutUser();
      cy.wait(2000);
      cy.loginUser(data.email, data.password);
      cy.wait(1500);
      cy.get('ul[data-sidebar="menu"]').within(() => {
        cy.get('li[data-sidebar="menu-item"]')
          .should('have.length', 1)
          .contains('Usuarios');
      });
      cy.get('body').type('{ctrl}j');
      cy.get('div[cmdk-item][role="option"]').should('have.length', 1);
      cy.get('div[cmdk-item][role="option"]').click();

      cy.visit(`/app/home/users/view/all?query=${data.email}`);
      cy.wait(2000);

      cy.visit(`/app/home/users/update/one/${data.id}`);
      cy.shouldBeRedirectedForNoPermission();
    });
  });

  it('Debe sacar al usuario si intenta consultar a un usuario y no tiene permisos', () => {
    cy.createUser({ selectedActions: ['find_all_users'] }).then((data: any) => {
      cy.log(JSON.stringify(data, null, 2));
      cy.logoutUser();
      cy.wait(2000);
      cy.loginUser(data.email, data.password);
      cy.wait(1500);
      cy.get('ul[data-sidebar="menu"]').within(() => {
        cy.get('li[data-sidebar="menu-item"]')
          .should('have.length', 1)
          .contains('Usuarios');
      });
      cy.get('body').type('{ctrl}j');
      cy.get('div[cmdk-item][role="option"]').should('have.length', 1);
      cy.get('div[cmdk-item][role="option"]').click();

      cy.visit(`/app/home/users/view/all?query=${data.email}`);
      cy.wait(2000);

      cy.visit(`/app/home/users/view/one/${data.id}`);
      cy.shouldBeRedirectedForNoPermission();
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
        if (total <= 11) {
          for (let index = 0; index < 11; index++) {
            cy.createUserFast({});
          }
        }
        cy.logoutUser();
      });
  });
  it('Navegar entre paginas disponibles (10 registro por página - default)', () => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('users');
    cy.wait(2000);
    cy.checkPaginationValues();
    cy.clickOnGoNextPageButton();
    cy.checkTablePageInfoContains('Página 2 de');
    cy.clickOnGoPreviousPageButton();
    cy.checkTablePageInfoContains('Página 1 de');
  });

  it('Navegar entre paginas disponibles (20 registro por página)', () => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('users');
    cy.wait(2000);
    cy.changeTablePageSize(20);
    cy.wait(2000);
    cy.checkPaginationValues();
    cy.clickOnGoNextPageButton();
    cy.wait(2000);
    cy.checkTablePageInfoContains('Página 2 de');
    cy.clickOnGoPreviousPageButton();
    cy.wait(2000);
    cy.checkTablePageInfoContains('Página 1 de');
  });
});

describe('Cambio de contraseña', () => {
  beforeEach(() => {
    cy.loginUser();
    cy.createUser({ withAllActions: true }).then(({ email, password }) => {
      cy.logoutUser();
      cy.loginUser(email, password);
    });
  });
  it('El usuario puede cambiar su contraseña', () => {
    cy.get('button[data-testid="btn-user-account"]').click();
    cy.get('div[data-testid="btn-open-form-change-password"]').click();
    cy.wait(1000);
    cy.getFormInput('old_password').type('123456');
    cy.getFormInput('new_password').type('1234567');
    cy.get('button[data-testid="btn-form-submit-change-password"]').click();
    cy.contains('Contraseña cambiada');
  });

  it('El usuario no puede cambiar su contraseña al enviar la antigua contraseña incorrecta', () => {
    cy.get('button[data-testid="btn-user-account"]').click();
    cy.get('div[data-testid="btn-open-form-change-password"]').click();
    cy.wait(1000);
    cy.getFormInput('old_password').type('123456y');
    cy.getFormInput('new_password').type('1234567');
    cy.get('button[data-testid="btn-form-submit-change-password"]').click();
    cy.contains('La contraseña antigua es incorrecta');
  });
});
