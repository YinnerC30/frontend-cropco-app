import { z } from 'zod';
import { MethodOfPayment } from '../interfaces/MethodOfPayment';

export const formSchemaPayments = z.object({
  date: z.date({
    required_error: 'La fecha es un campo obligatorio',
    invalid_type_error: 'La fecha es un campo obligatorio',
  }),
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
  method_of_payment: z.nativeEnum(MethodOfPayment, {
    errorMap: (issue, _ctx) => {
      switch (issue.code) {
        case 'invalid_type':
          return { message: 'Debe seleccionar un método de pago.' };
        case 'invalid_enum_value':
          return {
            message: 'Debe seleccionar EFECTIVO o TRANSFERENCIA o INTERCAMBIO.',
          };
        default:
          return { message: 'Error en la selección de método de pago.' };
      }
    },
  }),
  value_pay: z.number({
    invalid_type_error: 'Debes introducir un valor numérico',
  }),
  records_to_pay: z
    .array(
      z.object({
        id: z.string(),
        value_pay: z.number(),
        date: z.coerce.date(),
        type: z.string(),
        payment_is_pending: z.boolean(),
      }),
      { required_error: 'Debes agregar al menos un registro a pagar' }
    )
    .nonempty({ message: 'Debes agregar al menos un registro a pagar' }),
});
