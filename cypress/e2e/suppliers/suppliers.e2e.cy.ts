import { BASE_HOME_PAGE_URL, TEST_UUID_VALID } from 'cypress/helpers/constants';
import { InformationGenerator } from '../../helpers/InformationGenerator';
import { suppliersRoutes } from './suppliers-routes';

describe('Comprobar existencia de elementos en el modulo de proveedores', () => {
  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('suppliers');
  });

  it('Debe ingresar a la ruta correcta ', () => {
    cy.contains('Usuarios');
    cy.checkCurrentUrl(suppliersRoutes.listAll());
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
    cy.openCommandPaletteAndSelect('proveedores', 'suppliers');
    cy.checkCurrentUrl(suppliersRoutes.listAll());
  });
});

describe('Encuentra registros de acuerdo a la cadena de busqueda', () => {
  before(() => {
    cy.executeClearSeedData({ suppliers: true });
    for (let i = 0; i < 5; i++) {
      cy.createSupplier({}, { fastCreation: true });
    }
  });

  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('suppliers');
  });

  it('Busqueda por nombre(s) del proveedor', () => {
    cy.createSupplier({}, { fastCreation: true }).then((data) => {
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

  it('Busqueda por apellido(s) del proveedor', () => {
    cy.createSupplier({}, { fastCreation: true }).then((data) => {
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
  it('Busqueda por correo del proveedor', () => {
    cy.createSupplier({}, { fastCreation: true }).then((data) => {
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
  it('Busqueda por id del proveedor', () => {
    cy.createSupplier({}, { fastCreation: true }).then((data) => {
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

describe('Creación de proveedores', () => {
  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('suppliers');
    cy.wait(700);
    cy.clickOnCreateButton();
  });

  it('Debe crear un proveedor', () => {
    cy.getFormInput('first_name').type('SupplierName');
    cy.getFormInput('last_name').type('LastName');
    const defaultEmail = InformationGenerator.generateEmail();
    cy.getFormInput('email').type(defaultEmail);
    cy.getFormInput('cell_phone_number').type(
      InformationGenerator.generateCellPhoneNumber()
    );
    cy.getFormTextArea('address').type(InformationGenerator.generateAddress());
    cy.getFormInput('company_name').type('CompanyName');

    cy.clickOnSubmitButton();
    cy.checkDisabledSubmitButton();
    cy.contains('Proveedor creado');
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
    cy.getFormInput('first_name').type('SupplierName');
    cy.navigateToModuleWithSideBar('suppliers');
    cy.checkMessageLostFormData();
  });

  it('Debe permitir al usuario salir del formulario incluso si hay campos rellenados, presionando "Ignorar" (salir usando sidebar)', () => {
    cy.getFormInput('first_name').type('SupplierName');
    cy.navigateToModuleWithSideBar('suppliers');
    cy.checkMessageLostFormData();
    cy.clickOnIgnoreButton();
    cy.url().then((currentUrl) => {
      expect(currentUrl).to.not.include(suppliersRoutes.create());
    });
  });

  it('No debe permitir al usuario salir del formulario cuando hay campos rellenados, cerrando el sonner (salir usando sidebar)', () => {
    cy.getFormInput('first_name').type('SupplierName');
    cy.navigateToModuleWithSideBar('suppliers');
    cy.checkMessageLostFormData();
    cy.clickOnCloseToast();
    cy.url().should('include', suppliersRoutes.create());
  });

  it('Debe volver a la tabla de los proveedores al cancelar la creación de un proveedor', () => {
    cy.clickOnCancelRegisterButton();
    cy.url().should('include', suppliersRoutes.listAll());
  });

  it('Debe volver a la tabla de los proveedores al cancelar la creación de un proveedor (con campos rellenados)', () => {
    cy.getFormInput('first_name').type('SupplierName');
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
    cy.url().should('include', suppliersRoutes.listAll());
  });

  it('Comprobar navegación del breadcrumb', () => {
    cy.get('a[data-testid="breadcrumb-link-item-proveedores"]').click();
    cy.url().should('include', suppliersRoutes.listAll());
  });

  it('Comprobar navegación del breadcrumb (con campos rellenados)', () => {
    cy.getFormInput('first_name').type('SupplierName');
    cy.get('a[data-testid="breadcrumb-link-item-proveedores"]').click();
    cy.checkMessageLostFormData();
    cy.clickOnIgnoreButton();
    cy.url().should('include', suppliersRoutes.listAll());
  });
});

describe('Modificación de proveedores', () => {
  let currentSupplier: any = {};

  before(() => {
    cy.executeClearSeedData({ suppliers: true });
    cy.createSupplier({}, { fastCreation: true }).then((data) => {
      currentSupplier = { ...data };
    });
  });

  beforeEach(() => {
    cy.loginUser();
    cy.visit(suppliersRoutes.update(currentSupplier.id));
    cy.wait(3000);
  });

  it('Comprobar que se cargue la información del proveedor antes de modificarlo', () => {
    cy.getFormInput('first_name').should(
      'have.value',
      currentSupplier.first_name
    );
    cy.getFormInput('last_name').should(
      'have.value',
      currentSupplier.last_name
    );
    cy.getFormInput('email').should('have.value', currentSupplier.email);
    cy.getFormInput('cell_phone_number').should(
      'have.value',
      currentSupplier.cell_phone_number
    );
    cy.getFormTextArea('address').should('have.value', currentSupplier.address);
  });

  it('Modificar proveedor existente', () => {
    cy.navigateToModuleWithSideBar('suppliers');
    cy.clickRefetchButton();
    cy.clickActionsButtonTableRow(currentSupplier.id);
    cy.clickOnUpdateRecord();
    cy.wait(3000);
    cy.getFormInput('first_name').clear().type('SupplierNameChanged');
    cy.getFormInput('last_name').clear().type('LastNameChanged');
    const defaultEmail = InformationGenerator.generateEmail();
    cy.getFormInput('email').clear().type(defaultEmail);
    cy.getFormInput('cell_phone_number').clear().type('3123451111');
    cy.getFormTextArea('address')
      .clear()
      .type(InformationGenerator.generateAddress());
    cy.clickOnSubmitButton();
    cy.checkDisabledSubmitButton();
    cy.contains('Proveedor actualizado');
  });

  it('Debe advertir al usuario antes de salir del formulario si hay campos rellenados (salir usando sidebar)', () => {
    cy.getFormInput('first_name').type('UserName');
    cy.navigateToModuleWithSideBar('suppliers');
    cy.checkMessageLostFormData();
  });

  it('Debe permitir al usuario salir del formulario incluso si hay campos rellenados, presionando "Ignorar" (salir usando sidebar)', () => {
    cy.getFormInput('first_name').type('UserName');
    cy.navigateToModuleWithSideBar('suppliers');
    cy.checkMessageLostFormData();
    cy.clickOnIgnoreButton();
    cy.url().then((currentUrl) => {
      expect(currentUrl).to.not.include(
        suppliersRoutes.update(currentSupplier.id)
      );
    });
  });

  it('No debe permitir al usuario salir del formulario cuando hay campos rellenados, cerrando el sonner (salir usando sidebar)', () => {
    cy.getFormInput('first_name').type('UserName');
    cy.navigateToModuleWithSideBar('suppliers');
    cy.checkMessageLostFormData();
    cy.clickOnCloseToast();
    cy.url().should('include', suppliersRoutes.update(currentSupplier.id));
  });

  it('Debe volver a la tabla de los proveedores al cancelar la modificación de un proveedor', () => {
    cy.clickOnCancelRegisterButton();
    cy.url().should('include', suppliersRoutes.listAll());
  });

  it('Debe volver a la tabla de los proveedores al cancelar la modificación de un proveedor (con campos rellenados)', () => {
    cy.getFormInput('first_name').type('SupplierName');
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
    cy.url().should('include', suppliersRoutes.listAll());
  });

  it('Comprobar navegación del breadcrumb', () => {
    cy.get('a[data-testid="breadcrumb-link-item-proveedores"]').click();
    cy.url().should('include', suppliersRoutes.listAll());
  });

  it('Comprobar navegación del breadcrumb (con campos rellenados)', () => {
    cy.getFormInput('first_name').type('SupplierName');
    cy.get('a[data-testid="breadcrumb-link-item-proveedores"]').click();
    cy.checkMessageLostFormData();
    cy.clickOnIgnoreButton();
    cy.url().should('include', suppliersRoutes.listAll());
  });
});

describe('Eliminación de proveedor', () => {
  let currentSupplier: any = {};

  before(() => {
    cy.executeClearSeedData({ suppliers: true });
    cy.createSupplier({}, { fastCreation: true }).then((data) => {
      currentSupplier = { ...data };
    });
  });

  beforeEach(() => {
    cy.loginUser();
  });

  it('Eliminar proveedor', () => {
    cy.navigateToModuleWithSideBar('suppliers');
    cy.clickActionsButtonTableRow(currentSupplier.id);
    cy.clickOnDeleteRecord();
    cy.clickOnContinueDeleteOneRecord();
    cy.contains('Proveedor eliminado');
  });

  // it('Intentar eliminar proveedor con cosechas pendiente de pago', () => {
  //   cy.executeClearSeedData({ suppliers: true });

  //   cy.createHarvest({ fastCreation: true, returnOnlyHarvest: false }).then(
  //     (data) => {
  //       cy.navigateToModuleWithSideBar('suppliers');
  //       const { suppliers } = data;

  //       // Primer proveedor
  //       cy.clickActionsButtonTableRow(suppliers[0].id);
  //       cy.clickOnDeleteRecord();
  //       cy.clickOnContinueDeleteOneRecord();
  //       cy.contains(
  //         'No se pudo eliminar el proveedor seleccionado, revisa si tiene cosechas o trabajos pendientes de pago'
  //       );
  //       // Segundo proveedor
  //       cy.clickActionsButtonTableRow(suppliers[1].id);
  //       cy.clickOnDeleteRecord();
  //       cy.clickOnContinueDeleteOneRecord();
  //       cy.contains(
  //         'No se pudo eliminar el proveedor seleccionado, revisa si tiene cosechas o trabajos pendientes de pago'
  //       );
  //       // Tercer proveedor
  //       cy.clickActionsButtonTableRow(suppliers[2].id);
  //       cy.clickOnDeleteRecord();
  //       cy.clickOnContinueDeleteOneRecord();
  //       cy.contains(
  //         'No se pudo eliminar el proveedor seleccionado, revisa si tiene cosechas o trabajos pendientes de pago'
  //       );
  //     }
  //   );
  // });

  // it('Intentar eliminar proveedor con trabajos pendiente de pago', () => {
  //   cy.executeClearSeedData({ suppliers: true });

  //   cy.createWork({ fastCreation: true, returnOnlyWork: false }).then(
  //     (data) => {
  //       cy.navigateToModuleWithSideBar('suppliers');
  //       const { suppliers } = data;

  //       // Primer proveedor
  //       cy.clickActionsButtonTableRow(suppliers[0].id);
  //       cy.clickOnDeleteRecord();
  //       cy.clickOnContinueDeleteOneRecord();
  //       cy.contains(
  //         'No se pudo eliminar el proveedor seleccionado, revisa si tiene cosechas o trabajos pendientes de pago'
  //       );
  //       // Segundo proveedor
  //       cy.clickActionsButtonTableRow(suppliers[1].id);
  //       cy.clickOnDeleteRecord();
  //       cy.clickOnContinueDeleteOneRecord();
  //       cy.contains(
  //         'No se pudo eliminar el proveedor seleccionado, revisa si tiene cosechas o trabajos pendientes de pago'
  //       );
  //       // Tercer proveedor
  //       cy.clickActionsButtonTableRow(suppliers[2].id);
  //       cy.clickOnDeleteRecord();
  //       cy.clickOnContinueDeleteOneRecord();
  //       cy.contains(
  //         'No se pudo eliminar el proveedor seleccionado, revisa si tiene cosechas o trabajos pendientes de pago'
  //       );
  //     }
  //   );
  // });
});

describe('Eliminación de proveedores por lote', () => {
  beforeEach(() => {
    cy.executeClearSeedData({ suppliers: true });
    cy.loginUser();
    cy.navigateToModuleWithSideBar('suppliers');
    cy.clickRefetchButton();
  });

  it('Eliminar proveedores seleccionados', () => {
    for (let index = 0; index < 5; index++) {
      cy.createSupplier({}, { fastCreation: true });
    }
    cy.clickRefetchButton();
    cy.toggleSelectAllTableRows();
    cy.clickOnDeleteBulkButton();
    cy.clickOnContinueDeleteBulkRecord();
    cy.checkLoadingInformation();
    cy.contains('Los registros seleccionados fueron eliminados');
    cy.checkNoRecordsMessage();
  });

  // it('Intentar eliminar proveedores con cosechas pendiente de pago', () => {
  //   cy.createHarvest({ fastCreation: true, returnOnlyHarvest: false });
  //   cy.navigateToModuleWithSideBar('suppliers');
  //   cy.clickRefetchButton();
  //   cy.toggleSelectAllTableRows();
  //   cy.clickOnDeleteBulkButton();
  //   cy.clickOnContinueDeleteBulkRecord();
  //   cy.contains(
  //     'No se pudieron eliminar los proveedores seleccionados, revisa si tienen cosechas o trabajos pendientes de pago'
  //   );
  // });

  // it('Intentar eliminar proveedor con trabajos pendiente de pago', () => {
  //   cy.createWork({ fastCreation: true, returnOnlyWork: false });
  //   cy.navigateToModuleWithSideBar('suppliers');
  //   cy.clickRefetchButton();
  //   cy.toggleSelectAllTableRows();
  //   cy.clickOnDeleteBulkButton();
  //   cy.clickOnContinueDeleteBulkRecord();
  //   cy.contains(
  //     'No se pudieron eliminar los proveedores seleccionados, revisa si tienen cosechas o trabajos pendientes de pago'
  //   );
  // });

  // it('Eliminar proveedores que tienen conflicto de eliminación y los que no tienen', () => {
  //   cy.createSupplier({}, { fastCreation: true });
  //   cy.createWork({ fastCreation: true, returnOnlyWork: false });
  //   cy.createHarvest({ fastCreation: true, returnOnlyHarvest: false });
  //   cy.navigateToModuleWithSideBar('suppliers');
  //   cy.clickRefetchButton();
  //   cy.toggleSelectAllTableRows();
  //   cy.clickOnDeleteBulkButton();
  //   cy.clickOnContinueDeleteBulkRecord();
  //   cy.contains(
  //     'No se pudieron eliminar algunos proveedores, revisa si tienen cosechas o trabajos pendientes de pago'
  //   );
  // });
});

describe('Copiar Id de registro', () => {
  it('Copiar Id del proveedor', () => {
    cy.executeClearSeedData({ suppliers: true });
    cy.createSupplier({}, { fastCreation: true }).then((currentSupplier) => {
      cy.loginUser();
      cy.navigateToModuleWithSideBar('suppliers');
      cy.wait(500);
      cy.clickActionsButtonTableRow(currentSupplier.id);
      cy.clickOnCopyIdButton();
    });
  });
});

describe('Ver registro de proveedor', () => {
  it('Ver registro de proveedor', () => {
    cy.executeClearSeedData({ suppliers: true });
    cy.createSupplier({}, { fastCreation: true }).then((currentSupplier) => {
      cy.loginUser();
      cy.navigateToModuleWithSideBar('suppliers');
      cy.wait(500);
      cy.clickActionsButtonTableRow(currentSupplier.id);
      cy.clickOnViewRecord();
      cy.getFormInput('first_name').should(
        'have.value',
        currentSupplier.first_name
      );
      cy.getFormInput('last_name').should(
        'have.value',
        currentSupplier.last_name
      );
      cy.getFormInput('email').should('have.value', currentSupplier.email);
      cy.getFormInput('cell_phone_number').should(
        'have.value',
        currentSupplier.cell_phone_number
      );
      cy.getFormTextArea('address').should(
        'have.value',
        currentSupplier.address
      );
      cy.getFormInput('company_name').should(
        'have.value',
        currentSupplier.company_name
      );
      cy.contains('Información');
      cy.contains('Volver');
    });
  });

  it('Consultar registro con id no valido', () => {
    cy.loginUser();
    cy.visit(suppliersRoutes.view('no-id'));
    cy.checkFormInputsAreEmpty();
    cy.checkMessageIncorrectInformation();
    cy.contains('Información');
    cy.contains('Volver');
  });

  it('Consultar registro con id inexistente', () => {
    cy.loginUser();
    cy.visit(suppliersRoutes.view(TEST_UUID_VALID));
    cy.checkFormInputsAreEmpty();
    cy.checkMessageNotFoundInformation();
    cy.contains('Información');
    cy.contains('Volver');
  });

  // TODO: Crear casos de prueba para observar las tablas de registro donde esta involucrado
});

describe('Paginado y selectores', () => {
  before(() => {
    cy.executeClearSeedData({ suppliers: true });
    cy.executeSeed({ suppliers: 25 });
  });

  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('suppliers');
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

describe('Auth modulo de proveedores', () => {
  let currentSupplier: any = {};

  before(() => {
    cy.executeClearSeedData({ suppliers: true });
    cy.createSupplier({}, { fastCreation: true }).then((data) => {
      currentSupplier = { ...data };
    });
  });

  it('Crear usuario con acceso unicamente al modulo de proveedores', () => {
    cy.createSeedUser({ modules: ['suppliers'] }, (userData) => {
      cy.log(userData);
      cy.loginUser(userData.email, userData.password);
      cy.wait(1500);

      cy.checkSidebarMenuItem('Proveedores');

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

      cy.clickActionsButtonTableRow(currentSupplier.id);

      cy.checkActionButtonsState({ update: true, view: true, delete: true });
    });
  });

  it('Crear usuario con acceso unicamente a ver tabla de proveedores', () => {
    cy.createSeedUser({ actions: ['find_all_suppliers'] }, (userData) => {
      cy.wait(2000);
      cy.log(userData);
      cy.loginUser(userData.email, userData.password);
      cy.wait(1500);

      cy.checkSidebarMenuItem('Proveedores');

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

      cy.clickActionsButtonTableRow(currentSupplier.id);

      cy.checkActionButtonsState({
        update: false,
        view: false,
        delete: false,
      });
    });
  });

  it('No tiene permisos para ver el listado de proveedores', () => {
    cy.createSeedUser({ actions: ['create_supplier'] }, (userData) => {
      cy.loginUser(userData.email, userData.password);
      cy.wait(1500);
      cy.checkSidebarMenuItem('Proveedores');
      cy.openCommandPaletteAndSelectFirstOption();

      cy.wait(2000);
      cy.contains('No tienes permiso para ver el listado de proveedores');
      cy.checkRefetchButtonState(false);

      cy.checkSearchBarIsDisabled();
    });
  });

  it('Debe sacar al usuario si intenta crear un proveedor y no tiene permisos ', () => {
    cy.createSeedUser({ actions: ['find_all_suppliers'] }, (data: any) => {
      cy.loginUser(data.email, data.password);
      cy.wait(1500);

      cy.checkSidebarMenuItem('Proveedores');
      cy.openCommandPaletteAndSelectFirstOption();

      cy.wait(2000);

      cy.visit(suppliersRoutes.create());
      cy.shouldBeRedirectedForNoPermission();
    });
  });

  it('Debe sacar al usuario si intenta modificar a un proveedor y no tiene permisos', () => {
    cy.createSeedUser({ actions: ['find_all_suppliers'] }, (userData: any) => {
      cy.loginUser(userData.email, userData.password);
      cy.wait(1500);
      cy.checkSidebarMenuItem('Proveedores');
      cy.openCommandPaletteAndSelectFirstOption();

      cy.visit(suppliersRoutes.update(currentSupplier.id));
      cy.shouldBeRedirectedForNoPermission();
    });
  });

  it('Debe sacar al usuario si intenta consultar a un proveedor y no tiene permisos', () => {
    cy.createSeedUser({ actions: ['find_all_suppliers'] }, (data: any) => {
      cy.loginUser(data.email, data.password);
      cy.wait(1500);
      cy.checkSidebarMenuItem('Proveedores');
      cy.openCommandPaletteAndSelectFirstOption();

      cy.visit(suppliersRoutes.view(currentSupplier.id));
      cy.shouldBeRedirectedForNoPermission();
    });
  });
});
