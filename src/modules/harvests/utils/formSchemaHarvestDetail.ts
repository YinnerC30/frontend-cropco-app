import { MassUnitOfMeasure } from '@/modules/supplies/interfaces/UnitOfMeasure';
import { z } from 'zod';

export const formSchemaHarvestDetail = z.object({
  id: z
    .string()
    .uuid({
      message: 'El identificador del detalle de cosecha no es valido',
    })
    .optional(),
  employee: z.object({
    id: z
      .string({ required_error: 'El empleado es un campo obligatorio' })
      .uuid({
        message: 'El empleado es un campo obligatorio',
      }),
    full_name: z.string().optional(),
  }),
  unit_of_measure: z.nativeEnum(MassUnitOfMeasure, {
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
    .refine((value) => value % 50 === 0 && value !== 0, {
      message: 'El valor a pagar debe ser un múltiplo de 50.',
    }),
});
