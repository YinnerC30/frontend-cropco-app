import { InformationGenerator } from '../../helpers/InformationGenerator';

describe('Modulo de cultivos', () => {
  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('crops');
  });

  it('Debe ingresar a la ruta correcta ', () => {
    cy.contains('Usuarios');
    cy.checkCurrentUrl('crops/view/all');
  });

  it('Debe contener los elementos necesarios', () => {
    cy.existBasicSearchBar();

    cy.existRefetchButton();
    cy.existCreateButton();

    cy.existPaginationInfo();

    cy.contains('Nombre:');
    cy.contains('Descripción:');

    cy.contains('Número de hectáreas:');
    cy.contains('Número de unidades:');
    cy.contains('Ubicación:');
    cy.contains('Fecha de creación:');
    cy.contains('Fecha de terminación:');
    cy.contains('Inventario actual:');

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
    cy.get('input[data-testid="input-command-search"]').type('cultivos');
    cy.get('div[data-testid="command-item-crops"]').click();
    cy.checkCurrentUrl('crops/view/all');
  });

  //TODO: Ingresar usuario con permisos y verificar que esten visibles y disponibles
  //TODO: Probar selección
  //TODO: Probar orden de datos en las tablas
});

describe('Encuentra registros de acuerdo a la cadena de busqueda', () => {
  const cropData = {
    name: 'croptosearch ' + InformationGenerator.generateRandomId(),
  };

  beforeEach(() => {
    cy.loginUser();
    cy.createCrop(cropData);
  });

  it('Busqueda por nombre del cultivo', () => {
    cy.typeOnInputBasicSearchBar(cropData.name);
    cy.clickOnSubmitBasicSearchBar();
    cy.get('tbody tr')
      .filter(`:contains(${cropData.name})`)
      .should('have.length.greaterThan', 0);
    cy.contains(cropData.name);
  });
});

describe('Creación de cultivos', () => {
  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('crops');
    cy.wait(700);
    cy.clickOnCreateButton();
  });

  it('Debe crear un cultivo', () => {
    const usedName = 'cropname' + InformationGenerator.generateRandomId();
    const usedUnits = 1000;
    const usedNumberHectares = 10;
    const usedLocation = InformationGenerator.generateAddress();

    const usedDescription = InformationGenerator.generateDescription();

    cy.getFormInput('name').type(usedName);
    cy.getFormInput('units').type(usedUnits.toString());
    cy.getFormInput('number_hectares').type(usedNumberHectares.toString());

    cy.getFormTextArea('location').type(usedLocation);
    cy.getFormTextArea('description').type(usedDescription);

    cy.clickOnSubmitButton();
    cy.checkDisabledSubmitButton();
    cy.contains('Cultivo creado');
  });

  it('Debe mostrar mensajes de error al intentar enviar el formulario vacio', () => {
    cy.clickOnSubmitButton();
    cy.contains('El nombre debe tener al menos 4 caracteres');
    cy.contains('El número debe ser positivo');
    cy.contains('La descripción debe tener mínimo 15 caracteres');
    cy.contains('La ubicación debe tener al menos 15 caracteres');
    cy.checkMessageFieldsMissing();
  });

  it('Debe advertir al usuario antes de salir del formulario si hay campos rellenados (salir usando sidebar)', () => {
    cy.getFormInput('name').type('CropName');
    cy.navigateToModuleWithSideBar('crops');
    cy.checkMessageLostFormData();
  });

  it('Debe permitir al usuario salir del formulario incluso si hay campos rellenados, presionando "Ignorar" (salir usando sidebar)', () => {
    cy.getFormInput('name').type('CropName');
    cy.navigateToModuleWithSideBar('crops');
    cy.checkMessageLostFormData();
    cy.clickOnIgnoreButton();
    cy.url().then((currentUrl) => {
      expect(currentUrl).to.not.include('/app/home/crops/create');
    });
  });

  it('No debe permitir al usuario salir del formulario cuando hay campos rellenados, cerrando el sonner (salir usando sidebar)', () => {
    cy.getFormInput('name').type('CropName');
    cy.navigateToModuleWithSideBar('crops');
    cy.checkMessageLostFormData();
    cy.clickOnCloseToast();
    cy.url().should('include', '/app/home/crops/create');
  });
});

describe('Modificación de cultivos', () => {
  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('crops');
  });

  it('Modificar cultivo existente', () => {
    cy.createCropAnd({}, ({ name, id }) => {
      cy.visit(`/app/home/crops/view/all?query=${name}`);
      cy.clickActionsButtonTableRow(id);
      cy.get('button[data-testid="btn-update-record"]').click();
      cy.getFormInput('name').clear().type('CropNameChanged');

      cy.clickOnSubmitButton();
      cy.checkDisabledSubmitButton();
      cy.contains('Cultivo actualizado');
    });
  });

  it('Debe advertir al usuario antes de salir del formulario si hay campos rellenados (salir usando sidebar)', () => {
    cy.createCropAnd({}, ({ name, id }) => {
      cy.visit(`/app/home/crops/view/all?query=${name}`);
      cy.clickActionsButtonTableRow(id);
      cy.get('button[data-testid="btn-update-record"]').click();
      cy.getFormInput('name').type('CropName');
      cy.navigateToModuleWithSideBar('crops');
      cy.checkMessageLostFormData();
    });
  });

  it('Debe permitir al usuario salir del formulario incluso si hay campos rellenados, presionando "Ignorar" (salir usando sidebar)', () => {
    cy.createCropAnd({}, ({ name, id }) => {
      cy.visit(`/app/home/crops/view/all?query=${name}`);
      cy.clickActionsButtonTableRow(id);
      cy.get('button[data-testid="btn-update-record"]').click();
      cy.getFormInput('name').type('CropName');
      cy.navigateToModuleWithSideBar('crops');
      cy.checkMessageLostFormData();
      cy.clickOnIgnoreButton();
      cy.url().then((currentUrl) => {
        expect(currentUrl).to.not.include('/app/home/crops/update');
      });
    });
  });

  it('No debe permitir al usuario salir del formulario cuando hay campos rellenados, cerrando el sonner (salir usando sidebar)', () => {
    cy.createCropAnd({}, ({ name, id }) => {
      cy.visit(`/app/home/crops/view/all?query=${name}`);
      cy.clickActionsButtonTableRow(id);
      cy.get('button[data-testid="btn-update-record"]').click();
      cy.getFormInput('name').type('CropName');
      cy.navigateToModuleWithSideBar('crops');
      cy.checkMessageLostFormData();
      cy.clickOnCloseToast();
      cy.url().should('include', '/app/home/crops/update');
    });
  });
});

describe('Eliminación de cultivo', () => {
  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('crops');
  });

  it('Eliminar cultivo', () => {
    cy.createCropAnd({}, ({ name, id }) => {
      cy.openActionsMenuByField(name, `/app/home/crops/view/all?query=${name}`);
      cy.get('button[data-testid="btn-delete-one-record"]').click();
      cy.get('button[data-testid="btn-continue-delete-one-record"]').click();

      cy.contains('Cultivo eliminado');
      cy.checkNoRecordsMessage();
    });
  });

  // TODO: Implementar pruebas
  // it('Intentar eliminar cultivo con ventas pendiente de pago', () => {});
});

describe('Eliminación de cultivos por lote', () => {
  before(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('crops');
    for (let index = 0; index < 2; index++) {
      cy.createCrop(
        { name: 'CropToRemoveBulk' + InformationGenerator.generateRandomId() },
        { fastCreation: true }
      );
    }
    cy.logoutUser();
  });

  it('Eliminar cultivos seleccionados', () => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('crops');
    cy.visit(`/app/home/crops/view/all?query=CropToRemoveBulk`);
    cy.wait(2000);
    cy.get('button[aria-label="Select all"]').click({ timeout: 3000 });
    cy.get('button[data-testid="btn-delete-bulk"]').click();
    cy.get('button[data-testid="btn-continue-delete"]').click();
    cy.contains('Cargando información');
    cy.contains('Los registros seleccionados fueron eliminados');
    cy.checkNoRecordsMessage();
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
  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('crops');
  });

  it('Copiar Id del usuario', () => {
    cy.createCropAnd({}, ({ name, id }) => {
      cy.openActionsMenuByField(name, `/app/home/crops/view/all?query=${name}`);
      cy.get('button[data-testid="btn-copy-id"]').click();

      cy.contains('Id copiado al portapapeles');
    });
  });
});

describe('Ver registro de cultivo', () => {
  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('crops');
  });

  it('Ver registro de cultivo', () => {
    cy.createCropAnd({}, ({ name, id }) => {
      cy.openActionsMenuByField(name, `/app/home/crops/view/all?query=${name}`);
      cy.get('button[data-testid="btn-view-record"]').click();
      cy.contains('Información');
      // cy.getFormInput('first_name').should('have.value', 'CropName');
      // cy.getFormInput('last_name').should('have.value', 'LastName');
      // cy.getFormInput('email').should('have.value', email);
      // cy.getFormInput('cell_phone_number').should('have.value', '3123456547');
      // cy.getFormTextArea('address').should('have.length.at.most', 14);
      cy.contains('Volver');
    });
  });
});

// TODO: Cambiar unidad de medida en que se mira el stock

describe('Paginado y selectores', () => {
  before(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('crops');
    cy.wait(2000);
    cy.get('span[data-testid="data-table-row-total"]')
      .invoke('text')
      .then((text) => {
        const total = parseInt(text, 10);
        if (total <= 11) {
          for (let index = 0; index < 11; index++) {
            cy.createCrop({}, { fastCreation: true });
          }
        }
      });
    cy.logoutUser();
  });
  it('Navegar entre paginas disponibles (10 registro por página - default)', () => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('crops');
    cy.wait(2000);
    cy.checkPaginationValues();
    cy.clickOnGoNextPageButton();
    cy.get('p[data-testid="data-table-page-info-number"]').contains(
      'Página 2 de'
    );
    cy.clickOnGoPreviousPageButton();
    cy.get('p[data-testid="data-table-page-info-number"]').contains(
      'Página 1 de'
    );
  });

  it('Navegar entre paginas disponibles (20 registro por página)', () => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('crops');
    cy.wait(2000);
    cy.changeTablePageSize(20);
    cy.wait(2000);
    cy.checkPaginationValues();
    cy.clickOnGoNextPageButton();
    cy.wait(2000);
    cy.get('p[data-testid="data-table-page-info-number"]').contains(
      'Página 2 de'
    );
    cy.clickOnGoPreviousPageButton();
    cy.wait(2000);
    cy.get('p[data-testid="data-table-page-info-number"]').contains(
      'Página 1 de'
    );
  });
});

describe.only('Auth modulo de cultivos', () => {
  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('crops');
  });

  it('Crear usuario con acceso unicamente al modulo de cultivos', () => {
    cy.createSeedUser({ modules: ['crops'] }, (userData) => {
      cy.createCropAnd({}, (cropData) => {
        cy.logoutUser();
        cy.wait(2000);
        cy.log(userData);
        cy.loginUser(userData.email, userData.password);
        cy.wait(1500);
        cy.get('ul[data-sidebar="menu"]').within(() => {
          cy.get('li[data-sidebar="menu-item"]')
            .should('have.length', 1)
            .contains('Cultivos');
        });
        cy.get('body').type('{ctrl}j');
        cy.get('div[cmdk-item][role="option"]').should('have.length', 1);

        cy.get('div[cmdk-item][role="option"]').click();

        cy.visit(`/app/home/crops/view/all?query=${cropData.name}`);
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

        cy.clickActionsButtonTableRow(cropData.id);

        cy.checkActionButtonsState({ update: true, view: true, delete: true });
      });
    });
  });

  it('Crear usuario con acceso unicamente a ver tabla de cultivos', () => {
    cy.createSeedUser({ actions: ['find_all_crops'] }, (userData) => {
      cy.createCropAnd({}, (cropData) => {
        cy.logoutUser();
        cy.wait(2000);
        cy.log(userData);
        cy.loginUser(userData.email, userData.password);
        cy.wait(1500);
        cy.get('ul[data-sidebar="menu"]').within(() => {
          cy.get('li[data-sidebar="menu-item"]')
            .should('have.length', 1)
            .contains('Cultivos');
        });
        cy.get('body').type('{ctrl}j');
        cy.get('div[cmdk-item][role="option"]').should('have.length', 1);

        cy.get('div[cmdk-item][role="option"]').click();

        cy.visit(`/app/home/crops/view/all?query=${cropData.name}`);
        cy.wait(2000);

        // Comprobar que haya registro en las tablas
        cy.get('table tbody tr').should('exist');

        // Comprobar habitiación de botones
        // Recarga de datos
        cy.get('button[data-testid="btn-refetch-data"]').should('be.enabled');

        // Crear registro
        cy.get('button[data-testid="btn-create-record"]').should('be.disabled');

        cy.get('button[aria-label="Select all"]').click(); // Deselecciona todos
        cy.wait(700);
        // Eliminar bulk
        cy.get('button[data-testid="btn-delete-bulk"]').should('be.disabled');

        cy.clickActionsButtonTableRow(cropData.id);

        cy.checkActionButtonsState({
          update: false,
          view: false,
          delete: false,
        });
      });
    });
  });

  it('No tiene permisos para ver el listado de cultivos', () => {
    cy.createSeedUser({ actions: ['create_crop'] }, (userData) => {
      cy.createCropAnd({}, () => {
        cy.logoutUser();
        cy.wait(2000);
        cy.log(userData);
        cy.loginUser(userData.email, userData.password);
        cy.wait(1500);
        cy.get('ul[data-sidebar="menu"]').within(() => {
          cy.get('li[data-sidebar="menu-item"]')
            .should('have.length', 1)
            .contains('Cultivos');
        });
        cy.get('body').type('{ctrl}j');
        cy.get('div[cmdk-item][role="option"]').should('have.length', 1);
        cy.get('div[cmdk-item][role="option"]').click();

        cy.visit(`/app/home/crops/view/all`);
        cy.wait(2000);
        cy.contains('No tienes permiso para ver el listado de cultivos');
        cy.checkRefetchButtonState(false);
        cy.get('input[placeholder="Escribe algo..."]').should('be.disabled');
        cy.get('button[data-testid="btn-submit-basic-searchbar"]').should(
          'be.disabled'
        );
        cy.get('button[data-testid="btn-clear-basic-searchbar"]').should(
          'be.disabled'
        );
      });
    });
  });

  it('Debe sacar al usuario si intenta crear un cultivo y no tiene permisos ', () => {
    cy.createSeedUser({ actions: ['find_all_crops'] }, (data: any) => {
      cy.loginUser(data.email, data.password);
      cy.wait(1500);
      cy.get('ul[data-sidebar="menu"]').within(() => {
        cy.get('li[data-sidebar="menu-item"]')
          .should('have.length', 1)
          .contains('Cultivos');
      });
      cy.get('body').type('{ctrl}j');
      cy.get('div[cmdk-item][role="option"]').should('have.length', 1);
      cy.get('div[cmdk-item][role="option"]').click();

      cy.visit(`/app/home/crops/view/all`);
      cy.wait(2000);

      cy.visit('/app/home/crops/create/one');
      cy.shouldBeRedirectedForNoPermission();
    });
  });

  it('Debe sacar al usuario si intenta modificar a un cultivo y no tiene permisos', () => {
    cy.createSeedUser({ actions: ['find_all_crops'] }, (userData: any) => {
      cy.createCropAnd({}, (cropData) => {
        cy.logoutUser();
        cy.wait(2000);
        cy.loginUser(userData.email, userData.password);
        cy.wait(1500);
        cy.get('ul[data-sidebar="menu"]').within(() => {
          cy.get('li[data-sidebar="menu-item"]')
            .should('have.length', 1)
            .contains('Cultivos');
        });
        cy.get('body').type('{ctrl}j');
        cy.get('div[cmdk-item][role="option"]').should('have.length', 1);
        cy.get('div[cmdk-item][role="option"]').click();

        cy.visit(`/app/home/crops/update/one/${cropData.id}`);
        cy.shouldBeRedirectedForNoPermission();
      });
    });
  });

  it('Debe sacar al usuario si intenta consultar a un cultivo y no tiene permisos', () => {
    cy.createSeedUser({ actions: ['find_all_crops'] }, (data: any) => {
      cy.createCropAnd({}, (cropData) => {
        cy.log(JSON.stringify(data, null, 2));
        cy.logoutUser();
        cy.wait(2000);
        cy.loginUser(data.email, data.password);
        cy.wait(1500);
        cy.get('ul[data-sidebar="menu"]').within(() => {
          cy.get('li[data-sidebar="menu-item"]')
            .should('have.length', 1)
            .contains('Cultivos');
        });
        cy.get('body').type('{ctrl}j');
        cy.get('div[cmdk-item][role="option"]').should('have.length', 1);
        cy.get('div[cmdk-item][role="option"]').click();

        cy.visit(`/app/home/crops/view/one/${cropData.id}`);
        cy.shouldBeRedirectedForNoPermission();
      });
    });
  });
});
