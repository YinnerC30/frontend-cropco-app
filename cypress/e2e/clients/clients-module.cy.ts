import { InformationGenerator } from '../../helpers/InformationGenerator';

describe('Modulo de clientes', () => {
  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('clients');
  });

  it('Debe ingresar a la ruta correcta ', () => {
    cy.contains('Usuarios');
    cy.checkCurrentUrl('clients/view/all');
  });

  it('Debe contener los elementos necesarios', () => {
    cy.existBasicSearchBar();

    cy.existRefetchButton();
    cy.existCreateButton();
    cy.get('button[data-testid="btn-export-all-clients"]')
      .should('exist')
      .should('be.visible');

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
    cy.wait(2000);
    cy.checkClearSelectionButtonState(false);
    cy.checkDeleteBulkButtonState(false);
    cy.toggleSelectAllTableRows();
    cy.checkSelectedTableRowsGreaterThanZero();
    cy.checkClearSelectionButtonState(true);
    cy.checkDeleteBulkButtonState(true);
    cy.toggleSelectAllTableRows();
    cy.checkSelectedTableRowsIsZero();
    cy.checkClearSelectionButtonState(false);
    cy.checkDeleteBulkButtonState(false);
  });

  it('Ingresar al modulo usando el command', () => {
    cy.visit('/app/home/page');
    cy.wait(3000);
    cy.openCommandPaletteAndSelect('clientes', 'clients');
    cy.checkCurrentUrl('clients/view/all');
  });
});

describe('Encuentra registros de acuerdo a la cadena de busqueda', () => {
  const clientData = {
    firstName: 'clienttosearch',
    lastName: 'lasttosearch',
    email: '',
  };

  beforeEach(() => {
    clientData.email = InformationGenerator.generateEmail();
    cy.loginUser();
    cy.createClient(clientData);
  });

  it('Busqueda por nombre(s) del cliente', () => {
    cy.typeOnInputBasicSearchBar(clientData.firstName);
    cy.clickOnSubmitBasicSearchBar();
    cy.get('tbody tr')
      .filter(`:contains(${clientData.firstName})`)
      .should('have.length.greaterThan', 0);
    cy.contains(clientData.firstName);
    cy.contains(clientData.lastName);
    cy.contains(clientData.email);
  });
  it('Busqueda por apellido(s) del cliente', () => {
    cy.typeOnInputBasicSearchBar(clientData.lastName);
    cy.clickOnSubmitBasicSearchBar();
    cy.get('tbody tr')
      .filter(`:contains(${clientData.lastName})`)
      .should('have.length.greaterThan', 0);
    cy.contains(clientData.firstName);
    cy.contains(clientData.lastName);
    cy.contains(clientData.email);
  });
  it('Busqueda por correo del cliente', () => {
    cy.typeOnInputBasicSearchBar(clientData.email.split('@')[0]);
    cy.clickOnSubmitBasicSearchBar();
    cy.get('tbody tr')
      .filter(`:contains(${clientData.email})`)
      .should('have.length', 1);
    cy.contains(clientData.firstName);
    cy.contains(clientData.lastName);
    cy.contains(clientData.email);
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
    cy.getFormInput('first_name').type('ClientName');
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
    cy.getFormInput('first_name').type('ClientName');
    cy.navigateToModuleWithSideBar('clients');
    cy.checkMessageLostFormData();
  });

  it('Debe permitir al usuario salir del formulario incluso si hay campos rellenados, presionando "Ignorar" (salir usando sidebar)', () => {
    cy.getFormInput('first_name').type('ClientName');
    cy.navigateToModuleWithSideBar('clients');
    cy.checkMessageLostFormData();
    cy.clickOnIgnoreButton();
    cy.url().then((currentUrl) => {
      expect(currentUrl).to.not.include('/app/home/clients/create');
    });
  });

  it('No debe permitir al usuario salir del formulario cuando hay campos rellenados, cerrando el sonner (salir usando sidebar)', () => {
    cy.getFormInput('first_name').type('ClientName');
    cy.navigateToModuleWithSideBar('clients');
    cy.checkMessageLostFormData();
    cy.clickOnCloseToast();
    cy.url().should('include', '/app/home/clients/create');
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
    cy.visit(`/app/home/clients/update/one/${currentClient.id}`);
    cy.wait(3000);
  });

  it('Modificar cliente existente', () => {
    cy.getFormInput('first_name').clear().type('ClientNameChanged');
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
    cy.getFormInput('first_name').type('ClientName');
    cy.navigateToModuleWithSideBar('clients');
    cy.checkMessageLostFormData();
  });

  it('Debe permitir al usuario salir del formulario incluso si hay campos rellenados, presionando "Ignorar" (salir usando sidebar)', () => {
    cy.getFormInput('first_name').type('ClientName');
    cy.navigateToModuleWithSideBar('clients');
    cy.checkMessageLostFormData();
    cy.clickOnIgnoreButton();
    cy.url().then((currentUrl) => {
      expect(currentUrl).to.not.include('/app/home/clients/update');
    });
  });

  it('No debe permitir al usuario salir del formulario cuando hay campos rellenados, cerrando el sonner (salir usando sidebar)', () => {
    cy.createClientAnd({}, ({ email, id }) => {
      cy.visit(`/app/home/clients/view/all?query=${email}`);
      cy.clickActionsButtonTableRow(id);
      cy.get('button[data-testid="btn-update-record"]').click();
      cy.getFormInput('first_name').type('ClientName');
      cy.navigateToModuleWithSideBar('clients');
      cy.checkMessageLostFormData();
      cy.clickOnCloseToast();
      cy.url().should('include', '/app/home/clients/update');
    });
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

    cy.createSale({
      fastCreation: true,
      returnOnlySale: false,
      isReceivableGeneric: true,
    }).then((data) => {
      cy.navigateToModuleWithSideBar('clients');
      const { client } = data;

      cy.clickActionsButtonTableRow(client.id);
      cy.clickOnDeleteRecord();
      cy.clickOnContinueDeleteOneRecord();
      cy.contains(
        'No se pudo eliminar el cliente seleccionado, revisa si tiene ventas pendientes de pago'
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
    cy.wait(1000);
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
    cy.wait(1000);
    cy.toggleSelectAllTableRows();
    cy.clickOnDeleteBulkButton();
    cy.clickOnContinueDeleteBulkRecord();
    cy.contains(
      'No se pudieron eliminar los clientes seleccionados, revisa si tienen ventas pendientes de pago'
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
    cy.wait(1000);
    cy.toggleSelectAllTableRows();
    cy.clickOnDeleteBulkButton();
    cy.clickOnContinueDeleteBulkRecord();
    cy.contains(
      'No se pudieron eliminar algunos clientes, revisa si tienen ventas pendientes de pago'
    );
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
  it('Ver registro de cosecha', () => {
    cy.executeClearSeedData({ clients: true });
    cy.createClient({}, { fastCreation: true }).then((currentClient) => {
      cy.loginUser();
      cy.navigateToModuleWithSideBar('clients');
      cy.wait(500);
      cy.clickActionsButtonTableRow(currentClient.id);
      cy.clickOnViewRecord();
      cy.contains('Información');
      cy.contains('Volver');
    });
  });
});

describe('Exportar clientes a PDF', () => {
  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('clients');
  });

  it('Generar reporte de clientes', () => {
    cy.wait(2000);
    cy.get('span[data-testid="data-table-row-total"]')
      .invoke('text')
      .then((text) => {
        const total = parseInt(text, 10);
        if (total <= 2) {
          for (let index = 0; index < 3; index++) {
            cy.createClient({}, { fastCreation: true });
          }
        }
      });
    cy.get('button[data-testid="btn-export-all-clients"]').click();

    cy.contains('Generando reporte...');
    cy.contains('El reporte ha sido generado con éxito.');
    const expectedFileName = `reporte-clientes.pdf`;
    const downloadsFolder =
      Cypress.config('downloadsFolder') || 'cypress/downloads';

    cy.readFile(`${downloadsFolder}/${expectedFileName}`, {
      timeout: 10000,
    }).should('exist');
  });
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
      cy.get('ul[data-sidebar="menu"]').within(() => {
        cy.get('li[data-sidebar="menu-item"]')
          .should('have.length', 1)
          .contains('Clientes');
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

      cy.clickActionsButtonTableRow(currentClient.id);

      cy.checkActionButtonsState({ update: true, view: true, delete: true });

      // // Certificar
      // cy.get('button[data-testid="btn-certificate-employee"]').should(
      //   'be.enabled'
      // );
    });
  });

  it('Crear usuario con acceso unicamente a ver tabla de clientes', () => {
    cy.createSeedUser({ actions: ['find_all_clients'] }, (userData) => {
      cy.log(userData);
      cy.loginUser(userData.email, userData.password);
      cy.wait(1500);
      cy.get('ul[data-sidebar="menu"]').within(() => {
        cy.get('li[data-sidebar="menu-item"]')
          .should('have.length', 1)
          .contains('Clientes');
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

      cy.clickActionsButtonTableRow(currentClient.id);

      // // Certificar
      // cy.get('button[data-testid="btn-certificate-employee"]').should(
      //   'be.disabled'
      // );

      cy.checkActionButtonsState({
        update: false,
        view: false,
        delete: false,
      });
    });
  });

  it('No tiene permisos para ver el listado de clientes', () => {
    cy.createSeedUser({ actions: ['create_client'] }, (userData) => {
      cy.log(userData);
      cy.loginUser(userData.email, userData.password);
      cy.wait(1500);
      cy.get('ul[data-sidebar="menu"]').within(() => {
        cy.get('li[data-sidebar="menu-item"]')
          .should('have.length', 1)
          .contains('Clientes');
      });
      cy.get('body').type('{ctrl}j');
      cy.get('div[cmdk-item][role="option"]').should('have.length', 1);
      cy.get('div[cmdk-item][role="option"]').click();

      cy.wait(2000);
      cy.contains('No tienes permiso para ver el listado de clientes');
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

  it('Debe sacar al usuario si intenta crear un cliente y no tiene permisos ', () => {
    cy.createSeedUser({ actions: ['find_all_clients'] }, (data: any) => {
      cy.loginUser(data.email, data.password);
      cy.wait(1500);
      cy.get('ul[data-sidebar="menu"]').within(() => {
        cy.get('li[data-sidebar="menu-item"]')
          .should('have.length', 1)
          .contains('Clientes');
      });
      cy.get('body').type('{ctrl}j');
      cy.get('div[cmdk-item][role="option"]').should('have.length', 1);
      cy.get('div[cmdk-item][role="option"]').click();

      cy.wait(2000);

      cy.visit('/app/home/clients/create/one');
      cy.shouldBeRedirectedForNoPermission();
    });
  });

  it('Debe sacar al usuario si intenta modificar a un cliente y no tiene permisos', () => {
    cy.createSeedUser({ actions: ['find_all_clients'] }, (userData: any) => {
      cy.loginUser(userData.email, userData.password);
      cy.wait(1500);
      cy.get('ul[data-sidebar="menu"]').within(() => {
        cy.get('li[data-sidebar="menu-item"]')
          .should('have.length', 1)
          .contains('Clientes');
      });
      cy.get('body').type('{ctrl}j');
      cy.get('div[cmdk-item][role="option"]').should('have.length', 1);
      cy.get('div[cmdk-item][role="option"]').click();

      cy.visit(`/app/home/clients/update/one/${currentClient.id}`);
      cy.shouldBeRedirectedForNoPermission();
    });
  });

  it('Debe sacar al usuario si intenta consultar a un cliente y no tiene permisos', () => {
    cy.createSeedUser({ actions: ['find_all_clients'] }, (data: any) => {
      cy.loginUser(data.email, data.password);
      cy.wait(1500);
      cy.get('ul[data-sidebar="menu"]').within(() => {
        cy.get('li[data-sidebar="menu-item"]')
          .should('have.length', 1)
          .contains('Clientes');
      });
      cy.get('body').type('{ctrl}j');
      cy.get('div[cmdk-item][role="option"]').should('have.length', 1);
      cy.get('div[cmdk-item][role="option"]').click();

      cy.visit(`/app/home/clients/view/one/${currentClient.id}`);
      cy.shouldBeRedirectedForNoPermission();
    });
  });
});
