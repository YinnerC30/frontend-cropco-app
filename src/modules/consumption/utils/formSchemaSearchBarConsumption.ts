import { z } from "zod";
import { DateTimeSelection } from "../../core/interfaces/General/DateTimeSelection";

export const formSchemaSearchBarConsumption = z.object({
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
});
