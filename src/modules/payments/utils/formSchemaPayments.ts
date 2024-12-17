import { z } from 'zod';
import { MethodOfPayment } from '../interfaces/MethodOfPayment';
import { formSchemaCategories } from './formSchemaCategories';

export const formSchemaPayments = z
  .object({
    date: z.date({ required_error: 'La fecha es un campo obligatorio' }),
    employee: z.object({
      id: z
        .string({
          required_error: 'El empleado es un campo obligatorio',
        })
        .uuid({
          message: 'La opción seleccionada no es valida.',
        }),
    }),
    method_of_payment: z.nativeEnum(MethodOfPayment, {
      errorMap: (issue, _ctx) => {
        switch (issue.code) {
          case 'invalid_type':
            return { message: 'Debe seleccionar un método de pago.' };
          case 'invalid_enum_value':
            return {
              message:
                'Debe seleccionar EFECTIVO o TRANSFERENCIA o INTERCAMBIO.',
            };
          default:
            return { message: 'Error en la selección de método de pago.' };
        }
      },
    }),
    total: z.number({
      invalid_type_error: 'Debes introducir un valor numérico',
    }),
    categories: formSchemaCategories,
  })
  .refine(
    (data: any) => {
      const { harvests, works } = data.categories;
      if (harvests.length === 0 && works.length === 0) {
        return false;
      }
      return true;
    },
    {
      message: 'Debes añadir 1 registro de cosecha o 1 registro de trabajo',
      path: ['categories'],
    }
  );
