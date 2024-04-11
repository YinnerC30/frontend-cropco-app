import { TypeInput } from '@/enums/TypeInput';
import { UnitOfMeasureHarvest } from '@/enums/UnitOfMeasure';
import { CustomFormField } from '@/interfaces/CustomFormField';
import { z } from 'zod';

export const formFieldsHarvest: CustomFormField[] = [
  {
    name: 'date',
    label: 'Fecha:',
    placeholder: '',
    description: 'Fecha en la que se realizo la cosecha',
    type: TypeInput.date,
    visible: true,
  },
  {
    name: 'crop',
    label: 'Cultivo:',
    placeholder: '',
    description: '',
    type: TypeInput.select,
    visible: true,
  },
  {
    name: 'unit_of_measure',
    label: 'Unidad de medida:',
    placeholder: 'Selecciona',
    description:
      'La medida seleccionada se usara durante todo el ciclo de vida del cultivo',
    type: TypeInput.select,
    visible: true,
  },
  {
    name: 'total',
    label: 'Total:',
    placeholder: '',
    description: '',
    type: TypeInput.number,
    visible: true,
  },
  {
    name: 'value_pay',
    label: 'Valor a pagar:',
    placeholder: '',
    description: '',
    type: TypeInput.number,
    visible: true,
  },
  {
    name: 'observation',
    label: 'Observación:',
    placeholder: 'Se cosecho hasta...',
    description: '',
    type: TypeInput.text,
    visible: true,
  },
];

export const formSchemaHarvest = z.object({
  date: z
    .date()
    .max(new Date(), 'La fecha no puede ser futura.')
    .refine(date => !!date, {
      message: 'Debes ingresar una fecha',
    }),
  crop: z.object({
    id: z.string().uuid({
      message: 'El identificador del cultivo debe ser un UUID válido.',
    }),
    name: z.string().optional(),
  }),
  unit_of_measure: z.enum(['LIBRAS', 'KILOGRAMOS'], {
    invalid_type_error: 'Unidad de medida no valida',
  }),
  total: z
    .number()
    .positive({ message: 'El total debe ser un número positivo.' }),
  value_pay: z
    .number()
    .positive({ message: 'El valor a pagar debe ser un número positivo.' })
    .refine(value => value % 50 === 0, {
      message: 'El valor a pagar debe ser un múltiplo de 50.',
    }),
  observation: z
    .string()
    .max(100, {
      message: 'La observación no puede tener más de 100 caracteres.',
    })
    .default('Sin observaciones')
    .optional(),
});

export const defaultValuesHarvest = {
  date: undefined,
  crop: {
    id: '',
    name: '',
  },
  unit_of_measure: UnitOfMeasureHarvest.LIBRAS,
  total: 0,
  value_pay: 0,
  observation: '',
};
