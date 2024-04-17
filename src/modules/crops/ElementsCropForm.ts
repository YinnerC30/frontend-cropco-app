import { CustomFormField } from '@/modules/core/interfaces/CustomFormField';
import { z } from 'zod';

export const formFields: Record<string, CustomFormField> = {
  name: {
    name: 'name',
    label: 'Nombre:',
    placeholder: 'Cultivo 1',
    description: 'Nombre único del cultivo ',
  },
  description: {
    name: 'description',
    label: 'Descripción:',
    placeholder: 'El cultivo presenta las siguientes...',
    description: 'Información de interés sobre el cultivo',
  },
  units: {
    name: 'units',
    label: 'Número de unidades:',
    placeholder: '1000',
    description: 'Cantidad de plantas u arboles que tiene el cultivo',
  },
  location: {
    name: 'location',
    label: 'Ubicación:',
    placeholder: 'A 1 Km de la escuela....',
    description: '',
  },
  date_of_creation: {
    name: 'date_of_creation',
    label: 'Fecha de creación:',
    placeholder: '',
    description: 'Fecha en la que se creo el cultivo',
  },
  date_of_termination: {
    name: 'date_of_termination',
    label: 'Fecha de terminación:',
    placeholder: '',
    description: 'Fecha en la que se termino el cultivo',
  },
};

export const formSchema = z.object({
  name: z
    .string({ required_error: `El nombre es requerido` })
    .min(4, {
      message: 'El nombre debe tener al menos 4 caracteres',
    })
    .max(100, { message: `El nombre no debe exceder los 100 caracteres` }),
  description: z
    .string({ required_error: `La descripción es requerida` })
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

export const defaultValues = {
  name: undefined,
  description: undefined,
  units: undefined,
  location: undefined,
  dates: {
    date_of_creation: undefined,
    date_of_termination: undefined,
  },
};
