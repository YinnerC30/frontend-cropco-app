import {
  schemaForDate,
  schemaForValuePay,
} from '@/modules/core/helpers/schemas-validation/SchemasSearchBar';
import { z } from 'zod';

export enum MethodOfPaymentSearchBar {
  EFECTIVO = 'EFECTIVO',
  TRANSFERENCIA = 'TRANSFERENCIA',
  INTERCAMBIO = 'INTERCAMBIO',
  NONE = 'NONE',
}

export const formSchemaSearchBarPayment = z.object({
  employee: z
    .object({
      id: z.string().optional(),
    })
    .optional(),
  filter_by_date: schemaForDate,

  filter_by_value_pay: schemaForValuePay,

  filter_by_method_of_payment: z.object({
    method_of_payment: z
      .nativeEnum(MethodOfPaymentSearchBar, {
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
  }),
});
