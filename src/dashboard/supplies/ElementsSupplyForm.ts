import { UnitOfMeasure } from '@/enums/UnitOfMeasure';
import { TypeInput } from '@/enums/TypeInput';
import { CustomFormField } from '@/interfaces/CustomFormField';
import { z } from 'zod';

export const formFields: CustomFormField[] = [
  {
    name: 'name',
    label: 'Nombre:',
    placeholder: 'Insumo 1',
    description: 'Nombre del insumo o producto',
    type: TypeInput.string,
    visible: true,
  },
  {
    name: 'brand',
    label: 'Marca:',
    placeholder: 'Yara',
    description: 'Marca a la cual pertenece al producto',
    type: TypeInput.string,
    visible: true,
  },
  {
    name: 'unit_of_measure',
    label: 'Unidad de medida:',
    placeholder: 'Selecciona',
    description: 'Unidad de medida que posee el insumo',
    type: TypeInput.select,
    visible: true,
  },

  {
    name: 'observation',
    label: 'Observación:',
    placeholder: 'Se recomienda aplicarlo cada...',
    description: 'Alguna información de utilidad sobre el producto',
    type: TypeInput.text,
    visible: true,
  },
];

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
  unit_of_measure: z.enum(['GRAMOS', 'MILILITROS']),
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
  unit_of_measure: UnitOfMeasure.GRAMOS,
  observation: '',
};
