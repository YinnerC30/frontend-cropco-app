describe('Modulo de cosechas', () => {
  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('harvests');
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
    cy.contains('Cargando información');
  });

  it('Se puede seleccionar todos los elementos al dar clic sobre el checkbox del encabezado', () => {
    cy.wait(2000);
    cy.get('button[data-testid="btn-clear-selection-table"]').should(
      'not.be.visible'
    );
    cy.get('button[data-testid="btn-delete-bulk"]').should('not.be.visible');
    cy.get('button[aria-label="Select all"]').click();
    cy.get('span[data-testid="data-table-row-selection-number"]')
      .invoke('text')
      .then((text) => {
        const value = Number(text.trim());
        expect(value).to.be.greaterThan(0);
      });
    cy.get('button[data-testid="btn-clear-selection-table"]').should(
      'be.visible'
    );
    cy.get('button[data-testid="btn-delete-bulk"]').should('be.visible');
  });

  it('Debe deseleccionar todos los elementos al dar clic nuevamente en el checkbox del encabezado', () => {
    cy.wait(2000);
    cy.get('button[aria-label="Select all"]').click(); // Selecciona todos
    cy.get('span[data-testid="data-table-row-selection-number"]')
      .invoke('text')
      .then((text) => {
        const value = Number(text.trim());
        expect(value).to.be.greaterThan(0);
      });
    cy.get('button[aria-label="Select all"]').click(); // Deselecciona todos
    cy.get('button[data-testid="btn-clear-selection-table"]').should(
      'not.be.visible'
    );
    cy.get('button[data-testid="btn-delete-bulk"]').should('not.be.visible');
    cy.get('span[data-testid="data-table-row-selection-number"]')
      .invoke('text')
      .then((text) => {
        const value = Number(text.trim());
        expect(value).to.equal(0);
      });
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
  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('harvests');
    cy.wait(700);
    cy.clickOnCreateButton();
  });

  it('Debe crear un cultivo', () => {
    cy.openCalendar();

    cy.selectCalendarMonth(4);
    cy.selectCalendarYear(2023);
    cy.selectCalendarDay(19);

    // Seleccionar cultivo
    cy.openCommandField('crop');
    cy.selectCommandOption('1');

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

    cy.get('button[data-testid="form-detail-submit-button"]').click();
    cy.wait(1000);

    // Abrir boton de crear detalle
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

    // Abrir boton de crear detalle
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
    cy.get('button[aria-label="Close toast"]').click();
    cy.wait(500);
    // Abrir boton de crear detalle
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
  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('harvests');
  });

  it('Modificar cosecha existente', () => {
    cy.createHarvestAnd((data: any) => {
      cy.visit(`/app/home/harvests/update/one/${data.id}`);
      cy.clickActionsButtonTableRow(data.details[0].id);
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

      cy.clickActionsButtonTableRow(data.details[1].id);
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

      // cy.validateTotalsHarvestForm({ amount: 100, valuePay: 117000 });

      cy.clickOnSubmitButton();
      cy.checkDisabledSubmitButton();
      cy.contains('Cosecha actualizada');
    });
  });

  it('Debe advertir al usuario antes de salir del formulario si hay campos rellenados (salir usando sidebar)', () => {
    cy.createHarvestAnd((data: any) => {
      cy.visit(`/app/home/harvests/update/one/${data.id}`);
      cy.openCalendar();
      cy.selectCalendarDay(12);

      cy.navigateToModuleWithSideBar('harvests');
      cy.checkMessageLostFormData();
      cy.get('button[aria-label="Close toast"]').click();

      cy.openHarvestDetailForm();
      cy.get('form[id="formHarvestDetail"]').within(() => {
        cy.get('input[name="amount"]').clear().type('65');
      });
      cy.clickOnCloseFormDialog();
      cy.checkMessageLostFormData();

      cy.checkCurrentUrl('/app/home/harvests/update/one');
      cy.checkDialogIsVisible();
    });
  });

  it('Debe permitir al usuario salir del formulario incluso si hay campos rellenados, presionando "Ignorar" (salir usando sidebar)', () => {
    cy.createHarvestAnd((data: any) => {
      cy.visit(`/app/home/harvests/update/one/${data.id}`);
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
      cy.visit(`/app/home/harvests/update/one/${data.id}`);
      cy.openHarvestDetailForm();
      cy.get('form[id="formHarvestDetail"]').within(() => {
        cy.get('input[name="amount"]').clear().type('55');
      });
      cy.clickOnCloseFormDialog();
      cy.checkMessageLostFormData();
      cy.clickOnIgnoreButton();
      cy.checkCurrentUrl(`/app/home/harvests/update/one/${data.id}`);
      cy.checkDialogIsNotVisible();
    });
  });

  it('No debe permitir al usuario salir del formulario cuando hay campos rellenados, cerrando el sonner (salir usando sidebar)', () => {
    cy.createHarvestAnd((data: any) => {
      cy.visit(`/app/home/harvests/update/one/${data.id}`);
      cy.openCalendar();
      cy.selectCalendarDay(12);
      cy.navigateToModuleWithSideBar('harvests');
      cy.checkMessageLostFormData();
      cy.clickOnCloseToast();
      cy.wait(500);
      cy.checkCurrentUrl(`/app/home/harvests/update/one/${data.id}`);

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
});

describe('Eliminación de cosecha', () => {
  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('harvests');
  });

  it('Eliminar cosecha', () => {
    cy.createHarvestAnd((data: any) => {
      cy.visit(
        `/app/home/harvests/view/all?filter_by_value_pay=true&type_filter_value_pay=EQUAL&value_pay=${data.value_pay}`
      );
      cy.wait(500);
      cy.get('button[data-testid="btn-page-size-selector"]').click();
      cy.get(`div[data-testid="select-item-page-size-${50}"]`).click();
      cy.clickActionsButtonTableRow(data.id);
      cy.clickOnDeleteRecord();
      cy.clickOnContinueDeleteRecord();

      cy.contains('Cosecha eliminada');
    });
  });

  // TODO: Implementar pruebas
  // it('Intentar eliminar cosecha con pagos pendientes', () => {});
});

describe('Eliminación de cosechas por lote', () => {
  before(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('harvests');
    for (let index = 0; index < 2; index++) {
      cy.createHarvest({ fastCreation: true });
    }
  });

  it('Eliminar cosechas seleccionadas', () => {
    cy.navigateToModuleWithSideBar('harvests');
    cy.visit(
      `/app/home/harvests/view/all?filter_by_value_pay=true&type_filter_value_pay=EQUAL&value_pay=110000`
    );
    cy.wait(5000);
    cy.get('button[aria-label="Select all"]').click({ timeout: 3000 });
    cy.get('button[data-testid="btn-delete-bulk"]').click();
    cy.get('button[data-testid="btn-continue-delete"]').click();
    cy.contains('Cargando información');
    cy.contains('Los registros seleccionados fueron eliminados');
    cy.contains('No hay registros');
  });

  // TODO: Implementar pruebas
  // it('Intentar eliminar cultivos con stock disponible', () => {});

  // it('Intentar eliminar usuario con rol administrator en lote', () => {
  //   cy.loginUser();
  //   cy.navigateToModuleWithSideBar('crops');
  //   cy.visit(`/app/home/crops/view/all?query=Mantenimiento`);
  //   cy.wait(2000);
  //   cy.get('button[aria-label="Select all"]').click();
  //   cy.get('button[data-testid="btn-delete-bulk"]').click();
  //   cy.get('button[data-testid="btn-continue-delete"]').click();
  //   cy.contains(
  //     'No se pudieron eliminar los cultivos seleccionados, revisa que no tengan rol "Administrador"'
  //   );
  // });
});

describe('Copiar Id de registro', () => {
  it('Copiar Id del usuario', () => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('harvests');
    cy.createHarvest({ fastCreation: true }).then((data: any) => {
      cy.visit(`/app/home/harvests/view/all`);
      cy.wait(5000);
      cy.get('button[data-testid="btn-page-size-selector"]').click();
      cy.get(`div[data-testid="select-item-page-size-${50}"]`).click();
      cy.wait(500);
      cy.clickActionsButtonTableRow(data.id);
      cy.get('button[data-testid="btn-copy-id"]').click();
      cy.contains('Id copiado al portapapeles');
    });
  });
});

describe('Ver registro de cosecha', () => {
  it('Ver registro de cosecha', () => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('harvests');
    cy.createHarvest({ fastCreation: true }).then((data: any) => {
      cy.visit(`/app/home/harvests/view/all`);
      cy.wait(5000);
      cy.get('button[data-testid="btn-page-size-selector"]').click();
      cy.get(`div[data-testid="select-item-page-size-${50}"]`).click();
      cy.wait(500);
      cy.clickActionsButtonTableRow(data.id);
      cy.get('button[data-testid="btn-view-record"]').click();
      cy.contains('Información');
      cy.contains('Volver');
    });
  });
});

describe('Paginado y selectores', () => {
  before(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('harvests');
    cy.wait(2000);
    cy.get('span[data-testid="data-table-row-total"]')
      .invoke('text')
      .then((text) => {
        const total = parseInt(text, 10);
        if (total <= 11) {
          for (let index = 0; index < 11; index++) {
            cy.createHarvest({ fastCreation: true });
          }
        }
      });
    cy.logoutUser();
  });
  it('Navegar entre paginas disponibles (10 registro por página - default)', () => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('harvests');
    cy.wait(2000);
    cy.checkPaginationValues();
    cy.get('button[data-testid="btn-go-next-page"]').click();
    cy.get('p[data-testid="data-table-page-info-number"]').contains(
      'Página 2 de'
    );
    cy.get('button[data-testid="btn-go-previous-page"]').click();
    cy.get('p[data-testid="data-table-page-info-number"]').contains(
      'Página 1 de'
    );
  });

  it('Navegar entre paginas disponibles (20 registro por página)', () => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('harvests');
    cy.wait(2000);
    cy.get('button[data-testid="btn-page-size-selector"]').click();
    cy.get(`div[data-testid="select-item-page-size-${20}"]`).click();
    cy.wait(2000);
    cy.checkPaginationValues();
    cy.get('button[data-testid="btn-go-next-page"]').click();
    cy.wait(2000);
    cy.get('p[data-testid="data-table-page-info-number"]').contains(
      'Página 2 de'
    );
    cy.get('button[data-testid="btn-go-previous-page"]').click();
    cy.wait(2000);
    cy.get('p[data-testid="data-table-page-info-number"]').contains(
      'Página 1 de'
    );
  });
});

describe.only('Auth modulo de cosechas', () => {
  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('harvests');
  });

  it('Crear usuario con acceso unicamente al modulo de cosechas', () => {
    cy.createUser({ selectedModules: ['harvests'] }).then((userData) => {
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
    cy.createUser({ selectedActions: ['find_all_harvests'] }).then(
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
    cy.createUserAnd({ selectedActions: ['create_harvest'] }, (userData) => {
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
    cy.createUser({ selectedActions: ['find_all_harvests'] }).then(
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
    cy.createUser({ selectedActions: ['find_all_harvests'] }).then(
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

  it.only('Debe sacar al usuario si intenta consultar a una cosecha y no tiene permisos', () => {
    cy.createUser({ selectedActions: ['find_all_harvests'] }).then(
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
