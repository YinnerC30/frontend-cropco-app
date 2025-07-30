// Tipos para comandos de UI
export interface UICommands {
  existBasicSearchBar(): Cypress.Chainable<void>;
  existPaginationButtons(): Cypress.Chainable<void>;
  existPaginationInfo(): Cypress.Chainable<void>;
  checkPaginationValues(): Cypress.Chainable<void>;
  existRefetchButton(): Cypress.Chainable<void>;
  existCreateButton(): Cypress.Chainable<void>;
  clickOnCreateButton(): Cypress.Chainable<void>;
  clickOnSubmitButton(): Cypress.Chainable<void>;
  checkMessageFieldsMissing(): Cypress.Chainable<void>;
  checkMessageLostFormData(): Cypress.Chainable<void>;
  checkDisabledSubmitButton(): Cypress.Chainable<void>;
  clickOnSubmitBasicSearchBar(): Cypress.Chainable<void>;
  typeOnInputBasicSearchBar(value: string): Cypress.Chainable<void>;
  clearInputBasicSearchBar(): Cypress.Chainable<void>;
  checkModuleSwitchState(
    moduleName: string,
    shouldBeActive?: boolean
  ): Cypress.Chainable<void>;
  clickGlobalActionsSwitch(): Cypress.Chainable<void>;
  clickModuleActionsSwitch(moduleName: string): Cypress.Chainable<void>;
  clickActionSwitch(actionName: string): Cypress.Chainable<void>;
  checkGlobalActionsSwitchState(shouldBeActive: boolean): Cypress.Chainable<void>;
  clickActionsButtonTableRow(id: string | number): Cypress.Chainable<void>;
  clickRefetchButton(): Cypress.Chainable<void>;
  checkRefetchButtonState(shouldBeEnabled: boolean): Cypress.Chainable<void>;
  shouldBeRedirectedForNoPermission(): Cypress.Chainable<void>;
  checkLoadingInformation(): Cypress.Chainable<void>;
  openActionsMenuByField(value: string, url: string): Cypress.Chainable<void>;
  openCalendar(): Cypress.Chainable<void>;
  selectCalendarMonth(month: number): Cypress.Chainable<void>;
  selectCalendarYear(year: number): Cypress.Chainable<void>;
  selectCalendarDay(day: number): Cypress.Chainable<void>;
  openCommandField(name: string): Cypress.Chainable<void>;
  selectCommandOption(numberOption: string): Cypress.Chainable<void>;
  openSelectField(): Cypress.Chainable<void>;
  selectSelectOption(value: string): Cypress.Chainable<void>;
  clickOnIgnoreButton(): Cypress.Chainable<void>;
  checkDialogIsNotVisible(): Cypress.Chainable<void>;
  clickOnCloseToast(): Cypress.Chainable<void>;
  checkDialogIsVisible(): Cypress.Chainable<void>;
  clickOnCloseFormDialog(): Cypress.Chainable<void>;
  clickOnUpdateRecord(): Cypress.Chainable<void>;
  clickOnDeleteRecord(): Cypress.Chainable<void>;
  checkNoRecordsMessage(): Cypress.Chainable<void>;
  clickOnDeleteBulkButton(): Cypress.Chainable<void>;
  clickOnCopyIdButton(): Cypress.Chainable<void>;
  clickOnViewRecord(): Cypress.Chainable<void>;
  clickOnGoNextPageButton(): Cypress.Chainable<void>;
  clickOnGoPreviousPageButton(): Cypress.Chainable<void>;
  checkTablePageInfoContains(text: string): Cypress.Chainable<void>;
  clickOnToggleStatusUserButton(): Cypress.Chainable<void>;
  checkToggleStatusUserButtonState(
    shouldBeDisabled: boolean
  ): Cypress.Chainable<void>;
  clickOnResetPasswordUserButton(): Cypress.Chainable<void>;
  checkResetPasswordUserButtonState(
    shouldBeDisabled: boolean
  ): Cypress.Chainable<void>;
  checkCreateButtonState(shouldBeDisabled: boolean): Cypress.Chainable<void>;
  clickOnContinueDeleteOneRecord(): Cypress.Chainable<void>;
  clickOnContinueDeleteBulkRecord(): Cypress.Chainable<void>;
  checkActionButtonsState(expected: {
    update?: boolean;
    view?: boolean;
    delete?: boolean;
  }): Cypress.Chainable<void>;
} 