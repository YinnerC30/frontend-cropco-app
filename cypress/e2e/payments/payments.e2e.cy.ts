import { BASE_HOME_PAGE_URL } from 'cypress/helpers/constants';
import { paymentsRoutes } from './payments-routes';

describe('Comprobar existencia de elementos en el modulo de pagos', () => {
  beforeEach(() => {
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

describe('Encuentra registros de acuerdo a los filtros de búsqueda', () => {
  before(() => {
    cy.executeClearSeedData({ payments: true });
    for (let i = 0; i < 2; i++) {
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
    }
  });

  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('payments');
  });

  it('Debe buscar el pago por un empleado en especifico', () => {
    cy.openCommandField('employee');
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
        cy.get('button[data-testid="btn-remove-filter-employee"]')
          .should('exist')
          .click();
      });
    cy.checkTableRowTotal('2');
  });

  it('Debe buscar el pago por una fecha (fecha actual)', () => {
    cy.wait(1500);
    cy.get('button[data-testid="btn-payments-filters"]').click();

    cy.get('div[data-testid="filter-date"]').click();

    cy.openSelectField();
    // cy.wait(2000);
    cy.selectSelectOption('EQUAL');

    cy.get('button[data-testid="btn-calendar-selector"]').click();
    cy.selectCalendarDay(new Date().getDate());

    cy.get('button[data-testid="button-filter-date-apply"]').click();
    cy.wait(2000);

    cy.existPaginationInfo();
    cy.checkTableRowsExist();
    cy.checkTableRowTotal('2');

    // Persiste a la recarga manual de la pestaña
    cy.reload();
    cy.existPaginationInfo();
    cy.checkTableRowsExist();
    cy.checkTableRowTotal('2');

    cy.get('div[data-testid="filters-badged-list"]')
      .should('exist')
      .within(() => {
        cy.get('button[data-testid="btn-remove-filter-date"]')
          .should('exist')
          .click();
      });
    cy.checkTableRowTotal('2');
  });

  it('Debe buscar el pago por una fecha (fecha anterior)', () => {
    cy.wait(1500);
    cy.get('button[data-testid="btn-payments-filters"]').click();

    cy.get('div[data-testid="filter-date"]').click();

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
    cy.checkTableRowTotal('2');
  });

  it('Debe buscar el pago por una fecha (fecha posterior)', () => {
    cy.wait(1500);
    cy.get('button[data-testid="btn-payments-filters"]').click();

    cy.get('div[data-testid="filter-date"]').click();

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
    cy.checkTableRowTotal('2');
  });

  it('Debe buscar el pago por un valor (igual a)', () => {
    cy.wait(1500);
    cy.get('button[data-testid="btn-payments-filters"]').click();

    cy.get('div[data-testid="filter-value-pay"]').click();

    cy.get(
      'button[data-testid="btn-select-field"][data-name="filter_by_value_pay.type_filter_value_pay"]'
    ).click();
    cy.selectSelectOption('EQUAL');

    cy.getFormInput('filter_by_value_pay.value_pay').clear();

    cy.getFormInput('filter_by_value_pay.value_pay').type('90000');

    cy.get('button[data-testid="button-filter-value-pay-apply"]').click();
    cy.wait(2000);

    cy.existPaginationInfo();
    cy.checkTableRowsExist();
    cy.checkTableRowTotal('2');

    // Persiste a la recarga manual de la pestaña
    cy.reload();
    cy.existPaginationInfo();
    cy.checkTableRowsExist();
    cy.checkTableRowTotal('2');

    cy.get('div[data-testid="filters-badged-list"]')
      .should('exist')
      .within(() => {
        cy.get('button[data-testid="btn-remove-filter-value_pay"]')
          .should('exist')
          .click();
      });
    cy.checkTableRowTotal('2');
  });
  it('Debe buscar el pago por un valor (mayor a)', () => {
    cy.wait(1500);
    cy.get('button[data-testid="btn-payments-filters"]').click();

    cy.get('div[data-testid="filter-value-pay"]').click();

    cy.get(
      'button[data-testid="btn-select-field"][data-name="filter_by_value_pay.type_filter_value_pay"]'
    ).click();
    cy.selectSelectOption('GREATER_THAN');

    cy.getFormInput('filter_by_value_pay.value_pay').clear();

    cy.getFormInput('filter_by_value_pay.value_pay').type('90000');

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
    cy.checkTableRowTotal('2');
  });
  it('Debe buscar el pago por un valor (menor a)', () => {
    cy.wait(1500);
    cy.get('button[data-testid="btn-payments-filters"]').click();

    cy.get('div[data-testid="filter-value-pay"]').click();

    cy.get(
      'button[data-testid="btn-select-field"][data-name="filter_by_value_pay.type_filter_value_pay"]'
    ).click();
    cy.selectSelectOption('LESS_THAN');

    cy.getFormInput('filter_by_value_pay.value_pay').clear();

    cy.getFormInput('filter_by_value_pay.value_pay').type('90000');

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
    cy.checkTableRowTotal('2');
  });

  it('Debe buscar el pago por un metodo de pago (efectivo)', () => {
    cy.wait(1500);
    cy.get('button[data-testid="btn-payments-filters"]').click();

    cy.get('div[data-testid="filter-method-of-payment"]').click();

    cy.openSelectField();
    cy.selectSelectOption('EFECTIVO');

    cy.get(
      'button[data-testid="button-filter-method-of-payment-apply"]'
    ).click();
    cy.wait(2000);

    cy.existPaginationInfo();
    cy.checkTableRowsExist();
    cy.checkTableRowTotal('2');

    // Persiste a la recarga manual de la pestaña
    cy.reload();
    cy.existPaginationInfo();
    cy.checkTableRowsExist();
    cy.checkTableRowTotal('2');

    cy.get('div[data-testid="filters-badged-list"]')
      .should('exist')
      .within(() => {
        cy.get('button[data-testid="btn-remove-filter-method_of_payment"]')
          .should('exist')
          .click();
      });
    cy.checkTableRowTotal('2');
  });

  it('Debe buscar el pago por un metodo de pago (transferencia)', () => {
    cy.wait(1500);
    cy.get('button[data-testid="btn-payments-filters"]').click();

    cy.get('div[data-testid="filter-method-of-payment"]').click();

    cy.openSelectField();
    cy.selectSelectOption('TRANSFERENCIA');

    cy.get(
      'button[data-testid="button-filter-method-of-payment-apply"]'
    ).click();
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
        cy.get('button[data-testid="btn-remove-filter-method_of_payment"]')
          .should('exist')
          .click();
      });
    cy.checkTableRowTotal('2');
  });

  it('Debe buscar el pago por un metodo de pago (intercambio)', () => {
    cy.wait(1500);
    cy.get('button[data-testid="btn-payments-filters"]').click();

    cy.get('div[data-testid="filter-method-of-payment"]').click();

    cy.openSelectField();
    cy.selectSelectOption('INTERCAMBIO');

    cy.get(
      'button[data-testid="button-filter-method-of-payment-apply"]'
    ).click();
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
        cy.get('button[data-testid="btn-remove-filter-method_of_payment"]')
          .should('exist')
          .click();
      });
    cy.checkTableRowTotal('2');
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

describe('Exportar pago a PDF', () => {
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

describe('Copiar Id de registro', () => {
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

describe('Paginado y selectores', () => {
  before(() => {
    cy.executeClearSeedData({ payments: true });
    for (let i = 0; i < 25; i++) {
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
    }
  });

  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('payments');
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

describe('Auth modulo de pagos', () => {
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
          currentPayment = { ...data };
        });
      }
    );
  });

  it('Crear usuario con acceso unicamente al modulo de pagos', () => {
    cy.createSeedUser({ modules: ['payments'] }, (userData) => {
      cy.log(userData);
      cy.loginUser(userData.email, userData.password);
      cy.wait(1500);

      cy.checkSidebarMenuItem('Pagos');

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

      cy.clickActionsButtonTableRow(currentPayment.id);

      cy.checkActionButtonsState({ view: true, delete: true });
    });
  });

  it('Crear usuario con acceso unicamente a ver tabla de pagos', () => {
    cy.createSeedUser({ actions: ['find_all_payments'] }, (userData) => {
      cy.wait(2000);
      cy.log(userData);
      cy.loginUser(userData.email, userData.password);
      cy.wait(1500);

      cy.checkSidebarMenuItem('Pagos');

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

      cy.clickActionsButtonTableRow(currentPayment.id);

      // Certificar

      cy.checkActionButtonsState({
        view: false,
        delete: false,
      });
    });
  });

  it('No tiene permisos para ver el listado de pagos', () => {
    cy.createSeedUser({ actions: ['create_payment'] }, (userData) => {
      cy.loginUser(userData.email, userData.password);
      cy.wait(1500);
      cy.checkSidebarMenuItem('Pagos');
      cy.openCommandPaletteAndSelectFirstOption();

      cy.wait(2000);
      cy.contains('No tienes permiso para ver el listado de los pagos');
      cy.checkRefetchButtonState(false);

      // cy.checkSearchBarIsDisabled();
    });
  });

  it('Debe sacar al usuario si intenta crear un venta y no tiene permisos ', () => {
    cy.createSeedUser({ actions: ['find_all_payments'] }, (data: any) => {
      cy.loginUser(data.email, data.password);
      cy.wait(1500);

      cy.checkSidebarMenuItem('Pagos');
      cy.openCommandPaletteAndSelectFirstOption();

      cy.wait(2000);

      cy.visit(paymentsRoutes.create());
      cy.shouldBeRedirectedForNoPermission();
    });
  });

  it('Debe sacar al usuario si intenta consultar a un venta y no tiene permisos', () => {
    cy.createSeedUser({ actions: ['find_all_payments'] }, (data: any) => {
      cy.loginUser(data.email, data.password);
      cy.wait(1500);
      cy.checkSidebarMenuItem('Pagos');
      cy.openCommandPaletteAndSelectFirstOption();

      cy.visit(paymentsRoutes.view(currentPayment.id));
      cy.shouldBeRedirectedForNoPermission();
    });
  });
});
