import { schemaForDate } from '@/modules/core/helpers/schemas-validation/SchemasSearchBar';
import { z } from 'zod';

export const formSchemaSearchBarConsumption = z.object({
  filter_by_date: schemaForDate,
  supplies: z
    .array(
      z.object({
        id: z.string().optional(),
        name: z.string().optional(),
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
});
