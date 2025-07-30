export interface UserCommands {
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
  }): Cypress.Chainable<any>;
  
  createUserFast(data: {
    firstName?: string;
    withAllActions?: boolean;
  }): Cypress.Chainable<void>;
  
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
  ): Cypress.Chainable<void>;
  
  checkModuleSwitchState(
    moduleName: string,
    shouldBeActive?: boolean
  ): Cypress.Chainable<void>;
  
  clickGlobalActionsSwitch(): Cypress.Chainable<void>;
  
  clickModuleActionsSwitch(moduleName: string): Cypress.Chainable<void>;
  
  clickActionSwitch(actionName: string): Cypress.Chainable<void>;
  
  checkGlobalActionsSwitchState(shouldBeActive: boolean): Cypress.Chainable<void>;
  
  clickOnToggleStatusUserButton(): Cypress.Chainable<void>;
  
  checkToggleStatusUserButtonState(shouldBeDisabled: boolean): Cypress.Chainable<void>;
  
  clickOnResetPasswordUserButton(): Cypress.Chainable<void>;
  
  checkResetPasswordUserButtonState(shouldBeDisabled: boolean): Cypress.Chainable<void>;
} 