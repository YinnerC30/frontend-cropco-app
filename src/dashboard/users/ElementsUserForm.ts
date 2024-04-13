import { CustomFormField } from '@/interfaces/CustomFormField';
import { z } from 'zod';

export const formFields: Record<string, CustomFormField> = {
  first_name: {
    name: 'first_name',
    label: 'Nombre(s):',
    placeholder: 'Stiven',
    description: 'Su primer nombre',
  },
  last_name: {
    name: 'last_name',
    label: 'Apellido(s):',
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

  password1: {
    name: 'password',
    label: 'Contraseña:',
    placeholder: '',
    description: 'Una contraseña de mínimo 6 caracteres',
  },
  password2: {
    name: 'password2',
    label: 'Repetir contraseña:',
    placeholder: '',
    description: 'Escriba nuevamente la contraseña',
  },
};

export const formSchema = z.object({
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
      data => {
        return /^3\d{9}$/.test(data);
      },
      {
        message: 'El número celular es incorrecto',
      },
    ),
  password: z
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
    .refine(data => data.password1 === data.password2, {
      message: 'Las contraseñas no coinciden',
      path: ['password2'],
    }),
});
export const defaultValues = {
  first_name: '',
  last_name: '',
  email: '',
  cell_phone_number: '',
  password: {
    password1: '',
    password2: '',
  },
};
