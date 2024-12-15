import { TypeFilterNumber } from '@/modules/core/interfaces/general/TypeFilterNumber';
import { YesORNotSelection } from '@/modules/core/interfaces/general/YesORNotSelection';
import {
  schemaForDate,
  schemaForTotal,
} from '@/modules/harvests/utils/formSchemaSearchBarHarvest';
import { z } from 'zod';

export const formSchemaSearchBarSale = z.object({
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
