import { z } from "zod";

export const formSchemaHarvestProcessed = z.object({
  date: z.date({ required_error: "La fecha es un campo obligatorio" }),
  total: z.coerce
    .number({
      required_error: `El total es requerido`,
      invalid_type_error: `Debe introducir un valor numérico`,
    })
    .positive({ message: `El número debe ser positivo` }),
});
