describe('Modulo de cosechas', () => {
  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('harvests');
    cy.wait(2000);
  });

  it('Debe ingresar a la ruta correcta ', () => {
    cy.contains('Cosechas');
    cy.checkCurrentUrl('harvests/view/all');
  });

  it('Debe contener los elementos necesarios', () => {
    // Barra de busqueda

    cy.get('form[id="formSearch"]').within((form) => {
      cy.get('button[data-testid="btn-open-command-crop"]')
        .should('exist')
        .should('be.enabled');
      cy.get('button[data-testid="btn-refetch-data"]')
        .should('exist')
        .should('be.enabled');
      cy.get('button[data-testid="btn-clear-filters"]')
        .should('exist')
        .should('be.enabled');
      cy.get('button[data-testid="btn-harvests-filters"]')
        .should('exist')
        .should('be.enabled');
    });

    cy.existRefetchButton();
    cy.existCreateButton();

    cy.existPaginationInfo();

    cy.contains('Mostrar cantidad cosechada como:');
    cy.get('button[data-testid="btn-select-mass-unit-of-measure"]')
      .should('exist')
      .should('be.enabled');

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

  it('Se puede seleccionar y deseleccionar los elementos al dar clic sobre el checkbox del encabezado', () => {
    cy.checkClearSelectionButtonState(false);
    cy.checkDeleteBulkButtonState(false);

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
    cy.visit('/app/home/page');
    cy.wait(3000);
    cy.get('body').type('{ctrl}j');
    cy.get('input[data-testid="input-command-search"]').type('cosechas');
    cy.get('div[data-testid="command-item-harvests"]').click();
    cy.checkCurrentUrl('harvests/view/all');
  });
});

describe('Creación de cosechas', () => {
  before(() => {
    // Crear cultivo y empleados desde el seed
    cy.executeSeed({ employees: 3, crops: 3 });
  });

  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('harvests');
    cy.wait(700);
    cy.clickOnCreateButton();
  });

  it('Debe crear un cultivo', () => {
    cy.openCalendar();

    cy.selectCalendarMonth(4);
    cy.selectCalendarYear(2025);
    cy.selectCalendarDay(19);

    // Seleccionar cultivo
    cy.openCommandField('crop');
    cy.selectCommandOption('1');

    // Abrir formulario interno
    cy.openHarvestDetailForm();

    // Seleccionar empleado
    cy.openCommandField('employee');
    cy.selectCommandOption('1');

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
    cy.selectCommandOption('1');

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
      expect(currentUrl).to.not.include('/app/home/harvests/create');
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
    cy.checkCurrentUrl('/app/home/harvests/create/one');
    cy.checkDialogIsNotVisible();
  });

  it('No debe permitir al usuario salir del formulario cuando hay campos rellenados, cerrando el sonner (salir usando sidebar)', () => {
    cy.getFormTextArea('observation').type('Simple observación...');
    cy.navigateToModuleWithSideBar('harvests');
    cy.checkMessageLostFormData();
    cy.clickOnCloseToast();
    cy.wait(500);
    cy.checkCurrentUrl('/app/home/harvests/create/one');

    cy.openHarvestDetailForm();
    cy.get('form[id="formHarvestDetail"]').within(() => {
      cy.get('input[name="amount"]').clear().type('55');
    });
    cy.clickOnCloseFormDialog();
    cy.checkMessageLostFormData();
    cy.clickOnCloseToast();

    cy.checkDialogIsVisible();
  });
});

describe('Modificación de cosechas', () => {
  let currentHarvest: any = {};

  before(() => {
    cy.executeClearSeedData({ harvests: true });
    cy.createHarvest({ fastCreation: true }).then((data) => {
      currentHarvest = { ...data };
    });
  });

  beforeEach(() => {
    cy.loginUser();
    cy.visit(`/app/home/harvests/update/one/${currentHarvest.id}`);
    cy.wait(3000);
  });

  it('Modificar cosecha existente', () => {
    cy.clickActionsButtonTableRow(currentHarvest.details[0].id);
    cy.clickOnUpdateDetailRecord();
    cy.wait(500);
    cy.get('form[id="formHarvestDetail"]').within(() => {
      cy.get('input[name="amount"]').clear().type('65');
    });
    cy.get('form[id="formHarvestDetail"]').within(() => {
      cy.get('input[name="value_pay"]').clear().type('75000');
    });

    cy.clickOnSubmitHarvestDetailForm();
    cy.wait(500);

    cy.clickActionsButtonTableRow(currentHarvest.details[1].id);
    cy.clickOnUpdateDetailRecord();
    cy.wait(500);
    cy.get('form[id="formHarvestDetail"]').within(() => {
      cy.get('input[name="amount"]').clear().type('35');
    });
    cy.get('form[id="formHarvestDetail"]').within(() => {
      cy.get('input[name="value_pay"]').clear().type('42000');
    });

    cy.clickOnSubmitHarvestDetailForm();
    cy.wait(500);

    cy.clickOnSubmitButton();
    cy.checkDisabledSubmitButton();
    cy.contains('Cosecha actualizada');
  });

  it('Debe advertir al usuario antes de salir del formulario si hay campos rellenados (salir usando sidebar)', () => {
    cy.openCalendar();
    cy.selectCalendarDay(12);

    cy.navigateToModuleWithSideBar('harvests');
    cy.checkMessageLostFormData();
    cy.clickOnCloseToast();

    cy.openHarvestDetailForm();
    cy.get('form[id="formHarvestDetail"]').within(() => {
      cy.get('input[name="amount"]').clear().type('65');
    });
    cy.clickOnCloseFormDialog();
    cy.checkMessageLostFormData();

    cy.checkCurrentUrl('/app/home/harvests/update/one');
    cy.checkDialogIsVisible();
  });

  it('Debe permitir al usuario salir del formulario incluso si hay campos rellenados, presionando "Ignorar" (salir usando sidebar)', () => {
    cy.openCalendar();
    cy.selectCalendarDay(12);
    cy.navigateToModuleWithSideBar('harvests');
    cy.checkMessageLostFormData();
    cy.clickOnIgnoreButton();
    cy.wait(500);
    cy.url().then((currentUrl) => {
      expect(currentUrl).to.not.include('/app/home/harvests/update');
    });

    cy.wait(500);
    cy.visit(`/app/home/harvests/update/one/${currentHarvest.id}`);
    cy.openHarvestDetailForm();
    cy.get('form[id="formHarvestDetail"]').within(() => {
      cy.get('input[name="amount"]').clear().type('55');
    });
    cy.clickOnCloseFormDialog();
    cy.checkMessageLostFormData();
    cy.clickOnIgnoreButton();
    cy.checkCurrentUrl(`/app/home/harvests/update/one/${currentHarvest.id}`);
    cy.checkDialogIsNotVisible();
  });

  it('No debe permitir al usuario salir del formulario cuando hay campos rellenados, cerrando el sonner (salir usando sidebar)', () => {
    cy.openCalendar();
    cy.selectCalendarDay(12);
    cy.navigateToModuleWithSideBar('harvests');
    cy.checkMessageLostFormData();
    cy.clickOnCloseToast();
    cy.wait(500);
    cy.checkCurrentUrl(`/app/home/harvests/update/one/${currentHarvest.id}`);

    cy.openHarvestDetailForm();
    cy.get('form[id="formHarvestDetail"]').within(() => {
      cy.get('input[name="amount"]').clear().type('55');
    });
    cy.clickOnCloseFormDialog();
    cy.checkMessageLostFormData();
    cy.clickOnCloseToast();
    cy.checkDialogIsVisible();
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
    cy.navigateToModuleWithSideBar('harvests');
  });

  it('Eliminar cosecha', () => {
    cy.clickActionsButtonTableRow(currentHarvest.id);
    cy.clickOnDeleteRecord();
    cy.clickOnContinueDeleteOneRecord();
    cy.contains('Cosecha eliminada');
  });

  // TODO: Implementar pruebas
  // it('Intentar eliminar cosecha con pagos realizados', () => {});

  // it('Intentar eliminar cosecha con stock procesado', () => {});
});

describe('Eliminación de cosechas por lote', () => {
  before(() => {
    cy.executeClearSeedData({ harvests: true });
    for (let index = 0; index < 5; index++) {
      cy.createHarvest({ fastCreation: true });
    }
  });

  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('harvests');
  });

  it('Eliminar cosechas seleccionadas', () => {
    cy.wait(3000);
    cy.toggleSelectAllTableRows();
    cy.clickOnDeleteBulkButton();
    cy.clickOnContinueDeleteBulkRecord();
    cy.checkLoadingInformation();
    cy.contains('Los registros seleccionados fueron eliminados');
    cy.checkNoRecordsMessage();
  });

  // TODO: Implementar pruebas
  // it('Intentar eliminar cosechas con regsitros pagos', () => {});
  // it('Intentar eliminar cosechas con stock procesado', () => {});
});

describe('Copiar Id de registro', () => {
  it('Copiar Id del usuario', () => {
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

describe('Ver registro de cosecha', () => {
  it('Ver registro de cosecha', () => {
    cy.executeClearSeedData({ harvests: true });
    cy.createHarvest({ fastCreation: true }).then((currentHarvest) => {
      cy.loginUser();
      cy.navigateToModuleWithSideBar('harvests');
      cy.wait(500);
      cy.clickActionsButtonTableRow(currentHarvest.id);
      cy.clickOnViewRecord();
      cy.contains('Información');
      cy.contains('Volver');
    });
  });
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
    cy.checkPaginationValues();
    cy.clickOnGoNextPageButton();
    cy.checkTablePageInfoContains('Página 2 de 2');
    cy.clickOnGoPreviousPageButton();
    cy.checkTablePageInfoContains('Página 1 de 2');
  });
});

describe('Auth modulo de cosechas', () => {
  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('harvests');
  });

  it('Crear usuario con acceso unicamente al modulo de cosechas', () => {
    cy.createSeedUser({ modules: ['harvests'] }).then((userData) => {
      cy.createHarvestAnd((harvestData) => {
        cy.logoutUser();
        cy.wait(2000);
        cy.log(userData);
        cy.loginUser(userData.email, userData.password);
        cy.wait(1500);
        cy.get('ul[data-sidebar="menu"]').within(() => {
          cy.get('li[data-sidebar="menu-item"]')
            .should('have.length', 1)
            .contains('Cosechas');
        });
        cy.get('body').type('{ctrl}j');
        cy.get('div[cmdk-item][role="option"]').should('have.length', 1);

        cy.get('div[cmdk-item][role="option"]').click();

        // cy.visit(`/app/home/crops/view/all?query=${cropData.name}`);
        cy.wait(2000);

        // Comprobar que haya registro en las tablas
        cy.get('table tbody tr').should('exist');

        // Comprobar habitiación de botones
        // Recarga de datos
        cy.get('button[data-testid="btn-refetch-data"]').should('be.enabled');

        // Crear registro
        cy.get('button[data-testid="btn-create-record"]').should('be.enabled');

        cy.get('button[aria-label="Select all"]').click(); // Deselecciona todos
        cy.wait(700);
        // Eliminar bulk
        cy.get('button[data-testid="btn-delete-bulk"]').should('be.enabled');

        // cy.clickActionsButtonTableRow(cropData.id);

        // cy.checkActionButtonsState({ update: true, view: true, delete: true });
      });
    });
  });

  it('Crear usuario con acceso unicamente a ver tabla de cosechas', () => {
    cy.createSeedUser({ actions: ['find_all_harvests'] }).then(
      (userData) => {
        cy.createHarvestAnd((harvestData) => {
          cy.logoutUser();
          cy.wait(2000);
          cy.log(userData);
          cy.loginUser(userData.email, userData.password);
          cy.wait(1500);
          cy.get('ul[data-sidebar="menu"]').within(() => {
            cy.get('li[data-sidebar="menu-item"]')
              .should('have.length', 1)
              .contains('Cosechas');
          });
          cy.get('body').type('{ctrl}j');
          cy.get('div[cmdk-item][role="option"]').should('have.length', 1);

          cy.get('div[cmdk-item][role="option"]').click();

          // cy.visit(`/app/home/crops/view/all?query=${cropData.name}`);
          cy.wait(2000);

          // Comprobar que haya registro en las tablas
          cy.get('table tbody tr').should('exist');

          // Comprobar habitiación de botones
          // Recarga de datos
          cy.get('button[data-testid="btn-refetch-data"]').should('be.enabled');

          // Crear registro
          cy.get('button[data-testid="btn-create-record"]').should(
            'be.disabled'
          );

          cy.get('button[aria-label="Select all"]').click(); // Deselecciona todos
          cy.wait(700);
          // Eliminar bulk
          cy.get('button[data-testid="btn-delete-bulk"]').should('be.disabled');

          // cy.clickActionsButtonTableRow(cropData.id);

          // cy.checkActionButtonsState({
          //   update: false,
          //   view: false,
          //   delete: false,
          // });
        });
      }
    );
  });

  it('No tiene permisos para ver el listado de cultivos', () => {
    cy.createSeedUser({ actions: ['create_harvest'] }, (userData) => {
      cy.createHarvestAnd((harvestData) => {
        cy.logoutUser();
        cy.wait(2000);
        cy.log(userData);
        cy.loginUser(userData.email, userData.password);
        cy.wait(1500);
        cy.get('ul[data-sidebar="menu"]').within(() => {
          cy.get('li[data-sidebar="menu-item"]')
            .should('have.length', 1)
            .contains('Cosechas');
        });
        cy.get('body').type('{ctrl}j');
        cy.get('div[cmdk-item][role="option"]').should('have.length', 1);
        cy.get('div[cmdk-item][role="option"]').click();

        cy.visit(`/app/home/harvests/view/all`);
        cy.wait(2000);
        cy.contains('No tienes permiso para ver el listado de las cosechas');
        cy.checkRefetchButtonState(false);
        // cy.get('input[placeholder="Escribe algo..."]').should('be.disabled');
        // cy.get('button[data-testid="btn-submit-basic-searchbar"]').should(
        //   'be.disabled'
        // );
        // cy.get('button[data-testid="btn-clear-basic-searchbar"]').should(
        //   'be.disabled'
        // );
      });
    });
  });

  it('Debe sacar al usuario si intenta crear una cosecha y no tiene permisos ', () => {
    cy.createSeedUser({ actions: ['find_all_harvests'] }).then(
      (data: any) => {
        cy.logoutUser();
        cy.wait(2000);
        cy.loginUser(data.email, data.password);
        cy.wait(1500);
        cy.get('ul[data-sidebar="menu"]').within(() => {
          cy.get('li[data-sidebar="menu-item"]')
            .should('have.length', 1)
            .contains('Cosechas');
        });
        cy.get('body').type('{ctrl}j');
        cy.get('div[cmdk-item][role="option"]').should('have.length', 1);
        cy.get('div[cmdk-item][role="option"]').click();

        cy.visit(`/app/home/harvests/view/all`);
        cy.wait(2000);

        cy.visit('/app/home/harvests/create/one');
        cy.contains('No tienes permiso para esta acción, seras redirigido');
      }
    );
  });

  it('Debe sacar al usuario si intenta modificar a una cosecha y no tiene permisos', () => {
    cy.createSeedUser({ actions: ['find_all_harvests'] }).then(
      (userData: any) => {
        cy.createHarvestAnd((harvestData) => {
          cy.logoutUser();
          cy.wait(2000);
          cy.loginUser(userData.email, userData.password);
          cy.wait(1500);
          cy.get('ul[data-sidebar="menu"]').within(() => {
            cy.get('li[data-sidebar="menu-item"]')
              .should('have.length', 1)
              .contains('Cosechas');
          });
          cy.get('body').type('{ctrl}j');
          cy.get('div[cmdk-item][role="option"]').should('have.length', 1);
          cy.get('div[cmdk-item][role="option"]').click();

          cy.visit(`/app/home/harvests/update/one/${harvestData.id}`);
          cy.contains('No tienes permiso para esta acción, seras redirigido');
        });
      }
    );
  });

  it('Debe sacar al usuario si intenta consultar a una cosecha y no tiene permisos', () => {
    cy.createSeedUser({ actions: ['find_all_harvests'] }).then(
      (data: any) => {
        cy.createHarvestAnd((harvestData) => {
          cy.log(JSON.stringify(data, null, 2));
          cy.logoutUser();
          cy.wait(2000);
          cy.loginUser(data.email, data.password);
          cy.wait(1500);
          cy.get('ul[data-sidebar="menu"]').within(() => {
            cy.get('li[data-sidebar="menu-item"]')
              .should('have.length', 1)
              .contains('Cosechas');
          });
          cy.get('body').type('{ctrl}j');
          cy.get('div[cmdk-item][role="option"]').should('have.length', 1);
          cy.get('div[cmdk-item][role="option"]').click();

          cy.visit(`/app/home/harvests/view/one/${harvestData.id}`);
          cy.contains('No tienes permiso para esta acción, seras redirigido');
        });
      }
    );
  });
});
