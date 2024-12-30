import { z } from 'zod';
import { TypeFilterDate, TypeFilterNumber } from '../../interfaces';

export const schemaForDate = z.object({
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
});

export const schemaForTotal = z.object({
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
});

export const schemaForValuePay = z.object({
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
