import {
  schemaForDate,
  schemaForTotal,
} from '@/modules/core/helpers/schemas-validation/SchemasSearchBar';
import { TypeFilterNumber } from '@/modules/core/interfaces/general/TypeFilterNumber';
import { z } from 'zod';

export const formSchemaSearchBarSale = z.object({
  filter_by_date: schemaForDate,

  filter_by_total: schemaForTotal,

  filter_by_quantity: z.object({
    quantity: z.coerce.number().optional(),
    type_filter_quantity: z
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
  }),

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
