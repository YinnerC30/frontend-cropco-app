import { z } from "zod";
import { formSchemaSaleDetail } from "./formSchemaSaleDetail";

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
  is_receivable: z
    .boolean({
      invalid_type_error: `El valor debe ser booleano`,
    })
    .default(false),
  details: z
    .array(formSchemaSaleDetail, {
      required_error:
        "Debes registrar las ventas que se han hecho a los clientes",
    })
    .nonempty({
      message: "Debes registrar la venta de al menos a 1 cliente",
    }),
});
