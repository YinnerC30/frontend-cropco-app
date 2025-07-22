import { InformationGenerator } from '../helpers/InformationGenerator';

describe.only('Modulo de clientes', () => {
  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('clients');
  });

  it('Debe ingresar a la ruta correcta ', () => {
    cy.contains('Usuarios');
    cy.checkCurrentUrl('clients/view/all');
  });

  it('Debe contener los elementos necesarios', () => {
    cy.existBasicSearchBar();

    cy.existRefetchButton();
    cy.existCreateButton();
    cy.get('button[data-testid="btn-export-all-clients"]').should('exist').should('be.visible');

    cy.existPaginationInfo();

    cy.contains('Nombre:');
    cy.contains('Apellido:');
    cy.contains('Correo electrónico:');
    cy.contains('Número celular:');
    cy.contains('Dirección:');

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
    cy.get('input[data-testid="input-command-search"]').type('clientes');
    cy.get('div[data-testid="command-item-clients"]').click();
    cy.checkCurrentUrl('clients/view/all');
  });

  //TODO: Ingresar usuario con permisos y verificar que esten visibles y disponibles
  //TODO: Probar selección
  //TODO: Probar orden de datos en las tablas
});

describe('Encuentra registros de acuerdo a la cadena de busqueda', () => {
  const clientData = {
    firstName: 'clienttosearch',
    lastName: 'lasttosearch',
    email: '',
  };

  beforeEach(() => {
    clientData.email = InformationGenerator.generateEmail();
    cy.loginUser();
    cy.createEmployee(clientData);
  });

  it('Busqueda por nombre(s) del cliente', () => {
    cy.typeOnInputBasicSearchBar(clientData.firstName);
    cy.clickOnSubmitBasicSearchBar();
    cy.get('tbody tr')
      .filter(`:contains(${clientData.firstName})`)
      .should('have.length.greaterThan', 0);
    cy.contains(clientData.firstName);
    cy.contains(clientData.lastName);
    cy.contains(clientData.email);
  });
  it('Busqueda por apellido(s) del cliente', () => {
    cy.typeOnInputBasicSearchBar(clientData.lastName);
    cy.clickOnSubmitBasicSearchBar();
    cy.get('tbody tr')
      .filter(`:contains(${clientData.lastName})`)
      .should('have.length.greaterThan', 0);
    cy.contains(clientData.firstName);
    cy.contains(clientData.lastName);
    cy.contains(clientData.email);
  });
  it('Busqueda por correo del cliente', () => {
    cy.typeOnInputBasicSearchBar(clientData.email.split('@')[0]);
    cy.clickOnSubmitBasicSearchBar();
    cy.get('tbody tr')
      .filter(`:contains(${clientData.email})`)
      .should('have.length', 1);
    cy.contains(clientData.firstName);
    cy.contains(clientData.lastName);
    cy.contains(clientData.email);
  });
});

describe('Creación de clientes', () => {
  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('clients');
    cy.wait(700);
    cy.clickOnCreateButton();
  });

  it('Debe crear un cliente', () => {
    cy.getFormInput('first_name').type('EmployeeName');
    cy.getFormInput('last_name').type('LastName');
    const defaultEmail = InformationGenerator.generateEmail();
    cy.getFormInput('email').type(defaultEmail);
    cy.getFormInput('cell_phone_number').type(
      InformationGenerator.generateCellPhoneNumber()
    );
    cy.getFormTextArea('address').type(InformationGenerator.generateAddress());

    cy.clickOnSubmitButton();
    cy.checkDisabledSubmitButton();
    cy.contains('Empleado creado');
  });

  it('Debe mostrar mensajes de error al intentar enviar el formulario vacio', () => {
    cy.clickOnSubmitButton();
    cy.contains('El nombre debe tener al menos 2 caracteres');
    cy.contains('El apellido debe tener al menos 2 caracteres');
    cy.contains('El correo electrónico es incorrecto');
    cy.contains('El número de celular es requerido');
    cy.contains('La dirección debe tener mínimo 15 caracteres');
    cy.checkMessageFieldsMissing();
  });

  it('Debe advertir al usuario antes de salir del formulario si hay campos rellenados (salir usando sidebar)', () => {
    cy.getFormInput('first_name').type('EmployeeName');
    cy.navigateToModuleWithSideBar('clients');
    cy.checkMessageLostFormData();
  });

  it('Debe permitir al usuario salir del formulario incluso si hay campos rellenados, presionando "Ignorar" (salir usando sidebar)', () => {
    cy.getFormInput('first_name').type('EmployeeName');
    cy.navigateToModuleWithSideBar('clients');
    cy.checkMessageLostFormData();
    cy.contains('button', 'Ignorar').click();
    cy.url().then((currentUrl) => {
      expect(currentUrl).to.not.include('/app/home/clients/create');
    });
  });

  it('No debe permitir al usuario salir del formulario cuando hay campos rellenados, cerrando el sonner (salir usando sidebar)', () => {
    cy.getFormInput('first_name').type('EmployeeName');
    cy.navigateToModuleWithSideBar('clients');
    cy.checkMessageLostFormData();
    cy.get('button[aria-label="Close toast"]').click();
    cy.url().should('include', '/app/home/clients/create');
  });
});

describe('Modificación de clientes', () => {
  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('clients');
  });

  it('Modificar cliente existente', () => {
    cy.createEmployeeAnd({}, ({ email, id }) => {
      cy.visit(`/app/home/clients/view/all?query=${email}`);
      cy.clickActionsButtonTableRow(id);
      cy.get('button[data-testid="btn-update-record"]').click();
      cy.getFormInput('first_name').clear().type('EmployeeNameChanged');
      cy.getFormInput('last_name').clear().type('LastNameChanged');
      const defaultEmail = InformationGenerator.generateEmail();
      cy.getFormInput('email').clear().type(defaultEmail);
      cy.getFormInput('cell_phone_number').clear().type('3123451111');
      cy.getFormTextArea('address')
        .clear()
        .type(InformationGenerator.generateAddress());
      cy.clickOnSubmitButton();
      cy.checkDisabledSubmitButton();
      cy.contains('Empleado actualizado');
    });
  });

  it('Debe advertir al usuario antes de salir del formulario si hay campos rellenados (salir usando sidebar)', () => {
    cy.createEmployeeAnd({}, ({ email, id }) => {
      cy.visit(`/app/home/clients/view/all?query=${email}`);
      cy.clickActionsButtonTableRow(id);
      cy.get('button[data-testid="btn-update-record"]').click();
      cy.getFormInput('first_name').type('UserName');
      cy.navigateToModuleWithSideBar('clients');
      cy.checkMessageLostFormData();
    });
  });

  it('Debe permitir al usuario salir del formulario incluso si hay campos rellenados, presionando "Ignorar" (salir usando sidebar)', () => {
    cy.createEmployeeAnd({}, ({ email, id }) => {
      cy.visit(`/app/home/clients/view/all?query=${email}`);
      cy.clickActionsButtonTableRow(id);
      cy.get('button[data-testid="btn-update-record"]').click();
      cy.getFormInput('first_name').type('UserName');
      cy.navigateToModuleWithSideBar('clients');
      cy.checkMessageLostFormData();
      cy.contains('button', 'Ignorar').click();
      cy.url().then((currentUrl) => {
        expect(currentUrl).to.not.include('/app/home/clients/update');
      });
    });
  });

  it('No debe permitir al usuario salir del formulario cuando hay campos rellenados, cerrando el sonner (salir usando sidebar)', () => {
    cy.createEmployeeAnd({}, ({ email, id }) => {
      cy.visit(`/app/home/clients/view/all?query=${email}`);
      cy.clickActionsButtonTableRow(id);
      cy.get('button[data-testid="btn-update-record"]').click();
      cy.getFormInput('first_name').type('UserName');
      cy.navigateToModuleWithSideBar('clients');
      cy.checkMessageLostFormData();
      cy.get('button[aria-label="Close toast"]').click();
      cy.url().should('include', '/app/home/clients/update');
    });
  });
});

describe('Eliminación de cliente', () => {
  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('clients');
  });

  it('Eliminar cliente', () => {
    cy.createEmployeeAnd({}, ({ email, id }) => {
      cy.openActionsMenuByField(
        email,
        `/app/home/clients/view/all?query=${email}`
      );
      cy.get('button[data-testid="btn-delete-one-record"]').click();
      cy.get('button[data-testid="btn-continue-delete-one-record"]').click();

      cy.contains('Empleado eliminado');
      cy.contains('No hay registros');
    });
  });

  // TODO: Implementar pruebas
  // it('Intentar eliminar cliente con cosechas pendiente de pago', () => {});
  // it('Intentar eliminar cliente con trabajo pendiente de pago', () => {});
});

describe('Eliminación de clientes por lote', () => {
  before(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('clients');
    for (let index = 0; index < 2; index++) {
      cy.createEmployee(
        { firstName: 'EmployeeToRemoveBulk' },
        { fastCreation: true }
      );
    }
    cy.logoutUser();
  });

  it('Eliminar clientes seleccionados', () => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('clients');
    cy.visit(`/app/home/clients/view/all?query=EmployeeToRemoveBulk`);
    cy.wait(2000);
    cy.get('button[aria-label="Select all"]').click({ timeout: 3000 });
    cy.get('button[data-testid="btn-delete-bulk"]').click();
    cy.get('button[data-testid="btn-continue-delete"]').click();
    cy.contains('Cargando información');
    cy.contains('Los registros seleccionados fueron eliminados');
    cy.contains('No hay registros');
  });

  // it('Intentar eliminar usuario con rol administrator en lote', () => {
  //   cy.loginUser();
  //   cy.navigateToModuleWithSideBar('clients');
  //   cy.visit(`/app/home/clients/view/all?query=Mantenimiento`);
  //   cy.wait(2000);
  //   cy.get('button[aria-label="Select all"]').click();
  //   cy.get('button[data-testid="btn-delete-bulk"]').click();
  //   cy.get('button[data-testid="btn-continue-delete"]').click();
  //   cy.contains(
  //     'No se pudieron eliminar los clientes seleccionados, revisa que no tengan rol "Administrador"'
  //   );
  // });
});

describe('Copiar Id de registro', () => {
  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('clients');
  });

  it('Copiar Id del usuario', () => {
    cy.createEmployeeAnd({}, ({ email, id }) => {
      cy.openActionsMenuByField(
        email,
        `/app/home/clients/view/all?query=${email}`
      );
      cy.get('button[data-testid="btn-copy-id"]').click();

      cy.contains('Id copiado al portapapeles');
    });
  });
});

describe('Ver registro de cliente', () => {
  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('clients');
  });

  it('Ver registro de cliente', () => {
    cy.createEmployeeAnd({}, ({ email, id }) => {
      cy.openActionsMenuByField(
        email,
        `/app/home/clients/view/all?query=${email}`
      );
      cy.get('button[data-testid="btn-view-record"]').click();
      cy.contains('Información');
      cy.getFormInput('first_name').should('have.value', 'EmployeeName');
      cy.getFormInput('last_name').should('have.value', 'LastName');
      cy.getFormInput('email').should('have.value', email);
      cy.getFormInput('cell_phone_number').should('have.value', '3123456547');
      cy.getFormTextArea('address').should('have.length.at.most', 14);
      cy.contains('Volver');
    });
  });
});

describe('Certificar cliente', () => {
  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('clients');
  });

  it('Generar certificado de cliente', () => {
    cy.createEmployeeAnd({}, ({ email, id }) => {
      // const email = 'stivenchilito@mail.com';
      // const id = '0044d935-a236-40de-847a-ea09f02c7ab7';
      cy.visit(`/app/home/clients/view/all?query=${email}`);
      cy.clickActionsButtonTableRow(id);
      cy.contains('Certificar');
      cy.get('button[data-testid="btn-certificate-client"]').click();

      cy.wait(1500);
      cy.getFormInput('company_name').type('Empresa de Prueba S.A.S');
      cy.getFormInput('generator_name').type('Julian Perez');
      cy.getFormInput('generator_position').type('Gerente de recursos humanos');

      cy.get('button[data-testid="btn-calendar-selector"]').click();

      cy.get('button[data-testid="btn-month-calendar-selector"]').click();
      cy.get('div[role="option"][data-testid="item-month-4"]').click();
      cy.get('button[data-testid="btn-year-calendar-selector"]').click();
      cy.get('div[role="option"][data-testid="item-year-2023"]').click();

      cy.get('button[name="day"]').contains('19').click();

      cy.wait(1000);

      cy.getFormInput('client_position').type('Manipulador de fruta');
      cy.getFormInput('id_number').type('110508765');
      cy.getFormInput('weekly_working_hours').type('45');

      cy.get('button[data-testid="btn-generate-certificate"]').click();
      cy.contains('La constancia ha sido generada con éxito.');
      const expectedFileName = `constancia-cliente-${id}.pdf`;
      const downloadsFolder =
        Cypress.config('downloadsFolder') || 'cypress/downloads';

      cy.readFile(`${downloadsFolder}/${expectedFileName}`, {
        timeout: 10000,
      }).should('exist');
    });
  });
});

describe('Paginado y selectores', () => {
  before(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('clients');
    cy.wait(2000);
    cy.get('span[data-testid="data-table-row-total"]')
      .invoke('text')
      .then((text) => {
        const total = parseInt(text, 10);
        if (total <= 11) {
          for (let index = 0; index < 11; index++) {
            cy.createEmployee({}, { fastCreation: true });
          }
        }
        cy.logoutUser();
      });
  });
  it('Navegar entre paginas disponibles (10 registro por página - default)', () => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('clients');
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
    cy.navigateToModuleWithSideBar('clients');
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
    // cy.contains('20');
    // cy.checkPaginationValues();
    // cy.get('button[data-testid="btn-go-next-page"]').click();
    // cy.get('p[data-testid="data-table-page-info-number"]').contains(
    //   'Página 2 de'
    // );
    // cy.get('button[data-testid="btn-go-previous-page"]').click();
    // cy.get('p[data-testid="data-table-page-info-number"]').contains(
    //   'Página 1 de'
    // );
  });
});

describe('Auth modulo de clientes', () => {
  beforeEach(() => {
    cy.loginUser();
    cy.navigateToModuleWithSideBar('clients');
  });

  it('Crear usuario con acceso unicamente al modulo de clientes', () => {
    cy.createUser({ selectedModules: ['clients'] }).then((userData) => {
      cy.createEmployeeAnd({}, (clientData) => {
        cy.logoutUser();
        cy.wait(2000);
        cy.log(userData);
        cy.loginUser(userData.email, userData.password);
        cy.wait(1500);
        cy.get('ul[data-sidebar="menu"]').within(() => {
          cy.get('li[data-sidebar="menu-item"]')
            .should('have.length', 1)
            .contains('Empleados');
        });
        cy.get('body').type('{ctrl}j');
        cy.get('div[cmdk-item][role="option"]').should('have.length', 1);

        cy.get('div[cmdk-item][role="option"]').click();

        cy.visit(`/app/home/clients/view/all?query=${clientData.email}`);
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

        cy.clickActionsButtonTableRow(clientData.id);

        cy.checkActionButtonsState({ update: true, view: true, delete: true });

        // Certificar
        cy.get('button[data-testid="btn-certificate-client"]').should(
          'be.enabled'
        );
      });
    });
  });

  it('Crear usuario con acceso unicamente a ver tabla de clientes', () => {
    cy.createUser({ selectedActions: ['find_all_clients'] }).then(
      (userData) => {
        cy.createEmployeeAnd({}, (clientData) => {
          cy.logoutUser();
          cy.wait(2000);
          cy.log(userData);
          cy.loginUser(userData.email, userData.password);
          cy.wait(1500);
          cy.get('ul[data-sidebar="menu"]').within(() => {
            cy.get('li[data-sidebar="menu-item"]')
              .should('have.length', 1)
              .contains('Empleados');
          });
          cy.get('body').type('{ctrl}j');
          cy.get('div[cmdk-item][role="option"]').should('have.length', 1);

          cy.get('div[cmdk-item][role="option"]').click();

          cy.visit(`/app/home/clients/view/all?query=${clientData.email}`);
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

          cy.clickActionsButtonTableRow(clientData.id);

          // Certificar
          cy.get('button[data-testid="btn-certificate-client"]').should(
            'be.disabled'
          );

          cy.checkActionButtonsState({
            update: false,
            view: false,
            delete: false,
          });
          // // Modificar
          // cy.get('button[data-testid="btn-update-record"]').should(
          //   'be.disabled'
          // );

          // // Ver
          // cy.get('button[data-testid="btn-delete-one-record"]').should(
          //   'be.disabled'
          // );
          // // Eliminar
          // cy.get('button[data-testid="btn-view-record"]').should('be.disabled');
        });
      }
    );
  });

  it('No tiene permisos para ver el listado de clientes', () => {
    cy.createUserAnd({ selectedActions: ['create_client'] }, (userData) => {
      cy.createEmployeeAnd({}, () => {
        cy.logoutUser();
        cy.wait(2000);
        cy.log(userData);
        cy.loginUser(userData.email, userData.password);
        cy.wait(1500);
        cy.get('ul[data-sidebar="menu"]').within(() => {
          cy.get('li[data-sidebar="menu-item"]')
            .should('have.length', 1)
            .contains('Empleados');
        });
        cy.get('body').type('{ctrl}j');
        cy.get('div[cmdk-item][role="option"]').should('have.length', 1);
        cy.get('div[cmdk-item][role="option"]').click();

        cy.visit(`/app/home/clients/view/all`);
        cy.wait(2000);
        cy.contains('No tienes permiso para ver el listado de clientes');
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

  it('Debe sacar al usuario si intenta crear un cliente y no tiene permisos ', () => {
    cy.createUser({ selectedActions: ['find_all_clients'] }).then(
      (data: any) => {
        cy.logoutUser();
        cy.wait(2000);
        cy.loginUser(data.email, data.password);
        cy.wait(1500);
        cy.get('ul[data-sidebar="menu"]').within(() => {
          cy.get('li[data-sidebar="menu-item"]')
            .should('have.length', 1)
            .contains('Empleados');
        });
        cy.get('body').type('{ctrl}j');
        cy.get('div[cmdk-item][role="option"]').should('have.length', 1);
        cy.get('div[cmdk-item][role="option"]').click();

        cy.visit(`/app/home/clients/view/all`);
        cy.wait(2000);

        cy.visit('/app/home/clients/create/one');
        cy.contains('No tienes permiso para esta acción, seras redirigido');
      }
    );
  });

  it('Debe sacar al usuario si intenta modificar a un cliente y no tiene permisos', () => {
    cy.createUser({ selectedActions: ['find_all_clients'] }).then(
      (userData: any) => {
        cy.createEmployeeAnd({}, (clientData) => {
          cy.logoutUser();
          cy.wait(2000);
          cy.loginUser(userData.email, userData.password);
          cy.wait(1500);
          cy.get('ul[data-sidebar="menu"]').within(() => {
            cy.get('li[data-sidebar="menu-item"]')
              .should('have.length', 1)
              .contains('Empleados');
          });
          cy.get('body').type('{ctrl}j');
          cy.get('div[cmdk-item][role="option"]').should('have.length', 1);
          cy.get('div[cmdk-item][role="option"]').click();

          cy.visit(`/app/home/clients/update/one/${clientData.id}`);
          cy.contains('No tienes permiso para esta acción, seras redirigido');
        });
      }
    );
  });

  it('Debe sacar al usuario si intenta consultar a un cliente y no tiene permisos', () => {
    cy.createUser({ selectedActions: ['find_all_clients'] }).then(
      (data: any) => {
        cy.createEmployeeAnd({}, (clientData) => {
          cy.log(JSON.stringify(data, null, 2));
          cy.logoutUser();
          cy.wait(2000);
          cy.loginUser(data.email, data.password);
          cy.wait(1500);
          cy.get('ul[data-sidebar="menu"]').within(() => {
            cy.get('li[data-sidebar="menu-item"]')
              .should('have.length', 1)
              .contains('Empleados');
          });
          cy.get('body').type('{ctrl}j');
          cy.get('div[cmdk-item][role="option"]').should('have.length', 1);
          cy.get('div[cmdk-item][role="option"]').click();

          cy.visit(`/app/home/clients/view/one/${clientData.id}`);
          cy.contains('No tienes permiso para esta acción, seras redirigido');
        });
      }
    );
  });
});
