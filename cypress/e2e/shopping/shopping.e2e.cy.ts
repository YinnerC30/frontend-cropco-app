import 'cypress-real-events/support';
import { BASE_HOME_PAGE_URL, TEST_UUID_VALID } from 'cypress/helpers/constants';
import { shoppingRoutes } from './shopping-routes';
import { FormatNumber } from 'cypress/helpers/formatting/FormatNumber';
import { FormatMoneyValue } from 'cypress/helpers/formatting/FormatMoneyValue';
import { suppliesRoutes } from '../supplies/supplies-routes';

describe('Comprobar existencia de elementos en el modulo de compras', () => {
  before(() => {
    cy.createShopping({ fastCreation: true });
  });

  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('shopping');
  });

  it('Debe ingresar a la ruta correcta', () => {
    cy.contains('Compras');
    cy.checkCurrentUrl(shoppingRoutes.listAll());
  });

  it('Debe contener los elementos necesarios', () => {
    cy.existRefetchButton();
    cy.existCreateButton();

    cy.existPaginationInfo();

    cy.contains('Fecha:');
    cy.contains('Proveedores:');
    cy.contains('Insumos:');
    cy.contains('Total:');

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
    cy.openCommandPaletteAndSelect('compras', 'shopping');
    cy.checkCurrentUrl(shoppingRoutes.listAll());
  });
});

describe.only('Encuentra registros de acuerdo a los filtros de búsqueda', () => {
  before(() => {
    cy.executeClearSeedData({ shoppingSupplies: true });
    for (let i = 0; i < 2; i++) {
      cy.createShopping({ fastCreation: true });
      cy.createShopping({ fastCreation: true });
    }
  });

  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('shopping');
  });

  it.only('Debe buscar la compras por una fecha (fecha actual)', () => {
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

  it.only('Debe buscar la compras por una fecha (fecha anterior)', () => {
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

  it.only('Debe buscar la compras por una fecha (fecha posterior)', () => {
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

  it('Debe buscar la compras por un cliente en especifico', () => {
    cy.wait(1500);
    cy.get('button[data-testid="btn-shopping-filters"]').click();

    cy.get('div[data-testid="filter-clients"]').click();

    cy.get(`button[data-testid="btn-open-command-client"]`).click();

    cy.selectCommandOption('0', true);

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

  it('Debe buscar la compras por un cultivo en especifico', () => {
    cy.wait(1500);
    cy.get('button[data-testid="btn-shopping-filters"]').click();

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

  it('Debe buscar la compras por un monto (igual a)', () => {
    cy.wait(1500);
    cy.get('button[data-testid="btn-shopping-filters"]').click();

    cy.get('div[data-testid="filter-amount"]').click();

    cy.get(
      'button[data-testid="btn-select-field"][data-name="filter_by_amount.type_filter_amount"]'
    ).click();
    cy.selectSelectOption('EQUAL');

    cy.getFormInput('filter_by_amount.amount').clear();

    cy.getFormInput('filter_by_amount.amount').type('15');

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

  it('Debe buscar la compras por un monto (mayor a)', () => {
    cy.wait(1500);
    cy.get('button[data-testid="btn-shopping-filters"]').click();

    cy.get('div[data-testid="filter-amount"]').click();

    cy.get(
      'button[data-testid="btn-select-field"][data-name="filter_by_amount.type_filter_amount"]'
    ).click();
    cy.selectSelectOption('GREATER_THAN');

    cy.getFormInput('filter_by_amount.amount').clear();

    cy.getFormInput('filter_by_amount.amount').type('15');

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

  it('Debe buscar la compras por un monto (menor a)', () => {
    cy.wait(1500);
    cy.get('button[data-testid="btn-shopping-filters"]').click();

    cy.get('div[data-testid="filter-amount"]').click();

    cy.get(
      'button[data-testid="btn-select-field"][data-name="filter_by_amount.type_filter_amount"]'
    ).click();
    cy.selectSelectOption('LESS_THAN');

    cy.getFormInput('filter_by_amount.amount').clear();

    cy.getFormInput('filter_by_amount.amount').type('15');

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

  it('Debe buscar la compras por un valor (igual a)', () => {
    cy.wait(1500);
    cy.get('button[data-testid="btn-shopping-filters"]').click();

    cy.get('div[data-testid="filter-value-pay"]').click();

    cy.getFormInput('filter_by_value_pay.value_pay').clear();

    cy.getFormInput('filter_by_value_pay.value_pay').type('840000');

    cy.get(
      'button[data-testid="btn-select-field"][data-name="filter_by_value_pay.type_filter_value_pay"]'
    ).click();
    cy.selectSelectOption('EQUAL');

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

  it('Debe buscar la compras por un valor (mayor a)', () => {
    cy.wait(1500);
    cy.get('button[data-testid="btn-shopping-filters"]').click();

    cy.get('div[data-testid="filter-value-pay"]').click();

    cy.get(
      'button[data-testid="btn-select-field"][data-name="filter_by_value_pay.type_filter_value_pay"]'
    ).click();
    cy.selectSelectOption('GREATER_THAN');

    cy.getFormInput('filter_by_value_pay.value_pay').clear();

    cy.getFormInput('filter_by_value_pay.value_pay').type('840000');

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

  it('Debe buscar la compras por un valor (menor a)', () => {
    cy.wait(1500);
    cy.get('button[data-testid="btn-shopping-filters"]').click();

    cy.get('div[data-testid="filter-value-pay"]').click();

    cy.get(
      'button[data-testid="btn-select-field"][data-name="filter_by_value_pay.type_filter_value_pay"]'
    ).click();
    cy.selectSelectOption('LESS_THAN');

    cy.getFormInput('filter_by_value_pay.value_pay').clear();

    cy.getFormInput('filter_by_value_pay.value_pay').type('10000');

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

describe('Creación de compras', () => {
  before(() => {
    cy.executeClearSeedData({
      shoppingSupplies: true,
      supplies: true,
      suppliers: true,
    });
    for (let i = 0; i < 2; i++) {
      cy.createSupplier({}, { fastCreation: true });
      cy.createSupply({}, { fastCreation: true });
    }
  });

  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('shopping');
    cy.wait(700);
    cy.clickOnCreateButton();
  });

  it('Debe crear un compra', () => {
    cy.openCalendar();

    cy.selectCalendarMonth(4);
    cy.selectCalendarYear(2025);
    cy.selectCalendarDay(19);

    // Abrir formulario interno
    cy.openShoppingDetailForm();

    // Seleccionar proveedor
    cy.openCommandField('supplier');
    cy.selectCommandOption('0');

    // Seleccionar insumo
    cy.openCommandField('supply');
    cy.selectCommandOption('0');

    cy.openSelectField();
    cy.get(`div[role="option"]`).eq(1).click();

    cy.get('form[id="formShoppingDetail"]').within(() => {
      cy.get('input[name="amount"]').clear().type('25');
    });

    cy.get('form[id="formShoppingDetail"]').within(() => {
      cy.get('input[name="value_pay"]').clear().type('60000');
    });

    cy.clickOnSubmitShoppingDetailForm();

    // Abrir formulario interno
    cy.openShoppingDetailForm();

    // Seleccionar proveedor
    cy.openCommandField('supplier');
    cy.selectCommandOption('1');

    // Seleccionar insumo
    cy.openCommandField('supply');
    cy.selectCommandOption('1');

    cy.openSelectField();
    cy.get(`div[role="option"]`).eq(1).click();

    cy.get('form[id="formShoppingDetail"]').within(() => {
      cy.get('input[name="amount"]').clear().type('20');
    });

    cy.get('form[id="formShoppingDetail"]').within(() => {
      cy.get('input[name="value_pay"]').clear().type('50000');
    });

    cy.clickOnSubmitShoppingDetailForm();

    // Validar totales
    cy.get('div[data-testid="badge-value-pay"]').contains('$ 110.000');

    cy.intercept('POST', 'http://localhost:3000/shopping/create').as(
      'postShopping'
    );

    cy.clickOnSubmitButton();
    cy.checkDisabledSubmitButton();
    cy.contains('Compra registrada');

    // Capturar la respuesta

    cy.wait('@postShopping').then((interception: any) => {
      // Aquí tienes acceso a la respuesta de la API
      const responseBody = interception.response.body;

      //TODO: Comprobar valor de stock de insumos

      // Insumo 1
      cy.visit(suppliesRoutes.view(responseBody.details[0].supply.id));
      cy.wait(5000);

      // Insumo 2
      cy.visit(suppliesRoutes.view(responseBody.details[1].supply.id));
      cy.wait(5000);
    });

    // Comprobar que se añadio la cantidad correspondiente
  });

  it('Debe mostrar mensajes de error al intentar enviar el formulario vacío', () => {
    cy.clickOnSubmitButton();
    cy.contains('La fecha es un campo obligatorio');

    cy.contains('Debes registrar la compra de al menos 1 proveedor');

    cy.checkMessageFieldsMissing();

    // Abrir formulario interno
    cy.openShoppingDetailForm();
    cy.clickOnSubmitShoppingDetailForm();

    cy.contains('Debe selecciónar uno de los proveedores.');
    cy.contains('Debe selecciónar uno de los insumos.');
    cy.contains('Debe seleccionar una unidad de medida.');
    cy.contains('El valor a comprar debe ser un número positivo.');
    cy.contains('El valor a pagar debe ser un número positivo.');
    cy.checkMessageFieldsMissing();
  });

  it('Debe advertir al usuario antes de salir del formulario si hay campos rellenados (salir usando sidebar)', () => {
    cy.openCalendar();

    cy.selectCalendarMonth(4);
    cy.selectCalendarYear(2025);
    cy.selectCalendarDay(19);

    cy.navigateToModuleWithSideBar('shopping');
    cy.checkMessageLostFormData();
    cy.clickOnCloseToast();
    cy.wait(500);
    // Abrir formulario interno
    cy.openShoppingDetailForm();
    cy.get('form[id="formShoppingDetail"]').within(() => {
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

    cy.navigateToModuleWithSideBar('shopping');
    cy.checkMessageLostFormData();
    cy.clickOnIgnoreButton();
    cy.wait(500);
    cy.url().then((currentUrl) => {
      expect(currentUrl).to.not.include(shoppingRoutes.create());
    });
    cy.clickOnCreateButton();
    cy.wait(500);
    cy.openShoppingDetailForm();
    cy.get('form[id="formShoppingDetail"]').within(() => {
      cy.get('input[name="value_pay"]').clear().type('55000');
    });
    cy.clickOnCloseFormDialog();
    cy.checkMessageLostFormData();
    cy.clickOnIgnoreButton();
    cy.checkCurrentUrl(shoppingRoutes.create());
    cy.checkDialogIsNotVisible();
  });

  it('No debe permitir al usuario salir del formulario cuando hay campos rellenados, cerrando el sonner (salir usando sidebar)', () => {
    cy.openCalendar();

    cy.selectCalendarMonth(4);
    cy.selectCalendarYear(2025);
    cy.selectCalendarDay(19);

    cy.navigateToModuleWithSideBar('shopping');
    cy.checkMessageLostFormData();
    cy.clickOnCloseToast();
    cy.wait(500);
    cy.checkCurrentUrl(shoppingRoutes.create());

    cy.openShoppingDetailForm();
    cy.get('form[id="formShoppingDetail"]').within(() => {
      cy.get('input[name="value_pay"]').clear().type('55000');
    });
    cy.clickOnCloseFormDialog();
    cy.checkMessageLostFormData();
    cy.clickOnCloseToast();

    cy.checkDialogIsVisible();
  });

  it('Debe volver a la tabla de los compras al cancelar la creación de un compra', () => {
    cy.clickOnCancelRegisterButton();
    cy.url().should('include', shoppingRoutes.listAll());
  });

  it('Debe volver a la tabla de los compras al cancelar la creación de un compra (con campos rellenados)', () => {
    cy.openCalendar();

    cy.selectCalendarMonth(4);
    cy.selectCalendarYear(2025);
    cy.selectCalendarDay(19);

    cy.clickOnCancelRegisterButton();
    cy.checkMessageLostFormData();
    cy.clickOnIgnoreButton();
    cy.url().should('include', shoppingRoutes.listAll());
  });

  it('Comprobar navegación del breadcrumb', () => {
    cy.get('a[data-testid="breadcrumb-link-item-compras"]').click();
    cy.url().should('include', shoppingRoutes.listAll());
  });

  it('Comprobar navegación del breadcrumb (con campos rellenados)', () => {
    cy.openCalendar();

    cy.selectCalendarMonth(4);
    cy.selectCalendarYear(2025);
    cy.selectCalendarDay(19);

    cy.get('a[data-testid="breadcrumb-link-item-compras"]').click();
    cy.checkMessageLostFormData();
    cy.clickOnIgnoreButton();
    cy.url().should('include', shoppingRoutes.listAll());
  });
});

describe('Modificación de compras', () => {
  let currentSupply: any = {};
  let currentShopping: any = {};
  let currentSupplier: any = {};

  before(() => {
    cy.executeClearSeedData({
      shoppingSupplies: true,
      suppliers: true,
      supplies: true,
    });

    for (let i = 0; i < 2; i++) {
      cy.createSupply({}, { fastCreation: true });
      cy.createSupplier({}, { fastCreation: true });
    }

    cy.createShopping({
      fastCreation: true,
      returnOnlyShopping: false,
    }).then((data) => {
      currentShopping = { ...data.shopping };
      currentSupply = { ...data.supplies[0] };
      currentSupplier = { ...data.supplier };
    });
  });

  beforeEach(() => {
    cy.loginUser();
    cy.visit(shoppingRoutes.update(currentShopping.id));
    cy.wait(3000);
  });

  it('Comprobar que se cargue la información del compra antes de modificarla', () => {
    cy.get('button[data-testid="btn-calendar-selector"]').should(
      'have.attr',
      'data-value',
      new Date(currentShopping.date).toISOString().split('T')[0]
    );

    // Comprobar datos de la tabla

    for (let i = 0; i < currentShopping.details.length; i++) {
      cy.checkTableRowValues(currentShopping.details[i].id, [
        currentSupplier.first_name,
        currentSupplier.last_name,
        currentSupply.name,
        currentShopping.details[i].unit_of_measure,
        FormatNumber(currentShopping.details[i].amount),
        currentShopping.details[i].unit_of_measure,
        FormatMoneyValue(currentShopping.details[i].value_pay)
          .split('$')[1]
          .trim(),
      ]);
    }

    // Validar totales
    cy.get('div[data-testid="badge-value-pay"]').contains('$ 250.000');
  });

  it('Modificar compra existente', () => {
    cy.navigateToModuleWithSideBar('shopping');
    cy.clickRefetchButton();
    cy.clickActionsButtonTableRow(currentShopping.id);
    cy.clickOnUpdateRecord();
    cy.wait(3000);

    cy.openCalendar();

    cy.selectCalendarMonth(4);
    cy.selectCalendarYear(2025);
    cy.selectCalendarDay(19);

    // Abrir formulario interno
    cy.clickActionsButtonTableRow(currentShopping.details[0].id);
    cy.clickOnUpdateDetailRecord();
    cy.wait(3000);

    // cy.openCommandField('supplier');
    // cy.selectCommandOption('2');

    cy.openSelectField();
    cy.get(`div[role="option"]`).eq(1).click();

    cy.get('form[id="formShoppingDetail"]').within(() => {
      cy.get('input[name="amount"]').clear().type('25');
    });

    cy.get('form[id="formShoppingDetail"]').within(() => {
      cy.get('input[name="value_pay"]').clear().type('60000');
    });

    cy.clickOnSubmitShoppingDetailForm();

    // Validar totales
    cy.get('div[data-testid="badge-value-pay"]').contains('$ 60.000');

    cy.clickOnSubmitButton();
    cy.checkDisabledSubmitButton();
    cy.contains('Compra actualizada');

    //TODO: Comprobar valor de stock de insumos
  });

  it('Debe advertir al usuario antes de salir del formulario si hay campos rellenados (salir usando sidebar)', () => {
    cy.openCalendar();

    cy.selectCalendarMonth(4);
    cy.selectCalendarYear(2025);
    cy.selectCalendarDay(19);

    cy.navigateToModuleWithSideBar('shopping');
    cy.checkMessageLostFormData();
  });

  it('Debe permitir al usuario salir del formulario incluso si hay campos rellenados, presionando "Ignorar" (salir usando sidebar)', () => {
    cy.openCalendar();

    cy.selectCalendarMonth(4);
    cy.selectCalendarYear(2025);
    cy.selectCalendarDay(19);
    cy.navigateToModuleWithSideBar('shopping');
    cy.checkMessageLostFormData();
    cy.clickOnIgnoreButton();
    cy.url().then((currentUrl) => {
      expect(currentUrl).to.not.include(
        shoppingRoutes.update(currentShopping.id)
      );
    });
  });

  it('No debe permitir al usuario salir del formulario cuando hay campos rellenados, cerrando el sonner (salir usando sidebar)', () => {
    cy.openCalendar();

    cy.selectCalendarMonth(4);
    cy.selectCalendarYear(2025);
    cy.selectCalendarDay(19);
    cy.navigateToModuleWithSideBar('shopping');
    cy.checkMessageLostFormData();
    cy.clickOnCloseToast();
    cy.url().should('include', shoppingRoutes.update(currentShopping.id));
  });

  it('Debe volver a la tabla de los compras al cancelar la modificación de un compra', () => {
    cy.clickOnCancelRegisterButton();
    cy.url().should('include', shoppingRoutes.listAll());
  });

  it('Debe volver a la tabla de los compras al cancelar la modificación de un compra (con campos rellenados)', () => {
    cy.openCalendar();

    cy.selectCalendarMonth(4);
    cy.selectCalendarYear(2025);
    cy.selectCalendarDay(19);

    cy.clickOnCancelRegisterButton();
    cy.checkMessageLostFormData();
    cy.clickOnIgnoreButton();
    cy.url().should('include', shoppingRoutes.listAll());
  });

  it('Comprobar navegación del breadcrumb', () => {
    cy.get('a[data-testid="breadcrumb-link-item-compras"]').click();
    cy.url().should('include', shoppingRoutes.listAll());
  });

  it('Comprobar navegación del breadcrumb (con campos rellenados)', () => {
    cy.openCalendar();

    cy.selectCalendarMonth(4);
    cy.selectCalendarYear(2025);
    cy.selectCalendarDay(19);

    cy.get('a[data-testid="breadcrumb-link-item-compras"]').click();
    cy.checkMessageLostFormData();
    cy.clickOnIgnoreButton();
    cy.url().should('include', shoppingRoutes.listAll());
  });
});

describe('Eliminación de compra', () => {
  let currentShopping: any = {};

  before(() => {
    cy.executeClearSeedData({ shoppingSupplies: true });
    cy.createShopping({ fastCreation: true }).then((data) => {
      currentShopping = { ...data };
    });
  });

  beforeEach(() => {
    cy.loginUser();
  });

  it('Eliminar compra', () => {
    cy.navigateToModuleWithSideBar('shopping');
    cy.clickActionsButtonTableRow(currentShopping.id);
    cy.clickOnDeleteRecord();
    cy.clickOnContinueDeleteOneRecord();
    cy.contains('Compra eliminada');
  });

  it.skip('Intentar eliminar compra con registros pendientes de pago', () => {
    cy.executeClearSeedData({ shopping: true });
    cy.createShopping({
      fastCreation: true,
      returnOnlyShopping: false,
    }).then((data) => {
      const { shopping } = data;

      cy.navigateToModuleWithSideBar('shopping');
      cy.wait(5000);
      cy.clickActionsButtonTableRow(shopping.id);
      cy.clickOnDeleteRecord();
      cy.clickOnContinueDeleteOneRecord();
      cy.contains(
        'No se pudo eliminar la compra seleccionada, revisa que no tenga registros pendientes de pago'
      );
    });
  });
});

describe('Eliminación de compras por lote', () => {
  beforeEach(() => {
    cy.executeClearSeedData({ shoppingSupplies: true });
    cy.loginUser();
    cy.navigateToModuleWithSideBar('shopping');
    for (let index = 0; index < 5; index++) {
      cy.createShopping({ fastCreation: true });
    }
    cy.clickRefetchButton();
  });

  it('Eliminar compras seleccionados', () => {
    cy.wait(3000);
    cy.toggleSelectAllTableRows();
    cy.clickOnDeleteBulkButton();
    cy.clickOnContinueDeleteBulkRecord();
    cy.checkLoadingInformation();
    cy.contains('Los registros seleccionados fueron eliminados');
    cy.checkNoRecordsMessage();
  });

  it.skip('Intentar eliminar compras con registros pendientes de pago', () => {
    cy.executeClearSeedData({ shopping: true });
    cy.createShopping({
      fastCreation: true,
      returnOnlyShopping: false,
    }).then((data) => {
      cy.navigateToModuleWithSideBar('shopping');
      cy.clickRefetchButton();
      cy.wait(5000);
      cy.toggleSelectAllTableRows();
      cy.clickOnDeleteBulkButton();
      cy.clickOnContinueDeleteBulkRecord();
      // cy.checkLoadingInformation();
      cy.contains(
        'No se pudieron eliminar las compras seleccionados, revisa que no tenga registros pendientes de pago'
      );
    });
  });

  it.skip('Eliminar compras que tienen conflicto de eliminación y los que no tienen', () => {
    cy.createShopping({ fastCreation: true }).then((data) => {
      cy.navigateToModuleWithSideBar('shopping');
      cy.clickRefetchButton();
      cy.wait(3000);
      cy.toggleSelectAllTableRows();
      cy.clickOnDeleteBulkButton();
      cy.clickOnContinueDeleteBulkRecord();
      cy.contains(
        'No se pudieron eliminar algunas compras, revisa que no tenga registros pendientes de pago'
      );
    });
  });
});

describe('Exportar compra a PDF', () => {
  before(() => {
    cy.executeClearSeedData({ shoppingSupplies: true });
  });

  it('Generar reporte de compra', () => {
    cy.loginUser();
    cy.createShopping({ fastCreation: true, returnOnlyShopping: true }).then(
      (currentShopping) => {
        cy.navigateToModuleWithSideBar('shopping');
        cy.clickActionsButtonTableRow(currentShopping.id);
        cy.get('button[data-testid="btn-download-pdf"]').click();
        cy.contains('Generando documento PDF...');
        cy.contains('El documento ha sido generado con éxito.');
        const expectedFileName = `reporte-compra-${currentShopping.id}.pdf`;
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
  it('Copiar Id del compra', () => {
    cy.executeClearSeedData({ shoppingSupplies: true });
    cy.createShopping({ fastCreation: true }).then((currentShopping) => {
      cy.loginUser();
      cy.navigateToModuleWithSideBar('shopping');
      cy.wait(500);
      cy.clickActionsButtonTableRow(currentShopping.id);
      cy.clickOnCopyIdButton();
    });
  });
});

describe('Ver registro de compra', () => {
  it('Ver registro de compra', () => {
    cy.loginUser();
    cy.executeClearSeedData({ shopping: true });
    cy.createShopping({
      fastCreation: true,
      returnOnlyShopping: false,
    }).then((data) => {
      const { shopping: currentShopping, supplier: currentSupplier } = data;

      const currentSupply = { ...data.supplies[0] };

      cy.navigateToModuleWithSideBar('shopping');
      cy.wait(500);
      cy.clickActionsButtonTableRow(currentShopping.id);
      cy.clickOnViewRecord();
      cy.get('button[data-testid="btn-calendar-selector"]').should(
        'have.attr',
        'data-value',
        new Date(currentShopping.date).toISOString().split('T')[0]
      );

      // Comprobar datos de la tabla

      for (let i = 0; i < currentShopping.details.length; i++) {
        cy.checkTableRowValues(currentShopping.details[i].id, [
          currentSupplier.first_name,
          currentSupplier.last_name,
          currentSupply.name,
          currentShopping.details[i].unit_of_measure,
          FormatNumber(currentShopping.details[i].amount),
          currentShopping.details[i].unit_of_measure,
          FormatMoneyValue(currentShopping.details[i].value_pay)
            .split('$')[1]
            .trim(),
        ]);
      }

      // Validar totales
      cy.get('div[data-testid="badge-value-pay"]').contains('$ 250.000');
      cy.contains('Información');
      cy.contains('Volver');
    });
  });

  it('Consultar registro con id no valido', () => {
    cy.loginUser();
    cy.visit(shoppingRoutes.view('no-id'));
    cy.checkMessageIncorrectInformation();
    cy.contains('Información');
    cy.contains('Volver');
  });

  it('Consultar registro con id inexistente', () => {
    cy.loginUser();
    cy.visit(shoppingRoutes.view(TEST_UUID_VALID));
    cy.checkMessageNotFoundInformation();
    cy.contains('Información');
    cy.contains('Volver');
  });
});

describe('Paginado y selectores', () => {
  before(() => {
    cy.executeClearSeedData({ shoppingSupplies: true });
    cy.executeSeed({ shoppings: { quantity: 10 } });
    cy.executeSeed({ shoppings: { quantity: 10 } });
    cy.executeSeed({ shoppings: { quantity: 5 } });
  });

  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('shopping');
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

describe('Auth modulo de compras', () => {
  let currentShopping: any = {};

  before(() => {
    cy.executeClearSeedData({ shoppingSupplies: true });
    cy.createShopping({ fastCreation: true }).then((data) => {
      currentShopping = { ...data };
    });
  });

  it('Crear usuario con acceso unicamente al modulo de compras', () => {
    cy.createSeedUser({ modules: ['shopping'] }, (userData) => {
      cy.log(userData);
      cy.loginUser(userData.email, userData.password);
      cy.wait(1500);

      cy.checkSidebarMenuItem('Compras');

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

      cy.clickActionsButtonTableRow(currentShopping.id);

      cy.checkActionButtonsState({ update: true, view: true, delete: true });
    });
  });

  it('Crear usuario con acceso unicamente a ver tabla de compras', () => {
    cy.createSeedUser(
      { actions: ['find_all_supplies_shopping'] },
      (userData) => {
        cy.wait(2000);
        cy.log(userData);
        cy.loginUser(userData.email, userData.password);
        cy.wait(1500);

        cy.checkSidebarMenuItem('Compras');

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

        cy.clickActionsButtonTableRow(currentShopping.id);

        // Certificar

        cy.checkActionButtonsState({
          update: false,
          view: false,
          delete: false,
        });
      }
    );
  });

  it('No tiene permisos para ver el listado de compras', () => {
    cy.createSeedUser({ actions: ['create_supply_shopping'] }, (userData) => {
      cy.loginUser(userData.email, userData.password);
      cy.wait(1500);
      cy.checkSidebarMenuItem('Compras');
      cy.openCommandPaletteAndSelectFirstOption();

      cy.wait(2000);
      cy.contains('No tienes permiso para ver el listado de las compras');
      cy.checkRefetchButtonState(false);

      // cy.checkSearchBarIsDisabled();
    });
  });

  it('Debe sacar al usuario si intenta crear un compra y no tiene permisos ', () => {
    cy.createSeedUser(
      { actions: ['find_all_supplies_shopping'] },
      (data: any) => {
        cy.loginUser(data.email, data.password);
        cy.wait(1500);

        cy.checkSidebarMenuItem('Compras');
        cy.openCommandPaletteAndSelectFirstOption();

        cy.wait(2000);

        cy.visit(shoppingRoutes.create());
        cy.shouldBeRedirectedForNoPermission();
      }
    );
  });

  it('Debe sacar al usuario si intenta modificar a un compra y no tiene permisos', () => {
    cy.createSeedUser(
      { actions: ['find_all_supplies_shopping'] },
      (userData: any) => {
        cy.loginUser(userData.email, userData.password);
        cy.wait(1500);
        cy.checkSidebarMenuItem('Compras');
        cy.openCommandPaletteAndSelectFirstOption();

        cy.visit(shoppingRoutes.update(currentShopping.id));
        cy.shouldBeRedirectedForNoPermission();
      }
    );
  });

  it('Debe sacar al usuario si intenta consultar a un compra y no tiene permisos', () => {
    cy.createSeedUser(
      { actions: ['find_all_supplies_shopping'] },
      (data: any) => {
        cy.loginUser(data.email, data.password);
        cy.wait(1500);
        cy.checkSidebarMenuItem('Compras');
        cy.openCommandPaletteAndSelectFirstOption();

        cy.visit(shoppingRoutes.view(currentShopping.id));
        cy.shouldBeRedirectedForNoPermission();
      }
    );
  });
});
