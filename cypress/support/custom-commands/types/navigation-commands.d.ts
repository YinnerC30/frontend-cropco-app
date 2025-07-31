export interface NavigationCommands {
  navigateToModuleWithSideBar(nameModule: string): Cypress.Chainable<void>;
  checkCurrentUrl(partialUrl: string): Cypress.Chainable<void>;
  openCommandPaletteAndSelect(
    typeValue: string,
    commandDataId: string
  ): Cypress.Chainable<void>;
  openCommandPaletteAndSelectFirstOption(): Cypress.Chainable<void>;
} 