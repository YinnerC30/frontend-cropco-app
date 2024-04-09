import { TypeInput } from '@/enums/TypeInput';
import { CustomFormField } from '@/interfaces/CustomFormField';
import { z } from 'zod';

export const formFieldsHarvestDetail: CustomFormField[] = [
  {
    name: 'employee',
    label: 'Empleado:',
    placeholder: 'Selecciona',
    description: 'Selecciona el nombre del empleado',
    type: TypeInput.select,
    visible: true,
  },
  {
    name: 'total',
    label: 'Total:',
    placeholder: '',
    description: 'Introduce la cantidad que ha cosechado',
    type: TypeInput.number,
    visible: true,
  },
  {
    name: 'value_pay',
    label: 'Valor a pagar:',
    placeholder: '',
    description: 'Introduce el valor a pagarle por su cosecha',
    type: TypeInput.number,
    visible: true,
  },
];

export const formSchemaHarvestDetail = z.object({
  employee: z.string(),
  total: z.number(),
  value_pay: z.number(),
});

export const defaultValuesHarvestDetail = {
  employee: '',
  total: 0,
  value_pay: 0,
};
