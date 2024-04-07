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
  date: z.date(),
  crop: z.string().uuid(),
  unit_of_measure: z.enum(['LIBRAS', 'KILOGRAMOS']),
  total: z.number(),
  value_pay: z.number(),
  observation: z.string().max(100),
});

export const defaultValuesHarvest = {
  date: undefined,
  crop: '',
  unit_of_measure: UnitOfMeasureHarvest.LIBRAS,
  total: 0,
  value_pay: 0,
  observation: '',
};
