import { CustomFormField } from '@/modules/core/interfaces';

type AdministratorFormFields =
  | 'first_name'
  | 'last_name'
  | 'email'
  | 'cell_phone_number'
  | 'password1'
  | 'password2'
  | 'role';

export const formFieldsAdministrator: Record<
  AdministratorFormFields,
  CustomFormField
> = {
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
  role: {
    name: 'role',
    label: 'Rol:',
    placeholder: 'Selecciona',
    description: 'El rol del administrador',
  },
};
