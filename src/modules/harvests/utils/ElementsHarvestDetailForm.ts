import { CustomFormField } from '@/modules/core/interfaces/CustomFormField';
import { z } from 'zod';

export const formFieldsHarvestDetail: Record<string, CustomFormField> = {
  first_name: {
    name: 'first_name',
    label: 'Empleado:',
    placeholder: 'Selecciona',
    description: 'Selecciona el nombre del empleado',
  },
  total: {
    name: 'total',
    label: 'Total:',
    placeholder: '',
    description: 'Introduce la cantidad que ha cosechado',
  },
  value_pay: {
    name: 'value_pay',
    label: 'Valor a pagar:',
    placeholder: '',
    description: 'Introduce el valor a pagar por la cosecha',
  },
};

export const formSchemaHarvestDetail = z.object({
  employee: z.object({
    id: z
      .string({
        required_error: 'El empleado es un campo obligatorio',
      })
      .uuid({
        message: 'El identificador del cultivo debe ser un UUID válido.',
      }),
    first_name: z.string().optional(),
  }),
  total: z.coerce
    .number({
      required_error: `El valor cosechado es requerido`,
      invalid_type_error: `Debe introducir un valor numérico`,
    })
    .positive({ message: 'El valor cosechado debe ser un número positivo.' }),
  value_pay: z.coerce
    .number({
      required_error: `El valor a pagar es requerido`,
      invalid_type_error: `Debe introducir un valor numérico`,
    })
    .positive({ message: 'El valor a pagar debe ser un número positivo.' })
    .refine(value => value % 50 === 0, {
      message: 'El valor a pagar debe ser un múltiplo de 50.',
    }),
});

export const defaultValuesHarvestDetail = {
  employee: {
    id: undefined,
    first_name: undefined,
  },
  total: 0,
  value_pay: 0,
};
