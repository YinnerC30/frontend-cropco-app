import { CustomFormField } from '@/modules/core/interfaces/formm/CustomFormField';

type FormFieldsSale = 'date' | 'quantity' | 'total' | 'details';

export const formFieldsSale: Record<FormFieldsSale, CustomFormField> = {
  date: {
    name: 'date',
    label: 'Fecha:',
    placeholder: 'Selecciona una fecha',
    description: 'Fecha en la que se realizo la venta',
  },
  quantity: {
    name: 'quantity',
    label: 'Cantidad:',
    placeholder: '',
    description: 'Número de Kilogramos vendidos',
  },
  total: {
    name: 'total',
    label: 'Total:',
    placeholder: '',
    description: 'Dinero total obtenido por la cosecha',
  },
  details: {
    name: 'details',
    label: 'Ventas realizadas por cliente:',
    placeholder: '',
    description: '',
  },
};
