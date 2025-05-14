import { CustomFormField } from '@/modules/core/interfaces/form/CustomFormField';

type FormFieldsSale = 'date' | 'amount' | 'value_pay' | 'details';

export const formFieldsSale: Record<FormFieldsSale, CustomFormField> = {
  date: {
    name: 'date',
    label: 'Fecha:',
    placeholder: 'Selecciona una fecha',
    description: 'Fecha en la que se realizo la venta',
  },
  amount: {
    name: 'amount',
    label: 'Cantidad:',
    placeholder: '',
    description: 'Número de Kilogramos vendidos',
  },
  value_pay: {
    name: 'value_pay',
    label: 'Valor a pagar:',
    placeholder: '',
    description: 'Dinero obtenido por la venta',
  },
  details: {
    name: 'details',
    label: 'Ventas realizadas por cliente:',
    placeholder: '',
    description: '',
  },
};
