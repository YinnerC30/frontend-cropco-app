// Tipos para comandos de formularios
export interface FormsCommands {
  getFormInput(name: string): Cypress.Chainable<HTMLElement>;
  getFormTextArea(name: string): Cypress.Chainable<HTMLElement>;
  openCommandPaletteAndSelect(
    typeValue: string,
    commandDataId: string
  ): Cypress.Chainable<void>;
  // TODO: Mover
  openHarvestDetailForm(): Cypress.Chainable<void>;
  // TODO: Mover
  clickOnSubmitHarvestDetailForm(): Cypress.Chainable<void>;
  // TODO: Mover
  openWorkDetailForm(): Cypress.Chainable<void>;
  // TODO: Mover
  clickOnSubmitWorkDetailForm(): Cypress.Chainable<void>;
  // TODO: Mover
  clickOnUpdateDetailRecord(): Cypress.Chainable<void>;
} 