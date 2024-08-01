import { z } from 'zod';

export const formSchemaCrop = z.object({
  name: z
    .string({ required_error: `El nombre es requerido` })
    .min(4, {
      message: 'El nombre debe tener al menos 4 caracteres',
    })
    .max(100, { message: `El nombre no debe exceder los 100 caracteres` }),
  description: z
    .string({ required_error: `La descripción es requerida` })
    .min(15, { message: `La descripción debe tener mínimo 15 caracteres` })
    .max(100, { message: `La descripción no debe exceder los 100 caracteres` }),
    
  units: z.coerce
    .number({
      required_error: `El número de unidades es requerido`,
      invalid_type_error: `Debe introducir un valor numérico`,
    })
    .positive({ message: `El número debe ser positivo` }),
  location: z
    .string({ required_error: `La ubicación es requerida` })
    .min(4, { message: `La ubicación debe tener al menos 4 caracteres` })
    .max(100, { message: `La ubicación no debe superar los 100 caracteres` }),

  dates: z
    .object({
      date_of_creation: z.date({
        required_error: `La fecha de creación es requerida`,
      }),
      date_of_termination: z.date().optional(),
    })
    .refine(
      data => {
        if (!data.date_of_termination) {
          return true;
        } else {
          return !(data.date_of_creation > data.date_of_termination!);
        }
      },
      {
        message: 'La fecha de terminación debe ser superior a la de creación',
        path: ['date_of_termination'],
      },
    ),
});
