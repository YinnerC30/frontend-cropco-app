// Tipos para comandos de cultivos
export interface CropData {
  name?: string;
  description?: string;
  units?: number;
  number_hectares?: number;
  location?: string;
  date_of_creation?: string;
  date_of_termination?: string;
}

export interface CropsCommands {
  createCrop(
    data?: CropData,
    opt?: { fastCreation?: boolean }
  ): Cypress.Chainable<any>;
  createCropAnd(
    data: CropData,
    callback: (data: any) => void
  ): Cypress.Chainable<void>;
} 