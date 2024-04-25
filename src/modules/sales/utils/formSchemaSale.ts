import { z } from "zod";

export const formSchemaSale = z.object({
  date: z.date({ required_error: "La fecha es un campo obligatorio" }),
  quantity: z.number({
    invalid_type_error: "Debes introducir un valor numérico",
  }),
  total: z
    .number({
      invalid_type_error: "Debes introducir un valor numérico",
    })
    .refine((value) => value % 50 === 0, {
      message: "El valor a pagar debe ser un número que termine en 50 o 00.",
    }),
  is_receivable: z.boolean({
    invalid_type_error: `El valor debe ser booleano`,
  }),
});
