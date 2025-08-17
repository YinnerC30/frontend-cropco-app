import 'cypress-real-events/support';
import { BASE_HOME_PAGE_URL } from 'cypress/helpers/constants';
import { shoppingRoutes } from './shopping-routes';

describe('Comprobar existencia de elementos en el modulo de compras', () => {
  before(() => {
    cy.createShopping({ fastCreation: true });
  });

  beforeEach(() => {
    cy.loginUser();
    cy.navigateToShoppingModule();
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
