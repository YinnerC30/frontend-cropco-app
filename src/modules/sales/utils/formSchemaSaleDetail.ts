import { z } from 'zod';

export const formSchemaSaleDetails = z.object({
  id: z
    .string()
    .uuid({
      message: 'El identificador del registro detalle debe ser un UUID válido.',
    })
    .optional(),
  crop: z.object({
    id: z
      .string({
        required_error: 'El cultivo es un campo obligatorio',
      })
      .uuid({
        message: 'El identificador del cultivo debe ser un UUID válido.',
      }),
    name: z.string().optional(),
  }),
  client: z.object({
    id: z
      .string({
        required_error: 'El cliente es un campo obligatorio',
      })
      .uuid({
        message: 'El identificador del cliente debe ser un UUID válido.',
      }),
    first_name: z.string().optional(),
  }),
  quantity: z.coerce
    .number({
      required_error: `El valor a vender es requerido`,
      invalid_type_error: `Debe introducir un valor numérico`,
    })
    .positive({ message: 'El valor a vender debe ser un número positivo.' }),
  total: z.coerce
    .number({
      required_error: `El valor a pagar es requerido`,
      invalid_type_error: `Debe introducir un valor numérico`,
    })
    .positive({ message: 'El valor a pagar debe ser un número positivo.' })
    .refine((value) => value % 50 === 0, {
      message: 'El valor a pagar debe ser un múltiplo de 50.',
    }),
  is_receivable: z
    .boolean({
      invalid_type_error: `El valor debe ser booleano`,
    })
    .default(false),
});
