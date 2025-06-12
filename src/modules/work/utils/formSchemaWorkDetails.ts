import { z } from 'zod';

export const formSchemaWorkDetails = z.object({
  id: z
    .string()
    .uuid({
      message: 'El identificador del cultivo no es válido.',
    })
    .optional(),
  value_pay: z.coerce
    .number({
      required_error: `El valor a pagar es requerido`,
      invalid_type_error: `Debe introducir un valor numérico`,
    })
    .positive({ message: 'El valor a pagar debe ser un número positivo.' })
    .refine((value) => value % 50 === 0, {
      message: 'El valor a pagar debe ser un múltiplo de 50.',
    }),
  payment_is_pending: z
    .boolean({
      invalid_type_error: `El valor debe ser booleano`,
    })
    .default(true),

  employee: z.object({
    id: z
      .string({
        required_error: 'El empleado es un campo obligatorio',
      })
      .uuid({
        message: 'La opción seleccionada no es valida.',
      }),
    full_name: z.string().optional(),
  }),
});
