import {
  schemaForDate,
  schemaForTotal,
} from '@/modules/core/helpers/schemas-validation/SchemasSearchBar';
import { z } from 'zod';

export const formSchemaSearchBarShopping = z.object({
  filter_by_date: schemaForDate,

  filter_by_total: schemaForTotal,
});
