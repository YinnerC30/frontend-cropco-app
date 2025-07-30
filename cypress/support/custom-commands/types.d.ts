declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      // Auth Commands
      loginUser(email?: string, password?: string): Chainable<void>;
      logoutUser(): Chainable<void>;
      clearSession(): Chainable<void>;
      shouldBeAuthenticated(): Chainable<void>;
      shouldNotBeAuthenticated(): Chainable<void>;
      attemptInvalidLogin(email: string, password: string): Chainable<void>;

      // Navigation Commands
      navigateToModuleWithSideBar(nameModule: string): Chainable<void>;
      checkCurrentUrl(partialUrl: string): Chainable<void>;

      // UI Commands
      existBasicSearchBar(): Chainable<void>;
      existPaginationButtons(): Chainable<void>;
      existPaginationInfo(): Chainable<void>;
      checkPaginationValues(): Chainable<void>;
      existRefetchButton(): Chainable<void>;
      existCreateButton(): Chainable<void>;
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
      clickActionsButtonTableRow(id: string | number): Chainable<void>;
      clickRefetchButton(): Chainable<void>;
      checkRefetchButtonState(shouldBeEnabled: boolean): Chainable<void>;
      shouldBeRedirectedForNoPermission(): Chainable<void>;
      checkLoadingInformation(): Chainable<void>;
      openActionsMenuByField(value: string, url: string): Chainable<void>;
      openCalendar(): Chainable<void>;
      selectCalendarMonth(month: number): Chainable<void>;
      selectCalendarYear(year: number): Chainable<void>;
      selectCalendarDay(day: number): Chainable<void>;
      openCommandField(name: string): Chainable<void>;
      selectCommandOption(numberOption: string): Chainable<void>;
      openSelectField(): Chainable<void>;
      selectSelectOption(value: string): Chainable<void>;
      clickOnIgnoreButton(): Chainable<void>;
      checkDialogIsNotVisible(): Chainable<void>;
      clickOnCloseToast(): Chainable<void>;
      checkDialogIsVisible(): Chainable<void>;
      clickOnCloseFormDialog(): Chainable<void>;
      clickOnUpdateRecord(): Chainable<void>;
      clickOnDeleteRecord(): Chainable<void>;
      checkNoRecordsMessage(): Chainable<void>;
      clickOnDeleteBulkButton(): Chainable<void>;
      clickOnCopyIdButton(): Chainable<void>;
      clickOnViewRecord(): Chainable<void>;
      clickOnGoNextPageButton(): Chainable<void>;
      clickOnGoPreviousPageButton(): Chainable<void>;
      checkTablePageInfoContains(text: string): Chainable<void>;
      clickOnToggleStatusUserButton(): Chainable<void>;
      checkToggleStatusUserButtonState(
        shouldBeDisabled: boolean
      ): Chainable<void>;
      clickOnResetPasswordUserButton(): Chainable<void>;
      checkResetPasswordUserButtonState(
        shouldBeDisabled: boolean
      ): Chainable<void>;
      checkCreateButtonState(shouldBeDisabled: boolean): Chainable<void>;
      clickOnContinueDeleteOneRecord(): Chainable<void>;
      clickOnContinueDeleteBulkRecord(): Chainable<void>;
      checkActionButtonsState(expected: {
        update?: boolean;
        view?: boolean;
        delete?: boolean;
      }): Chainable<void>;

      // Forms Commands
      getFormInput(name: string): Chainable<HTMLElement>;
      getFormTextArea(name: string): Chainable<HTMLElement>;
      openCommandPaletteAndSelect(
        typeValue: string,
        commandDataId: string
      ): Chainable<void>;
      openHarvestDetailForm(): Chainable<void>;
      clickOnSubmitHarvestDetailForm(): Chainable<void>;
      openWorkDetailForm(): Chainable<void>;
      clickOnSubmitWorkDetailForm(): Chainable<void>;
      clickOnUpdateDetailRecord(): Chainable<void>;

      // Table Commands
      changeTablePageSize(size: number): Chainable<void>;
      toggleSelectAllTableRows(select?: boolean): Chainable<void>;
      checkClearSelectionButtonState(shouldBeVisible: boolean): Chainable<void>;
      checkDeleteBulkButtonState(shouldBeVisible: boolean): Chainable<void>;
      checkSelectAllButtonState(shouldBeVisible: boolean): Chainable<void>;
      checkSelectedTableRowsGreaterThanZero(): Chainable<void>;
      checkSelectedTableRowsIsZero(): Chainable<void>;

      // Users Commands
      createUser(data?: {
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

      // Employees Commands
      createEmployee(
        data?: any,
        opt?: { fastCreation?: boolean }
      ): Chainable<any>;
      createEmployeeAnd(callback?: (data: any) => void): Chainable<void>;

      // Clients Commands
      createClient(
        data?: any,
        opt?: { fastCreation?: boolean }
      ): Chainable<any>;
      createClientAnd(
        data: any,
        callback: (data: any) => void
      ): Chainable<void>;

      // Suppliers Commands
      createSupplier(
        data?: any,
        opt?: { fastCreation?: boolean }
      ): Chainable<any>;
      createSupplierAnd(
        data: any,
        callback: (data: any) => void
      ): Chainable<void>;

      // Crops Commands
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

      // Supplies Commands
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

      // Harvests Commands
      createHarvest(opt?: {
        fastCreation?: boolean;
        returnOnlyHarvest?: boolean;
      }): Chainable<any>;
      createHarvestAnd(callback: (data: any) => void): Chainable<any>;
      validateTotalsHarvestForm(data: {
        amount: number;
        valuePay: number;
      }): Chainable<any>;

      // Sales Commands
      createSale(opt?: {
        fastCreation?: boolean;
        returnOnlySale?: boolean;
        isReceivable?: boolean;
        isReceivableGeneric?: boolean;
      }): Chainable<any>;
      // createHarvestAnd(callback: (data: any) => void): Chainable<any>;
      // validateTotalsHarvestForm(data: {
      //   amount: number;
      //   valuePay: number;
      // }): Chainable<any>;

      // Works Commands
      createWork(opt?: {
        fastCreation?: boolean;
        returnOnlyWork?: boolean;
      }): Chainable<any>;
      createWorkAnd(callback: (data: any) => void): Chainable<any>;
      validateTotalsWorkForm(data: {
        amount: number;
        valuePay: number;
      }): Chainable<any>;

      // Seed Commands
      executeSeed(
        body: any,
        options?: {
          token?: string;
          tenantId?: string;
          url?: string;
          callback?: (response: any) => void;
        }
      ): Chainable<any>;
      executeClearSeedData(
        body: any,
        options?: {
          token?: string;
          tenantId?: string;
          url?: string;
          callback?: (response: any) => void;
        }
      ): Chainable<void>;
    }
  }
}

export {};
