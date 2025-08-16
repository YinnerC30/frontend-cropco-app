import 'cypress-real-events/support';
import { BASE_HOME_PAGE_URL, TEST_UUID_VALID } from 'cypress/helpers/constants';
import { salesRoutes } from './sales-routes';
import { FormatMoneyValue } from 'cypress/helpers/formatting/FormatMoneyValue';
import { FormatNumber } from 'cypress/helpers/formatting/FormatNumber';

describe('Comprobar existencia de elementos en el modulo de ventas', () => {
  before(() => {
    cy.createSale({ fastCreation: true });
  });

  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('sales');
  });

  it('Debe ingresar a la ruta correcta ', () => {
    cy.contains('Ventas');
    cy.checkCurrentUrl(salesRoutes.listAll());
  });

  it('Debe contener los elementos necesarios', () => {
    // TODO: Comprobar existencia de barra de búsqueda

    cy.existRefetchButton();
    cy.existCreateButton();

    cy.existPaginationInfo();

    cy.contains('Fecha:');
    cy.contains('Clientes:');
    cy.contains('Cultivos:');
    cy.contains('Cantidad:');
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
    cy.openCommandPaletteAndSelect('ventas', 'sales');
    cy.checkCurrentUrl(salesRoutes.listAll());
  });
});

describe.only('Encuentra registros de acuerdo a los filtros de búsqueda', () => {
  before(() => {
    cy.executeClearSeedData({ sales: true });
    for (let i = 0; i < 2; i++) {
      cy.createSale({ fastCreation: true });
      cy.createSale({ fastCreation: true });
    }
  });

  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('sales');
  });

  it('Debe buscar la ventas por una fecha (fecha actual)', () => {
    cy.wait(1500);
    cy.get('button[data-testid="btn-filter-date"]').click();

    cy.openSelectField();

    cy.selectSelectOption('EQUAL');

    cy.get('button[data-testid="btn-filter-date"]').click();

    cy.get('button[data-testid="btn-calendar-selector"]').click();

    cy.wait(4000);

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

  it('Debe buscar la ventas por una fecha (fecha anterior)', () => {
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

  it('Debe buscar la ventas por una fecha (fecha posterior)', () => {
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

  it('Debe buscar la ventas por un cliente en especifico', () => {
    cy.wait(1500);
    cy.get('button[data-testid="btn-sales-filters"]').click();

    cy.get('div[data-testid="filter-clients"]').click();

    cy.get(`button[data-testid="btn-open-command-client"]`).click();

    cy.selectCommandOption('0', true);

    cy.get('div[data-testid="filter-clients"]').click();

    cy.get('button[data-testid="button-filter-clients-apply"]').click();
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
        cy.get('button[data-testid="btn-remove-filter-clients"]')
          .should('exist')
          .click();
      });
    cy.checkTableRowTotal('4');
  });

  it.only('Debe buscar la ventas por un cultivo en especifico', () => {
    cy.wait(1500);
    cy.get('button[data-testid="btn-sales-filters"]').click();

    cy.get('div[data-testid="filter-crops"]').click();

    cy.get(`button[data-testid="btn-open-command-crop"]`).click();

    cy.selectCommandOption('0', true);

    cy.get('div[data-testid="filter-crops"]').click();

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

  it('Debe buscar la ventas por un monto (igual a)', () => {
    cy.wait(1500);
    cy.get('button[data-testid="btn-sales-filters"]').click();

    cy.get('div[data-testid="filter-amount"]').click();

    cy.get(
      'button[data-testid="btn-select-field"][data-name="filter_by_amount.type_filter_amount"]'
    ).click();
    cy.selectSelectOption('EQUAL');

    cy.get('div[data-testid="filter-amount"]').click();

    cy.getFormInput('filter_by_amount.amount').clear();

    cy.get('div[data-testid="filter-amount"]').click();
    cy.getFormInput('filter_by_amount.amount').type('15');

    cy.get('div[data-testid="filter-amount"]').click();

    cy.get('button[data-testid="button-filter-amount-apply"]').click();
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
        cy.get('button[data-testid="btn-remove-filter-amount"]')
          .should('exist')
          .click();
      });
    cy.checkTableRowTotal('4');
  });

  it('Debe buscar la ventas por un monto (mayor a)', () => {
    cy.wait(1500);
    cy.get('button[data-testid="btn-sales-filters"]').click();

    cy.get('div[data-testid="filter-amount"]').click();

    cy.get(
      'button[data-testid="btn-select-field"][data-name="filter_by_amount.type_filter_amount"]'
    ).click();
    cy.selectSelectOption('GREATER_THAN');

    cy.get('div[data-testid="filter-amount"]').click();

    cy.getFormInput('filter_by_amount.amount').clear();

    cy.get('div[data-testid="filter-amount"]').click();
    cy.getFormInput('filter_by_amount.amount').type('15');

    cy.get('div[data-testid="filter-amount"]').click();

    cy.get('button[data-testid="button-filter-amount-apply"]').click();
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
        cy.get('button[data-testid="btn-remove-filter-amount"]')
          .should('exist')
          .click();
      });
    cy.checkTableRowTotal('4');
  });

  it('Debe buscar la ventas por un monto (menor a)', () => {
    cy.wait(1500);
    cy.get('button[data-testid="btn-sales-filters"]').click();

    cy.get('div[data-testid="filter-amount"]').click();

    cy.get(
      'button[data-testid="btn-select-field"][data-name="filter_by_amount.type_filter_amount"]'
    ).click();
    cy.selectSelectOption('LESS_THAN');

    cy.get('div[data-testid="filter-amount"]').click();

    cy.getFormInput('filter_by_amount.amount').clear();

    cy.get('div[data-testid="filter-amount"]').click();
    cy.getFormInput('filter_by_amount.amount').type('15');

    cy.get('div[data-testid="filter-amount"]').click();

    cy.get('button[data-testid="button-filter-amount-apply"]').click();
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
        cy.get('button[data-testid="btn-remove-filter-amount"]')
          .should('exist')
          .click();
      });
    cy.checkTableRowTotal('4');
  });

  it('Debe buscar la ventas por un valor (igual a)', () => {
    cy.wait(1500);
    cy.get('button[data-testid="btn-sales-filters"]').click();

    cy.get('div[data-testid="filter-value-pay"]').click();

    cy.getFormInput('filter_by_value_pay.value_pay').clear();

    cy.get('div[data-testid="filter-value-pay"]').click();

    cy.getFormInput('filter_by_value_pay.value_pay').type('10000');

    cy.get('div[data-testid="filter-value-pay"]').click();

    cy.get(
      'button[data-testid="btn-select-field"][data-name="filter_by_value_pay.type_filter_value_pay"]'
    ).click();
    cy.selectSelectOption('EQUAL');

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

  it('Debe buscar la ventas por un valor (mayor a)', () => {
    cy.wait(1500);
    cy.get('button[data-testid="btn-sales-filters"]').click();

    cy.get('div[data-testid="filter-value-pay"]').click();

    cy.get(
      'button[data-testid="btn-select-field"][data-name="filter_by_value_pay.type_filter_value_pay"]'
    ).click();
    cy.selectSelectOption('GREATER_THAN');

    cy.get('div[data-testid="filter-value-pay"]').click();

    cy.getFormInput('filter_by_value_pay.value_pay').clear();

    cy.get('div[data-testid="filter-value-pay"]').click();
    cy.getFormInput('filter_by_value_pay.value_pay').type('50000');

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

  it('Debe buscar la ventas por un valor (menor a)', () => {
    cy.wait(1500);
    cy.get('button[data-testid="btn-sales-filters"]').click();

    cy.get('div[data-testid="filter-value-pay"]').click();

    cy.get(
      'button[data-testid="btn-select-field"][data-name="filter_by_value_pay.type_filter_value_pay"]'
    ).click();
    cy.selectSelectOption('LESS_THAN');

    cy.get('div[data-testid="filter-value-pay"]').click();

    cy.getFormInput('filter_by_value_pay.value_pay').clear();

    cy.get('div[data-testid="filter-value-pay"]').click();
    cy.getFormInput('filter_by_value_pay.value_pay').type('10000');

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

describe('Creación de ventas', () => {
  before(() => {
    cy.executeClearSeedData({ sales: true, crops: true, clients: true });
    for (let i = 0; i < 2; i++) {
      cy.createHarvest({
        fastCreation: true,
        returnOnlyHarvest: false,
        unitOfMeasure: 'KILOGRAMOS',
      }).then((data) => {
        const { harvest, crop } = data;

        cy.createHarvestProcessed({
          cropId: crop.id,
          harvestId: harvest.id,
          amount: 100,
          unitOfMeasure: 'KILOGRAMOS',
        });
      });
      cy.createClient({}, { fastCreation: true });
    }
  });

  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('sales');
    cy.wait(700);
    cy.clickOnCreateButton();
  });

  it('Debe crear un venta', () => {
    cy.openCalendar();

    cy.selectCalendarMonth(4);
    cy.selectCalendarYear(2025);
    cy.selectCalendarDay(19);

    // Abrir formulario interno
    cy.openSaleDetailForm();

    // Seleccionar empleado
    cy.openCommandField('client');
    cy.selectCommandOption('0');

    // Seleccionar cultivo
    cy.openCommandField('crop');
    cy.selectCommandOption('0');

    cy.get('form[id="formSaleDetail"]').within(() => {
      cy.get('input[name="amount"]').clear().type('25');
    });

    cy.get('form[id="formSaleDetail"]').within(() => {
      cy.get('input[name="value_pay"]').clear().type('60000');
    });

    cy.clickOnSubmitSaleDetailForm();

    // Abrir formulario interno
    cy.openSaleDetailForm();

    // Seleccionar cliente
    cy.openCommandField('client');
    cy.selectCommandOption('1');

    // Seleccionar cultivo
    cy.openCommandField('crop');
    cy.selectCommandOption('1');

    cy.get('form[id="formSaleDetail"]').within(() => {
      cy.get('input[name="amount"]').clear().type('20');
    });

    cy.get('form[id="formSaleDetail"]').within(() => {
      cy.get('input[name="value_pay"]').clear().type('50000');
    });

    cy.clickOnSubmitSaleDetailForm();

    // Validar totales
    cy.get('div[data-testid="badge-value-pay"]').contains('$ 110.000');
    cy.get('div[data-testid="badge-amount"]').contains('45,00');

    cy.clickOnSubmitButton();
    cy.checkDisabledSubmitButton();
    cy.contains('Venta creada');
  });

  it('Debe mostrar mensajes de error al intentar enviar el formulario vacío', () => {
    cy.clickOnSubmitButton();
    cy.contains('La fecha es un campo obligatorio');

    cy.contains('Debes registrar la venta de al menos 1 cliente');

    cy.checkMessageFieldsMissing();

    // Abrir formulario interno
    cy.openSaleDetailForm();
    cy.clickOnSubmitSaleDetailForm();

    cy.contains('El cliente es un campo obligatorio');
    cy.contains('El cultivo es un campo obligatorio');
    cy.contains('La cantidad a vender debe ser un número positivo.');
    cy.contains('El valor a pagar debe ser un número positivo.');
    cy.checkMessageFieldsMissing();
  });

  it('Debe advertir al usuario antes de salir del formulario si hay campos rellenados (salir usando sidebar)', () => {
    cy.openCalendar();

    cy.selectCalendarMonth(4);
    cy.selectCalendarYear(2025);
    cy.selectCalendarDay(19);

    cy.navigateToModuleWithSideBar('sales');
    cy.checkMessageLostFormData();
    cy.clickOnCloseToast();
    cy.wait(500);
    // Abrir formulario interno
    cy.openSaleDetailForm();
    cy.get('form[id="formSaleDetail"]').within(() => {
      cy.get('input[name="value_pay"]').clear().type('55000');
    });
    cy.clickOnCloseFormDialog();
    cy.checkMessageLostFormData();
  });

  it('Debe permitir al usuario salir del formulario incluso si hay campos rellenados, presionando "Ignorar" (salir usando sidebar)', () => {
    cy.openCalendar();

    cy.selectCalendarMonth(4);
    cy.selectCalendarYear(2025);
    cy.selectCalendarDay(19);

    cy.navigateToModuleWithSideBar('sales');
    cy.checkMessageLostFormData();
    cy.clickOnIgnoreButton();
    cy.wait(500);
    cy.url().then((currentUrl) => {
      expect(currentUrl).to.not.include(salesRoutes.create());
    });
    cy.clickOnCreateButton();
    cy.wait(500);
    cy.openSaleDetailForm();
    cy.get('form[id="formSaleDetail"]').within(() => {
      cy.get('input[name="value_pay"]').clear().type('55000');
    });
    cy.clickOnCloseFormDialog();
    cy.checkMessageLostFormData();
    cy.clickOnIgnoreButton();
    cy.checkCurrentUrl(salesRoutes.create());
    cy.checkDialogIsNotVisible();
  });

  it('No debe permitir al usuario salir del formulario cuando hay campos rellenados, cerrando el sonner (salir usando sidebar)', () => {
    cy.openCalendar();

    cy.selectCalendarMonth(4);
    cy.selectCalendarYear(2025);
    cy.selectCalendarDay(19);

    cy.navigateToModuleWithSideBar('sales');
    cy.checkMessageLostFormData();
    cy.clickOnCloseToast();
    cy.wait(500);
    cy.checkCurrentUrl(salesRoutes.create());

    cy.openSaleDetailForm();
    cy.get('form[id="formSaleDetail"]').within(() => {
      cy.get('input[name="value_pay"]').clear().type('55000');
    });
    cy.clickOnCloseFormDialog();
    cy.checkMessageLostFormData();
    cy.clickOnCloseToast();

    cy.checkDialogIsVisible();
  });

  it('Debe volver a la tabla de los ventas al cancelar la creación de un venta', () => {
    cy.clickOnCancelRegisterButton();
    cy.url().should('include', salesRoutes.listAll());
  });

  it('Debe volver a la tabla de los ventas al cancelar la creación de un venta (con campos rellenados)', () => {
    cy.openCalendar();

    cy.selectCalendarMonth(4);
    cy.selectCalendarYear(2025);
    cy.selectCalendarDay(19);

    cy.clickOnCancelRegisterButton();
    cy.checkMessageLostFormData();
    cy.clickOnIgnoreButton();
    cy.url().should('include', salesRoutes.listAll());
  });

  it('Comprobar navegación del breadcrumb', () => {
    cy.get('a[data-testid="breadcrumb-link-item-ventas"]').click();
    cy.url().should('include', salesRoutes.listAll());
  });

  it('Comprobar navegación del breadcrumb (con campos rellenados)', () => {
    cy.openCalendar();

    cy.selectCalendarMonth(4);
    cy.selectCalendarYear(2025);
    cy.selectCalendarDay(19);

    cy.get('a[data-testid="breadcrumb-link-item-ventas"]').click();
    cy.checkMessageLostFormData();
    cy.clickOnIgnoreButton();
    cy.url().should('include', salesRoutes.listAll());
  });
});

describe('Modificación de ventas', () => {
  let currentCrop: any = {};
  let currentSale: any = {};
  let currentClient: any = {};

  before(() => {
    cy.executeClearSeedData({ sales: true });
    cy.createSale({
      fastCreation: true,
      returnOnlySale: false,
    }).then((data) => {
      cy.log(JSON.stringify(data, null, 2));
      currentSale = { ...data.sale };
      currentCrop = { ...data.crop };
      currentClient = { ...data.client };
    });
  });

  beforeEach(() => {
    cy.loginUser();
    cy.visit(salesRoutes.update(currentSale.id));
    cy.wait(3000);
  });

  it('Comprobar que se cargue la información del venta antes de modificarla', () => {
    cy.get('button[data-testid="btn-calendar-selector"]').should(
      'have.attr',
      'data-value',
      new Date(currentSale.date).toISOString().split('T')[0]
    );
    // cy.get('button[data-testid="btn-open-command-crop"]')
    //   .should('have.attr', 'data-value', currentCrop.id)
    //   .contains(currentCrop.name);
    // cy.getFormTextArea('description').should(
    //   'have.value',
    //   currentSale.description
    // );

    // Comprobar datos de la tabla

    for (let i = 0; i < currentSale.details.length; i++) {
      cy.checkTableRowValues(currentSale.details[i].id, [
        currentClient.first_name,
        currentClient.last_name,
        currentCrop.name,
        FormatNumber(currentSale.details[i].amount),
        currentSale.details[i].unit_of_measure,
        FormatMoneyValue(currentSale.details[i].value_pay).split('$')[1].trim(),
      ]);
    }

    // Validar totales
    cy.get('div[data-testid="badge-amount"]').contains('15,00');
    cy.get('div[data-testid="badge-value-pay"]').contains('$ 840.000');
  });

  it('Modificar venta existente', () => {
    cy.navigateToModuleWithSideBar('sales');
    cy.clickRefetchButton();
    cy.clickActionsButtonTableRow(currentSale.id);
    cy.clickOnUpdateRecord();
    cy.wait(3000);

    cy.openCalendar();

    cy.selectCalendarMonth(4);
    cy.selectCalendarYear(2025);
    cy.selectCalendarDay(19);

    // Abrir formulario interno
    cy.clickActionsButtonTableRow(currentSale.details[0].id);
    cy.clickOnUpdateDetailRecord();
    cy.wait(3000);

    cy.openCommandField('client');
    cy.selectCommandOption('0');

    cy.openCommandField('crop');
    cy.selectCommandOption('0');

    cy.get('form[id="formSaleDetail"]').within(() => {
      cy.get('input[name="amount"]').clear().type('30');
      cy.get('input[name="value_pay"]').clear().type('1680000');
    });
    cy.clickOnSubmitSaleDetailForm();
    cy.wait(3000);

    cy.get('div[data-testid="badge-amount"]').contains('30,00');
    cy.get('div[data-testid="badge-value-pay"]').contains('$ 1.680.000');

    cy.clickOnSubmitButton();
    cy.checkDisabledSubmitButton();
    cy.contains('Venta actualizada');
  });

  it('Debe advertir al usuario antes de salir del formulario si hay campos rellenados (salir usando sidebar)', () => {
    cy.openCalendar();

    cy.selectCalendarMonth(4);
    cy.selectCalendarYear(2025);
    cy.selectCalendarDay(19);
    cy.navigateToModuleWithSideBar('sales');
    cy.checkMessageLostFormData();
  });

  it('Debe permitir al usuario salir del formulario incluso si hay campos rellenados, presionando "Ignorar" (salir usando sidebar)', () => {
    cy.openCalendar();

    cy.selectCalendarMonth(4);
    cy.selectCalendarYear(2025);
    cy.selectCalendarDay(19);
    cy.navigateToModuleWithSideBar('sales');
    cy.checkMessageLostFormData();
    cy.clickOnIgnoreButton();
    cy.url().then((currentUrl) => {
      expect(currentUrl).to.not.include(salesRoutes.update(currentSale.id));
    });
  });

  it('No debe permitir al usuario salir del formulario cuando hay campos rellenados, cerrando el sonner (salir usando sidebar)', () => {
    cy.openCalendar();

    cy.selectCalendarMonth(4);
    cy.selectCalendarYear(2025);
    cy.selectCalendarDay(19);
    cy.navigateToModuleWithSideBar('sales');
    cy.checkMessageLostFormData();
    cy.clickOnCloseToast();
    cy.url().should('include', salesRoutes.update(currentSale.id));
  });

  it('Debe volver a la tabla de los ventas al cancelar la modificación de un venta', () => {
    cy.clickOnCancelRegisterButton();
    cy.url().should('include', salesRoutes.listAll());
  });

  it('Debe volver a la tabla de los ventas al cancelar la modificación de un venta (con campos rellenados)', () => {
    cy.openCalendar();

    cy.selectCalendarMonth(4);
    cy.selectCalendarYear(2025);
    cy.selectCalendarDay(19);

    cy.clickOnCancelRegisterButton();
    cy.checkMessageLostFormData();
    cy.clickOnIgnoreButton();
    cy.url().should('include', salesRoutes.listAll());
  });

  it('Comprobar navegación del breadcrumb', () => {
    cy.get('a[data-testid="breadcrumb-link-item-ventas"]').click();
    cy.url().should('include', salesRoutes.listAll());
  });

  it('Comprobar navegación del breadcrumb (con campos rellenados)', () => {
    cy.openCalendar();

    cy.selectCalendarMonth(4);
    cy.selectCalendarYear(2025);
    cy.selectCalendarDay(19);

    cy.get('a[data-testid="breadcrumb-link-item-ventas"]').click();
    cy.checkMessageLostFormData();
    cy.clickOnIgnoreButton();
    cy.url().should('include', salesRoutes.listAll());
  });
});

describe('Eliminación de venta', () => {
  let currentSale: any = {};

  before(() => {
    cy.executeClearSeedData({ sales: true });
    cy.createSale({ fastCreation: true }).then((data) => {
      currentSale = { ...data };
    });
  });

  beforeEach(() => {
    cy.loginUser();
  });

  it('Eliminar venta', () => {
    cy.navigateToModuleWithSideBar('sales');
    cy.clickActionsButtonTableRow(currentSale.id);
    cy.clickOnDeleteRecord();
    cy.clickOnContinueDeleteOneRecord();
    cy.contains('Venta eliminada');
  });

  it('Intentar eliminar venta con registros pendientes de pago', () => {
    cy.executeClearSeedData({ sales: true });
    cy.createSale({
      fastCreation: true,
      returnOnlySale: false,
      isReceivableGeneric: true,
    }).then((data) => {
      const { sale } = data;

      cy.navigateToModuleWithSideBar('sales');
      cy.wait(5000);
      cy.clickActionsButtonTableRow(sale.id);
      cy.clickOnDeleteRecord();
      cy.clickOnContinueDeleteOneRecord();
      cy.contains(
        'No se pudo eliminar la venta seleccionada, revisa que no tenga registros pendientes de pago'
      );
    });
  });
});

describe('Eliminación de ventas por lote', () => {
  beforeEach(() => {
    cy.executeClearSeedData({ sales: true });
    cy.loginUser();
    cy.navigateToModuleWithSideBar('sales');
    for (let index = 0; index < 5; index++) {
      cy.createSale({ fastCreation: true });
    }
    cy.clickRefetchButton();
  });

  it('Eliminar ventas seleccionados', () => {
    cy.wait(3000);
    cy.toggleSelectAllTableRows();
    cy.clickOnDeleteBulkButton();
    cy.clickOnContinueDeleteBulkRecord();
    cy.checkLoadingInformation();
    cy.contains('Los registros seleccionados fueron eliminados');
    cy.checkNoRecordsMessage();
  });

  it('Intentar eliminar ventas con registros pendientes de pago', () => {
    cy.executeClearSeedData({ sales: true });
    cy.createSale({
      fastCreation: true,
      returnOnlySale: false,
      isReceivableGeneric: true,
    }).then((data) => {
      cy.navigateToModuleWithSideBar('sales');
      cy.clickRefetchButton();
      cy.wait(5000);
      cy.toggleSelectAllTableRows();
      cy.clickOnDeleteBulkButton();
      cy.clickOnContinueDeleteBulkRecord();
      // cy.checkLoadingInformation();
      cy.contains(
        'No se pudieron eliminar las ventas seleccionados, revisa que no tenga registros pendientes de pago'
      );
    });
  });

  it('Eliminar ventas que tienen conflicto de eliminación y los que no tienen', () => {
    cy.createSale({ fastCreation: true, isReceivableGeneric: true }).then(
      (data) => {
        cy.navigateToModuleWithSideBar('sales');
        cy.clickRefetchButton();
        cy.wait(3000);
        cy.toggleSelectAllTableRows();
        cy.clickOnDeleteBulkButton();
        cy.clickOnContinueDeleteBulkRecord();
        cy.contains(
          'No se pudieron eliminar algunas ventas, revisa que no tenga registros pendientes de pago'
        );
      }
    );
  });
});

describe('Exportar venta a PDF', () => {
  before(() => {
    cy.executeClearSeedData({ sales: true });
  });

  it('Generar reporte de venta', () => {
    cy.loginUser();
    cy.createSale({ fastCreation: true, returnOnlySale: true }).then(
      (currentSale) => {
        cy.navigateToModuleWithSideBar('sales');
        cy.clickActionsButtonTableRow(currentSale.id);
        cy.get('button[data-testid="btn-download-pdf"]').click();
        cy.contains('Generando documento PDF...');
        cy.contains('El documento ha sido generado con éxito.');
        const expectedFileName = `reporte-venta-${currentSale.id}.pdf`;
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
  it('Copiar Id del venta', () => {
    cy.executeClearSeedData({ sales: true });
    cy.createSale({ fastCreation: true }).then((currentSale) => {
      cy.loginUser();
      cy.navigateToModuleWithSideBar('sales');
      cy.wait(500);
      cy.clickActionsButtonTableRow(currentSale.id);
      cy.clickOnCopyIdButton();
    });
  });
});

describe('Ver registro de venta', () => {
  it('Ver registro de venta', () => {
    cy.loginUser();
    cy.executeClearSeedData({ sales: true });
    cy.createSale({
      fastCreation: true,
      returnOnlySale: false,
    }).then((data) => {
      cy.log(JSON.stringify(data, null, 2));
      const {
        sale: currentSale,
        crop: currentCrop,
        client: currentClient,
      } = data;

      cy.navigateToModuleWithSideBar('sales');
      cy.wait(500);
      cy.clickActionsButtonTableRow(currentSale.id);
      cy.clickOnViewRecord();
      cy.get('button[data-testid="btn-calendar-selector"]').should(
        'have.attr',
        'data-value',
        new Date(currentSale.date).toISOString().split('T')[0]
      );

      // Comprobar datos de la tabla

      for (let i = 0; i < currentSale.details.length; i++) {
        cy.checkTableRowValues(currentSale.details[i].id, [
          currentClient.first_name,
          currentClient.last_name,
          currentCrop.name,
          FormatNumber(currentSale.details[i].amount),
          currentSale.details[i].unit_of_measure,
          FormatMoneyValue(currentSale.details[i].value_pay)
            .split('$')[1]
            .trim(),
        ]);
      }

      // Validar totales
      cy.get('div[data-testid="badge-amount"]').contains('15,00');
      cy.get('div[data-testid="badge-value-pay"]').contains('$ 840.000');
      cy.contains('Información');
      cy.contains('Volver');
    });
  });

  it('Consultar registro con id no valido', () => {
    cy.loginUser();
    cy.visit(salesRoutes.view('no-id'));
    cy.checkMessageIncorrectInformation();
    cy.contains('Información');
    cy.contains('Volver');
  });

  it('Consultar registro con id inexistente', () => {
    cy.loginUser();
    cy.visit(salesRoutes.view(TEST_UUID_VALID));
    cy.checkMessageNotFoundInformation();
    cy.contains('Información');
    cy.contains('Volver');
  });
});

describe('Paginado y selectores', () => {
  before(() => {
    cy.executeClearSeedData({ sales: true });
    cy.executeSeed({ sales: { quantity: 25 } });
  });

  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('sales');
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

describe('Auth modulo de ventas', () => {
  let currentSale: any = {};

  before(() => {
    cy.executeClearSeedData({ sales: true });
    cy.createSale({ fastCreation: true }).then((data) => {
      currentSale = { ...data };
    });
  });

  it('Crear usuario con acceso unicamente al modulo de ventas', () => {
    cy.createSeedUser({ modules: ['sales'] }, (userData) => {
      cy.log(userData);
      cy.loginUser(userData.email, userData.password);
      cy.wait(1500);

      cy.checkSidebarMenuItem('Ventas');

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

      cy.clickActionsButtonTableRow(currentSale.id);

      cy.checkActionButtonsState({ update: true, view: true, delete: true });
    });
  });

  it('Crear usuario con acceso unicamente a ver tabla de ventas', () => {
    cy.createSeedUser({ actions: ['find_all_sales'] }, (userData) => {
      cy.wait(2000);
      cy.log(userData);
      cy.loginUser(userData.email, userData.password);
      cy.wait(1500);

      cy.checkSidebarMenuItem('Ventas');

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

      cy.clickActionsButtonTableRow(currentSale.id);

      // Certificar

      cy.checkActionButtonsState({
        update: false,
        view: false,
        delete: false,
      });
    });
  });

  it('No tiene permisos para ver el listado de ventas', () => {
    cy.createSeedUser({ actions: ['create_sale'] }, (userData) => {
      cy.loginUser(userData.email, userData.password);
      cy.wait(1500);
      cy.checkSidebarMenuItem('Ventas');
      cy.openCommandPaletteAndSelectFirstOption();

      cy.wait(2000);
      cy.contains('No tienes permiso para ver el listado de las ventas');
      cy.checkRefetchButtonState(false);

      // cy.checkSearchBarIsDisabled();
    });
  });

  it('Debe sacar al usuario si intenta crear un venta y no tiene permisos ', () => {
    cy.createSeedUser({ actions: ['find_all_sales'] }, (data: any) => {
      cy.loginUser(data.email, data.password);
      cy.wait(1500);

      cy.checkSidebarMenuItem('Ventas');
      cy.openCommandPaletteAndSelectFirstOption();

      cy.wait(2000);

      cy.visit(salesRoutes.create());
      cy.shouldBeRedirectedForNoPermission();
    });
  });

  it('Debe sacar al usuario si intenta modificar a un venta y no tiene permisos', () => {
    cy.createSeedUser({ actions: ['find_all_sales'] }, (userData: any) => {
      cy.loginUser(userData.email, userData.password);
      cy.wait(1500);
      cy.checkSidebarMenuItem('Ventas');
      cy.openCommandPaletteAndSelectFirstOption();

      cy.visit(salesRoutes.update(currentSale.id));
      cy.shouldBeRedirectedForNoPermission();
    });
  });

  it('Debe sacar al usuario si intenta consultar a un venta y no tiene permisos', () => {
    cy.createSeedUser({ actions: ['find_all_sales'] }, (data: any) => {
      cy.loginUser(data.email, data.password);
      cy.wait(1500);
      cy.checkSidebarMenuItem('Ventas');
      cy.openCommandPaletteAndSelectFirstOption();

      cy.visit(salesRoutes.view(currentSale.id));
      cy.shouldBeRedirectedForNoPermission();
    });
  });
});
