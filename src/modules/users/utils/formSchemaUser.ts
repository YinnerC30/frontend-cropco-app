import { z } from 'zod';

export const formSchemaUser = z.object({
  first_name: z
    .string({ required_error: 'El nombre es obligatorio' })
    .min(2, {
      message: 'El nombre debe tener al menos 2 caracteres',
    })
    .max(100, { message: `El nombre no debe exceder los 100 caracteres` }),
  last_name: z
    .string({ required_error: 'El apellido es obligatorio' })
    .min(4, {
      message: 'El apellido debe tener al menos 4 caracteres',
    })
    .max(100, { message: `El apellido no debe exceder los 100 caracteres` }),
  email: z
    .string({ required_error: 'El correo electrónico es obligatorio' })
    .email('El correo electrónico es incorrecto')
    .max(100, {
      message: `El correo electrónico no debe superar los 100 caracteres`,
    }),
  cell_phone_number: z
    .string({
      required_error: 'El número celular es obligatorio',
    })
    .refine(
      (data) => {
        return /^3\d{9}$/.test(data);
      },
      {
        message: 'El número celular es incorrecto',
      }
    ),
  actions: z
    .array(z.object({ id: z.string().uuid() }))
    .optional()
    .default([])
});

export const formSchemaUserWithPassword = formSchemaUser.extend({
  passwords: z
    .object({
      password1: z
        .string({ required_error: 'La contraseña es obligatoria' })
        .min(6, {
          message: 'La contraseña debe tener mínimo 6 caracteres',
        })
        .max(100, {
          message: `La contraseña debe tener máximo 100 caracteres`,
        }),
      password2: z.string({ required_error: 'Este campo es obligatorio' }),
    })
    .refine((data) => data.password1 === data.password2, {
      message: 'Las contraseñas no coinciden',
      path: ['password2'],
    }),
});
