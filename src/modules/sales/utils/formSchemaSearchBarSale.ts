import {
  schemaForAmountWithMassUnitOfMeasure,
  schemaForDate,
  schemaForValuePay,
} from '@/modules/core/helpers/schemas-validation/SchemasSearchBar';
import { z } from 'zod';

export const formSchemaSearchBarSale = z.object({
  filter_by_date: schemaForDate,

  filter_by_value_pay: schemaForValuePay,

  // filter_by_amount: z.object({
  //   amount: z.coerce.number().optional(),
  //   type_filter_amount: z
  //     .nativeEnum(TypeFilterNumber, {
  //       errorMap: (issue, _ctx) => {
  //         switch (issue.code) {
  //           case 'invalid_type':
  //             return { message: 'Debe seleccionar una opción.' };
  //           case 'invalid_enum_value':
  //             return { message: 'Debe seleccionar MENOR o MAYOR.' };
  //           default:
  //             return { message: 'Error en la selección de tipo.' };
  //         }
  //       },
  //     })
  //     .optional(),
  // }),

  filter_by_amount: schemaForAmountWithMassUnitOfMeasure,

  clients: z
    .array(
      z.object({
        id: z.string().optional(),
        full_name: z.string().optional(),
      })
    )
    .optional(),
  crops: z
    .array(
      z.object({
        id: z.string().optional(),
        name: z.string().optional(),
      })
    )
    .optional(),

  // filter_by_is_receivable: z.object({
  //   is_receivable: z
  //     .nativeEnum(YesORNotSelection, {
  //       errorMap: (issue, _ctx) => {
  //         switch (issue.code) {
  //           case 'invalid_type':
  //             return { message: 'Debe seleccionar una opción.' };
  //           case 'invalid_enum_value':
  //             return { message: 'Debe seleccionar SI o NO.' };
  //           default:
  //             return { message: 'Error en la selección de tipo.' };
  //         }
  //       },
  //     })
  //     .optional(),
  // }),
});
