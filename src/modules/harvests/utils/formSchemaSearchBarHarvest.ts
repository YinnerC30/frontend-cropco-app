import { z } from "zod";
import { DateTimeSelection } from "../interfaces/DateTimeSelection";

export const formSchemaSearchBarHarvest = z
  .object({
    crop: z
      .object({
        id: z
          .string({
            required_error: "El cultivo es un campo obligatorio",
          })
          .uuid({
            message: "La opción seleccionada no es valida.",
          })
          .optional(),
      })
      .optional(),

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
      .default(DateTimeSelection.after)
      .optional(),
  })
  .refine((data) => (!!data.date ? !!data.date_time_selection : true), {
    message:
      "La propiedad 'Tiempo de la fecha' es obligatoria cuando se ha seleccionado una fecha",
    path: ["date_time_selection"], // Indica cuál campo es inválido
  })
  .optional();
