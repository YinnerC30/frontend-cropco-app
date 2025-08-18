import 'cypress-real-events/support';
import { BASE_HOME_PAGE_URL } from 'cypress/helpers/constants';
import { shoppingRoutes } from './shopping-routes';

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

  it('Debe crear un venta', () => {
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

    cy.clickOnSubmitButton();
    cy.checkDisabledSubmitButton();
    cy.contains('Compra registrada');
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

  it('Debe volver a la tabla de los compras al cancelar la creación de un venta', () => {
    cy.clickOnCancelRegisterButton();
    cy.url().should('include', shoppingRoutes.listAll());
  });

  it('Debe volver a la tabla de los compras al cancelar la creación de un venta (con campos rellenados)', () => {
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
