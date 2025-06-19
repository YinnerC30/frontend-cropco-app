import { z } from 'zod';

export const formSchemaTenant = z.object({
  subdomain: z
    .string()
    .min(3, { message: 'El subdominio debe tener al menos 3 caracteres' }),
  company_name: z
    .string()
    .min(1, { message: 'El nombre de la empresa es requerido' }),
  email: z.string().email({ message: 'El correo electrónico no es válido' }),
  cell_phone_number: z
    .string()
    .min(10, {
      message: 'El número de celular debe tener al menos 10 caracteres',
    }),
});
