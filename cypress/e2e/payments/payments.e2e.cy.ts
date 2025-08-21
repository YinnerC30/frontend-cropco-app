import { BASE_HOME_PAGE_URL } from 'cypress/helpers/constants';
import { paymentsRoutes } from './payments-routes';

describe('Comprobar existencia de elementos en el modulo de pagos', () => {
  before(() => {
    cy.createSale({ fastCreation: true });
  });

  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('payments');
  });

  it('Debe ingresar a la ruta correcta ', () => {
    cy.contains('Pagos');
    cy.checkCurrentUrl(paymentsRoutes.listAll());
  });

  it('Debe contener los elementos necesarios', () => {
    // TODO: Comprobar existencia de barra de búsqueda

    cy.existRefetchButton();
    cy.existCreateButton();

    cy.existPaginationInfo();

    cy.contains('Fecha:');
    cy.contains('Empleado:');
    cy.contains('Valor a pagar:');
    cy.contains('Método de pago:');

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
    cy.openCommandPaletteAndSelect('pagos', 'payments');
    cy.checkCurrentUrl(paymentsRoutes.listAll());
  });
});
