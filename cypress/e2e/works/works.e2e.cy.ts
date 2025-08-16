import 'cypress-real-events/support';
import { BASE_HOME_PAGE_URL, TEST_UUID_VALID } from 'cypress/helpers/constants';
import { worksRoutes } from './works-routes';
import { InformationGenerator } from 'cypress/helpers/InformationGenerator';
import { FormatMoneyValue } from 'cypress/helpers/formatting/FormatMoneyValue';
// import { worksData } from './data/get-all-works.data';

describe('Comprobar existencia de elementos en el modulo de trabajos', () => {
  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('works');
  });

  it('Debe ingresar a la ruta correcta ', () => {
    cy.contains('Trabajos');
    cy.checkCurrentUrl(worksRoutes.listAll());
  });

  it('Debe contener los elementos necesarios', () => {
    // TODO: Comprobar existencia de barra de búsqueda

    cy.existRefetchButton();
    cy.existCreateButton();

    cy.existPaginationInfo();

    cy.contains('Fecha:');
    cy.contains('Cultivo:');
    cy.contains('Empleados:');
    cy.contains('Descripción:');
    cy.contains('Valor a pagar:');
    cy.contains('¿Hay pagos pendientes?');

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
    cy.openCommandPaletteAndSelect('trabajos', 'works');
    cy.checkCurrentUrl(worksRoutes.listAll());
  });
});

describe('Encuentra registros de acuerdo a los filtros de búsqueda', () => {
  before(() => {
    cy.executeClearSeedData({ works: true });
    for (let i = 0; i < 2; i++) {
      cy.createWork({ fastCreation: true });
      cy.createWork({ fastCreation: true });
    }
  });

  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('works');
  });

  it('Debe buscar la trabajos por un cultivo en especifico', () => {
    cy.openCommandField('crop');
    cy.selectCommandOption('0');
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
        cy.get('button[data-testid="btn-remove-filter-crop"]')
          .should('exist')
          .click();
      });
    cy.checkTableRowTotal('4');
  });

  it('Debe buscar la trabajos por un empleado en especifico', () => {
    cy.wait(1500);
    cy.get('button[data-testid="btn-works-filters"]').click();

    cy.get('div[data-testid="filter-employees"]').click();

    /* cy.openCommandField('employee'); */
    cy.get(`button[data-testid="btn-open-command-employee"]`).click();

    cy.selectCommandOption('0');

    cy.get('div[data-testid="filter-employees"]').click();
    cy.get('button[data-testid="button-filter-employees-apply"]').click();
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
        cy.get('button[data-testid="btn-remove-filter-employees"]')
          .should('exist')
          .click();
      });
    cy.checkTableRowTotal('4');
  });

  it('Debe buscar la trabajos por una fecha (fecha actual)', () => {
    cy.wait(1500);
    cy.get('button[data-testid="btn-works-filters"]').click();

    cy.get('div[data-testid="filter-date"]').click();

    cy.openSelectField();
    // cy.wait(2000);
    cy.selectSelectOption('EQUAL');

    cy.get('div[data-testid="filter-date"]').click();

    cy.get('button[data-testid="btn-calendar-selector"]').click();
    cy.selectCalendarDay(new Date().getDate());

    cy.get('div[data-testid="filter-date"]').click();

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

  it('Debe buscar la trabajos por una fecha (fecha anterior)', () => {
    cy.wait(1500);
    cy.get('button[data-testid="btn-works-filters"]').click();

    cy.get('div[data-testid="filter-date"]').click();

    cy.openSelectField();
    cy.selectSelectOption('BEFORE');

    cy.get('div[data-testid="filter-date"]').click();

    cy.get('button[data-testid="btn-calendar-selector"]').click();
    cy.selectCalendarDay(new Date().getDate());

    cy.get('div[data-testid="filter-date"]').click();

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

  it('Debe buscar la trabajos por una fecha (fecha posterior)', () => {
    cy.wait(1500);
    cy.get('button[data-testid="btn-works-filters"]').click();

    cy.get('div[data-testid="filter-date"]').click();

    cy.openSelectField();
    cy.selectSelectOption('AFTER');

    cy.get('div[data-testid="filter-date"]').click();

    cy.get('button[data-testid="btn-calendar-selector"]').click();
    cy.selectCalendarDay(new Date().getDate());

    cy.get('div[data-testid="filter-date"]').click();

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

  it('Debe buscar la trabajos por un valor (igual a)', () => {
    cy.wait(1500);
    cy.get('button[data-testid="btn-works-filters"]').click();

    cy.get('div[data-testid="filter-value-pay"]').click();

    cy.get(
      'button[data-testid="btn-select-field"][data-name="filter_by_value_pay.type_filter_value_pay"]'
    ).click();
    cy.selectSelectOption('EQUAL');

    cy.get('div[data-testid="filter-value-pay"]').click();

    cy.getFormInput('filter_by_value_pay.value_pay').clear();

    cy.get('div[data-testid="filter-value-pay"]').click();
    cy.getFormInput('filter_by_value_pay.value_pay').type('270000');

    cy.get('div[data-testid="filter-value-pay"]').click();

    cy.get('button[data-testid="button-filter-value-pay-apply"]').click();
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
        cy.get('button[data-testid="btn-remove-filter-value_pay"]')
          .should('exist')
          .click();
      });
    cy.checkTableRowTotal('4');
  });

  it('Debe buscar la trabajos por un valor (mayor a)', () => {
    cy.wait(1500);
    cy.get('button[data-testid="btn-works-filters"]').click();

    cy.get('div[data-testid="filter-value-pay"]').click();

    cy.get(
      'button[data-testid="btn-select-field"][data-name="filter_by_value_pay.type_filter_value_pay"]'
    ).click();
    cy.selectSelectOption('GREATER_THAN');

    cy.get('div[data-testid="filter-value-pay"]').click();

    cy.getFormInput('filter_by_value_pay.value_pay').clear();

    cy.get('div[data-testid="filter-value-pay"]').click();
    cy.getFormInput('filter_by_value_pay.value_pay').type('270000');

    cy.get('div[data-testid="filter-value-pay"]').click();

    cy.get('button[data-testid="button-filter-value-pay-apply"]').click();
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
        cy.get('button[data-testid="btn-remove-filter-value_pay"]')
          .should('exist')
          .click();
      });
    cy.checkTableRowTotal('4');
  });

  it('Debe buscar la trabajos por un valor (mayor a)', () => {
    cy.wait(1500);
    cy.get('button[data-testid="btn-works-filters"]').click();

    cy.get('div[data-testid="filter-value-pay"]').click();

    cy.get(
      'button[data-testid="btn-select-field"][data-name="filter_by_value_pay.type_filter_value_pay"]'
    ).click();
    cy.selectSelectOption('LESS_THAN');

    cy.get('div[data-testid="filter-value-pay"]').click();

    cy.getFormInput('filter_by_value_pay.value_pay').clear();

    cy.get('div[data-testid="filter-value-pay"]').click();
    cy.getFormInput('filter_by_value_pay.value_pay').type('270000');

    cy.get('div[data-testid="filter-value-pay"]').click();

    cy.get('button[data-testid="button-filter-value-pay-apply"]').click();
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
        cy.get('button[data-testid="btn-remove-filter-value_pay"]')
          .should('exist')
          .click();
      });
    cy.checkTableRowTotal('4');
  });
});

describe('Creación de trabajos', () => {
  before(() => {
    cy.executeClearSeedData({ works: true, crops: true, employees: true });
    for (let i = 0; i < 2; i++) {
      cy.createCrop({}, { fastCreation: true });
      cy.createEmployee({}, { fastCreation: true });
    }
  });

  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('works');
    cy.wait(700);
    cy.clickOnCreateButton();
  });

  it('Debe crear un trabajo', () => {
    cy.openCalendar();

    cy.selectCalendarMonth(4);
    cy.selectCalendarYear(2025);
    cy.selectCalendarDay(19);

    // Seleccionar cultivo
    cy.openCommandField('crop');
    cy.selectCommandOption('0');

    // Añadir descripción
    cy.getFormTextArea('description').type(
      InformationGenerator.generateDescription()
    );

    // Abrir formulario interno
    cy.openWorkDetailForm();

    // Seleccionar empleado
    cy.openCommandField('employee');
    cy.selectCommandOption('0');

    cy.get('form[id="formWorkDetail"]').within(() => {
      cy.get('input[name="value_pay"]').clear().type('60000');
    });

    cy.clickOnSubmitWorkDetailForm();

    // Abrir formulario interno
    cy.openWorkDetailForm();

    // Seleccionar empleado
    cy.openCommandField('employee');
    cy.selectCommandOption('0');

    cy.get('form[id="formWorkDetail"]').within(() => {
      cy.get('input[name="value_pay"]').clear().type('50000');
    });

    cy.clickOnSubmitWorkDetailForm();

    // Validar totales
    cy.get('div[data-testid="badge-value-pay"]').contains('$ 110.000');

    cy.clickOnSubmitButton();
    cy.checkDisabledSubmitButton();
    cy.contains('Trabajo creado');
  });

  it('Debe mostrar mensajes de error al intentar enviar el formulario vacío', () => {
    cy.clickOnSubmitButton();
    cy.contains('La fecha es un campo obligatorio');
    cy.contains('La opción seleccionada no es valida.');
    cy.contains('Debes registrar el trabajo de al menos 1 empleado');
    cy.checkMessageFieldsMissing();

    // Abrir formulario interno
    cy.openWorkDetailForm();
    cy.clickOnSubmitWorkDetailForm();
    cy.contains('El empleado es un campo obligatorio');
    cy.contains('El valor a pagar debe ser un número positivo.');
    cy.checkMessageFieldsMissing();
  });

  it('Debe advertir al usuario antes de salir del formulario si hay campos rellenados (salir usando sidebar)', () => {
    cy.getFormTextArea('description').type('Simple observación...');
    cy.navigateToModuleWithSideBar('works');
    cy.checkMessageLostFormData();
    cy.clickOnCloseToast();
    cy.wait(500);
    // Abrir formulario interno
    cy.openWorkDetailForm();
    cy.get('form[id="formWorkDetail"]').within(() => {
      cy.get('input[name="value_pay"]').clear().type('55000');
    });
    cy.clickOnCloseFormDialog();
    cy.checkMessageLostFormData();
  });

  it('Debe permitir al usuario salir del formulario incluso si hay campos rellenados, presionando "Ignorar" (salir usando sidebar)', () => {
    cy.getFormTextArea('description').type('Simple observación...');
    cy.navigateToModuleWithSideBar('works');
    cy.checkMessageLostFormData();
    cy.clickOnIgnoreButton();
    cy.wait(500);
    cy.url().then((currentUrl) => {
      expect(currentUrl).to.not.include(worksRoutes.create());
    });
    cy.clickOnCreateButton();
    cy.wait(500);
    cy.openWorkDetailForm();
    cy.get('form[id="formWorkDetail"]').within(() => {
      cy.get('input[name="value_pay"]').clear().type('55000');
    });
    cy.clickOnCloseFormDialog();
    cy.checkMessageLostFormData();
    cy.clickOnIgnoreButton();
    cy.checkCurrentUrl(worksRoutes.create());
    cy.checkDialogIsNotVisible();
  });

  it('No debe permitir al usuario salir del formulario cuando hay campos rellenados, cerrando el sonner (salir usando sidebar)', () => {
    cy.getFormTextArea('description').type('Simple observación...');
    cy.navigateToModuleWithSideBar('works');
    cy.checkMessageLostFormData();
    cy.clickOnCloseToast();
    cy.wait(500);
    cy.checkCurrentUrl(worksRoutes.create());

    cy.openWorkDetailForm();
    cy.get('form[id="formWorkDetail"]').within(() => {
      cy.get('input[name="value_pay"]').clear().type('55000');
    });
    cy.clickOnCloseFormDialog();
    cy.checkMessageLostFormData();
    cy.clickOnCloseToast();

    cy.checkDialogIsVisible();
  });

  it('Debe volver a la tabla de los trabajos al cancelar la creación de un trabajo', () => {
    cy.clickOnCancelRegisterButton();
    cy.url().should('include', worksRoutes.listAll());
  });

  it('Debe volver a la tabla de los trabajos al cancelar la creación de un trabajo (con campos rellenados)', () => {
    cy.getFormTextArea('description').type('Simple observación...');

    cy.clickOnCancelRegisterButton();
    cy.checkMessageLostFormData();
    cy.clickOnIgnoreButton();
    cy.url().should('include', worksRoutes.listAll());
  });

  it('Comprobar navegación del breadcrumb', () => {
    cy.get('a[data-testid="breadcrumb-link-item-trabajos"]').click();
    cy.url().should('include', worksRoutes.listAll());
  });

  it('Comprobar navegación del breadcrumb (con campos rellenados)', () => {
    cy.getFormTextArea('description').type('Simple observación...');
    cy.get('a[data-testid="breadcrumb-link-item-trabajos"]').click();
    cy.checkMessageLostFormData();
    cy.clickOnIgnoreButton();
    cy.url().should('include', worksRoutes.listAll());
  });
});

describe('Modificación de trabajos', () => {
  let currentCrop: any = {};
  let currentWork: any = {};
  let currentEmployees: any = {};

  before(() => {
    cy.executeClearSeedData({ works: true });
    cy.createWork({
      fastCreation: true,
      returnOnlyWork: false,
    }).then((data) => {
      currentWork = { ...data.work };
      currentCrop = { ...data.crop };
      currentEmployees = { ...data.employees };
    });
  });

  beforeEach(() => {
    cy.loginUser();
    cy.visit(worksRoutes.update(currentWork.id));
    cy.wait(3000);
  });

  it('Comprobar que se cargue la información del trabajo antes de modificarla', () => {
    cy.get('button[data-testid="btn-calendar-selector"]').should(
      'have.attr',
      'data-value',
      new Date(currentWork.date).toISOString().split('T')[0]
    );
    cy.get('button[data-testid="btn-open-command-crop"]')
      .should('have.attr', 'data-value', currentCrop.id)
      .contains(currentCrop.name);
    cy.getFormTextArea('description').should(
      'have.value',
      currentWork.description
    );

    // Comprobar datos de la tabla

    for (let i = 0; i < currentWork.details.length; i++) {
      cy.checkTableRowValues(currentWork.details[i].id, [
        currentEmployees[i].first_name,
        currentEmployees[i].last_name,
        FormatMoneyValue(currentWork.details[i].value_pay).split('$')[1].trim(),
      ]);
    }

    // Validar totales
    cy.get('div[data-testid="badge-value-pay"]').contains('$ 270.000');
  });

  it('Modificar trabajo existente', () => {
    cy.navigateToModuleWithSideBar('works');
    cy.clickRefetchButton();
    cy.clickActionsButtonTableRow(currentWork.id);
    cy.clickOnUpdateRecord();
    cy.wait(3000);

    cy.openCalendar();

    cy.selectCalendarMonth(4);
    cy.selectCalendarYear(2025);
    cy.selectCalendarDay(19);

    // Seleccionar cultivo
    cy.openCommandField('crop');
    cy.selectCommandOption('0');

    cy.getFormTextArea('description').clear().type('DescriptionChanged...');

    // Abrir formulario interno
    cy.clickActionsButtonTableRow(currentWork.details[0].id);
    cy.clickOnUpdateDetailRecord();
    cy.wait(3000);

    cy.get('form[id="formWorkDetail"]').within(() => {
      cy.get('input[name="value_pay"]').clear().type('120000');
    });
    cy.clickOnSubmitWorkDetailForm();
    cy.wait(3000);
    cy.clickActionsButtonTableRow(currentWork.details[1].id);
    cy.clickOnUpdateDetailRecord();
    cy.wait(3000);

    cy.get('form[id="formWorkDetail"]').within(() => {
      cy.get('input[name="value_pay"]').clear().type('120000');
    });
    cy.clickOnSubmitWorkDetailForm();
    cy.wait(3000);
    cy.clickActionsButtonTableRow(currentWork.details[2].id);
    cy.clickOnUpdateDetailRecord();
    cy.wait(3000);

    cy.get('form[id="formWorkDetail"]').within(() => {
      cy.get('input[name="value_pay"]').clear().type('120000');
    });
    cy.clickOnSubmitWorkDetailForm();
    cy.wait(3000);

    cy.get('div[data-testid="badge-value-pay"]').contains('$ 360.000');

    cy.clickOnSubmitButton();
    cy.checkDisabledSubmitButton();
    cy.contains('Trabajo actualizado');
  });

  it('Debe advertir al usuario antes de salir del formulario si hay campos rellenados (salir usando sidebar)', () => {
    cy.getFormTextArea('description').clear().type('DescriptionChanged');
    cy.navigateToModuleWithSideBar('works');
    cy.checkMessageLostFormData();
  });

  it('Debe permitir al usuario salir del formulario incluso si hay campos rellenados, presionando "Ignorar" (salir usando sidebar)', () => {
    cy.getFormTextArea('description').clear().type('DescriptionChanged');
    cy.navigateToModuleWithSideBar('works');
    cy.checkMessageLostFormData();
    cy.clickOnIgnoreButton();
    cy.url().then((currentUrl) => {
      expect(currentUrl).to.not.include(worksRoutes.update(currentWork.id));
    });
  });

  it('No debe permitir al usuario salir del formulario cuando hay campos rellenados, cerrando el sonner (salir usando sidebar)', () => {
    cy.getFormTextArea('description').clear().type('DescriptionChanged');
    cy.navigateToModuleWithSideBar('works');
    cy.checkMessageLostFormData();
    cy.clickOnCloseToast();
    cy.url().should('include', worksRoutes.update(currentWork.id));
  });

  it('Debe volver a la tabla de los trabajos al cancelar la modificación de un trabajo', () => {
    cy.clickOnCancelRegisterButton();
    cy.url().should('include', worksRoutes.listAll());
  });

  it('Debe volver a la tabla de los trabajos al cancelar la modificación de un trabajo (con campos rellenados)', () => {
    cy.getFormTextArea('description').clear().type('DescriptionChanged');

    cy.clickOnCancelRegisterButton();
    cy.checkMessageLostFormData();
    cy.clickOnIgnoreButton();
    cy.url().should('include', worksRoutes.listAll());
  });

  it('Comprobar navegación del breadcrumb', () => {
    cy.get('a[data-testid="breadcrumb-link-item-trabajos"]').click();
    cy.url().should('include', worksRoutes.listAll());
  });

  it('Comprobar navegación del breadcrumb (con campos rellenados)', () => {
    cy.getFormTextArea('description').clear().type('DescriptionChanged');
    cy.get('a[data-testid="breadcrumb-link-item-trabajos"]').click();
    cy.checkMessageLostFormData();
    cy.clickOnIgnoreButton();
    cy.url().should('include', worksRoutes.listAll());
  });
});

describe('Eliminación de trabajo', () => {
  let currentWork: any = {};

  before(() => {
    cy.executeClearSeedData({ works: true });
    cy.createWork({ fastCreation: true }).then((data) => {
      currentWork = { ...data };
    });
  });

  beforeEach(() => {
    cy.loginUser();
  });

  it('Eliminar trabajo', () => {
    cy.navigateToModuleWithSideBar('works');
    cy.clickActionsButtonTableRow(currentWork.id);
    cy.clickOnDeleteRecord();
    cy.clickOnContinueDeleteOneRecord();
    cy.contains('Trabajo eliminado');
  });

  it('Intentar eliminar trabajo con registros pagos', () => {
    // cy.executeClearSeedData({ works: true });
    // cy.createWork({ fastCreation: true, returnOnlyWork: false }).then(
    //   (data) => {
    //     const { work, crop } = data;
    //     cy.createHarvestProcessed({
    //       cropId: crop.id,
    //       harvestId: work.id,
    //       amount: 100,
    //     });
    //     cy.navigateToModuleWithSideBar('works');
    //     cy.wait(5000);
    //     cy.clickActionsButtonTableRow(work.id);
    //     cy.clickOnDeleteRecord();
    //     cy.clickOnContinueDeleteOneRecord();
    //     cy.contains(
    //       'No se pudo eliminar la trabajo seleccionada, revisa que no tenga registros pagos o registros de trabajo procesada'
    //     );
    //   }
    // );
  });

  // TODO: Intentar eliminar trabajos con registros pagos
});

describe('Eliminación de trabajos por lote', () => {
  beforeEach(() => {
    cy.executeClearSeedData({ works: true });
    cy.loginUser();
    cy.navigateToModuleWithSideBar('works');
    cy.clickRefetchButton();
  });

  it('Eliminar trabajos seleccionados', () => {
    for (let index = 0; index < 5; index++) {
      cy.createWork({ fastCreation: true });
    }
    cy.clickRefetchButton();
    cy.wait(3000);
    cy.toggleSelectAllTableRows();
    cy.clickOnDeleteBulkButton();
    cy.clickOnContinueDeleteBulkRecord();
    cy.checkLoadingInformation();
    cy.contains('Los registros seleccionados fueron eliminados');
    cy.checkNoRecordsMessage();
  });

  it('Intentar eliminar trabajos con pagos realizados', () => {
    // cy.createWork({ fastCreation: true, returnOnlyWork: false }).then(
    //   (data) => {
    //     const { work, crop } = data;
    //     cy.createHarvestProcessed({
    //       cropId: crop.id,
    //       harvestId: work.id,
    //       amount: 100,
    //     });
    //     cy.navigateToModuleWithSideBar('works');
    //     cy.clickRefetchButton();
    //     cy.wait(3000);
    //     cy.toggleSelectAllTableRows();
    //     cy.clickOnDeleteBulkButton();
    //     cy.clickOnContinueDeleteBulkRecord();
    //     cy.contains(
    //       'No se pudieron eliminar las trabajos seleccionadas, revisa que no tengan registros pagos o registros de trabajo procesada'
    //     );
    //   }
    // );
  });

  it('Eliminar trabajos que tienen conflicto de eliminación y los que no tienen', () => {
    //   cy.executeClearSeedData({ works: true });
    //   cy.createWork({ fastCreation: true });
    //   cy.createWork({ fastCreation: true, returnOnlyHarvest: false }).then(
    //     (data) => {
    //       const { work, crop } = data;
    //       cy.createHarvestProcessed({
    //         cropId: crop.id,
    //         harvestId: work.id,
    //         amount: 100,
    //         unitOfMeasure: 'KILOGRAMOS',
    //       });
    //       cy.navigateToModuleWithSideBar('works');
    //       cy.clickRefetchButton();
    //       cy.wait(3000);
    //       cy.toggleSelectAllTableRows();
    //       cy.clickOnDeleteBulkButton();
    //       cy.clickOnContinueDeleteBulkRecord();
    //       cy.contains(
    //         'No se pudieron eliminar algunas trabajos, revisa que no tengan registros pagos o registros de trabajo procesada'
    //       );
    //     }
    //   );
  });
});

describe('Exportar trabajo a PDF', () => {
  before(() => {
    cy.executeClearSeedData({ works: true });
  });

  it('Generar reporte de trabajo', () => {
    cy.loginUser();
    cy.createWork({ fastCreation: true, returnOnlyWork: true }).then(
      (currentWork) => {
        cy.navigateToModuleWithSideBar('works');
        cy.clickActionsButtonTableRow(currentWork.id);
        cy.get('button[data-testid="btn-download-pdf"]').click();
        cy.contains('Generando documento PDF...');
        cy.contains('El documento ha sido generado con éxito.');
        const expectedFileName = `reporte-trabajo-${currentWork.id}.pdf`;
        const downloadsFolder =
          Cypress.config('downloadsFolder') || 'cypress/downloads';

        cy.readFile(`${downloadsFolder}/${expectedFileName}`, {
          timeout: 10000,
        }).should('exist');
      }
    );
  });
});

describe('Copiar Id de registro', () => {
  it('Copiar Id del trabajo', () => {
    cy.executeClearSeedData({ works: true });
    cy.createWork({ fastCreation: true }).then((currentWork) => {
      cy.loginUser();
      cy.navigateToModuleWithSideBar('works');
      cy.wait(500);
      cy.clickActionsButtonTableRow(currentWork.id);
      cy.clickOnCopyIdButton();
    });
  });
});

describe('Ver registro de trabajo', () => {
  it('Ver registro de trabajo', () => {
    cy.loginUser();
    cy.executeClearSeedData({ works: true });
    cy.createWork({
      fastCreation: true,
      returnOnlyWork: false,
    }).then((data) => {
      const {
        work: currentWork,
        crop: currentCrop,
        employees: currentEmployees,
      } = data;

      cy.navigateToModuleWithSideBar('works');
      cy.wait(500);
      cy.clickActionsButtonTableRow(currentWork.id);
      cy.clickOnViewRecord();
      cy.get('button[data-testid="btn-calendar-selector"]').should(
        'have.attr',
        'data-value',
        new Date(currentWork.date).toISOString().split('T')[0]
      );
      cy.get('button[data-testid="btn-open-command-crop"]')
        .should('have.attr', 'data-value', currentCrop.id)
        .contains(currentCrop.name);
      cy.getFormTextArea('description').should(
        'have.value',
        currentWork.description
      );

      // Comprobar datos de la tabla

      for (let i = 0; i < currentWork.details.length; i++) {
        cy.checkTableRowValues(currentWork.details[i].id, [
          currentEmployees[i].first_name,
          currentEmployees[i].last_name,

          FormatMoneyValue(currentWork.details[i].value_pay)
            .split('$')[1]
            .trim(),
        ]);
      }

      // Validar totales
      cy.get('div[data-testid="badge-value-pay"]').contains('$ 270.000');
      cy.contains('Información');
      cy.contains('Volver');
    });
  });

  it('Consultar registro con id no valido', () => {
    cy.loginUser();
    cy.visit(worksRoutes.view('no-id'));
    cy.checkMessageIncorrectInformation();
    cy.contains('Información');
    cy.contains('Volver');
  });

  it('Consultar registro con id inexistente', () => {
    cy.loginUser();
    cy.visit(worksRoutes.view(TEST_UUID_VALID));
    cy.checkMessageNotFoundInformation();
    cy.contains('Información');
    cy.contains('Volver');
  });
});

describe('Paginado y selectores', () => {
  before(() => {
    cy.executeClearSeedData({ works: true });
    cy.executeSeed({ works: { quantity: 25 } });
  });

  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('works');
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

describe('Auth modulo de trabajos', () => {
  let currentWork: any = {};

  before(() => {
    cy.executeClearSeedData({ works: true });
    cy.createWork({ fastCreation: true }).then((data) => {
      currentWork = { ...data };
    });
  });

  it('Crear usuario con acceso unicamente al modulo de trabajos', () => {
    cy.createSeedUser({ modules: ['works'] }, (userData) => {
      cy.log(userData);
      cy.loginUser(userData.email, userData.password);
      cy.wait(1500);

      cy.checkSidebarMenuItem('Trabajos');

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

      cy.clickActionsButtonTableRow(currentWork.id);

      cy.checkActionButtonsState({ update: true, view: true, delete: true });
    });
  });

  it('Crear usuario con acceso unicamente a ver tabla de trabajos', () => {
    cy.createSeedUser({ actions: ['find_all_works'] }, (userData) => {
      cy.wait(2000);
      cy.log(userData);
      cy.loginUser(userData.email, userData.password);
      cy.wait(1500);

      cy.checkSidebarMenuItem('Trabajos');

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

      cy.clickActionsButtonTableRow(currentWork.id);

      // Certificar

      cy.checkActionButtonsState({
        update: false,
        view: false,
        delete: false,
      });
    });
  });

  it('No tiene permisos para ver el listado de trabajos', () => {
    cy.createSeedUser({ actions: ['create_work'] }, (userData) => {
      cy.loginUser(userData.email, userData.password);
      cy.wait(1500);
      cy.checkSidebarMenuItem('Trabajos');
      cy.openCommandPaletteAndSelectFirstOption();

      cy.wait(2000);
      cy.contains('No tienes permiso para ver el listado de los trabajos');
      cy.checkRefetchButtonState(false);

      // cy.checkSearchBarIsDisabled();
    });
  });

  it('Debe sacar al usuario si intenta crear un trabajo y no tiene permisos ', () => {
    cy.createSeedUser({ actions: ['find_all_works'] }, (data: any) => {
      cy.loginUser(data.email, data.password);
      cy.wait(1500);

      cy.checkSidebarMenuItem('Trabajos');
      cy.openCommandPaletteAndSelectFirstOption();

      cy.wait(2000);

      cy.visit(worksRoutes.create());
      cy.shouldBeRedirectedForNoPermission();
    });
  });

  it('Debe sacar al usuario si intenta modificar a un trabajo y no tiene permisos', () => {
    cy.createSeedUser({ actions: ['find_all_works'] }, (userData: any) => {
      cy.loginUser(userData.email, userData.password);
      cy.wait(1500);
      cy.checkSidebarMenuItem('Trabajos');
      cy.openCommandPaletteAndSelectFirstOption();

      cy.visit(worksRoutes.update(currentWork.id));
      cy.shouldBeRedirectedForNoPermission();
    });
  });

  it('Debe sacar al usuario si intenta consultar a un trabajo y no tiene permisos', () => {
    cy.createSeedUser({ actions: ['find_all_works'] }, (data: any) => {
      cy.loginUser(data.email, data.password);
      cy.wait(1500);
      cy.checkSidebarMenuItem('Trabajos');
      cy.openCommandPaletteAndSelectFirstOption();

      cy.visit(worksRoutes.view(currentWork.id));
      cy.shouldBeRedirectedForNoPermission();
    });
  });
});
