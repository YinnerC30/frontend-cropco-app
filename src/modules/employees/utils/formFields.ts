import { CustomFormField } from '@/modules/core/interfaces/CustomFormField';

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
  address: {
    name: 'address',
    label: 'Dirección:',
    placeholder: 'Bolivar Cauca...',
    description: '',
  },
};
