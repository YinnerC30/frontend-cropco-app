import { CustomFormField } from '@/modules/core/interfaces/form/CustomFormField';

type FormFieldsSaleDetail =
  | 'client'
  | 'crop'
  | 'value_pay'
  | 'amount'
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
  value_pay: {
    name: 'value_pay',
    label: 'Valor a pagar:',
    placeholder: '0',
    description: 'Introduce la cantidad de dinero a recibir',
  },
  amount: {
    name: 'amount',
    label: 'Cantidad (Kg):',
    placeholder: '0',
    description: 'Introduce la cantidad de Kg a vender',
  },
  is_receivable: {
    name: 'is_receivable',
    label: '¿Pendiente de pago?:',
    placeholder: '',
    description: '¿Esta pendiente por cobrar?',
  },
};
