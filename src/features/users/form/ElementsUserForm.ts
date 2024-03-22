import { z } from 'zod';

export const formFields = [
  {
    name: 'first_name',
    label: 'Nombre:',
    placeholder: '',
    description: '',
  },
  {
    name: 'last_name',
    label: 'Apellido:',
    placeholder: '',
    description: '',
  },
  {
    name: 'email',
    label: 'Correo electrónico:',
    placeholder: '',
    description: '',
  },
  {
    name: 'cell_phone_number',
    label: 'Número celular:',
    placeholder: '',
    description: '',
  },
  {
    name: 'password',
    label: 'Contraseña:',
    placeholder: '',
    description: '',
  },
];

export const formSchema = z.object({
  first_name: z.string().min(2, {
    message: 'Nombre debe tener al menos 2 caracteres',
  }),
  last_name: z.string().min(4, {
    message: 'Apellido debe tener al menos 4 caracteres',
  }),
  email: z.string().email('El correo electrónico es incorrecto'),
  cell_phone_number: z
    .string()
    .min(10, {
      message: 'El número celular debe tener solo 10 dígitos',
    })
    .max(10, 'El número celular debe tener solo 10 dígitos'),

  password: z.string().min(6, {
    message: 'La contraseña debe tener mínimo 6 caracteres',
  }),
});

export const defaultValues = {
  first_name: 'aYinner',
  last_name: 'aChilito',
  email: 'aYc@gmail.com',
  cell_phone_number: '3147736549',
  password: '123456',
};
// export const defaultValues = {
//   first_name: '',
//   last_name: '',
//   email: '',
//   cell_phone_number: '',
//   password: '',
// };
