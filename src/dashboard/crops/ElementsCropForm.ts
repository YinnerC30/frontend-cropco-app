import { TypeInput } from '@/enums/TypeInput';
import { CustomFormField } from '@/interfaces/CustomFormField';
import { z } from 'zod';

export const formFields: CustomFormField[] = [
  {
    name: 'name',
    label: 'Nombre:',
    placeholder: 'Cultivo 1',
    description: 'Nombre único del cultivo ',
    type: TypeInput.string,
    visible: true,
  },
  {
    name: 'description',
    label: 'Descripción:',
    placeholder: 'El cultivo presenta las siguientes...',
    description: 'Información de interés sobre el cultivo',
    type: TypeInput.text,
    visible: true,
  },
  {
    name: 'units',
    label: 'Número de unidades:',
    placeholder: '1000',
    description: 'Cantidad de plantas u arboles que tiene el cultivo',
    type: TypeInput.number,
    visible: true,
  },
  {
    name: 'location',
    label: 'Ubicación:',
    placeholder: 'A 1 Km de la escuela....',
    description: '',
    type: TypeInput.text,
    visible: true,
  },
  {
    name: 'date_of_creation',
    label: 'Fecha de creación:',
    placeholder: '',
    description: 'Fecha en la que se creo el cultivo',
    type: TypeInput.date,
    visible: true,
  },
  {
    name: 'date_of_termination',
    label: 'Fecha de terminación:',
    placeholder: '',
    description: 'Fecha en la que se termino el cultivo',
    type: TypeInput.date,
    visible: true,
  },
];

// TODO: Validar que la fecha de terminación sea superior a la de creación
export const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'El nombre debe tener al menos 2 caracteres',
    })
    .max(100, { message: `El nombre no debe exceder los 100 caracteres` }),
  description: z
    .string()
    .max(100, { message: `La descripción no debe exceder los 100 caracteres` }),
  units: z.number().min(1, { message: `El número debe ser mayor a 0` }),
  location: z
    .string()
    .min(4, { message: `La ubicación debe tener al menos 4 caracteres` })
    .max(100, { message: `La ubicación no debe superar los 100 caracteres` }),

  date_of_creation: z.date({
    required_error: `La fecha de creación es obligatoria`,
  }),

  date_of_termination: z.date().optional(),
});

export const defaultValues = {
  name: '',
  description: '',
  units: Number(0),
  location: '',
  date_of_creation: undefined,
  date_of_termination: undefined,
};
