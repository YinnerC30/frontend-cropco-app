import { BASE_HOME_PAGE_URL, TEST_UUID_VALID } from 'cypress/helpers/constants';
import { FormatMoneyValue } from 'cypress/helpers/formatting/FormatMoneyValue';
import { harvestsRoutes } from './harvests-routes';
// import { harvestsData } from './data/get-all-harvests.data';

describe('Comprobar existencia de elementos en el modulo de cosechas', () => {
  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('harvests');
  });

  it('Debe ingresar a la ruta correcta ', () => {
    cy.contains('Usuarios');
    cy.checkCurrentUrl(harvestsRoutes.listAll());
  });

  it('Debe contener los elementos necesarios', () => {
    // TODO: Comprobar existencia de barra de busqueda

    cy.existRefetchButton();
    cy.existCreateButton();

    cy.existPaginationInfo();

    cy.contains('Mostrar cantidad cosechada como:');
    cy.checkMassUnitOfMeasureButton();

    cy.contains('Fecha:');
    cy.contains('Cultivo:');
    cy.contains('Empleados:');
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
    cy.openCommandPaletteAndSelect('cosechas', 'harvests');
    cy.checkCurrentUrl(harvestsRoutes.listAll());
  });
});

// describe.skip('Encuentra registros de acuerdo a la cadena de busqueda', () => {
//   before(() => {
//     cy.executeClearSeedData({ harvests: true });
//     for (let i = 0; i < 5; i++) {
//       cy.createCrop({}, { fastCreation: true });
//     }
//   });

//   beforeEach(() => {
//     cy.loginUser();
//     cy.navigateToModuleWithSideBar('harvests');
//   });

//   it('Busqueda por nombre del cosecha', () => {
//     cy.createCrop({}, { fastCreation: true }).then((data) => {
//       const {
//         id,
//         name,
//         description,
//         number_hectares,
//         units,
//         location,
//         // date_of_creation,
//         // date_of_termination,
//       } = data;
//       cy.typeOnInputBasicSearchBar(name);
//       cy.clickOnSubmitBasicSearchBar();
//       cy.checkTableRowValues(id, [
//         name,
//         description,
//         number_hectares,
//         units,
//         location,
//         // date_of_creation,
//         // date_of_termination,
//       ]);
//     });
//   });

//   it('Busqueda por id del cosecha', () => {
//     cy.createCrop({}, { fastCreation: true }).then((data) => {
//       const {
//         id,
//         name,
//         description,
//         number_hectares,
//         units,
//         location,
//         // date_of_creation,
//         // date_of_termination,
//       } = data;
//       cy.typeOnInputBasicSearchBar(id);
//       cy.clickOnSubmitBasicSearchBar();
//       cy.checkTableRowValues(id, [
//         name,
//         description,
//         number_hectares,
//         units,
//         location,
//         // date_of_creation,
//         // date_of_termination,
//       ]);
//     });
//   });
// });

describe('Creación de cosechas', () => {
  before(() => {
    cy.executeClearSeedData({ harvests: true, crops: true, employees: true });
    for (let i = 0; i < 2; i++) {
      cy.createCrop({}, { fastCreation: true });
      cy.createEmployee({}, { fastCreation: true });
    }
  });

  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('harvests');
    cy.wait(700);
    cy.clickOnCreateButton();
  });

  it('Debe crear un cosecha', () => {
    cy.openCalendar();

    cy.selectCalendarMonth(4);
    cy.selectCalendarYear(2025);
    cy.selectCalendarDay(19);

    // Seleccionar cultivo
    cy.openCommandField('crop');
    cy.selectCommandOption('0');

    // Abrir formulario interno
    cy.openHarvestDetailForm();

    // Seleccionar empleado
    cy.openCommandField('employee');
    cy.selectCommandOption('0');

    // Unidad de medida
    cy.openSelectField();
    cy.selectSelectOption('KILOGRAMOS');

    cy.get('form[id="formHarvestDetail"]').within(() => {
      cy.get('input[name="amount"]').clear().type('55');
    });
    cy.get('form[id="formHarvestDetail"]').within(() => {
      cy.get('input[name="value_pay"]').clear().type('60000');
    });

    cy.clickOnSubmitHarvestDetailForm();

    // Abrir formulario interno
    cy.openHarvestDetailForm();

    // Seleccionar empleado
    cy.openCommandField('employee');
    cy.selectCommandOption('0');

    // Unidad de medida
    cy.openSelectField();
    cy.selectSelectOption('KILOGRAMOS');

    cy.get('form[id="formHarvestDetail"]').within(() => {
      cy.get('input[name="amount"]').clear().type('45');
    });
    cy.get('form[id="formHarvestDetail"]').within(() => {
      cy.get('input[name="value_pay"]').clear().type('50000');
    });

    cy.clickOnSubmitHarvestDetailForm();

    // Validar totales
    cy.get('div[data-testid="badge-amount"]').contains('100,00');
    cy.get('div[data-testid="badge-value-pay"]').contains('$ 110.000');

    cy.clickOnSubmitButton();
    cy.checkDisabledSubmitButton();
    cy.contains('Cosecha creada');
  });

  it('Debe crear un cosecha con unidades de medida diferentes', () => {
    cy.openCalendar();

    cy.selectCalendarMonth(4);
    cy.selectCalendarYear(2025);
    cy.selectCalendarDay(19);

    // Seleccionar cultivo
    cy.openCommandField('crop');
    cy.selectCommandOption('0');

    // Abrir formulario interno
    cy.openHarvestDetailForm();

    // Seleccionar empleado
    cy.openCommandField('employee');
    cy.selectCommandOption('0');

    // Unidad de medida
    cy.openSelectField();
    cy.selectSelectOption('LIBRAS');

    cy.get('form[id="formHarvestDetail"]').within(() => {
      cy.get('input[name="amount"]').clear().type('55');
    });
    cy.get('form[id="formHarvestDetail"]').within(() => {
      cy.get('input[name="value_pay"]').clear().type('30000');
    });

    cy.clickOnSubmitHarvestDetailForm();

    // Abrir formulario interno
    cy.openHarvestDetailForm();

    // Seleccionar empleado
    cy.openCommandField('employee');
    cy.selectCommandOption('0');

    // Unidad de medida
    cy.openSelectField();
    cy.selectSelectOption('ONZAS');

    cy.get('form[id="formHarvestDetail"]').within(() => {
      cy.get('input[name="amount"]').clear().type('45');
    });
    cy.get('form[id="formHarvestDetail"]').within(() => {
      cy.get('input[name="value_pay"]').clear().type('4500');
    });

    cy.clickOnSubmitHarvestDetailForm();

    // Validar totales
    cy.get('div[data-testid="badge-amount"]').contains('26,22');
    cy.get('div[data-testid="badge-value-pay"]').contains('$ 34.500');

    cy.clickOnSubmitButton();
    cy.checkDisabledSubmitButton();
    cy.contains('Cosecha creada');
  });

  it('Debe mostrar mensajes de error al intentar enviar el formulario vacio', () => {
    cy.clickOnSubmitButton();
    cy.contains('La fecha es un campo obligatorio');
    cy.contains('La opción seleccionada no es valida.');
    cy.contains('Debes registrar la cosecha de al menos 1 empleado');
    cy.checkMessageFieldsMissing();

    // Abrir formulario interno
    cy.openHarvestDetailForm();
    cy.clickOnSubmitHarvestDetailForm();
    cy.contains('El empleado es un campo obligatorio');
    cy.contains('Debe seleccionar una unidad de medida.');
    cy.contains('El valor cosechado debe ser un número positivo.');
    cy.contains('El valor a pagar debe ser un número positivo.');
    cy.checkMessageFieldsMissing();
  });

  it('Debe advertir al usuario antes de salir del formulario si hay campos rellenados (salir usando sidebar)', () => {
    cy.getFormTextArea('observation').type('Simple observación...');
    cy.navigateToModuleWithSideBar('harvests');
    cy.checkMessageLostFormData();
    cy.clickOnCloseToast();
    cy.wait(500);
    // Abrir formulario interno
    cy.openHarvestDetailForm();
    cy.get('form[id="formHarvestDetail"]').within(() => {
      cy.get('input[name="amount"]').clear().type('55');
    });
    cy.clickOnCloseFormDialog();
    cy.checkMessageLostFormData();
  });

  it('Debe permitir al usuario salir del formulario incluso si hay campos rellenados, presionando "Ignorar" (salir usando sidebar)', () => {
    cy.getFormTextArea('observation').type('Simple observación...');
    cy.navigateToModuleWithSideBar('harvests');
    cy.checkMessageLostFormData();
    cy.clickOnIgnoreButton();
    cy.wait(500);
    cy.url().then((currentUrl) => {
      expect(currentUrl).to.not.include(harvestsRoutes.create());
    });
    cy.clickOnCreateButton();
    cy.wait(500);
    cy.openHarvestDetailForm();
    cy.get('form[id="formHarvestDetail"]').within(() => {
      cy.get('input[name="amount"]').clear().type('55');
    });
    cy.clickOnCloseFormDialog();
    cy.checkMessageLostFormData();
    cy.clickOnIgnoreButton();
    cy.checkCurrentUrl(harvestsRoutes.create());
    cy.checkDialogIsNotVisible();
  });

  it('No debe permitir al usuario salir del formulario cuando hay campos rellenados, cerrando el sonner (salir usando sidebar)', () => {
    cy.getFormTextArea('observation').type('Simple observación...');
    cy.navigateToModuleWithSideBar('harvests');
    cy.checkMessageLostFormData();
    cy.clickOnCloseToast();
    cy.wait(500);
    cy.checkCurrentUrl(harvestsRoutes.create());

    cy.openHarvestDetailForm();
    cy.get('form[id="formHarvestDetail"]').within(() => {
      cy.get('input[name="amount"]').clear().type('55');
    });
    cy.clickOnCloseFormDialog();
    cy.checkMessageLostFormData();
    cy.clickOnCloseToast();

    cy.checkDialogIsVisible();
  });

  it('Debe volver a la tabla de los cosechas al cancelar la creación de un cosecha', () => {
    cy.clickOnCancelRegisterButton();
    cy.url().should('include', harvestsRoutes.listAll());
  });

  it('Debe volver a la tabla de los cosechas al cancelar la creación de un cosecha (con campos rellenados)', () => {
    cy.getFormTextArea('observation').type('Simple observación...');

    cy.clickOnCancelRegisterButton();
    cy.checkMessageLostFormData();
    cy.clickOnIgnoreButton();
    cy.url().should('include', harvestsRoutes.listAll());
  });

  it('Comprobar navegación del breadcrumb', () => {
    cy.get('a[data-testid="breadcrumb-link-item-cosechas"]').click();
    cy.url().should('include', harvestsRoutes.listAll());
  });

  it('Comprobar navegación del breadcrumb (con campos rellenados)', () => {
    cy.getFormTextArea('observation').type('Simple observación...');
    cy.get('a[data-testid="breadcrumb-link-item-cosechas"]').click();
    cy.checkMessageLostFormData();
    cy.clickOnIgnoreButton();
    cy.url().should('include', harvestsRoutes.listAll());
  });
});

describe('Crear cosechas procesadas', () => {
  let currentCrop: any = {};
  let currentHarvest: any = {};
  let currentEmployees: any = {};

  before(() => {
    cy.executeClearSeedData({ harvests: true });
    cy.createHarvest({
      fastCreation: true,
      returnOnlyHarvest: false,
      unitOfMeasure: 'KILOGRAMOS',
    }).then((data) => {
      currentHarvest = { ...data.harvest };
      currentCrop = { ...data.crop };
      currentEmployees = { ...data.employees };
    });
  });

  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('harvests');
    cy.wait(3000);
    cy.clickActionsButtonTableRow(currentHarvest.id);
    cy.clickOnViewProcessedRecords();
  });

  it('Navega correctamente a la ruta esperada', () => {
    cy.checkCurrentUrl(harvestsRoutes.viewProcessed(currentHarvest.id));
  });

  it('Comprobar que se muestre la información de la cosecha', () => {
    cy.get('button[data-testid="btn-calendar-selector"]').should(
      'have.attr',
      'data-value',
      new Date(currentHarvest.date).toISOString().split('T')[0]
    );

    cy.get('input[name="crop.name"]').should('have.value', currentCrop.name);

    cy.getFormTextArea('observation').should(
      'have.value',
      currentHarvest.observation
    );

    // Validar totales
    cy.get('div[data-testid="badge-amount"]').contains('450,00');
    cy.get('div[data-testid="badge-value-pay"]').contains('$ 270.000');
    cy.get('div[data-testid="badge-amount-processed"]').contains('0,00');
  });

  it('Debe crear un registro de cosecha procesada', () => {
    cy.get('button[data-testid="btn-create-harvest-processed"]').click();
    cy.wait(1000);

    const today = new Date();
    const currentDay = today.getDate();

    cy.get('form[id="formHarvestProcessed"]').within(() => {
      cy.openCalendar();
    });

    cy.selectCalendarDay(currentDay);
    cy.wait(1000);

    cy.openSelectField();
    cy.selectSelectOption('KILOGRAMOS');
    cy.get('form[id="formHarvestProcessed"]').within(() => {
      cy.get('input[name="amount"]').clear().type('100');
    });
    cy.get('button[data-testid="form-processed-submit-button"]').click();

    cy.contains('Cosecha procesada creada');
    cy.get('div[data-testid="badge-amount-processed"]').contains('100,00');
  });

  it('Mostrar error al intentar crear una cosecha procesada con un monto superior al permitido', () => {
    cy.get('button[data-testid="btn-create-harvest-processed"]').click();
    cy.wait(1000);

    const today = new Date();
    const currentDay = today.getDate();

    cy.get('form[id="formHarvestProcessed"]').within(() => {
      cy.openCalendar();
    });

    cy.selectCalendarDay(currentDay);
    cy.wait(1000);

    cy.openSelectField();
    cy.selectSelectOption('KILOGRAMOS');
    cy.get('form[id="formHarvestProcessed"]').within(() => {
      cy.get('input[name="amount"]').clear().type('500');
    });
    cy.get('button[data-testid="form-processed-submit-button"]').click();

    cy.contains('El monto ingresado supera el monto total de la cosecha.');
    cy.get('div[data-testid="badge-amount-processed"]').contains('0,00');
  });
});

describe('Eliminar cosechas procesadas', () => {
  before(() => {
    cy.loginUser();
    /* cy.navigateToModuleWithSideBar("harvests"); */
  });

  it('Debe eliminar un registro de cosecha procesada', () => {
    cy.executeClearSeedData({ harvests: true });

    cy.createHarvest({ fastCreation: true, returnOnlyHarvest: false }).then(
      (data) => {
        const { harvest, crop } = data;

        cy.createHarvestProcessed({
          cropId: crop.id,
          harvestId: harvest.id,
          amount: 100,
          unitOfMeasure: 'KILOGRAMOS',
        }).then((data) => {
          cy.navigateToModuleWithSideBar('harvests');
          cy.clickRefetchButton();
          cy.clickActionsButtonTableRow(harvest.id);
          cy.clickOnViewProcessedRecords();
          cy.wait(2000);
          cy.clickActionsButtonTableRow(data.id);
          cy.clickOnDeleteRecord();
          cy.clickOnContinueDeleteOneRecord();
          cy.contains('Cosecha procesada eliminada');
          cy.get('div[data-testid="badge-amount-processed"]').contains('0,00');
        });
      }
    );
  });
});

describe('Modificar cosechas procesadas', () => {
  before(() => {
    cy.loginUser();
  });

  it('Debe modificar un registro de cosecha procesada', () => {
    cy.executeClearSeedData({ harvests: true });

    cy.createHarvest({ fastCreation: true, returnOnlyHarvest: false }).then(
      (data) => {
        const { harvest, crop } = data;

        cy.createHarvestProcessed({
          cropId: crop.id,
          harvestId: harvest.id,
          amount: 100,
          unitOfMeasure: 'KILOGRAMOS',
        }).then((data) => {
          cy.navigateToModuleWithSideBar('harvests');
          cy.clickRefetchButton();
          cy.clickActionsButtonTableRow(harvest.id);
          cy.clickOnViewProcessedRecords();
          cy.wait(2000);
          cy.clickActionsButtonTableRow(data.id);
          cy.clickOnUpdateDetailRecord();
          cy.openSelectField();
          cy.selectSelectOption('KILOGRAMOS');
          cy.get('form[id="formHarvestProcessed"]').within(() => {
            cy.get('input[name="amount"]').clear().type('50');
          });
          cy.get('button[data-testid="form-processed-submit-button"]').click();

          cy.contains('Cosecha procesada actualizada');
          cy.get('div[data-testid="badge-amount-processed"]').contains('50,00');
        });
      }
    );
  });

  it('Mostrar error al intentar modificar una cosecha procesada con un monto superior al permitido', () => {
    cy.createHarvest({ fastCreation: true, returnOnlyHarvest: false }).then(
      (data) => {
        const { harvest, crop } = data;

        cy.createHarvestProcessed({
          cropId: crop.id,
          harvestId: harvest.id,
          amount: 100,
          unitOfMeasure: 'KILOGRAMOS',
        }).then((data) => {
          cy.navigateToModuleWithSideBar('harvests');
          cy.clickRefetchButton();
          cy.clickActionsButtonTableRow(harvest.id);
          cy.clickOnViewProcessedRecords();
          cy.wait(2000);
          cy.clickActionsButtonTableRow(data.id);
          cy.clickOnUpdateDetailRecord();
          cy.openSelectField();
          cy.selectSelectOption('KILOGRAMOS');
          cy.get('form[id="formHarvestProcessed"]').within(() => {
            cy.get('input[name="amount"]').clear().type('500');
          });
          cy.get('button[data-testid="form-processed-submit-button"]').click();

          cy.contains(
            'El monto ingresado supera el monto total de la cosecha.'
          );
          cy.get('div[data-testid="badge-amount-processed"]').contains(
            '100,00'
          );
        });
      }
    );
  });
});

describe('Modificación de cosechas', () => {
  let currentCrop: any = {};
  let currentHarvest: any = {};
  let currentEmployees: any = {};

  before(() => {
    cy.executeClearSeedData({ harvests: true });
    cy.createHarvest({
      fastCreation: true,
      returnOnlyHarvest: false,
      unitOfMeasure: 'KILOGRAMOS',
    }).then((data) => {
      currentHarvest = { ...data.harvest };
      currentCrop = { ...data.crop };
      currentEmployees = { ...data.employees };
    });
  });

  beforeEach(() => {
    cy.loginUser();
    cy.visit(harvestsRoutes.update(currentHarvest.id));
    cy.wait(3000);
  });

  it('Comprobar que se cargue la información de la cosecha antes de modificarla', () => {
    cy.get('button[data-testid="btn-calendar-selector"]').should(
      'have.attr',
      'data-value',
      new Date(currentHarvest.date).toISOString().split('T')[0]
    );
    cy.get('button[data-testid="btn-open-command-crop"]')
      .should('have.attr', 'data-value', currentCrop.id)
      .contains(currentCrop.name);
    cy.getFormTextArea('observation').should(
      'have.value',
      currentHarvest.observation
    );

    cy.log(JSON.stringify(currentHarvest.details, null, 2));

    // Comprobar datos de la tabla

    for (let i = 0; i < currentHarvest.details.length; i++) {
      cy.checkTableRowValues(currentHarvest.details[i].id, [
        currentEmployees[i].first_name,
        currentEmployees[i].last_name,
        currentHarvest.details[i].amount,
        FormatMoneyValue(currentHarvest.details[i].value_pay)
          .split('$')[1]
          .trim(),
        currentHarvest.details[i].unit_of_measure,
      ]);
    }

    // Validar totales
    cy.get('div[data-testid="badge-amount"]').contains('450,00');
    cy.get('div[data-testid="badge-value-pay"]').contains('$ 270.000');
  });

  it('Modificar cosecha existente', () => {
    cy.navigateToModuleWithSideBar('harvests');
    cy.clickRefetchButton();
    cy.clickActionsButtonTableRow(currentHarvest.id);
    cy.clickOnUpdateRecord();
    cy.wait(3000);

    cy.openCalendar();

    cy.selectCalendarMonth(4);
    cy.selectCalendarYear(2025);
    cy.selectCalendarDay(19);

    // Seleccionar cultivo
    cy.openCommandField('crop');
    cy.selectCommandOption('0');

    cy.getFormTextArea('observation').clear().type('ObservationChanged...');

    // Abrir formulario interno
    cy.clickActionsButtonTableRow(currentHarvest.details[0].id);
    cy.clickOnUpdateDetailRecord();
    cy.wait(3000);

    cy.get('form[id="formHarvestDetail"]').within(() => {
      cy.get('input[name="amount"]').clear().type('200');
    });
    cy.get('form[id="formHarvestDetail"]').within(() => {
      cy.get('input[name="value_pay"]').clear().type('120000');
    });
    cy.clickOnSubmitHarvestDetailForm();
    cy.wait(3000);
    cy.clickActionsButtonTableRow(currentHarvest.details[1].id);
    cy.clickOnUpdateDetailRecord();
    cy.wait(3000);

    cy.get('form[id="formHarvestDetail"]').within(() => {
      cy.get('input[name="amount"]').clear().type('200');
    });
    cy.get('form[id="formHarvestDetail"]').within(() => {
      cy.get('input[name="value_pay"]').clear().type('120000');
    });
    cy.clickOnSubmitHarvestDetailForm();
    cy.wait(3000);
    cy.clickActionsButtonTableRow(currentHarvest.details[2].id);
    cy.clickOnUpdateDetailRecord();
    cy.wait(3000);

    cy.get('form[id="formHarvestDetail"]').within(() => {
      cy.get('input[name="amount"]').clear().type('200');
    });
    cy.get('form[id="formHarvestDetail"]').within(() => {
      cy.get('input[name="value_pay"]').clear().type('120000');
    });
    cy.clickOnSubmitHarvestDetailForm();
    cy.wait(3000);

    cy.get('div[data-testid="badge-amount"]').contains('600,00');
    cy.get('div[data-testid="badge-value-pay"]').contains('$ 360.000');

    cy.clickOnSubmitButton();
    cy.checkDisabledSubmitButton();
    cy.contains('Cosecha actualizada');
  });

  it('Debe advertir al usuario antes de salir del formulario si hay campos rellenados (salir usando sidebar)', () => {
    cy.getFormTextArea('observation').clear().type('ObservationChanged');
    cy.navigateToModuleWithSideBar('harvests');
    cy.checkMessageLostFormData();
  });

  it('Debe permitir al usuario salir del formulario incluso si hay campos rellenados, presionando "Ignorar" (salir usando sidebar)', () => {
    cy.getFormTextArea('observation').clear().type('ObservationChanged');
    cy.navigateToModuleWithSideBar('harvests');
    cy.checkMessageLostFormData();
    cy.clickOnIgnoreButton();
    cy.url().then((currentUrl) => {
      expect(currentUrl).to.not.include(
        harvestsRoutes.update(currentHarvest.id)
      );
    });
  });

  it('No debe permitir al usuario salir del formulario cuando hay campos rellenados, cerrando el sonner (salir usando sidebar)', () => {
    cy.getFormTextArea('observation').clear().type('ObservationChanged');
    cy.navigateToModuleWithSideBar('harvests');
    cy.checkMessageLostFormData();
    cy.clickOnCloseToast();
    cy.url().should('include', harvestsRoutes.update(currentHarvest.id));
  });

  it('Debe volver a la tabla de los cosechas al cancelar la modificación de un cosecha', () => {
    cy.clickOnCancelRegisterButton();
    cy.url().should('include', harvestsRoutes.listAll());
  });

  it('Debe volver a la tabla de los cosechas al cancelar la modificación de un cosecha (con campos rellenados)', () => {
    cy.getFormTextArea('observation').clear().type('ObservationChanged');

    cy.clickOnCancelRegisterButton();
    cy.checkMessageLostFormData();
    cy.clickOnIgnoreButton();
    cy.url().should('include', harvestsRoutes.listAll());
  });

  it('Comprobar navegación del breadcrumb', () => {
    cy.get('a[data-testid="breadcrumb-link-item-cosechas"]').click();
    cy.url().should('include', harvestsRoutes.listAll());
  });

  it('Comprobar navegación del breadcrumb (con campos rellenados)', () => {
    cy.getFormTextArea('observation').clear().type('ObservationChanged');
    cy.get('a[data-testid="breadcrumb-link-item-cosechas"]').click();
    cy.checkMessageLostFormData();
    cy.clickOnIgnoreButton();
    cy.url().should('include', harvestsRoutes.listAll());
  });
});

describe('Eliminación de cosecha', () => {
  let currentHarvest: any = {};

  before(() => {
    cy.executeClearSeedData({ harvests: true });
    cy.createHarvest({ fastCreation: true }).then((data) => {
      currentHarvest = { ...data };
    });
  });

  beforeEach(() => {
    cy.loginUser();
  });

  it('Eliminar cosecha', () => {
    cy.navigateToModuleWithSideBar('harvests');
    cy.clickActionsButtonTableRow(currentHarvest.id);
    cy.clickOnDeleteRecord();
    cy.clickOnContinueDeleteOneRecord();
    cy.contains('Cosecha eliminada');
  });

  it('Intentar eliminar cosecha con stock de cosecha procesada', () => {
    cy.executeClearSeedData({ harvests: true });

    cy.createHarvest({ fastCreation: true, returnOnlyHarvest: false }).then(
      (data) => {
        const { harvest, crop } = data;

        cy.createHarvestProcessed({
          cropId: crop.id,
          harvestId: harvest.id,
          amount: 100,
          unitOfMeasure: 'KILOGRAMOS',
        });

        cy.navigateToModuleWithSideBar('harvests');
        cy.wait(5000);
        cy.clickActionsButtonTableRow(harvest.id);
        cy.clickOnDeleteRecord();
        cy.clickOnContinueDeleteOneRecord();
        cy.contains(
          'No se pudo eliminar la cosecha seleccionada, revisa que no tenga registros pagos o registros de cosecha procesada'
        );
      }
    );
  });

  // TODO: Intentar eliminar cosechas con registros pagos
});

describe('Eliminación de cosechas por lote', () => {
  beforeEach(() => {
    cy.executeClearSeedData({ harvests: true });
    cy.loginUser();
    cy.navigateToModuleWithSideBar('harvests');
    cy.clickRefetchButton();
  });

  it('Eliminar cosechas seleccionados', () => {
    for (let index = 0; index < 5; index++) {
      cy.createHarvest({ fastCreation: true });
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

  it('Intentar eliminar cosechas con stock disponible', () => {
    cy.createHarvest({ fastCreation: true, returnOnlyHarvest: false }).then(
      (data) => {
        const { harvest, crop } = data;

        cy.createHarvestProcessed({
          cropId: crop.id,
          harvestId: harvest.id,
          amount: 100,
          unitOfMeasure: 'KILOGRAMOS',
        });

        cy.navigateToModuleWithSideBar('harvests');
        cy.clickRefetchButton();
        cy.wait(3000);
        cy.toggleSelectAllTableRows();
        cy.clickOnDeleteBulkButton();
        cy.clickOnContinueDeleteBulkRecord();
        cy.contains(
          'No se pudieron eliminar las cosechas seleccionadas, revisa que no tengan registros pagos o registros de cosecha procesada'
        );
      }
    );
  });

  it('Eliminar cosechas que tienen conflicto de eliminación y los que no tienen', () => {
    cy.executeClearSeedData({ harvests: true });
    cy.createHarvest({ fastCreation: true });
    cy.createHarvest({ fastCreation: true, returnOnlyHarvest: false }).then(
      (data) => {
        const { harvest, crop } = data;

        cy.createHarvestProcessed({
          cropId: crop.id,
          harvestId: harvest.id,
          amount: 100,
          unitOfMeasure: 'KILOGRAMOS',
        });

        cy.navigateToModuleWithSideBar('harvests');
        cy.clickRefetchButton();
        cy.wait(3000);
        cy.toggleSelectAllTableRows();
        cy.clickOnDeleteBulkButton();
        cy.clickOnContinueDeleteBulkRecord();
        cy.contains(
          'No se pudieron eliminar algunas cosechas, revisa que no tengan registros pagos o registros de cosecha procesada'
        );
      }
    );
  });
});

describe('Exportar cosecha a PDF', () => {
  before(() => {
    cy.executeClearSeedData({ harvests: true });
  });

  it('Generar reporte de cosecha', () => {
    cy.loginUser();
    cy.createHarvest({ fastCreation: true, returnOnlyHarvest: true }).then(
      (currentHarvest) => {
        cy.navigateToModuleWithSideBar('harvests');
        cy.clickActionsButtonTableRow(currentHarvest.id);
        cy.get('button[data-testid="btn-download-pdf"]').click();
        cy.contains('Generando documento PDF...');
        cy.contains('El documento ha sido generado con éxito.');
        const expectedFileName = `reporte-cosecha-${currentHarvest.id}.pdf`;
        const downloadsFolder =
          Cypress.config('downloadsFolder') || 'cypress/downloads';

        cy.readFile(`${downloadsFolder}/${expectedFileName}`, {
          timeout: 10000,
        }).should('exist');
      }
    );
  });

  it('No permite generar reporte si no hay registros', () => {
    cy.executeClearSeedData({ clients: true });
    cy.loginUser();
    cy.navigateToModuleWithSideBar('clients');
    cy.clickRefetchButton();
    cy.checkExportAllClientsButtonState(false);
  });
});

describe('Copiar Id de registro', () => {
  it('Copiar Id del cosecha', () => {
    cy.executeClearSeedData({ harvests: true });
    cy.createHarvest({ fastCreation: true }).then((currentHarvest) => {
      cy.loginUser();
      cy.navigateToModuleWithSideBar('harvests');
      cy.wait(500);
      cy.clickActionsButtonTableRow(currentHarvest.id);
      cy.clickOnCopyIdButton();
    });
  });
});

// TODO: Pendiente por implementar
describe.skip('Ver registro de cosecha', () => {
  it('Ver registro de cosecha', () => {
    cy.executeClearSeedData({ harvests: true });
    cy.createCrop({}, { fastCreation: true }).then((currentHarvest) => {
      cy.loginUser();
      cy.navigateToModuleWithSideBar('harvests');
      cy.wait(500);
      cy.clickActionsButtonTableRow(currentHarvest.id);
      cy.clickOnViewRecord();
      cy.getFormInput('name').should('have.value', currentHarvest.name);
      cy.getFormInput('number_hectares').should(
        'have.value',
        currentHarvest.number_hectares
      );
      cy.getFormInput('units').should('have.value', currentHarvest.units);
      cy.getFormTextArea('location').should(
        'have.value',
        currentHarvest.location
      );
      cy.getFormTextArea('description').should(
        'have.value',
        currentHarvest.description
      );
      cy.contains('Información');
      cy.contains('Volver');
    });
  });

  it('Consultar registro con id no valido', () => {
    cy.loginUser();
    cy.visit(harvestsRoutes.view('no-id'));
    // cy.checkFormInputsAreEmpty();
    cy.checkMessageIncorrectInformation();
    cy.contains('Información');
    cy.contains('Volver');
  });

  it('Consultar registro con id inexistente', () => {
    cy.loginUser();
    cy.visit(harvestsRoutes.view(TEST_UUID_VALID));
    // cy.checkFormInputsAreEmpty();
    cy.checkMessageNotFoundInformation();
    cy.contains('Información');
    cy.contains('Volver');
  });

  // TODO: Crear casos de prueba para observar las tablas de registro donde esta involucrado
});

describe('Paginado y selectores', () => {
  before(() => {
    cy.executeClearSeedData({ harvests: true });
    cy.executeSeed({ harvests: { quantity: 25 } });
  });

  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('harvests');
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

describe('Cambiar unidad de medida para mostrar el stock de los cosechas', () => {
  before(() => {
    cy.executeClearSeedData({ harvests: true });
    cy.createHarvest({ fastCreation: true });
    cy.loginUser();

    cy.navigateToModuleWithSideBar('harvests');
    cy.wait(2000);
  });

  it('Debe mostrar el inventario en la tabla de cosechas de acuerdo a la unidad de medida seleccionada', () => {
    cy.clickOnMassUnitOfMeasureButton();
    cy.selectSelectOption('GRAMOS');

    // Evaluar
    // Obtiene el primer tr y verifica si contiene el número 850.000,00
    cy.get('tbody tr')
      .first()
      .within(() => {
        cy.get('span[data-testid="span-amount"]').should(
          'contain.text',
          '450.000,00'
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
        cy.get('span[data-testid="span-amount"]').should('have.text', '450,00');
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
          '15.873,30'
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
          '992,08'
        );
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
          '0,45'
        );
        cy.get('div[data-testid="badge-unit-of-measure"]').should(
          'have.text',
          't'
        );
      });
  });
});

describe('Auth modulo de cosechas', () => {
  let currentHarvest: any = {};

  before(() => {
    cy.executeClearSeedData({ harvests: true });
    cy.createHarvest({ fastCreation: true }).then((data) => {
      currentHarvest = { ...data };
    });
  });

  it('Crear usuario con acceso unicamente al modulo de cosechas', () => {
    cy.createSeedUser({ modules: ['harvests'] }, (userData) => {
      cy.log(userData);
      cy.loginUser(userData.email, userData.password);
      cy.wait(1500);

      cy.checkSidebarMenuItem('Cosechas');

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

      cy.clickActionsButtonTableRow(currentHarvest.id);

      cy.checkActionButtonsState({ update: true, view: true, delete: true });
    });
  });

  it('Crear usuario con acceso unicamente a ver tabla de cosechas', () => {
    cy.createSeedUser({ actions: ['find_all_harvests'] }, (userData) => {
      cy.wait(2000);
      cy.log(userData);
      cy.loginUser(userData.email, userData.password);
      cy.wait(1500);

      cy.checkSidebarMenuItem('Cosechas');

      cy.openCommandPaletteAndSelectFirstOption();

      cy.wait(2000);

      // Comprobar que haya registro en las tablas
      cy.checkTableRowsExist();

      // Comprobar habilitación de botones
      // Recarga de datos

      cy.checkRefetchButtonState(true);

      // Crear registro
      cy.checkCreateButtonState(true);

      cy.toggleSelectAllTableRows();
      cy.wait(700);

      cy.clickActionsButtonTableRow(currentHarvest.id);

      // Certificar

      cy.checkActionButtonsState({
        update: false,
        view: false,
        delete: false,
      });
    });
  });

  it('No tiene permisos para ver el listado de cosechas', () => {
    cy.createSeedUser({ actions: ['create_harvest'] }, (userData) => {
      cy.loginUser(userData.email, userData.password);
      cy.wait(1500);
      cy.checkSidebarMenuItem('Cosechas');
      cy.openCommandPaletteAndSelectFirstOption();

      cy.wait(2000);
      cy.contains('No tienes permiso para ver el listado de las cosechas');
      cy.checkRefetchButtonState(false);

      // cy.checkSearchBarIsDisabled();
    });
  });

  it('Debe sacar al usuario si intenta crear un cosecha y no tiene permisos ', () => {
    cy.createSeedUser({ actions: ['find_all_harvests'] }, (data: any) => {
      cy.loginUser(data.email, data.password);
      cy.wait(1500);

      cy.checkSidebarMenuItem('Cosechas');
      cy.openCommandPaletteAndSelectFirstOption();

      cy.wait(2000);

      cy.visit(harvestsRoutes.create());
      cy.shouldBeRedirectedForNoPermission();
    });
  });

  it('Debe sacar al usuario si intenta modificar a un cosecha y no tiene permisos', () => {
    cy.createSeedUser({ actions: ['find_all_harvests'] }, (userData: any) => {
      cy.loginUser(userData.email, userData.password);
      cy.wait(1500);
      cy.checkSidebarMenuItem('Cosechas');
      cy.openCommandPaletteAndSelectFirstOption();

      cy.visit(harvestsRoutes.update(currentHarvest.id));
      cy.shouldBeRedirectedForNoPermission();
    });
  });

  it('Debe sacar al usuario si intenta consultar a un cosecha y no tiene permisos', () => {
    cy.createSeedUser({ actions: ['find_all_harvests'] }, (data: any) => {
      cy.loginUser(data.email, data.password);
      cy.wait(1500);
      cy.checkSidebarMenuItem('Cosechas');
      cy.openCommandPaletteAndSelectFirstOption();

      cy.visit(harvestsRoutes.view(currentHarvest.id));
      cy.shouldBeRedirectedForNoPermission();
    });
  });
});
