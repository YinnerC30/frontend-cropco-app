import { BASE_HOME_PAGE_URL, TEST_UUID_VALID } from 'cypress/helpers/constants';
import { consumptionsRoutes } from './consumptions-routes';
import { FormatNumber } from 'cypress/helpers/formatting/FormatNumber';

describe('Comprobar existencia de elementos en el modulo de consumos', () => {
  before(() => {
    cy.createConsumption({ fastCreation: true });
  });

  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('consumptions');
  });

  it('Debe ingresar a la ruta correcta', () => {
    cy.contains('Consumos');
    cy.checkCurrentUrl(consumptionsRoutes.listAll());
  });

  it('Debe contener los elementos necesarios', () => {
    cy.existRefetchButton();
    cy.existCreateButton();

    cy.existPaginationInfo();

    cy.contains('Fecha:');
    cy.contains('Cultivos:');
    cy.contains('Insumos:');

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

    cy.wait(1000);
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
    cy.openCommandPaletteAndSelect('consumos', 'consumptions');
    cy.checkCurrentUrl(consumptionsRoutes.listAll());
  });
});

describe('Encuentra registros de acuerdo a los filtros de búsqueda', () => {
  before(() => {
    cy.executeClearSeedData({ consumptionSupplies: true });
    for (let i = 0; i < 2; i++) {
      cy.createConsumption({ fastCreation: true });
      cy.createConsumption({ fastCreation: true });
    }
  });

  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('consumptions');
  });

  it('Debe buscar la consumos por una fecha (fecha actual)', () => {
    cy.wait(1500);
    cy.get('button[data-testid="btn-filter-date"]').click();

    cy.openSelectField();

    cy.selectSelectOption('EQUAL');

    cy.get('button[data-testid="btn-filter-date"]').click();

    cy.get('button[data-testid="btn-calendar-selector"]').click();

    cy.selectCalendarDay(new Date().getDate());

    cy.get('button[data-testid="button-filter-date-apply"]').click();
    cy.wait(2000);

    cy.existPaginationInfo();
    cy.checkTableRowsExist();
    cy.checkTableRowTotal('4');

    // Persiste a la recarga manual de la pestaña
    cy.reload();
    cy.existPaginationInfo();
    cy.checkTableRowsExist();
    cy.checkTableRowTotal('4');

    cy.get('div[data-testid="filters-badged-list"]')
      .should('exist')
      .within(() => {
        cy.get('button[data-testid="btn-remove-filter-date"]')
          .should('exist')
          .click();
      });
    cy.checkTableRowTotal('4');
  });

  it('Debe buscar la consumos por una fecha (fecha anterior)', () => {
    cy.wait(1500);
    cy.get('button[data-testid="btn-filter-date"]').click();

    cy.openSelectField();
    cy.selectSelectOption('BEFORE');

    cy.get('button[data-testid="btn-calendar-selector"]').click();
    cy.selectCalendarDay(new Date().getDate());

    cy.get('button[data-testid="button-filter-date-apply"]').click();
    cy.wait(2000);

    cy.existPaginationInfo();
    cy.checkTableRowsExist();
    cy.checkTableRowTotal('0');

    // Persiste a la recarga manual de la pestaña
    cy.reload();
    cy.existPaginationInfo();
    cy.checkTableRowsExist();
    cy.checkTableRowTotal('0');

    cy.get('div[data-testid="filters-badged-list"]')
      .should('exist')
      .within(() => {
        cy.get('button[data-testid="btn-remove-filter-date"]')
          .should('exist')
          .click();
      });
    cy.checkTableRowTotal('4');
  });

  it('Debe buscar la consumos por una fecha (fecha posterior)', () => {
    cy.wait(1500);
    cy.get('button[data-testid="btn-filter-date"]').click();

    cy.openSelectField();
    cy.selectSelectOption('AFTER');

    cy.get('button[data-testid="btn-calendar-selector"]').click();
    cy.selectCalendarDay(new Date().getDate());

    cy.get('button[data-testid="button-filter-date-apply"]').click();
    cy.wait(2000);

    cy.existPaginationInfo();
    cy.checkTableRowsExist();
    cy.checkTableRowTotal('0');

    // Persiste a la recarga manual de la pestaña
    cy.reload();
    cy.existPaginationInfo();
    cy.checkTableRowsExist();
    cy.checkTableRowTotal('0');

    cy.get('div[data-testid="filters-badged-list"]')
      .should('exist')
      .within(() => {
        cy.get('button[data-testid="btn-remove-filter-date"]')
          .should('exist')
          .click();
      });
    cy.checkTableRowTotal('4');
  });

  it('Debe buscar la consumos por un cultivo en especifico', () => {
    cy.wait(1500);
    cy.get('button[data-testid="btn-consumption-filters"]').click();

    cy.get('div[data-testid="filter-crops"]').click();

    cy.get(`button[data-testid="btn-open-command-crop"]`).click();

    cy.selectCommandOption('0', true);

    cy.get('button[data-testid="button-filter-crops-apply"]').click();
    cy.wait(2000);

    cy.existPaginationInfo();
    cy.checkTableRowsExist();
    cy.checkTableRowTotal('1');

    // Persiste a la recarga manual de la pestaña
    cy.reload();
    cy.existPaginationInfo();
    cy.checkTableRowsExist();
    cy.checkTableRowTotal('1');

    cy.get('div[data-testid="filters-badged-list"]')
      .should('exist')
      .within(() => {
        cy.get('button[data-testid="btn-remove-filter-crops"]')
          .should('exist')
          .click();
      });
    cy.checkTableRowTotal('4');
  });

  it('Debe buscar la consumos por un insumo en especifico', () => {
    cy.wait(1500);
    cy.get('button[data-testid="btn-consumption-filters"]').click();

    cy.get('div[data-testid="filter-supplies"]').click();

    cy.get(`button[data-testid="btn-open-command-supply"]`).click();

    cy.selectCommandOption('0', true);

    cy.get('button[data-testid="button-filter-supplies-apply"]').click();
    cy.wait(2000);

    cy.existPaginationInfo();
    cy.checkTableRowsExist();
    cy.checkTableRowTotal('1');

    // Persiste a la recarga manual de la pestaña
    cy.reload();
    cy.existPaginationInfo();
    cy.checkTableRowsExist();
    cy.checkTableRowTotal('1');

    cy.get('div[data-testid="filters-badged-list"]')
      .should('exist')
      .within(() => {
        cy.get('button[data-testid="btn-remove-filter-supplies"]')
          .should('exist')
          .click();
      });
    cy.checkTableRowTotal('4');
  });
});

describe('Creación de consumos', () => {
  before(() => {
    cy.executeClearSeedData({
      consumptionSupplies: true,
      supplies: true,
      suppliers: true,
    });
    for (let i = 0; i < 2; i++) {
      cy.createConsumption({ fastCreation: true });
      cy.createCrop({}, { fastCreation: true });
    }
  });

  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('consumptions');
    cy.wait(700);
    cy.clickOnCreateButton();
  });

  it('Debe crear un consumo', () => {
    cy.openCalendar();

    cy.selectCalendarMonth(4);
    cy.selectCalendarYear(2025);
    cy.selectCalendarDay(19);

    // Abrir formulario interno
    cy.openConsumptionDetailForm();

    // Seleccionar cultivo
    cy.openCommandField('crop');
    cy.selectCommandOption('0');

    // Seleccionar insumo
    cy.openCommandField('supply');
    cy.selectCommandOption('0');

    cy.openSelectField();
    cy.get(`div[role="option"]`).eq(1).click();

    cy.get('form[id="formConsumptionDetail"]').within(() => {
      cy.get('input[name="amount"]').clear().type('2');
    });

    cy.clickOnSubmitConsumptionDetailForm();

    // Abrir formulario interno
    cy.openConsumptionDetailForm();

    // Seleccionar cultivo
    cy.openCommandField('crop');
    cy.selectCommandOption('1');

    // Seleccionar insumo
    cy.openCommandField('supply');
    cy.selectCommandOption('1');

    cy.openSelectField();
    cy.get(`div[role="option"]`).eq(1).click();

    cy.get('form[id="formConsumptionDetail"]').within(() => {
      cy.get('input[name="amount"]').clear().type('2');
    });

    cy.clickOnSubmitConsumptionDetailForm();

    cy.intercept('POST', 'http://localhost:3000/consumptions/create').as(
      'postConsumption'
    );

    cy.clickOnSubmitButton();
    cy.checkDisabledSubmitButton();
    cy.contains('Consumo de insumos registrado');

    // Capturar la respuesta

    // cy.wait('@postConsumption').then((interception: any) => {
    //   // Aquí tienes acceso a la respuesta de la API
    //   const responseBody = interception.response.body;

    //   //TODO: Comprobar valor de stock de insumos

    //   // Insumo 1
    //   cy.visit(suppliesRoutes.view(responseBody.details[0].supply.id));
    //   cy.wait(5000);

    //   // Insumo 2
    //   cy.visit(suppliesRoutes.view(responseBody.details[1].supply.id));
    //   cy.wait(5000);
    // });

    // Comprobar que se añadio la cantidad correspondiente
  });

  it('Debe mostrar mensajes de error al intentar enviar el formulario vacío', () => {
    cy.clickOnSubmitButton();
    cy.contains('La fecha es un campo obligatorio');

    cy.contains('Debes registrar el consumo de al menos 1 insumo');

    cy.checkMessageFieldsMissing();

    // Abrir formulario interno
    cy.openConsumptionDetailForm();
    cy.clickOnSubmitConsumptionDetailForm();

    cy.contains('El cultivo es un campo obligatorio');
    cy.contains('El insumo es un campo obligatorio');
    cy.contains('Debe seleccionar una unidad de medida.');
    cy.contains('El valor a consumir debe ser un número positivo.');
    cy.checkMessageFieldsMissing();
  });

  it('Debe advertir al usuario antes de salir del formulario si hay campos rellenados (salir usando sidebar)', () => {
    cy.openCalendar();

    cy.selectCalendarMonth(4);
    cy.selectCalendarYear(2025);
    cy.selectCalendarDay(19);

    cy.navigateToModuleWithSideBar('consumptions');
    cy.checkMessageLostFormData();
    cy.clickOnCloseToast();
    cy.wait(500);
    // Abrir formulario interno
    cy.openConsumptionDetailForm();
    cy.get('form[id="formConsumptionDetail"]').within(() => {
      cy.get('input[name="amount"]').clear().type('2');
    });
    cy.clickOnCloseFormDialog();
    cy.checkMessageLostFormData();
  });

  it('Debe permitir al usuario salir del formulario incluso si hay campos rellenados, presionando "Ignorar" (salir usando sidebar)', () => {
    cy.openCalendar();

    cy.selectCalendarMonth(4);
    cy.selectCalendarYear(2025);
    cy.selectCalendarDay(19);

    cy.navigateToModuleWithSideBar('consumptions');
    cy.checkMessageLostFormData();
    cy.clickOnIgnoreButton();
    cy.wait(500);
    cy.url().then((currentUrl) => {
      expect(currentUrl).to.not.include(consumptionsRoutes.create());
    });
    cy.clickOnCreateButton();
    cy.wait(500);
    cy.openConsumptionDetailForm();
    cy.get('form[id="formConsumptionDetail"]').within(() => {
      cy.get('input[name="amount"]').clear().type('2');
    });
    cy.clickOnCloseFormDialog();
    cy.checkMessageLostFormData();
    cy.clickOnIgnoreButton();
    cy.checkCurrentUrl(consumptionsRoutes.create());
    cy.checkDialogIsNotVisible();
  });

  it('No debe permitir al usuario salir del formulario cuando hay campos rellenados, cerrando el sonner (salir usando sidebar)', () => {
    cy.openCalendar();

    cy.selectCalendarMonth(4);
    cy.selectCalendarYear(2025);
    cy.selectCalendarDay(19);

    cy.navigateToModuleWithSideBar('consumptions');
    cy.checkMessageLostFormData();
    cy.clickOnCloseToast();
    cy.wait(500);
    cy.checkCurrentUrl(consumptionsRoutes.create());

    cy.openConsumptionDetailForm();
    cy.get('form[id="formConsumptionDetail"]').within(() => {
      cy.get('input[name="amount"]').clear().type('2');
    });
    cy.clickOnCloseFormDialog();
    cy.checkMessageLostFormData();
    cy.clickOnCloseToast();

    cy.checkDialogIsVisible();
  });

  it('Debe volver a la tabla de los consumos al cancelar la creación de un consumo', () => {
    cy.clickOnCancelRegisterButton();
    cy.url().should('include', consumptionsRoutes.listAll());
  });

  it('Debe volver a la tabla de los consumos al cancelar la creación de un consumo (con campos rellenados)', () => {
    cy.openCalendar();

    cy.selectCalendarMonth(4);
    cy.selectCalendarYear(2025);
    cy.selectCalendarDay(19);

    cy.clickOnCancelRegisterButton();
    cy.checkMessageLostFormData();
    cy.clickOnIgnoreButton();
    cy.url().should('include', consumptionsRoutes.listAll());
  });

  it('Comprobar navegación del breadcrumb', () => {
    cy.get('a[data-testid="breadcrumb-link-item-consumos"]').click();
    cy.url().should('include', consumptionsRoutes.listAll());
  });

  it('Comprobar navegación del breadcrumb (con campos rellenados)', () => {
    cy.openCalendar();

    cy.selectCalendarMonth(4);
    cy.selectCalendarYear(2025);
    cy.selectCalendarDay(19);

    cy.get('a[data-testid="breadcrumb-link-item-consumos"]').click();
    cy.checkMessageLostFormData();
    cy.clickOnIgnoreButton();
    cy.url().should('include', consumptionsRoutes.listAll());
  });
});

describe('Modificación de consumos', () => {
  let currentCrop: any = {};
  let currentConsumption: any = {};
  let currentSupplies: any = [];

  before(() => {
    cy.executeClearSeedData({
      consumptionSupplies: true,
      suppliers: true,
      supplies: true,
    });

    for (let i = 0; i < 2; i++) {
      cy.createSupply({}, { fastCreation: true });
      cy.createSupplier({}, { fastCreation: true });
    }

    cy.createConsumption({
      fastCreation: true,
      returnOnlyConsumption: false,
    }).then((data) => {
      currentConsumption = { ...data.consumption };
      currentCrop = { ...data.crop };
      currentSupplies = [...data.supplies];
    });
  });

  beforeEach(() => {
    cy.loginUser();
    cy.visit(consumptionsRoutes.update(currentConsumption.id));
    cy.wait(3000);
  });

  it('Comprobar que se cargue la información del consumo antes de modificarla', () => {
    cy.get('button[data-testid="btn-calendar-selector"]').should(
      'have.attr',
      'data-value',
      new Date(currentConsumption.date).toISOString().split('T')[0]
    );

    // Comprobar datos de la tabla

    for (let i = 0; i < currentConsumption.details.length; i++) {
      cy.checkTableRowValues(currentConsumption.details[i].id, [
        currentSupplies[i].name,
        currentCrop.name,
        currentConsumption.details[i].unit_of_measure,
        FormatNumber(currentConsumption.details[i].amount),
      ]);
    }
  });

  it('Modificar consumo existente', () => {
    cy.navigateToModuleWithSideBar('consumptions');
    cy.clickRefetchButton();
    cy.clickActionsButtonTableRow(currentConsumption.id);
    cy.clickOnUpdateRecord();
    cy.wait(3000);

    cy.openCalendar();

    cy.selectCalendarMonth(4);
    cy.selectCalendarYear(2025);
    cy.selectCalendarDay(19);

    // Abrir formulario interno
    cy.clickActionsButtonTableRow(currentConsumption.details[0].id);
    cy.clickOnUpdateDetailRecord();
    cy.wait(3000);

    cy.openSelectField();
    cy.get(`div[role="option"]`).eq(1).click();

    cy.get('form[id="formConsumptionDetail"]').within(() => {
      cy.get('input[name="amount"]').clear().type('1');
    });

    cy.clickOnSubmitConsumptionDetailForm();

    cy.clickOnSubmitButton();
    cy.checkDisabledSubmitButton();
    cy.contains('El registro de consumo de insumos ha sido actualizado');

    //TODO: Comprobar valor de stock de insumos
  });

  it('Debe advertir al usuario antes de salir del formulario si hay campos rellenados (salir usando sidebar)', () => {
    cy.openCalendar();

    cy.selectCalendarMonth(4);
    cy.selectCalendarYear(2025);
    cy.selectCalendarDay(19);

    cy.navigateToModuleWithSideBar('consumptions');
    cy.checkMessageLostFormData();
  });

  it('Debe permitir al usuario salir del formulario incluso si hay campos rellenados, presionando "Ignorar" (salir usando sidebar)', () => {
    cy.openCalendar();

    cy.selectCalendarMonth(4);
    cy.selectCalendarYear(2025);
    cy.selectCalendarDay(19);
    cy.navigateToModuleWithSideBar('consumptions');
    cy.checkMessageLostFormData();
    cy.clickOnIgnoreButton();
    cy.url().then((currentUrl) => {
      expect(currentUrl).to.not.include(
        consumptionsRoutes.update(currentConsumption.id)
      );
    });
  });

  it('No debe permitir al usuario salir del formulario cuando hay campos rellenados, cerrando el sonner (salir usando sidebar)', () => {
    cy.openCalendar();

    cy.selectCalendarMonth(4);
    cy.selectCalendarYear(2025);
    cy.selectCalendarDay(19);
    cy.navigateToModuleWithSideBar('consumptions');
    cy.checkMessageLostFormData();
    cy.clickOnCloseToast();
    cy.url().should(
      'include',
      consumptionsRoutes.update(currentConsumption.id)
    );
  });

  it('Debe volver a la tabla de los consumos al cancelar la modificación de un consumo', () => {
    cy.clickOnCancelRegisterButton();
    cy.url().should('include', consumptionsRoutes.listAll());
  });

  it('Debe volver a la tabla de los consumos al cancelar la modificación de un consumo (con campos rellenados)', () => {
    cy.openCalendar();

    cy.selectCalendarMonth(4);
    cy.selectCalendarYear(2025);
    cy.selectCalendarDay(19);

    cy.clickOnCancelRegisterButton();
    cy.checkMessageLostFormData();
    cy.clickOnIgnoreButton();
    cy.url().should('include', consumptionsRoutes.listAll());
  });

  it('Comprobar navegación del breadcrumb', () => {
    cy.get('a[data-testid="breadcrumb-link-item-consumos"]').click();
    cy.url().should('include', consumptionsRoutes.listAll());
  });

  it('Comprobar navegación del breadcrumb (con campos rellenados)', () => {
    cy.openCalendar();

    cy.selectCalendarMonth(4);
    cy.selectCalendarYear(2025);
    cy.selectCalendarDay(19);

    cy.get('a[data-testid="breadcrumb-link-item-consumos"]').click();
    cy.checkMessageLostFormData();
    cy.clickOnIgnoreButton();
    cy.url().should('include', consumptionsRoutes.listAll());
  });
});

describe('Eliminación de consumo', () => {
  let currentConsumption: any = {};

  before(() => {
    cy.executeClearSeedData({ consumptionSupplies: true });
    cy.createConsumption({ fastCreation: true }).then((data) => {
      currentConsumption = { ...data };
    });
  });

  beforeEach(() => {
    cy.loginUser();
  });

  it('Eliminar consumo', () => {
    cy.navigateToModuleWithSideBar('consumptions');
    cy.clickActionsButtonTableRow(currentConsumption.id);
    cy.clickOnDeleteRecord();
    cy.clickOnContinueDeleteOneRecord();
    cy.contains('El registro de consumo de insumos ha sido eliminado');
  });

  it.skip('Intentar eliminar consumo con registros pendientes de pago', () => {
    cy.executeClearSeedData({ consumption: true });
    cy.createConsumption({
      fastCreation: true,
      returnOnlyConsumption: false,
    }).then((data) => {
      const { consumption } = data;

      cy.navigateToModuleWithSideBar('consumptions');
      cy.wait(5000);
      cy.clickActionsButtonTableRow(consumption.id);
      cy.clickOnDeleteRecord();
      cy.clickOnContinueDeleteOneRecord();
      cy.contains(
        'No se pudo eliminar la consumo seleccionada, revisa que no tenga registros pendientes de pago'
      );
    });
  });
});

describe('Eliminación de consumos por lote', () => {
  beforeEach(() => {
    cy.executeClearSeedData({ consumptionSupplies: true });
    cy.loginUser();
    cy.navigateToModuleWithSideBar('consumptions');
    for (let index = 0; index < 5; index++) {
      cy.createConsumption({ fastCreation: true });
    }
    cy.clickRefetchButton();
  });

  it('Eliminar consumos seleccionados', () => {
    cy.wait(3000);
    cy.toggleSelectAllTableRows();
    cy.clickOnDeleteBulkButton();
    cy.clickOnContinueDeleteBulkRecord();
    cy.checkLoadingInformation();
    cy.contains('Los registros seleccionados fueron eliminados');
    cy.checkNoRecordsMessage();
  });

  it.skip('Intentar eliminar consumos con registros pendientes de pago', () => {
    cy.executeClearSeedData({ consumption: true });
    cy.createConsumption({
      fastCreation: true,
      returnOnlyConsumption: false,
    }).then((data) => {
      cy.navigateToModuleWithSideBar('consumptions');
      cy.clickRefetchButton();
      cy.wait(5000);
      cy.toggleSelectAllTableRows();
      cy.clickOnDeleteBulkButton();
      cy.clickOnContinueDeleteBulkRecord();
      // cy.checkLoadingInformation();
      cy.contains(
        'No se pudieron eliminar las consumos seleccionados, revisa que no tenga registros pendientes de pago'
      );
    });
  });

  it.skip('Eliminar consumos que tienen conflicto de eliminación y los que no tienen', () => {
    cy.createConsumption({ fastCreation: true }).then((data) => {
      cy.navigateToModuleWithSideBar('consumptions');
      cy.clickRefetchButton();
      cy.wait(3000);
      cy.toggleSelectAllTableRows();
      cy.clickOnDeleteBulkButton();
      cy.clickOnContinueDeleteBulkRecord();
      cy.contains(
        'No se pudieron eliminar algunas consumos, revisa que no tenga registros pendientes de pago'
      );
    });
  });
});

describe('Copiar Id de registro', () => {
  it('Copiar Id del consumo', () => {
    cy.executeClearSeedData({ consumptionSupplies: true });
    cy.createConsumption({ fastCreation: true }).then((currentConsumption) => {
      cy.loginUser();
      cy.navigateToModuleWithSideBar('consumptions');
      cy.wait(500);
      cy.clickActionsButtonTableRow(currentConsumption.id);
      cy.clickOnCopyIdButton();
    });
  });
});

describe('Ver registro de consumo', () => {
  it('Ver registro de consumo', () => {
    cy.loginUser();
    cy.executeClearSeedData({ consumptionSupplies: true });
    cy.createConsumption({
      fastCreation: true,
      returnOnlyConsumption: false,
    }).then((data) => {
      const {
        consumption: currentConsumption,
        crop: currentCrop,
        supplies: currentSupplies,
      } = data;

      cy.navigateToModuleWithSideBar('consumptions');
      cy.wait(500);
      cy.clickActionsButtonTableRow(currentConsumption.id);
      cy.clickOnViewRecord();
      cy.get('button[data-testid="btn-calendar-selector"]').should(
        'have.attr',
        'data-value',
        new Date(currentConsumption.date).toISOString().split('T')[0]
      );

      // Comprobar datos de la tabla

      for (let i = 0; i < currentConsumption.details.length; i++) {
        cy.checkTableRowValues(currentConsumption.details[i].id, [
          currentCrop.name,
          currentSupplies[i].name,
          currentConsumption.details[i].unit_of_measure,
          FormatNumber(currentConsumption.details[i].amount),
        ]);
      }

      cy.contains('Información');
      cy.contains('Volver');
    });
  });

  it('Consultar registro con id no valido', () => {
    cy.loginUser();
    cy.visit(consumptionsRoutes.view('no-id'));
    cy.checkMessageIncorrectInformation();
    cy.contains('Información');
    cy.contains('Volver');
  });

  it('Consultar registro con id inexistente', () => {
    cy.loginUser();
    cy.visit(consumptionsRoutes.view(TEST_UUID_VALID));
    cy.checkMessageNotFoundInformation();
    cy.contains('Información');
    cy.contains('Volver');
  });
});

describe('Paginado y selectores', () => {
  before(() => {
    cy.executeClearSeedData({ consumptionSupplies: true });
    cy.executeSeed({ consumptions: { quantity: 10 } });
    cy.executeSeed({ consumptions: { quantity: 10 } });
    cy.executeSeed({ consumptions: { quantity: 5 } });
  });

  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('consumptions');
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

describe('Auth modulo de consumos', () => {
  let currentConsumption: any = {};

  before(() => {
    cy.executeClearSeedData({ consumptionSupplies: true });
    cy.createConsumption({ fastCreation: true }).then((data) => {
      currentConsumption = { ...data };
    });
  });

  it('Crear usuario con acceso unicamente al modulo de consumos', () => {
    cy.createSeedUser({ modules: ['consumptions'] }, (userData) => {
      cy.log(userData);
      cy.loginUser(userData.email, userData.password);
      cy.wait(1500);

      cy.checkSidebarMenuItem('Consumos');

      cy.openCommandPaletteAndSelectFirstOption();

      cy.wait(2000);

      // Comprobar que haya registro en las tablas
      cy.checkTableRowsExist();

      // Comprobar habilitación de botones
      // Recarga de datos
      cy.checkRefetchButtonState(true);
      cy.checkCreateButtonState(false);

      // Crear registro

      cy.toggleSelectAllTableRows();
      cy.wait(700);

      // Eliminar bulk
      cy.checkDeleteBulkButtonState(true);

      cy.clickActionsButtonTableRow(currentConsumption.id);

      cy.checkActionButtonsState({ update: true, view: true, delete: true });
    });
  });

  it('Crear usuario con acceso unicamente a ver tabla de consumos', () => {
    cy.createSeedUser(
      { actions: ['find_all_supplies_consumption'] },
      (userData) => {
        cy.wait(2000);
        cy.log(userData);
        cy.loginUser(userData.email, userData.password);
        cy.wait(1500);

        cy.checkSidebarMenuItem('Consumos');

        cy.openCommandPaletteAndSelectFirstOption();

        cy.wait(2000);

        // Comprobar que haya registro en las tablas
        cy.checkTableRowsExist();

        // Comprobar habilitación de botones
        // Recarga de datos
        cy.clickRefetchButton();
        cy.wait(2000);

        cy.checkRefetchButtonState(true);

        // Crear registro
        cy.checkCreateButtonState(true);

        cy.toggleSelectAllTableRows();
        cy.wait(700);

        cy.clickActionsButtonTableRow(currentConsumption.id);

        // Certificar

        cy.checkActionButtonsState({
          update: false,
          view: false,
          delete: false,
        });
      }
    );
  });

  it('No tiene permisos para ver el listado de consumos', () => {
    cy.createSeedUser(
      { actions: ['create_supply_consumption'] },
      (userData) => {
        cy.loginUser(userData.email, userData.password);
        cy.wait(1500);
        cy.checkSidebarMenuItem('Consumos');
        cy.openCommandPaletteAndSelectFirstOption();

        cy.wait(2000);
        cy.contains('No tienes permiso para ver el listado de los consumos');
        cy.checkRefetchButtonState(false);

        // cy.checkSearchBarIsDisabled();
      }
    );
  });

  it('Debe sacar al usuario si intenta crear un consumo y no tiene permisos ', () => {
    cy.createSeedUser(
      { actions: ['find_all_supplies_consumption'] },
      (data: any) => {
        cy.loginUser(data.email, data.password);
        cy.wait(1500);

        cy.checkSidebarMenuItem('Consumos');
        cy.openCommandPaletteAndSelectFirstOption();

        cy.wait(2000);

        cy.visit(consumptionsRoutes.create());
        cy.shouldBeRedirectedForNoPermission();
      }
    );
  });

  it('Debe sacar al usuario si intenta modificar a un consumo y no tiene permisos', () => {
    cy.createSeedUser(
      { actions: ['find_all_supplies_consumption'] },
      (userData: any) => {
        cy.loginUser(userData.email, userData.password);
        cy.wait(1500);
        cy.checkSidebarMenuItem('Consumos');
        cy.openCommandPaletteAndSelectFirstOption();

        cy.visit(consumptionsRoutes.update(currentConsumption.id));
        cy.shouldBeRedirectedForNoPermission();
      }
    );
  });

  it('Debe sacar al usuario si intenta consultar a un consumo y no tiene permisos', () => {
    cy.createSeedUser(
      { actions: ['find_all_supplies_consumption'] },
      (data: any) => {
        cy.loginUser(data.email, data.password);
        cy.wait(1500);
        cy.checkSidebarMenuItem('Consumos');
        cy.openCommandPaletteAndSelectFirstOption();

        cy.visit(consumptionsRoutes.view(currentConsumption.id));
        cy.shouldBeRedirectedForNoPermission();
      }
    );
  });
});
