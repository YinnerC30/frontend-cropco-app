import { CreatePaymentProps } from './payments-commands';

Cypress.Commands.add(
  'createPayment',
  function (props: CreatePaymentProps): Cypress.Chainable<any> {
    return cy
      .executeSeed({
        payments: {
          quantity: 1,
          employeeId: props.data.employeeId,
          harvestsId: props.data.harvestsId,
          worksId: props.data.worksId,
          valuePay: props.data.valuePay,
          methodOfPayment: props.data.methodOfPayment,
        },
      })
      .then((result) => {
        return result.history.insertedPayments[0];
      });
  }
);
