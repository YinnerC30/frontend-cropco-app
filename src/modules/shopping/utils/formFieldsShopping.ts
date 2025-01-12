import { CustomFormField } from '@/modules/core/interfaces/formm/CustomFormField';

type FormFieldsShopping = 'date' | 'total' | 'details';

export const formFieldsShopping: Record<FormFieldsShopping, CustomFormField> = {
  date: {
    name: 'date',
    label: 'Fecha:',
    placeholder: 'Selecciona una fecha',
    description: 'Fecha en la que se realizo la compra',
  },
  total: {
    name: 'total',
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
