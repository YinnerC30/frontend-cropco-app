import {
  schemaForDate,
  schemaForTotal,
} from '@/modules/core/helpers/schemas-validation/SchemasSearchBar';
import { z } from 'zod';

export const formSchemaSearchBarShopping = z.object({
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
});
