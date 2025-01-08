import {
  schemaForDate,
  schemaForTotal,
} from '@/modules/core/helpers/schemas-validation/SchemasSearchBar';
import { z } from 'zod';
import { MethodOfPayment } from '../interfaces/MethodOfPayment';

export const formSchemaSearchBarPayment = z.object({
  employee: z
    .object({
      id: z.string().optional(),
    })
    .optional(),
  filter_by_date: schemaForDate,

  filter_by_total: schemaForTotal,

  filter_by_method_of_payment: z.boolean().default(false).optional(),
  method_of_payment: z
    .nativeEnum(MethodOfPayment, {
      errorMap: (issue, _ctx) => {
        switch (issue.code) {
          case 'invalid_type':
            return { message: 'Debe seleccionar una opción.' };
          case 'invalid_enum_value':
            return {
              message:
                'Debe seleccionar EFECTIVO , INTERCAMBIO o TRANSFERENCIA.',
            };
          default:
            return { message: 'Error en la selección de tipo.' };
        }
      },
    })
    .optional(),
});
