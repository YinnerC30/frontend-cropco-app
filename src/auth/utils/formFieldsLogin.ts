import { CustomFormField } from '@/modules/core/interfaces';

type FormFieldsLogin = 'email' | 'password';

export const formFieldsLogin: Record<FormFieldsLogin, CustomFormField> = {
  email: {
    name: 'email',
    label: 'Correo electrónico:',
    placeholder: 'email@google.com',
    description: 'Su correo electrónico personal',
  },
  password: {
    name: 'password',
    label: 'Contraseña:',
    placeholder: '',
    description: 'La contraseña de su cuenta',
  },
};
