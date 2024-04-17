import { UnitOfMeasureSupply } from '@/modules/harvests/UnitOfMeasure';
import { CustomFormField } from '@/modules/core/interfaces/CustomFormField';
import { z } from 'zod';
import errorMap from 'zod/locales/en.js';

export const formFields: Record<string, CustomFormField> = {
  name: {
    name: 'name',
    label: 'Nombre:',
    placeholder: 'Insumo 1',
    description: 'Nombre del insumo o producto',
  },
  brand: {
    name: 'brand',
    label: 'Marca:',
    placeholder: 'Yara',
    description: 'Marca a la cual pertenece al producto',
  },
  unit_of_measure: {
    name: 'unit_of_measure',
    label: 'Unidad de medida:',
    placeholder: 'Selecciona',
    description: 'Unidad de medida que posee el insumo',
  },

  observation: {
    name: 'observation',
    label: 'Observación:',
    placeholder: 'Se recomienda aplicarlo cada...',
    description: 'Alguna información de utilidad sobre el producto',
  },
};

export const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'El nombre debe tener al menos 2 caracteres',
    })
    .max(100, { message: `El nombre no debe exceder los 100 caracteres` }),
  brand: z
    .string()
    .min(4, {
      message: 'La marca debe tener al menos 4 caracteres',
    })
    .max(100, { message: `El apellido no debe exceder los 100 caracteres` }),
  unit_of_measure: z.nativeEnum(UnitOfMeasureSupply, {
    errorMap: (issue, _ctx) => {
      switch (issue.code) {
        case 'invalid_type':
          return { message: 'Debe seleccionar una unidad de medida.' };
        case 'invalid_enum_value':
          return { message: 'Debe seleccionar GRAMOS o MILILITROS.' };
        default:
          return { message: 'Error en la selección de unidad de medida.' };
      }
    },
  }),
  observation: z
    .string()
    .min(6, {
      message: 'La observación debe tener mínimo 6 caracteres',
    })
    .max(500, { message: `La dirección debe tener máximo 200 caracteres` }),
});

export const defaultValues = {
  name: '',
  brand: '',
  unit_of_measure: undefined,
  observation: '',
};
