import { z } from "zod";

export const formSchemaHarvestProcessed = z.object({
  date: z.date({ required_error: "La fecha es un campo obligatorio" }),
  crop: z.object({
    id: z
      .string({
        required_error: "El cultivo es un campo obligatorio",
      })
      .uuid({
        message: "La opción seleccionada no es valida.",
      }),
  }),
  harvest: z.object({
    id: z
      .string({
        required_error: "La cosecha es un campo obligatorio",
      })
      .uuid({
        message: "La opción seleccionada no es valida.",
      }),
  }),
  total: z.number({
    invalid_type_error: "Debes introducir un valor numérico",
  }),
});
