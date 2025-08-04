import { BASE_HOME_PAGE_URL, TEST_UUID_VALID } from 'cypress/helpers/constants';
import { InformationGenerator } from '../../helpers/InformationGenerator';
import { suppliesData } from './data/get-all-supplies.data';
import { suppliesRoutes } from './supplies-routes';

describe('Comprobar existencia de elementos en el modulo de insumos', () => {
  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('supplies');
  });

  it('Debe ingresar a la ruta correcta ', () => {
    cy.contains('Usuarios');
    cy.checkCurrentUrl(suppliesRoutes.listAll());
  });

  it('Debe contener los elementos necesarios', () => {
    cy.existBasicSearchBar();

    cy.existRefetchButton();
    cy.existCreateButton();

    cy.existPaginationInfo();

    cy.contains('Mostrar inventario de volumen como:');
    cy.checkVolumeUnitOfMeasureButton();
    cy.contains('Mostrar inventario de longitud como:');
    cy.checkLengthUnitOfMeasureButton();
    cy.contains('Mostrar inventario de masa como:');
    cy.checkMassUnitOfMeasureButton();

    cy.contains('Nombre:');
    cy.contains('Marca:');
    cy.contains('Observación:');
    cy.contains('Inventario actual:');
    cy.contains('Unidad de medida:');

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
    cy.openCommandPaletteAndSelect('insumos', 'supplies');
    cy.checkCurrentUrl(suppliesRoutes.listAll());
  });
});

describe('Encuentra registros de acuerdo a la cadena de busqueda', () => {
  before(() => {
    cy.executeClearSeedData({ supplies: true });
    for (let i = 0; i < 5; i++) {
      cy.createSupply({}, { fastCreation: true });
    }
  });

  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('supplies');
  });

  it('Busqueda por nombre del insumo', () => {
    cy.createSupply({}, { fastCreation: true }).then((data) => {
      const { id, name, brand, observation } = data;
      cy.typeOnInputBasicSearchBar(name);
      cy.clickOnSubmitBasicSearchBar();
      cy.checkTableRowValues(id, [name, brand, observation]);
    });
  });

  it('Busqueda por id del insumo', () => {
    cy.createSupply({}, { fastCreation: true }).then((data) => {
      const { id, name, brand, observation } = data;
      cy.typeOnInputBasicSearchBar(id);
      cy.clickOnSubmitBasicSearchBar();
      cy.checkTableRowValues(id, [name, brand, observation]);
    });
  });
});

describe('Creación de insumos', () => {
  before(() => {
    cy.executeClearSeedData({ supplies: true });
  });

  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('supplies');
    cy.wait(700);
    cy.clickOnCreateButton();
  });

  it('Debe crear un insumo', () => {
    cy.getFormInput('name').type('SupplyName');
    cy.getFormInput('brand').type('BrandName');

    cy.get('button[data-testid="btn-select-group-field"]').click();
    cy.get(`div[role="option"][data-value="KILOGRAMOS"]`).click();

    cy.getFormTextArea('observation').type(
      InformationGenerator.generateObservation()
    );

    cy.clickOnSubmitButton();
    cy.checkDisabledSubmitButton();
    cy.contains('Insumo creado');
  });

  it('Debe mostrar mensajes de error al intentar enviar el formulario vacio', () => {
    cy.clickOnSubmitButton();
    cy.contains('El nombre debe tener al menos 2 caracteres');
    cy.contains('La marca debe tener al menos 3 caracteres');
    cy.contains('Debe seleccionar una unidad de medida');
    cy.contains('La observación debe tener mínimo 10 caracteres');
    cy.checkMessageFieldsMissing();
  });

  it('Debe advertir al usuario antes de salir del formulario si hay campos rellenados (salir usando sidebar)', () => {
    cy.getFormInput('name').type('SupplyName');
    cy.navigateToModuleWithSideBar('supplies');
    cy.checkMessageLostFormData();
  });

  it('Debe permitir al usuario salir del formulario incluso si hay campos rellenados, presionando "Ignorar" (salir usando sidebar)', () => {
    cy.getFormInput('name').type('SupplyName');
    cy.navigateToModuleWithSideBar('supplies');
    cy.checkMessageLostFormData();
    cy.clickOnIgnoreButton();
    cy.url().then((currentUrl) => {
      expect(currentUrl).to.not.include(suppliesRoutes.create());
    });
  });

  it('No debe permitir al usuario salir del formulario cuando hay campos rellenados, cerrando el sonner (salir usando sidebar)', () => {
    cy.getFormInput('name').type('SupplyName');
    cy.navigateToModuleWithSideBar('supplies');
    cy.checkMessageLostFormData();
    cy.clickOnCloseToast();
    cy.url().should('include', suppliesRoutes.create());
  });

  it('Debe volver a la tabla de los insumos al cancelar la creación de un insumo', () => {
    cy.clickOnCancelRegisterButton();
    cy.url().should('include', suppliesRoutes.listAll());
  });

  it('Debe volver a la tabla de los insumos al cancelar la creación de un insumo (con campos rellenados)', () => {
    cy.getFormInput('name').type('SupplyName');

    cy.clickOnCancelRegisterButton();
    cy.checkMessageLostFormData();
    cy.clickOnIgnoreButton();
    cy.url().should('include', suppliesRoutes.listAll());
  });

  it('Comprobar navegación del breadcrumb', () => {
    cy.get('a[data-testid="breadcrumb-link-item-insumos"]').click();
    cy.url().should('include', suppliesRoutes.listAll());
  });

  it('Comprobar navegación del breadcrumb (con campos rellenados)', () => {
    cy.getFormInput('name').type('SupplyName');
    cy.get('a[data-testid="breadcrumb-link-item-insumos"]').click();
    cy.checkMessageLostFormData();
    cy.clickOnIgnoreButton();
    cy.url().should('include', suppliesRoutes.listAll());
  });
});

describe('Modificación de insumos', () => {
  let currenSupply: any = {};

  before(() => {
    cy.executeClearSeedData({ supplies: true });
    cy.createSupply({}, { fastCreation: true }).then((data) => {
      currenSupply = { ...data };
    });
  });

  beforeEach(() => {
    cy.loginUser();
    cy.visit(suppliesRoutes.update(currenSupply.id));
    cy.wait(3000);
  });

  it('Comprobar que se cargue la información del insumo antes de modificarlo', () => {
    cy.getFormInput('name').should('have.value', currenSupply.name);
    cy.getFormInput('brand').should('have.value', currenSupply.brand);
    cy.get('button[data-testid="btn-select-group-field"]').should(
      'have.attr',
      'data-value',
      currenSupply.unit_of_measure
    );
    cy.getFormTextArea('observation').should(
      'have.value',
      currenSupply.observation
    );
  });

  it('Modificar insumo existente', () => {
    cy.navigateToModuleWithSideBar('supplies');
    cy.clickRefetchButton();
    cy.clickActionsButtonTableRow(currenSupply.id);
    cy.clickOnUpdateRecord();
    cy.wait(3000);
    cy.getFormInput('name').clear().type('SupplyNameChanged');
    cy.getFormInput('brand').clear().type('BrandNameChanged');

    cy.getFormTextArea('observation').clear().type('ObservationChanged');
    cy.clickOnSubmitButton();
    cy.checkDisabledSubmitButton();
    cy.contains('Insumo actualizado');
  });

  it('Debe advertir al usuario antes de salir del formulario si hay campos rellenados (salir usando sidebar)', () => {
    cy.getFormInput('name').type('SupplyName');
    cy.navigateToModuleWithSideBar('supplies');
    cy.checkMessageLostFormData();
  });

  it('Debe permitir al usuario salir del formulario incluso si hay campos rellenados, presionando "Ignorar" (salir usando sidebar)', () => {
    cy.getFormInput('name').type('SupplyName');
    cy.navigateToModuleWithSideBar('supplies');
    cy.checkMessageLostFormData();
    cy.clickOnIgnoreButton();
    cy.url().then((currentUrl) => {
      expect(currentUrl).to.not.include(suppliesRoutes.update(currenSupply.id));
    });
  });

  it('No debe permitir al usuario salir del formulario cuando hay campos rellenados, cerrando el sonner (salir usando sidebar)', () => {
    cy.getFormInput('name').type('SupplyName');
    cy.navigateToModuleWithSideBar('supplies');
    cy.checkMessageLostFormData();
    cy.clickOnCloseToast();
    cy.url().should('include', suppliesRoutes.update(currenSupply.id));
  });

  it('Debe volver a la tabla de los insumos al cancelar la modificación de un insumo', () => {
    cy.clickOnCancelRegisterButton();
    cy.url().should('include', suppliesRoutes.listAll());
  });

  it('Debe volver a la tabla de los insumos al cancelar la modificación de un insumo (con campos rellenados)', () => {
    cy.getFormInput('name').type('SupplyName');
    cy.getFormTextArea('observation').type('ObservationChanged');
    cy.clickOnCancelRegisterButton();
    cy.checkMessageLostFormData();
    cy.clickOnIgnoreButton();
    cy.url().should('include', suppliesRoutes.listAll());
  });

  it('Comprobar navegación del breadcrumb', () => {
    cy.get('a[data-testid="breadcrumb-link-item-insumos"]').click();
    cy.url().should('include', suppliesRoutes.listAll());
  });

  it('Comprobar navegación del breadcrumb (con campos rellenados)', () => {
    cy.getFormInput('name').type('SupplyName');
    cy.get('a[data-testid="breadcrumb-link-item-insumos"]').click();
    cy.checkMessageLostFormData();
    cy.clickOnIgnoreButton();
    cy.url().should('include', suppliesRoutes.listAll());
  });
});

describe('Actualizar unidad del insumo', () => {
  beforeEach(() => {
    cy.loginUser();
  });

  it('Modificar unidad de medida del insumo (masa)', () => {
    cy.createCustomSupply({ unitOfMeasure: 'GRAMOS' }).then((data) => {
      cy.visit(suppliesRoutes.update(data.id));
      cy.wait(3000);
      cy.get('button[data-testid="btn-select-group-field"]').click();
      cy.get(`div[role="option"][data-value="KILOGRAMOS"]`)
        .should('be.visible')
        .should('exist');
      cy.get(`div[role="option"][data-value="GRAMOS"]`)
        .should('be.visible')
        .should('exist');
      cy.get(`div[role="option"][data-value="LIBRAS"]`)
        .should('be.visible')
        .should('exist');
      cy.get(`div[role="option"][data-value="TONELADAS"]`)
        .should('be.visible')
        .should('exist');
      cy.get(`div[role="option"][data-value="ONZAS"]`)
        .should('be.visible')
        .should('exist');

      // Comprobar que no se muestren las unidades de medida que no son de masa
      cy.get(`div[role="option"][data-value="LITROS"]`).should('not.exist');
      cy.get(`div[role="option"][data-value="MILILITROS"]`).should('not.exist');
      cy.get(`div[role="option"][data-value="GALONES"]`).should('not.exist');

      cy.get(`div[role="option"][data-value="MILIMETROS"]`).should('not.exist');
      cy.get(`div[role="option"][data-value="CENTIMETROS"]`).should(
        'not.exist'
      );
      cy.get(`div[role="option"][data-value="METROS"]`).should('not.exist');

      cy.get(`div[role="option"][data-value="KILOGRAMOS"]`).click();

      cy.clickOnSubmitButton();
      cy.checkDisabledSubmitButton();
      cy.contains('Insumo actualizado');
    });
  });

  it('Modificar unidad de medida del insumo (volumen)', () => {
    cy.createCustomSupply({ unitOfMeasure: 'LITROS' }).then((data) => {
      cy.visit(suppliesRoutes.update(data.id));
      cy.wait(3000);
      cy.get('button[data-testid="btn-select-group-field"]').click();
      cy.get(`div[role="option"][data-value="KILOGRAMOS"]`).should('not.exist');
      cy.get(`div[role="option"][data-value="GRAMOS"]`).should('not.exist');
      cy.get(`div[role="option"][data-value="LIBRAS"]`).should('not.exist');
      cy.get(`div[role="option"][data-value="TONELADAS"]`).should('not.exist');
      cy.get(`div[role="option"][data-value="ONZAS"]`).should('not.exist');

      // Comprobar que no se muestren las unidades de medida que no son de masa
      cy.get(`div[role="option"][data-value="LITROS"]`)
        .should('be.visible')
        .should('exist');
      cy.get(`div[role="option"][data-value="MILILITROS"]`)
        .should('be.visible')
        .should('exist');
      cy.get(`div[role="option"][data-value="GALONES"]`)
        .should('be.visible')
        .should('exist');

      cy.get(`div[role="option"][data-value="MILIMETROS"]`).should('not.exist');
      cy.get(`div[role="option"][data-value="CENTIMETROS"]`).should(
        'not.exist'
      );
      cy.get(`div[role="option"][data-value="METROS"]`).should('not.exist');

      cy.get(`div[role="option"][data-value="LITROS"]`).click();

      cy.clickOnSubmitButton();
      cy.checkDisabledSubmitButton();
      cy.contains('Insumo actualizado');
    });
  });

  it('Modificar unidad de medida del insumo (longitud)', () => {
    cy.createCustomSupply({ unitOfMeasure: 'MILIMETROS' }).then((data) => {
      cy.visit(suppliesRoutes.update(data.id));
      cy.wait(3000);
      cy.get('button[data-testid="btn-select-group-field"]').click();
      cy.get(`div[role="option"][data-value="KILOGRAMOS"]`).should('not.exist');
      cy.get(`div[role="option"][data-value="GRAMOS"]`).should('not.exist');
      cy.get(`div[role="option"][data-value="LIBRAS"]`).should('not.exist');
      cy.get(`div[role="option"][data-value="TONELADAS"]`).should('not.exist');
      cy.get(`div[role="option"][data-value="ONZAS"]`).should('not.exist');

      // Comprobar que no se muestren las unidades de medida que no son de masa
      cy.get(`div[role="option"][data-value="LITROS"]`).should('not.exist');
      cy.get(`div[role="option"][data-value="MILILITROS"]`).should('not.exist');
      cy.get(`div[role="option"][data-value="GALONES"]`).should('not.exist');

      cy.get(`div[role="option"][data-value="MILIMETROS"]`)
        .should('exist')
        .should('be.visible');
      cy.get(`div[role="option"][data-value="CENTIMETROS"]`)
        .should('exist')
        .should('be.visible');
      cy.get(`div[role="option"][data-value="METROS"]`)
        .should('exist')
        .should('be.visible');

      cy.get(`div[role="option"][data-value="METROS"]`).click();

      cy.clickOnSubmitButton();
      cy.checkDisabledSubmitButton();
      cy.contains('Insumo actualizado');
    });
  });
});

describe('Eliminación de insumo', () => {
  let currenSupply: any = {};

  before(() => {
    cy.executeClearSeedData({ supplies: true });
    cy.createSupply({}, { fastCreation: true }).then((data) => {
      currenSupply = { ...data };
    });
  });

  beforeEach(() => {
    cy.loginUser();
  });

  it('Eliminar insumo', () => {
    cy.navigateToModuleWithSideBar('supplies');
    cy.clickActionsButtonTableRow(currenSupply.id);
    cy.clickOnDeleteRecord();
    cy.clickOnContinueDeleteOneRecord();
    cy.contains('Insumo eliminado');
  });

  it('Intentar eliminar insumo con stock disponible', () => {
    cy.executeClearSeedData({ supplies: true });

    cy.createShopping({ fastCreation: true, returnOnlyShopping: false }).then(
      (data) => {
        cy.navigateToModuleWithSideBar('supplies');
        const { supplies } = data;

        cy.clickActionsButtonTableRow(supplies[0].id);
        cy.clickOnDeleteRecord();
        cy.clickOnContinueDeleteOneRecord();
        cy.contains(
          'No fue posible eliminar el insumo seleccionado. Verifica que no tenga stock disponible'
        );
      }
    );
  });
});

describe('Eliminación de insumos por lote', () => {
  beforeEach(() => {
    cy.executeClearSeedData({ supplies: true });
    cy.loginUser();
    cy.navigateToModuleWithSideBar('supplies');
    cy.clickRefetchButton();
  });

  it('Eliminar insumos seleccionados', () => {
    for (let index = 0; index < 5; index++) {
      cy.createSupply({}, { fastCreation: true });
    }
    cy.clickRefetchButton();
    cy.toggleSelectAllTableRows();
    cy.clickOnDeleteBulkButton();
    cy.clickOnContinueDeleteBulkRecord();
    cy.checkLoadingInformation();
    cy.contains('Los registros seleccionados fueron eliminados');
    cy.checkNoRecordsMessage();
  });

  it('Intentar eliminar insumos con stock disponible', () => {
    cy.createShopping({ fastCreation: true, returnOnlyShopping: false });
    cy.navigateToModuleWithSideBar('supplies');
    cy.clickRefetchButton();
    cy.toggleSelectAllTableRows();
    cy.clickOnDeleteBulkButton();
    cy.clickOnContinueDeleteBulkRecord();
    cy.contains(
      'No fue posible eliminar los insumos seleccionados. Verifica que no tengan stock disponible antes de intentar eliminarlos'
    );
  });

  it('Eliminar insumos que tienen conflicto de eliminación y los que no tienen', () => {
    cy.createSupply({}, { fastCreation: true });
    cy.createShopping({ fastCreation: true, returnOnlyShopping: false });
    cy.navigateToModuleWithSideBar('supplies');
    cy.clickRefetchButton();
    cy.toggleSelectAllTableRows();
    cy.clickOnDeleteBulkButton();
    cy.clickOnContinueDeleteBulkRecord();
    cy.contains(
      'No fue posible eliminar algunos insumos seleccionados. Verifica que no tengan stock disponible antes de intentar eliminarlos'
    );
  });
});

describe('Copiar Id de registro', () => {
  it('Copiar Id del insumo', () => {
    cy.executeClearSeedData({ supplies: true });
    cy.createSupply({}, { fastCreation: true }).then((currenSupply) => {
      cy.loginUser();
      cy.navigateToModuleWithSideBar('supplies');
      cy.wait(500);
      cy.clickActionsButtonTableRow(currenSupply.id);
      cy.clickOnCopyIdButton();
    });
  });
});

describe('Ver registro de insumo', () => {
  it('Ver registro de insumo', () => {
    cy.executeClearSeedData({ supplies: true });
    cy.createSupply({}, { fastCreation: true }).then((currenSupply) => {
      cy.loginUser();
      cy.navigateToModuleWithSideBar('supplies');
      cy.wait(500);
      cy.clickActionsButtonTableRow(currenSupply.id);
      cy.clickOnViewRecord();
      cy.getFormInput('name').should('have.value', currenSupply.name);
      cy.getFormInput('brand').should('have.value', currenSupply.brand);
      cy.get('button[data-testid="btn-select-group-field"]').should(
        'have.attr',
        'data-value',
        currenSupply.unit_of_measure
      );

      cy.getFormTextArea('observation').should(
        'have.value',
        currenSupply.observation
      );
      cy.contains('Información');
      cy.contains('Volver');
    });
  });

  it('Consultar registro con id no valido', () => {
    cy.loginUser();
    cy.visit(suppliesRoutes.view('no-id'));
    // cy.checkFormInputsAreEmpty();
    cy.checkMessageIncorrectInformation();
    cy.contains('Información');
    cy.contains('Volver');
  });

  it('Consultar registro con id inexistente', () => {
    cy.loginUser();
    cy.visit(suppliesRoutes.view(TEST_UUID_VALID));
    // cy.checkFormInputsAreEmpty();
    cy.checkMessageNotFoundInformation();
    cy.contains('Información');
    cy.contains('Volver');
  });

  // TODO: Crear casos de prueba para observar las tablas de registro donde esta involucrado
});

describe('Paginado y selectores', () => {
  before(() => {
    cy.executeClearSeedData({ supplies: true });
    cy.executeSeed({ supplies: 25 });
  });

  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('supplies');
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

describe('Cambiar unidad de medida para mostrar el stock de los insumos', () => {
  before(() => {
    cy.loginUser();
    cy.intercept(
      'GET',
      'http://localhost:3000/supplies/all?query=&limit=10&offset=0&all_records=false',
      {
        statusCode: 200,
        body: suppliesData,
      }
    );
    cy.navigateToModuleWithSideBar('supplies');
    cy.wait(2000);
  });

  it('Debe mostrar el inventario en la tabla de insumos de acuerdo a la unidad de medida seleccionada (masa)', () => {
    // Selecciona el botón por data-testid y verifica que exista y contenga el texto esperado

    cy.checkMassUnitOfMeasureButton();
    cy.checkCurrentMassUnitOfMeasureSelected('KILOGRAMOS');

    cy.get('tbody tr')
      .eq(1)
      .within(() => {
        cy.get('span[data-testid="span-amount"]').should(
          'contain.text',
          '500,00'
        );
        cy.get('div[data-testid="badge-unit-of-measure"]').should(
          'have.text',
          'KILOGRAMOS'
        );
      });

    cy.clickOnMassUnitOfMeasureButton();
    cy.selectSelectOption('GRAMOS');
    // Evaluar
    // Obtiene el primer tr y verifica si contiene el número 850.000,00
    cy.get('tbody tr')
      .eq(1)
      .within(() => {
        cy.get('span[data-testid="span-amount"]').should(
          'contain.text',
          '500.000,00'
        );
        cy.get('div[data-testid="badge-unit-of-measure"]').should(
          'have.text',
          'GRAMOS'
        );
      });

    cy.clickOnMassUnitOfMeasureButton();
    cy.selectSelectOption('ONZAS');
    cy.get('tbody tr')
      .eq(1)
      .within(() => {
        cy.get('span[data-testid="span-amount"]').should(
          'contain.text',
          '17.637,00'
        );
        cy.get('div[data-testid="badge-unit-of-measure"]').should(
          'have.text',
          'ONZAS'
        );
      });

    // Validación para LIBRAS
    cy.clickOnMassUnitOfMeasureButton();
    cy.selectSelectOption('LIBRAS');
    cy.get('tbody tr')
      .eq(1)
      .within(() => {
        cy.get('span[data-testid="span-amount"]').should(
          'contain.text',
          '1102,31'
        );
        cy.get('div[data-testid="badge-unit-of-measure"]').should(
          'have.text',
          'LIBRAS'
        );
      });

    // Validación para TONELADAS
    cy.clickOnMassUnitOfMeasureButton();
    cy.selectSelectOption('TONELADAS');

    cy.get('tbody tr')
      .eq(1)
      .within(() => {
        cy.get('span[data-testid="span-amount"]').should('contain.text', '0,5');
        cy.get('div[data-testid="badge-unit-of-measure"]').should(
          'have.text',
          'TONELADAS'
        );
      });
  });
  it('Debe mostrar el inventario en la tabla de insumos de acuerdo a la unidad de medida seleccionada (volumen)', () => {
    // Selecciona el botón por data-testid y verifica que exista y contenga el texto esperado

    cy.checkVolumeUnitOfMeasureButton();
    cy.checkCurrentVolumeUnitOfMeasureSelected('LITROS');

    cy.get('tbody tr')
      .eq(2)
      .within(() => {
        cy.get('span[data-testid="span-amount"]').should(
          'contain.text',
          '500,00'
        );
        cy.get('div[data-testid="badge-unit-of-measure"]').should(
          'have.text',
          'LITROS'
        );
      });

    cy.clickOnVolumeUnitOfMeasureButton();
    cy.selectSelectOption('MILILITROS');
    // Evaluar
    // Obtiene el primer tr y verifica si contiene el número 850.000,00
    cy.get('tbody tr')
      .eq(2)
      .within(() => {
        cy.get('span[data-testid="span-amount"]').should(
          'contain.text',
          '500.000,00'
        );
        cy.get('div[data-testid="badge-unit-of-measure"]').should(
          'have.text',
          'MILILITROS'
        );
      });

    // Validación para GALONES
    cy.clickOnVolumeUnitOfMeasureButton();
    cy.selectSelectOption('GALONES');

    cy.get('tbody tr')
      .eq(2)
      .within(() => {
        cy.get('span[data-testid="span-amount"]').should(
          'contain.text',
          '132,09'
        );
        cy.get('div[data-testid="badge-unit-of-measure"]').should(
          'have.text',
          'GALONES'
        );
      });
  });
  it('Debe mostrar el inventario en la tabla de insumos de acuerdo a la unidad de medida seleccionada (longitud)', () => {
    // Selecciona el botón por data-testid y verifica que exista y contenga el texto esperado

    cy.checkLengthUnitOfMeasureButton();
    cy.checkCurrentLengthUnitOfMeasureSelected('METROS');

    cy.get('tbody tr')
      .first()
      .within(() => {
        cy.get('span[data-testid="span-amount"]').should(
          'contain.text',
          '500,00'
        );
        cy.get('div[data-testid="badge-unit-of-measure"]').should(
          'have.text',
          'METROS'
        );
      });

    cy.clickOnLengthUnitOfMeasureButton();
    cy.selectSelectOption('MILIMETROS');
    // Evaluar
    // Obtiene el primer tr y verifica si contiene el número 850.000,00
    cy.get('tbody tr')
      .first()
      .within(() => {
        cy.get('span[data-testid="span-amount"]').should(
          'contain.text',
          '500.000,00'
        );
        cy.get('div[data-testid="badge-unit-of-measure"]').should(
          'have.text',
          'MILIMETROS'
        );
      });

    // Validación para CENTIMETROS
    cy.clickOnLengthUnitOfMeasureButton();
    cy.selectSelectOption('CENTIMETROS');

    cy.get('tbody tr')
      .first()
      .within(() => {
        cy.get('span[data-testid="span-amount"]').should(
          'contain.text',
          '50.000,00'
        );
        cy.get('div[data-testid="badge-unit-of-measure"]').should(
          'have.text',
          'CENTIMETROS'
        );
      });
  });
});

describe('Auth modulo de insumos', () => {
  let currenSupply: any = {};

  before(() => {
    cy.executeClearSeedData({ supplies: true });
    cy.createSupply({}, { fastCreation: true }).then((data) => {
      currenSupply = { ...data };
    });
  });

  it('Crear usuario con acceso unicamente al modulo de insumos', () => {
    cy.createSeedUser({ modules: ['supplies'] }, (userData) => {
      cy.log(userData);
      cy.loginUser(userData.email, userData.password);
      cy.wait(1500);

      cy.checkSidebarMenuItem('Insumos');

      cy.openCommandPaletteAndSelectFirstOption();

      cy.wait(2000);

      // Comprobar que haya registro en las tablas
      cy.checkTableRowsExist();

      // Comprobar habitiación de botones
      // Recarga de datos
      cy.checkRefetchButtonState(true);
      cy.checkCreateButtonState(false);

      // Crear registro

      cy.toggleSelectAllTableRows();
      cy.wait(700);

      // Eliminar bulk
      cy.checkDeleteBulkButtonState(true);

      cy.clickActionsButtonTableRow(currenSupply.id);

      cy.checkActionButtonsState({ update: true, view: true, delete: true });
    });
  });

  it('Crear usuario con acceso unicamente a ver tabla de insumos', () => {
    cy.createSeedUser({ actions: ['find_all_supplies'] }, (userData) => {
      cy.wait(2000);
      cy.log(userData);
      cy.loginUser(userData.email, userData.password);
      cy.wait(1500);

      cy.checkSidebarMenuItem('Insumos');

      cy.openCommandPaletteAndSelectFirstOption();

      cy.wait(2000);

      // Comprobar que haya registro en las tablas
      cy.checkTableRowsExist();

      // Comprobar habitiación de botones
      // Recarga de datos

      cy.checkRefetchButtonState(true);

      // Crear registro
      cy.checkCreateButtonState(true);

      cy.toggleSelectAllTableRows();
      cy.wait(700);

      cy.clickActionsButtonTableRow(currenSupply.id);

      cy.checkActionButtonsState({
        update: false,
        view: false,
        delete: false,
      });
    });
  });

  it('No tiene permisos para ver el listado de insumos', () => {
    cy.createSeedUser({ actions: ['create_supply'] }, (userData) => {
      cy.loginUser(userData.email, userData.password);
      cy.wait(1500);
      cy.checkSidebarMenuItem('Insumos');
      cy.openCommandPaletteAndSelectFirstOption();

      cy.wait(2000);
      cy.contains('No tienes permiso para ver el listado de insumos');
      cy.checkRefetchButtonState(false);

      cy.checkSearchBarIsDisabled();
    });
  });

  it('Debe sacar al usuario si intenta crear un insumo y no tiene permisos ', () => {
    cy.createSeedUser({ actions: ['find_all_supplies'] }, (data: any) => {
      cy.loginUser(data.email, data.password);
      cy.wait(1500);

      cy.checkSidebarMenuItem('Insumos');
      cy.openCommandPaletteAndSelectFirstOption();

      cy.wait(2000);

      cy.visit(suppliesRoutes.create());
      cy.shouldBeRedirectedForNoPermission();
    });
  });

  it('Debe sacar al usuario si intenta modificar a un insumo y no tiene permisos', () => {
    cy.createSeedUser({ actions: ['find_all_supplies'] }, (userData: any) => {
      cy.loginUser(userData.email, userData.password);
      cy.wait(1500);
      cy.checkSidebarMenuItem('Insumos');
      cy.openCommandPaletteAndSelectFirstOption();

      cy.visit(suppliesRoutes.update(currenSupply.id));
      cy.shouldBeRedirectedForNoPermission();
    });
  });

  it('Debe sacar al usuario si intenta consultar a un insumo y no tiene permisos', () => {
    cy.createSeedUser({ actions: ['find_all_supplies'] }, (data: any) => {
      cy.loginUser(data.email, data.password);
      cy.wait(1500);
      cy.checkSidebarMenuItem('Insumos');
      cy.openCommandPaletteAndSelectFirstOption();

      cy.visit(suppliesRoutes.view(currenSupply.id));
      cy.shouldBeRedirectedForNoPermission();
    });
  });
});
