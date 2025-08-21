import { BASE_HOME_PAGE_URL } from 'cypress/helpers/constants';
import { paymentsRoutes } from './payments-routes';

describe('Comprobar existencia de elementos en el modulo de pagos', () => {
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

describe('Creación de pagos', () => {
  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('payments');
    cy.executeClearSeedData({
      employees: true,
      harvests: true,
      payments: true,
    });
    cy.wait(700);
    cy.clickOnCreateButton();
  });

  it('Debe crear un pago (cosecha)', () => {
    cy.intercept('GET', '**/employees/pending-payments/all').as(
      'getPendingPaymentsAll'
    );
    cy.createHarvest({ fastCreation: true });

    cy.reload();

    cy.intercept(
      'GET',
      'http://localhost:3000/employees/pending-payments/one/*'
    ).as('getPendingPaymentsOne');

    cy.openCalendar();

    cy.selectCalendarMonth(4);
    cy.selectCalendarYear(2025);
    cy.selectCalendarDay(19);

    // // Seleccionar empleado
    cy.openCommandField('employee');
    cy.selectCommandOption('0');

    cy.wait('@getPendingPaymentsOne').then((interception) => {
      const body = interception.response?.body;
      cy.clickActionsButtonTableRow(body.harvests_detail[0].id);

      cy.get('button[data-testid="action-pay-pending-payment"]')
        .should('exist')
        .click();

      cy.contains('Se ha añadido la cosecha a la cola de pagos');

      cy.get('div[data-testid="badge-value-pay"]').contains('$ 90.000');

      cy.openSelectField();
      cy.selectSelectOption('EFECTIVO');
      cy.clickOnSubmitButton();
      cy.checkDisabledSubmitButton();
      cy.contains('Pago registrado');
    });
  });

  it('Debe crear un pago (trabajo)', () => {
    cy.intercept('GET', '**/employees/pending-payments/all').as(
      'getPendingPaymentsAll'
    );
    cy.createWork({ fastCreation: true });

    cy.reload();

    cy.intercept(
      'GET',
      'http://localhost:3000/employees/pending-payments/one/*'
    ).as('getPendingPaymentsOne');

    cy.openCalendar();

    cy.selectCalendarMonth(4);
    cy.selectCalendarYear(2025);
    cy.selectCalendarDay(19);

    // // Seleccionar empleado
    cy.openCommandField('employee');
    cy.selectCommandOption('0');

    cy.wait('@getPendingPaymentsOne').then((interception) => {
      cy.log(
        'Intercepted response:',
        JSON.stringify(interception.response?.body, null, 2)
      );
      const body = interception.response?.body;
      cy.clickActionsButtonTableRow(body.works_detail[0].id);

      cy.get('button[data-testid="action-pay-pending-payment"]')
        .should('exist')
        .click();

      cy.contains('Se ha añadido el trabajo a la cola de pagos');

      cy.get('div[data-testid="badge-value-pay"]').contains('$ 90.000');

      cy.openSelectField();
      cy.selectSelectOption('EFECTIVO');
      cy.clickOnSubmitButton();
      cy.checkDisabledSubmitButton();
      cy.contains('Pago registrado');
    });
  });

  it('Debe mostrar mensajes de error al intentar enviar el formulario vacío', () => {
    cy.clickOnSubmitButton();
    cy.contains('La fecha es un campo obligatorio');

    cy.contains('El empleado es un campo obligatorio');

    cy.contains('Debes agregar al menos un registro a pagar');
    cy.contains('Debe seleccionar EFECTIVO o TRANSFERENCIA o INTERCAMBIO.');

    cy.checkMessageFieldsMissing();
  });

  it('Debe advertir al usuario antes de salir del formulario si hay campos rellenados (salir usando sidebar)', () => {
    cy.openCalendar();

    cy.selectCalendarMonth(4);
    cy.selectCalendarYear(2025);
    cy.selectCalendarDay(19);

    cy.navigateToModuleWithSideBar('payments');
    cy.checkMessageLostFormData();
  });

  it('Debe permitir al usuario salir del formulario incluso si hay campos rellenados, presionando "Ignorar" (salir usando sidebar)', () => {
    cy.openCalendar();

    cy.selectCalendarMonth(4);
    cy.selectCalendarYear(2025);
    cy.selectCalendarDay(19);

    cy.navigateToModuleWithSideBar('payments');
    cy.checkMessageLostFormData();
    cy.clickOnIgnoreButton();
    cy.wait(500);
    cy.url().then((currentUrl) => {
      expect(currentUrl).to.not.include(paymentsRoutes.create());
    });
  });

  it('No debe permitir al usuario salir del formulario cuando hay campos rellenados, cerrando el sonner (salir usando sidebar)', () => {
    cy.openCalendar();

    cy.selectCalendarMonth(4);
    cy.selectCalendarYear(2025);
    cy.selectCalendarDay(19);

    cy.navigateToModuleWithSideBar('payments');
    cy.checkMessageLostFormData();
    cy.clickOnCloseToast();
    cy.wait(500);
    cy.checkCurrentUrl(paymentsRoutes.create());
  });

  it('Debe volver a la tabla de los pagos al cancelar la creación de un pago (con campos rellenados)', () => {
    cy.openCalendar();

    cy.selectCalendarMonth(4);
    cy.selectCalendarYear(2025);
    cy.selectCalendarDay(19);

    cy.clickOnCancelRegisterButton();
    cy.checkMessageLostFormData();
    cy.clickOnIgnoreButton();
    cy.url().should('include', paymentsRoutes.listAll());
  });

  it('Comprobar navegación del breadcrumb (con campos rellenados)', () => {
    cy.openCalendar();

    cy.selectCalendarMonth(4);
    cy.selectCalendarYear(2025);
    cy.selectCalendarDay(19);

    cy.get('a[data-testid="breadcrumb-link-item-pagos"]').click();
    cy.checkMessageLostFormData();
    cy.clickOnIgnoreButton();
    cy.url().should('include', paymentsRoutes.listAll());
  });
});

describe('Eliminación de pago', () => {
  let currentPayment: any = {};

  before(() => {
    cy.executeClearSeedData({ payments: true });
    cy.createHarvest({ fastCreation: true, returnOnlyHarvest: false }).then(
      (data) => {
        const { harvest, employees } = data;
        cy.createPayment({
          data: {
            employeeId: employees[0].id,
            harvestsId: [harvest.details[0].id],
            worksId: [],
            valuePay: harvest.details[0].value_pay,
            methodOfPayment: 'EFECTIVO',
          },
        }).then((data) => {
          cy.log(JSON.stringify(data, null, 2));
          currentPayment = { ...data };
        });
      }
    );
  });

  beforeEach(() => {
    cy.loginUser();
  });

  it('Eliminar pago', () => {
    cy.navigateToModuleWithSideBar('payments');
    cy.clickActionsButtonTableRow(currentPayment.id);
    cy.clickOnDeleteRecord();
    cy.clickOnContinueDeleteOneRecord();
    cy.contains('Pago eliminado');
  });
});

describe('Eliminación de pagos por lote', () => {
  beforeEach(() => {
    cy.executeClearSeedData({ payments: true });

    cy.createHarvest({ fastCreation: true, returnOnlyHarvest: false }).then(
      (data) => {
        const { harvest, employees } = data;
        cy.createPayment({
          data: {
            employeeId: employees[0].id,
            harvestsId: [harvest.details[0].id],
            worksId: [],
            valuePay: harvest.details[0].value_pay,
            methodOfPayment: 'EFECTIVO',
          },
        });
      }
    );
    cy.loginUser();
    cy.navigateToModuleWithSideBar('payments');

    cy.clickRefetchButton();
  });

  it('Eliminar pagos seleccionados', () => {
    cy.wait(3000);
    cy.toggleSelectAllTableRows();
    cy.clickOnDeleteBulkButton();
    cy.clickOnContinueDeleteBulkRecord();
    cy.checkLoadingInformation();
    cy.contains('Los registros seleccionados fueron eliminados');
    cy.checkNoRecordsMessage();
  });
});

describe.only('Exportar pago a PDF', () => {
  before(() => {
    cy.executeClearSeedData({ payments: true });
  });

  it('Generar reporte de venta', () => {
    cy.loginUser();
    cy.createHarvest({ fastCreation: true, returnOnlyHarvest: false }).then(
      (data) => {
        const { harvest, employees } = data;
        cy.createPayment({
          data: {
            employeeId: employees[0].id,
            harvestsId: [harvest.details[0].id],
            worksId: [],
            valuePay: harvest.details[0].value_pay,
            methodOfPayment: 'EFECTIVO',
          },
        }).then((currentPayment) => {
          cy.log(JSON.stringify(data, null, 2));
          cy.navigateToModuleWithSideBar('payments');
          cy.clickActionsButtonTableRow(currentPayment.id);
          cy.get('button[data-testid="btn-download-pdf"]').click();
          cy.contains('Generando documento PDF...');
          cy.contains('El documento ha sido generado con éxito.');
          const expectedFileName = `reporte-pago-${currentPayment.id}.pdf`;
          const downloadsFolder =
            Cypress.config('downloadsFolder') || 'cypress/downloads';

          cy.readFile(`${downloadsFolder}/${expectedFileName}`, {
            timeout: 10000,
          }).should('exist');
        });
      }
    );
  });
});

describe.only('Copiar Id de registro', () => {
  it('Copiar Id del pago', () => {
    cy.executeClearSeedData({ payments: true });
    cy.createHarvest({ fastCreation: true, returnOnlyHarvest: false }).then(
      (data) => {
        const { harvest, employees } = data;
        cy.createPayment({
          data: {
            employeeId: employees[0].id,
            harvestsId: [harvest.details[0].id],
            worksId: [],
            valuePay: harvest.details[0].value_pay,
            methodOfPayment: 'EFECTIVO',
          },
        }).then((currentPayment) => {
          cy.log(JSON.stringify(data, null, 2));
          cy.loginUser();
          cy.navigateToModuleWithSideBar('payments');
          cy.wait(500);
          cy.clickActionsButtonTableRow(currentPayment.id);
          cy.clickOnCopyIdButton();
        });
      }
    );
  });
});
