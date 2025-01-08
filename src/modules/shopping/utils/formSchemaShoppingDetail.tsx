import { z } from "zod";

export const formSchemaShoppingDetail = z.object({
  id: z
  .string()
  .uuid({
    message: 'El identificador del registro detalle debe ser un UUID válido.',
  })
  .optional(),
  supply: z.object({
    id: z
      .string({
        required_error: "El insumo es un campo obligatorio",
      })
      .uuid({
        message: "El identificador del insumo debe ser un UUID válido.",
      }),
    name: z.string().optional(),
  }),
  supplier: z.object({
    id: z
      .string({
        required_error: "El proveedor es un campo obligatorio",
      })
      .uuid({
        message: "El identificador del proveedor debe ser un UUID válido.",
      }),
    first_name: z.string().optional(),
  }),
  amount: z.coerce
    .number({
      required_error: `El valor a comprar es requerido`,
      invalid_type_error: `Debe introducir un valor numérico`,
    })
    .positive({ message: "El valor a comprar debe ser un número positivo." }),
  total: z.coerce
    .number({
      required_error: `El valor a pagar es requerido`,
      invalid_type_error: `Debe introducir un valor numérico`,
    })
    .positive({ message: "El valor a pagar debe ser un número positivo." })
    .refine((value) => value % 50 === 0, {
      message: "El valor a pagar debe ser un número que termine en 50 o 00.",
    }),
});
