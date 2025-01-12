import { CustomFormField } from '@/modules/core/interfaces/formm/CustomFormField';

type FormFieldsSaleDetail =
  | 'client'
  | 'crop'
  | 'total'
  | 'quantity'
  | 'is_receivable';

export const formFieldsSaleDetail: Record<
  FormFieldsSaleDetail,
  CustomFormField
> = {
  client: {
    name: 'client',
    label: 'Cliente:',
    placeholder: 'Selecciona',
    description: 'Selecciona el nombre del cliente',
  },
  crop: {
    name: 'crop',
    label: 'Cultivo:',
    placeholder: 'Selecciona un cultivo',
    description: 'Selecciona el nombre del cultivo',
  },
  total: {
    name: 'total',
    label: 'Total:',
    placeholder: '0',
    description: 'Introduce la cantidad de dinero a recibir',
  },
  quantity: {
    name: 'quantity',
    label: 'Cantidad:',
    placeholder: '0',
    description: 'Introduce la cantidad a vender',
  },
  is_receivable: {
    name: 'is_receivable',
    label: '¿Pendiente de pago?:',
    placeholder: '',
    description: '¿Esta pendiente por cobrar?',
  },
};
