import { z } from 'zod';

export const formFields = [
  {
    name: 'first_name',
    label: 'Nombre:',
    placeholder: 'Stiven',
    description: 'Su primer nombre',
  },
  {
    name: 'last_name',
    label: 'Apellido:',
    placeholder: 'Gomez',
    description: 'Su primer apellido',
  },
  {
    name: 'company_name',
    label: 'Nombre empresa:',
    placeholder: '',
    description: '',
  },
  {
    name: 'email',
    label: 'Correo electrónico:',
    placeholder: 'stivgome@google.com',
    description: 'Su correo electrónico personal',
  },
  {
    name: 'cell_phone_number',
    label: 'Número celular:',
    placeholder: '3148009870',
    description: 'Su número celular personal',
  },
  {
    name: 'address',
    label: 'Dirección:',
    placeholder: 'Bolivar Cauca...',
    description: '',
  },
];

export const formSchema = z.object({
  first_name: z
    .string()
    .min(2, {
      message: 'El nombre debe tener al menos 2 caracteres',
    })
    .max(100, { message: `El nombre no debe exceder los 100 caracteres` }),
  last_name: z
    .string()
    .min(4, {
      message: 'El apellido debe tener al menos 4 caracteres',
    })
    .max(100, { message: `El apellido no debe exceder los 100 caracteres` }),
  company_name: z
    .string()
    .min(4, {
      message: 'El nombre de la empresa debe tener al menos 4 caracteres',
    })
    .max(100, {
      message: `El nombre de la empresa no debe exceder los 100 caracteres`,
    }),
  email: z.string().email('El correo electrónico es incorrecto').max(100, {
    message: `El correo electrónico no debe superar los 100 caracteres`,
  }),
  cell_phone_number: z.string().refine(
    data => {
      return /^3\d{9}$/.test(data);
    },
    {
      message: 'El número de teléfono es incorrecto.',
    },
  ),

  address: z
    .string()
    .min(6, {
      message: 'La dirección debe tener mínimo 6 caracteres',
    })
    .max(200, { message: `La dirección debe tener máximo 200 caracteres` }),
});

export const defaultValues = {
  first_name: '',
  last_name: '',
  company_name: '',
  email: '',
  cell_phone_number: '',
  address: '',
};
