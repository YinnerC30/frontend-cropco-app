export interface FormsCommands {
  getFormInput(name: string): Cypress.Chainable<HTMLElement>;
  getFormTextArea(name: string): Cypress.Chainable<HTMLElement>;
  clickOnSubmitButton(): Cypress.Chainable<void>;
  checkDisabledSubmitButton(): Cypress.Chainable<void>;
  openCalendar(): Cypress.Chainable<void>;
  selectCalendarMonth(month: number): Cypress.Chainable<void>;
  selectCalendarYear(year: number): Cypress.Chainable<void>;
  selectCalendarDay(day: number): Cypress.Chainable<void>;
  openCommandField(name: string): Cypress.Chainable<void>;
  selectCommandOption(numberOption: string, skipWait?: boolean): Cypress.Chainable<void>;
  openSelectField(): Cypress.Chainable<void>;
  selectSelectOption(value: string): Cypress.Chainable<void>;
  clickOnCloseFormDialog(): Cypress.Chainable<void>;
  checkFormInputsAreEmpty(): Cypress.Chainable<void>;
} 