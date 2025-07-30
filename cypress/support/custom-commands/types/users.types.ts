// Tipos para comandos de usuarios
export interface UserData {
  firstName?: string;
  lastName?: string;
  email?: string;
  cellPhoneNumber?: string;
  password1?: string;
  password2?: string;
  withAllActions?: boolean;
  selectedModules?: string[];
  selectedActions?: string[];
}

export interface UsersCommands {
  createUser(data?: UserData): Cypress.Chainable<any>;
  createUserFast(data: {
    firstName?: string;
    withAllActions?: boolean;
  }): Cypress.Chainable<any>;
  createUserAnd(
    userData: UserData,
    callback: (data: any) => void
  ): Cypress.Chainable<void>;
} 