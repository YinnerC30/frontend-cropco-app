import { z } from 'zod';

export const formSchemaClient = z.object({
  first_name: z
    .string({ required_error: `El nombre es requerido` })
    .min(2, {
      message: 'El nombre debe tener al menos 2 caracteres',
    })
    .max(100, { message: `El nombre no debe exceder los 100 caracteres` }),
  last_name: z
    .string({ required_error: `El apellido es requerido` })
    .min(4, {
      message: 'El apellido debe tener al menos 4 caracteres',
    })
    .max(100, { message: `El apellido no debe exceder los 100 caracteres` }),
  email: z
    .string({ required_error: `El correo electrónico es requerido` })
    .email('El correo electrónico es incorrecto')
    .max(100, {
      message: `El correo electrónico no debe superar los 100 caracteres`,
    }),
  cell_phone_number: z
    .string()
    .min(1, { message: 'El número de celular es requerido' })
    .regex(/^\+?[1-9]\d{8,14}$/, {
      message:
        'El número de celular debe tener entre 9 y 15 dígitos y puede incluir el código de país con +',
    })
    .refine(
      (value) => {
        // Remover espacios y caracteres especiales para validar solo números
        const cleanNumber = value.replace(/[\s\-\(\)]/g, '');
        return /^\+?[1-9]\d{8,14}$/.test(cleanNumber);
      },
      {
        message: 'Formato de número de celular no válido',
      }
    ),

  address: z
    .string({ required_error: `La dirección es requerida` })
    .min(6, {
      message: 'La dirección debe tener mínimo 6 caracteres',
    })
    .max(200, { message: `La dirección debe tener máximo 200 caracteres` }),
});
