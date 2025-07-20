import { InformationGenerator } from '../helpers/InformationGenerator';

describe('Modulo de empleados', () => {
  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('employees');
  });

  it('Debe ingresar a la ruta correcta ', () => {
    cy.contains('Usuarios');
    cy.checkCurrentUrl('employees/view/all');
  });

  it('Debe contener los elementos necesarios', () => {
    cy.existBasicSearchBar();

    cy.existRefetchButton();
    cy.existCreateButton();

    cy.existPaginationInfo();

    cy.contains('Nombre:');
    cy.contains('Apellido:');
    cy.contains('Correo electrónico:');
    cy.contains('Número celular:');
    cy.contains('Dirección:');

    cy.existPaginationButtons();
  });

  it('Debe mostrar el loading cuando se intenta forzar la recarga de datos', () => {
    cy.clickRefetchButton();
    cy.checkRefetchButtonState(false);
    cy.contains('Cargando información');
  });

  it('Se puede seleccionar todos los elementos al dar clic sobre el checkbox del encabezado', () => {
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

  it('Debe deseleccionar todos los elementos al dar clic nuevamente en el checkbox del encabezado', () => {
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

  it('Ingresar al modulo usando el command', () => {
    cy.visit('/app/home/page');
    cy.wait(3000);
    cy.get('body').type('{ctrl}j');
    cy.get('input[data-testid="input-command-search"]').type('empleados');
    cy.get('div[data-testid="command-item-employees"]').click();
    cy.checkCurrentUrl('employees/view/all');
  });

  //TODO: Ingresar usuario con permisos y verificar que esten visibles y disponibles
  //TODO: Probar selección
  //TODO: Probar orden de datos en las tablas
});

describe('Encuentra registros de acuerdo a la cadena de busqueda', () => {
  const employeeData = {
    firstName: 'employeetosearch',
    lastName: 'lasttosearch',
    email: '',
  };

  beforeEach(() => {
    employeeData.email = InformationGenerator.generateEmail();
    cy.loginUser();
    cy.createEmployee(employeeData);
  });

  it('Busqueda por nombre(s) del empleado', () => {
    cy.typeOnInputBasicSearchBar(employeeData.firstName);
    cy.clickOnSubmitBasicSearchBar();
    cy.get('tbody tr')
      .filter(`:contains(${employeeData.firstName})`)
      .should('have.length.greaterThan', 0);
    cy.contains(employeeData.firstName);
    cy.contains(employeeData.lastName);
    cy.contains(employeeData.email);
  });
  it('Busqueda por apellido(s) del empleado', () => {
    cy.typeOnInputBasicSearchBar(employeeData.lastName);
    cy.clickOnSubmitBasicSearchBar();
    cy.get('tbody tr')
      .filter(`:contains(${employeeData.lastName})`)
      .should('have.length.greaterThan', 0);
    cy.contains(employeeData.firstName);
    cy.contains(employeeData.lastName);
    cy.contains(employeeData.email);
  });
  it('Busqueda por correo del empleado', () => {
    cy.typeOnInputBasicSearchBar(employeeData.email.split('@')[0]);
    cy.clickOnSubmitBasicSearchBar();
    cy.get('tbody tr')
      .filter(`:contains(${employeeData.email})`)
      .should('have.length', 1);
    cy.contains(employeeData.firstName);
    cy.contains(employeeData.lastName);
    cy.contains(employeeData.email);
  });
});

describe('Creación de empleados', () => {
  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('employees');
    cy.wait(700);
    cy.clickOnCreateButton();
  });

  it('Debe crear un empleado', () => {
    cy.getFormInput('first_name').type('EmployeeName');
    cy.getFormInput('last_name').type('LastName');
    const defaultEmail = InformationGenerator.generateEmail();
    cy.getFormInput('email').type(defaultEmail);
    cy.getFormInput('cell_phone_number').type(
      InformationGenerator.generateCellPhoneNumber()
    );
    cy.getFormTextArea('address').type(InformationGenerator.generateAddress());

    cy.clickOnSubmitButton();
    cy.checkDisabledSubmitButton();
    cy.contains('Empleado creado');
  });

  it('Debe mostrar mensajes de error al intentar enviar el formulario vacio', () => {
    cy.clickOnSubmitButton();
    cy.contains('El nombre debe tener al menos 2 caracteres');
    cy.contains('El apellido debe tener al menos 2 caracteres');
    cy.contains('El correo electrónico es incorrecto');
    cy.contains('El número de celular es requerido');
    cy.contains('La dirección debe tener mínimo 15 caracteres');
    cy.checkMessageFieldsMissing();
  });

  it('Debe advertir al usuario antes de salir del formulario si hay campos rellenados (salir usando sidebar)', () => {
    cy.getFormInput('first_name').type('EmployeeName');
    cy.navigateToModuleWithSideBar('employees');
    cy.checkMessageLostFormData();
  });

  it('Debe permitir al usuario salir del formulario incluso si hay campos rellenados, presionando "Ignorar" (salir usando sidebar)', () => {
    cy.getFormInput('first_name').type('EmployeeName');
    cy.navigateToModuleWithSideBar('employees');
    cy.checkMessageLostFormData();
    cy.contains('button', 'Ignorar').click();
    cy.url().then((currentUrl) => {
      expect(currentUrl).to.not.include('/app/home/employees/create');
    });
  });

  it('No debe permitir al usuario salir del formulario cuando hay campos rellenados, cerrando el sonner (salir usando sidebar)', () => {
    cy.getFormInput('first_name').type('EmployeeName');
    cy.navigateToModuleWithSideBar('employees');
    cy.checkMessageLostFormData();
    cy.get('button[aria-label="Close toast"]').click();
    cy.url().should('include', '/app/home/employees/create');
  });
});

describe('Modificación de empleados', () => {
  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('employees');
  });

  it('Modificar empleado existente', () => {
    cy.createEmployeeAnd({}, ({ email, id }) => {
      cy.visit(`/app/home/employees/view/all?query=${email}`);
      cy.clickActionsButtonTableRow(id);
      cy.get('button[data-testid="btn-update-record"]').click();
      cy.getFormInput('first_name').clear().type('EmployeeNameChanged');
      cy.getFormInput('last_name').clear().type('LastNameChanged');
      const defaultEmail = InformationGenerator.generateEmail();
      cy.getFormInput('email').clear().type(defaultEmail);
      cy.getFormInput('cell_phone_number').clear().type('3123451111');
      cy.getFormTextArea('address')
        .clear()
        .type(InformationGenerator.generateAddress());
      cy.clickOnSubmitButton();
      cy.checkDisabledSubmitButton();
      cy.contains('Empleado actualizado');
    });
  });

  it('Debe advertir al usuario antes de salir del formulario si hay campos rellenados (salir usando sidebar)', () => {
    cy.createEmployeeAnd({}, ({ email, id }) => {
      cy.visit(`/app/home/employees/view/all?query=${email}`);
      cy.clickActionsButtonTableRow(id);
      cy.get('button[data-testid="btn-update-record"]').click();
      cy.getFormInput('first_name').type('UserName');
      cy.navigateToModuleWithSideBar('employees');
      cy.checkMessageLostFormData();
    });
  });

  it('Debe permitir al usuario salir del formulario incluso si hay campos rellenados, presionando "Ignorar" (salir usando sidebar)', () => {
    cy.createEmployeeAnd({}, ({ email, id }) => {
      cy.visit(`/app/home/employees/view/all?query=${email}`);
      cy.clickActionsButtonTableRow(id);
      cy.get('button[data-testid="btn-update-record"]').click();
      cy.getFormInput('first_name').type('UserName');
      cy.navigateToModuleWithSideBar('employees');
      cy.checkMessageLostFormData();
      cy.contains('button', 'Ignorar').click();
      cy.url().then((currentUrl) => {
        expect(currentUrl).to.not.include('/app/home/employees/update');
      });
    });
  });

  it('No debe permitir al usuario salir del formulario cuando hay campos rellenados, cerrando el sonner (salir usando sidebar)', () => {
    cy.createEmployeeAnd({}, ({ email, id }) => {
      cy.visit(`/app/home/employees/view/all?query=${email}`);
      cy.clickActionsButtonTableRow(id);
      cy.get('button[data-testid="btn-update-record"]').click();
      cy.getFormInput('first_name').type('UserName');
      cy.navigateToModuleWithSideBar('employees');
      cy.checkMessageLostFormData();
      cy.get('button[aria-label="Close toast"]').click();
      cy.url().should('include', '/app/home/employees/update');
    });
  });
});

describe('Eliminación de usuario', () => {
  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('employees');
  });

  it('Eliminar empleado', () => {
    cy.createEmployeeAnd({}, ({ email, id }) => {
      cy.openActionsMenuByField(
        email,
        `/app/home/employees/view/all?query=${email}`
      );
      cy.get('button[data-testid="btn-delete-one-record"]').click();
      cy.get('button[data-testid="btn-continue-delete-one-record"]').click();

      cy.contains('Empleado eliminado');
      cy.contains('No hay registros');
    });
  });

  // TODO: Implementar pruebas
  // it('Intentar eliminar empleado con cosechas pendiente de pago', () => {});
  // it('Intentar eliminar empleado con trabajo pendiente de pago', () => {});
});

describe('Eliminación de empleados por lote', () => {
  before(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('employees');
    for (let index = 0; index < 2; index++) {
      cy.createEmployee(
        { firstName: 'EmployeeToRemoveBulk' },
        { fastCreation: true }
      );
    }
    cy.logoutUser();
  });

  it('Eliminar empleados seleccionados', () => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('employees');
    cy.visit(`/app/home/employees/view/all?query=EmployeeToRemoveBulk`);
    cy.wait(2000);
    cy.get('button[aria-label="Select all"]').click({ timeout: 3000 });
    cy.get('button[data-testid="btn-delete-bulk"]').click();
    cy.get('button[data-testid="btn-continue-delete"]').click();
    cy.contains('Cargando información');
    cy.contains('Los registros seleccionados fueron eliminados');
    cy.contains('No hay registros');
  });

  // it('Intentar eliminar usuario con rol administrator en lote', () => {
  //   cy.loginUser();
  //   cy.navigateToModuleWithSideBar('employees');
  //   cy.visit(`/app/home/employees/view/all?query=Mantenimiento`);
  //   cy.wait(2000);
  //   cy.get('button[aria-label="Select all"]').click();
  //   cy.get('button[data-testid="btn-delete-bulk"]').click();
  //   cy.get('button[data-testid="btn-continue-delete"]').click();
  //   cy.contains(
  //     'No se pudieron eliminar los empleados seleccionados, revisa que no tengan rol "Administrador"'
  //   );
  // });
});

describe('Copiar Id de registro', () => {
  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('employees');
  });

  it('Copiar Id del usuario', () => {
    cy.createEmployeeAnd({}, ({ email, id }) => {
      cy.openActionsMenuByField(
        email,
        `/app/home/employees/view/all?query=${email}`
      );
      cy.get('button[data-testid="btn-copy-id"]').click();

      cy.contains('Id copiado al portapapeles');
    });
  });
});

describe('Ver registro de empleado', () => {
  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('employees');
  });

  it('Ver registro de empleado', () => {
    cy.createEmployeeAnd({}, ({ email, id }) => {
      cy.openActionsMenuByField(
        email,
        `/app/home/employees/view/all?query=${email}`
      );
      cy.get('button[data-testid="btn-view-record"]').click();
      cy.contains('Información');
      cy.getFormInput('first_name').should('have.value', 'EmployeeName');
      cy.getFormInput('last_name').should('have.value', 'LastName');
      cy.getFormInput('email').should('have.value', email);
      cy.getFormInput('cell_phone_number').should('have.value', '3123456547');
      cy.getFormTextArea('address').should('have.length.at.most', 14);
      cy.contains('Volver');
    });
  });
});

describe('Certificar empleado', () => {
  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('employees');
  });

  it.only('Generar certificado de empleado', () => {
    // cy.createEmployeeAnd({}, ({ email, id }) => {

    // });

    const email = 'stivenchilito@mail.com';
    const id = '0044d935-a236-40de-847a-ea09f02c7ab7';
    cy.visit(`/app/home/employees/view/all?query=${email}`);
    cy.clickActionsButtonTableRow(id);
    cy.contains('Certificar');
    cy.get('button[data-testid="btn-certificate-employee"]').click();

    cy.wait(1500);
    cy.getFormInput('company_name').type('Empresa de Prueba S.A.S');
    cy.getFormInput('generator_name').type('Julian Perez');
    cy.getFormInput('generator_position').type('Gerente de recursos humanos');

    cy.get('button[data-testid="btn-calendar-selector"]').click();

    cy.get('button[data-testid="btn-month-calendar-selector"]').click();
    cy.get('div[role="option"][data-testid="item-month-4"]').click();
    cy.get('button[data-testid="btn-year-calendar-selector"]').click();
    cy.get('div[role="option"][data-testid="item-year-2023"]').click();

    cy.get('button[name="day"]').contains('19').click();

    cy.wait(1000);

    cy.getFormInput('employee_position').type('Manipulador de fruta');
    cy.getFormInput('id_number').type('110508765');
    cy.getFormInput('weekly_working_hours').type('45');

    // cy.get('button[data-testid="btn-generate-certificate"]').click();
    // cy.contains('La constancia ha sido generada con éxito.');
    // const expectedFileName = `constancia-empleado-${id}.pdf`;
    // const downloadsFolder =
    //   Cypress.config('downloadsFolder') || 'cypress/downloads';

    // cy.readFile(`${downloadsFolder}/${expectedFileName}`, {
    //   timeout: 10000,
    // }).should('exist');
  });

  // it('Se actualizara el estado y se cerrara la sesión del usuario que intente desactivarse', () => {
  //   cy.createUserAnd(
  //     { selectedModules: ['users'] },
  //     ({ email, id, password }) => {
  //       cy.logoutUser();
  //       cy.loginUser(email, password);
  //       cy.visit(`/app/home/users/view/all?query=${email}`);
  //       cy.clickActionsButtonTableRow(id);
  //       cy.contains('Desactivar');
  //       cy.get('button[data-testid="btn-toggle-status-user"]').click();
  //       cy.contains('Se cerrara la sesión');
  //       cy.contains(
  //         'Esta por desactivar su usuario, si desea continuar por favor presione "Desactivar"'
  //       );
  //       cy.get('button[data-button]').contains('Desactivar');
  //       cy.get('button[data-button]').click();
  //       cy.contains('El estado del usuario ha sido actualizado con éxito.');
  //       cy.contains('Tu sesión ha terminado, seras redirigido al login');
  //       cy.wait(2000);
  //       cy.shouldNotBeAuthenticated();
  //       cy.attemptInvalidLogin(email, password);
  //       cy.contains('El usuario se encuentra desactivado');
  //       cy.shouldNotBeAuthenticated();
  //     }
  //   );
  // });
});
