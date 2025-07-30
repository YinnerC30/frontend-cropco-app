// Tipos para comandos de formularios
export interface FormsCommands {
  getFormInput(name: string): Cypress.Chainable<HTMLElement>;
  getFormTextArea(name: string): Cypress.Chainable<HTMLElement>;
  openCommandPaletteAndSelect(
    typeValue: string,
    commandDataId: string
  ): Cypress.Chainable<void>;
  openHarvestDetailForm(): Cypress.Chainable<void>;
  clickOnSubmitHarvestDetailForm(): Cypress.Chainable<void>;
  openWorkDetailForm(): Cypress.Chainable<void>;
  clickOnSubmitWorkDetailForm(): Cypress.Chainable<void>;
  clickOnUpdateDetailRecord(): Cypress.Chainable<void>;
} 