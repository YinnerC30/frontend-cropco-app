import { AllUnitsOfMeasure } from '@/modules/supplies/interfaces/UnitOfMeasure';
import { z } from 'zod';

export const formSchemaConsumptionDetail = z.object({
  id: z
    .string()
    .uuid({
      message: 'El identificador del detalle de consumo no es valido',
    })
    .optional(),
  supply: z.object({
    id: z
      .string({
        required_error: 'El insumo es un campo obligatorio',
      })
      .uuid({
        message: 'El insumo es un campo obligatorio',
      }),
    name: z.string().optional(),
    unit_of_measure: z.nativeEnum(AllUnitsOfMeasure, {
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
        message: 'El cultivo es un campo obligatorio',
      }),
    name: z.string().optional(),
  }),
  unit_of_measure: z.nativeEnum(AllUnitsOfMeasure, {
    errorMap: (issue, _ctx) => {
      switch (issue.code) {
        case 'invalid_type':
          return { message: 'Debe seleccionar una unidad de medida.' };
        case 'invalid_enum_value':
          return { message: 'Debe seleccionar una unidad de medida válida.' };
        default:
          return { message: 'Error en la selección de unidad de medida.' };
      }
    },
  }),
  amount: z.coerce
    .number({
      required_error: `El valor a consumir es requerido`,
      invalid_type_error: `Debe introducir un valor numérico`,
    })
    .positive({ message: 'El valor a consumir debe ser un número positivo.' }),
});
