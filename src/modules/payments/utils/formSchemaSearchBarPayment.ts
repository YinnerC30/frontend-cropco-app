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
  filter_by_date: schemaForDate
    .refine(
      ({ date }: any) => {
        if (!date) {
          return false;
        }
        return true;
      },
      {
        message: 'Debes ingresar una fecha',
        path: ['date'],
      }
    )
    .refine(
      ({ type_filter_date }: any) => {
        if (!type_filter_date) {
          return false;
        }
        return true;
      },
      {
        message: 'Debes seleccionar una opción',
        path: ['type_filter_date'],
      }
    ),

  filter_by_total: schemaForTotal
    .refine(
      ({ total }: any) => {
        if (total === undefined) {
          return false;
        }
        return true;
      },
      {
        message: 'Debes ingresar un valor',
        path: ['total'],
      }
    )
    .refine(
      ({ type_filter_total }: any) => {
        if (!type_filter_total) {
          return false;
        }
        return true;
      },
      {
        message: 'Debes seleccionar una opción',
        path: ['type_filter_total'],
      }
    ),
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
