import { BASE_HOME_PAGE_URL, TEST_UUID_VALID } from 'cypress/helpers/constants';
import { InformationGenerator } from '../../helpers/InformationGenerator';
import { employeeRoutes } from './employee-routes';

describe('Comprobar existencia de elementos en el modulo de empleados', () => {
  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('employees');
  });

  it('Debe ingresar a la ruta correcta ', () => {
    cy.contains('Usuarios');
    cy.checkCurrentUrl(employeeRoutes.listAll());
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
    cy.visit(BASE_HOME_PAGE_URL);
    cy.wait(3000);
    cy.openCommandPaletteAndSelect('empleados', 'employees');
    cy.checkCurrentUrl(employeeRoutes.listAll());
  });
});

describe('Encuentra registros de acuerdo a la cadena de busqueda', () => {
  before(() => {
    cy.executeClearSeedData({ employees: true });
    for (let i = 0; i < 5; i++) {
      cy.createEmployee({}, { fastCreation: true });
    }
  });

  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('employees');
  });

  it('Busqueda por nombre(s) del empleado', () => {
    cy.createEmployee({}, { fastCreation: true }).then((data) => {
      const { id, first_name, last_name, email, address, cell_phone_number } =
        data;
      cy.typeOnInputBasicSearchBar(first_name);
      cy.clickOnSubmitBasicSearchBar();
      cy.checkTableRowValues(id, [
        first_name,
        last_name,
        email,
        address,
        cell_phone_number,
      ]);
    });
  });

  it('Busqueda por apellido(s) del empleado', () => {
    cy.createEmployee({}, { fastCreation: true }).then((data) => {
      const { id, first_name, last_name, email, address, cell_phone_number } =
        data;
      cy.typeOnInputBasicSearchBar(last_name);
      cy.clickOnSubmitBasicSearchBar();
      cy.checkTableRowValues(id, [
        first_name,
        last_name,
        email,
        address,
        cell_phone_number,
      ]);
    });
  });
  it('Busqueda por correo del empleado', () => {
    cy.createEmployee({}, { fastCreation: true }).then((data) => {
      const { id, first_name, last_name, email, address, cell_phone_number } =
        data;
      cy.typeOnInputBasicSearchBar(email);
      cy.clickOnSubmitBasicSearchBar();
      cy.checkTableRowValues(id, [
        first_name,
        last_name,
        email,
        address,
        cell_phone_number,
      ]);
    });
  });
  it('Busqueda por id del empleado', () => {
    cy.createEmployee({}, { fastCreation: true }).then((data) => {
      const { id, first_name, last_name, email, address, cell_phone_number } =
        data;
      cy.typeOnInputBasicSearchBar(id);
      cy.clickOnSubmitBasicSearchBar();
      cy.checkTableRowValues(id, [
        first_name,
        last_name,
        email,
        address,
        cell_phone_number,
      ]);
    });
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

  it('Debe mostrar mensajes de error al intentar enviar el formulario vacío', () => {
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
      expect(currentUrl).to.not.include(employeeRoutes.create());
    });
  });

  it('No debe permitir al usuario salir del formulario cuando hay campos rellenados, cerrando el sonner (salir usando sidebar)', () => {
    cy.getFormInput('first_name').type('EmployeeName');
    cy.navigateToModuleWithSideBar('employees');
    cy.checkMessageLostFormData();
    cy.clickOnCloseToast();
    cy.url().should('include', employeeRoutes.create());
  });

  it('Debe volver a la tabla de los empleados al cancelar la creación de un empleado', () => {
    cy.clickOnCancelRegisterButton();
    cy.url().should('include', employeeRoutes.listAll());
  });

  it('Debe volver a la tabla de los empleados al cancelar la creación de un empleado (con campos rellenados)', () => {
    cy.getFormInput('first_name').type('EmployeeName');
    cy.getFormInput('last_name').type('LastName');
    const defaultEmail = InformationGenerator.generateEmail();
    cy.getFormInput('email').type(defaultEmail);
    cy.getFormInput('cell_phone_number').type(
      InformationGenerator.generateCellPhoneNumber()
    );
    cy.getFormTextArea('address').type(InformationGenerator.generateAddress());
    cy.clickOnCancelRegisterButton();
    cy.checkMessageLostFormData();
    cy.clickOnIgnoreButton();
    cy.url().should('include', employeeRoutes.listAll());
  });

  it('Comprobar navegación del breadcrumb', () => {
    cy.get('a[data-testid="breadcrumb-link-item-empleados"]').click();
    cy.url().should('include', employeeRoutes.listAll());
  });

  it('Comprobar navegación del breadcrumb (con campos rellenados)', () => {
    cy.getFormInput('first_name').type('EmployeeName');
    cy.get('a[data-testid="breadcrumb-link-item-empleados"]').click();
    cy.checkMessageLostFormData();
    cy.clickOnIgnoreButton();
    cy.url().should('include', employeeRoutes.listAll());
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
    cy.visit(employeeRoutes.update(currentEmployee.id));
    cy.wait(3000);
  });

  it('Comprobar que se cargue la información del empleado antes de modificarlo', () => {
    cy.getFormInput('first_name').should(
      'have.value',
      currentEmployee.first_name
    );
    cy.getFormInput('last_name').should(
      'have.value',
      currentEmployee.last_name
    );
    cy.getFormInput('email').should('have.value', currentEmployee.email);
    cy.getFormInput('cell_phone_number').should(
      'have.value',
      currentEmployee.cell_phone_number
    );
    cy.getFormTextArea('address').should('have.value', currentEmployee.address);
  });

  it('Modificar empleado existente', () => {
    cy.navigateToModuleWithSideBar('employees');
    cy.clickRefetchButton();
    cy.clickActionsButtonTableRow(currentEmployee.id);
    cy.clickOnUpdateRecord();
    cy.wait(3000);
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
      expect(currentUrl).to.not.include(
        employeeRoutes.update(currentEmployee.id)
      );
    });
  });

  it('No debe permitir al usuario salir del formulario cuando hay campos rellenados, cerrando el sonner (salir usando sidebar)', () => {
    cy.getFormInput('first_name').type('UserName');
    cy.navigateToModuleWithSideBar('employees');
    cy.checkMessageLostFormData();
    cy.clickOnCloseToast();
    cy.url().should('include', employeeRoutes.update(currentEmployee.id));
  });

  it('Debe volver a la tabla de los empleados al cancelar la modificación de un empleado', () => {
    cy.clickOnCancelRegisterButton();
    cy.url().should('include', employeeRoutes.listAll());
  });

  it('Debe volver a la tabla de los empleados al cancelar la modificación de un empleado (con campos rellenados)', () => {
    cy.getFormInput('first_name').type('EmployeeName');
    cy.getFormInput('last_name').type('LastName');
    const defaultEmail = InformationGenerator.generateEmail();
    cy.getFormInput('email').type(defaultEmail);
    cy.getFormInput('cell_phone_number').type(
      InformationGenerator.generateCellPhoneNumber()
    );
    cy.getFormTextArea('address').type(InformationGenerator.generateAddress());
    cy.clickOnCancelRegisterButton();
    cy.checkMessageLostFormData();
    cy.clickOnIgnoreButton();
    cy.url().should('include', employeeRoutes.listAll());
  });

  it('Comprobar navegación del breadcrumb', () => {
    cy.get('a[data-testid="breadcrumb-link-item-empleados"]').click();
    cy.url().should('include', employeeRoutes.listAll());
  });

  it('Comprobar navegación del breadcrumb (con campos rellenados)', () => {
    cy.getFormInput('first_name').type('EmployeeName');
    cy.get('a[data-testid="breadcrumb-link-item-empleados"]').click();
    cy.checkMessageLostFormData();
    cy.clickOnIgnoreButton();
    cy.url().should('include', employeeRoutes.listAll());
  });
});

describe('Eliminación de empleado', () => {
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

  it('Intentar eliminar empleado con cosechas pendiente de pago', () => {
    cy.executeClearSeedData({ employees: true });

    cy.createHarvest({ fastCreation: true, returnOnlyHarvest: false }).then(
      (data) => {
        cy.navigateToModuleWithSideBar('employees');
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

  it('Intentar eliminar empleado con trabajos pendiente de pago', () => {
    cy.executeClearSeedData({ employees: true });

    cy.createWork({ fastCreation: true, returnOnlyWork: false }).then(
      (data) => {
        cy.navigateToModuleWithSideBar('employees');
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
});

describe('Eliminación de empleados por lote', () => {
  beforeEach(() => {
    cy.executeClearSeedData({ employees: true });
    cy.loginUser();
    cy.navigateToModuleWithSideBar('employees');
    cy.clickRefetchButton();
  });

  it('Eliminar empleados seleccionados', () => {
    for (let index = 0; index < 5; index++) {
      cy.createEmployee({}, { fastCreation: true });
    }
    cy.clickRefetchButton();
    cy.toggleSelectAllTableRows();
    cy.clickOnDeleteBulkButton();
    cy.clickOnContinueDeleteBulkRecord();
    cy.checkLoadingInformation();
    cy.contains('Los registros seleccionados fueron eliminados');
    cy.checkNoRecordsMessage();
  });

  it('Intentar eliminar empleados con cosechas pendiente de pago', () => {
    cy.createHarvest({ fastCreation: true, returnOnlyHarvest: false });
    cy.navigateToModuleWithSideBar('employees');
    cy.clickRefetchButton();
    cy.toggleSelectAllTableRows();
    cy.clickOnDeleteBulkButton();
    cy.clickOnContinueDeleteBulkRecord();
    cy.contains(
      'No se pudieron eliminar los empleados seleccionados, revisa si tienen cosechas o trabajos pendientes de pago'
    );
  });

  it('Intentar eliminar empleado con trabajos pendiente de pago', () => {
    cy.createWork({ fastCreation: true, returnOnlyWork: false });
    cy.navigateToModuleWithSideBar('employees');
    cy.clickRefetchButton();
    cy.toggleSelectAllTableRows();
    cy.clickOnDeleteBulkButton();
    cy.clickOnContinueDeleteBulkRecord();
    cy.contains(
      'No se pudieron eliminar los empleados seleccionados, revisa si tienen cosechas o trabajos pendientes de pago'
    );
  });

  it('Eliminar empleados que tienen conflicto de eliminación y los que no tienen', () => {
    cy.createEmployee({}, { fastCreation: true });
    cy.createWork({ fastCreation: true, returnOnlyWork: false });
    cy.createHarvest({ fastCreation: true, returnOnlyHarvest: false });
    cy.navigateToModuleWithSideBar('employees');
    cy.clickRefetchButton();
    cy.toggleSelectAllTableRows();
    cy.clickOnDeleteBulkButton();
    cy.clickOnContinueDeleteBulkRecord();
    cy.contains(
      'No se pudieron eliminar algunos empleados, revisa si tienen cosechas o trabajos pendientes de pago'
    );
  });
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
  it('Ver registro de empleado', () => {
    cy.executeClearSeedData({ employees: true });
    cy.createEmployee({}, { fastCreation: true }).then((currentEmployee) => {
      cy.loginUser();
      cy.navigateToModuleWithSideBar('employees');
      cy.wait(500);
      cy.clickActionsButtonTableRow(currentEmployee.id);
      cy.clickOnViewRecord();
      cy.getFormInput('first_name').should(
        'have.value',
        currentEmployee.first_name
      );
      cy.getFormInput('last_name').should(
        'have.value',
        currentEmployee.last_name
      );
      cy.getFormInput('email').should('have.value', currentEmployee.email);
      cy.getFormInput('cell_phone_number').should(
        'have.value',
        currentEmployee.cell_phone_number
      );
      cy.getFormTextArea('address').should(
        'have.value',
        currentEmployee.address
      );
      cy.contains('Información');
      cy.contains('Volver');
    });
  });

  it('Consultar registro con id no valido', () => {
    cy.loginUser();
    cy.visit(employeeRoutes.view('no-id'));
    cy.checkFormInputsAreEmpty();
    cy.checkMessageIncorrectInformation();
    cy.contains('Información');
    cy.contains('Volver');
  });

  it('Consultar registro con id inexistente', () => {
    cy.loginUser();
    cy.visit(employeeRoutes.view(TEST_UUID_VALID));
    cy.checkFormInputsAreEmpty();
    cy.checkMessageNotFoundInformation();
    cy.contains('Información');
    cy.contains('Volver');
  });

  // TODO: Crear casos de prueba para observar las tablas de registro donde esta involucrado
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
      cy.clickOnCertificateButton();

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

      cy.clickOnGenerateCertificateButton();
      cy.contains('La constancia ha sido generada con éxito.');
      const expectedFileName = `constancia-empleado-${id}.pdf`;
      const downloadsFolder =
        Cypress.config('downloadsFolder') || 'cypress/downloads';

      cy.readFile(`${downloadsFolder}/${expectedFileName}`, {
        timeout: 10000,
      }).should('exist');
    });
  });

  it('Mostrar mensaje de error al generar certificado con campos incompletos', () => {
    cy.createEmployeeAnd(({ id }) => {
      cy.clickRefetchButton();
      cy.clickActionsButtonTableRow(id);
      cy.contains('Certificar');
      cy.clickOnCertificateButton();
      cy.clickOnGenerateCertificateButton();
      cy.contains('El nombre de la empresa debe tener al menos 2 caracteres');
      cy.contains('El nombre del generador debe tener al menos 2 caracteres');
      cy.contains('El cargo del generador debe tener al menos 2 caracteres');
      cy.contains('El cargo del empleado debe tener al menos 2 caracteres');
      cy.contains('El número de cédula debe tener al menos 5 caracteres');
      cy.contains('Las horas semanales deben ser al menos 1');
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

  it('Crear usuario con acceso unicamente al modulo de empleados', () => {
    cy.createSeedUser({ modules: ['employees'] }, (userData) => {
      cy.log(userData);
      cy.loginUser(userData.email, userData.password);
      cy.wait(1500);

      cy.checkSidebarMenuItem('Empleados');

      cy.openCommandPaletteAndSelectFirstOption();

      cy.wait(2000);

      // Comprobar que haya registro en las tablas
      cy.checkTableRowsExist();

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
      cy.checkCertificateButtonState(true);
    });
  });

  it('Crear usuario con acceso unicamente a ver tabla de empleados', () => {
    cy.createSeedUser({ actions: ['find_all_employees'] }, (userData) => {
      cy.wait(2000);
      cy.log(userData);
      cy.loginUser(userData.email, userData.password);
      cy.wait(1500);

      cy.checkSidebarMenuItem('Empleados');

      cy.openCommandPaletteAndSelectFirstOption();

      cy.wait(2000);

      // Comprobar que haya registro en las tablas
      cy.checkTableRowsExist();

      // Comprobar habitiación de botones
      // Recarga de datos

      cy.checkRefetchButtonState(true);

      // Crear registro
      cy.checkCreateButtonState(true);

      cy.toggleSelectAllTableRows();
      cy.wait(700);

      cy.clickActionsButtonTableRow(currentEmployee.id);

      // Certificar
      cy.checkCertificateButtonState(false);

      cy.checkActionButtonsState({
        update: false,
        view: false,
        delete: false,
      });
    });
  });

  it('No tiene permisos para ver el listado de empleados', () => {
    cy.createSeedUser({ actions: ['create_employee'] }, (userData) => {
      cy.loginUser(userData.email, userData.password);
      cy.wait(1500);
      cy.checkSidebarMenuItem('Empleados');
      cy.openCommandPaletteAndSelectFirstOption();

      cy.wait(2000);
      cy.contains('No tienes permiso para ver el listado de empleados');
      cy.checkRefetchButtonState(false);

      cy.checkSearchBarIsDisabled();
    });
  });

  it('Debe sacar al usuario si intenta crear un empleado y no tiene permisos ', () => {
    cy.createSeedUser({ actions: ['find_all_employees'] }, (data: any) => {
      cy.loginUser(data.email, data.password);
      cy.wait(1500);

      cy.checkSidebarMenuItem('Empleados');
      cy.openCommandPaletteAndSelectFirstOption();

      cy.wait(2000);

      cy.visit(employeeRoutes.create());
      cy.shouldBeRedirectedForNoPermission();
    });
  });

  it('Debe sacar al usuario si intenta modificar a un empleado y no tiene permisos', () => {
    cy.createSeedUser({ actions: ['find_all_employees'] }, (userData: any) => {
      cy.loginUser(userData.email, userData.password);
      cy.wait(1500);
      cy.checkSidebarMenuItem('Empleados');
      cy.openCommandPaletteAndSelectFirstOption();

      cy.visit(employeeRoutes.update(currentEmployee.id));
      cy.shouldBeRedirectedForNoPermission();
    });
  });

  it('Debe sacar al usuario si intenta consultar a un empleado y no tiene permisos', () => {
    cy.createSeedUser({ actions: ['find_all_employees'] }, (data: any) => {
      cy.loginUser(data.email, data.password);
      cy.wait(1500);
      cy.checkSidebarMenuItem('Empleados');
      cy.openCommandPaletteAndSelectFirstOption();

      cy.visit(employeeRoutes.view(currentEmployee.id));
      cy.shouldBeRedirectedForNoPermission();
    });
  });
});
