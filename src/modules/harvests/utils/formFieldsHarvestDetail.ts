import { CustomFormField } from '@/modules/core/interfaces/form/CustomFormField';

type HarvestDetailFormFields = 'employee' | 'amount' | 'value_pay';

export const formFieldsHarvestDetail: Record<
  HarvestDetailFormFields,
  CustomFormField
> = {
  employee: {
    name: 'employee',
    label: 'Empleado:',
    placeholder: 'Selecciona un empleado',
    description: 'Selecciona el nombre del empleado',
  },
  amount: {
    name: 'amount',
    label: 'Cantidad (Kg):',
    placeholder: '0',
    description: 'Introduce la cantidad de Kg que ha cosechado',
  },
  value_pay: {
    name: 'value_pay',
    label: 'Valor a pagar:',
    placeholder: '0',
    description: 'Introduce el valor a pagar por la cosecha',
  },
};
