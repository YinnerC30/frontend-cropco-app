export interface EmployeeCommands {
  createEmployee(
    data?: {
      firstName?: string;
      lastName?: string;
      email?: string;
      cellPhoneNumber?: string;
      address?: string;
    },
    opt?: { fastCreation?: boolean }
  ): Cypress.Chainable<any>;
  createEmployeeAnd(callback?: (data: any) => void): Cypress.Chainable<void>;
  checkCertificateButtonState(state: boolean): Cypress.Chainable<void>;
  clickOnCertificateButton(): Cypress.Chainable<void>;
  clickOnGenerateCertificateButton(): Cypress.Chainable<void>;
}