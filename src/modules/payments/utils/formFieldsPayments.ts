import { CustomFormField } from '@/modules/core/interfaces/form/CustomFormField';

type FormFieldsPayments = 'date' | 'employee' | 'method_of_payment' | 'value_pay';

export const formFieldsPayments: Record<FormFieldsPayments, CustomFormField> = {
  date: {
    name: 'date',
    label: 'Fecha:',
    placeholder: 'Selecciona una fecha',
    description: 'Fecha en la que se realizó el pago',
  },
  employee: {
    name: 'employee',
    label: 'Empleado:',
    placeholder: 'Selecciona un empleado',
    description: '',
  },
  method_of_payment: {
    name: 'method_of_payment',
    label: 'Método de pago:',
    placeholder: 'Selecciona',
    description: 'Medio por el cual se pagará al empleado',
  },
  value_pay: {
    name: 'value_pay',
    label: 'Valor a pagar:',
    placeholder: '',
    description: '',
  },
};
