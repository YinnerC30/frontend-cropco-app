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
    cy.get('button[data-testid="btn-calendar-selector"]').click();
    cy.wait(500);

    cy.get('button[data-testid="btn-month-calendar-selector"]').click();
    cy.wait(500);

    cy.get('div[role="option"][data-testid="item-month-4"]').click();
    cy.get('button[data-testid="btn-year-calendar-selector"]').click();
    cy.get('div[role="option"][data-testid="item-year-2023"]').click();

    cy.get('button[name="day"]').contains('19').click();

    // Seleccionar cultivo
    cy.get('button[data-testid="btn-open-command-crop"]').click();
    cy.wait(1000);
    cy.get(
      'div[data-testid="form-field-command-item-1"][role="option"]'
    ).click();
    cy.wait(500);

    // Abrir boton de crear detalle
    cy.get('button[data-testid="btn-open-harvest-detail-form"]').click();

    // Seleccionar empleado
    cy.get('button[data-testid="btn-open-command-employee"]').click();
    cy.wait(1000);
    cy.get(
      'div[data-testid="form-field-command-item-1"][role="option"]'
    ).click();
    cy.wait(500);

    // Unidad de medida
    cy.get('button[data-testid="btn-select-field"]').click();
    cy.get(`div[role="option"][data-value="KILOGRAMOS"]`).click();

    cy.get('form[id="formHarvestDetail"]').within(() => {
      cy.get('input[name="amount"]').clear().type('55');
    });
    cy.get('form[id="formHarvestDetail"]').within(() => {
      cy.get('input[name="value_pay"]').clear().type('60000');
    });

    cy.get('button[data-testid="form-detail-submit-button"]').click();
    cy.wait(1000);

    // Abrir boton de crear detalle
    cy.get('button[data-testid="btn-open-harvest-detail-form"]').click();

    // Seleccionar empleado
    cy.get('button[data-testid="btn-open-command-employee"]').click();
    cy.wait(1000);
    cy.get(
      'div[data-testid="form-field-command-item-0"][role="option"]'
    ).click();
    cy.wait(500);

    // Unidad de medida
    cy.get('button[data-testid="btn-select-field"]').click();
    cy.get(`div[role="option"][data-value="KILOGRAMOS"]`).click();

    cy.get('form[id="formHarvestDetail"]').within(() => {
      cy.get('input[name="amount"]').clear().type('45');
    });
    cy.get('form[id="formHarvestDetail"]').within(() => {
      cy.get('input[name="value_pay"]').clear().type('50000');
    });

    cy.get('button[data-testid="form-detail-submit-button"]').click();

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
    cy.get('button[data-testid="btn-open-harvest-detail-form"]').click();
    cy.get('button[data-testid="form-detail-submit-button"]').click();
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
    cy.get('button[data-testid="btn-open-harvest-detail-form"]').click();
    cy.get('form[id="formHarvestDetail"]').within(() => {
      cy.get('input[name="amount"]').clear().type('55');
    });
    cy.get('button[data-testid="btn-close-form-dialog"]').click();
    cy.checkMessageLostFormData();
  });

  it('Debe permitir al usuario salir del formulario incluso si hay campos rellenados, presionando "Ignorar" (salir usando sidebar)', () => {
    cy.getFormTextArea('observation').type('Simple observación...');
    cy.navigateToModuleWithSideBar('harvests');
    cy.checkMessageLostFormData();
    cy.contains('button', 'Ignorar').click();
    cy.wait(500);
    cy.url().then((currentUrl) => {
      expect(currentUrl).to.not.include('/app/home/harvests/create');
    });
    cy.clickOnCreateButton();
    cy.wait(500);
    cy.get('button[data-testid="btn-open-harvest-detail-form"]').click();
    cy.get('form[id="formHarvestDetail"]').within(() => {
      cy.get('input[name="amount"]').clear().type('55');
    });
    cy.get('button[data-testid="btn-close-form-dialog"]').click();
    cy.checkMessageLostFormData();
    cy.contains('button', 'Ignorar').click();
    cy.checkCurrentUrl('/app/home/harvests/create/one');
    cy.get('div[role="dialog"]').should('not.exist');
  });

  it('No debe permitir al usuario salir del formulario cuando hay campos rellenados, cerrando el sonner (salir usando sidebar)', () => {
    cy.getFormTextArea('observation').type('Simple observación...');
    cy.navigateToModuleWithSideBar('harvests');
    cy.checkMessageLostFormData();
    cy.get('button[aria-label="Close toast"]').click();
    cy.wait(500);
    cy.checkCurrentUrl('/app/home/harvests/create/one');

    cy.get('button[data-testid="btn-open-harvest-detail-form"]').click();
    cy.get('form[id="formHarvestDetail"]').within(() => {
      cy.get('input[name="amount"]').clear().type('55');
    });
    cy.get('button[data-testid="btn-close-form-dialog"]').click();
    cy.checkMessageLostFormData();
    cy.get('button[aria-label="Close toast"]').click();

    cy.get('div[role="dialog"]').should('exist');
  });
});

describe.only('Modificación de cosechas', () => {
  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('harvests');
  });

  it.only('Modificar cosecha existente', () => {
    cy.createHarvestAnd((data: any) => {
      cy.visit(`/app/home/harvests/update/one/${data.id}`);
      // cy.visit(`/app/home/harvests/view/all?query=${name}`);
      // cy.clickActionsButtonTableRow(id);
      // cy.get('button[data-testid="btn-update-record"]').click();
      // cy.getFormInput('name').clear().type('CropNameChanged');

      // cy.clickOnSubmitButton();
      // cy.checkDisabledSubmitButton();
      // cy.contains('Cultivo actualizado');
    });
  });

  // it('Debe advertir al usuario antes de salir del formulario si hay campos rellenados (salir usando sidebar)', () => {
  //   cy.createCropAnd({}, ({ name, id }) => {
  //     cy.visit(`/app/home/harvests/view/all?query=${name}`);
  //     cy.clickActionsButtonTableRow(id);
  //     cy.get('button[data-testid="btn-update-record"]').click();
  //     cy.getFormInput('name').type('CropName');
  //     cy.navigateToModuleWithSideBar('harvests');
  //     cy.checkMessageLostFormData();
  //   });
  // });

  // it('Debe permitir al usuario salir del formulario incluso si hay campos rellenados, presionando "Ignorar" (salir usando sidebar)', () => {
  //   cy.createCropAnd({}, ({ name, id }) => {
  //     cy.visit(`/app/home/crops/view/all?query=${name}`);
  //     cy.clickActionsButtonTableRow(id);
  //     cy.get('button[data-testid="btn-update-record"]').click();
  //     cy.getFormInput('name').type('CropName');
  //     cy.navigateToModuleWithSideBar('crops');
  //     cy.checkMessageLostFormData();
  //     cy.contains('button', 'Ignorar').click();
  //     cy.url().then((currentUrl) => {
  //       expect(currentUrl).to.not.include('/app/home/crops/update');
  //     });
  //   });
  // });

  // it('No debe permitir al usuario salir del formulario cuando hay campos rellenados, cerrando el sonner (salir usando sidebar)', () => {
  //   cy.createCropAnd({}, ({ name, id }) => {
  //     cy.visit(`/app/home/crops/view/all?query=${name}`);
  //     cy.clickActionsButtonTableRow(id);
  //     cy.get('button[data-testid="btn-update-record"]').click();
  //     cy.getFormInput('name').type('CropName');
  //     cy.navigateToModuleWithSideBar('crops');
  //     cy.checkMessageLostFormData();
  //     cy.get('button[aria-label="Close toast"]').click();
  //     cy.url().should('include', '/app/home/crops/update');
  //   });
  // });
});
