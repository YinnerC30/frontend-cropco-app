import { z } from 'zod';

export const formSchemaConsumptionDetail = z.object({
  supply: z.object({
    id: z
      .string({
        required_error: 'El insumo es un campo obligatorio',
      })
      .uuid({
        message: 'El identificador del insumo debe ser un UUID válido.',
      }),
    name: z.string().optional(),
  }),
  crop: z.object({
    id: z
      .string({
        required_error: 'El cultivo es un campo obligatorio',
      })
      .uuid({
        message: 'El identificador del cult8vo debe ser un UUID válido.',
      }),
    name: z.string().optional(),
  }),
  amount: z.coerce
    .number({
      required_error: `El valor a consumir es requerido`,
      invalid_type_error: `Debe introducir un valor numérico`,
    })
    .positive({ message: 'El valor a consumir debe ser un número positivo.' }),
});
