import {
  schemaForDate,
  schemaForValuePay
} from "@/modules/core/helpers/schemas-validation/SchemasSearchBar";
import { z } from "zod";

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
        full_name: z.string().optional(),
      })
    )
    .optional(),

  filter_by_date: schemaForDate,

  filter_by_value_pay: schemaForValuePay,
});
