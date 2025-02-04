import { UnitOfMeasure } from '@/modules/supplies/interfaces/UnitOfMeasure';
import { z } from 'zod';

export const formSchemaConsumptionDetail = z.object({
  id: z
    .string()
    .uuid({
      message: 'El identificador del cultivo debe ser un UUID válido.',
    })
    .optional(),
  supply: z.object({
    id: z
      .string({
        required_error: 'El insumo es un campo obligatorio',
      })
      .uuid({
        message: 'El identificador del insumo debe ser un UUID válido.',
      }),
    name: z.string().optional(),
    unit_of_measure: z.nativeEnum(UnitOfMeasure, {
      errorMap: (issue, _ctx) => {
        switch (issue.code) {
          case 'invalid_type':
            return { message: 'Debe seleccionar una unidad de medida.' };
          case 'invalid_enum_value':
            return { message: 'Debe seleccionar GRAMOS o MILILITROS.' };
          default:
            return { message: 'Error en la selección de unidad de medida.' };
        }
      },
    }),
  }),
  crop: z.object({
    id: z
      .string({
        required_error: 'El cultivo es un campo obligatorio',
      })
      .uuid({
        message: 'El identificador del cult8vo debe ser un UUID válido.',
      }),
    name: z.string().optional(),
  }),
  amount: z.coerce
    .number({
      required_error: `El valor a consumir es requerido`,
      invalid_type_error: `Debe introducir un valor numérico`,
    })
    .positive({ message: 'El valor a consumir debe ser un número positivo.' }),
});
