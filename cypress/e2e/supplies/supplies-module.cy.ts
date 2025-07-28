import { InformationGenerator } from '../helpers/InformationGenerator';

describe('Modulo de insumos', () => {
  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('supplies');
  });

  it('Debe ingresar a la ruta correcta ', () => {
    cy.contains('Usuarios');
    cy.checkCurrentUrl('supplies/view/all');
  });

  it('Debe contener los elementos necesarios', () => {
    cy.existBasicSearchBar();

    cy.existRefetchButton();
    cy.existCreateButton();

    cy.existPaginationInfo();

    // TODO: Comprobar selectores de unidad de medida

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
    cy.get('input[data-testid="input-command-search"]').type('insumos');
    cy.get('div[data-testid="command-item-supplies"]').click();
    cy.checkCurrentUrl('supplies/view/all');
  });
});

describe('Encuentra registros de acuerdo a la cadena de busqueda', () => {
  const supplyData = {
    name: 'supplytosearch ' + InformationGenerator.generateRandomId(),
  };

  beforeEach(() => {
    cy.loginUser();
    cy.createSupply(supplyData);
  });

  it('Busqueda por nombre del insumo', () => {
    cy.typeOnInputBasicSearchBar(supplyData.name);
    cy.clickOnSubmitBasicSearchBar();
    cy.get('tbody tr')
      .filter(`:contains(${supplyData.name})`)
      .should('have.length.greaterThan', 0);
    cy.contains(supplyData.name);
  });
});

describe('Creación de insumos', () => {
  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('supplies');
    cy.wait(700);
    cy.clickOnCreateButton();
  });

  it('Debe crear un insumo', () => {
    const usedName = 'supplyname' + InformationGenerator.generateRandomId();
    const usedBrand = 'supplybrand' + InformationGenerator.generateRandomId();
    const usedUnitOfMeasure = 'GRAMOS';
    const usedObservation =
      'supplyobservation' + InformationGenerator.generateRandomId();

    cy.getFormInput('name').type(usedName);
    cy.getFormInput('brand').type(usedBrand);
    cy.get('button[data-testid="btn-select-group-field"]').click();
    cy.get(`div[role="option"][data-value="${usedUnitOfMeasure}"]`).click();
    // cy.getFormInput('unit_of_measure').type(usedUnitOfMeasure);
    cy.getFormTextArea('observation').type(usedObservation);

    cy.clickOnSubmitButton();
    cy.checkDisabledSubmitButton();
    cy.contains('Insumo creado');
  });

  it('Debe mostrar mensajes de error al intentar enviar el formulario vacio', () => {
    cy.clickOnSubmitButton();
    cy.contains('El nombre debe tener al menos 2 caracteres');
    cy.contains('La marca debe tener al menos 4 caracteres');
    cy.contains('Debe seleccionar una unidad de medida.');
    cy.contains('La observación debe tener mínimo 10 caracteres');
    cy.checkMessageFieldsMissing();
  });

  it('Debe advertir al usuario antes de salir del formulario si hay campos rellenados (salir usando sidebar)', () => {
    cy.getFormInput('name').type('supplyname');

    cy.navigateToModuleWithSideBar('supplies');
    cy.checkMessageLostFormData();
  });

  it('Debe permitir al usuario salir del formulario incluso si hay campos rellenados, presionando "Ignorar" (salir usando sidebar)', () => {
    cy.getFormInput('name').type('supplyname');
    cy.navigateToModuleWithSideBar('supplies');
    cy.checkMessageLostFormData();
    cy.contains('button', 'Ignorar').click();
    cy.url().then((currentUrl) => {
      expect(currentUrl).to.not.include('/app/home/supplies/create');
    });
  });

  it('No debe permitir al usuario salir del formulario cuando hay campos rellenados, cerrando el sonner (salir usando sidebar)', () => {
    cy.getFormInput('name').type('supplyname');
    cy.navigateToModuleWithSideBar('supplies');
    cy.checkMessageLostFormData();
    cy.get('button[aria-label="Close toast"]').click();
    cy.url().should('include', '/app/home/supplies/create');
  });
});

describe('Modificación de insumos', () => {
  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('supplies');
  });

  it('Modificar insumo existente', () => {
    cy.createSupplyAnd({}, ({ name, id }) => {
      cy.visit(`/app/home/supplies/view/all?query=${name}`);
      cy.clickActionsButtonTableRow(id);
      cy.get('button[data-testid="btn-update-record"]').click();
      cy.getFormInput('name').clear().type('supplynamechanged');

      cy.clickOnSubmitButton();
      cy.checkDisabledSubmitButton();
      cy.contains('Insumo actualizado');
    });
  });

  it('Debe advertir al usuario antes de salir del formulario si hay campos rellenados (salir usando sidebar)', () => {
    cy.createSupplyAnd({}, ({ name, id }) => {
      cy.visit(`/app/home/supplies/view/all?query=${name}`);
      cy.clickActionsButtonTableRow(id);
      cy.get('button[data-testid="btn-update-record"]').click();
      cy.getFormInput('name').type('supplyname');
      cy.navigateToModuleWithSideBar('supplies');
      cy.checkMessageLostFormData();
    });
  });

  it('Debe permitir al usuario salir del formulario incluso si hay campos rellenados, presionando "Ignorar" (salir usando sidebar)', () => {
    cy.createSupplyAnd({}, ({ name, id }) => {
      cy.visit(`/app/home/supplies/view/all?query=${name}`);
      cy.clickActionsButtonTableRow(id);
      cy.get('button[data-testid="btn-update-record"]').click();
      cy.getFormInput('name').type('supplyname');
      cy.navigateToModuleWithSideBar('supplies');
      cy.checkMessageLostFormData();
      cy.contains('button', 'Ignorar').click();
      cy.url().then((currentUrl) => {
        expect(currentUrl).to.not.include('/app/home/supplies/update');
      });
    });
  });

  it('No debe permitir al usuario salir del formulario cuando hay campos rellenados, cerrando el sonner (salir usando sidebar)', () => {
    cy.createSupplyAnd({}, ({ name, id }) => {
      cy.visit(`/app/home/supplies/view/all?query=${name}`);
      cy.clickActionsButtonTableRow(id);
      cy.get('button[data-testid="btn-update-record"]').click();
      cy.getFormInput('name').type('supplyname');
      cy.navigateToModuleWithSideBar('supplies');
      cy.checkMessageLostFormData();
      cy.get('button[aria-label="Close toast"]').click();
      cy.url().should('include', '/app/home/supplies/update');
    });
  });
});

describe('Eliminación de insumo', () => {
  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('supplies');
  });

  it('Eliminar insumo', () => {
    cy.createSupplyAnd({}, ({ name, id }) => {
      cy.openActionsMenuByField(
        name,
        `/app/home/supplies/view/all?query=${name}`
      );
      cy.get('button[data-testid="btn-delete-one-record"]').click();
      cy.get('button[data-testid="btn-continue-delete-one-record"]').click();

      cy.contains('Insumo eliminado');
      cy.contains('No hay registros');
    });
  });

  // TODO: Implementar pruebas
  // it('Intentar eliminar insumo con stock disponible', () => {});
});

describe('Eliminación de insumos por lote', () => {
  before(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('supplies');
    for (let index = 0; index < 2; index++) {
      cy.createSupply(
        {
          name: 'SupplyToRemoveBulk' + InformationGenerator.generateRandomId(),
        },
        { fastCreation: true }
      );
    }
    cy.logoutUser();
  });

  it('Eliminar insumos seleccionados', () => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('supplies');
    cy.visit(`/app/home/supplies/view/all?query=SupplyToRemoveBulk`);
    cy.wait(2000);
    cy.get('button[aria-label="Select all"]').click({ timeout: 3000 });
    cy.get('button[data-testid="btn-delete-bulk"]').click();
    cy.get('button[data-testid="btn-continue-delete"]').click();
    cy.contains('Cargando información');
    cy.contains('Los registros seleccionados fueron eliminados');
    cy.contains('No hay registros');
  });

  // TODO: Implementar pruebas
  // it('Intentar eliminar insumos con stock disponible', () => {});

  // it('Intentar eliminar usuario con rol administrator en lote', () => {
  //   cy.loginUser();
  //   cy.navigateToModuleWithSideBar('supplies');
  //   cy.visit(`/app/home/supplies/view/all?query=Mantenimiento`);
  //   cy.wait(2000);
  //   cy.get('button[aria-label="Select all"]').click();
  //   cy.get('button[data-testid="btn-delete-bulk"]').click();
  //   cy.get('button[data-testid="btn-continue-delete"]').click();
  //   cy.contains(
  //     'No se pudieron eliminar los insumos seleccionados, revisa que no tengan rol "Administrador"'
  //   );
  // });
});

describe('Copiar Id de registro', () => {
  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('supplies');
  });

  it('Copiar Id del usuario', () => {
    cy.createSupplyAnd({}, ({ name, id }) => {
      cy.openActionsMenuByField(
        name,
        `/app/home/supplies/view/all?query=${name}`
      );
      cy.get('button[data-testid="btn-copy-id"]').click();

      cy.contains('Id copiado al portapapeles');
    });
  });
});

describe('Ver registro de insumo', () => {
  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('supplies');
  });

  it('Ver registro de insumo', () => {
    cy.createSupplyAnd({}, ({ name, id }) => {
      cy.openActionsMenuByField(
        name,
        `/app/home/supplies/view/all?query=${name}`
      );
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

// // TODO: Cambiar unidad de medida en que se mira el stock

describe('Paginado y selectores', () => {
  before(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('supplies');
    cy.wait(2000);
    cy.get('span[data-testid="data-table-row-total"]')
      .invoke('text')
      .then((text) => {
        const total = parseInt(text, 10);
        if (total <= 20) {
          for (let index = 0; index < 10; index++) {
            cy.createSupply({}, { fastCreation: true });
          }
        }
      });
    cy.logoutUser();
  });
  it('Navegar entre paginas disponibles (10 registro por página - default)', () => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('supplies');
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
    cy.navigateToModuleWithSideBar('supplies');
    cy.wait(2000);
    cy.changeTablePageSize(20)
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

describe('Auth modulo de insumos', () => {
  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('supplies');
  });

  it('Crear usuario con acceso unicamente al modulo de insumos', () => {
    cy.createUser({ selectedModules: ['supplies'] }).then((userData) => {
      cy.createSupplyAnd({}, (supplyData) => {
        cy.logoutUser();
        cy.wait(2000);
        cy.log(userData);
        cy.loginUser(userData.email, userData.password);
        cy.wait(1500);
        cy.get('ul[data-sidebar="menu"]').within(() => {
          cy.get('li[data-sidebar="menu-item"]')
            .should('have.length', 1)
            .contains('Insumos');
        });
        cy.get('body').type('{ctrl}j');
        cy.get('div[cmdk-item][role="option"]').should('have.length', 1);

        cy.get('div[cmdk-item][role="option"]').click();

        cy.visit(`/app/home/supplies/view/all?query=${supplyData.name}`);
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

        cy.clickActionsButtonTableRow(supplyData.id);

        cy.checkActionButtonsState({ update: true, view: true, delete: true });
      });
    });
  });

  it('Crear usuario con acceso unicamente a ver tabla de insumos', () => {
    cy.createUser({ selectedActions: ['find_all_supplies'] }).then(
      (userData) => {
        cy.createSupplyAnd({}, (supplyData) => {
          cy.logoutUser();
          cy.wait(2000);
          cy.log(userData);
          cy.loginUser(userData.email, userData.password);
          cy.wait(1500);
          cy.get('ul[data-sidebar="menu"]').within(() => {
            cy.get('li[data-sidebar="menu-item"]')
              .should('have.length', 1)
              .contains('Insumos');
          });
          cy.get('body').type('{ctrl}j');
          cy.get('div[cmdk-item][role="option"]').should('have.length', 1);

          cy.get('div[cmdk-item][role="option"]').click();

          cy.visit(`/app/home/supplies/view/all?query=${supplyData.name}`);
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

          cy.clickActionsButtonTableRow(supplyData.id);

          cy.checkActionButtonsState({
            update: false,
            view: false,
            delete: false,
          });
        });
      }
    );
  });

  it('No tiene permisos para ver el listado de insumos', () => {
    cy.createUserAnd({ selectedActions: ['create_supply'] }, (userData) => {
      cy.createSupplyAnd({}, () => {
        cy.logoutUser();
        cy.wait(2000);
        cy.log(userData);
        cy.loginUser(userData.email, userData.password);
        cy.wait(1500);
        cy.get('ul[data-sidebar="menu"]').within(() => {
          cy.get('li[data-sidebar="menu-item"]')
            .should('have.length', 1)
            .contains('Insumos');
        });
        cy.get('body').type('{ctrl}j');
        cy.get('div[cmdk-item][role="option"]').should('have.length', 1);
        cy.get('div[cmdk-item][role="option"]').click();

        cy.visit(`/app/home/supplies/view/all`);
        cy.wait(2000);
        cy.contains('No tienes permiso para ver el listado de insumos');
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

  it('Debe sacar al usuario si intenta crear un insumo y no tiene permisos ', () => {
    cy.createUser({ selectedActions: ['find_all_supplies'] }).then(
      (data: any) => {
        cy.logoutUser();
        cy.wait(2000);
        cy.loginUser(data.email, data.password);
        cy.wait(1500);
        cy.get('ul[data-sidebar="menu"]').within(() => {
          cy.get('li[data-sidebar="menu-item"]')
            .should('have.length', 1)
            .contains('Insumos');
        });
        cy.get('body').type('{ctrl}j');
        cy.get('div[cmdk-item][role="option"]').should('have.length', 1);
        cy.get('div[cmdk-item][role="option"]').click();

        cy.visit(`/app/home/supplies/view/all`);
        cy.wait(2000);

        cy.visit('/app/home/supplies/create/one');
        cy.contains('No tienes permiso para esta acción, seras redirigido');
      }
    );
  });

  it('Debe sacar al usuario si intenta modificar a un insumo y no tiene permisos', () => {
    cy.createUser({ selectedActions: ['find_all_supplies'] }).then(
      (userData: any) => {
        cy.createCropAnd({}, (cropData) => {
          cy.logoutUser();
          cy.wait(2000);
          cy.loginUser(userData.email, userData.password);
          cy.wait(1500);
          cy.get('ul[data-sidebar="menu"]').within(() => {
            cy.get('li[data-sidebar="menu-item"]')
              .should('have.length', 1)
              .contains('Insumos');
          });
          cy.get('body').type('{ctrl}j');
          cy.get('div[cmdk-item][role="option"]').should('have.length', 1);
          cy.get('div[cmdk-item][role="option"]').click();

          cy.visit(`/app/home/supplies/update/one/${cropData.id}`);
          cy.contains('No tienes permiso para esta acción, seras redirigido');
        });
      }
    );
  });

  it('Debe sacar al usuario si intenta consultar a un insumo y no tiene permisos', () => {
    cy.createUser({ selectedActions: ['find_all_supplies'] }).then(
      (data: any) => {
        cy.createSupplyAnd({}, (supplyData) => {
          cy.log(JSON.stringify(data, null, 2));
          cy.logoutUser();
          cy.wait(2000);
          cy.loginUser(data.email, data.password);
          cy.wait(1500);
          cy.get('ul[data-sidebar="menu"]').within(() => {
            cy.get('li[data-sidebar="menu-item"]')
              .should('have.length', 1)
              .contains('Insumos');
          });
          cy.get('body').type('{ctrl}j');
          cy.get('div[cmdk-item][role="option"]').should('have.length', 1);
          cy.get('div[cmdk-item][role="option"]').click();

          cy.visit(`/app/home/supplies/view/one/${supplyData.id}`);
          cy.contains('No tienes permiso para esta acción, seras redirigido');
        });
      }
    );
  });
});
