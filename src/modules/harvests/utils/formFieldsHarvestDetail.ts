import { CustomFormField } from '@/modules/core/interfaces/form/CustomFormField';

type HarvestDetailFormFields =
  | 'employee'
  | 'unit_of_measure'
  | 'amount'
  | 'value_pay';

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
  unit_of_measure: {
    name: 'unit_of_measure',
    label: 'Unidad de medida:',
    placeholder: 'Selecciona',
    description: 'Unidad de medida que posee el insumo',
  },
  amount: {
    name: 'amount',
    label: 'Cantidad:',
    placeholder: '0',
    description: 'Introduce la cantidad que ha cosechado',
  },
  value_pay: {
    name: 'value_pay',
    label: 'Valor a pagar:',
    placeholder: '0',
    description: 'Introduce el valor a pagar por la cosecha',
  },
};
