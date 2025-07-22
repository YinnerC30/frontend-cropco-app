// Extiende la interfaz Chainable de Cypress para incluir los comandos personalizados documentados arriba

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable<Subject = any> {
      loginUser(email?: string, password?: string): Chainable<void>;
      logoutUser(): Chainable<void>;
      clearSession(): Chainable<void>;
      shouldBeAuthenticated(): Chainable<void>;
      shouldNotBeAuthenticated(): Chainable<void>;
      attemptInvalidLogin(email: string, password: string): Chainable<void>;
      existBasicSearchBar(): Chainable<void>;
      existPaginationButtons(): Chainable<void>;
      existPaginationInfo(): Chainable<void>;
      checkPaginationValues(): Chainable<void>;
      existRefetchButton(): Chainable<void>;
      existCreateButton(): Chainable<void>;
      navigateToModuleWithSideBar(nameModule: string): Chainable<void>;
      checkCurrentUrl(partialUrl: string): Chainable<void>;
      getFormInput(name: string): Chainable<HTMLElement>;
      getFormTextArea(name: string): Chainable<HTMLElement>;
      clickOnCreateButton(): Chainable<void>;
      clickOnSubmitButton(): Chainable<void>;
      checkMessageFieldsMissing(): Chainable<void>;
      checkMessageLostFormData(): Chainable<void>;
      checkDisabledSubmitButton(): Chainable<void>;
      clickOnSubmitBasicSearchBar(): Chainable<void>;
      typeOnInputBasicSearchBar(value: string): Chainable<void>;
      clearInputBasicSearchBar(): Chainable<void>;
      checkModuleSwitchState(
        moduleName: string,
        shouldBeActive?: boolean
      ): Chainable<void>;
      clickGlobalActionsSwitch(): Chainable<void>;
      clickModuleActionsSwitch(moduleName: string): Chainable<void>;
      clickActionSwitch(actionName: string): Chainable<void>;
      checkGlobalActionsSwitchState(shouldBeActive: boolean): Chainable<void>;
      createUser(data: {
        firstName?: string;
        lastName?: string;
        email?: string;
        cellPhoneNumber?: string;
        password1?: string;
        password2?: string;
        withAllActions?: boolean;
        selectedModules?: string[];
        selectedActions?: string[];
      }): Chainable<any>;
      createUserFast(data: {
        firstName?: string;
        withAllActions?: boolean;
      }): Chainable<any>;
      clickActionsButtonTableRow(id: string | number): Chainable<void>;
      clickRefetchButton(): Chainable<void>;
      checkRefetchButtonState(shouldBeEnabled: boolean): Chainable<void>;
      createRandomUser(): Chainable<void>;
      changeTablePageSize(size: number): Chainable<void>;
      toggleSelectAllTableRows(select?: boolean): Chainable<void>;
      shouldBeRedirectedForNoPermission(): Chainable<void>;
      checkActionButtonsState(expected: {
        update?: boolean;
        view?: boolean;
        delete?: boolean;
      }): Chainable<void>;
      createUserAnd(
        userData: {
          firstName?: string;
          lastName?: string;
          email?: string;
          cellPhoneNumber?: string;
          password1?: string;
          password2?: string;
          withAllActions?: boolean;
          selectedModules?: string[];
          selectedActions?: string[];
        },
        callback: (data: any) => void
      ): Chainable<void>;
      openActionsMenuByField(value: string, url: string): Chainable<void>;
      searchAndSelectTableRow(field: string, value: string): Chainable<void>;
      // Employees
      createEmployee(
        data?: {
          firstName?: string;
          lastName?: string;
          email?: string;
          cellPhoneNumber?: string;
          address?: string;
        },
        opt?: { fastCreation?: boolean }
      ): Chainable<any>;
      createEmployeeAnd(
        data: {
          firstName?: string;
          lastName?: string;
          email?: string;
          cellPhoneNumber?: string;
          address?: string;
        },
        callback: (data: any) => void
      ): Chainable<void>;
      // Clients
      createClient(
        data?: {
          firstName?: string;
          lastName?: string;
          email?: string;
          cellPhoneNumber?: string;
          address?: string;
        },
        opt?: { fastCreation?: boolean }
      ): Chainable<any>;
      createClientAnd(
        data: {
          firstName?: string;
          lastName?: string;
          email?: string;
          cellPhoneNumber?: string;
          address?: string;
        },
        callback: (data: any) => void
      ): Chainable<void>;
      // Suppliers
      createSupplier(
        data?: {
          firstName?: string;
          lastName?: string;
          email?: string;
          cellPhoneNumber?: string;
          address?: string;
        },
        opt?: { fastCreation?: boolean }
      ): Chainable<any>;
      createSupplierAnd(
        data: {
          firstName?: string;
          lastName?: string;
          email?: string;
          cellPhoneNumber?: string;
          address?: string;
        },
        callback: (data: any) => void
      ): Chainable<void>;
      // Crops
      createCrop(
        data?: {
          name?: string;
          description?: string;
          units?: number;
          number_hectares?: number;
          location?: string;
          date_of_creation?: string;
          date_of_termination?: string;
        },
        opt?: { fastCreation?: boolean }
      ): Chainable<any>;
      createCropAnd(
        data: {
          name?: string;
          description?: string;
          units?: number;
          number_hectares?: number;
          location?: string;
          date_of_creation?: string;
          date_of_termination?: string;
        },
        callback: (data: any) => void
      ): Chainable<void>;
      // Supplies
      createSupply(
        data?: {
          name?: string;
          brand?: string;
          unit_of_measure?: string;
          observation?: string;
        },
        opt?: { fastCreation?: boolean }
      ): Chainable<any>;
      createSupplyAnd(
        data: {
          name?: string;
          brand?: string;
          unit_of_measure?: string;
          observation?: string;
        },
        callback: (data: any) => void
      ): Chainable<void>;
      selectCalendarMonth(month: number): Chainable<void>;
      selectCalendarYear(year: number): Chainable<void>;
      selectCalendarDay(day: number): Chainable<void>;
    }
  }
}

export {};
