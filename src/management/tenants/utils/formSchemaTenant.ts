import { z } from 'zod';

// Lista de subdominios reservados que no se pueden usar
const RESERVED_SUBDOMAINS = [
  'www',
  'mail',
  'ftp',
  'admin',
  'api',
  'app',
  'blog',
  'shop',
  'store',
  'support',
  'help',
  'news',
  'test',
  'dev',
  'staging',
  'prod',
  'production',
  'dashboard',
  'panel',
  'control',
  'manage',
  'secure',
  'ssl',
  'cdn',
  'static',
  'port',
  'back',
  'cropco',
];

export const formSchemaTenant = z.object({
  subdomain: z
    .string()
    .min(3, { message: 'El subdominio debe tener al menos 3 caracteres' })
    .max(63, { message: 'El subdominio no puede exceder 63 caracteres' })
    .regex(/^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/, {
      message:
        'El subdominio solo puede contener letras minúsculas, números y guiones. No puede empezar o terminar con guión',
    })
    .regex(/^(?!.*--)/, {
      message: 'El subdominio no puede contener guiones consecutivos',
    })
    .refine((value) => !RESERVED_SUBDOMAINS.includes(value.toLowerCase()), {
      message: 'Este subdominio está reservado y no puede ser utilizado',
    })
    .refine((value) => !/^\d+$/.test(value), {
      message: 'El subdominio no puede ser solo números',
    }),

  company_name: z
    .string()
    .min(1, { message: 'El nombre de la empresa es requerido' })
    .max(100, {
      message: 'El nombre de la empresa no puede exceder 100 caracteres',
    })
    .regex(/^[a-zA-ZÀ-ÿ0-9\s\-&.,]+$/, {
      message: 'El nombre de la empresa contiene caracteres no válidos',
    })
    .refine((value) => value.trim().length > 0, {
      message: 'El nombre de la empresa no puede estar vacío',
    }),

  email: z
    .string()
    .min(1, { message: 'El correo electrónico es requerido' })
    .email({ message: 'El correo electrónico no es válido' })
    .max(254, { message: 'El correo electrónico es demasiado largo' })
    .refine(
      (value) => {
        // Validar que no tenga espacios
        return !/\s/.test(value);
      },
      {
        message: 'El correo electrónico no puede contener espacios',
      }
    ),

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
});

export type TenantFormData = z.infer<typeof formSchemaTenant>;
