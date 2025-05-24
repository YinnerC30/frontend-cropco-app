import { z } from 'zod';
import { formSchemaSaleDetails } from './formSchemaSaleDetail';

export const formSchemaSale = z.object({
  date: z.date({ required_error: 'La fecha es un campo obligatorio' }),
  amount: z.coerce.number({
    invalid_type_error: 'Debes introducir un valor numérico',
  }),
  value_pay: z.coerce
    .number({
      invalid_type_error: 'Debes introducir un valor numérico',
    })
    .refine((value) => value % 50 === 0, {
      message: 'El valor a pagar debe ser un número que termine en 50 o 00.',
    }),

  details: z
    .array(formSchemaSaleDetails, {
      required_error:
        'Debes registrar las ventas que se han hecho a los clientes',
    })
    .nonempty({
      message: 'Debes registrar la venta de al menos a 1 cliente',
    }),
});
