import { z } from "zod";
import { DateTimeSelection } from "../../core/interfaces/general/DateTimeSelection";
import { MinorOrMajorSelection } from "../../core/interfaces/general/MinorOrMajorSelection";

export const formSchemaSearchBarShopping = z.object({
  filter_by_date: z.boolean().default(false).optional(),
  date: z.date().optional(),
  date_time_selection: z
    .nativeEnum(DateTimeSelection, {
      errorMap: (issue, _ctx) => {
        switch (issue.code) {
          case "invalid_type":
            return { message: "Debe seleccionar una opción." };
          case "invalid_enum_value":
            return { message: "Debe seleccionar AFTER o BEFORE." };
          default:
            return { message: "Error en la selección de tiempo." };
        }
      },
    })
    .optional(),
  filter_by_total: z.boolean().default(false).optional(),
  total: z.coerce.number().optional(),
  minor_or_major_selection: z
    .nativeEnum(MinorOrMajorSelection, {
      errorMap: (issue, _ctx) => {
        switch (issue.code) {
          case "invalid_type":
            return { message: "Debe seleccionar una opción." };
          case "invalid_enum_value":
            return { message: "Debe seleccionar MENOR o MAYOR." };
          default:
            return { message: "Error en la selección de tipo." };
        }
      },
    })
    .optional(),
});
