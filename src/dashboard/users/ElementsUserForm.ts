import { CustomFormField } from '@/interfaces/CustomFormField';
import { z } from 'zod';

export const formFields: Record<string, CustomFormField> = {
  first_name: {
    name: 'first_name',
    label: 'Nombre:',
    placeholder: 'Stiven',
    description: 'Su primer nombre',
  },
  last_name: {
    name: 'last_name',
    label: 'Apellido:',
    placeholder: 'Gomez',
    description: 'Su primer apellido',
  },
  email: {
    name: 'email',
    label: 'Correo electrónico:',
    placeholder: 'stivgome@google.com',
    description: 'Su correo electrónico personal',
  },
  cell_phone_number: {
    name: 'cell_phone_number',
    label: 'Número celular:',
    placeholder: '3148009870',
    description: 'Su número celular personal',
  },
  password: {
    name: 'password',
    label: 'Contraseña:',
    placeholder: '',
    description: 'Una contraseña de mínimo 6 caracteres',
  },
  repeat_password: {
    name: 'repeat_password',
    label: 'Repetir contraseña:',
    placeholder: '',
    description: 'Escriba nuevamente la contraseña',
  },
};

export const formSchema = z
  .object({
    first_name: z
      .string({ required_error: 'El campo nombre es obligatorio' })
      .min(2, {
        message: 'El nombre debe tener al menos 2 caracteres',
      })
      .max(100, { message: `El nombre no debe exceder los 100 caracteres` }),
    last_name: z
      .string({ required_error: 'El campo apellido es obligatorio' })
      .min(4, {
        message: 'El apellido debe tener al menos 4 caracteres',
      })
      .max(100, { message: `El apellido no debe exceder los 100 caracteres` }),
    email: z
      .string({ required_error: 'El campo correo electrónico es obligatorio' })
      .email('El correo electrónico es incorrecto')
      .max(100, {
        message: `El correo electrónico no debe superar los 100 caracteres`,
      }),
    cell_phone_number: z
      .string({
        required_error: 'El número de teléfono es obligatorio',
      })
      .refine(
        data => {
          return /^3\d{9}$/.test(data);
        },
        {
          message: 'El número de teléfono es incorrecto.',
        },
      ),

    password: z
      .string({ required_error: 'La contraseña es obligatoria' })
      .min(6, {
        message: 'La contraseña debe tener mínimo 6 caracteres',
      })
      .max(100, { message: `La contraseña debe tener máximo 100 caracteres` }),
    repeat_password: z
      .string({ required_error: 'Este campo es obligatorio' })
      .min(6, {
        message: 'La contraseña debe tener mínimo 6 caracteres',
      })
      .max(100, { message: `La contraseña debe tener máximo 100 caracteres` }),
  })
  .refine(data => data.password === data.repeat_password, {
    message: 'Las contraseñas no coinciden',
    path: ['repeat_password'],
  });

export const defaultValues = {
  first_name: '',
  last_name: '',
  email: '',
  cell_phone_number: '',
  password: '',
  repeat_password: '',
};
