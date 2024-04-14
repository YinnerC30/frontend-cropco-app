import { CustomFormField } from '@/interfaces/CustomFormField';
import { z } from 'zod';

export const formFieldsHarvest: Record<string, CustomFormField> = {
  date: {
    name: 'date',
    label: 'Fecha:',
    placeholder: 'Selecciona una fecha',
    description: 'Fecha en la que se realizo la cosecha',
  },
  crop: {
    name: 'crop',
    label: 'Cultivo:',
    placeholder: 'Selecciona un cultivo',
    description: '',
  },

  total: {
    name: 'total',
    label: 'Total:',
    placeholder: '',
    description: '',
  },
  value_pay: {
    name: 'value_pay',
    label: 'Valor a pagar:',
    placeholder: '',
    description: '',
  },
  observation: {
    name: 'observation',
    label: 'Observación:',
    placeholder: 'Se cosecho hasta...',
    description: '',
  },
};

export const formSchemaHarvest = z.object({
  date: z.date({ required_error: 'La fecha es un campo obligatorio' }),
  crop: z.object({
    id: z
      .string({
        required_error: 'El cultivo es un campo obligatorio',
      })
      .uuid({
        message: 'La opción seleccionada no es valida.',
      }),
  }),
  total: z.number({
    invalid_type_error: 'Debes introducir un valor numérico',
  }),

  value_pay: z
    .number({
      invalid_type_error: 'Debes introducir un valor numérico',
    })
    .refine(value => value % 50 === 0, {
      message: 'El valor a pagar debe ser un número que termine en 50 o 00.',
    }),
  observation: z
    .string()
    .max(100, {
      message: 'La observación no puede tener más de 100 caracteres.',
    })
    .optional(),
});

export const defaultValuesHarvest = {
  date: undefined,
  crop: {
    id: undefined,
  },
  
  total: 0,
  value_pay: 0,
  observation: '',
};
