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
    cy.checkLoadingInformation();
  });

  it('Se puede seleccionar todos los elementos al dar clic sobre el checkbox del encabezado', () => {
    cy.checkClearSelectionButtonState(false);
    cy.checkDeleteBulkButtonState(false);

    cy.toggleSelectAllTableRows();

    cy.checkSelectedTableRowsGreaterThanZero();
    cy.checkClearSelectionButtonState(true);
    cy.checkDeleteBulkButtonState(true);

    cy.toggleSelectAllTableRows();
    cy.checkClearSelectionButtonState(false);
    cy.checkDeleteBulkButtonState(false);
    cy.checkSelectedTableRowsIsZero();
  });

  it('Ingresar al modulo usando el command', () => {
    cy.visit('/app/home/page');
    cy.wait(3000);
    cy.get('body').type('{ctrl}j');
    cy.get('input[data-testid="input-command-search"]').type('empleados');
    cy.get('div[data-testid="command-item-employees"]').click();
    cy.checkCurrentUrl('employees/view/all');
  });
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
    cy.clickOnIgnoreButton();
    cy.url().then((currentUrl) => {
      expect(currentUrl).to.not.include('/app/home/employees/create');
    });
  });

  it('No debe permitir al usuario salir del formulario cuando hay campos rellenados, cerrando el sonner (salir usando sidebar)', () => {
    cy.getFormInput('first_name').type('EmployeeName');
    cy.navigateToModuleWithSideBar('employees');
    cy.checkMessageLostFormData();
    cy.clickOnCloseToast();
    cy.url().should('include', '/app/home/employees/create');
  });
});

describe('Modificación de empleados', () => {
  let currentEmployee: any = {};

  before(() => {
    cy.executeClearSeedData({ employees: true });
    cy.createEmployee({}, { fastCreation: true }).then((data) => {
      currentEmployee = { ...data };
    });
  });

  beforeEach(() => {
    cy.loginUser();
    cy.visit(`/app/home/employees/update/one/${currentEmployee.id}`);
    cy.wait(3000);
  });

  it('Modificar empleado existente', () => {
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

  it('Debe advertir al usuario antes de salir del formulario si hay campos rellenados (salir usando sidebar)', () => {
    cy.getFormInput('first_name').type('UserName');
    cy.navigateToModuleWithSideBar('employees');
    cy.checkMessageLostFormData();
  });

  it('Debe permitir al usuario salir del formulario incluso si hay campos rellenados, presionando "Ignorar" (salir usando sidebar)', () => {
    cy.getFormInput('first_name').type('UserName');
    cy.navigateToModuleWithSideBar('employees');
    cy.checkMessageLostFormData();
    cy.clickOnIgnoreButton();
    cy.url().then((currentUrl) => {
      expect(currentUrl).to.not.include('/app/home/employees/update');
    });
  });

  it('No debe permitir al usuario salir del formulario cuando hay campos rellenados, cerrando el sonner (salir usando sidebar)', () => {
    cy.getFormInput('first_name').type('UserName');
    cy.navigateToModuleWithSideBar('employees');
    cy.checkMessageLostFormData();
    cy.clickOnCloseToast();
    cy.url().should('include', '/app/home/employees/update');
  });
});

describe.only('Eliminación de empleado', () => {
  let currentEmployee: any = {};

  before(() => {
    cy.executeClearSeedData({ employees: true });
    cy.createEmployee({}, { fastCreation: true }).then((data) => {
      currentEmployee = { ...data };
    });
  });

  beforeEach(() => {
    cy.loginUser();
  });

  it('Eliminar cosecha', () => {
    cy.navigateToModuleWithSideBar('employees');
    cy.clickActionsButtonTableRow(currentEmployee.id);
    cy.clickOnDeleteRecord();
    cy.clickOnContinueDeleteOneRecord();
    cy.contains('Empleado eliminado');
  });

  it.only('Intentar eliminar empleado con cosechas pendiente de pago', () => {
    cy.executeClearSeedData({ employees: true });

    cy.createHarvest({ fastCreation: true, returnOnlyHarvest: false }).then(
      (data) => {
        cy.navigateToModuleWithSideBar('employees');
        cy.log(JSON.stringify(data, null, 2));
        const { employees } = data;

        // Primer empleado
        cy.clickActionsButtonTableRow(employees[0].id);
        cy.clickOnDeleteRecord();
        cy.clickOnContinueDeleteOneRecord();
        cy.contains(
          'No se pudo eliminar el empleado seleccionado, revisa si tiene cosechas o trabajos pendientes de pago'
        );
        // Segundo empleado
        cy.clickActionsButtonTableRow(employees[1].id);
        cy.clickOnDeleteRecord();
        cy.clickOnContinueDeleteOneRecord();
        cy.contains(
          'No se pudo eliminar el empleado seleccionado, revisa si tiene cosechas o trabajos pendientes de pago'
        );
        // Tercer empleado
        cy.clickActionsButtonTableRow(employees[2].id);
        cy.clickOnDeleteRecord();
        cy.clickOnContinueDeleteOneRecord();
        cy.contains(
          'No se pudo eliminar el empleado seleccionado, revisa si tiene cosechas o trabajos pendientes de pago'
        );
      }
    );
  });

  // TODO: Implementar pruebas
  // it('Intentar eliminar empleado con trabajo pendiente de pago', () => {});
});

describe('Eliminación de empleados por lote', () => {
  before(() => {
    cy.executeClearSeedData({ employees: true });
    for (let index = 0; index < 5; index++) {
      cy.createEmployee({}, { fastCreation: true });
    }
  });

  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('employees');
  });

  it('Eliminar cosechas seleccionadas', () => {
    cy.wait(3000);
    cy.toggleSelectAllTableRows();
    cy.clickOnDeleteBulkButton();
    cy.clickOnContinueDeleteBulkRecord();
    cy.checkLoadingInformation();
    cy.contains('Los registros seleccionados fueron eliminados');
    cy.checkNoRecordsMessage();
  });

  // TODO: Implementar pruebas
  // it('Intentar eliminar empleados con cosechas pendiente de pago', () => {});
  // it('Intentar eliminar empleados con trabajo pendiente de pago', () => {});
});

describe('Copiar Id de registro', () => {
  it('Copiar Id del empleado', () => {
    cy.executeClearSeedData({ employees: true });
    cy.createEmployee({}, { fastCreation: true }).then((currentEmployee) => {
      cy.loginUser();
      cy.navigateToModuleWithSideBar('employees');
      cy.wait(500);
      cy.clickActionsButtonTableRow(currentEmployee.id);
      cy.clickOnCopyIdButton();
    });
  });
});

describe('Ver registro de empleado', () => {
  it('Ver registro de cosecha', () => {
    cy.executeClearSeedData({ employees: true });
    cy.createEmployee({}, { fastCreation: true }).then((currentEmployee) => {
      cy.loginUser();
      cy.navigateToModuleWithSideBar('employees');
      cy.wait(500);
      cy.clickActionsButtonTableRow(currentEmployee.id);
      cy.clickOnViewRecord();
      cy.contains('Información');
      cy.contains('Volver');
    });
  });
});

describe('Certificar empleado', () => {
  before(() => {
    cy.executeClearSeedData({ employees: true });
  });

  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('employees');
  });

  it('Generar certificado de empleado', () => {
    cy.createEmployeeAnd(({ id }) => {
      cy.clickRefetchButton();
      cy.clickActionsButtonTableRow(id);
      cy.contains('Certificar');
      cy.get('button[data-testid="btn-certificate-employee"]').click();

      cy.wait(1500);
      cy.getFormInput('company_name').type('Empresa de Prueba S.A.S');
      cy.getFormInput('generator_name').type('Julian Perez');
      cy.getFormInput('generator_position').type('Gerente de recursos humanos');

      cy.openCalendar();

      cy.selectCalendarMonth(4);
      cy.selectCalendarYear(2024);
      cy.selectCalendarDay(20);

      cy.wait(1000);

      cy.getFormInput('employee_position').type('Manipulador de fruta');
      cy.getFormInput('id_number').type('110508765');
      cy.getFormInput('weekly_working_hours').type('45');

      cy.get('button[data-testid="btn-generate-certificate"]').click();
      cy.contains('La constancia ha sido generada con éxito.');
      const expectedFileName = `constancia-empleado-${id}.pdf`;
      const downloadsFolder =
        Cypress.config('downloadsFolder') || 'cypress/downloads';

      cy.readFile(`${downloadsFolder}/${expectedFileName}`, {
        timeout: 10000,
      }).should('exist');
    });
  });
});

describe('Paginado y selectores', () => {
  before(() => {
    cy.executeClearSeedData({ employees: true });
    cy.executeSeed({ employees: 25 });
  });

  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('employees');
    cy.wait(2000);
  });

  it('Navegar entre paginas disponibles (10 registro por página - default)', () => {
    cy.checkPaginationValues();
    cy.clickOnGoNextPageButton();
    cy.checkTablePageInfoContains('Página 2 de 3');
    cy.clickOnGoPreviousPageButton();
    cy.checkTablePageInfoContains('Página 1 de 3');
  });

  it('Navegar entre paginas disponibles (20 registro por página)', () => {
    cy.changeTablePageSize(20);
    cy.wait(2000);
    cy.checkPaginationValues();
    cy.clickOnGoNextPageButton();
    cy.wait(2000);
    cy.checkTablePageInfoContains('Página 2 de 2');
    cy.clickOnGoPreviousPageButton();
    cy.wait(2000);
    cy.checkTablePageInfoContains('Página 1 de 2');
  });
});

describe('Auth modulo de empleados', () => {
  let currentEmployee: any = {};

  before(() => {
    cy.executeClearSeedData({ employees: true });
    cy.createEmployee({}, { fastCreation: true }).then((data) => {
      currentEmployee = { ...data };
    });
  });

  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('employees');
  });

  it('Crear usuario con acceso unicamente al modulo de empleados', () => {
    cy.createUser({ selectedModules: ['employees'] }).then((userData) => {
      cy.logoutUser();
      cy.wait(2000);
      cy.log(userData);
      cy.loginUser(userData.email, userData.password);
      cy.wait(1500);
      cy.get('ul[data-sidebar="menu"]').within(() => {
        cy.get('li[data-sidebar="menu-item"]')
          .should('have.length', 1)
          .contains('Empleados');
      });
      cy.get('body').type('{ctrl}j');
      cy.get('div[cmdk-item][role="option"]').should('have.length', 1);

      cy.get('div[cmdk-item][role="option"]').click();

      cy.wait(2000);

      // Comprobar que haya registro en las tablas
      cy.get('table tbody tr').should('exist');

      // Comprobar habitiación de botones
      // Recarga de datos
      cy.checkRefetchButtonState(true);
      cy.checkCreateButtonState(false);

      // Crear registro

      cy.toggleSelectAllTableRows();
      cy.wait(700);

      // Eliminar bulk
      cy.checkDeleteBulkButtonState(true);

      cy.clickActionsButtonTableRow(currentEmployee.id);

      cy.checkActionButtonsState({ update: true, view: true, delete: true });

      // Certificar
      cy.get('button[data-testid="btn-certificate-employee"]').should(
        'be.enabled'
      );
    });
  });

  it('Crear usuario con acceso unicamente a ver tabla de empleados', () => {
    cy.createUser({ selectedActions: ['find_all_employees'] }).then(
      (userData) => {
        cy.logoutUser();
        cy.wait(2000);
        cy.log(userData);
        cy.loginUser(userData.email, userData.password);
        cy.wait(1500);
        cy.get('ul[data-sidebar="menu"]').within(() => {
          cy.get('li[data-sidebar="menu-item"]')
            .should('have.length', 1)
            .contains('Empleados');
        });
        cy.get('body').type('{ctrl}j');
        cy.get('div[cmdk-item][role="option"]').should('have.length', 1);

        cy.get('div[cmdk-item][role="option"]').click();

        cy.wait(2000);

        // Comprobar que haya registro en las tablas
        cy.get('table tbody tr').should('exist');

        // Comprobar habitiación de botones
        // Recarga de datos

        cy.checkRefetchButtonState(true);

        // Crear registro
        cy.checkCreateButtonState(true);

        cy.toggleSelectAllTableRows();
        cy.wait(700);

        cy.clickActionsButtonTableRow(currentEmployee.id);

        // Certificar
        cy.get('button[data-testid="btn-certificate-employee"]').should(
          'be.disabled'
        );

        cy.checkActionButtonsState({
          update: false,
          view: false,
          delete: false,
        });
      }
    );
  });

  it('No tiene permisos para ver el listado de empleados', () => {
    cy.createUserAnd({ selectedActions: ['create_employee'] }, (userData) => {
      cy.logoutUser();
      cy.wait(2000);
      cy.log(userData);
      cy.loginUser(userData.email, userData.password);
      cy.wait(1500);
      cy.get('ul[data-sidebar="menu"]').within(() => {
        cy.get('li[data-sidebar="menu-item"]')
          .should('have.length', 1)
          .contains('Empleados');
      });
      cy.get('body').type('{ctrl}j');
      cy.get('div[cmdk-item][role="option"]').should('have.length', 1);
      cy.get('div[cmdk-item][role="option"]').click();

      cy.wait(2000);
      cy.contains('No tienes permiso para ver el listado de empleados');
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

  it('Debe sacar al usuario si intenta crear un empleado y no tiene permisos ', () => {
    cy.createUser({ selectedActions: ['find_all_employees'] }).then(
      (data: any) => {
        cy.logoutUser();
        cy.wait(2000);
        cy.loginUser(data.email, data.password);
        cy.wait(1500);
        cy.get('ul[data-sidebar="menu"]').within(() => {
          cy.get('li[data-sidebar="menu-item"]')
            .should('have.length', 1)
            .contains('Empleados');
        });
        cy.get('body').type('{ctrl}j');
        cy.get('div[cmdk-item][role="option"]').should('have.length', 1);
        cy.get('div[cmdk-item][role="option"]').click();

        cy.wait(2000);

        cy.visit('/app/home/employees/create/one');
        cy.contains('No tienes permiso para esta acción, seras redirigido');
      }
    );
  });

  it('Debe sacar al usuario si intenta modificar a un empleado y no tiene permisos', () => {
    cy.createUser({ selectedActions: ['find_all_employees'] }).then(
      (userData: any) => {
        cy.logoutUser();
        cy.wait(2000);
        cy.loginUser(userData.email, userData.password);
        cy.wait(1500);
        cy.get('ul[data-sidebar="menu"]').within(() => {
          cy.get('li[data-sidebar="menu-item"]')
            .should('have.length', 1)
            .contains('Empleados');
        });
        cy.get('body').type('{ctrl}j');
        cy.get('div[cmdk-item][role="option"]').should('have.length', 1);
        cy.get('div[cmdk-item][role="option"]').click();

        cy.visit(`/app/home/employees/update/one/${currentEmployee.id}`);
        cy.contains('No tienes permiso para esta acción, seras redirigido');
      }
    );
  });

  it('Debe sacar al usuario si intenta consultar a un empleado y no tiene permisos', () => {
    cy.createUser({ selectedActions: ['find_all_employees'] }).then(
      (data: any) => {
        cy.log(JSON.stringify(data, null, 2));
        cy.logoutUser();
        cy.wait(2000);
        cy.loginUser(data.email, data.password);
        cy.wait(1500);
        cy.get('ul[data-sidebar="menu"]').within(() => {
          cy.get('li[data-sidebar="menu-item"]')
            .should('have.length', 1)
            .contains('Empleados');
        });
        cy.get('body').type('{ctrl}j');
        cy.get('div[cmdk-item][role="option"]').should('have.length', 1);
        cy.get('div[cmdk-item][role="option"]').click();

        cy.visit(`/app/home/employees/view/one/${currentEmployee.id}`);
        cy.contains('No tienes permiso para esta acción, seras redirigido');
      }
    );
  });
});
