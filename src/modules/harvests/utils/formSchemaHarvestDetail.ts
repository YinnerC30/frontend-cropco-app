import { z } from "zod";

export const formSchemaHarvestDetail = z.object({
  employee: z.object({
    id: z
      .string()
      .min(36, {
        message: "El empleado es un campo obligatorio",
      })
      .uuid({
        message: "El identificador del cultivo debe ser un UUID válido.",
      }),
    first_name: z.string().optional(),
  }),
  total: z.coerce
    .number({
      required_error: `El valor cosechado es requerido`,
      invalid_type_error: `Debe introducir un valor numérico`,
    })
    .positive({ message: "El valor cosechado debe ser un número positivo." }),
  value_pay: z.coerce
    .number({
      required_error: `El valor a pagar es requerido`,
      invalid_type_error: `Debe introducir un valor numérico`,
    })
    .positive({ message: "El valor a pagar debe ser un número positivo." })
    .refine((value) => value % 50 === 0, {
      message: "El valor a pagar debe ser un múltiplo de 50.",
    }),
});
