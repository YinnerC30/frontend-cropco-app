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

describe.only('Modificación de cosechas', () => {
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

  it.only('No debe permitir al usuario salir del formulario cuando hay campos rellenados, cerrando el sonner (salir usando sidebar)', () => {
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
