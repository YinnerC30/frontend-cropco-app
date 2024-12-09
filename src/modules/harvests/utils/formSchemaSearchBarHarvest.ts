import { TypeFilterDate } from '@/modules/core/interfaces';
import { TypeFilterNumber } from '@/modules/core/interfaces';
import { z } from 'zod';

export const formSchemaSearchBarHarvest = z.object({
  crop: z
    .object({
      id: z.string().optional(),
    })
    .optional(),
  filter_by_date: z.boolean().default(false).optional(),
  date: z.date().optional(),
  type_filter_date: z
    .nativeEnum(TypeFilterDate, {
      errorMap: (issue, _ctx) => {
        switch (issue.code) {
          case 'invalid_type':
            return { message: 'Debe seleccionar una opción.' };
          case 'invalid_enum_value':
            return { message: 'Debe seleccionar AFTER o BEFORE.' };
          default:
            return { message: 'Error en la selección de tiempo.' };
        }
      },
    })
    .optional(),
  filter_by_total: z.boolean().default(false).optional(),
  total: z.coerce.number().optional(),
  type_filter_total: z
    .nativeEnum(TypeFilterNumber, {
      errorMap: (issue, _ctx) => {
        switch (issue.code) {
          case 'invalid_type':
            return { message: 'Debe seleccionar una opción.' };
          case 'invalid_enum_value':
            return { message: 'Debe seleccionar MENOR o MAYOR.' };
          default:
            return { message: 'Error en la selección de tipo.' };
        }
      },
    })
    .optional(),
  filter_by_value_pay: z.boolean().default(false).optional(),
  value_pay: z.coerce.number().optional(),
  type_filter_value_pay: z
    .nativeEnum(TypeFilterNumber, {
      errorMap: (issue, _ctx) => {
        switch (issue.code) {
          case 'invalid_type':
            return { message: 'Debe seleccionar una opción.' };
          case 'invalid_enum_value':
            return { message: 'Debe seleccionar MENOR o MAYOR.' };
          default:
            return { message: 'Error en la selección de tipo.' };
        }
      },
    })
    .optional(),
});
