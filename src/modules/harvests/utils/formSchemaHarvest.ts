import { z } from 'zod';
import { formSchemaHarvestDetail } from './formSchemaHarvestDetail';

export const formSchemaHarvest = z.object({
  date: z.date({ required_error: 'La fecha es un campo obligatorio' }),
  crop: z.object({
    id: z
      .string({
        required_error: 'El cultivo es un campo obligatorio',
        invalid_type_error: 'El cultivo es un campo obligatorio',
      })
      .uuid({
        message: 'La opción seleccionada no es valida.',
      }),

    name: z.string({ required_error: 'El nombre del cultivo es requerido' }),
  }),
  observation: z
    .string({
      required_error: 'La observación de la cosecha es requerida',
    })
    .max(100, {
      message: 'La observación no puede tener más de 100 caracteres.',
    }),
  details: z
    .array(formSchemaHarvestDetail, {
      required_error:
        'Debes registrar las cosechas que han hecho los empleados',
    })
    .nonempty({
      message: 'Debes registrar la cosecha de al menos 1 empleado',
    }),
  amount: z.coerce.number({
    invalid_type_error: 'Debes introducir un valor numérico',
  }),
  value_pay: z.coerce
    .number({
      invalid_type_error: 'Debes introducir un valor numérico',
    })
    .refine((value) => value % 50 === 0, {
      message: 'El valor a pagar debe ser un número que termine en 50 o 00.',
    }),
});
