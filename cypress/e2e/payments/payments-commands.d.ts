export interface CreatePaymentProps {
  data: {
    employeeId: string;
    harvestsId?: string[];
    worksId?: string[];
    valuePay: number;
    methodOfPayment: string;
  };
}

export interface PaymentsCommands {
  createPayment(props: CreatePaymentProps): Cypress.Chainable<any>;
}
