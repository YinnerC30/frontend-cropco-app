import {
  schemaForDate,
  schemaForTotal,
  schemaForValuePay,
} from '@/modules/core/helpers/schemas-validation/SchemasSearchBar';
import { z } from 'zod';

export const formSchemaSearchBarHarvest = z.object({
  crop: z
    .object({
      id: z.string().optional(),
      name: z.string().optional(),
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

  filter_by_value_pay: schemaForValuePay
    .refine(
      ({ value_pay }: any) => {
        if (value_pay === undefined) {
          return false;
        }
        return true;
      },
      {
        message: 'Debes ingresar un valor',
        path: ['value_pay'],
      }
    )
    .refine(
      ({ type_filter_value_pay }: any) => {
        if (!type_filter_value_pay) {
          return false;
        }
        return true;
      },
      {
        message: 'Debes seleccionar una opción',
        path: ['type_filter_value_pay'],
      }
    ),
});
