export interface CropCommands {
  createCrop(
    data?: {
      name?: string;
      description?: string;
      units?: number;
      number_hectares?: number;
      location?: string;
      date_of_creation?: string;
      date_of_termination?: string;
    },
    opt?: { fastCreation?: boolean }
  ): Cypress.Chainable<any>;
  
  createCropAnd(
    data: {
      name?: string;
      description?: string;
      units?: number;
      number_hectares?: number;
      location?: string;
      date_of_creation?: string;
      date_of_termination?: string;
    },
    callback: (data: any) => void
  ): Cypress.Chainable<void>;
} 