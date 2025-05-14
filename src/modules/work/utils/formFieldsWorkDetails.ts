import { CustomFormField } from '@/modules/core/interfaces/form/CustomFormField';
type FormFieldsWorkDetail = 'value_pay' | 'payment_is_pending' | 'employee';

export const formFieldsWorkDetail: Record<
  FormFieldsWorkDetail,
  CustomFormField
> = {
  value_pay: {
    name: 'value_pay',
    label: 'Valor a pagar:',
    placeholder: '0',
    description: 'Valor a pagar por el trabajo',
  },
  payment_is_pending: {
    name: 'payment_is_pending',
    label: '¿Pendiente de pago?:',
    placeholder: '',
    description: '¿Esta pendiente por pagar?',
  },
  employee: {
    name: 'employee',
    label: 'Empleado:',
    placeholder: 'Selecciona un empleado',
    description: 'Empleado que realizo el trabajo',
  },
};
