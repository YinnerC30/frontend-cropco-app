import { BASE_HOME_PAGE_URL, TEST_UUID_VALID } from 'cypress/helpers/constants';
import { InformationGenerator } from '../../helpers/InformationGenerator';
import { clientsRoutes } from './clients-routes';

describe('Comprobar existencia de elementos en el modulo de clientes', () => {
  before(() => {
    cy.createClient({}, { fastCreation: true });
  });

  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('clients');
  });

  it('Debe ingresar a la ruta correcta ', () => {
    cy.contains('Clientes');
    cy.checkCurrentUrl(clientsRoutes.listAll());
  });

  it('Debe contener los elementos necesarios', () => {
    cy.existBasicSearchBar();

    cy.existRefetchButton();
    cy.existCreateButton();

    cy.checkExportAllClientsButtonState(true);

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
    cy.openCommandPaletteAndSelect('clientes', 'clients');
    cy.checkCurrentUrl(clientsRoutes.listAll());
  });
});

describe('Encuentra registros de acuerdo a la cadena de busqueda', () => {
  before(() => {
    cy.executeClearSeedData({ clients: true });
    for (let i = 0; i < 5; i++) {
      cy.createClient({}, { fastCreation: true });
    }
  });

  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('clients');
  });

  it('Busqueda por nombre(s) del cliente', () => {
    cy.createClient({}, { fastCreation: true }).then((data) => {
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

  it('Busqueda por apellido(s) del cliente', () => {
    cy.createClient({}, { fastCreation: true }).then((data) => {
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
  it('Busqueda por correo del cliente', () => {
    cy.createClient({}, { fastCreation: true }).then((data) => {
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
  it('Busqueda por id del cliente', () => {
    cy.createClient({}, { fastCreation: true }).then((data) => {
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

describe('Creación de clientes', () => {
  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('clients');
    cy.wait(700);
    cy.clickOnCreateButton();
  });

  it('Debe crear un cliente', () => {
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
    cy.contains('Cliente creado');
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
    cy.navigateToModuleWithSideBar('clients');
    cy.checkMessageLostFormData();
  });

  it('Debe permitir al usuario salir del formulario incluso si hay campos rellenados, presionando "Ignorar" (salir usando sidebar)', () => {
    cy.getFormInput('first_name').type('EmployeeName');
    cy.navigateToModuleWithSideBar('clients');
    cy.checkMessageLostFormData();
    cy.clickOnIgnoreButton();
    cy.url().then((currentUrl) => {
      expect(currentUrl).to.not.include(clientsRoutes.create());
    });
  });

  it('No debe permitir al usuario salir del formulario cuando hay campos rellenados, cerrando el sonner (salir usando sidebar)', () => {
    cy.getFormInput('first_name').type('EmployeeName');
    cy.navigateToModuleWithSideBar('clients');
    cy.checkMessageLostFormData();
    cy.clickOnCloseToast();
    cy.url().should('include', clientsRoutes.create());
  });

  it('Debe volver a la tabla de los clientes al cancelar la creación de un cliente', () => {
    cy.clickOnCancelRegisterButton();
    cy.url().should('include', clientsRoutes.listAll());
  });

  it('Debe volver a la tabla de los clientes al cancelar la creación de un cliente (con campos rellenados)', () => {
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
    cy.url().should('include', clientsRoutes.listAll());
  });

  it('Comprobar navegación del breadcrumb', () => {
    cy.get('a[data-testid="breadcrumb-link-item-clientes"]').click();
    cy.url().should('include', clientsRoutes.listAll());
  });

  it('Comprobar navegación del breadcrumb (con campos rellenados)', () => {
    cy.getFormInput('first_name').type('EmployeeName');
    cy.get('a[data-testid="breadcrumb-link-item-clientes"]').click();
    cy.checkMessageLostFormData();
    cy.clickOnIgnoreButton();
    cy.url().should('include', clientsRoutes.listAll());
  });
});

describe('Modificación de clientes', () => {
  let currentClient: any = {};

  before(() => {
    cy.executeClearSeedData({ clients: true });
    cy.createClient({}, { fastCreation: true }).then((data) => {
      currentClient = { ...data };
    });
  });

  beforeEach(() => {
    cy.loginUser();
    cy.visit(clientsRoutes.update(currentClient.id));
    cy.wait(3000);
  });

  it('Comprobar que se cargue la información del cliente antes de modificarlo', () => {
    cy.getFormInput('first_name').should(
      'have.value',
      currentClient.first_name
    );
    cy.getFormInput('last_name').should('have.value', currentClient.last_name);
    cy.getFormInput('email').should('have.value', currentClient.email);
    cy.getFormInput('cell_phone_number').should(
      'have.value',
      currentClient.cell_phone_number
    );
    cy.getFormTextArea('address').should('have.value', currentClient.address);
  });

  it('Modificar cliente existente', () => {
    cy.navigateToModuleWithSideBar('clients');
    cy.clickRefetchButton();
    cy.clickActionsButtonTableRow(currentClient.id);
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
    cy.contains('Cliente actualizado');
  });

  it('Debe advertir al usuario antes de salir del formulario si hay campos rellenados (salir usando sidebar)', () => {
    cy.getFormInput('first_name').type('UserName');
    cy.navigateToModuleWithSideBar('clients');
    cy.checkMessageLostFormData();
  });

  it('Debe permitir al usuario salir del formulario incluso si hay campos rellenados, presionando "Ignorar" (salir usando sidebar)', () => {
    cy.getFormInput('first_name').type('UserName');
    cy.navigateToModuleWithSideBar('clients');
    cy.checkMessageLostFormData();
    cy.clickOnIgnoreButton();
    cy.url().then((currentUrl) => {
      expect(currentUrl).to.not.include(clientsRoutes.update(currentClient.id));
    });
  });

  it('No debe permitir al usuario salir del formulario cuando hay campos rellenados, cerrando el sonner (salir usando sidebar)', () => {
    cy.getFormInput('first_name').type('UserName');
    cy.navigateToModuleWithSideBar('clients');
    cy.checkMessageLostFormData();
    cy.clickOnCloseToast();
    cy.url().should('include', clientsRoutes.update(currentClient.id));
  });

  it('Debe volver a la tabla de los clientes al cancelar la modificación de un cliente', () => {
    cy.clickOnCancelRegisterButton();
    cy.url().should('include', clientsRoutes.listAll());
  });

  it('Debe volver a la tabla de los clientes al cancelar la modificación de un cliente (con campos rellenados)', () => {
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
    cy.url().should('include', clientsRoutes.listAll());
  });

  it('Comprobar navegación del breadcrumb', () => {
    cy.get('a[data-testid="breadcrumb-link-item-clientes"]').click();
    cy.url().should('include', clientsRoutes.listAll());
  });

  it('Comprobar navegación del breadcrumb (con campos rellenados)', () => {
    cy.getFormInput('first_name').type('EmployeeName');
    cy.get('a[data-testid="breadcrumb-link-item-clientes"]').click();
    cy.checkMessageLostFormData();
    cy.clickOnIgnoreButton();
    cy.url().should('include', clientsRoutes.listAll());
  });
});

describe('Eliminación de cliente', () => {
  let currentClient: any = {};

  before(() => {
    cy.executeClearSeedData({ clients: true });
    cy.createClient({}, { fastCreation: true }).then((data) => {
      currentClient = { ...data };
    });
  });

  beforeEach(() => {
    cy.loginUser();
  });

  it('Eliminar cosecha', () => {
    cy.navigateToModuleWithSideBar('clients');
    cy.clickActionsButtonTableRow(currentClient.id);
    cy.clickOnDeleteRecord();
    cy.clickOnContinueDeleteOneRecord();
    cy.contains('Cliente eliminado');
  });

  it('Intentar eliminar cliente con ventas pendiente de pago', () => {
    cy.executeClearSeedData({ clients: true });
    cy.navigateToModuleWithSideBar('clients');
    cy.createSale({
      fastCreation: true,
      returnOnlySale: false,
      isReceivableGeneric: true,
    }).then((data) => {
      cy.wait(1000);
      cy.clickRefetchButton();
      const { client } = data;
      cy.wait(1000);
      // // Primer cliente
      cy.clickActionsButtonTableRow(client.id);
      cy.clickOnDeleteRecord();
      cy.clickOnContinueDeleteOneRecord();
      cy.contains(
        'No se pudo eliminar el cliente seleccionado. Verifica si tiene ventas pendientes de pago antes de intentar eliminarlo.'
      );
    });
  });
});

describe('Eliminación de clientes por lote', () => {
  beforeEach(() => {
    cy.executeClearSeedData({ clients: true });
    cy.loginUser();
    cy.navigateToModuleWithSideBar('clients');
    cy.clickRefetchButton();
  });

  it('Eliminar clientes seleccionados', () => {
    for (let index = 0; index < 5; index++) {
      cy.createClient({}, { fastCreation: true });
    }
    cy.clickRefetchButton();
    cy.toggleSelectAllTableRows();
    cy.clickOnDeleteBulkButton();
    cy.clickOnContinueDeleteBulkRecord();
    cy.checkLoadingInformation();
    cy.contains('Los registros seleccionados fueron eliminados');
    cy.checkNoRecordsMessage();
  });

  it('Intentar eliminar clientes con ventas pendiente de pago', () => {
    cy.createSale({
      fastCreation: true,
      returnOnlySale: false,
      isReceivableGeneric: true,
    });
    cy.navigateToModuleWithSideBar('clients');
    cy.clickRefetchButton();
    cy.toggleSelectAllTableRows();
    cy.clickOnDeleteBulkButton();
    cy.clickOnContinueDeleteBulkRecord();
    cy.contains(
      'No se pudo eliminar los clientes seleccionados. Verifica si tienen ventas pendientes de pago antes de intentar eliminarlos.'
    );
  });

  it('Eliminar clientes que tienen conflicto de eliminación y los que no tienen', () => {
    cy.createClient({}, { fastCreation: true });
    cy.createSale({
      fastCreation: true,
      returnOnlySale: false,
      isReceivableGeneric: true,
    });
    cy.navigateToModuleWithSideBar('clients');
    cy.clickRefetchButton();
    cy.toggleSelectAllTableRows();
    cy.clickOnDeleteBulkButton();
    cy.clickOnContinueDeleteBulkRecord();
    cy.contains(
      'No se pudieron eliminar algunos clientes, revisa si tienen ventas pendientes de pago antes de intentar eliminarlos.'
    );
  });
});

describe('Exportar clientes a PDF', () => {
  before(() => {
    cy.executeClearSeedData({ clients: true });
    cy.executeSeed({ clients: 10 });
  });

  it('Generar reporte de clientes', () => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('clients');
    cy.clickRefetchButton();
    cy.clickExportAllClientsButton();

    cy.contains('Generando reporte...');
    cy.contains('El reporte ha sido generado con éxito.');
    const expectedFileName = `reporte-clientes.pdf`;
    const downloadsFolder =
      Cypress.config('downloadsFolder') || 'cypress/downloads';

    cy.readFile(`${downloadsFolder}/${expectedFileName}`, {
      timeout: 10000,
    }).should('exist');
  });

  it('No permite generar reporte si no hay registros', () => {
    cy.executeClearSeedData({ clients: true });
    cy.loginUser();
    cy.navigateToModuleWithSideBar('clients');
    cy.clickRefetchButton();
    cy.checkExportAllClientsButtonState(false);
  });
});

describe('Copiar Id de registro', () => {
  it('Copiar Id del cliente', () => {
    cy.executeClearSeedData({ clients: true });
    cy.createClient({}, { fastCreation: true }).then((currentClient) => {
      cy.loginUser();
      cy.navigateToModuleWithSideBar('clients');
      cy.wait(500);
      cy.clickActionsButtonTableRow(currentClient.id);
      cy.clickOnCopyIdButton();
    });
  });
});

describe('Ver registro de cliente', () => {
  it('Ver registro de cliente', () => {
    cy.executeClearSeedData({ clients: true });
    cy.createClient({}, { fastCreation: true }).then((currentClient) => {
      cy.loginUser();
      cy.navigateToModuleWithSideBar('clients');
      cy.wait(500);
      cy.clickActionsButtonTableRow(currentClient.id);
      cy.clickOnViewRecord();
      cy.getFormInput('first_name').should(
        'have.value',
        currentClient.first_name
      );
      cy.getFormInput('last_name').should(
        'have.value',
        currentClient.last_name
      );
      cy.getFormInput('email').should('have.value', currentClient.email);
      cy.getFormInput('cell_phone_number').should(
        'have.value',
        currentClient.cell_phone_number
      );
      cy.getFormTextArea('address').should('have.value', currentClient.address);
      cy.contains('Información');
      cy.contains('Volver');
    });
  });

  it('Consultar registro con id no valido', () => {
    cy.loginUser();
    cy.visit(clientsRoutes.view('no-id'));
    cy.checkFormInputsAreEmpty();
    cy.checkMessageIncorrectInformation();
    cy.contains('Información');
    cy.contains('Volver');
  });

  it('Consultar registro con id inexistente', () => {
    cy.loginUser();
    cy.visit(clientsRoutes.view(TEST_UUID_VALID));
    cy.checkFormInputsAreEmpty();
    cy.checkMessageNotFoundInformation();
    cy.contains('Información');
    cy.contains('Volver');
  });

  // TODO: Crear casos de prueba para observar las tablas de registro donde esta involucrado
});

describe('Paginado y selectores', () => {
  before(() => {
    cy.executeClearSeedData({ clients: true });
    cy.executeSeed({ clients: 25 });
  });

  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('clients');
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

describe('Auth modulo de clientes', () => {
  let currentClient: any = {};

  before(() => {
    cy.executeClearSeedData({ clients: true });
    cy.createClient({}, { fastCreation: true }).then((data) => {
      currentClient = { ...data };
    });
  });

  it('Crear usuario con acceso unicamente al modulo de clientes', () => {
    cy.createSeedUser({ modules: ['clients'] }, (userData) => {
      cy.log(userData);
      cy.loginUser(userData.email, userData.password);
      cy.wait(1500);

      cy.checkSidebarMenuItem('Clientes');

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

      cy.clickActionsButtonTableRow(currentClient.id);

      cy.checkActionButtonsState({ update: true, view: true, delete: true });

      // Certificar
      // cy.checkCertificateButtonState(true);
    });
  });

  it('Crear usuario con acceso unicamente a ver tabla de clientes', () => {
    cy.createSeedUser({ actions: ['find_all_clients'] }, (userData) => {
      cy.wait(2000);
      cy.log(userData);
      cy.loginUser(userData.email, userData.password);
      cy.wait(1500);

      cy.checkSidebarMenuItem('Clientes');

      cy.openCommandPaletteAndSelectFirstOption();

      cy.wait(2000);

      // Comprobar que haya registro en las tablas
      cy.checkTableRowsExist();

      // Comprobar habitiación de botones
      // Recarga de datos

      cy.checkRefetchButtonState(true);

      // Crear registro
      cy.checkCreateButtonState(true);

      cy.checkExportAllClientsButtonState(false);

      cy.toggleSelectAllTableRows();
      cy.wait(700);

      cy.clickActionsButtonTableRow(currentClient.id);

      cy.checkActionButtonsState({
        update: false,
        view: false,
        delete: false,
      });
    });
  });

  it('No tiene permisos para ver el listado de clientes', () => {
    cy.createSeedUser({ actions: ['create_client'] }, (userData) => {
      cy.loginUser(userData.email, userData.password);
      cy.wait(1500);
      cy.checkSidebarMenuItem('Clientes');
      cy.openCommandPaletteAndSelectFirstOption();

      cy.wait(2000);
      cy.contains('No tienes permiso para ver el listado de clientes');
      cy.checkRefetchButtonState(false);

      cy.checkSearchBarIsDisabled();
    });
  });

  it('Debe sacar al usuario si intenta crear un cliente y no tiene permisos ', () => {
    cy.createSeedUser({ actions: ['find_all_clients'] }, (data: any) => {
      cy.loginUser(data.email, data.password);
      cy.wait(1500);

      cy.checkSidebarMenuItem('Clientes');
      cy.openCommandPaletteAndSelectFirstOption();

      cy.wait(2000);

      cy.visit(clientsRoutes.create());
      cy.shouldBeRedirectedForNoPermission();
    });
  });

  it('Debe sacar al usuario si intenta modificar a un cliente y no tiene permisos', () => {
    cy.createSeedUser({ actions: ['find_all_clients'] }, (userData: any) => {
      cy.loginUser(userData.email, userData.password);
      cy.wait(1500);
      cy.checkSidebarMenuItem('Clientes');
      cy.openCommandPaletteAndSelectFirstOption();

      cy.visit(clientsRoutes.update(currentClient.id));
      cy.shouldBeRedirectedForNoPermission();
    });
  });

  it('Debe sacar al usuario si intenta consultar a un cliente y no tiene permisos', () => {
    cy.createSeedUser({ actions: ['find_all_clients'] }, (data: any) => {
      cy.loginUser(data.email, data.password);
      cy.wait(1500);
      cy.checkSidebarMenuItem('Clientes');
      cy.openCommandPaletteAndSelectFirstOption();

      cy.visit(clientsRoutes.view(currentClient.id));
      cy.shouldBeRedirectedForNoPermission();
    });
  });
});
