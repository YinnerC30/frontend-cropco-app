import { z } from "zod";

export const formSchemaWork = z.object({
  date: z.date({ required_error: "La fecha es un campo obligatorio" }),
  description: z
    .string()
    .min(15, "La descripción debe tener al menos 15 caracteres")
    .max(100, {
      message: "La descripción no puede tener más de 100 caracteres.",
    }),

  crop: z.object({
    id: z
      .string({
        required_error: "El cultivo es un campo obligatorio",
      })
      .uuid({
        message: "La opción seleccionada no es valida.",
      }),
  }),
  total: z
    .number({
      invalid_type_error: "Debes introducir un valor numérico",
    })
    .refine((value) => value % 50 === 0, {
      message: "El valor a pagar debe ser un número que termine en 50 o 00.",
    }),
});
