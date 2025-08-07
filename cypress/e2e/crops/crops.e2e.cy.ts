import { BASE_HOME_PAGE_URL, TEST_UUID_VALID } from 'cypress/helpers/constants';
import { InformationGenerator } from '../../helpers/InformationGenerator';
import { cropsRoutes } from './crops-routes';
import { cropsData } from './data/get-all-crops.data';

describe('Comprobar existencia de elementos en el modulo de cultivos', () => {
  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('crops');
  });

  it('Debe ingresar a la ruta correcta ', () => {
    cy.contains('Usuarios');
    cy.checkCurrentUrl(cropsRoutes.listAll());
  });

  it('Debe contener los elementos necesarios', () => {
    cy.existBasicSearchBar();

    cy.existRefetchButton();
    cy.existCreateButton();

    cy.existPaginationInfo();

    cy.contains('Mostrar inventario como:');
    cy.checkMassUnitOfMeasureButton();

    cy.contains('Nombre:');
    cy.contains('Descripción:');
    cy.contains('Número de hectáreas:');
    cy.contains('Número de unidades:');
    cy.contains('Ubicación:');
    cy.contains('Fecha de creación:');
    cy.contains('Fecha de terminación:');
    cy.contains('Inventario actual:');

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
    cy.openCommandPaletteAndSelect('cultivos', 'crops');
    cy.checkCurrentUrl(cropsRoutes.listAll());
  });
});

describe('Encuentra registros de acuerdo a la cadena de busqueda', () => {
  before(() => {
    cy.executeClearSeedData({ crops: true });
    for (let i = 0; i < 5; i++) {
      cy.createCrop({}, { fastCreation: true });
    }
  });

  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('crops');
  });

  it('Busqueda por nombre del cultivo', () => {
    cy.createCrop({}, { fastCreation: true }).then((data) => {
      const {
        id,
        name,
        description,
        number_hectares,
        units,
        location,
        // date_of_creation,
        // date_of_termination,
      } = data;
      cy.typeOnInputBasicSearchBar(name);
      cy.clickOnSubmitBasicSearchBar();
      cy.checkTableRowValues(id, [
        name,
        description,
        number_hectares,
        units,
        location,
        // date_of_creation,
        // date_of_termination,
      ]);
    });
  });

  it('Busqueda por id del cultivo', () => {
    cy.createCrop({}, { fastCreation: true }).then((data) => {
      const {
        id,
        name,
        description,
        number_hectares,
        units,
        location,
        // date_of_creation,
        // date_of_termination,
      } = data;
      cy.typeOnInputBasicSearchBar(id);
      cy.clickOnSubmitBasicSearchBar();
      cy.checkTableRowValues(id, [
        name,
        description,
        number_hectares,
        units,
        location,
        // date_of_creation,
        // date_of_termination,
      ]);
    });
  });
});

describe('Creación de cultivos', () => {
  before(() => {
    cy.executeClearSeedData({ crops: true });
  });

  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('crops');
    cy.wait(700);
    cy.clickOnCreateButton();
  });

  it('Debe crear un cultivo', () => {
    cy.getFormInput('name').type('CropName');
    cy.getFormInput('number_hectares').type('10');
    cy.getFormInput('units').type('1500');
    cy.getFormTextArea('location').type(InformationGenerator.generateAddress());
    cy.getFormTextArea('description').type(
      InformationGenerator.generateDescription()
    );

    cy.get('button[data-testid="btn-calendar-selector"]').first().click();
    cy.selectCalendarMonth(3);
    cy.selectCalendarYear(2024);
    cy.selectCalendarDay(13);

    cy.get('button[data-testid="btn-calendar-selector"]').eq(1).click();
    cy.selectCalendarMonth(6);
    cy.selectCalendarYear(2025);
    cy.selectCalendarDay(15);

    cy.clickOnSubmitButton();
    cy.checkDisabledSubmitButton();
    cy.contains('Cultivo creado');
  });

  it('Debe mostrar mensajes de error al intentar enviar el formulario vacío', () => {
    cy.clickOnSubmitButton();
    cy.contains('El nombre debe tener al menos 4 caracteres');
    cy.contains('El número debe ser positivo');
    cy.contains('La descripción debe tener mínimo 15 caracteres');
    cy.contains('La ubicación debe tener al menos 15 caracteres');
    cy.checkMessageFieldsMissing();
  });

  it('Debe advertir al usuario antes de salir del formulario si hay campos rellenados (salir usando sidebar)', () => {
    cy.getFormInput('name').type('CropName');
    cy.navigateToModuleWithSideBar('crops');
    cy.checkMessageLostFormData();
  });

  it('Debe permitir al usuario salir del formulario incluso si hay campos rellenados, presionando "Ignorar" (salir usando sidebar)', () => {
    cy.getFormInput('name').type('CropName');
    cy.navigateToModuleWithSideBar('crops');
    cy.checkMessageLostFormData();
    cy.clickOnIgnoreButton();
    cy.url().then((currentUrl) => {
      expect(currentUrl).to.not.include(cropsRoutes.create());
    });
  });

  it('No debe permitir al usuario salir del formulario cuando hay campos rellenados, cerrando el sonner (salir usando sidebar)', () => {
    cy.getFormInput('name').type('CropName');
    cy.navigateToModuleWithSideBar('crops');
    cy.checkMessageLostFormData();
    cy.clickOnCloseToast();
    cy.url().should('include', cropsRoutes.create());
  });

  it('Debe volver a la tabla de los cultivos al cancelar la creación de un cultivo', () => {
    cy.clickOnCancelRegisterButton();
    cy.url().should('include', cropsRoutes.listAll());
  });

  it('Debe volver a la tabla de los cultivos al cancelar la creación de un cultivo (con campos rellenados)', () => {
    cy.getFormInput('name').type('CropName');

    cy.clickOnCancelRegisterButton();
    cy.checkMessageLostFormData();
    cy.clickOnIgnoreButton();
    cy.url().should('include', cropsRoutes.listAll());
  });

  it('Comprobar navegación del breadcrumb', () => {
    cy.get('a[data-testid="breadcrumb-link-item-cultivos"]').click();
    cy.url().should('include', cropsRoutes.listAll());
  });

  it('Comprobar navegación del breadcrumb (con campos rellenados)', () => {
    cy.getFormInput('name').type('CropName');
    cy.get('a[data-testid="breadcrumb-link-item-cultivos"]').click();
    cy.checkMessageLostFormData();
    cy.clickOnIgnoreButton();
    cy.url().should('include', cropsRoutes.listAll());
  });
});

describe('Modificación de cultivos', () => {
  let currentCrop: any = {};

  before(() => {
    cy.executeClearSeedData({ crops: true });
    cy.createCrop({}, { fastCreation: true }).then((data) => {
      currentCrop = { ...data };
    });
  });

  beforeEach(() => {
    cy.loginUser();
    cy.visit(cropsRoutes.update(currentCrop.id));
    cy.wait(3000);
  });

  it('Comprobar que se cargue la información del cultivo antes de modificarlo', () => {
    cy.getFormInput('name').should('have.value', currentCrop.name);
    cy.getFormInput('number_hectares').should(
      'have.value',
      currentCrop.number_hectares
    );
    cy.getFormInput('units').should('have.value', currentCrop.units);
    cy.getFormTextArea('location').should('have.value', currentCrop.location);
    cy.getFormTextArea('description').should(
      'have.value',
      currentCrop.description
    );

    cy.get('button[data-testid="btn-calendar-selector"]').first().click();
    cy.selectCalendarMonth(2);
    cy.selectCalendarYear(2024);
    cy.selectCalendarDay(3);

    cy.get('button[data-testid="btn-calendar-selector"]').eq(1).click();
    cy.selectCalendarMonth(7);
    cy.selectCalendarYear(2026);
    cy.selectCalendarDay(11);
    // cy.getFormInput('date_of_creation').should('have.value', currentCrop.date_of_creation);
    // cy.getFormInput('date_of_termination').should('have.value', currentCrop.date_of_termination);
  });

  it('Modificar cultivo existente', () => {
    cy.navigateToModuleWithSideBar('crops');
    cy.clickRefetchButton();
    cy.clickActionsButtonTableRow(currentCrop.id);
    cy.clickOnUpdateRecord();
    cy.wait(3000);
    cy.getFormInput('name').clear().type('CropNameChanged');
    cy.getFormInput('number_hectares').clear().type('15');
    cy.getFormInput('units').clear().type('1600');
    cy.getFormTextArea('location').clear().type('LocationChanged');
    cy.getFormTextArea('description').clear().type('DescriptionChanged');
    cy.clickOnSubmitButton();
    cy.checkDisabledSubmitButton();
    cy.contains('Cultivo actualizado');
  });

  it('Debe advertir al usuario antes de salir del formulario si hay campos rellenados (salir usando sidebar)', () => {
    cy.getFormInput('name').type('CropName');
    cy.navigateToModuleWithSideBar('crops');
    cy.checkMessageLostFormData();
  });

  it('Debe permitir al usuario salir del formulario incluso si hay campos rellenados, presionando "Ignorar" (salir usando sidebar)', () => {
    cy.getFormInput('name').type('CropName');
    cy.navigateToModuleWithSideBar('crops');
    cy.checkMessageLostFormData();
    cy.clickOnIgnoreButton();
    cy.url().then((currentUrl) => {
      expect(currentUrl).to.not.include(cropsRoutes.update(currentCrop.id));
    });
  });

  it('No debe permitir al usuario salir del formulario cuando hay campos rellenados, cerrando el sonner (salir usando sidebar)', () => {
    cy.getFormInput('name').type('CropName');
    cy.navigateToModuleWithSideBar('crops');
    cy.checkMessageLostFormData();
    cy.clickOnCloseToast();
    cy.url().should('include', cropsRoutes.update(currentCrop.id));
  });

  it('Debe volver a la tabla de los cultivos al cancelar la modificación de un cultivo', () => {
    cy.clickOnCancelRegisterButton();
    cy.url().should('include', cropsRoutes.listAll());
  });

  it('Debe volver a la tabla de los cultivos al cancelar la modificación de un cultivo (con campos rellenados)', () => {
    cy.getFormInput('name').type('CropName');
    cy.getFormInput('number_hectares').type('15');
    cy.getFormInput('units').type('1600');
    cy.getFormTextArea('location').type('LocationChanged');
    cy.getFormTextArea('description').type('DescriptionChanged');
    cy.clickOnCancelRegisterButton();
    cy.checkMessageLostFormData();
    cy.clickOnIgnoreButton();
    cy.url().should('include', cropsRoutes.listAll());
  });

  it('Comprobar navegación del breadcrumb', () => {
    cy.get('a[data-testid="breadcrumb-link-item-cultivos"]').click();
    cy.url().should('include', cropsRoutes.listAll());
  });

  it('Comprobar navegación del breadcrumb (con campos rellenados)', () => {
    cy.getFormInput('name').type('CropName');
    cy.get('a[data-testid="breadcrumb-link-item-cultivos"]').click();
    cy.checkMessageLostFormData();
    cy.clickOnIgnoreButton();
    cy.url().should('include', cropsRoutes.listAll());
  });
});

describe('Eliminación de cultivo', () => {
  let currentCrop: any = {};

  before(() => {
    cy.executeClearSeedData({ crops: true });
    cy.createCrop({}, { fastCreation: true }).then((data) => {
      currentCrop = { ...data };
    });
  });

  beforeEach(() => {
    cy.loginUser();
  });

  it('Eliminar cultivo', () => {
    cy.navigateToModuleWithSideBar('crops');
    cy.clickActionsButtonTableRow(currentCrop.id);
    cy.clickOnDeleteRecord();
    cy.clickOnContinueDeleteOneRecord();
    cy.contains('Cultivo eliminado');
  });

  it('Intentar eliminar cultivo con stock disponible', () => {
    cy.executeClearSeedData({ crops: true });

    cy.createSale({ fastCreation: true, returnOnlySale: false }).then(
      (data) => {
        cy.navigateToModuleWithSideBar('crops');
        cy.log(JSON.stringify(data, null, 2));
        const { crop } = data;

        cy.clickActionsButtonTableRow(crop.id);
        cy.clickOnDeleteRecord();
        cy.clickOnContinueDeleteOneRecord();
        cy.contains(
          'No fue posible eliminar el cultivo seleccionado. Verifica que no tenga stock disponible ni ventas con pagos pendientes antes de intentar eliminarlo'
        );
      }
    );
  });
});

describe('Eliminación de cultivos por lote', () => {
  beforeEach(() => {
    cy.executeClearSeedData({ crops: true });
    cy.loginUser();
    cy.navigateToModuleWithSideBar('crops');
    cy.clickRefetchButton();
  });

  it('Eliminar cultivos seleccionados', () => {
    for (let index = 0; index < 5; index++) {
      cy.createCrop({}, { fastCreation: true });
    }
    cy.clickRefetchButton();
    cy.toggleSelectAllTableRows();
    cy.clickOnDeleteBulkButton();
    cy.clickOnContinueDeleteBulkRecord();
    cy.checkLoadingInformation();
    cy.contains('Los registros seleccionados fueron eliminados');
    cy.checkNoRecordsMessage();
  });

  it('Intentar eliminar cultivos con stock disponible', () => {
    cy.createSale({ fastCreation: true, returnOnlySale: false });
    cy.navigateToModuleWithSideBar('crops');
    cy.clickRefetchButton();
    cy.toggleSelectAllTableRows();
    cy.clickOnDeleteBulkButton();
    cy.clickOnContinueDeleteBulkRecord();
    cy.contains(
      'No fue posible eliminar los cultivos seleccionados. Verifica que no tengan stock disponible ni ventas con pagos pendientes antes de intentar eliminarlos'
    );
  });

  it('Eliminar cultivos que tienen conflicto de eliminación y los que no tienen', () => {
    cy.createCrop({}, { fastCreation: true });
    cy.createSale({ fastCreation: true, returnOnlySale: false });
    cy.navigateToModuleWithSideBar('crops');
    cy.clickRefetchButton();
    cy.toggleSelectAllTableRows();
    cy.clickOnDeleteBulkButton();
    cy.clickOnContinueDeleteBulkRecord();
    cy.contains(
      'No fue posible eliminar algunos cultivos seleccionados. Verifica que no tengan stock disponible ni ventas con pagos pendientes antes de intentar eliminarlos'
    );
  });
});

describe('Copiar Id de registro', () => {
  it('Copiar Id del cultivo', () => {
    cy.executeClearSeedData({ crops: true });
    cy.createCrop({}, { fastCreation: true }).then((currentCrop) => {
      cy.loginUser();
      cy.navigateToModuleWithSideBar('crops');
      cy.wait(500);
      cy.clickActionsButtonTableRow(currentCrop.id);
      cy.clickOnCopyIdButton();
    });
  });
});

describe('Ver registro de cultivo', () => {
  it('Ver registro de cultivo', () => {
    cy.executeClearSeedData({ crops: true });
    cy.createCrop({}, { fastCreation: true }).then((currentCrop) => {
      cy.loginUser();
      cy.navigateToModuleWithSideBar('crops');
      cy.wait(500);
      cy.clickActionsButtonTableRow(currentCrop.id);
      cy.clickOnViewRecord();
      cy.getFormInput('name').should('have.value', currentCrop.name);
      cy.getFormInput('number_hectares').should(
        'have.value',
        currentCrop.number_hectares
      );
      cy.getFormInput('units').should('have.value', currentCrop.units);
      cy.getFormTextArea('location').should('have.value', currentCrop.location);
      cy.getFormTextArea('description').should(
        'have.value',
        currentCrop.description
      );
      cy.contains('Información');
      cy.contains('Volver');
    });
  });

  it('Consultar registro con id no valido', () => {
    cy.loginUser();
    cy.visit(cropsRoutes.view('no-id'));
    // cy.checkFormInputsAreEmpty();
    cy.checkMessageIncorrectInformation();
    cy.contains('Información');
    cy.contains('Volver');
  });

  it('Consultar registro con id inexistente', () => {
    cy.loginUser();
    cy.visit(cropsRoutes.view(TEST_UUID_VALID));
    // cy.checkFormInputsAreEmpty();
    cy.checkMessageNotFoundInformation();
    cy.contains('Información');
    cy.contains('Volver');
  });

  // TODO: Crear casos de prueba para observar las tablas de registro donde esta involucrado
});

describe('Paginado y selectores', () => {
  before(() => {
    cy.executeClearSeedData({ crops: true });
    cy.executeSeed({ crops: 25 });
  });

  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('crops');
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

// TODO: Implementar pruebas
describe('Cambiar unidad de medida para mostrar el stock de los cultivos', () => {
  before(() => {
    cy.executeClearSeedData({ crops: true });
    cy.loginUser();
    cy.intercept(
      'GET',
      'http://localhost:3000/crops/all?query=&limit=10&offset=0&all_records=false',
      {
        statusCode: 200,
        body: cropsData,
      }
    );
    cy.navigateToModuleWithSideBar('crops');
    cy.wait(2000);
  });

  it('Debe mostrar el inventario en la tabla de cultivos de acuerdo a la unidad de medida seleccionada', () => {
    cy.clickOnMassUnitOfMeasureButton();
    cy.selectSelectOption('GRAMOS');

    // Evaluar
    // Obtiene el primer tr y verifica si contiene el número 850.000,00
    cy.get('tbody tr')
      .first()
      .within(() => {
        cy.get('span[data-testid="span-amount"]').should(
          'contain.text',
          '850.000,00'
        );
        cy.get('div[data-testid="badge-unit-of-measure"]').should(
          'have.text',
          'g'
        );
      });

    cy.get('tbody tr')
      .eq(1)
      .within(() => {
        cy.get('span[data-testid="span-amount"]').should(
          'have.text',
          '550.000,00'
        );
        cy.get('div[data-testid="badge-unit-of-measure"]').should(
          'have.text',
          'g'
        );
      });

    cy.get('tbody tr')
      .eq(2)
      .within(() => {
        cy.get('span[data-testid="span-amount"]').should(
          'have.text',
          '100.000,00'
        );
        cy.get('div[data-testid="badge-unit-of-measure"]').should(
          'have.text',
          'g'
        );
      });

    cy.clickOnMassUnitOfMeasureButton();
    cy.selectSelectOption('KILOGRAMOS');

    cy.get('tbody tr')
      .first()
      .within(() => {
        cy.get('span[data-testid="span-amount"]').should('have.text', '850,00');
        cy.get('div[data-testid="badge-unit-of-measure"]').should(
          'have.text',
          'kg'
        );
      });

    cy.get('tbody tr')
      .eq(1)
      .within(() => {
        cy.get('span[data-testid="span-amount"]').should('have.text', '550,00');
        cy.get('div[data-testid="badge-unit-of-measure"]').should(
          'have.text',
          'kg'
        );
      });

    cy.get('tbody tr')
      .eq(2)
      .within(() => {
        cy.get('span[data-testid="span-amount"]').should('have.text', '100,00');
        cy.get('div[data-testid="badge-unit-of-measure"]').should(
          'have.text',
          'kg'
        );
      });

    // Validación para ONZAS
    cy.clickOnMassUnitOfMeasureButton();
    cy.selectSelectOption('ONZAS');

    cy.get('tbody tr')
      .first()
      .within(() => {
        cy.get('span[data-testid="span-amount"]').should(
          'contain.text',
          '29.982'
        );
        cy.get('div[data-testid="badge-unit-of-measure"]').should(
          'have.text',
          'oz'
        );
      });

    cy.get('tbody tr')
      .eq(1)
      .within(() => {
        cy.get('span[data-testid="span-amount"]').should(
          'contain.text',
          '19.400'
        );
        cy.get('div[data-testid="badge-unit-of-measure"]').should(
          'have.text',
          'oz'
        );
      });

    cy.get('tbody tr')
      .eq(2)
      .within(() => {
        cy.get('span[data-testid="span-amount"]').should(
          'contain.text',
          '3527'
        );
        cy.get('div[data-testid="badge-unit-of-measure"]').should(
          'have.text',
          'oz'
        );
      });

    // Validación para LIBRAS
    cy.clickOnMassUnitOfMeasureButton();
    cy.selectSelectOption('LIBRAS');

    cy.get('tbody tr')
      .first()
      .within(() => {
        cy.get('span[data-testid="span-amount"]').should(
          'contain.text',
          '1873'
        );
        cy.get('div[data-testid="badge-unit-of-measure"]').should(
          'have.text',
          'lb'
        );
      });

    cy.get('tbody tr')
      .eq(1)
      .within(() => {
        cy.get('span[data-testid="span-amount"]').should(
          'contain.text',
          '1212'
        );
        cy.get('div[data-testid="badge-unit-of-measure"]').should(
          'have.text',
          'lb'
        );
      });

    cy.get('tbody tr')
      .eq(2)
      .within(() => {
        cy.get('span[data-testid="span-amount"]').should('contain.text', '220');
        cy.get('div[data-testid="badge-unit-of-measure"]').should(
          'have.text',
          'lb'
        );
      });

    // Validación para TONELADAS
    cy.clickOnMassUnitOfMeasureButton();
    cy.selectSelectOption('TONELADAS');

    cy.get('tbody tr')
      .first()
      .within(() => {
        cy.get('span[data-testid="span-amount"]').should(
          'contain.text',
          '0,85'
        );
        cy.get('div[data-testid="badge-unit-of-measure"]').should(
          'have.text',
          't'
        );
      });

    cy.get('tbody tr')
      .eq(1)
      .within(() => {
        cy.get('span[data-testid="span-amount"]').should(
          'contain.text',
          '0,55'
        );
        cy.get('div[data-testid="badge-unit-of-measure"]').should(
          'have.text',
          't'
        );
      });

    cy.get('tbody tr')
      .eq(2)
      .within(() => {
        cy.get('span[data-testid="span-amount"]').should(
          'contain.text',
          '0,10'
        );
        cy.get('div[data-testid="badge-unit-of-measure"]').should(
          'have.text',
          't'
        );
      });
  });
});

describe('Auth modulo de cultivos', () => {
  let currentCrop: any = {};

  before(() => {
    cy.executeClearSeedData({ crops: true });
    cy.createCrop({}, { fastCreation: true }).then((data) => {
      currentCrop = { ...data };
    });
  });

  it('Crear usuario con acceso unicamente al modulo de cultivos', () => {
    cy.createSeedUser({ modules: ['crops'] }, (userData) => {
      cy.log(userData);
      cy.loginUser(userData.email, userData.password);
      cy.wait(1500);

      cy.checkSidebarMenuItem('Cultivos');

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

      cy.clickActionsButtonTableRow(currentCrop.id);

      cy.checkActionButtonsState({ update: true, view: true, delete: true });

      // Certificar
    });
  });

  it('Crear usuario con acceso unicamente a ver tabla de cultivos', () => {
    cy.createSeedUser({ actions: ['find_all_crops'] }, (userData) => {
      cy.wait(2000);
      cy.log(userData);
      cy.loginUser(userData.email, userData.password);
      cy.wait(1500);

      cy.checkSidebarMenuItem('Cultivos');

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

      cy.clickActionsButtonTableRow(currentCrop.id);

      // Certificar

      cy.checkActionButtonsState({
        update: false,
        view: false,
        delete: false,
      });
    });
  });

  it('No tiene permisos para ver el listado de cultivos', () => {
    cy.createSeedUser({ actions: ['create_crop'] }, (userData) => {
      cy.loginUser(userData.email, userData.password);
      cy.wait(1500);
      cy.checkSidebarMenuItem('Cultivos');
      cy.openCommandPaletteAndSelectFirstOption();

      cy.wait(2000);
      cy.contains('No tienes permiso para ver el listado de cultivos');
      cy.checkRefetchButtonState(false);

      cy.checkSearchBarIsDisabled();
    });
  });

  it('Debe sacar al usuario si intenta crear un cultivo y no tiene permisos ', () => {
    cy.createSeedUser({ actions: ['find_all_crops'] }, (data: any) => {
      cy.loginUser(data.email, data.password);
      cy.wait(1500);

      cy.checkSidebarMenuItem('Cultivos');
      cy.openCommandPaletteAndSelectFirstOption();

      cy.wait(2000);

      cy.visit(cropsRoutes.create());
      cy.shouldBeRedirectedForNoPermission();
    });
  });

  it('Debe sacar al usuario si intenta modificar a un cultivo y no tiene permisos', () => {
    cy.createSeedUser({ actions: ['find_all_crops'] }, (userData: any) => {
      cy.loginUser(userData.email, userData.password);
      cy.wait(1500);
      cy.checkSidebarMenuItem('Cultivos');
      cy.openCommandPaletteAndSelectFirstOption();

      cy.visit(cropsRoutes.update(currentCrop.id));
      cy.shouldBeRedirectedForNoPermission();
    });
  });

  it('Debe sacar al usuario si intenta consultar a un cultivo y no tiene permisos', () => {
    cy.createSeedUser({ actions: ['find_all_crops'] }, (data: any) => {
      cy.loginUser(data.email, data.password);
      cy.wait(1500);
      cy.checkSidebarMenuItem('Cultivos');
      cy.openCommandPaletteAndSelectFirstOption();

      cy.visit(cropsRoutes.view(currentCrop.id));
      cy.shouldBeRedirectedForNoPermission();
    });
  });
});
