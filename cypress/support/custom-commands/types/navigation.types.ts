// Tipos para comandos de navegación
export interface NavigationCommands {
  navigateToModuleWithSideBar(nameModule: string): Cypress.Chainable<void>;
  checkCurrentUrl(partialUrl: string): Cypress.Chainable<void>;
} 