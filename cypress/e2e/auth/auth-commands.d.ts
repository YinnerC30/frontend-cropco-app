export interface AuthCommands {
  loginUser(
    email?: string,
    password?: string
  ): Cypress.Chainable<void>;
  
  logoutUser(): Cypress.Chainable<void>;
  
  clearSession(): Cypress.Chainable<void>;
  
  shouldBeAuthenticated(): Cypress.Chainable<void>;
  
  shouldNotBeAuthenticated(): Cypress.Chainable<void>;
  
  attemptInvalidLogin(
    email: string,
    password: string
  ): Cypress.Chainable<void>;
} 