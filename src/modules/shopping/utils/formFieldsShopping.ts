import { CustomFormField } from '@/modules/core/interfaces/form/CustomFormField';

type FormFieldsShopping = 'date' | 'value_pay' | 'details';

export const formFieldsShopping: Record<FormFieldsShopping, CustomFormField> = {
  date: {
    name: 'date',
    label: 'Fecha:',
    placeholder: 'Selecciona una fecha',
    description: 'Fecha en la que se realizo la compra',
  },
  value_pay: {
    name: 'value_pay',
    label: 'Total:',
    placeholder: '0',
    description: 'Total a pagar por la compra',
  },
  details: {
    name: 'details',
    label: 'Compras realizadas por proveedor:',
    placeholder: '',
    description: '',
  },
};
