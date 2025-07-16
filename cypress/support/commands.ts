/// <reference types="cypress" />

import { InformationGenerator } from '../e2e/helpers/InformationGenerator';

// ***********************************************
// Comandos personalizados para CropCo App
// ***********************************************

// =================================================
// 1. Comandos de Autenticación
// =================================================

/**
 * Realiza login de usuario en la aplicación.
 * @param email Email del usuario (opcional, valor por defecto: 'usermant@mail.com')
 * @param password Contraseña del usuario (opcional, valor por defecto: '123456')
 * @example
 * cy.loginUser('usuario@mail.com', 'password123');
 */
Cypress.Commands.add(
  'loginUser',
  (email: string = 'usermant@mail.com', password: string = '123456') => {
    cy.visit('/app/authentication/login');
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]', { timeout: 5000 })
      .should('be.visible')
      .click();
    cy.contains('Bienvenid@ a CropCo').should('be.visible');
    cy.url().should('include', '/app/home/page');
    cy.get('button[aria-label="Close toast"]').click();
  }
);

/**
 * Realiza logout del usuario actual.
 * Asume que el usuario ya está autenticado.
 * @example
 * cy.logoutUser();
 */
Cypress.Commands.add('logoutUser', () => {
  cy.get('button[data-testid="btn-logout-user"]', { timeout: 5000 })
    .should('be.visible')
    .click();
  cy.url().should('include', '/app/authentication/login');
});

/**
 * Limpia toda la sesión del usuario (cookies, localStorage, sessionStorage).
 * Útil para preparar tests limpios.
 * @example
 * cy.clearSession();
 */
Cypress.Commands.add('clearSession', () => {
  cy.clearCookies();
  cy.clearLocalStorage();
  cy.window().then((win) => {
    win.sessionStorage.clear();
  });
});

/**
 * Verifica que el usuario está autenticado correctamente.
 * @example
 * cy.shouldBeAuthenticated();
 */
Cypress.Commands.add('shouldBeAuthenticated', () => {
  cy.url().should('include', '/app/home');
  cy.contains('Bienvenid@ a CropCo').should('be.visible');
});

/**
 * Verifica que el usuario NO está autenticado.
 * @example
 * cy.shouldNotBeAuthenticated();
 */
Cypress.Commands.add('shouldNotBeAuthenticated', () => {
  cy.url().should('include', '/app/authentication/login');
});

/**
 * Intenta hacer login con credenciales inválidas.
 * @param email Email inválido
 * @param password Contraseña inválida
 * @example
 * cy.attemptInvalidLogin('fake@mail.com', 'wrongpass');
 */
Cypress.Commands.add(
  'attemptInvalidLogin',
  (email: string, password: string) => {
    cy.visit('/app/authentication/login');
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]', { timeout: 5000 })
      .should('be.visible')
      .click();
    // Mensaje de error comentado por si cambia el texto
    // cy.contains('Usuario o contraseña incorrectos, inténtelo nuevamente').should('be.visible');
  }
);

// =================================================
// 2. Comandos de Navegación y Utilidades Comunes
// =================================================

/**
 * Navega a un módulo usando el sidebar por nombre de módulo.
 * @param nameModule Nombre del módulo (ej: 'users', 'clients', etc.)
 * @example
 * cy.navigateToModuleWithSideBar('users');
 */
Cypress.Commands.add('navigateToModuleWithSideBar', (nameModule: string) => {
  cy.get(`button[data-testid="btn-module-${nameModule}"]`).click();
});

/**
 * Verifica que la URL actual contiene un fragmento específico.
 * @param partialUrl Fragmento esperado en la URL
 * @example
 * cy.checkCurrentUrl('/app/home');
 */
Cypress.Commands.add('checkCurrentUrl', (partialUrl: string) => {
  cy.url().should('include', partialUrl);
});

// =================================================
// 3. Comandos de Elementos Comunes de UI
// =================================================

/**
 * Verifica la existencia de la barra de búsqueda básica y sus botones.
 * @example
 * cy.existBasicSearchBar();
 */
Cypress.Commands.add('existBasicSearchBar', () => {
  cy.get('input[data-testid="input-basic-search-bar"]').should('exist');
  cy.get('input[placeholder="Escribe algo..."]').should('exist');
  cy.get('button[data-testid="btn-submit-basic-searchbar"]').should('exist');
  cy.get('button[data-testid="btn-clear-basic-searchbar"]').should('exist');
});

/**
 * Escribe un valor en la barra de búsqueda básica.
 * @param value Texto a escribir
 * @example
 * cy.typeOnInputBasicSearchBar('buscar');
 */
Cypress.Commands.add('typeOnInputBasicSearchBar', (value: string) => {
  cy.get('input[data-testid="input-basic-search-bar"]').type(value);
});

/**
 * Hace clic en el botón de submit de la barra de búsqueda básica.
 * @example
 * cy.clickOnSubmitBasicSearchBar();
 */
Cypress.Commands.add('clickOnSubmitBasicSearchBar', () => {
  cy.get('button[data-testid="btn-submit-basic-searchbar"]').click();
});

/**
 * Limpia el input de la barra de búsqueda básica.
 * @example
 * cy.clearInputBasicSearchBar();
 */
Cypress.Commands.add('clearInputBasicSearchBar', () => {
  cy.get('button[data-testid="btn-clear-basic-searchbar"]').click();
});

/**
 * Verifica la existencia de los botones de paginación.
 * @example
 * cy.existPaginationButtons();
 */
Cypress.Commands.add('existPaginationButtons', () => {
  cy.get('button[data-testid="btn-go-first-page"]').should('exist');
  cy.get('button[data-testid="btn-go-previous-page"]').should('exist');
  cy.get('button[data-testid="btn-go-next-page"]').should('exist');
  cy.get('button[data-testid="btn-go-last-page"]').should('exist');
});

/**
 * Verifica la existencia de la información de paginación.
 * @example
 * cy.existPaginationInfo();
 */
Cypress.Commands.add('existPaginationInfo', () => {
  cy.contains('Total:');
  cy.contains('N° seleccionados:');
  cy.contains('N° registros:');
  cy.get('button[data-testid="btn-page-size-selector"]').should('exist');
  cy.contains('Página 1 de');
});

/**
 * Verifica la existencia del botón de refetch.
 * @example
 * cy.existRefetchButton();
 */
Cypress.Commands.add('existRefetchButton', () => {
  cy.get('button[data-testid="btn-refetch-data"]').should('exist');
});

/**
 * Verifica la existencia del botón para crear un registro.
 * @example
 * cy.existCreateButton();
 */
Cypress.Commands.add('existCreateButton', () => {
  cy.get('button[data-testid="btn-create-record"]').should('exist');
});

// =================================================
// 4. Comandos de Formularios
// =================================================

/**
 * Obtiene un input de formulario por su atributo name.
 * @param name Nombre del input
 * @example
 * cy.getFormInput('email');
 */
Cypress.Commands.add('getFormInput', (name: string) => {
  cy.get(`input[name="${name}"]`);
});

/**
 * Hace clic en el botón para crear un registro.
 * @example
 * cy.clickOnCreateButton();
 */
Cypress.Commands.add('clickOnCreateButton', () => {
  cy.get('button[data-testid="btn-create-record"]').click();
});

/**
 * Hace clic en el botón de submit de un formulario.
 * @example
 * cy.clickOnSubmitButton();
 */
Cypress.Commands.add('clickOnSubmitButton', () => {
  cy.get('button[data-testid="form-submit-button"]').click();
});

/**
 * Verifica que se muestre el mensaje de campos faltantes en el formulario.
 * @example
 * cy.checkMessageFieldsMissing();
 */
Cypress.Commands.add('checkMessageFieldsMissing', () => {
  cy.contains('Faltan campos por rellenar en el formulario');
});

Cypress.Commands.add('checkMessageLostFormData', () => {
  cy.contains('¡Atención! Cambios sin guardar.');
  cy.contains('Tienes modificaciones pendientes en el formulario.');
  cy.contains('Ignorar');
});

/**
 * Verifica que el botón de submit está deshabilitado.
 * @example
 * cy.checkDisabledSubmitButton();
 */
Cypress.Commands.add('checkDisabledSubmitButton', () => {
  cy.get('button[data-testid="form-submit-button"]').should('be.disabled');
});

// =================================================
// 5. Comandos de Switches y Acciones Globales
// =================================================

/**
 * Hace clic en el switch global de acciones.
 * @example
 * cy.clickGlobalActionsSwitch();
 */
Cypress.Commands.add('clickGlobalActionsSwitch', () => {
  cy.get('button[data-testid="switch-global-actions"]').click();
});

/**
 * Verifica el estado del switch global de acciones.
 * @param shouldBeActive true si debe estar activo, false si no
 * @example
 * cy.checkGlobalActionsSwitchState(true);
 */
Cypress.Commands.add(
  'checkGlobalActionsSwitchState',
  (shouldBeActive: boolean) => {
    cy.get('button[data-testid="switch-global-actions"]').should(
      'have.attr',
      'aria-checked',
      shouldBeActive ? 'true' : 'false'
    );
  }
);

/**
 * Verifica el estado (activo/inactivo) del switch de un módulo.
 * @param moduleName Nombre del módulo (ej: 'clients', 'crops', etc.)
 * @param shouldBeActive true si debe estar activo, false si no (por defecto: true)
 * @example
 * cy.checkModuleSwitchState('clients', true);
 */
Cypress.Commands.add(
  'checkModuleSwitchState',
  (moduleName: string, shouldBeActive: boolean = true) => {
    cy.get(`button[data-testid="switch-actions-module-${moduleName}"]`).should(
      'have.attr',
      'aria-checked',
      shouldBeActive ? 'true' : 'false'
    );
  }
);

/**
 * Hace clic en el switch de acciones de un módulo específico.
 * @param moduleName Nombre del módulo (ej: 'clients', 'crops', etc.)
 * @example
 * cy.clickModuleActionsSwitch('clients');
 */
Cypress.Commands.add('clickModuleActionsSwitch', (moduleName: string) => {
  cy.get(`button[data-testid="switch-actions-module-${moduleName}"]`).click();
});

// =================================================
// 6. Comandos Específicos de Módulos
// =================================================

/**
 * Crea un usuario en el módulo de usuarios.
 * Si no se pasan datos, se generan valores por defecto y aleatorios para email.
 * @param data Objeto con los datos del usuario
 * @returns El email usado para el usuario creado (envuelto en cy.wrap)
 * @example
 * cy.createUser({ firstName: 'Juan', email: 'juan@mail.com' });
 */
Cypress.Commands.add(
  'createUser',
  function ({
    firstName,
    lastName,
    email,
    cellPhoneNumber,
    password1,
    password2,
  }: {
    firstName?: string;
    lastName?: string;
    email?: string;
    cellPhoneNumber?: string;
    password1?: string;
    password2?: string;
  } = {}): Cypress.Chainable<any> {
    const creationUserEndpoint = 'http://localhost:3000/users/create';

    cy.navigateToModuleWithSideBar('users');
    cy.wait(3000);
    cy.clickOnCreateButton();
    const defaultFirstName = 'UserName';
    const defaultLastName = 'LastName';

    const defaultEmail = InformationGenerator.generateEmail();
    const defaultCellPhoneNumber = '3123456547';
    const defaultPassword = '123456';
    const usedFirstName = firstName ?? defaultFirstName;
    const usedLastName = lastName ?? defaultLastName;
    const usedEmail = email ?? defaultEmail;
    const usedCellPhoneNumber = cellPhoneNumber ?? defaultCellPhoneNumber;
    const usedPassword1 = password1 ?? defaultPassword;
    const usedPassword2 = password2 ?? defaultPassword;
    cy.getFormInput('first_name').type(usedFirstName);
    cy.getFormInput('last_name').type(usedLastName);
    cy.getFormInput('email').type(usedEmail);
    cy.getFormInput('cell_phone_number').type(usedCellPhoneNumber);
    cy.getFormInput('passwords.password1').type(usedPassword1);
    cy.getFormInput('passwords.password2').type(usedPassword2);

    // Define el intercept antes de disparar la acción para capturar el response original
    cy.intercept('POST', creationUserEndpoint).as('createUserRequest');
    cy.clickOnSubmitButton();
    return cy.wait('@createUserRequest').then((interception) => {
      return cy.wrap(interception.response?.body);
    });
  }
);

Cypress.Commands.add('createUserFast', function (): void {
  cy.visit('/app/home/users/create/one');
  const defaultFirstName = InformationGenerator.generateFirstName();
  const defaultLastName = InformationGenerator.generateLastName();

  const defaultEmail = InformationGenerator.generateEmail();
  const defaultCellPhoneNumber = InformationGenerator.generateCellPhoneNumber();

  const defaultPassword = '123456';

  const usedFirstName = defaultFirstName;
  const usedLastName = defaultLastName;

  const usedEmail = defaultEmail;
  const usedCellPhoneNumber = defaultCellPhoneNumber;
  const usedPassword1 = defaultPassword;
  const usedPassword2 = defaultPassword;
  cy.getFormInput('first_name').type(usedFirstName);
  cy.getFormInput('last_name').type(usedLastName);
  cy.getFormInput('email').type(usedEmail);
  cy.getFormInput('cell_phone_number').type(usedCellPhoneNumber);
  cy.getFormInput('passwords.password1').type(usedPassword1);
  cy.getFormInput('passwords.password2').type(usedPassword2);
  cy.clickOnSubmitButton();
});

// /**
//  * Intercepta una solicitud a una API REST y obtiene el body de la respuesta o el error.
//  * @param endpoint Endpoint de la API (ej: '/api/users')
//  * @param method Método HTTP (ej: 'GET', 'POST', etc.)
//  * @param options { get: 'body' | 'error' } (por defecto: 'body')
//  * @example
//  * cy.interceptApiRequest('/api/users', 'GET').then((body) => { ... });
//  * cy.interceptApiRequest('/api/users', 'POST', { get: 'error' }).then((error) => { ... });
//  */
// Cypress.Commands.add(
//   'interceptApiRequest',
//   (
//     endpoint: string,
//     method: string,
//     options: { get?: 'body' | 'error' } = { get: 'body' }
//   ) => {
//     cy.intercept({ method, url: endpoint }).as('apiRequest');
//     // Espera la solicitud y retorna el body o el error
//     return cy.wait('@apiRequest').then((interception) => {
//       if (options.get === 'error') {
//         return interception.error;
//       }
//       return interception.response?.body;
//     });
//   }
// );

/**
 * Crea un usuario con datos aleatorios usando InformationGenerator.
 * @example
 * cy.createRandomUser();
 */
Cypress.Commands.add('createRandomUser', function () {
  const firstName = InformationGenerator.generateFirstName();
  const lastName = InformationGenerator.generateLastName();
  const email = InformationGenerator.generateEmail();
  const cellPhoneNumber = InformationGenerator.generateCellPhoneNumber();
  const password = '123456';
  cy.createUser({
    firstName,
    lastName,
    email,
    cellPhoneNumber,
    password1: password,
    password2: password,
  });
});

/**
 * Hace clic en el botón de acciones de una fila de la tabla por id.
 * @param id Identificador de la fila
 * @example
 * cy.clickActionsButtonTableRow(5);
 */
Cypress.Commands.add('clickActionsButtonTableRow', (id: string | number) => {
  cy.get(`button[data-testid="btn-actions-table-row-id-${id}"]`).click();
});

/**
 * Hace clic en el botón de refetch.
 * @example
 * cy.clickRefetchButton();
 */
Cypress.Commands.add('clickRefetchButton', () => {
  cy.get('button[data-testid="btn-refetch-data"]').click();
});

/**
 * Verifica si el botón de refetch está habilitado o deshabilitado.
 * @param shouldBeEnabled true si debe estar habilitado, false si debe estar deshabilitado
 * @example
 * cy.checkRefetchButtonState(true); // Verifica que está habilitado
 * cy.checkRefetchButtonState(false); // Verifica que está deshabilitado
 */
Cypress.Commands.add('checkRefetchButtonState', (shouldBeEnabled: boolean) => {
  const assertion = shouldBeEnabled ? 'not.be.disabled' : 'be.disabled';
  cy.get('button[data-testid="btn-refetch-data"]').should(assertion);
});

Cypress.Commands.add('checkPaginationValues', () => {
  // Obtener el total de registros
  cy.get('span[data-testid="data-table-row-total"]')
    .invoke('text')
    .then((text) => {
      const rowTotal = parseInt(text, 10);
      cy.get('span[data-testid="page-size-value"]')
        .invoke('text')
        .then((text) => {
          const pageSizeValue = parseInt(text, 10);
          const pagesCount = Math.ceil(rowTotal / pageSizeValue);
          cy.get('p[data-testid="data-table-page-info-number"]').contains(
            `Página 1 de ${pagesCount}`
          );
          // expect(total).to.be.greaterThan(10);
        });
      // expect(total).to.be.greaterThan(10);
    });
  // Obtener el n de registros por ver en la tabla
  // Dividir el primer valor sobre el segundo
  // Usar función math para calcular el valor aproximado
  // Añadir valar a un string a comparar
  // Buscar string con valor en pantalla
  // Comparar con valor calculado manualmente
});

// =================================================
// 7. Declaraciones de Tipos para TypeScript
// =================================================

// Extiende la interfaz Chainable de Cypress para incluir los comandos personalizados documentados arriba

// Solución temporal para los errores de tipo de Cypress.Commands.add
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable<Subject = any> {
      /**
       * Realiza login de usuario en la aplicación.
       * @param email Email del usuario (opcional)
       * @param password Contraseña del usuario (opcional)
       */
      loginUser(email?: string, password?: string): Chainable<void>;

      /**
       * Realiza logout del usuario actual.
       */
      logoutUser(): Chainable<void>;

      /**
       * Limpia toda la sesión del usuario (cookies, localStorage, sessionStorage).
       */
      clearSession(): Chainable<void>;

      /**
       * Verifica que el usuario está autenticado correctamente.
       */
      shouldBeAuthenticated(): Chainable<void>;

      /**
       * Verifica que el usuario NO está autenticado.
       */
      shouldNotBeAuthenticated(): Chainable<void>;

      /**
       * Intenta hacer login con credenciales inválidas.
       * @param email Email inválido
       * @param password Contraseña inválida
       */
      attemptInvalidLogin(email: string, password: string): Chainable<void>;

      /**
       * Verifica la existencia de la barra de búsqueda básica y sus botones.
       */
      existBasicSearchBar(): Chainable<void>;

      /**
       * Verifica la existencia de los botones de paginación.
       */
      existPaginationButtons(): Chainable<void>;

      /**
       * Verifica la existencia de la información de paginación.
       */
      existPaginationInfo(): Chainable<void>;

      checkPaginationValues(): Chainable<void>;

      /**
       * Verifica la existencia del botón de refetch.
       */
      existRefetchButton(): Chainable<void>;

      /**
       * Verifica la existencia del botón para crear un registro.
       */
      existCreateButton(): Chainable<void>;

      /**
       * Navega a un módulo usando el sidebar por nombre de módulo.
       * @param nameModule Nombre del módulo
       */
      navigateToModuleWithSideBar(nameModule: string): Chainable<void>;

      /**
       * Verifica que la URL actual contiene un fragmento específico.
       * @param partialUrl Fragmento esperado en la URL
       */
      checkCurrentUrl(partialUrl: string): Chainable<void>;

      /**
       * Obtiene un input de formulario por su atributo name.
       * @param name Nombre del input
       */
      getFormInput(name: string): Chainable<HTMLElement>;

      /**
       * Hace clic en el botón para crear un registro.
       */
      clickOnCreateButton(): Chainable<void>;

      /**
       * Hace clic en el botón de submit de un formulario.
       */
      clickOnSubmitButton(): Chainable<void>;

      /**
       * Verifica que se muestre el mensaje de campos faltantes en el formulario.
       */
      checkMessageFieldsMissing(): Chainable<void>;

      /**
       * Verifica que se muestre el mensaje de datos de formulario perdidos.
       */
      checkMessageLostFormData(): Chainable<void>;

      /**
       * Verifica que el botón de submit está deshabilitado.
       */
      checkDisabledSubmitButton(): Chainable<void>;

      /**
       * Hace clic en el botón de submit de la barra de búsqueda básica.
       */
      clickOnSubmitBasicSearchBar(): Chainable<void>;

      /**
       * Escribe un valor en la barra de búsqueda básica.
       * @param value Texto a escribir
       */
      typeOnInputBasicSearchBar(value: string): Chainable<void>;

      /**
       * Limpia el input de la barra de búsqueda básica.
       */
      clearInputBasicSearchBar(): Chainable<void>;

      /**
       * Verifica el estado (activo/inactivo) del switch de un módulo.
       * @param moduleName Nombre del módulo
       * @param shouldBeActive true si debe estar activo, false si no (por defecto: true)
       */
      checkModuleSwitchState(
        moduleName: string,
        shouldBeActive?: boolean
      ): Chainable<void>;

      /**
       * Hace clic en el switch global de acciones.
       */
      clickGlobalActionsSwitch(): Chainable<void>;

      /**
       * Hace clic en el switch de acciones de un módulo específico.
       * @param moduleName Nombre del módulo
       */
      clickModuleActionsSwitch(moduleName: string): Chainable<void>;

      /**
       * Verifica el estado del switch global de acciones.
       * @param shouldBeActive true si debe estar activo, false si no
       */
      checkGlobalActionsSwitchState(shouldBeActive: boolean): Chainable<void>;

      /**
       * Crea un usuario en el módulo de usuarios.
       * @param data Objeto con los datos del usuario
       */
      createUser(data: {
        firstName?: string;
        lastName?: string;
        email?: string;
        cellPhoneNumber?: string;
        password1?: string;
        password2?: string;
      }): Chainable<any>;

      createUserFast(): Chainable<any>;

      /**
       * Hace clic en el botón de acciones de una fila de la tabla por id.
       * @param id Identificador de la fila
       */
      clickActionsButtonTableRow(id: string | number): Chainable<void>;

      /**
       * Hace clic en el botón de refetch.
       */
      clickRefetchButton(): Chainable<void>;

      /**
       * Verifica si el botón de refetch está habilitado o deshabilitado.
       * @param shouldBeEnabled true si debe estar habilitado, false si debe estar deshabilitado
       */
      checkRefetchButtonState(shouldBeEnabled: boolean): Chainable<void>;

      // /**
      //  * Intercepta una solicitud a una API REST y obtiene el body de la respuesta o el error.
      //  * @param endpoint Endpoint de la API
      //  * @param method Método HTTP
      //  * @param options { get: 'body' | 'error' }
      //  */
      // interceptApiRequest(
      //   endpoint: string,
      //   method: string,
      //   options?: { get?: 'body' | 'error' }
      // ): Chainable<any>;

      /**
       * Crea un usuario con datos aleatorios usando InformationGenerator.
       */
      createRandomUser(): Chainable<void>;
    }
  }
}
