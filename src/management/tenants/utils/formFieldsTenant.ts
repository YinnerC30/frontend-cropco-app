import { CustomFormField } from '@/modules/core/interfaces/form/CustomFormField';

type FormFieldsTenant =
  | 'subdomain'
  | 'company_name'
  | 'email'
  | 'cell_phone_number';

export const formFieldsTenant: Record<FormFieldsTenant, CustomFormField> = {
  subdomain: {
    name: 'subdomain',
    label: 'Subdominio:',
    placeholder: 'empresa-1',
    description: 'Nombre único para el subdominio',
  },
  company_name: {
    name: 'company_name',
    label: 'Nombre de la empresa:',
    placeholder: 'Empresa 1',
    description: 'Nombre de la empresa',
  },
  email: {
    name: 'email',
    label: 'Correo electrónico:',
    placeholder: 'empresa-1@gmail.com',
    description: 'Correo electrónico de la empresa',
  },
  cell_phone_number: {
    name: 'cell_phone_number',
    label: 'Número de celular:',
    placeholder: '3178901234',
    description: 'Número de celular de la empresa',
  },
};
