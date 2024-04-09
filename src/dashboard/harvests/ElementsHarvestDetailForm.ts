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
  employee: z.object({
    id: z.string().uuid({
      message: 'El identificador del cultivo debe ser un UUID válido.',
    }),
    first_name: z.string().optional(),
  }),
  total: z
    .number()
    .positive({ message: 'El total debe ser un número positivo.' }),
  value_pay: z
    .number()
    .positive({ message: 'El valor a pagar debe ser un número positivo.' })
    .refine(value => value % 50 === 0, {
      message: 'El valor a pagar debe ser un múltiplo de 50.',
    }),
});

export const defaultValuesHarvestDetail = {
  employee: {
    id: '',
    first_name: '',
  },
  total: 0,
  value_pay: 0,
};
