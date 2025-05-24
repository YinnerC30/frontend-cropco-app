import { z } from 'zod';
import { formSchemaShoppingDetail } from './formSchemaShoppingDetail';

export const formSchemaShopping = z.object({
  date: z.date({ required_error: 'La fecha es un campo obligatorio' }),

  value_pay: z
    .number({
      invalid_type_error: 'Debes introducir un valor numérico',
    })
    .refine((value) => value % 50 === 0, {
      message: 'El valor a pagar debe ser un número que termine en 50 o 00.',
    }),
  details: z
    .array(formSchemaShoppingDetail, {
      required_error:
        'Debes registrar las compras que se han hecho a los proveedores',
    })
    .nonempty({
      message: 'Debes registrar la compra de al menos a  1 proveedor',
    }),
});
