import { CustomFormField } from '@/modules/core/interfaces/CustomFormField';
import { z } from 'zod';

export const formFieldsHarvestProcessed: Record<string, CustomFormField> = {
  date: {
    name: 'date',
    label: 'Fecha:',
    placeholder: 'Selecciona una fecha',
    description: 'Fecha en la que se esta agregando la cantidad al monto',
  },
  crop: {
    name: 'crop',
    label: 'Cultivo:',
    placeholder: 'Selecciona un cultivo',
    description: 'Cultivo al cual pertenece el monto',
  },
  harvest: {
    name: 'harvest',
    label: 'Cosecha:',
    placeholder: 'Selecciona la cosecha',
    description:
      'Selecciona la fecha de la cosecha de la cual se obtuvo el monto',
  },
  total: {
    name: 'total',
    label: 'Total:',
    placeholder: '',
    description: 'Escribe el monto resultante de la cosecha',
  },
};

export const formSchemaHarvestProcessed = z.object({
  date: z.date({ required_error: 'La fecha es un campo obligatorio' }),
  crop: z.object({
    id: z
      .string({
        required_error: 'El cultivo es un campo obligatorio',
      })
      .uuid({
        message: 'La opción seleccionada no es valida.',
      }),
  }),
  harvest: z.object({
    id: z
      .string({
        required_error: 'La cosecha es un campo obligatorio',
      })
      .uuid({
        message: 'La opción seleccionada no es valida.',
      }),
  }),
  total: z.number({
    invalid_type_error: 'Debes introducir un valor numérico',
  }),
});

export const defaultValuesHarvestProcessed = {
  date: undefined,
  crop: {
    id: undefined,
  },
  harvest: {
    id: undefined,
  },
  total: 0,
};
