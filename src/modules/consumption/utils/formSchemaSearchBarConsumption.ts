
import { schemaForDate } from '@/modules/core/helpers/schemas-validation/SchemasSearchBar';
import { z } from 'zod';

export const formSchemaSearchBarConsumption = z.object({
  filter_by_date: schemaForDate
    .refine(
      ({ date }) => {
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
      ({ type_filter_date }) => {
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
});
