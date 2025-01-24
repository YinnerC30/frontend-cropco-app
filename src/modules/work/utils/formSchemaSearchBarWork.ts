import {
  schemaForDate,
  schemaForTotal,
} from '@/modules/core/helpers/schemas-validation/SchemasSearchBar';
import { z } from 'zod';

export const formSchemaSearchBarWork = z.object({
  crop: z
    .object({
      id: z.string().optional(),
      name: z.string().optional(),
    })
    .optional(),
  employees: z
    .array(
      z.object({
        id: z.string().optional(),
        first_name: z.string().optional(),
      })
    )
    .optional(),

  filter_by_date: schemaForDate,

  filter_by_total: schemaForTotal,
});
